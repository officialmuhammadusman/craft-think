import type { Metadata } from "next";
import { processSteps, facilities } from "@/data/content";
import { successPractices } from "@/data/offering";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";

const stepImages: Record<string, { src: string; alt: string }> = {
  Discover: { src: "/images/sections/step-discover.svg", alt: "Illustration of the Discover step: learning the business" },
  Design: { src: "/images/sections/step-design.svg", alt: "Illustration of the Design step: a clickable prototype" },
  Build: { src: "/images/sections/step-build.svg", alt: "Illustration of the Build step: small tested steps" },
  Test: { src: "/images/sections/step-test.svg", alt: "Illustration of the Test step: checks passed" },
  Launch: { src: "/images/sections/step-launch.svg", alt: "Illustration of the Launch step: going live" },
  Support: { src: "/images/sections/step-support.svg", alt: "Illustration of the Support step: monitoring after launch" },
};

export const metadata: Metadata = { title: "Process", description: "Discover, Design, Build, Test, Launch, Support — how CraftThink works, plus security, deployment and support facilities." };

export default function ProcessPage() {
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading as="h1" eyebrow="Process" title="How we work, step by step" subtitle="You approve the design before we build, and you see progress every week." />
          <ol className="relative mt-10 flex flex-col gap-5 before:absolute before:bottom-4 before:left-[27px] before:top-4 before:w-px before:bg-[#E7E9F2]">
            {processSteps.map((s) => (
              <li key={s.n} className="ct-card relative p-6 sm:p-7">
                {stepImages[s.title] && (
                  <Image src={stepImages[s.title].src} alt={stepImages[s.title].alt} width={800} height={600} className="mb-5 aspect-[16/10] h-auto w-full rounded-[16px] border border-[#E7E9F2] object-cover" />
                )}
                <div className="flex gap-5">
                  <p className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#4F46E5] font-display text-xl font-bold text-white shadow-lg">{s.n}</p>
                  <div><h2 className="ct-h3">{s.title}</h2><p className="mt-2 text-[#475569]">{s.text}</p></div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <SectionHeading eyebrow="Facilities" title="What a full software house gives you" subtitle="Not just code — security, deployment, support and clear communication, on every project." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <article key={f.title} className="ct-card p-6">
                <h3 className="ct-h4">{f.title}</h3><p className="mt-2 text-[#475569]">{f.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="ct-section bg-white">
        <Container>
          <SectionHeading eyebrow="Delivery standards" title="Eight practices that keep projects on track" subtitle="The full detail lives here, on the process page — the homepage shows only the four phases." />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {successPractices.map((pr, i) => (
              <li key={pr.title} className="ct-card p-6">
                <p className="font-display text-2xl font-bold text-[#4F46E5]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="ct-h4 mt-2">{pr.title}</h3>
                <p className="mt-2 text-[#475569]">{pr.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
