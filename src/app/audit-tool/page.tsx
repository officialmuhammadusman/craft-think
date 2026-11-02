"use client";
import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";

/**
 * /audit-tool — a REAL website audit tool (client page; metadata is
 * omitted because Next.js does not allow a metadata export from a
 * client component — the parent can split this into a server wrapper
 * later if page metadata is wanted).
 *
 * The visitor enters a URL. POST /api/audit fetches that public page
 * server-side and returns real measurements. This page shows exactly
 * those numbers, with a plain-language explanation of each. It NEVER
 * shows a score, grade, or any metric the API did not measure.
 * The questionnaire on /audit (AuditForm) is a separate thing and is
 * untouched by this page.
 */

type AuditReport = {
  url: string;
  finalUrl: string;
  status: number;
  responseTimeMs: number;
  sizeBytes: number;
  sizeKb: number;
  https: boolean;
  isHtml: boolean;
  title: string | null;
  metaDescriptionPresent: boolean;
  viewportPresent: boolean;
  h1Count: number;
  imagesTotal: number;
  imagesWithAlt: number;
  internalLinks: number;
  externalLinks: number;
  truncated: boolean;
};

function Row({ label, value, explain }: { label: string; value: string; explain: string }) {
  return (
    <div className="border-b border-[#E7E9F2] px-5 py-4 last:border-b-0 sm:px-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p className="text-base font-bold text-[#0B1220]">{label}</p>
        <p className="text-base font-semibold text-[#4F46E5]">{value}</p>
      </div>
      <p className="mt-1 text-base leading-relaxed text-[#475569]">{explain}</p>
    </div>
  );
}

export default function AuditToolPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    const clean = url.trim();
    if (!clean) {
      setError("Please enter a website address first.");
      return;
    }
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: clean }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "The check did not work. Please try again.");
        return;
      }
      setReport(data as AuditReport);
    } catch {
      setError("The check did not work. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const altPercent =
    report && report.imagesTotal > 0 ? Math.round((report.imagesWithAlt / report.imagesTotal) * 100) : null;

  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading
            as="h1"
            eyebrow="Free Website Audit Tool"
            title="Check your website, for real"
            subtitle="Enter your website address and we measure the live page — speed, size, security and basic setup. No score, no grade, just the real numbers."
          />

          <form onSubmit={runAudit} className="mt-10 rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm sm:p-6">
            <label className="text-base font-bold text-[#0B1220]" htmlFor="audit-url">
              Your website address
            </label>
            <input
              id="audit-url"
              type="text"
              inputMode="url"
              autoComplete="off"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-3 min-h-[52px] w-full rounded-xl border border-[#E7E9F2] px-4 text-base outline-none focus:border-[#4F46E5]"
            />
            <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
              Only public websites can be checked. Local and private addresses are refused.
            </p>
            <Button type="submit" disabled={loading} className="mt-4 w-full sm:w-auto">
              {loading ? "Checking your page…" : "Run the free check"}
            </Button>
            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-base leading-relaxed text-[#991B1B]">
                {error}
              </p>
            )}
          </form>

          {report && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#0B1220]">Results for {report.finalUrl}</h2>
              {report.finalUrl !== report.url && (
                <p className="mt-1 text-base text-[#475569]">You entered {report.url} — it redirected here.</p>
              )}
              {report.truncated && (
                <p className="mt-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-base leading-relaxed text-[#92400E]">
                  This page is larger than 5 MB, so only the first part was checked. The size below is the part actually read.
                </p>
              )}
              <div className="mt-4 overflow-hidden rounded-[20px] border border-[#E7E9F2] bg-white shadow-sm">
                <Row
                  label="Page status"
                  value={`${report.status}`}
                  explain={
                    report.status >= 200 && report.status < 300
                      ? "Your page loaded successfully. Visitors and search engines can reach it."
                      : report.status >= 300 && report.status < 400
                        ? "Your page redirected. Visitors still reach content, but check it lands on the right page."
                        : "Your page did not load normally. Visitors hitting this address see an error instead of your content."
                  }
                />
                <Row
                  label="Response time"
                  value={`${report.responseTimeMs} ms`}
                  explain="How long the page took to start answering, measured just now. Lower is better — slow answers make visitors leave before the page even appears."
                />
                <Row
                  label="Page size"
                  value={`${report.sizeKb} KB (${report.sizeBytes.toLocaleString()} bytes)`}
                  explain="How much data the page itself sends. Larger pages take longer to load, especially on phones and slow connections."
                />
                <Row
                  label="Secure connection (HTTPS)"
                  value={report.https ? "Yes" : "No"}
                  explain={
                    report.https
                      ? "Your page loads over a secure connection. Browsers show it as safe."
                      : "Your page does not use a secure connection. Browsers warn visitors, and forms on it are not safe."
                  }
                />
                <Row
                  label="Page title"
                  value={report.title ?? "No title found"}
                  explain={
                    report.title
                      ? `The title shown in browser tabs and search results: “${report.title}”.`
                      : "Your page has no title. Search results and browser tabs then show the address instead of your business name."
                  }
                />
                <Row
                  label="Search description"
                  value={report.metaDescriptionPresent ? "Yes" : "No"}
                  explain={
                    report.metaDescriptionPresent
                      ? "Your page has a short description search engines can show under your link."
                      : "Your page has no search description, so search engines pick the text themselves — often badly."
                  }
                />
                <Row
                  label="Mobile setup (viewport)"
                  value={report.viewportPresent ? "Yes" : "No"}
                  explain={
                    report.viewportPresent
                      ? "Your page tells phones how to size it, so it can display properly on small screens."
                      : "Your page does not tell phones how to size it, so it may look tiny or broken on a phone."
                  }
                />
                <Row
                  label="Main headings (H1)"
                  value={`${report.h1Count}`}
                  explain={
                    report.h1Count === 1
                      ? "Your page has exactly one main heading, which is the usual setup."
                      : report.h1Count === 0
                        ? "Your page has no main heading, so visitors and search engines get no clear statement of what the page is about."
                        : "Your page has more than one main heading. One clear main heading per page is the usual setup."
                  }
                />
                <Row
                  label="Images with a description"
                  value={`${report.imagesWithAlt} of ${report.imagesTotal}${altPercent !== null ? ` (${altPercent}%)` : ""}`}
                  explain={
                    report.imagesTotal === 0
                      ? "Your page has no images, so there is nothing to describe."
                      : "This counts images carrying an alt attribute, which screen readers read aloud and search engines use. Images without one are invisible to both."
                  }
                />
                <Row
                  label="Links to your own pages"
                  value={`${report.internalLinks}`}
                  explain="Links from this page to other pages on the same website. They help visitors find more and help search engines understand your site."
                />
                <Row
                  label="Links to other websites"
                  value={`${report.externalLinks}`}
                  explain="Links from this page to different websites, such as partners, social pages, or sources."
                />
              </div>
              {!report.isHtml && (
                <p className="mt-3 text-base leading-relaxed text-[#475569]">
                  Note: this address did not return a normal web page, so title, headings, images and links could not be measured.
                </p>
              )}
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                These are measurements from one live check, not a grade. Want help fixing what you found?{" "}
                <Link href="/consultation" className="font-semibold text-[#4F46E5] underline">
                  Book a free consultation
                </Link>{" "}
                or{" "}
                <Link href="/audit" className="font-semibold text-[#4F46E5] underline">
                  take the problem checklist
                </Link>
                .
              </p>
            </div>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
