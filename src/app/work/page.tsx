import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CtaBand } from "@/components/ui/CtaBand";
import { WorkFilters } from "@/components/work/WorkFilters";

export const metadata: Metadata = { title: "Work", description: "Real projects with real business results — from CraftThink." };

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ industry?: string }> }) {
  const industry = (await searchParams).industry;
  // The listing grid shows exactly these 6 cards, in this order. Padel
  // Connect stays reachable via its own detail URL and via "Related
  // projects" links on other case pages, but never as a card here —
  // so industry filters also apply within this same 6-card set.
  const gridOrder = ["telemedicine", "cliender", "hr-management-system", "actors-index", "rag-ai-assistant", "book-dubai-guide"];
  const gridProjects = gridOrder.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const list = industry ? gridProjects.filter((p) => p.industry === industry) : gridProjects;
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading as="h1" eyebrow="Projects" title="Our Work" subtitle="Real projects, real results. No invented clients or testimonials." />
          <WorkFilters current={industry} />
          {list.length === 0 ? (
            <p className="mt-10 text-center text-[#475569]">No projects in this industry yet. <Link href="/work" className="font-semibold text-[#4F46E5] underline">See all work</Link>.</p>
          ) : (
            <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <StaggerItem key={p.slug} className="h-full">
                <Link key={p.slug} href={`/work/${p.slug}`} className="ct-card group overflow-hidden">
                  <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel}</p>
                    <h2 className="ct-h4 mt-1">{p.title}</h2>
                    <p className="mt-2 text-[#475569]">{p.line}</p>
                    <p className="mt-3 text-sm text-[#475569]">{p.stack}</p>
                  </div>
                </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
