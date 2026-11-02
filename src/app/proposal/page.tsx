"use client";
/**
 * Proposal page — an INTERNAL proposal generator, linked from the footer
 * only (not the main header). Everything lives in the browser only:
 * nothing is sent to a server and nothing is saved server-side. The
 * finished proposal is printed, or saved as PDF from the browser's print
 * dialog, with window.print().
 *
 * The price and timeline are whatever the person filling the form types
 * in — no prices are invented here. The printed proposal always carries
 * an "estimate only until signed" note.
 */
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Line = { id: string; text: string };

let nextId = 1;
function newLine(text = ""): Line {
  return { id: `line-${nextId++}-${Date.now()}`, text };
}

const inputClass =
  "min-h-[48px] w-full rounded-xl border border-[#E7E9F2] bg-white px-4 text-base font-normal text-[#0B1220]";

export default function ProposalPage() {
  const [clientName, setClientName] = useState("");
  const [scope, setScope] = useState<Line[]>([newLine(""), newLine("")]);
  const [phases, setPhases] = useState<Line[]>([newLine(""), newLine("")]);
  const [timeline, setTimeline] = useState("");
  const [price, setPrice] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  function update(list: Line[], setList: (l: Line[]) => void, id: string, text: string) {
    setList(list.map((l) => (l.id === id ? { ...l, text } : l)));
  }
  function remove(list: Line[], setList: (l: Line[]) => void, id: string) {
    if (list.length <= 1) return;
    setList(list.filter((l) => l.id !== id));
  }

  const scopeFilled = scope.map((l) => l.text.trim()).filter(Boolean);
  const phasesFilled = phases.map((l) => l.text.trim()).filter(Boolean);
  const clientLabel = clientName.trim() || "Your business";

  function printProposal() {
    window.print();
  }

  return (
    <section className="ct-section">
      <style>{`@media print { .proposal-no-print { display: none !important; } .proposal-sheet { box-shadow: none !important; border: 1px solid #ccc !important; } }`}</style>
      <Container>
        <div className="proposal-no-print">
          <SectionHeading
            as="h1"
            eyebrow="Internal tool"
            title="Proposal generator"
            subtitle="Fill in the details, check the proposal on the right (below on phones), then print it or save it as a PDF. Nothing here is saved on a server — it only lives in this browser until you print it."
          />
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          {/* ── Form (hidden when printing) ─────────────────────────── */}
          <div className="proposal-no-print flex flex-col gap-5 rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm">
            <label className="flex flex-col gap-2 font-semibold">Client name
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="The business this proposal is for" className={inputClass} />
            </label>

            <fieldset className="flex flex-col gap-3">
              <legend className="font-semibold">Scope — what we will build (add or remove lines)</legend>
              {scope.map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <input value={l.text} onChange={(e) => update(scope, setScope, l.id, e.target.value)} placeholder="One scope item, in plain words" className={inputClass} />
                  <button type="button" onClick={() => remove(scope, setScope, l.id)} disabled={scope.length <= 1} className="min-h-[48px] shrink-0 px-2 font-semibold text-[#4F46E5] disabled:opacity-40">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => setScope((prev) => [...prev, newLine()])} className="flex min-h-[48px] items-center justify-center rounded-xl border border-[#4F46E5] font-semibold text-[#4F46E5]">+ Add scope item</button>
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="font-semibold">Phases — how the work is split (add or remove lines)</legend>
              {phases.map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <input value={l.text} onChange={(e) => update(phases, setPhases, l.id, e.target.value)} placeholder="One phase, in plain words" className={inputClass} />
                  <button type="button" onClick={() => remove(phases, setPhases, l.id)} disabled={phases.length <= 1} className="min-h-[48px] shrink-0 px-2 font-semibold text-[#4F46E5] disabled:opacity-40">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => setPhases((prev) => [...prev, newLine()])} className="flex min-h-[48px] items-center justify-center rounded-xl border border-[#4F46E5] font-semibold text-[#4F46E5]">+ Add phase</button>
            </fieldset>

            <label className="flex flex-col gap-2 font-semibold">Timeline
              <input value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="For example: about 6 weeks, in phases" className={inputClass} />
            </label>

            <label className="flex flex-col gap-2 font-semibold">Price
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="The agreed price, exactly as it should appear" className={inputClass} />
            </label>

            <Button onClick={printProposal}>Print / Save as PDF</Button>
            <p className="text-sm text-[#64748B]">Printing opens your browser&apos;s print dialog — choose &quot;Save as PDF&quot; there to save a PDF copy. No data leaves this browser.</p>
          </div>

          {/* ── Printable proposal ─────────────────────────────────── */}
          <div ref={previewRef} className="proposal-sheet rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b-4 border-[#4F46E5] pb-5">
              <p className="font-display text-2xl font-bold tracking-tight"><span className="text-[#0B1220]">Craft</span><span className="text-[#4F46E5]">Think</span></p>
              <p className="mt-1 text-sm text-[#64748B]">Software, built with thought, guided by AI. Led by CEO Muhammad Usman.</p>
            </div>

            <h2 className="ct-h3 mt-6">Proposal for {clientLabel}</h2>
            <p className="mt-2 text-[#475569]">Prepared by CraftThink for {clientLabel}. This proposal describes, in plain words, what we will build, how the work is split, and when it will happen.</p>

            <h3 className="mt-8 text-lg font-bold">What we will build</h3>
            {scopeFilled.length > 0 ? (
              <ul className="mt-3 flex flex-col gap-2">
                {scopeFilled.map((s, i) => (<li key={i} className="flex gap-2 text-[#475569]"><span className="text-[#4F46E5]">•</span><span>{s}</span></li>))}
              </ul>
            ) : (
              <p className="mt-3 text-[#64748B]">No scope items added yet.</p>
            )}

            <h3 className="mt-8 text-lg font-bold">How the work is split</h3>
            {phasesFilled.length > 0 ? (
              <ol className="mt-3 flex flex-col gap-2">
                {phasesFilled.map((p, i) => (<li key={i} className="flex gap-3 text-[#475569]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-bold text-[#4F46E5]">{i + 1}</span><span>{p}</span></li>))}
              </ol>
            ) : (
              <p className="mt-3 text-[#64748B]">No phases added yet.</p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#EEF2FF] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Timeline</p>
                <p className="mt-1 font-semibold">{timeline.trim() || "To be confirmed"}</p>
              </div>
              <div className="rounded-xl bg-[#EEF2FF] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Price</p>
                <p className="mt-1 font-semibold">{price.trim() || "To be confirmed"}</p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-[#E7E9F2] bg-[#F8FAFC] p-4">
              <p className="font-bold">Please note: estimate only until signed</p>
              <p className="mt-1 text-sm text-[#475569]">
                The price and timeline above are an estimate only until signed. The final price, timeline and payment
                steps are confirmed in writing on the free consultation call and in the signed agreement — nothing here
                is a final contract on its own.
              </p>
            </div>

            <div className="mt-8 border-t border-[#E7E9F2] pt-4 text-sm text-[#64748B]">
              <p>CraftThink — {siteConfig.email} · {siteConfig.phone}</p>
              <p className="mt-1">Working remotely with clients worldwide.</p>
            </div>

            <div className="proposal-no-print mt-6">
              <Button onClick={printProposal}>Print / Save as PDF</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
