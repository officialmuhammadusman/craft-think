import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const metadata: Metadata = { title: "Book a Free Consultation", description: "Book a free consultation with CraftThink. Tell us your problem in plain words — no obligation, no backend, your message opens as an email." };

const steps = [
  { n: "1", title: "Tell us your problem", text: "Fill in the form in plain words — what your business does and what you need help with." },
  { n: "2", title: "We reply with a clear next step", text: "We read your message, look at a similar project if one fits, and reply by email." },
  { n: "3", title: "You decide, no pressure", text: "If it fits, we agree scope, timeline and price in writing before you pay anything." },
];

export default async function ConsultationPage({ searchParams }: { searchParams?: Promise<{ problem?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const initialMessage = params?.problem ?? "";
  return (
    <section className="ct-section">
      <Container>
        <SectionHeading as="h1" eyebrow="Free consultation" title="Book a Free Consultation" subtitle="Tell us your problem in plain words. No obligation — just a conversation with the person leading your project." />
        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 shadow-sm">
              <span className="font-display text-3xl font-bold text-[#4F46E5]">{s.n}</span>
              <h3 className="ct-h4 mt-2">{s.title}</h3>
              <p className="mt-1 text-[#475569]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <a href={`mailto:${siteConfig.email}`} className="ct-card flex min-h-[72px] items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Mail size={20} /></span>
              <span><span className="block text-sm font-semibold uppercase tracking-widest text-[#64748B]">Email</span><span className="block break-all text-base font-semibold">{siteConfig.email}</span></span>
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="ct-card flex min-h-[72px] items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Phone size={20} /></span>
              <span><span className="block text-sm font-semibold uppercase tracking-widest text-[#64748B]">Phone</span><span className="block text-base font-semibold">{siteConfig.phone}</span></span>
            </a>
            <div className="rounded-[24px] bg-[#0B1220] p-6 text-white">
              <p className="text-base font-bold">Working remotely with clients worldwide.</p>
              <p className="mt-2 text-white/70">Booking calendar link is still to be supplied — use the form, email or phone above until then.</p>
            </div>
          </div>
          <ConsultationForm initialMessage={initialMessage} />
        </div>
        <p className="mt-6 text-center text-sm text-[#64748B]">{siteConfig.tagline}</p>
      </Container>
    </section>
  );
}
