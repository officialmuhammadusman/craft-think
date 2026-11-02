/**
 * about/page.tsx — Shell placeholder.
 * Full About CEO page for Muhammad Usman — story, philosophy, and values — comes in a later prompt.
 * No invented team size, no employer names.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About CEO",
  description: `Meet ${siteConfig.ceoName}, ${siteConfig.ceoTitle} of ${siteConfig.agencyName}. ${siteConfig.tagline}`,
};

export default function AboutPage() {
  return (
    <section aria-labelledby="about-heading" className="ct-section">
      <Container>
        <SectionHeading
          as="h1"
          title={`Meet ${siteConfig.ceoName}`}
          eyebrow={siteConfig.ceoTitle}
          subtitle={`${siteConfig.agencyName} is led by ${siteConfig.ceoName}. ${siteConfig.tagline}`}
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-8 text-center">
          <p className="text-[#475569]">CEO story and philosophy — coming in a later prompt.</p>
          <div className="mt-4">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
