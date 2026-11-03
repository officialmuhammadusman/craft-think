"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, ChevronDown, Send, User } from "lucide-react";
import { guideAnswer, type GuideReply } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Msg = { role: "user" | "guide"; text: string; reply?: GuideReply };

const SUGGESTIONS = ["My website is slow", "I need a mobile app", "I need AI to answer customers", "I need a booking system", "How much does it cost?", "I need LangChain / LangGraph agents", "I need a multi-agent system", "I need AI that answers from my documents"];

/**
 * Think chat. It tries POST /api/think first: when a real AI key is
 * configured server-side, Think answers from the site's own data via
 * that provider. When the API is gated ({ ai: false }) or the request
 * fails, it falls back SILENTLY to the on-site guide brain in
 * guideAnswer (src/data/content.ts), which composes answers from the
 * site's own services, projects and FAQs with no external call. The
 * visitor never sees an error for the missing key or a failed
 * provider call.
 *
 * Layout: in bare mode (chat sheet) this is ONE scrollable region —
 * the sheet header, the greeting message, the messages, the
 * suggestion chips and the follow-up form all scroll together inside
 * a single scroller, and only the message input row stays pinned at
 * the sheet bottom — so nothing above the input sits fixed while the
 * rest moves. On the full /guide page (bare=false) the previous
 * layout is kept: the message list scrolls on its own and the
 * suggestions + input + follow-up sit in a bottom block.
 *
 * Behaviour: a vague first message gets ONE clarifying question with
 * quick-reply choices (from guideAnswer) instead of a guessed
 * recommendation, and the latest guide answer carries a "Book a free
 * consultation" action prefilled with the conversation summary, so
 * the human handoff starts where the chat left off. Lead capture
 * stays late and optional behind the collapsed follow-up toggle.
 */
