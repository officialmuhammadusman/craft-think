/**
 * contact/page.tsx — Shell placeholder.
 * Full contact form with booking calendar comes in a later prompt.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free consultation with ${siteConfig.agencyName}. ${siteConfig.tagline}`,
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="ct-section">
      <Container width="narrow">
        <SectionHeading
          as="h1"
          title="Book a Free Consultation"
          eyebrow="Contact"
          subtitle={`Talk to ${siteConfig.ceoName} about your project. No pressure — just a conversation.`}
          align="center"
        />

        {/* Direct contact details — visible now, form comes later */}
        <div className="mt-10 flex flex-col gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
              <Mail size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#0B1220]">Email</span>
              <span className="block text-sm text-[#475569]">{siteConfig.email}</span>
            </span>
          </a>

          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
              <Phone size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#0B1220]">Phone / WhatsApp</span>
              <span className="block text-sm text-[#475569]">{siteConfig.phone}</span>
            </span>
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
              <Linkedin size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#0B1220]">LinkedIn</span>
              <span className="block text-sm text-[#475569]">muhammadusman-webdev</span>
            </span>
          </a>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-5 hover:border-[#4F46E5] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
              <Github size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#0B1220]">GitHub</span>
              <span className="block text-sm text-[#475569]">officialmuhammadusman</span>
            </span>
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-[#64748B]">
          Full booking form with calendar — coming in a later prompt.
        </p>
      </Container>
    </section>
  );
}
