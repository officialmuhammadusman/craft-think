import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects, processSteps, facilities, services } from "@/data/content";
import { industries, successPractices, verifiedLiveLinks } from "@/data/offering";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AiGuide } from "@/components/ai/AiGuide";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/home/HeroVisual";
import { HeroCtas } from "@/components/home/HeroCtas";

export const metadata: Metadata = {
  title: "CraftThink — Software, built with thought, guided by AI",
  description: siteConfig.description,
};

/** Industry -> project image, so every industry card carries a real photo. */
const industryImages: Record<string, string> = {
  "Healthcare": "/images/work/work-telemedicine.jpg",
  "Finance & Business": "/images/work/work-cliender.jpg",
  "HR & Staff": "/images/work/work-hr.jpg",
  "Sports & Clubs": "/images/work/work-padel.jpg",
  "SaaS & Digital Products": "/images/work/work-ai.jpg",
  "Travel & Tourism": "/images/work/work-dubai.jpg",
};

const marqueeItems = [
  "11 services", "6 case studies", "6 process steps", "Remote clients worldwide",
  "CEO-led", "Websites, apps, CRM, booking & AI", "Free consultation", "Plain language, no jargon",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO: full-bleed, layered visual, animated glows ── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#14113F] to-[#1E1B4B]">
        <div aria-hidden="true" className="ct-hero-grid absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="ct-hero-glow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#4F46E5]/25 blur-[120px]" />
          <div className="ct-hero-glow-slow absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#14B8A6]/15 blur-[110px]" />
        </div>
        <Container width="wide">
          <div className="relative z-10 grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col items-start gap-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> A guided software house · Working remotely with clients worldwide
              </span>
              <h1 id="hero-heading" className="ct-display-xl !text-white">
                Software, built with thought, <span className="text-[#818CF8]">guided by AI</span>
              </h1>
              <p className="ct-body-lg max-w-xl text-white/70">
                We build websites, apps, business systems and AI assistants — and we guide you to the right solution, in plain language, before you pay anything.
              </p>
              <HeroCtas />
              <p className="flex items-center gap-2 text-sm text-white/50"><ShieldCheck size={16} className="text-[#14B8A6]" /> No fake testimonials, no invented clients — real projects, plain language.</p>
            </div>
            <div className="pb-10 pt-2 lg:pb-2">
              <HeroVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* ── TRUST MARQUEE: real facts only, no fake logos ── */}
      <div aria-hidden="true" className="overflow-hidden border-b border-[#E7E9F2] bg-white py-4">
        <div className="ct-marquee-track gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-3 text-base font-bold uppercase tracking-widest text-[#0B1220]">
              <Sparkles size={15} className="text-[#14B8A6]" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── KEY FACTS: dark navy band, oversized numbers ── */}
      <section className="bg-[#0B1220] py-14 text-white">
        <Container>
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-white/50">Key facts — what CraftThink actually offers</p>
          <ul className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "11", label: "Services", note: "Websites, apps, CRM, booking, AI and more" },
              { n: "6", label: "Case studies", note: "HR, AI, healthcare, SaaS, sports and travel" },
              { n: "6", label: "Process steps", note: "Discover → Design → Build → Test → Launch → Support" },
              { n: "Worldwide", label: "Remote clients", note: "CEO-led, one shareable link, from Fiverr, Upwork and email" },
            ].map((s) => (
              <li key={s.label} className="border-l-2 border-[#4F46E5] pl-5 text-left sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-5 sm:text-center">
                <p className="font-display text-5xl font-bold text-white">{s.n}</p>
                <p className="mt-1 text-base font-semibold text-[#818CF8]">{s.label}</p>
                <p className="mt-1 text-sm leading-snug text-white/60">{s.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── SERVICES: large image tiles, not small text boxes ── */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Explore our offering" title="Every service, in plain language" subtitle="Start with your problem, not with technical jargon. Tap any service to see who it is for, what you get, and a similar project." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`/services/${s.slug}`} className="ct-tile group block h-full">
                  <div className="relative overflow-hidden">
                    <Image src={s.image} alt={s.imageAlt} width={800} height={520} className="h-52 w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">Service</span>
                  </div>
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

      {/* ── AI IN ACTION: dark gradient panel + interactive guide ── */}
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
                  <h2 className="ct-section-title mt-3 !text-white">Ask our AI guide — in plain language</h2>
                  <p className="mt-2 max-w-2xl text-lg text-white/70">A guided demo that answers only from this site&apos;s own services, projects and FAQs — and hands you to a free consultation when it does not know.</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-10"><AiGuide /></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "RAG Agentic AI Assistant", text: "Answers checked against a business's own documents, not guessed.", href: "/work/rag-ai-assistant", img: "/images/work/work-ai.jpg", alt: "Abstract visualisation of an AI assistant at work" },
              { title: "AI for booking & healthcare", text: "Patients describe their problem first and are routed to the right specialist.", href: "/work/telemedicine", img: "/images/work/work-telemedicine.jpg", alt: "A doctor consulting a patient on a tablet" },
              { title: "AI that answers customers", text: "Same questions, answered instantly — with a human handover when unsure.", href: "/services/ai-solutions", img: "/images/services/service-ai.jpg", alt: "Abstract visualisation of artificial intelligence" },
            ].map((a) => (
              <Reveal key={a.title}>
                <Link href={a.href} className="ct-tile group block h-full">
                  <div className="relative overflow-hidden">
                    <Image src={a.img} alt={a.alt} width={800} height={520} className="h-44 w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">AI in action</span>
                  </div>
                  <div className="p-6">
                    <h3 className="ct-h4">{a.title}</h3>
                    <p className="mt-2 text-[#475569]">{a.text}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">See it <ArrowRight size={17} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INDUSTRY EXPERTISE: image cards ── */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Industry expertise" title="Built for your kind of business" subtitle="Each industry links to real work in that industry — not to a generic service list." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.label} delay={(i % 3) * 0.06}>
                <Link href={ind.href} className="ct-tile group block h-full">
                  <div className="relative overflow-hidden">
                    <Image src={industryImages[ind.label] || "/images/work/work-hr.jpg"} alt={`${ind.label} — project visual, not a client screenshot`} width={800} height={520} className="h-48 w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{ind.label}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="ct-h4">{ind.label}</h3>
                    <p className="mt-2 text-[#475569]">{ind.description}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">All {ind.label} work <ArrowRight size={17} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURED PROJECTS: alternating editorial rows ── */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Featured projects" title="Real projects, real business results" subtitle="Problem → what we built → what changed for the business, in plain words. Photos are project visuals, not client screenshots." /></Reveal>
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
                      <p className="mt-4 rounded-2xl bg-white p-4 text-[#0B1220] shadow-sm"><strong>Result:</strong> {p.result}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        <Button href={`/work/${p.slug}`}>Read the case study</Button>
                        {live ? (
                          <a href={live} target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">Visit the live site <ArrowUpRight size={17} /></a>
                        ) : (
                          <span className="text-sm text-[#64748B]">Live demo on request</span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-[#64748B]">{p.stack} · Project visual, not a client screenshot.</p>
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

      {/* ── WHY CHOOSE + PROCESS ── */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Why choose CraftThink" title="What clients actually get" subtitle="Process, security, communication and support — the things that decide whether a project succeeds, in plain words." /></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <article className="ct-tile h-full p-7">
                  <span className="mb-4 block h-1.5 w-12 rounded-full bg-[#4F46E5]" />
                  <h3 className="ct-h4">{f.title}</h3>
                  <p className="mt-2 text-[#475569]">{f.text}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.12}>
              <article className="flex h-full flex-col justify-center rounded-[24px] bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-7 text-white shadow-xl">
                <h3 className="ct-h4 !text-white">Led by CEO {siteConfig.ceoName}</h3>
                <p className="mt-2 text-white/70">One clear point of contact, weekly progress, and plain-language answers — not a ticket queue. The team behind the CEO builds design, frontend, backend and mobile apps.</p>
                <Link href="/about" className="mt-4 flex min-h-[48px] items-center gap-1 font-semibold text-[#14B8A6]">About the CEO <ArrowRight size={16} /></Link>
              </article>
            </Reveal>
          </div>
          <div className="mt-16">
            <Reveal><SectionHeading eyebrow="Process" title="How we work, step by step" subtitle="You approve the design before we build, and you see progress every week." /></Reveal>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((s, i) => (
                <Reveal key={s.n} delay={(i % 3) * 0.06}>
                  <li className="ct-tile relative h-full p-7">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4F46E5] font-display text-xl font-bold text-white shadow-lg">{s.n}</span>
                    <h3 className="ct-h4 mt-5">{s.title}</h3>
                    <p className="mt-2 text-[#475569]">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8 text-center"><Button href="/process" variant="secondary" size="lg">Full process & facilities</Button></div>
          </div>
        </Container>
      </section>

      {/* ── SECURE THE SUCCESS: numbered practices ── */}
      <section className="ct-section bg-[#EEF2FF]">
        <Container>
          <Reveal><SectionHeading eyebrow="Secure the success of your project" title="Eight practices that keep your project on track" subtitle="Agreed in writing, checked weekly, and measured in business results." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {successPractices.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.05}>
                <article className="ct-tile flex h-full flex-col p-6">
                  <span className="font-display text-4xl font-bold text-[#4F46E5]/25">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="ct-h4 mt-3">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[#475569]">{p.text}</p>
                  <Link href={p.href} className="mt-4 flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">{p.cta} <ArrowRight size={16} /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CEO STRIP ── */}
      <section className="ct-section bg-white">
        <Container>
          <div className="ct-tile grid gap-8 overflow-hidden p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="ct-eyebrow">Led by the CEO</span>
              <h2 className="ct-section-title mt-4">A software house you can actually talk to</h2>
              <p className="mt-3 text-lg text-[#475569]">CraftThink is led by CEO {siteConfig.ceoName}, with a development team behind him. You get one clear point of contact, weekly progress, and plain-language answers — not a ticket queue.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/about" variant="secondary">About the CEO</Button>
                <Button href="/contact">Book a Free Consultation</Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[24px]">
              <Image src="/images/hero/hero-team.jpg" alt="A software team working together — project visual, not a client photo" width={800} height={520} className="h-full min-h-[220px] w-full object-cover" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#0B1220]"><Globe size={16} className="text-[#4F46E5]" /> Working remotely with clients worldwide</span>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
