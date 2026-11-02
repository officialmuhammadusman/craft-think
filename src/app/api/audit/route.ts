import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";

/**
 * POST /api/audit — REAL website audit measurements, nothing invented.
 *
 * The visitor sends { url }. This route fetches that public page
 * server-side and measures what is actually there: HTTP status,
 * response time, page size, HTTPS, title, meta description, viewport
 * tag, H1 count, image alt coverage, and internal/external link counts.
 * It NEVER returns a score, grade, or any metric that was not measured.
 *
 * SSRF guard: only http/https, no embedded credentials, no localhost,
 * and no literal or DNS-resolved private / loopback / link-local /
 * reserved address (127.0.0.0/8, 10/8, 172.16/12, 192.168/16, ::1,
 * fe80::/10, fc00::/7, 169.254/16, 0.0.0.0/8, 100.64/10). Hostnames
 * are resolved with node:dns before fetching, so a name that points
 * at a private address is blocked too — not just literal IP hosts.
 * If DNS resolution itself fails, the request is refused with a plain
 * error rather than fetched blindly.
 *
 * Fetch guard: 10 second timeout, and at most 5 MB of the page is
 * read for analysis. Larger pages are reported with truncated: true
 * and the size is the bytes actually read and analysed.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 5 * 1024 * 1024;

function isBlockedIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return true;
  const [a, b] = parts;
  if (a === 10) return true; // 10/8 private
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16/12 private
  if (a === 192 && b === 168) return true; // 192.168/16 private
  if (a === 127) return true; // 127/8 loopback
  if (a === 169 && b === 254) return true; // 169.254/16 link-local
  if (a === 0) return true; // 0.0.0.0/8 unspecified / reserved
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64/10 shared / CGNAT
  return false;
}

function isBlockedIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1) — check the embedded IPv4.
  const mapped = lower.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isBlockedIPv4(mapped[1]);
  if (lower === "::1" || lower === "::") return true; // loopback / unspecified
  if (lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb")) return true; // fe80::/10 link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // fc00::/7 unique-local
  return false;
}

function isBlockedIP(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return isBlockedIPv4(ip);
  if (kind === 6) return isBlockedIPv6(ip);
  return true; // Not a parseable IP — refuse rather than guess.
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => {
      const code = Number(n);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please send a website address to check." }, { status: 400 });
  }
  const rawUrl = (body as { url?: unknown } | null)?.url;
  if (typeof rawUrl !== "string" || !rawUrl.trim()) {
    return NextResponse.json({ error: "Please enter a website address." }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl.trim());
  } catch {
    return NextResponse.json(
      { error: "That does not look like a website address. Please include http:// or https://, for example https://example.com." },
      { status: 400 },
    );
  }
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json({ error: "Only http:// and https:// addresses can be checked." }, { status: 400 });
  }
  if (target.username || target.password) {
    return NextResponse.json({ error: "Addresses with a username or password in them cannot be checked." }, { status: 400 });
  }
  // Returns an error message when a host must not be fetched, else null.
  // Literal IP hosts are checked directly; hostnames are resolved and
  // blocked if ANY resolved address is private / loopback / link-local.
  async function checkHost(hostname: string): Promise<string | null> {
    const host = hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".localhost")) {
      return "Local addresses cannot be checked. Please enter a public website address.";
    }
    if (isIP(host) !== 0) {
      return isBlockedIP(host)
        ? "Local and private addresses cannot be checked. Please enter a public website address."
        : null;
    }
    let addresses: { address: string }[];
    try {
      addresses = await lookup(host, { all: true });
    } catch {
      return "We could not find that website address. Please check it and try again.";
    }
    if (addresses.length === 0 || addresses.some((a) => isBlockedIP(a.address))) {
      return "Local and private addresses cannot be checked. Please enter a public website address.";
    }
    return null;
  }

  const initialProblem = await checkHost(target.hostname);
  if (initialProblem) {
    return NextResponse.json({ error: initialProblem }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const started = Date.now();
  // Redirects are followed MANUALLY (max 5), not with redirect: "follow":
  // an automatic follow would fetch a redirect target without checking
  // it, so a public URL redirecting to a private address would bypass
  // the guard above. Every hop is validated the same way.
  let current = target;
  let response: Response | null = null;
  let redirectError: string | null = null;
  try {
    for (let hop = 0; hop <= 5; hop += 1) {
      const res = await fetch(current.toString(), {
        signal: controller.signal,
        redirect: "manual",
        headers: {
          "User-Agent": "CraftThink-Audit/1.0 (+https://craft-think.vercel.app/audit-tool)",
          Accept: "text/html,application/xhtml+xml,*/*",
        },
      });
      const location = res.headers.get("location");
      if ([301, 302, 303, 307, 308].includes(res.status) && location) {
        if (hop === 5) {
          redirectError = "That website redirected too many times. Please try a direct page address.";
          await res.body?.cancel().catch(() => undefined);
          break;
        }
        let next: URL;
        try {
          next = new URL(location, current);
        } catch {
          redirectError = "That website redirected to an address we could not read.";
          await res.body?.cancel().catch(() => undefined);
          break;
        }
        if (next.protocol !== "http:" && next.protocol !== "https:") {
          redirectError = "That website redirected to an address that is not a web page.";
          await res.body?.cancel().catch(() => undefined);
          break;
        }
        if (next.username || next.password) {
          redirectError = "That website redirected to an address with login details in it, which cannot be checked.";
          await res.body?.cancel().catch(() => undefined);
          break;
        }
        const hopProblem = await checkHost(next.hostname);
        if (hopProblem) {
          redirectError = hopProblem;
          await res.body?.cancel().catch(() => undefined);
          break;
        }
        await res.body?.cancel().catch(() => undefined);
        current = next;
        continue;
      }
      response = res;
      break;
    }
  } catch (err) {
    clearTimeout(timer);
    const timedOut = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: timedOut
          ? "That website took longer than 10 seconds to respond, so the check was stopped. Please try again later."
          : "We could not reach that website. Please check the address and try again.",
      },
      { status: 502 },
    );
  }
  if (redirectError || !response) {
    clearTimeout(timer);
    return NextResponse.json({ error: redirectError ?? "That website did not return a page to check." }, { status: 400 });
  }
  const responseTimeMs = Date.now() - started;

  // Read the body with a cap, so a huge page cannot exhaust memory.
  let sizeBytes = 0;
  let truncated = false;
  const chunks: Uint8Array[] = [];
  try {
    const reader = response.body?.getReader();
    if (reader) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;
        sizeBytes += value.byteLength;
        if (sizeBytes > MAX_BYTES) {
          truncated = true;
          await reader.cancel().catch(() => undefined);
          break;
        }
        chunks.push(value);
      }
    }
  } catch {
    clearTimeout(timer);
    return NextResponse.json({ error: "The check was interrupted while reading that page. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
  // sizeBytes counts every byte seen, including the chunk that crossed
  // the cap. The bytes actually kept for analysis are the chunks below;
  // report those, and let truncated: true say the page was larger.
  const analysedBytes = chunks.reduce((n, c) => n + c.byteLength, 0);

  const contentType = response.headers.get("content-type") ?? "";
  const isHtml = contentType.includes("text/html") || contentType.includes("application/xhtml+xml");
  let html = "";
  if (isHtml && chunks.length > 0) {
    const total = chunks.reduce((n, c) => n + c.byteLength, 0);
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.byteLength;
    }
    html = new TextDecoder("utf-8", { fatal: false }).decode(merged);
  }
  // Strip HTML comments so commented-out tags are not counted.
  const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, "");

  const titleMatch = cleanHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].replace(/<[^>]*>/g, "").trim()).slice(0, 300) || null : null;
  const metaDescriptionPresent = /<meta[^>]*\bname\s*=\s*["']description["'][^>]*>/i.test(cleanHtml);
  const viewportPresent = /<meta[^>]*\bname\s*=\s*["']viewport["'][^>]*>/i.test(cleanHtml);
  const h1Count = (cleanHtml.match(/<h1[\s>]/gi) ?? []).length;

  const imgTags = cleanHtml.match(/<img\b[^>]*>/gi) ?? [];
  const imagesWithAlt = imgTags.filter((tag) => /\balt\s*=\s*["'][^"']*["']/.test(tag) || /\balt\s*=\s*[^\s>]+/.test(tag)).length;

  // Links resolve against the FINAL page (after redirects), and
  // "internal" means the final page's own host.
  const finalHost = current.hostname.toLowerCase();
  let internalLinks = 0;
  let externalLinks = 0;
  const linkMatches = cleanHtml.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']*)["']/gi);
  for (const match of linkMatches) {
    const href = (match[1] ?? "").trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    let resolved: URL;
    try {
      resolved = new URL(href, current);
    } catch {
      continue;
    }
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:") continue;
    if (resolved.hostname.toLowerCase() === finalHost) internalLinks += 1;
    else externalLinks += 1;
  }

  const finalUrl = current.toString();
  let finalHttps = target.protocol === "https:";
  try {
    finalHttps = new URL(finalUrl).protocol === "https:";
  } catch {
    // Keep the entered URL's protocol if the final URL cannot be parsed.
  }
  return NextResponse.json({
    url: target.toString(),
    finalUrl,
    status: response.status,
    responseTimeMs,
    sizeBytes: analysedBytes,
    sizeKb: Math.round((analysedBytes / 1024) * 10) / 10,
    https: finalHttps,
    isHtml,
    title,
    metaDescriptionPresent,
    viewportPresent,
    h1Count,
    imagesTotal: imgTags.length,
    imagesWithAlt,
    internalLinks,
    externalLinks,
    truncated,
  });
}
