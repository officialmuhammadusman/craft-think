import type { Metadata } from "next";
import { faqs } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "FAQ", description: "Real questions about cost, time, remote work, AI, fixing old software and support — answered in plain language." };

export default function FaqPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Plain answers, no jargon. Anything else? Ask the AI guide or book a free consultation." />
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="ct-card group p-6">
                <summary className="cursor-pointer list-none text-base font-semibold [&::-webkit-details-marker]:hidden"><span className="flex items-center justify-between gap-4">{f.q}<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#4F46E5]">+</span></span></summary>
                <p className="mt-3 text-[#475569]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
