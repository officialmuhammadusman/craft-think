import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Check, Globe, Layers, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects, processSteps, facilities, services, faqs } from "@/data/content";
import { industries, successPractices, verifiedLiveLinks } from "@/data/offering";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AiGuide } from "@/components/ai/AiGuide";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { HeroVisual } from "@/components/home/HeroVisual";
import { HeroCtas } from "@/components/home/HeroCtas";

export const metadata: Metadata = {
  title: "CraftThink — Software, built with thought, guided by AI",
  description: siteConfig.description,
};

const industryImages: Record<string, string> = {
  "Healthcare": "/images/work/work-telemedicine.jpg",
  "Finance & Business": "/images/work/work-cliender.jpg",
  "HR & Staff": "/images/work/work-hr.jpg",
  "Sports & Clubs": "/images/work/work-padel.jpg",
  "SaaS & Digital Products": "/images/work/work-ai.jpg",
  "Travel & Tourism": "/images/work/work-dubai.jpg",
};

const techStack = ["Next.js", "React", "React Native", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "LangChain", "LangGraph", "Pinecone"];

const engagementModels = [
  { icon: Rocket, accent: "bg-[#4F46E5]", title: "Fixed Project", best: "One defined product, one agreed price.", items: ["Scope, timeline and price in writing", "Design approved before building", "Weekly demos until launch"], cta: "Get an estimate", href: "/estimate" },
  { icon: Users, accent: "bg-[#14B8A6]", title: "Dedicated Team", best: "Ongoing product work, month to month.", items: ["Design, frontend, backend and mobile", "One point of contact, weekly progress", "Scale the team up or down"], cta: "Book a consultation", href: "/contact" },
  { icon: ShieldCheck, accent: "bg-[#0B1220]", title: "Support & Care", best: "Software you already run, kept healthy.", items: ["Bug fixes, updates and monitoring", "Small improvements every month", "Cancel anytime"], cta: "See support", href: "/services/testing-care" },
];

const journeySteps = [
  { n: "01", title: "Tell us your problem", text: "One call. No jargon, no obligation." },
  { n: "02", title: "Get a plan & estimate", text: "Scope, timeline and price, in writing." },
  { n: "03", title: "Approve the design", text: "A prototype first — before any code." },
  { n: "04", title: "Build, review weekly", text: "Working demos every week, not silence." },
  { n: "05", title: "Launch & support", text: "Live checks on day one, care after launch." },
];

