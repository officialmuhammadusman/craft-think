import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GuideClient } from "@/components/ai/GuideClient";

export const metadata: Metadata = { title: "AI Guide", description: "Ask the CraftThink guide — a demo that answers only from this site's services, projects, process and FAQs." };

export default function GuidePage() {
  return (
    <section className="ct-section bg-[#F6F7FB]">
      <Container width="narrow">
        <SectionHeading as="h1" eyebrow="AI Guide" aiAccent title="Ask Think" subtitle="A guided demo. Think answers only from CraftThink's own services, projects, process and FAQs — and invites you to book a free consultation when it does not know." />
        <div className="mt-10">
          <Suspense fallback={<p>Loading the guide…</p>}><GuideClient /></Suspense>
        </div>
      </Container>
    </section>
  );
}
