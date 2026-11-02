"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Rough estimator only. Ranges are from the business roadmap's pricing
 * FRAMEWORK (analyst suggestion, not published fixed prices) and are
 * labelled ESTIMATE ONLY everywhere they appear.
 */
const BASE: Record<string, { low: number; high: number; weeks: string }> = {
  "Small website / portfolio": { low: 800, high: 2500, weeks: "2–4 weeks" },
  "Business website + booking / CRM": { low: 2000, high: 6000, weeks: "4–8 weeks" },
  "Custom SaaS / CRM / HR system": { low: 5000, high: 20000, weeks: "8–16 weeks, in phases" },
  "Mobile app": { low: 4000, high: 15000, weeks: "8–14 weeks, in phases" },
  "AI assistant / RAG": { low: 2000, high: 8000, weeks: "4–10 weeks" },
  "Fix / speed-up sprint": { low: 500, high: 2000, weeks: "1–2 weeks" },
};

export function EstimateForm() {
  const [type, setType] = useState("Small website / portfolio");
  const [size, setSize] = useState("small");
  const [features, setFeatures] = useState(1);
  const base = BASE[type];
  const sizeMul = size === "small" ? 1 : size === "medium" ? 1.4 : 1.9;
  const low = Math.round((base.low * sizeMul + (features - 1) * 400) / 100) * 100;
  const high = Math.round((base.high * sizeMul + (features - 1) * 800) / 100) * 100;
  return (
    <div className="rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        <label className="flex flex-col gap-2 font-semibold">What do you need?
          <select value={type} onChange={(e) => setType(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal">
            {Object.keys(BASE).map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-2 font-semibold">Project size
          <select value={size} onChange={(e) => setSize(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal">
            <option value="small">Small — a few pages / features</option>
            <option value="medium">Medium — several pages / features</option>
            <option value="large">Large — many pages / features / integrations</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 font-semibold">Extra features (payments, booking, admin, AI, etc.): {features}
          <input type="range" min={0} max={5} value={features} onChange={(e) => setFeatures(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <div className="mt-6 rounded-2xl bg-[#EEF2FF] p-6">
        <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">Estimate only — not a fixed price</p>
        <p className="ct-h2 mt-2">${low.toLocaleString()} – ${high.toLocaleString()}+</p>
        <p className="mt-1 text-[#475569]">Rough timeline: {base.weeks}. Final price depends on your exact pages, features and content, and is confirmed in writing after a free consultation.</p>
        <div className="mt-4"><Button href={`/consultation?problem=${encodeURIComponent(`Estimate request: ${type}, size ${size}, ${features} extra features. Rough range $${low}–$${high}.`)}`}>Book a Free Consultation →</Button></div>
        <p className="mt-3 text-sm text-[#475569]">Or see <Link href="/audit" className="font-semibold text-[#4F46E5] underline">the free audit</Link> if you already have software.</p>
      </div>
    </div>
  );
}
