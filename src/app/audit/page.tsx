/**
 * audit/page.tsx — Shell placeholder.
 * Full free website/software audit tool comes in a later prompt.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Free Software Audit",
  description: `Get a free audit of your existing website or software — ${siteConfig.agencyName}. ${siteConfig.tagline}`,
};

export default function AuditPage() {
  return (
    <section aria-labelledby="audit-heading" className="ct-section">
      <Container width="narrow">
        <SectionHeading
          as="h1"
          title="Free Software Audit"
          eyebrow="Audit"
          subtitle="Share your existing website or software — we will tell you what to fix and how to make it better."
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-8 text-center">
          <p className="text-[#475569]">Free audit tool — coming in a later prompt.</p>
          <div className="mt-4">
            <Button href="/contact">Talk to Us Directly</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
