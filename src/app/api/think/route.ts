import { NextResponse } from "next/server";
import { services, projects, processSteps } from "@/data/content";

/**
 * POST /api/think — the Think assistant, gated honestly.
 *
 * Body: { messages: [{ role: "user" | "assistant", content: string }] }
 *
 * Provider priority (keys are read ONLY from the environment — never
 * hardcoded, never fetched from the web; a Hugging Face token belongs
 * to a free personal account and must be pasted into the environment
 * by the site owner):
 *
 * (a) If HF_API_KEY is set, the conversation is sent to Hugging Face's
 * free OpenAI-compatible router (https://router.huggingface.co/v1/chat/completions),
 * model from THINK_AI_MODEL (default Qwen/Qwen2.5-7B-Instruct, a free,
 * openly available instruction model) — using plain fetch. No new npm
 * dependency. The key is only ever sent as a Bearer token to that
 * endpoint.
 *
 * (b) Otherwise, if THINK_AI_API_KEY is set, the conversation is sent
 * to a generic OpenAI-compatible chat-completions endpoint — URL from
 * THINK_AI_API_URL (default https://api.openai.com/v1/chat/completions),
 * model from THINK_AI_MODEL (default gpt-4o-mini).
 *
 * The system prompt is built from the REAL site data in
 * src/data/content.ts (the 11 services, 6 projects, process steps, and
 * /consultation as the next step). It forbids inventing prices, clients,
 * testimonials, or stats, and sends visitors to a free consultation
 * when it does not know. Success returns { ai: true, answer }.
 *
 * (c) If neither key is set, returns { ai: false, reason: "think_key_missing" }
 * and the chat UI falls back silently to its on-site guide brain.
 *
 * (d) On ANY provider error (bad status, timeout, bad payload, empty
 * answer) returns { ai: false, reason: "think_error" } — an answer is
 * never invented to cover a provider failure.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROVIDER_TIMEOUT_MS = 30_000;
const MAX_MESSAGES = 20;
const MAX_CONTENT_CHARS = 4000;

function buildSystemPrompt(): string {
  const serviceLines = services.map((s) => `- ${s.title} (/services/${s.slug}): ${s.line}`).join("\n");
  const projectLines = projects.map((p) => `- ${p.title} (/work/${p.slug}): ${p.line}`).join("\n");
  const processLines = processSteps.map((s) => `${s.n}. ${s.title}: ${s.text}`).join("\n");
  return [
    "You are Think, the guide for CraftThink, a software house that works remotely with clients worldwide.",
    "Speak in plain, simple language a non-technical business owner understands. Keep answers short and helpful.",
    "Answer ONLY from the services, projects, and process below. Do not invent anything else.",
    "NEVER invent prices, costs, client names, testimonials, reviews, statistics, timelines, or team details.",
    "If the visitor asks about cost, say costs depend on size and features and point them to a free consultation for a firm quote.",
    "If you do not know something, say so plainly and suggest booking a free consultation at /consultation.",
    "Always end by offering the next step: book a free consultation at /consultation.",
    "",
    "SERVICES:",
    serviceLines,
    "",
    "PROJECTS (similar work you may point to):",
    projectLines,
    "",
    "HOW CRAFTTHINK WORKS:",
    processLines,
  ].join("\n");
}

type IncomingMessage = { role?: unknown; content?: unknown };

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ai: false, reason: "think_error" }, { status: 400 });
  }
  const incoming = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return NextResponse.json({ ai: false, reason: "think_error" }, { status: 400 });
  }
  const messages = (incoming as IncomingMessage[])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim().length > 0)
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role as "user" | "assistant", content: (m.content as string).slice(0, MAX_CONTENT_CHARS) }));
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ ai: false, reason: "think_error" }, { status: 400 });
  }

  // Hugging Face first (free tier): a personal token in HF_API_KEY.
  // Otherwise the existing OpenAI-compatible key. Neither set means
  // gated, not broken: the chat UI falls back to the on-site brain.
  const hfKey = process.env.HF_API_KEY;
  const genericKey = process.env.THINK_AI_API_KEY;
  if (!hfKey && !genericKey) {
    return NextResponse.json({ ai: false, reason: "think_key_missing" });
  }
  const apiKey = hfKey ?? genericKey!;
  const apiUrl = hfKey
    ? "https://router.huggingface.co/v1/chat/completions"
    : process.env.THINK_AI_API_URL || "https://api.openai.com/v1/chat/completions";
  const model = process.env.THINK_AI_MODEL || (hfKey ? "Qwen/Qwen2.5-7B-Instruct" : "gpt-4o-mini");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 800,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ai: false, reason: "think_error" });
    }
    const data = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json({ ai: false, reason: "think_error" });
    }
    return NextResponse.json({ ai: true, answer: answer.trim() });
  } catch {
    return NextResponse.json({ ai: false, reason: "think_error" });
  } finally {
    clearTimeout(timer);
  }
}