export default function HomePage() {
  const spotlight = projects[0];
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-heading" className="relative flex min-h-[88vh] items-center overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#14113F] to-[#1E1B4B]">
        <div aria-hidden="true" className="ct-hero-grid absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="ct-hero-glow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#4F46E5]/25 blur-[120px]" />
          <div className="ct-hero-glow-slow absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#14B8A6]/15 blur-[110px]" />
        </div>
        <Container width="wide">
          <div className="relative z-10 grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col items-start gap-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> Software house · Remote clients worldwide
              </span>
              <h1 id="hero-heading" className="ct-display-xl !text-white">
                Software that wins customers, <span className="bg-gradient-to-r from-[#A5B4FC] via-[#818CF8] to-[#2DD4BF] bg-clip-text text-transparent">not just code.</span>
              </h1>
              <p className="ct-body-lg max-w-xl text-white/70">
                CraftThink builds websites, apps, booking and CRM systems, and AI assistants — designed, built and supported by one team, led by CEO Muhammad Usman.
              </p>
              <HeroCtas />
              <p className="flex items-center gap-2 text-sm text-white/50"><ShieldCheck size={16} className="text-[#14B8A6]" /> 11 services · 6 delivered projects · Free first consultation</p>
            </div>
            <div className="pb-10 pt-2 lg:pb-2"><HeroVisual /></div>
          </div>
        </Container>
      </section>

      {/* FACT MARQUEE */}
      <div aria-hidden="true" className="overflow-hidden border-b border-[#E7E9F2] bg-white py-4">
        <div className="ct-marquee-track gap-10">
          {["11 services", "6 case studies", "6 process steps", "Remote clients worldwide", "CEO-led", "Websites, apps, CRM, booking & AI", "Free consultation"].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-3 text-base font-bold uppercase tracking-widest text-[#0B1220]">
              <Sparkles size={15} className="text-[#14B8A6]" /> {item}
            </span>
          ))}
          {["11 services", "6 case studies", "6 process steps", "Remote clients worldwide", "CEO-led", "Websites, apps, CRM, booking & AI", "Free consultation"].map((item, i) => (
            <span key={`b-${i}`} className="flex shrink-0 items-center gap-3 text-base font-bold uppercase tracking-widest text-[#0B1220]">
              <Sparkles size={15} className="text-[#14B8A6]" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* KEY FACTS — animated counters, dark band */}
      <section className="bg-[#0B1220] py-14 text-white">
        <Container>
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-white/50">What CraftThink delivers</p>
          <ul className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
            {[
              { n: 11, label: "Services", note: "Websites, apps, CRM, booking, AI and more" },
              { n: 6, label: "Case studies", note: "HR, AI, healthcare, SaaS, sports and travel" },
              { n: 6, label: "Process steps", note: "Discover → Design → Build → Test → Launch → Support" },
            ].map((s) => (
              <li key={s.label} className="lg:px-6 lg:first:pl-0">
                <p className="font-display text-5xl font-bold text-white"><Counter value={s.n} /></p>
                <p className="mt-1 text-base font-semibold text-[#818CF8]">{s.label}</p>
                <p className="mt-1 text-sm leading-snug text-white/60">{s.note}</p>
              </li>
            ))}
            <li className="lg:px-6">
              <p className="font-display text-5xl font-bold text-white">Worldwide</p>
              <p className="mt-1 text-base font-semibold text-[#818CF8]">Remote clients</p>
              <p className="mt-1 text-sm leading-snug text-white/60">CEO-led, from Fiverr, Upwork and direct enquiries</p>
            </li>
          </ul>
        </Container>
      </section>

      {/* SPOTLIGHT — full-bleed editorial feature */}
      <section className="relative overflow-hidden">
        <Image src={spotlight.image} alt={spotlight.imageAlt} width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/85 to-[#0B1220]/20" />
        <Container>
          <Reveal>
            <div className="relative max-w-2xl py-20 text-white sm:py-28">
              <span className="ct-eyebrow !border-white/30 !bg-white/10 !text-white">Featured case study · Business</span>
              <h2 className="ct-section-title mt-5 !text-white">HR, without the paperwork.</h2>
              <p className="mt-4 text-lg text-white/80">{spotlight.problem}</p>
              <div className="mt-6 rounded-[24px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-[#2DD4BF]">Result</p>
                <p className="mt-2 text-lg text-white">{spotlight.result}</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={`/work/${spotlight.slug}`}>Read the case study</Button>
                <Button href="/work" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">All work</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* SERVICES — image tiles */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Services" title="What we build" subtitle="Eleven services, one team. Choose the outcome you need — the technology follows." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`/services/${s.slug}`} className="ct-tile group block h-full">
                  <div className="relative overflow-hidden">
                    <Image src={s.image} alt={s.imageAlt} width={800} height={520} className="h-52 w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">Service</span>
                  </div>
                  <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-[#4F46E5] via-[#312E81] to-[#14B8A6]" />
                  <div className="p-6">
                    <h3 className="ct-h4">{s.title}</h3>
                    <p className="mt-2 text-[#475569]">{s.line}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">See who it is for <ArrowRight size={17} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Button href="/services" variant="secondary" size="lg">All 11 services</Button></div>
        </Container>
      </section>

      {/* SERVICES INDEX — dark numbered list, distinct from tiles */}
      <section className="ct-section bg-[#0B1220] text-white">
        <Container>
          <Reveal><SectionHeading dark eyebrow="Service index" title="Every service, at a glance" subtitle="Prefer a list to pictures? Scan all eleven, then open the one that matches your goal." /></Reveal>
          <div className="mt-12 border-t border-white/15">
            {services.map((s, i) => (
              <Reveal key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex flex-col gap-2 border-b border-white/15 py-5 transition hover:bg-white/5 sm:flex-row sm:items-center sm:gap-6 sm:px-4">
                  <span className="w-12 shrink-0 font-display text-lg font-bold text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-xl font-bold text-white group-hover:text-[#A5B4FC] sm:text-2xl">{s.title}</span>
                  <span className="max-w-md text-sm text-white/60">{s.line}</span>
                  <ArrowUpRight size={20} className="shrink-0 text-[#2DD4BF] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* TECHNOLOGIES — marquee chips, not a card grid */}
      <section className="overflow-hidden bg-[#EEF2FF] py-12">
        <Container>
          <Reveal><p className="text-center text-xs font-bold uppercase tracking-widest text-[#64748B]">Built with modern, proven technology</p></Reveal>
        </Container>
        <div aria-hidden="true" className="ct-marquee-track mt-7 gap-4 px-4">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 rounded-full border border-[#E7E9F2] bg-white px-5 py-3 text-base font-bold text-[#0B1220] shadow-sm">
              <Layers size={16} className="text-[#4F46E5]" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* AI — dark panel + guide + chat cards */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B1220] via-[#171344] to-[#1E1B4B] px-6 py-10 text-white sm:px-10 sm:py-12">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="ct-hero-glow absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4F46E5]/40 blur-[90px]" />
                <div className="ct-hero-glow-slow absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#14B8A6]/25 blur-[80px]" />
              </div>
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <span className="ct-float flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-[#14B8A6]/20 text-[#14B8A6]"><Bot size={30} className="ct-sparkle" /></span>
                <div>
                  <span className="ct-eyebrow">AI in action</span>
                  <h2 className="ct-section-title mt-3 !text-white">AI that answers from your own data</h2>
                  <p className="mt-2 max-w-2xl text-lg text-white/70">Checked answers, not guesses — with a human handover whenever the AI is unsure.</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-10"><AiGuide /></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "RAG Agentic AI Assistant", text: "Answers checked against your own documents, graded before they are shown.", href: "/work/rag-ai-assistant" },
              { title: "AI for booking & healthcare", text: "Patients describe the problem first, then reach the right specialist.", href: "/work/telemedicine" },
              { title: "AI that answers customers", text: "Repeat questions answered instantly — a human steps in when unsure.", href: "/services/ai-solutions" },
            ].map((a) => (
              <Reveal key={a.title}>
                <Link href={a.href} className="group block h-full rounded-[24px] border border-[#E7E9F2] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#14B8A6]"><Bot size={22} className="ct-sparkle" /></span>
                  <h3 className="ct-h4 mt-4">{a.title}</h3>
                  <p className="mt-2 rounded-2xl rounded-tl-sm bg-[#F6F7FB] p-3 text-sm text-[#475569]">{a.text}</p>
                  <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">See it <ArrowRight size={17} /></p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* INDUSTRIES — overlay image cards */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Industries" title="Built for your industry" subtitle="Each industry links to work already delivered in that field." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.label} delay={(i % 3) * 0.06}>
                <Link href={ind.href} className="group relative block h-72 overflow-hidden rounded-[24px] shadow-md transition hover:shadow-xl">
                  <Image src={industryImages[ind.label] || "/images/work/work-hr.jpg"} alt={`${ind.label} — project visual, not a client screenshot`} width={800} height={520} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-xl font-bold !text-white">{ind.label}</h3>
                    <p className="mt-1 text-sm text-white/80">{ind.description}</p>
                    <p className="mt-3 flex items-center gap-1 font-semibold text-[#2DD4BF]">All {ind.label} work <ArrowRight size={16} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ENGAGEMENT MODELS — 3 columns, different accents */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Working together" title="Three ways to work with us" subtitle="Pick the model that fits your budget and timeline. All three include weekly demos." /></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {engagementModels.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-[24px] border border-[#E7E9F2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${m.accent} text-white`}><m.icon size={24} /></span>
                  <h3 className="ct-h4 mt-5">{m.title}</h3>
                  <p className="mt-2 text-[#475569]">{m.best}</p>
                  <ul className="mt-4 flex flex-1 flex-col gap-2">
                    {m.items.map((it) => (
                      <li key={it} className="flex gap-2 text-[#475569]"><Check size={18} className="mt-0.5 shrink-0 text-[#14B8A6]" />{it}</li>
                    ))}
                  </ul>
                  <Link href={m.href} className="mt-6 flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">{m.cta} <ArrowRight size={16} /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROJECTS — editorial rows */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Work" title="Work that changed how businesses run" subtitle="Problem, build, result — for every project. Images are project visuals, not client screenshots." /></Reveal>
          <div className="mt-14 flex flex-col gap-16 lg:gap-20">
            {projects.map((p, i) => {
              const live = verifiedLiveLinks[p.slug];
              const flip = i % 2 === 1;
              return (
                <Reveal key={p.slug}>
                  <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <Link href={`/work/${p.slug}`} className={`ct-editorial-img block ${flip ? "lg:order-2" : ""}`}>
                      <Image src={p.image} alt={p.imageAlt} width={1000} height={650} className="aspect-[3/2] w-full object-cover" />
                    </Link>
                    <div className={flip ? "lg:order-1" : ""}>
                      <span className="ct-eyebrow">{p.industryLabel} · Case study {i + 1} of {projects.length}</span>
                      <h3 className="ct-section-title mt-4">{p.title}</h3>
                      <p className="mt-3 text-xl text-[#475569]">{p.line}</p>
                      <p className="mt-4 text-[#475569]"><strong className="text-[#0B1220]">Problem:</strong> {p.problem}</p>
                      <ul className="mt-3 flex flex-col gap-2 text-[#475569]">
                        {p.built.slice(0, 2).map((b) => (
                          <li key={b} className="flex gap-2"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#14B8A6]" />{b}</li>
                        ))}
                      </ul>
                      <p className="mt-4 rounded-2xl bg-[#F6F7FB] p-4 text-[#0B1220] shadow-sm"><strong>Result:</strong> {p.result}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        <Button href={`/work/${p.slug}`}>Read the case study</Button>
                        {live ? (
                          <a href={live} target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">Visit the live site <ArrowUpRight size={17} /></a>
                        ) : (
                          <span className="text-sm text-[#64748B]">Live demo on request</span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-[#64748B]">{p.stack}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-12 text-center text-sm text-[#64748B]">Live-site note: Mejora Tu Dolor, Padel Connect and BookDubaiGuide link out to their live sites above. The HR portal link returned a 404 in a recent check and cliender.com now shows a different consultancy, so those two are not linked as live.</p>
          <div className="mt-6 text-center"><Button href="/work" variant="secondary" size="lg">See all work</Button></div>
        </Container>
      </section>

      {/* CLIENT JOURNEY — horizontal step strip, distinct from process */}
      <section className="ct-section bg-[#EEF2FF]">
        <Container>
          <Reveal><SectionHeading eyebrow="Your journey" title="From first call to launch, in five steps" subtitle="No surprises. You know the next step at every point." /></Reveal>
          <Reveal>
            <ol className="mt-12 flex flex-col gap-0 lg:flex-row">
              {journeySteps.map((s, i) => (
                <li key={s.n} className="relative flex-1 border-l-2 border-[#4F46E5]/20 py-6 pl-6 lg:border-l-0 lg:border-t-2 lg:py-0 lg:pl-0 lg:pr-6 lg:pt-6">
                  <span className="font-display text-3xl font-bold text-[#4F46E5]">{s.n}</span>
                  <h3 className="ct-h4 mt-2">{s.title}</h3>
                  <p className="mt-1 text-sm text-[#475569]">{s.text}</p>
                  {i < journeySteps.length - 1 && <ArrowRight size={18} className="absolute right-2 top-6 hidden text-[#14B8A6] lg:block" />}
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* WHY CHOOSE + PROCESS */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Why CraftThink" title="What you get, beyond the code" subtitle="Security, communication and support — the factors that decide whether a project succeeds." /></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <article className="h-full rounded-r-[24px] border-l-4 border-[#14B8A6] bg-[#F6F7FB] p-7">
                  <h3 className="ct-h4">{f.title}</h3>
                  <p className="mt-2 text-[#475569]">{f.text}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.12}>
              <article className="flex h-full flex-col justify-center rounded-[24px] bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-7 text-white shadow-xl">
                <h3 className="ct-h4 !text-white">Led by CEO {siteConfig.ceoName}</h3>
                <p className="mt-2 text-white/70">One point of contact, weekly progress, and direct answers — not a ticket queue.</p>
                <Link href="/about" className="mt-4 flex min-h-[48px] items-center gap-1 font-semibold text-[#14B8A6]">About the CEO <ArrowRight size={16} /></Link>
              </article>
            </Reveal>
          </div>
          <div className="mt-16">
            <Reveal><SectionHeading eyebrow="Process" title="How we build, step by step" subtitle="You approve the design before we build, and see progress every week." /></Reveal>
            <div className="relative mt-10">
              <div aria-hidden="true" className="absolute left-0 right-0 top-[52px] hidden h-0.5 bg-[#E7E9F2] lg:block" />
              <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {processSteps.map((s, i) => (
                  <Reveal key={s.n} delay={(i % 3) * 0.06}>
                    <li className="relative h-full p-7 pt-0">
                      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#4F46E5] font-display text-xl font-bold text-white shadow-lg ring-4 ring-white">{s.n}</span>
                      <h3 className="ct-h4 mt-5">{s.title}</h3>
                      <p className="mt-2 text-[#475569]">{s.text}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
            <div className="mt-8 text-center"><Button href="/process" variant="secondary" size="lg">Full process & facilities</Button></div>
          </div>
        </Container>
      </section>

      {/* SUCCESS PRACTICES — numbered list */}
      <section className="ct-section bg-[#EEF2FF]">
        <Container>
          <Reveal><SectionHeading eyebrow="Delivery standards" title="Eight practices that keep projects on track" subtitle="Agreed in writing, checked weekly, measured by business results." /></Reveal>
          <div className="mt-12 flex flex-col divide-y divide-[#E7E9F2] border-y border-[#E7E9F2]">
            {successPractices.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.05}>
                <article className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-8">
                  <span className="w-20 shrink-0 font-display text-5xl font-bold text-[#4F46E5]/30">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <h3 className="ct-h4">{p.title}</h3>
                    <p className="mt-1 text-[#475569]">{p.text}</p>
                  </div>
                  <Link href={p.href} className="flex min-h-[48px] shrink-0 items-center gap-1 font-semibold text-[#4F46E5]">{p.cta} <ArrowRight size={16} /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ TEASER — split layout, accordion preview */}
      <section className="ct-section bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <span className="ct-eyebrow">Questions</span>
                <h2 className="ct-section-title mt-4">Answers before you ask</h2>
                <p className="mt-3 text-lg text-[#475569]">Cost, timelines, remote work, and what happens after launch — answered directly.</p>
                <div className="mt-6"><Button href="/faq" variant="secondary">All FAQs</Button></div>
              </div>
            </Reveal>
            <div className="flex flex-col gap-4">
              {faqs.slice(0, 4).map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className="ct-card group p-6" open={i === 0}>
                    <summary className="cursor-pointer list-none text-base font-semibold [&::-webkit-details-marker]:hidden"><span className="flex items-center justify-between gap-4">{f.q}<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#4F46E5]">+</span></span></summary>
                    <p className="mt-3 text-[#475569]">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* INSIGHTS / GUIDES — wide tinted rows, not cards */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Start here" title="Three tools, before you spend anything" subtitle="Get a direction, a range, or a diagnosis — free, in minutes." /></Reveal>
          <div className="mt-12 flex flex-col gap-4">
            {[
              { n: "01", bg: "bg-[#EEF2FF]", title: "Ask the AI Guide", text: "Describe your problem. Get the matching service and a similar project.", href: "/guide", cta: "Open the guide" },
              { n: "02", bg: "bg-[#F0FDFA]", title: "Get an Estimate", text: "A rough cost range and timeline for your project — labelled as an estimate.", href: "/estimate", cta: "Estimate my project" },
              { n: "03", bg: "bg-white", title: "Free Software Audit", text: "Tell us what is slow or broken. Get the top fixes, ranked by impact.", href: "/audit", cta: "Start the audit" },
            ].map((g) => (
              <Reveal key={g.n}>
                <Link href={g.href} className={`group flex flex-col gap-3 rounded-[24px] border border-[#E7E9F2] ${g.bg} p-6 transition hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-8`}>
                  <span className="font-display text-4xl font-bold text-[#4F46E5]/30">{g.n}</span>
                  <span className="flex-1">
                    <span className="ct-h4 block">{g.title}</span>
                    <span className="mt-1 block text-[#475569]">{g.text}</span>
                  </span>
                  <span className="flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">{g.cta} <ArrowRight size={16} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CEO STRIP */}
      <section className="ct-section bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="ct-eyebrow">Led by the CEO</span>
              <h2 className="ct-section-title mt-4">Talk to the person leading your project</h2>
              <p className="mt-3 text-lg text-[#475569]">CraftThink is led by CEO {siteConfig.ceoName}, with a development team behind him. One contact, weekly progress, direct answers.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/about" variant="secondary">About the CEO</Button>
                <Button href="/contact">Book a Free Consultation</Button>
              </div>
            </div>
            <div className="relative">
              <Image src="/images/hero/hero-team.jpg" alt="A software team working together — project visual, not a client photo" width={800} height={520} className="h-full min-h-[280px] w-full rounded-[24px] object-cover shadow-xl" />
              <div className="absolute -bottom-6 left-4 rounded-[20px] border border-[#E7E9F2] bg-white p-5 shadow-xl sm:left-8">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-[#0B1220]"><span className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]" /> {siteConfig.ceoName}</p>
                <p className="mt-1 text-sm font-semibold text-[#4F46E5]">CEO & Founder, CraftThink</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-[#64748B]"><Globe size={14} className="text-[#4F46E5]" /> Working remotely with clients worldwide</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