export function AiGuide({ initial = "", bare = false }: { initial?: string; bare?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "guide", text: "Hello! I am Think — your guide to CraftThink. Tell me what your business needs, and I will point you to the right service and a similar project, then help you book a free call." },
  ]);
  const [input, setInput] = useState(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [followupOpen, setFollowupOpen] = useState(false);
  const askedInitial = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const followupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTopicRef = useRef<GuideReply | undefined>(undefined);

  async function ask(text: string) {
    const clean = text.trim();
    if (!clean || waiting) return;
    // Conversation so far (guide turns become "assistant" for the API),
    // plus this new question. The API caps and validates it server-side.
    const history = [
      ...messages.map((m) => ({ role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant", content: m.text })),
      { role: "user" as const, content: clean },
    ];
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setProblem(clean);
    setInput("");
    setWaiting(true);
    inputRef.current?.focus();
    // Live AI first. ANY failure or { ai: false } gating falls back
    // silently to the existing rule-based answer — never an error, and
    // never an invented answer.
    try {
      const res = await fetch("/api/think", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json()) as { ai?: unknown; answer?: unknown };
      const aiAnswer = typeof data.answer === "string" ? data.answer.trim() : "";
      if (data?.ai === true && aiAnswer) {
        setMessages((m) => [...m, { role: "guide", text: aiAnswer }]);
        setWaiting(false);
        inputRef.current?.focus();
        return;
      }
    } catch {
      // Fall through to the rule-based answer below.
    }
    const reply = guideAnswer(clean, {
      topic: lastTopicRef.current,
      history: messages.filter((m) => m.role === "user").map((m) => m.text),
    });
    if (reply.serviceHref) lastTopicRef.current = reply;
    // No answer to this question: open the follow-up form at once so
    // the visitor can leave their details and be contacted about it.
    if (reply.noAnswer) setFollowupOpen(true);
    setMessages((m) => [...m, { role: "guide", text: reply.text, reply }]);
    setWaiting(false);
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (initial && !askedInitial.current) {
      askedInitial.current = true;
      // Same path as a typed question: live AI first, rule-based fallback.
      ask(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // New messages (and the Thinking indicator) keep the latest turn
  // visible. In bare mode the whole sheet content shares one
  // scroller, so scroll the end of the messages into view instead of
  // jumping to the very bottom of the sheet (which would hide the
  // latest message above the suggestions and follow-up form). In
  // full-page mode the message list itself still scrolls to bottom.
  useEffect(() => {
    if (bare) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, waiting, bare]);
  // When the follow-up form opens, bring it into view so the
  // Continue button is reachable inside the sheet. In bare mode the
  // form lives in the single sheet scroller; in full-page mode the
  // bottom block keeps its own scroll as before.
  useEffect(() => {
    if (!followupOpen) return;
    if (bare) {
      followupRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      bottomRef.current?.scrollTo({ top: bottomRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [followupOpen, bare]);

  // Conversation summary for the human handoff: the visitor's own
  // questions plus the last service/project Think suggested.
  const conversationSummary = (() => {
    const asked = messages.filter((m) => m.role === "user").map((m) => m.text);
    const suggested = [...messages].reverse().find((m) => m.role === "guide" && m.reply?.serviceLabel)?.reply;
    const parts = [
      asked.length ? `What the visitor asked: ${asked.join(" | ")}` : "",
      suggested?.serviceLabel ? `Think suggested: ${suggested.serviceLabel}${suggested.projectLabel ? ` (similar project: ${suggested.projectLabel})` : ""}` : "",
    ].filter(Boolean);
    return parts.join(" ").slice(0, 500);
  })();

  const contactHref = `/contact?${new URLSearchParams({ name, email, problem: conversationSummary || problem || messages.filter((m) => m.role === "user").at(-1)?.text || "" }).toString()}`;
  // Handoff with context: the consultation form is prefilled with the
  // visitor's own words plus what Think suggested, so the human
  // conversation starts where the chat left off — no repeating.
  const consultationHref = `/consultation?${new URLSearchParams({ problem: conversationSummary || problem || messages.filter((m) => m.role === "user").at(-1)?.text || "" }).toString()}`;

  // Suggestions UPDATE below each answer: the latest guide reply's
  // follow-ups (max 3, fitted to that answer's topic) replace the
  // defaults. A clarifying question keeps its quick replies inside
  // its own bubble, so no bottom chips are shown for it. While the
  // visitor types, the current set is filtered by the typed text.
  // Before any answer, the original 3 default hints are shown.
  const lastGuideReply = [...messages].reverse().find((m) => m.role === "guide" && m.reply)?.reply;
  const baseSuggestions = lastGuideReply?.followUps?.length
    ? lastGuideReply.followUps
    : lastGuideReply?.quickReplies
      ? []
      : SUGGESTIONS.slice(0, 3);
  const typed = input.trim().toLowerCase();
  const shownSuggestions = typed
    ? baseSuggestions.filter((s) => s.toLowerCase().includes(typed)).slice(0, 3)
    : baseSuggestions.slice(0, 3);

  // Bare-mode sheet header: rendered INSIDE the single sheet
  // scroller (below) so it scrolls away with the rest of the sheet
  const suggestionsBlock = shownSuggestions.length > 0 && (
    <div className="border-t border-[#E7E9F2] px-5 pb-2 pt-4 sm:px-6">
      <p className="mb-2 text-sm font-semibold text-[#64748B]">{typed ? "Hints for what you typed:" : lastGuideReply?.followUps?.length ? "What next?" : "Try one of these:"}</p>
      <div className="flex flex-wrap gap-2">
        {shownSuggestions.map((s) => (
          <button key={s} type="button" disabled={waiting} onClick={() => ask(s)} className="min-h-[48px] rounded-full border border-[#E7E9F2] bg-white px-4 text-base font-medium text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-50">{s}</button>
        ))}
      </div>
    </div>
  );

  const inputForm = (
    <form className="flex gap-2 p-4 sm:p-5" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
      <label className="sr-only" htmlFor="ai-input">What do you need help with?</label>
      <input ref={inputRef} id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What do you need help with?" className="min-h-[52px] flex-1 rounded-full border border-[#E7E9F2] px-5 text-base outline-none focus:border-[#4F46E5]" />
      <Button type="submit" disabled={waiting} className="gap-2">{waiting ? "Thinking…" : "Ask"} <Send size={16} /></Button>
    </form>
  );

  const followupBlock = (
    <div ref={followupRef} className="border-t border-[#E7E9F2] bg-[#F6F7FB] px-5 py-4 sm:px-6">
      <button type="button" onClick={() => setFollowupOpen((v) => !v)} aria-expanded={followupOpen} className="flex min-h-[48px] w-full items-center justify-between gap-2 text-left text-base font-bold text-[#0B1220]">
        Leave your details for a follow-up
        <ChevronDown size={18} className={`shrink-0 transition-transform ${followupOpen ? "rotate-180" : ""}`} />
      </button>
      {followupOpen && (
        <div className="mt-3 flex flex-col gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="min-h-[52px] rounded-xl border border-[#E7E9F2] bg-white px-4 text-base" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" aria-label="Your email" className="min-h-[52px] rounded-xl border border-[#E7E9F2] bg-white px-4 text-base" />
          <Button href={contactHref} className="w-full">Continue to Contact →</Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={bare ? "flex min-h-0 flex-1 flex-col overflow-hidden bg-white" : "overflow-hidden rounded-[24px] border border-[#E7E9F2] bg-white shadow-xl"}>
      {!bare && (
      <div className="flex items-start justify-between gap-4 bg-[#0B1220] px-6 py-5 text-white">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]"><Bot size={22} /></span>
          <div>
            <p className="text-lg font-bold">Ask Think</p>
            <p className="mt-0.5 max-w-md text-sm leading-snug text-white/60">Answers come from this site&apos;s services, projects and FAQs.</p>
          </div>
        </div>
      </div>
      )}

      <div ref={scrollRef} className={bare ? "min-h-0 flex-1 overflow-y-auto overscroll-contain" : "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"} aria-live="polite">
        <div className={bare ? "flex flex-col gap-4 px-5 py-5 sm:px-6" : "contents"}>
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#EEF2FF] text-[#4F46E5]"}`}>{m.role === "user" ? <User size={17} /> : <Bot size={17} />}</span>
            <div className={`max-w-[85%] rounded-[20px] px-4 py-3 ${m.role === "user" ? "rounded-tr-sm bg-[#4F46E5] text-white" : "rounded-tl-sm bg-[#F6F7FB] text-[#0B1220]"}`}>
              <p className="text-base leading-relaxed">{m.text}</p>
              {m.reply?.quickReplies && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.reply.quickReplies.map((qr) => (
                    <button key={qr} type="button" disabled={waiting} onClick={() => ask(qr)} className="min-h-[48px] rounded-full bg-white px-4 text-base font-semibold text-[#4F46E5] shadow-sm hover:bg-[#EEF2FF] disabled:opacity-50">{qr}</button>
                  ))}
                </div>
              )}
              {m.reply?.serviceHref && (
                <div className="mt-3 grid gap-2">
                  <Link href={m.reply.serviceHref} className="flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-base font-semibold text-[#4F46E5] shadow-sm hover:bg-[#EEF2FF]">
                    {m.reply.serviceLabel} <ArrowRight size={16} />
                  </Link>
                  {m.reply.projectHref && (
                    <Link href={m.reply.projectHref} className="flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-base font-semibold text-[#0B1220] shadow-sm hover:bg-[#F6F7FB]">
                      Similar project: {m.reply.projectLabel} <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              )}
              {i === messages.length - 1 && m.role === "guide" && (m.reply?.serviceHref || m.reply?.projectHref) && (
                <div className="mt-3">
                  <Link href={consultationHref} className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-4 text-base font-bold text-white shadow-sm hover:bg-[#4338CA]">
                    Book a free consultation <ArrowRight size={16} />
                  </Link>
                  <p className="mt-2 text-sm leading-snug text-[#64748B]">This carries your question and what Think suggested, so you do not have to repeat yourself.</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {waiting && (
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5]"><Bot size={17} /></span>
            <div className="rounded-[20px] rounded-tl-sm bg-[#F6F7FB] px-4 py-3 text-base text-[#64748B]">
              <span className="animate-pulse">Thinking…</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
        {bare && suggestionsBlock}
        {bare && followupBlock}
        {bare && <div aria-hidden="true" className="h-3 shrink-0" />}
      </div>

      {/* Bottom block: full-page mode only. In bare mode the
          suggestions, input and follow-up live in the single sheet
          scroller above (input pinned below it), so this block is
          the non-bare layout: suggestions + input + follow-up. */}
      {bare ? (
        <div className="shrink-0 border-t border-[#E7E9F2] bg-white">
          {inputForm}
        </div>
      ) : (
      <div ref={bottomRef} className="shrink-0">
        {suggestionsBlock}

        {inputForm}

        {followupBlock}
      </div>
      )}
    </div>
  );
}
