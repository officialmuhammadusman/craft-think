import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Book a free consultation with CraftThink. Email, phone, LinkedIn and GitHub are listed here." };

export default function ContactPage() {
  return (
    <section className="ct-section">
      <Container width="narrow">
        <SectionHeading as="h1" eyebrow="Contact" title="Book a Free Consultation" subtitle="Talk to Muhammad Usman about your project. No pressure — just a conversation." />
        <div className="mt-10 grid gap-4">
          <a href={`mailto:${siteConfig.email}`} className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5]"><strong>Email:</strong> {siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5]"><strong>Phone:</strong> {siteConfig.phone}</a>
          <a href="https://linkedin.com/in/muhammadusman-webdev" target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5]"><strong>LinkedIn:</strong> linkedin.com/in/muhammadusman-webdev</a>
          <a href="https://github.com/officialmuhammadusman" target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5]"><strong>GitHub:</strong> github.com/officialmuhammadusman</a>
        </div>
        <div className="mt-8"><ContactForm /></div>
        <p className="mt-4 text-center text-sm text-[#64748B]">{siteConfig.tagline} · Booking calendar link is still to be supplied — use email or phone above until then.</p>
      </Container>
    </section>
  );
}
