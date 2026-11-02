/**
 * services/page.tsx — Shell placeholder.
 * Full services grid with descriptions and AI guide comes in Prompt 2.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description: `Websites, apps, CRM, booking systems, AI solutions, and more — ${siteConfig.agencyName}. ${siteConfig.tagline}`,
};

export default function ServicesPage() {
  return (
    <section aria-labelledby="services-heading" className="ct-section">
      <Container>
        <SectionHeading
          as="h1"
          title="Our Services"
          eyebrow="What We Build"
          subtitle="From websites and apps to CRM, booking systems, and AI — built for your business in plain language."
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-8 text-center">
          <p className="text-[#475569]">Full services grid — coming in Prompt 2.</p>
          <div className="mt-4">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
