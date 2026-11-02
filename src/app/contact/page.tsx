import type { Metadata } from "next";
import { Mail, Phone, Globe, Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Book a free consultation with CraftThink. Email, phone, LinkedIn and GitHub are listed here." };

export default function ContactPage() {
  const cards = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: Globe, label: "LinkedIn", value: "linkedin.com/in/muhammadusman-webdev", href: "https://linkedin.com/in/muhammadusman-webdev" },
    { icon: Code2, label: "GitHub", value: "github.com/officialmuhammadusman", href: "https://github.com/officialmuhammadusman" },
  ];
  return (
    <section className="ct-section">
      <Container>
        <SectionHeading as="h1" eyebrow="Contact" title="Book a Free Consultation" subtitle="Talk to Muhammad Usman about your project. No pressure — just a conversation." />
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4">
            {cards.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="ct-card flex min-h-[72px] items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><c.icon size={20} /></span>
                <span><span className="block text-sm font-semibold uppercase tracking-widest text-[#64748B]">{c.label}</span><span className="block break-all text-base font-semibold">{c.value}</span></span>
              </a>
            ))}
            <div className="rounded-[24px] bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-6 text-white">
              <p className="text-base font-bold">Working remotely with clients worldwide.</p>
              <p className="mt-2 text-white/70">Booking calendar link is still to be supplied — use email or phone above until then.</p>
            </div>
          </div>
          <ContactForm />
        </div>
        <p className="mt-6 text-center text-sm text-[#64748B]">{siteConfig.tagline}</p>
      </Container>
    </section>
  );
}
