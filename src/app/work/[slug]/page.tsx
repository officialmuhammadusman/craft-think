import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.line };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel} · Case study</p>
          <h1 className="ct-h1 mt-2">{p.title}</h1>
          <p className="ct-body-lg mt-4 text-[#475569]">{p.line}</p>
          <Image src={p.image} alt={p.imageAlt} width={1200} height={700} className="mt-8 w-full rounded-3xl border border-[#E7E9F2] object-cover" />
          <p className="mt-2 text-sm text-[#64748B]">Placeholder photo — replace with designer images later. It is not a screenshot of a real client site.</p>
          <p className="mt-6 text-sm text-[#475569]"><strong className="text-[#0B1220]">Built with:</strong> {p.stack}</p>
          {p.live && <p className="mt-1 text-sm text-[#475569]"><strong className="text-[#0B1220]">Live:</strong> {p.live}</p>}
          <h2 className="ct-h3 mt-10">The problem</h2>
          <p className="mt-2 text-[#475569]">{p.problem}</p>
          <h2 className="ct-h3 mt-8">What we built</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {p.built.map((b) => <li key={b} className="flex gap-2 text-[#475569]"><span className="text-[#16A34A]">✓</span>{b}</li>)}
          </ul>
          <h2 className="ct-h3 mt-8">The business result</h2>
          <p className="mt-2 rounded-2xl bg-[#F6F7FB] p-6 text-[#0B1220]">{p.result}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact">Book a Free Consultation</Button>
            <Button href="/work" variant="secondary">Back to all work</Button>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
