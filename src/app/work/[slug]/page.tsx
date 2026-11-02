import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { projects } from "@/data/content";
import { verifiedLiveLinks } from "@/data/offering";
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
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Link href="/work" className="text-base font-semibold text-[#4F46E5]">← All work</Link>
              <span className="mt-4 block"><span className="rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel} · Case study</span></span>
              <h1 className="ct-h1 mt-4">{p.title}</h1>
              <p className="ct-body-lg mt-4 text-[#475569]">{p.line}</p>
              <Image src={p.image} alt={p.imageAlt} width={1200} height={700} className="mt-8 w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
              <p className="mt-2 text-sm text-[#64748B]">Placeholder photo — replace with designer images later. It is not a screenshot of a real client site.</p>

              <h2 className="ct-h3 mt-10">The problem</h2>
              <p className="mt-3 text-lg text-[#475569]">{p.problem}</p>

              <h2 className="ct-h3 mt-10">What we built</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {p.built.map((b) => (
                  <li key={b} className="flex gap-3 rounded-[20px] border border-[#E7E9F2] bg-white p-4 text-[#0B1220] shadow-sm"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#16A34A]" />{b}</li>
                ))}
              </ul>

              <h2 className="ct-h3 mt-10">The business result</h2>
              <p className="mt-3 rounded-[24px] bg-[#F6F7FB] p-6 text-lg text-[#0B1220]">{p.result}</p>
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
              <div className="ct-card p-7">
                <p className="text-sm font-bold uppercase tracking-widest text-[#64748B]">Built with</p>
                <p className="mt-2 text-base leading-relaxed">{p.stack}</p>
                {verifiedLiveLinks[p.slug] ? (
                  <p className="mt-3 text-base"><strong>Live:</strong>{" "}
                    <a href={verifiedLiveLinks[p.slug]} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#4F46E5]">{verifiedLiveLinks[p.slug].replace("https://", "")} ↗</a>
                  </p>
                ) : (
                  <p className="mt-3 text-base text-[#64748B]">Live demo on request — ask in a free consultation. The old live link for this project is not shown as working, so we do not claim it.</p>
                )}
              </div>
              <div className="rounded-[24px] bg-[#0B1220] p-7 text-white shadow-xl">
                <p className="text-sm font-bold uppercase tracking-widest text-white/50">Want something like this?</p>
                <p className="ct-h4 mt-2 !text-white">Book a free consultation.</p>
                <p className="mt-2 text-white/70">We will show you the closest project, and give you a clear next step — with no obligation.</p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button href="/consultation" size="lg">Book a Free Consultation</Button>
                  <Button href="/work" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Back to all work</Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
