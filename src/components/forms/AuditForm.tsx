"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const CHECKS = [
  { id: "slow", label: "My website or app feels slow", fix: "Speed audit: check slow pages, large images, slow queries and missing caching. Fix the slowest pages first." },
  { id: "mobile", label: "It looks bad or is hard to use on a phone", fix: "Mobile audit: test every page at phone size, fix tap targets, text size and forms that break on small screens." },
  { id: "enquiry", label: "Visitors do not contact us or buy", fix: "Conversion audit: make the main action obvious on every page, shorten forms, and add clear contact and booking options." },
  { id: "booking", label: "Bookings still come by phone or chat", fix: "Booking audit: add online booking with real time slots, payments and reminders, so staff stop answering the same calls." },
  { id: "manual", label: "We do a lot of work by hand in spreadsheets", fix: "Automation audit: list the manual steps, then put customers, sales and billing in one system with automatic reports." },
  { id: "bugs", label: "There are bugs, or things break often", fix: "Stability audit: reproduce the top bugs, add tests for them, and set up monitoring so problems are found early." },
  { id: "old", label: "The design looks old", fix: "Design audit: keep what works, redesign what confuses customers, and prototype the new look before rebuilding." },
  { id: "ai", label: "Customers ask the same questions again and again", fix: "AI audit: build an assistant that answers from your own business data, with checking, and hands over to a human when unsure." },
];

export function AuditForm() {
  const [url, setUrl] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const toggle = (id: string) => setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const results = CHECKS.filter((c) => picked.includes(c.id));
  return (
    <div className="rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm">
      <label className="flex flex-col gap-2 font-semibold">Your website or app URL (optional)
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourbusiness.com" className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" />
      </label>
      <fieldset className="mt-6">
        <legend className="font-semibold">What problems do you have? Tick all that apply.</legend>
        <div className="mt-3 flex flex-col gap-2">
          {CHECKS.map((c) => (
            <label key={c.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-[#E7E9F2] px-4">
              <input type="checkbox" checked={picked.includes(c.id)} onChange={() => toggle(c.id)} className="h-5 w-5" /> {c.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-6"><Button onClick={() => setDone(true)} disabled={picked.length === 0}>Get My Free Audit Checklist</Button></div>
      {done && (
        <div className="mt-6">
          <h2 className="ct-h3">Your audit checklist{url ? ` for ${url}` : ""}</h2>
          <p className="mt-1 text-[#475569]">This is a plain-language checklist from your answers, not a live technical scan. A real audit is confirmed in your free consultation.</p>
          <ol className="mt-4 flex flex-col gap-3">
            {results.map((r, i) => (
              <li key={r.id} className="rounded-2xl bg-[#F6F7FB] p-5"><strong>Fix {i + 1}: {r.label}</strong><p className="mt-1 text-[#475569]">{r.fix}</p></li>
            ))}
          </ol>
          <div className="mt-6"><Button href={`/consultation?problem=${encodeURIComponent(`Free audit request${url ? ` for ${url}` : ""}: ${results.map((r) => r.label).join("; ")}`)}`}>Book a Free Consultation →</Button></div>
        </div>
      )}
    </div>
  );
}
