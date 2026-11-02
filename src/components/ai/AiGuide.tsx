"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Send, User } from "lucide-react";
import { guideAnswer, type GuideReply } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Msg = { role: "user" | "guide"; text: string; reply?: GuideReply };

const SUGGESTIONS = ["My website is slow", "I need a mobile app", "I need AI to answer customers", "I need a booking system", "How much does it cost?", "I need LangChain / LangGraph agents", "I need a multi-agent system", "I need AI that answers from my documents"];

/**
 * Premium guided-demo chat. Answers ONLY from the site's own knowledge
 * base (guideAnswer in src/data/content.ts). No backend, no external AI API.
 * Suggestions are shown as cards (service + project), not plain links.
 *
 * Scroll fix (design unchanged): the sheet wrapper is the ONE scroll
 * container in bare mode — the message list has no max-h/overflow, so
 * scrolling over messages reaches the sheet instead of being trapped
 * inside a nested list. data-lenis-prevent is kept on the sheet and
 * the message area so Lenis never steals wheel/touch scroll. On the
 * full /guide page (bare=false) the inner list keeps its own scroll.
 */
export function AiGuide({ initial = "", bare = false }: { initial?: string; bare?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "guide", text: "Hello! I am Think." },
  ]);
  const [input, setInput] = useState(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const askedInitial = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initial && !askedInitial.current) {
      askedInitial.current = true;
      const reply = guideAnswer(initial);
      setMessages((m) => [...m, { role: "user", text: initial }, { role: "guide", text: reply.text, reply }]);
      setProblem(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Single-scroll-area fix: in bare mode (chat sheet) the message list is
  // NOT its own scroll container (see below) — the sheet wrapper is the
  // one scroll area, so new messages scroll THAT container to the bottom.
  // On the full /guide page (bare=false) the inner list still scrolls.
  useEffect(() => {
    if (bare) {
      const outer = scrollRef.current?.closest("[data-chat-scroll]");
      outer?.scrollTo({ top: outer.scrollHeight, behavior: "smooth" });
    } else {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, bare]);

  function ask(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const reply = guideAnswer(clean);
    setMessages((m) => [...m, { role: "user", text: clean }, { role: "guide", text: reply.text, reply }]);
    setProblem(clean);
    setInput("");
  }

  const contactHref = `/contact?${new URLSearchParams({ name, email, problem: problem || messages.filter((m) => m.role === "user").at(-1)?.text || "" }).toString()}`;

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E7E9F2] bg-white shadow-xl">
      {!bare && (
      <div className="flex items-start justify-between gap-4 bg-[#0B1220] px-6 py-5 text-white">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]"><Bot size={22} /></span>
          <div>
            <p className="text-lg font-bold">Ask Think</p>
            <p className="mt-0.5 max-w-md text-sm leading-snug text-white/60">Guided demo — answers come only from this site&apos;s services, projects and FAQs. No live AI API is connected yet.</p>
          </div>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white sm:flex"><span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> Guided demo</span>
      </div>
      )}

      <div ref={scrollRef} data-lenis-prevent className={bare ? "flex flex-col gap-4 px-5 py-5 sm:px-6" : "flex max-h-[460px] flex-col gap-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#EEF2FF] text-[#4F46E5]"}`}>{m.role === "user" ? <User size={17} /> : <Bot size={17} />}</span>
            <div className={`max-w-[85%] rounded-[20px] px-4 py-3 ${m.role === "user" ? "rounded-tr-sm bg-[#4F46E5] text-white" : "rounded-tl-sm bg-[#F6F7FB] text-[#0B1220]"}`}>
              <p className="text-base leading-relaxed">{m.text}</p>
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
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E7E9F2] px-5 pb-2 pt-4 sm:px-6">
        <p className="mb-2 text-sm font-semibold text-[#64748B]">Try one of these:</p>
        <div data-lenis-prevent className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => ask(s)} className="min-h-[48px] rounded-full border border-[#E7E9F2] bg-white px-4 text-base font-medium text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]">{s}</button>
          ))}
        </div>
      </div>

      <form className="flex gap-2 p-4 sm:p-5" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
        <label className="sr-only" htmlFor="ai-input">What do you need help with?</label>
        <input id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What do you need help with?" className="min-h-[52px] flex-1 rounded-full border border-[#E7E9F2] px-5 text-base outline-none focus:border-[#4F46E5]" />
        <Button type="submit" className="gap-2">Ask <Send size={16} /></Button>
      </form>

      <div className="border-t border-[#E7E9F2] bg-[#F6F7FB] px-5 py-5 sm:px-6">
        <p className="text-base font-bold">Want us to follow up? Leave your details:</p>
        <div className="mt-3 flex flex-col gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="min-h-[52px] rounded-xl border border-[#E7E9F2] bg-white px-4 text-base" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" aria-label="Your email" className="min-h-[52px] rounded-xl border border-[#E7E9F2] bg-white px-4 text-base" />
          <Button href={contactHref} className="w-full">Continue to Contact →</Button>
        </div>
        <p className="mt-2 text-sm text-[#64748B]">This sends nothing by itself — it opens the contact form with your details prefilled. No backend stores your details on this demo site.</p>
      </div>
    </div>
  );
}
