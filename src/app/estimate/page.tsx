import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Get an Estimate", description: "Answer 3 quick questions, see a reduced indicative range — your firm estimate is given on your free consultation call." };

export default function EstimatePage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="Estimate" title="Get a Project Estimate" subtitle="Your firm estimate is given on your free consultation call. Answer a few quick questions first and see a reduced indicative range — no commitment, no fixed price promised here." />
          <ol className="mt-10 grid min-w-0 gap-4 sm:grid-cols-3">{["1. Answer 3 quick questions","2. See a reduced indicative range","3. Get your firm estimate on a free call"].map((s) => (<li key={s} className="min-w-0 break-words rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 text-base font-semibold shadow-sm">{s}</li>))}</ol>
          <div className="mt-6 min-w-0"><EstimateForm /></div>
          <p className="mt-4 break-words text-sm text-[#64748B]">Ranges are based on an analyst framework, not published fixed prices. Your firm quote is confirmed in writing after a free consultation.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
