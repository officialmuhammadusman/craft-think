import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuditForm } from "@/components/forms/AuditForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Free Software Audit", description: "Tick your problems and get a plain-language audit checklist for your existing website or software — free." };

export default function AuditPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading as="h1" eyebrow="Audit" title="Free Software Audit" subtitle="Tell us what is slow, broken or confusing — get a plain-language checklist of what to fix first." />
          <div className="mt-10"><AuditForm /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
