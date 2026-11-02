import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Service not found" };
  return { title: s.title, description: s.line };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <section className="ct-section">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Link href="/services" className="text-base font-semibold text-[#4F46E5]">← All services</Link>
              <span className="mt-4 block"><span className="rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">Service</span></span>
              <h1 className="ct-h1 mt-4">{s.title}</h1>
              <p className="ct-body-lg mt-4 text-[#475569]">{s.line}</p>
              <Image src={s.image} alt={s.imageAlt} width={1200} height={700} className="mt-8 w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
              <p className="mt-2 text-sm text-[#64748B]">Placeholder photo — replace with designer images later. It is not a real client site.</p>

              <h2 className="ct-h3 mt-10">Who is it for?</h2>
              <p className="mt-3 text-lg text-[#475569]">{s.forWhom}</p>

              <h2 className="ct-h3 mt-10">What you get</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {s.gets.map((g) => (
                  <li key={g} className="flex gap-3 rounded-[20px] border border-[#E7E9F2] bg-white p-4 text-[#0B1220] shadow-sm"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#16A34A]" />{g}</li>
                ))}
              </ul>

              <h2 className="ct-h3 mt-10">How we build it</h2>
              <p className="mt-3 text-lg text-[#475569]">{s.build}</p>
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
              <div className="rounded-[24px] bg-[#0B1220] p-7 text-white shadow-xl">
                <p className="text-sm font-bold uppercase tracking-widest text-white/50">Start here</p>
                <p className="ct-h4 mt-2 !text-white">Get a rough range, then a firm quote — free.</p>
                <p className="mt-2 text-white/70">No commitment. We confirm the price in writing after a free consultation.</p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button href="/estimate" size="lg">Get an Estimate</Button>
                  <Button href="/consultation" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Book a Free Consultation</Button>
                </div>
              </div>
              <div className="ct-card p-7">
                <p className="text-sm font-bold uppercase tracking-widest text-[#64748B]">Example project</p>
                <p className="mt-2 text-lg font-semibold">{s.example}</p>
                <Link href={s.exampleHref} className="mt-3 inline-flex items-center gap-1 font-semibold text-[#4F46E5]">See the case study <ArrowRight size={17} /></Link>
              </div>
              <div className="ct-card p-7">
                <p className="text-sm font-bold uppercase tracking-widest text-[#64748B]">Not sure this is the right one?</p>
                <p className="mt-2 text-[#475569]">Ask the AI guide — it will point you to the right service in plain language.</p>
                <Link href="/guide" className="mt-3 inline-flex items-center gap-1 font-semibold text-[#4F46E5]">Ask the AI Guide <ArrowRight size={17} /></Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
