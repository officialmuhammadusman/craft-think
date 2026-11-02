import type { Metadata } from "next";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects, services } from "@/data/content";
import { industries, verifiedLiveLinks } from "@/data/offering";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMockup } from "@/components/home/DashboardMockup";

export const metadata: Metadata = {
  title: "CraftThink — Software, built with thought, guided by AI",
  description: siteConfig.description,
};

const techStack = ["Next.js", "React", "React Native", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "LangChain", "LangGraph", "Pinecone"];

/**
 * Homepage — cut to the top-house shape: hero, proof strip, work,
 * services, engagement models, one 4-phase process, why-choose with
 * proof, a one-line tools strip, final CTA. No duplicated sections,
 * no counters, no gradients in layout chrome. One flat accent:
 * solid indigo #4F46E5 on white/grey/dark-navy, teal only as the
 * tiny AI dot. Full detail lives on the case, service and process
 * pages, not on the homepage.
 */
const phases = [
  {
    n: "01",
    title: "Assess",
    text: "We learn your business, your customers and the problem, then write down scope, timeline and price.",
    exit: "Week 1 · You leave with a written plan — and you can stop here, no build required.",
  },
  {
    n: "02",
    title: "Pilot & Design",
    text: "A clickable prototype first, so you see and approve the look and flow before any production code.",
    exit: "Prototype first · No build starts without your sign-off.",
  },
  {
    n: "03",
    title: "Build",
    text: "Small, tested steps with a working demo every week, so you steer the product as it grows.",
    exit: "Weekly demos · You can pause or change scope in writing at any demo.",
  },
  {
    n: "04",
    title: "Launch & Support",
    text: "We deploy, check payments, bookings and forms live with you, then monitor and support the software.",
    exit: "Launch checks + care plan · You own the code and data; care is month-to-month.",
  },
];

