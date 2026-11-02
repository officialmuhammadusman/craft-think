import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        <Container width="narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">Service</p>
          <h1 className="ct-h1 mt-2">{s.title}</h1>
          <p className="ct-body-lg mt-4 text-[#475569]">{s.line}</p>
          <Image src={s.image} alt={s.imageAlt} width={1200} height={700} className="mt-8 w-full rounded-3xl border border-[#E7E9F2] object-cover" />
          <p className="mt-2 text-sm text-[#64748B]">Placeholder photo — replace with designer images later. It is not a real client site.</p>
          <h2 className="ct-h3 mt-10">Who is it for?</h2>
          <p className="mt-2 text-[#475569]">{s.forWhom}</p>
          <h2 className="ct-h3 mt-8">What you get</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {s.gets.map((g) => <li key={g} className="flex gap-2 text-[#475569]"><span className="text-[#16A34A]">✓</span>{g}</li>)}
          </ul>
          <h2 className="ct-h3 mt-8">Example project</h2>
          <p className="mt-2 text-[#475569]">{s.example}. <Link href={s.exampleHref} className="font-semibold text-[#4F46E5] underline">See the case study →</Link></p>
          <h2 className="ct-h3 mt-8">How we build it</h2>
          <p className="mt-2 text-[#475569]">{s.build}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/estimate">Get an Estimate</Button>
            <Button href="/contact" variant="secondary">Book a Free Consultation</Button>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
