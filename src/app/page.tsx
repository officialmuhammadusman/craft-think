import type { Metadata } from "next";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects, services } from "@/data/content";
import { industries, verifiedLiveLinks } from "@/data/offering";
import { CEO_PHOTO, SHAHZAD_PHOTO } from "@/data/team-photos";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { WhatHappensNext } from "@/components/sections/WhatHappensNext";
import { HeroPathCollage } from "@/components/home/HeroPathCollage";

export const metadata: Metadata = {
  title: "CraftThink — Software, built with thought, guided by AI",
  description: siteConfig.description,
};

const techStack = ["Next.js", "React", "React Native", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "LangChain", "LangGraph", "Pinecone"];

const team = [
  {
    name: "Muhammad Usman",
    role: "CEO",
    photo: CEO_PHOTO,
    photoAlt: "Muhammad Usman — CEO, CraftThink",
    text: "Leads every project personally — full-stack development and applied AI, from the first call to support after launch.",
    href: "/about/ceo",
    linkLabel: "About the CEO →",
    external: false,
  },
  {
    name: "Shahzad Akbar",
    role: "Team Lead & Partner",
    photo: SHAHZAD_PHOTO,
    photoAlt: "Shahzad Akbar — Team Lead & Partner, CraftThink",
    text: "Team lead and partner at CraftThink, working across web applications and AI systems.",
    href: "https://www.linkedin.com/in/shahzad-akbar-aa910725b/",
    linkLabel: "LinkedIn →",
    external: true,
    skills: ["Laravel", "React", "Next.js", "RAG", "LangChain", "PyTorch", "REST APIs", "MySQL", "Redis"],
  },
];

