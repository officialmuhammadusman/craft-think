/**
 * process/page.tsx — Shell placeholder.
 * Full process timeline (discovery → design → build → launch → care) comes in a later prompt.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Process",
  description: `How ${siteConfig.agencyName} works with clients from first call to launch and beyond. ${siteConfig.tagline}`,
};

export default function ProcessPage() {
  return (
    <section aria-labelledby="process-heading" className="ct-section">
      <Container>
        <SectionHeading
          as="h1"
          title="How We Work"
          eyebrow="Process"
          subtitle="From first call to launch and beyond — simple, clear steps."
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-8 text-center">
          <p className="text-[#475569]">Process timeline — coming in a later prompt.</p>
          <div className="mt-4">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
