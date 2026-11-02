import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Get an Estimate", description: "Get a rough, estimate-only range for your project cost and timeline — then book a free consultation for a firm quote." };

export default function EstimatePage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="Estimate" title="Get a Project Estimate" subtitle="Answer a few quick questions and get a rough range — no commitment, no fixed price promised here." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">{["1. Answer 3 quick questions","2. See a rough range + timeline","3. Book a free call for a firm quote"].map((s) => (<li key={s} className="rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 text-base font-semibold shadow-sm">{s}</li>))}</ol>
          <div className="mt-6"><EstimateForm /></div>
          <p className="mt-4 text-sm text-[#64748B]">Ranges are based on an analyst framework, not published fixed prices. Your firm quote is confirmed in writing after a free consultation.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