/**
 * Homepage — cut to the top-house shape: hero, proof strip, services
 * ("What we build"), work, engagement models, one 4-phase process, why-choose with
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
  { title: "Reliable, repeatable releases", proof: "Docker, Vercel hosting and GitHub Actions CI/CD — this very site deploys that way.", href: "/process" },
  { title: "Support after launch", proof: "Bug fixes, updates and monitoring on a care plan you can cancel anytime.", href: "/services/testing-care" },
  { title: "One contact, weekly demos", proof: "Weekly progress and demos, planned around your time zone — led by CEO Muhammad Usman.", href: "/about" },
];

export default function HomePage() {
  // Homepage Work grid mirrors the /work listing exactly: the same 6
  // cards in the same order. Padel Connect stays reachable via its own
  // detail URL and via "Related projects" links, but never as a card
  // here. The "7 delivered projects" wording above is untouched — 7
  // projects still exist in total; only the grid shows 6.
  const gridOrder = ["telemedicine", "cliender", "hr-management-system", "actors-index", "rag-ai-assistant", "book-dubai-guide"];
  const gridProjects = gridOrder.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  return (
    <>
      {/* HERO — Concept A "The Path" (restored after Concept C was
          rejected): LIGHT split hero. Left: eyebrow, headline,
          subline, two CTAs, human proof line. Right: the path
          collage of CraftThink's own project types, joined by the
          indigo path line with tiny teal AI dots. */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
        <Container width="wide">
          <div className="relative z-10 grid min-w-0 grid-cols-1 items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-24">
            <div className="flex min-w-0 flex-col items-start gap-6 text-left">
              <span className="ct-eyebrow">Software house · Remote clients worldwide</span>
              <h1 id="hero-heading" className="ct-display-xl text-[#0B1220]">
                Software that fits the way your business <em className="ct-serif-accent text-[#4F46E5]">actually</em> works.
              </h1>
              <p className="ct-body-lg max-w-xl text-[#475569]">
                We build websites, mobile apps, booking and CRM systems, and AI solutions powered by RAG and automation — designed with you, built for your customers, and supported after launch.
              </p>
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
                <Button href="/consultation" size="lg" className="w-full sm:w-auto">Book a free call</Button>
                <Button href="/work" variant="outline" size="lg" className="w-full sm:w-auto">See our work</Button>
              </div>
              <p className="text-sm text-[#64748B]">You&apos;ll talk directly with the person leading your project.</p>
            </div>
            {/* Extra bottom padding on phones/tablets so the collage
                bottom is never hidden under the fixed mobile CTA bar
                or the floating Ask AI button while on screen. */}
            <div className="min-w-0 pb-24 pt-2 lg:pb-2">
              <HeroPathCollage />
            </div>
          </div>
        </Container>
      </section>

      {/* PROOF STRIP — grey strip, real facts only, static text (no counters) */}
      <div className="scroll-mt-[88px] border-b border-[#E7E9F2] bg-[#F6F7FB] py-4">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-widest text-[#0B1220]">
            11 services <span className="mx-3 text-[#4F46E5]">·</span> 7 delivered projects <span className="mx-3 text-[#4F46E5]">·</span> Remote clients worldwide
          </p>
        </Container>
      </div>

      {/* SERVICES — one presentation only: image tiles */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Services" title="What we build" subtitle="Eleven services, one team. Choose the outcome you need — the technology follows." /></Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <StaggerItem key={s.slug} className="h-full">
                <Link href={`/services/${s.slug}`} className="ct-tile group block h-full">
                  <div className="relative overflow-hidden bg-[#EEF2FF]">
                    <Image src={s.image} alt={s.imageAlt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">Service</span>
                  </div>
                  <div className="border-t-4 border-[#4F46E5] p-6">
                    <h3 className="ct-h4">{s.title}</h3>
                    <p className="mt-2 text-[#475569]">{s.line}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">See who it&apos;s for <ArrowRight size={17} /></p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center"><Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">View all services →</Button></div>
        </Container>
      </section>

      {/* WORK — compact carousel-style grid: image + tag + title + one outcome + tech chips */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Work" title="Work that changed how businesses run" subtitle="One outcome per project. Full problem, build and result on each case page." /></Reveal>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridProjects.map((p) => {
              const live = verifiedLiveLinks[p.slug];
              const chips = p.stack.split(", ").slice(0, 3);
              return (
                <StaggerItem key={p.slug} className="h-full">
                  <article className="ct-tile group flex h-full flex-col">
                    <Link href={`/work/${p.slug}`} className="block">
                      <div className="relative overflow-hidden bg-[#EEF2FF]">
                        <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
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
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className="mt-10 text-center"><Button href="/work" variant="secondary" size="lg" className="w-full sm:w-auto">View all work →</Button></div>
        </Container>
      </section>

      {/* INDUSTRIES — only industries with a real project behind them */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Who we build for" title="Industries we have actually built for" subtitle="Every industry below links to a real case study — no industry is listed without work behind it." /></Reveal>
          <Reveal className="mt-10">
            <Image src="/images/sections/industries.svg" alt="Illustration of the industries CraftThink has built for, from healthcare to travel" width={1200} height={700} className="h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </Reveal>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <StaggerItem key={ind.label} className="h-full">
                <article className="ct-lift flex h-full flex-col rounded-[24px] border border-[#E7E9F2] bg-white p-7 shadow-sm">
                  <h3 className="ct-h4">{ind.label}</h3>
                  <p className="mt-2 flex-1 text-[#475569]">{ind.description}</p>
                  {ind.projectHref && (
                    <Link href={ind.projectHref} className="mt-4 flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">See the case study: {ind.projectLabel} <ArrowRight size={16} /></Link>
                  )}
                  <Link href={ind.href} className="flex min-h-[48px] items-center gap-1 font-semibold text-[#0B1220]">All {ind.label} work <ArrowRight size={16} /></Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* WHY WORK WITH US — trust strip built ONLY from real facts already on the site:
          a direct line to the CEO, a written plan before payment, real linked live sites
          and case studies, and support after launch. No stars, logos, counts or claims. */}
      <section className="ct-section bg-[#0B1220] text-white">
        <Container>
          <Reveal><SectionHeading dark eyebrow="Why work with CraftThink" title="A partner you can check, before you commit" subtitle="No obligation at any step — start with a free consultation and decide from there." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Talk to the person in charge", text: "Your contact is CEO Muhammad Usman, the person leading your project — not a ticket queue.", href: "/about/ceo" },
              { title: "A written plan before you pay", text: "Scope, timeline and price agreed in writing first, through discovery, build, launch and support.", href: "/process" },
              { title: "Real work you can open", text: "Seven case studies, with live sites linked wherever they exist, so you judge the work itself.", href: "/work" },
              { title: "Support after launch", text: "Monitoring, fixes and updates on a care plan you can cancel anytime — you own the code and data.", href: "/services/testing-care" },
            ].map((t) => (
              <Reveal key={t.title}>
                <Link href={t.href} className="ct-lift block h-full rounded-[24px] border border-white/15 bg-white/5 p-6">
                  <h3 className="ct-h4 text-white">{t.title}</h3>
                  <p className="mt-2 text-white/70">{t.text}</p>
                  <p className="mt-4 flex items-center gap-1 font-semibold text-white">Learn more <ArrowRight size={16} /></p>
                </Link>
              </Reveal>
            ))}
          </div>
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
          <Reveal><SectionHeading eyebrow="Working together" title="Three ways to work with us" subtitle="Pick the arrangement that fits your budget and timeline." /></Reveal>
          <Reveal className="mt-10">
            <Image src="/images/sections/engagement.svg" alt="Illustration of the three ways to work with CraftThink: fixed project, dedicated team, and support and care" width={1200} height={700} className="h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Fixed Project", best: "One defined product, one agreed price — scope, timeline and price in writing.", cta: "Get an estimate", href: "/estimate", tool: "Start with a free audit", toolHref: "/audit" },
              { title: "Dedicated Team", best: "Ongoing product work, month to month — scale the team up or down as you go.", cta: "Book a consultation", href: "/consultation", tool: "Try the estimator first", toolHref: "/estimate" },
              { title: "Support & Care", best: "Software you already run, kept healthy — bug fixes and updates, cancel anytime.", cta: "See support", href: "/services/testing-care", tool: "Run a free audit", toolHref: "/audit" },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-[24px] border border-[#E7E9F2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="ct-h4">{m.title}</h3>
                  <p className="mt-2 flex-1 text-[#475569]">{m.best}</p>
                  <p className="mt-3 text-sm text-[#64748B]">All three include weekly demos.</p>
                  <Link href={m.href} className="mt-6 flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">{m.cta} <ArrowRight size={16} /></Link>
                  <Link href={m.toolHref} className="flex min-h-[48px] items-center gap-1 font-semibold text-[#0B1220]">{m.tool} <ArrowRight size={16} /></Link>
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
          <Reveal className="mt-10">
            <Image src="/images/sections/process.svg" alt="Illustration of the four project phases, from assess to launch and support" width={1200} height={700} className="h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <li className="ct-lift h-full rounded-[24px] border border-[#E7E9F2] bg-white p-7 shadow-sm">
                  <span className="font-display text-4xl font-bold text-[#4F46E5]">{p.n}</span>
                  <h3 className="ct-h4 mt-3">{p.title}</h3>
                  <p className="mt-2 text-[#475569]">{p.text}</p>
                  <p className="mt-4 border-t border-[#E7E9F2] pt-4 text-sm font-semibold text-[#0B1220]">{p.exit}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 text-center"><Button href="/process" variant="secondary" size="lg" className="w-full sm:w-auto">How we run projects — full detail</Button></div>
        </Container>
      </section>

      {/* WHAT HAPPENS NEXT — honest journey after contact, with illustration */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal className="mb-10">
            <Image src="/images/sections/journey.svg" alt="Illustration of the journey after contacting CraftThink, from request to support" width={1200} height={700} className="h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </Reveal>
          <WhatHappensNext />
        </Container>
      </section>

      {/* WHY CHOOSE — one checkable proof per reason, plain list (no cards) */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Why CraftThink" title="More than just code" subtitle="Every point below can be checked — in a document, a tool, or a case study you can open." /></Reveal>
          <Reveal className="mt-10">
            <Image src="/images/sections/why.svg" alt="Illustration of why to trust CraftThink: direct contact, a written plan, real work, and support" width={1200} height={700} className="h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
          </Reveal>
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

      {/* OUR TEAM — same two cards as the company page */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Our team" title="The people behind your project" subtitle="You talk to the person leading your project — and the team behind him builds it." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {team.map((m) => (
              <Reveal key={m.name}>
                <article className="ct-card h-full overflow-hidden p-0">
                  <Image src={m.photo} alt={m.photoAlt} width={900} height={900} unoptimized className="h-auto w-full object-cover" />
                  <div className="p-6">
                    <h3 className="ct-h4">{m.name}</h3>
                    <p className="mt-1 text-base font-semibold text-[#4F46E5]">{m.role}</p>
                    <p className="mt-3 text-[#475569]">{m.text}</p>
                    {"skills" in m && m.skills && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {m.skills.map((s) => (
                          <li key={s} className="rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-medium text-[#312E81]">{s}</li>
                        ))}
                      </ul>
                    )}
                    {m.external ? (
                      <a href={m.href} target="_blank" rel="noreferrer" className="mt-4 block min-h-[48px] text-base font-semibold text-[#4F46E5]">{m.linkLabel}</a>
                    ) : (
                      <Link href={m.href} className="mt-4 block min-h-[48px] text-base font-semibold text-[#4F46E5]">{m.linkLabel}</Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* TECHNOLOGIES — visual showcase: illustrated cards, not just chips */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Technologies" title="Technologies we use" subtitle="Proven tools, chosen for reliability — the same stack behind the case studies above." /></Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Frontend", image: "/images/sections/tech-frontend.svg", alt: "Illustration of frontend development: website components and pages", stack: "Next.js · React · TypeScript", href: "/services/website-design", cta: "See website services" },
              { title: "Backend", image: "/images/sections/tech-backend.svg", alt: "Illustration of backend development: servers and APIs", stack: "Node.js · NestJS", href: "/services/crm", cta: "See business systems" },
              { title: "Data", image: "/images/sections/tech-data.svg", alt: "Illustration of data and databases", stack: "PostgreSQL · Prisma · Supabase", href: "/services/crm", cta: "See business systems" },
              { title: "AI & RAG", image: "/images/sections/tech-ai.svg", alt: "Illustration of AI answering from documents with sources", stack: "LangChain · LangGraph · Pinecone", href: "/services/ai-solutions", cta: "See AI solutions" },
              { title: "Mobile", image: "/images/sections/tech-mobile.svg", alt: "Illustration of mobile apps on phones", stack: "React Native", href: "/services/mobile-apps", cta: "See mobile apps" },
              { title: "DevOps & Care", image: "/images/sections/tech-devops.svg", alt: "Illustration of deployment and support: code shipped safely and monitored", stack: "Docker · Vercel · GitHub Actions", href: "/services/testing-care", cta: "See support & care" },
            ].map((t) => (
              <StaggerItem key={t.title} className="h-full">
                <article className="ct-tile group flex h-full flex-col">
                  <div className="relative overflow-hidden bg-[#EEF2FF]">
                    <Image src={t.image} alt={t.alt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="ct-h4">{t.title}</h3>
                    <p className="mt-2 flex-1 text-[#475569]">{t.stack}</p>
                    <Link href={t.href} className="mt-4 flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">{t.cta} <ArrowRight size={16} /></Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* INSIGHTS PREVIEW — branded illustration per article */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Insights" title="Practical advice, before you spend anything" subtitle="General advice from the CraftThink team — no jargon, no sales talk." /></Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { slug: "why-a-booking-site-loses-customers", title: "Why a booking site loses customers", summary: "Most lost bookings are not about price. They are about confusion, friction, and missing trust at the moment someone is ready to book.", image: "/images/sections/insight-booking.svg", alt: "Illustration of a booking journey losing customers at confusing steps" },
              { slug: "what-a-crm-does-for-a-small-business", title: "What a CRM does for a small business", summary: "A CRM is not a fancy spreadsheet. It is one place where your customers, conversations, follow-ups, and sales live together.", image: "/images/sections/insight-crm.svg", alt: "Illustration of a CRM: customers, conversations, and follow-ups in one place" },
              { slug: "what-to-check-before-hiring-a-developer", title: "What to check before hiring a developer", summary: "Before you pay anyone to build your website or app, check these things: past work, ownership, written scope, and support after launch.", image: "/images/sections/insight-hiring.svg", alt: "Illustration of a checklist for hiring a developer: past work, ownership, scope, and support" },
            ].map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <Link href={`/insights/${a.slug}`} className="ct-tile group flex h-full flex-col">
                  <div className="relative overflow-hidden bg-[#EEF2FF]">
                    <Image src={a.image} alt={a.alt} width={800} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="ct-h4">{a.title}</h3>
                    <p className="mt-2 flex-1 text-[#475569]">{a.summary}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">Read the article <ArrowRight size={16} /></p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center"><Button href="/insights" variant="secondary" size="lg" className="w-full sm:w-auto">View all insights →</Button></div>
        </Container>
      </section>
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

      {/* FINAL CTA — WHITE banner (colour swap: the footer now takes
          the dark navy). Dark text, solid indigo button, light top
          border so it never merges with the white tools strip above. */}
      <section className="border-t border-[#E7E9F2] bg-white py-16 text-[#0B1220] sm:py-20">
        <Container>
          <div className="flex flex-col items-start gap-5">
            <svg aria-hidden="true" viewBox="0 0 320 24" className="h-6 w-80 max-w-full" fill="none">
              <path d="M4 12 H280" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 12" />
              <circle cx="300" cy="12" r="8" fill="#14B8A6" />
            </svg>
            <span className="rounded-full border border-[#E7E9F2] bg-[#EEF2FF] px-4 py-1.5 text-sm font-semibold text-[#4F46E5]">Free consultation · No obligation</span>
            <h2 className="ct-section-title max-w-2xl">Not sure where to start?</h2>
            <p className="max-w-xl text-lg leading-relaxed text-[#475569]">Book a free consultation. We will understand your problem, show you a similar project, and give you a clear next step — with no obligation.</p>
            <p className="max-w-xl text-lg italic leading-relaxed text-[#0B1220]">“You talk to the person leading your project, not a ticket queue.” — Muhammad Usman, CEO &amp; Founder, CraftThink</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/consultation" size="lg" className="w-full sm:w-auto">Book a Free Consultation</Button>
            </div>
            <p className="flex flex-wrap items-center gap-2 break-words text-sm text-[#64748B]"><Globe size={16} className="shrink-0" /> {siteConfig.email} · {siteConfig.phone} · Working remotely with clients worldwide</p>
          </div>
        </Container>
      </section>
    </>
  );
}
