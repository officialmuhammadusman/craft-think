import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { AuditForm } from "@/components/forms/AuditForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Free Software Audit", description: "Tick your problems and get an audit checklist for your existing website or software — free." };

export default function AuditPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="Audit" title="Free Software Audit" subtitle="Tell us what is slow, broken or confusing — get a checklist of what to fix first." />
          <div className="mt-6 rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 shadow-sm">
            <p className="text-base leading-relaxed text-[#0B1220]"><span className="font-bold">Prefer a live check?</span> Our <Link href="/audit-tool" className="font-semibold text-[#4F46E5] underline">free website audit tool</Link> measures your real page — speed, size, security and basic setup — in seconds.</p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">{["1. Tick your problems","2. Get a checklist","3. Book a free call to fix them"].map((s) => (<li key={s} className="rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 text-base font-semibold shadow-sm">{s}</li>))}</ol>
          <div className="mt-6"><AuditForm /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
