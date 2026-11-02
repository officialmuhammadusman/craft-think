import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Search, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services, projects, processSteps } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AiGuide } from "@/components/ai/AiGuide";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMockup } from "@/components/home/DashboardMockup";

export const metadata: Metadata = {
  title: "CraftThink — Software, built with thought, guided by AI",
  description: siteConfig.description,
};

export default function HomePage() {
  const featured = projects[0];
  const rest = projects.slice(1);
  return (
    <>
      {/* ── PREMIUM HERO: dark gradient, grid, glow, dashboard mockup ── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#14113F] to-[#1E1B4B]">
        <div aria-hidden="true" className="ct-hero-grid absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#4F46E5]/25 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#14B8A6]/15 blur-[110px]" />
        </div>
        <Container width="wide">
          <div className="relative z-10 grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col items-start gap-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> A guided software house · Working remotely with clients worldwide
              </span>
              <h1 id="hero-heading" className="ct-display !text-white">
                Software, built with thought, <span className="text-[#818CF8]">guided by AI</span>
              </h1>
              <p className="ct-body-lg max-w-xl text-white/70">
                We build websites, apps, business systems and AI assistants — and we guide you to the right solution, in plain language, before you pay anything.
              </p>
              <form action="/guide" method="get" className="flex w-full max-w-xl flex-col gap-2 rounded-[24px] border border-white/20 bg-white/10 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full">
                <label className="sr-only" htmlFor="hero-search">What do you need help with?</label>
                <Search size={19} className="ml-3 hidden shrink-0 text-white/50 sm:block" />
                <input id="hero-search" name="q" placeholder="What do you need help with?" className="min-h-[48px] w-full flex-1 rounded-full bg-transparent px-4 text-base text-white outline-none placeholder:text-white/50" />
                <Button type="submit" className="shrink-0">Ask AI <ArrowRight size={17} /></Button>
              </form>
              <p className="text-sm text-white/50">Try: “my website is slow” · “I need an app” · “I need AI to answer customers”</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" size="lg">Book a Free Consultation</Button>
                <Button href="/services" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">See Our Services</Button>
              </div>
              <p className="flex items-center gap-2 text-sm text-white/50"><ShieldCheck size={16} className="text-[#14B8A6]" /> No fake testimonials, no invented clients — real projects, plain language.</p>
            </div>
            <div className="pb-8 pt-2 lg:pb-2">
              <DashboardMockup />
            </div>
          </div>
        </Container>
      </section>

      {/* ── TRUST STRIP: only real, countable facts from this site ── */}
      <section className="border-b border-[#E7E9F2] bg-white py-10">
        <Container>
          <ul className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "11", label: "Services", note: "Websites, apps, CRM, booking, AI and more" },
              { n: "5", label: "Case studies", note: "HR, AI, healthcare, SaaS and sports" },
              { n: "6", label: "Process steps", note: "Discover → Design → Build → Test → Launch → Support" },
              { n: "Worldwide", label: "Remote clients", note: "One shareable link, from Fiverr, Upwork and email" },
            ].map((s) => (
              <li key={s.label} className="rounded-[24px] border border-[#E7E9F2] bg-[#F6F7FB] px-5 py-6">
                <p className="font-display text-3xl font-bold text-[#0B1220]">{s.n}</p>
                <p className="mt-1 text-base font-semibold text-[#4F46E5]">{s.label}</p>
                <p className="mt-1 text-sm leading-snug text-[#475569]">{s.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── SERVICES: large image cards, hover lift, outcome first ── */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <Reveal><SectionHeading eyebrow="Services" title="What can we build for you?" subtitle="In plain language first. Technical detail is inside each page, only if you want it." /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link href={`/services/${s.slug}`} className="ct-card group block overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image src={s.image} alt={s.imageAlt} width={800} height={520} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">Service</span>
                  </div>
                  <div className="p-6">
                    <h3 className="ct-h4">{s.title}</h3>
                    <p className="mt-2 text-[#475569]">{s.line}</p>
                    <p className="mt-3 text-sm text-[#64748B]">For: {s.forWhom}</p>
                    <p className="mt-4 flex items-center gap-1 text-base font-semibold text-[#4F46E5]">Learn more <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Button href="/services" variant="secondary" size="lg">All services</Button></div>
        </Container>
      </section>

      {/* ── WORK: featured case + grid ── */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Featured Work" title="Real projects, real business results" subtitle="Problem → what we built → what changed for the business, in plain words." /></Reveal>
          <Reveal className="mt-12">
            <Link href={`/work/${featured.slug}`} className="ct-card group grid overflow-hidden lg:grid-cols-2">
              <div className="relative overflow-hidden">
                <Image src={featured.image} alt={featured.imageAlt} width={1000} height={650} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{featured.industryLabel} · Featured</span>
              </div>
              <div className="flex flex-col justify-center gap-3 p-7 sm:p-9">
                <h3 className="ct-h3">{featured.title}</h3>
                <p className="text-lg text-[#475569]">{featured.line}</p>
                <p className="text-[#475569]"><strong className="text-[#0B1220]">Problem:</strong> {featured.problem}</p>
                <p className="rounded-2xl bg-[#F6F7FB] p-4 text-[#0B1220]"><strong>Result:</strong> {featured.result}</p>
                <p className="flex items-center gap-1 font-semibold text-[#4F46E5]">Read the case study <ArrowRight size={17} /></p>
              </div>
            </Link>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={`/work/${p.slug}`} className="ct-card group block overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="ct-h4">{p.title}</h3>
                    <p className="mt-2 text-[#475569]">{p.line}</p>
                    <p className="mt-3 text-sm text-[#64748B]">{p.stack}</p>
                    <p className="mt-4 flex items-center gap-1 font-semibold text-[#4F46E5]">Read the case study <ArrowRight size={17} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Button href="/work" variant="secondary" size="lg">See all work</Button></div>
        </Container>
      </section>

      {/* ── AI GUIDE: premium dark panel wrapper ── */}
      <section id="ai-guide" className="ct-section bg-[#F6F7FB]">
        <Container width="narrow">
          <Reveal><SectionHeading eyebrow="AI Guide" aiAccent title="Ask our AI guide — in plain language" subtitle="A guided demo that answers only from this site's own services, projects and FAQs." /></Reveal>
          <Reveal className="mt-10"><AiGuide /></Reveal>
        </Container>
      </section>

      {/* ── PROCESS: numbered timeline, not a plain list ── */}
      <section className="ct-section bg-white">
        <Container>
          <Reveal><SectionHeading eyebrow="Process" title="How we work, step by step" subtitle="No surprises. You approve the design before we build, and you see progress every week." /></Reveal>
          <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <span aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-px bg-[#E7E9F2] lg:block" />
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <li className="ct-card relative h-full p-6">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4F46E5] font-display text-xl font-bold text-white shadow-lg">{s.n}</span>
                  <h3 className="ct-h4 mt-5">{s.title}</h3>
                  <p className="mt-2 text-[#475569]">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 text-center"><Button href="/process" variant="secondary" size="lg">Full process & facilities</Button></div>
        </Container>
      </section>

      {/* ── WHY / CEO STRIP ── */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <div className="ct-card grid gap-8 overflow-hidden p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">Led by the CEO</span>
              <h2 className="ct-h2 mt-4">A software house you can actually talk to</h2>
              <p className="mt-3 text-lg text-[#475569]">CraftThink is led by CEO {siteConfig.ceoName}, with a development team behind him. You get one clear point of contact, weekly progress, and plain-language answers — not a ticket queue.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/about" variant="secondary">About the CEO</Button>
                <Button href="/contact">Book a Free Consultation</Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[24px]">
              <Image src="/images/brand/about-workspace-abstract.jpg" alt="A developer workspace with a laptop and notebook" width={800} height={520} className="h-full min-h-[220px] w-full object-cover" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#0B1220]"><Globe size={16} className="text-[#4F46E5]" /> Working remotely with clients worldwide</span>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
