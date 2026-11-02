import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Insights",
  description: "Plain-language advice from the CraftThink team: booking websites, CRM systems, and hiring a developer.",
};

const ARTICLES = [
  {
    slug: "why-a-booking-site-loses-customers",
    title: "Why a booking site loses customers",
    summary: "Most lost bookings are not about price. They are about confusion, friction, and missing trust at the moment someone is ready to book.",
  },
  {
    slug: "what-a-crm-does-for-a-small-business",
    title: "What a CRM does for a small business, in plain words",
    summary: "A CRM is not a fancy spreadsheet. It is one place where your customers, conversations, follow-ups, and sales live together.",
  },
  {
    slug: "what-to-check-before-hiring-a-developer",
    title: "What to check before hiring a developer",
    summary: "Before you pay anyone to build your website or app, check these things: past work, ownership, written scope, and support after launch.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <SectionHeading
            as="h1"
            eyebrow="Insights"
            title="Advice in plain words"
            subtitle="General advice from the CraftThink team — no jargon, no sales talk, just things that help you decide well."
          />
          <div className="mt-10 flex flex-col gap-4">
            {ARTICLES.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="ct-card block p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#4F46E5]">CraftThink team</span>
                <span className="mt-1 block text-xl font-bold">{a.title}</span>
                <span className="mt-2 block text-[#475569]">{a.summary}</span>
                <span className="mt-3 block font-semibold text-[#4F46E5]">Read the article →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
