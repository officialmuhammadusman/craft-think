import type { Metadata } from "next";
import { faqs } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "FAQ", description: "Real questions about cost, time, remote work, AI, fixing old software and support — answered clearly." };

export default function FaqPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Plain answers, no jargon. Anything else? Ask the AI guide or book a free consultation." />
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map((f) => (
              <AccordionItem key={f.q} question={f.q}>
                <p>{f.a}</p>
              </AccordionItem>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
