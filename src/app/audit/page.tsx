import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuditForm } from "@/components/forms/AuditForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Free Software Audit", description: "Tick your problems and get a plain-language audit checklist for your existing website or software — free." };

export default function AuditPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="Audit" title="Free Software Audit" subtitle="Tell us what is slow, broken or confusing — get a plain-language checklist of what to fix first." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">{["1. Tick your problems","2. Get a plain-language checklist","3. Book a free call to fix them"].map((s) => (<li key={s} className="rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 text-base font-semibold shadow-sm">{s}</li>))}</ol>
          <div className="mt-6"><AuditForm /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
