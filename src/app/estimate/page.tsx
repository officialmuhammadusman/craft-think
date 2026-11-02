/**
 * estimate/page.tsx — Shell placeholder.
 * Full AI-powered project estimator comes in Prompt 3.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Get an Estimate",
  description: `Get a rough idea of project cost and timeline — ${siteConfig.agencyName}. ${siteConfig.tagline}`,
};

export default function EstimatePage() {
  return (
    <section aria-labelledby="estimate-heading" className="ct-section">
      <Container width="narrow">
        <SectionHeading
          as="h1"
          title="Get a Project Estimate"
          eyebrow="Estimate"
          subtitle="Answer a few quick questions and get a rough idea of cost and timeline — no commitment needed."
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-8 text-center">
          <p className="text-[#475569]">AI-powered estimator — coming in Prompt 3.</p>
          <div className="mt-4">
            <Button href="/contact">Book a Free Consultation Instead</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
