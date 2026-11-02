import type { Metadata } from "next";
import { processSteps, facilities } from "@/data/content";
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
          <ol className="mt-10 flex flex-col gap-5">
            {processSteps.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm">
                <p className="ct-h2 !text-[#4F46E5]">{s.n}</p>
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
              <article key={f.title} className="rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm">
                <h3 className="ct-h4">{f.title}</h3><p className="mt-2 text-[#475569]">{f.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
