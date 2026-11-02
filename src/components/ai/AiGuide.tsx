"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { guideAnswer, type GuideReply } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Msg = { role: "user" | "guide"; text: string; reply?: GuideReply };

const SUGGESTIONS = ["My website is slow", "I need a mobile app", "I need AI to answer customers", "I need a booking system", "How much does it cost?"];

/**
 * Guided demo chat. Answers ONLY from the site's own knowledge base
 * (guideAnswer in src/data/content.ts). No backend, no external AI API.
 * Lead capture links to /contact with the problem prefilled via query params.
 */
export function AiGuide({ initial = "" }: { initial?: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "guide", text: "Hello! I am the CraftThink guide (demo). Tell me in plain words what you need help with, and I will point you to the right service and a similar project. I only answer from CraftThink's own services, projects, process and FAQs." },
  ]);
  const [input, setInput] = useState(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const askedInitial = useRef(false);
  useEffect(() => {
    if (initial && !askedInitial.current) {
      askedInitial.current = true;
      const reply = guideAnswer(initial);
      setMessages((m) => [...m, { role: "user", text: initial }, { role: "guide", text: reply.text, reply }]);
      setProblem(initial);
    }
    // Run once on mount for a prefilled question (e.g. from the hero search).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="rounded-2xl border border-[#E7E9F2] bg-white shadow-sm overflow-hidden">
      <div className="bg-[#F0FDFA] px-5 py-4 border-b border-[#E7E9F2]">
        <p className="font-semibold text-[#0B1220]">Ask the CraftThink Guide</p>
        <p className="text-sm text-[#475569]">Guided demo — answers come only from this site’s services, projects and FAQs. No live AI API is connected yet.</p>
      </div>
      <div className="flex flex-col gap-3 px-5 py-5 max-h-[420px] overflow-y-auto" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "self-end max-w-[85%] rounded-2xl rounded-br-sm bg-[#4F46E5] px-4 py-3 text-white" : "self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-[#F6F7FB] px-4 py-3 text-[#0B1220]"}>
            <p className="text-base leading-relaxed">{m.text}</p>
            {m.reply?.serviceHref && (
              <p className="mt-2 text-sm">
                <Link href={m.reply.serviceHref} className="font-semibold underline">→ {m.reply.serviceLabel}</Link>
                {m.reply.projectHref && <> · <Link href={m.reply.projectHref} className="font-semibold underline">{m.reply.projectLabel}</Link></>}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" onClick={() => ask(s)} className="min-h-[44px] rounded-full border border-[#E7E9F2] bg-white px-4 text-sm font-medium text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]">{s}</button>
        ))}
      </div>
      <form className="flex gap-2 border-t border-[#E7E9F2] p-3" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
        <label className="sr-only" htmlFor="ai-input">What do you need help with?</label>
        <input id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What do you need help with?" className="min-h-[48px] flex-1 rounded-full border border-[#E7E9F2] px-4 text-base outline-none focus:border-[#4F46E5]" />
        <Button type="submit">Ask</Button>
      </form>
      <div className="border-t border-[#E7E9F2] bg-[#F6F7FB] px-5 py-4">
        <p className="font-semibold">Want us to follow up? Leave your details:</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="min-h-[48px] rounded-xl border border-[#E7E9F2] bg-white px-4 text-base" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" aria-label="Your email" className="min-h-[48px] rounded-xl border border-[#E7E9F2] bg-white px-4 text-base" />
          <Button href={contactHref}>Continue to Contact →</Button>
        </div>
        <p className="mt-2 text-sm text-[#64748B]">This sends nothing by itself — it opens the contact form with your details prefilled. No backend stores your details on this demo site.</p>
      </div>
    </div>
  );
}
