import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { projects, services } from "@/data/content";
import { projectDetails } from "@/data/detail";
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

function Section({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="ct-h3">{title}</h2>
      {intro && <p className="mt-3 text-lg text-[#475569]">{intro}</p>}
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const d = projectDetails[p.slug];
  const matchedServices = d
    ? d.serviceSlugs.map((ss) => services.find((s) => s.slug === ss)).filter((s): s is NonNullable<typeof s> => Boolean(s))
    : [];
  const relatedProjects = projects.filter((x) => x.slug !== p.slug && (x.industry === p.industry || matchedServices.some((s) => d?.serviceSlugs.includes(s.slug) && projectDetails[x.slug]?.serviceSlugs.includes(s.slug)))).slice(0, 3);
  const related = relatedProjects.length > 0 ? relatedProjects : projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  const techChips = d?.techChips ?? p.stack.split(", ").map((t) => t.trim()).filter(Boolean);
  const live = verifiedLiveLinks[p.slug];
  const closerService = matchedServices[0];

  return (
    <>
      {/* HERO */}
      <section className="ct-section pb-0">
        <Container>
          <Link href="/work" className="flex min-h-[48px] items-center text-base font-semibold text-[#4F46E5]">← All work</Link>
          <span className="mt-4 block"><span className="ct-eyebrow">{p.industryLabel} · Case study</span></span>
          <h1 className="ct-h1 mt-4">{p.title}</h1>
          <p className="ct-body-lg mt-4 max-w-3xl text-[#475569]">{p.line}</p>
          <div className="mt-8">
            <Image src={p.image} alt={p.imageAlt} width={1200} height={700} className="w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </div>

          {/* AT-A-GLANCE FACT STRIP — only facts honestly known; no invented duration/team */}
          <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-[#E7E9F2] bg-[#F6F7FB] p-6">
            <div className="flex flex-col gap-2 text-base sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span><strong>Industry:</strong> {p.industryLabel}</span>
              {matchedServices.length > 0 && (
                <span><strong>Built with:</strong>{" "}
                  {matchedServices.map((s, i) => (
                    <span key={s.slug}>{i > 0 && ", "}<Link href={`/services/${s.slug}`} className="font-semibold text-[#4F46E5]">{s.title}</Link></span>
                  ))}
                </span>
              )}
              {live && (
                <span><strong>Live:</strong>{" "}
                  <a href={live} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#4F46E5]">Visit live site ↗</a>
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {techChips.map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#0B1220] ring-1 ring-[#E7E9F2]">{t}</span>
              ))}
            </div>
          </div>

          {/* CLIENT BACKGROUND — business type/scale, anonymised, from existing data */}
          {d && (
            <Section title="Who it was for" intro={d.clientBackground} />
          )}

          {/* THE PROBLEM — with the stakes, from existing problem/result data */}
          <Section title="The problem — and what was at stake">
            <p className="text-lg text-[#475569]">{p.problem}</p>
            <p className="mt-3 text-lg text-[#475569]">Left as it was, that problem kept costing time and customers every day — which is why the business needed a system, not another workaround.</p>
          </Section>

          {/* PHASED APPROACH — phases this project actually went through */}
          {d && (
            <Section title="How it was built, phase by phase" intro="The order the work happened in — each phase ends with something that worked, not just a plan.">
              <ol className="grid gap-4 sm:grid-cols-2">
                {d.phases.map((phase, i) => (
                  <li key={phase.title} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">Phase {i + 1} · {phase.title}</p>
                    <p className="mt-2 text-[#475569]">{phase.text}</p>
                    <p className="mt-3 border-t border-[#E7E9F2] pt-3 text-sm font-semibold text-[#0B1220]">{phase.exit}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* IN DETAIL — existing strong section, kept */}
          {p.longDescription && (
            <Section title="In detail" intro={p.longDescription} />
          )}

          {/* WHAT WE BUILT */}
          <Section title="What we built">
            <ul className="flex flex-col gap-3">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3 rounded-[20px] border border-[#E7E9F2] bg-white p-4 text-[#0B1220] shadow-sm"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#16A34A]" />{b}</li>
              ))}
            </ul>
          </Section>

          {/* MID-PAGE ILLUSTRATION — the project's own motif, reused */}
          <div className="mt-10">
            <Image src={p.image} alt={p.imageAlt} width={1200} height={700} className="h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </div>

          {/* FEATURES */}
          {p.features && p.features.length > 0 && (
            <Section title="Features">
              <div className="grid gap-4 sm:grid-cols-2">
                {p.features.map((f) => (
                  <article key={f.title} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                    <h3 className="ct-h4">{f.title}</h3>
                    <p className="mt-2 text-[#475569]">{f.description}</p>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* TECHNICAL DECISIONS */}
          {p.decisions && p.decisions.length > 0 && (
            <Section title="Technical decisions" intro="Why each key choice was made — the trade-off, not just the tool name.">
              <div className="flex flex-col gap-4">
                {p.decisions.map((dec) => (
                  <article key={dec.title} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                    <h3 className="ct-h4">{dec.title}</h3>
                    <p className="mt-2 text-[#475569]">{dec.explanation}</p>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* CHALLENGES & SOLUTIONS */}
          {p.challenges && p.challenges.length > 0 && (
            <Section title="Challenges & solutions">
              <div className="flex flex-col gap-4">
                {p.challenges.map((c) => (
                  <article key={c.problem} className="rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-sm">
                    <p className="font-semibold text-[#0B1220]">Problem: {c.problem}</p>
                    <p className="mt-2 text-[#475569]">Solution: {c.solution}</p>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* TECHNOLOGIES — scannable list (was buried in prose) */}
          <Section title="Technologies" intro="The stack behind this project, at a glance.">
            <div className="flex flex-wrap gap-2">
              {techChips.map((t) => (
                <span key={t} className="rounded-full bg-[#F6F7FB] px-4 py-2 text-base font-semibold text-[#0B1220] ring-1 ring-[#E7E9F2]">{t}</span>
              ))}
            </div>
          </Section>

          {/* BUSINESS RESULT — evidenced qualitative before/after; no invented numbers */}
          <Section title="The business result" intro="Before and after — what changed for the business, without invented numbers.">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[20px] border border-[#E7E9F2] bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-[#64748B]">Before</p>
                <p className="mt-2 text-[#475569]">{p.problem}</p>
              </article>
              <article className="rounded-[20px] border border-[#4F46E5]/30 bg-[#EEF2FF] p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">After</p>
                <p className="mt-2 text-[#0B1220]">{p.result}</p>
              </article>
            </div>
          </Section>

          {/* RELATED PROJECTS + MATCHING SERVICE LINK */}
          <Section title="Related projects" intro="Other projects on this site in the same area — and the service behind this one.">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <article key={r.slug} className="ct-tile flex h-full flex-col">
                  <Link href={`/work/${r.slug}`} className="block">
                    <div className="relative overflow-hidden bg-[#EEF2FF]">
                      <Image src={r.image} alt={r.imageAlt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{r.industryLabel}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="ct-h4">{r.title}</h3>
                      <p className="mt-2 text-[#475569]">{r.line}</p>
                      <p className="mt-4 flex min-h-[44px] items-center gap-1 font-semibold text-[#4F46E5]">Case study <ArrowRight size={16} /></p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            {matchedServices.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {matchedServices.map((s) => (
                  <Button key={s.slug} href={`/services/${s.slug}`} variant="secondary" size="lg">Built with: {s.title} →</Button>
                ))}
              </div>
            )}
          </Section>

          {/* PROBLEM-MATCHED PROMPT — before the generic closer */}
          <div className="mt-14 flex flex-col gap-4 rounded-[24px] bg-[#0B1220] p-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold">Facing a similar problem? See how we would approach yours — free, no obligation.</p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href="/consultation" size="lg">Book a Free Consultation</Button>
              {closerService && (
                <Button href={`/services/${closerService.slug}`} size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">See {closerService.title}</Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* PROBLEM-MATCHED CLOSER (CtaBand text varies per project) */}
      <CtaBand
        title={`Building something like ${p.title}?`}
        text={`Book a free consultation about a ${p.industryLabel.toLowerCase()} project like this one — we will show you the closest work and a clear next step, with no obligation.`}
      />
    </>
  );
}
