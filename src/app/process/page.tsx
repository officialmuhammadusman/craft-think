import type { Metadata } from "next";
import { processSteps, facilities } from "@/data/content";
import { successPractices } from "@/data/offering";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Process", description: "Discover, Design, Build, Test, Launch, Support — how CraftThink works, plus security, deployment and support facilities." };

export default function ProcessPage() {
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading as="h1" eyebrow="Process" title="How we work, step by step" subtitle="You approve the design before we build, and you see progress every week." />
          <ol className="relative mt-10 flex flex-col gap-5 before:absolute before:bottom-4 before:left-[27px] before:top-4 before:w-px before:bg-[#E7E9F2]">
            {processSteps.map((s) => (
              <li key={s.n} className="ct-card relative flex gap-5 p-6 sm:p-7">
                <p className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#4F46E5] font-display text-xl font-bold text-white shadow-lg">{s.n}</p>
                <div><h2 className="ct-h3">{s.title}</h2><p className="mt-2 text-[#475569]">{s.text}</p></div>
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
