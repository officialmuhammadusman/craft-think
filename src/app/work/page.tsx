/**
 * work/page.tsx — Shell placeholder.
 * Full project case studies (no employer names, business results only) come in a later prompt.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Work",
  description: `Real projects with real business results — ${siteConfig.agencyName}. ${siteConfig.tagline}`,
};

export default function WorkPage() {
  return (
    <section aria-labelledby="work-heading" className="ct-section">
      <Container>
        <SectionHeading
          as="h1"
          title="Our Work"
          eyebrow="Projects"
          subtitle="Real projects, real results — in plain business language."
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-8 text-center">
          <p className="text-[#475569]">Project case studies — coming in a later prompt.</p>
          <div className="mt-4">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
