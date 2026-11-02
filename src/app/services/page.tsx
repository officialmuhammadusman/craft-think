import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Services", description: "Websites, apps, CRM, booking systems, AI solutions and more — in plain language, from CraftThink." };

export default function ServicesPage() {
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading as="h1" eyebrow="What We Build" title="Services, in plain language" subtitle="No jargon first. Pick the problem you have — the technical detail is inside each page." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="overflow-hidden rounded-2xl border border-[#E7E9F2] bg-white shadow-sm transition hover:border-[#4F46E5] hover:shadow-md">
                <Image src={s.image} alt={s.imageAlt} width={800} height={520} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <h2 className="ct-h4">{s.title}</h2>
                  <p className="mt-2 text-[#475569]">{s.line}</p>
                  <p className="mt-3 text-sm text-[#475569]">For: {s.forWhom}</p>
                  <p className="mt-3 text-sm font-semibold text-[#4F46E5]">Learn more →</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
