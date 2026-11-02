import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services, projects } from "@/data/content";
import { serviceDetails } from "@/data/detail";
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

function Section({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="ct-h3">{title}</h2>
      {intro && <p className="mt-3 text-lg text-[#475569]">{intro}</p>}
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const d = serviceDetails[s.slug];
  const relatedProjects = d
    ? d.relatedProjects.map((ps) => projects.find((p) => p.slug === ps)).filter((p): p is NonNullable<typeof p> => Boolean(p))
    : [];
  const relatedServices = d
    ? d.relatedServices.map((rs) => services.find((x) => x.slug === rs)).filter((x): x is NonNullable<typeof x> => Boolean(x))
    : [];
  const deliverables = s.deliverables && s.deliverables.length > 0 ? s.deliverables : s.gets;
  const closerProject = relatedProjects[0];

  return (
    <>
      {/* HERO — title + promise + image (best available service visual) */}
      <section className="ct-section pb-0">
        <Container>
          <Link href="/services" className="flex min-h-[48px] items-center text-base font-semibold text-[#4F46E5]">← All services</Link>
          <span className="mt-4 block"><span className="ct-eyebrow">Service</span></span>
          <h1 className="ct-h1 mt-4">{s.title}</h1>
          <p className="ct-body-lg mt-4 max-w-3xl text-[#475569]">{s.line}</p>
          <div className="mt-8">
            <Image src={s.image} alt={s.imageAlt} width={1200} height={700} className="w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
            <p className="mt-2 text-sm text-[#64748B]">Service visual — illustrative image for this service, not a client screenshot.</p>
          </div>

          {/* PROOF STRIP — real facts only, counted from this service's own data */}
          <div className="mt-8 flex flex-col gap-2 rounded-[24px] border border-[#E7E9F2] bg-[#F6F7FB] p-6 text-base sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <span><strong>{relatedProjects.length}</strong> related {relatedProjects.length === 1 ? "project" : "projects"} on this site</span>
            <span><strong>{s.capabilities?.length ?? 0}</strong> capabilities explained below</span>
            <span><strong>{s.techStack?.length ?? 0}</strong> technologies, explained in plain terms</span>
            {closerProject && (
              <span>See it in action: <Link href={`/work/${closerProject.slug}`} className="font-semibold text-[#4F46E5]">{closerProject.title} →</Link></span>
            )}
          </div>

          {d && (
            <>
              {/* WHY IT MATTERS — pain + cost of doing nothing, per service */}
              <Section title="Why it matters" intro={d.pain} />

              {/* OFFERINGS — merged deliverables: "What you get" + "What you receive" are ONE list now */}
              <Section title="What you receive" intro="Exactly what is included — no vague promises, no second list repeating the first.">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {deliverables.map((item) => (
                    <li key={item} className="flex gap-3 rounded-[20px] border border-[#E7E9F2] bg-white p-4 text-[#0B1220] shadow-sm"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#16A34A]" />{item}</li>
                  ))}
                </ul>
              </Section>

              {/* TIMED PROCESS — phases specific to this service, with exits */}
              <Section title="How it works" intro={s.build}>
                <ol className="grid gap-4 sm:grid-cols-2">
                  {d.process.map((phase, i) => (
                    <li key={phase.title} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">Step {i + 1} · {phase.title}</p>
                      <p className="mt-2 text-[#475569]">{phase.text}</p>
                      <p className="mt-3 border-t border-[#E7E9F2] pt-3 text-sm font-semibold text-[#0B1220]">{phase.exit}</p>
                    </li>
                  ))}
                </ol>
              </Section>

              {/* MID-PAGE PROMPT — short, after Process */}
              <div className="mt-10 flex flex-col gap-4 rounded-[24px] bg-[#0B1220] p-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg font-semibold">Not sure which scope fits? Talk it through — free, no obligation.</p>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Button href="/consultation" size="lg">Book a Free Consultation</Button>
                  <Button href="/estimate" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Get an Estimate</Button>
                </div>
              </div>

              {/* BENEFITS / OUTCOMES — plain business language, per service */}
              <Section title="What it does for your business">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {d.benefits.map((b) => (
                    <li key={b} className="flex gap-3 rounded-[20px] border border-[#E7E9F2] bg-white p-4 text-[#0B1220] shadow-sm"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#16A34A]" />{b}</li>
                  ))}
                </ul>
                {s.outcome && <p className="mt-5 rounded-[24px] bg-[#F6F7FB] p-6 text-lg text-[#0B1220]">{s.outcome}</p>}
              </Section>
            </>
          )}

          {/* IN DETAIL — capabilities, per service (existing strong section, kept) */}
          {s.capabilities && s.capabilities.length > 0 && (
            <Section title="In detail" intro="The technical detail, in plain language — so you can see exactly what is included before you commit.">
              <div className="grid gap-4 sm:grid-cols-2">
                {s.capabilities.map((c) => (
                  <article key={c.title} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                    <h3 className="ct-h4">{c.title}</h3>
                    <p className="mt-2 text-[#475569]">{c.description}</p>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* TECHNOLOGY — grouped by the service's own stack, with plain glosses */}
          {s.techStack && s.techStack.length > 0 && (
            <Section title="Technology, in plain terms" intro="The tools behind this service, and why each one is there — no jargon without an explanation.">
              <div className="grid gap-4 sm:grid-cols-2">
                {s.techStack.map((t) => (
                  <article key={t.name} className="rounded-[20px] border border-[#E7E9F2] bg-[#F6F7FB] p-5">
                    <h3 className="ct-h4">{t.name}</h3>
                    <p className="mt-2 text-[#475569]">{t.description}</p>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* RELATED PROJECTS — real CraftThink projects that used this service */}
          {relatedProjects.length > 0 && (
            <Section title="See it in real projects" intro="Projects on this site that used this service — open one to see the problem, the build and the result.">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((p) => (
                  <article key={p.slug} className="ct-tile flex h-full flex-col">
                    <Link href={`/work/${p.slug}`} className="block">
                      <div className="relative overflow-hidden bg-[#EEF2FF]">
                        <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="ct-h4">{p.title}</h3>
                        <p className="mt-2 text-[#475569]">{p.line}</p>
                        <p className="mt-4 flex min-h-[44px] items-center gap-1 font-semibold text-[#4F46E5]">Case study <ArrowRight size={16} /></p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* ENGAGEMENT / STARTING POINT — no prices, honest scope guidance */}
          <Section title="How to start" intro="No prices are guessed here — your price is confirmed in writing after a free consultation. This is how starting works.">
            <ol className="grid gap-4 sm:grid-cols-3">
              <li className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">1 · Free consultation</p>
                <p className="mt-2 text-[#475569]">Tell us the problem in plain words. We show you the closest project and a clear next step — with no obligation.</p>
              </li>
              <li className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">2 · Written scope &amp; quote</p>
                <p className="mt-2 text-[#475569]">Scope, timeline and price agreed in writing before any build starts. You can stop here if it does not fit.</p>
              </li>
              <li className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">3 · Prototype, then build</p>
                <p className="mt-2 text-[#475569]">A prototype first for your approval, then weekly demos while it is built, then launch checks with you.</p>
              </li>
            </ol>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/consultation" size="lg">Book a Free Consultation</Button>
              <Button href="/estimate" size="lg" variant="secondary">Get an Estimate</Button>
              <Button href="/audit" size="lg" variant="secondary">Free Software Audit</Button>
            </div>
          </Section>

          {/* FAQ — per service */}
          {d && d.faqs.length > 0 && (
            <Section title={`Questions about ${s.title}`}>
              <div className="flex flex-col gap-3">
                {d.faqs.map((f) => (
                  <details key={f.q} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                    <summary className="flex min-h-[48px] cursor-pointer items-center text-lg font-semibold text-[#0B1220]">{f.q}</summary>
                    <p className="mt-2 text-[#475569]">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          {/* RELATED SERVICES — 3 siblings, not just "All services" */}
          {relatedServices.length > 0 && (
            <Section title="Related services">
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedServices.map((r) => (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="block rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="ct-h4">{r.title}</h3>
                    <p className="mt-2 text-[#475569]">{r.line}</p>
                    <p className="mt-4 flex min-h-[44px] items-center gap-1 font-semibold text-[#4F46E5]">See service <ArrowRight size={16} /></p>
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </Container>
      </section>

      {/* SERVICE-MATCHED CLOSER */}
      <CtaBand
        title={`Talk about ${s.title}`}
        text={`Book a free consultation about ${s.title}${closerProject ? ` — we will show you ${closerProject.title} and a clear next step` : ""} — with no obligation.`}
      />
    </>
  );
}
