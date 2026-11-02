import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import { WorkFilters } from "@/components/work/WorkFilters";

export const metadata: Metadata = { title: "Work", description: "Real projects with real business results — from CraftThink, in plain language." };

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ industry?: string }> }) {
  const industry = (await searchParams).industry;
  const list = industry ? projects.filter((p) => p.industry === industry) : projects;
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading as="h1" eyebrow="Projects" title="Our Work" subtitle="Real projects, real results — in plain business language. No invented clients or testimonials." />
          <WorkFilters current={industry} />
          {list.length === 0 ? (
            <p className="mt-10 text-center text-[#475569]">No projects in this industry yet. <Link href="/work" className="font-semibold text-[#4F46E5] underline">See all work</Link>.</p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="ct-card group overflow-hidden">
                  <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel}</p>
                    <h2 className="ct-h4 mt-1">{p.title}</h2>
                    <p className="mt-2 text-[#475569]">{p.line}</p>
                    <p className="mt-3 text-sm text-[#475569]">{p.stack}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