const whyChoose = [
  { title: "A plan in writing, before you pay", proof: "Scope, timeline and price agreed up front — see how we run projects on the process page.", href: "/process" },
  { title: "Security built in, not added later", proof: "JWT and OAuth 2.0 sign-in, role-based permissions and encryption — as used in the HR case study.", href: "/work/hr-management-system" },
  { title: "Releases you can repeat", proof: "Docker, Vercel hosting and GitHub Actions CI/CD — this very site deploys that way.", href: "/process" },
  { title: "Support after launch", proof: "Bug fixes, updates and monitoring on a care plan you can cancel anytime.", href: "/services/testing-care" },
  { title: "One contact, weekly demos", proof: "Weekly progress and demos, planned around your time zone — led by CEO Muhammad Usman.", href: "/about" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — headline, one line, one CTA, one trust line, one visual */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#0B1220]">
        <Container width="wide">
          <div className="relative z-10 grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col items-start gap-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> Software house · Remote clients worldwide
              </span>
              <h1 id="hero-heading" className="ct-display-xl !text-white">
                Software that wins customers, not just code.
              </h1>
              <p className="ct-body-lg max-w-xl text-white/70">
                CraftThink builds websites, apps, booking and CRM systems, and AI assistants — designed, built and supported by one team, led by CEO Muhammad Usman.
              </p>
              <Button href="/consultation" size="lg">Book a Free Consultation</Button>
              <p className="text-sm text-white/50">11 services · 6 delivered projects · Free first consultation</p>
            </div>
            <div className="pb-2 pt-2">
              <DashboardMockup />
            </div>
          </div>
        </Container>
      </section>

      {/* PROOF STRIP — grey strip, real facts only, static text (no counters) */}
      <div className="scroll-mt-[88px] border-b border-[#E7E9F2] bg-[#F6F7FB] py-4">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-widest text-[#0B1220]">
            11 services <span className="mx-3 text-[#4F46E5]">·</span> 6 delivered projects <span className="mx-3 text-[#4F46E5]">·</span> Remote clients worldwide
          </p>
        </Container>
      </div>

      {/* WORK — compact carousel-style grid: image + tag + title + one outcome + tech chips */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Work" title="Work that changed how businesses run" subtitle="One outcome per project. Full problem, build and result on each case page." /></Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link href="/work" className="flex min-h-[44px] items-center rounded-full bg-[#0B1220] px-4 text-sm font-semibold text-white">All work</Link>
              {industries.map((ind) => (
                <Link key={ind.label} href={ind.href} className="flex min-h-[44px] items-center rounded-full border border-[#E7E9F2] bg-white px-4 text-sm font-semibold text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]">
                  {ind.label}
                </Link>
              ))}
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const live = verifiedLiveLinks[p.slug];
              const chips = p.stack.split(", ").slice(0, 3);
              return (
                <Reveal key={p.slug}>
                  <article className="ct-tile group flex h-full flex-col">
                    <Link href={`/work/${p.slug}`} className="block">
                      <div className="relative overflow-hidden bg-[#EEF2FF]">
                        <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="h-52 w-full object-cover" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel}</span>
                      </div>
                      <div className="p-6 pb-0">
                        <h3 className="ct-h4">{p.title}</h3>
                        <p className="mt-2 text-[#475569]">{p.line}</p>
                      </div>
                    </Link>
                    <div className="mt-auto p-6 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {chips.map((c) => (
                          <span key={c} className="rounded-full bg-[#F6F7FB] px-3 py-1 text-xs font-semibold text-[#475569]">{c}</span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <Link href={`/work/${p.slug}`} className="flex min-h-[44px] items-center gap-1 font-semibold text-[#4F46E5]">Case study <ArrowRight size={16} /></Link>
                        {live && (
                          <a href={live} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-1 font-semibold text-[#0B1220]">Live site <ArrowUpRight size={16} /></a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-[#64748B]">Live-site note: Mejora Tu Dolor, Padel Connect and BookDubaiGuide link out to their live sites. The HR portal link returned a 404 in a recent check and cliender.com now shows a different consultancy, so those two are not linked as live. Project images are project visuals, not client screenshots.</p>
        </Container>
      </section>

      {/* SERVICES — one presentation only: image tiles */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Services" title="What we build" subtitle="Eleven services, one team. Choose the outcome you need — the technology follows." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`/services/${s.slug}`} className="ct-tile group block h-full">
                  <div className="relative overflow-hidden bg-[#EEF2FF]">
                    <Image src={s.image} alt={s.imageAlt} width={800} height={520} className="h-52 w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">Service</span>
                  </div>
                  <div className="border-t-4 border-[#4F46E5] p-6">
                    <h3 className="ct-h4">{s.title}</h3>
                    <p className="mt-2 text-[#475569]">{s.line}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">See who it is for <ArrowRight size={17} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Button href="/services" variant="secondary" size="lg">View all 11 services →</Button></div>
        </Container>
      </section>

      {/* TECHNOLOGIES — one-line marquee strip (slide only, no gradient) */}
      <section className="overflow-hidden bg-white py-10">
        <Container>
          <Reveal><p className="text-center text-xs font-bold uppercase tracking-widest text-[#64748B]">Built with modern, proven technology</p></Reveal>
        </Container>
        <div aria-hidden="true" className="ct-marquee-track mt-6 gap-3 px-4">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="shrink-0 rounded-full border border-[#E7E9F2] bg-[#F6F7FB] px-5 py-2.5 text-base font-bold text-[#0B1220]">{t}</span>
          ))}
        </div>
      </section>

      {/* ENGAGEMENT MODELS — one differentiating sentence each */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Working together" title="Three ways to work with us" subtitle="The difference is what you commit to — not a list of features." /></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Fixed Project", best: "One defined product, one agreed price — scope, timeline and price in writing.", cta: "Get an estimate", href: "/estimate" },
              { title: "Dedicated Team", best: "Ongoing product work, month to month — scale the team up or down as you go.", cta: "Book a consultation", href: "/consultation" },
              { title: "Support & Care", best: "Software you already run, kept healthy — bug fixes and updates, cancel anytime.", cta: "See support", href: "/services/testing-care" },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-[24px] border border-[#E7E9F2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="ct-h4">{m.title}</h3>
                  <p className="mt-2 flex-1 text-[#475569]">{m.best}</p>
                  <p className="mt-3 text-sm text-[#64748B]">All three include weekly demos.</p>
                  <Link href={m.href} className="mt-6 flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">{m.cta} <ArrowRight size={16} /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS — ONE merged 4-phase section (journey + process + practices merged) */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Process" title="From first call to launch, in four phases" subtitle="Each phase ends with something you can approve — or stop at." /></Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <li className="h-full rounded-[24px] border border-[#E7E9F2] bg-white p-7 shadow-sm">
                  <span className="font-display text-4xl font-bold text-[#4F46E5]">{p.n}</span>
                  <h3 className="ct-h4 mt-3">{p.title}</h3>
                  <p className="mt-2 text-[#475569]">{p.text}</p>
                  <p className="mt-4 border-t border-[#E7E9F2] pt-4 text-sm font-semibold text-[#0B1220]">{p.exit}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 text-center"><Button href="/process" variant="secondary" size="lg">How we run projects — full detail</Button></div>
        </Container>
      </section>

      {/* WHY CHOOSE — one checkable proof per reason, plain list (no cards) */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Why CraftThink" title="What you get, beyond the code" subtitle="Every reason below is checkable — a document, a tool, or a case you can open." /></Reveal>
          <div className="mt-12 flex flex-col divide-y divide-[#E7E9F2] border-y border-[#E7E9F2]">
            {whyChoose.map((w) => (
              <Reveal key={w.title}>
                <article className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:gap-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-white"><Check size={18} /></span>
                  <div className="flex-1">
                    <h3 className="ct-h4">{w.title}</h3>
                    <p className="mt-1 text-[#475569]">{w.proof}</p>
                  </div>
                  <Link href={w.href} className="flex min-h-[44px] shrink-0 items-center gap-1 font-semibold text-[#4F46E5]">See proof <ArrowRight size={16} /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* TOOLS — one-line strip only */}
      <section className="border-b border-[#E7E9F2] bg-white py-8">
        <Container>
          <p className="text-center text-base text-[#475569]">
            Free before you spend anything:{" "}
            <Link href="/guide" className="font-semibold text-[#4F46E5]">AI Guide</Link>
            {" · "}
            <Link href="/estimate" className="font-semibold text-[#4F46E5]">Estimator</Link>
            {" · "}
            <Link href="/audit" className="font-semibold text-[#4F46E5]">Free Audit</Link>
            {" — no obligation."}
          </p>
        </Container>
      </section>

      {/* FINAL CTA — flat solid indigo band, one action, CEO quote inside
          (no standalone CEO section). Indigo, not dark navy, so it never
          merges with the dark footer below it. Button is white-on-indigo. */}
      <section className="bg-[#4F46E5] py-16 text-white sm:py-20">
        <Container>
          <div className="flex flex-col items-start gap-5">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">Free consultation · No obligation</span>
            <h2 className="ct-section-title !text-white max-w-2xl">Not sure where to start?</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">Book a free consultation. We will understand your problem, show you a similar project, and give you a clear next step — with no obligation.</p>
            <p className="max-w-xl text-lg italic leading-relaxed text-white/90">“You talk to the person leading your project, not a ticket queue.” — Muhammad Usman, CEO &amp; Founder, CraftThink</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/consultation" size="lg" variant="secondary">Book a Free Consultation</Button>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/60"><Globe size={16} /> {siteConfig.email} · {siteConfig.phone} · Working remotely with clients worldwide</p>
          </div>
        </Container>
      </section>
    </>
  );
}
