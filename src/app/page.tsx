import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services, projects, processSteps } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AiGuide } from "@/components/ai/AiGuide";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "CraftThink — Software, built with thought, guided by AI",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero — dark gradient, search routes to the AI guide */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#0B1220] to-[#1E1B4B]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F46E5] opacity-10 blur-[120px]" />
        </div>
        <Container>
          <div className="relative z-10 grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col items-start gap-6 text-left">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#14B8A6]">Led by CEO {siteConfig.ceoName} · {siteConfig.tagline}</span>
              <h1 id="hero-heading" className="ct-display !text-white">Software, built with thought, guided by AI</h1>
              <p className="ct-body-lg max-w-xl text-white/70">We build websites, apps, business systems and AI assistants for businesses worldwide — and we guide you to the right solution, in plain language, before you pay anything.</p>
              <form action="/guide" method="get" className="flex w-full max-w-xl gap-2 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
                <label className="sr-only" htmlFor="hero-search">What do you need help with?</label>
                <input id="hero-search" name="q" placeholder="What do you need help with?" className="min-h-[48px] flex-1 rounded-full bg-transparent px-4 text-base text-white placeholder:text-white/50 outline-none" />
                <Button type="submit">Ask AI →</Button>
              </form>
              <p className="text-sm text-white/50">Try: “my website is slow” · “I need an app” · “I need AI to answer customers”</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" size="lg">Book a Free Consultation</Button>
                <Button href="/services" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">See Our Services</Button>
              </div>
            </div>
            <div className="relative">
              <Image src="/images/hero/hero-dashboard.jpg" alt="A business dashboard on a laptop, showing charts and results" width={1200} height={800} priority className="w-full rounded-3xl border border-white/20 shadow-2xl" />
              <p className="mt-2 text-center text-sm text-white/50">Placeholder photo — replace with designer images later. It is not a real client site.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip — no fake logos, no invented numbers */}
      <section className="border-b border-[#E7E9F2] bg-white py-8">
        <Container>
          <ul className="grid gap-4 text-center sm:grid-cols-3">
            <li><p className="font-semibold">Working remotely with clients worldwide</p><p className="text-sm text-[#475569]">Fiverr, Upwork and cold-email clients, served from one shareable link.</p></li>
            <li><p className="font-semibold">CEO-led, team-built</p><p className="text-sm text-[#475569]">Led by CEO Muhammad Usman, with a development team behind him.</p></li>
            <li><p className="font-semibold">Plain language, real projects</p><p className="text-sm text-[#475569]">No jargon, no fake testimonials, no invented clients — just real work.</p></li>
          </ul>
        </Container>
      </section>

      {/* Services grid */}
      <section className="ct-section bg-[#F6F7FB]">
        <Container>
          <SectionHeading eyebrow="Services" title="What can we build for you?" subtitle="In plain language first. Technical detail is inside each page, only if you want it." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm transition hover:border-[#4F46E5] hover:shadow-md">
                <h3 className="ct-h4">{s.title}</h3>
                <p className="mt-2 text-[#475569]">{s.line}</p>
                <p className="mt-3 text-sm font-semibold text-[#4F46E5]">Learn more →</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center"><Button href="/services" variant="secondary">All services</Button></div>
        </Container>
      </section>

      {/* Featured work */}
      <section className="ct-section bg-white">
        <Container>
          <SectionHeading eyebrow="Featured Work" title="Real projects, real business results" subtitle="Problem → what we built → what changed for the business, in plain words." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="overflow-hidden rounded-2xl border border-[#E7E9F2] bg-white shadow-sm transition hover:border-[#4F46E5] hover:shadow-md">
                <Image src={p.image} alt={p.imageAlt} width={800} height={520} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">{p.industryLabel}</p>
                  <h3 className="ct-h4 mt-1">{p.title}</h3>
                  <p className="mt-2 text-[#475569]">{p.line}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center"><Button href="/work" variant="secondary">See all work</Button></div>
        </Container>
      </section>

      {/* AI guide teaser */}
      <section id="ai-guide" className="ct-section bg-[#F6F7FB]">
        <Container width="narrow">
          <SectionHeading eyebrow="AI Guide" aiAccent title="Ask our AI guide — in plain language" subtitle="A guided demo that answers only from this site's own services, projects and FAQs." />
          <div className="mt-10"><AiGuide /></div>
        </Container>
      </section>

      {/* Process preview */}
      <section className="ct-section bg-white">
        <Container>
          <SectionHeading eyebrow="Process" title="How we work, step by step" subtitle="No surprises. You approve the design before we build, and you see progress every week." />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-6">
                <p className="text-2xl font-bold text-[#4F46E5]">{s.n}.</p>
                <h3 className="ct-h4 mt-2">{s.title}</h3>
                <p className="mt-2 text-[#475569]">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center"><Button href="/process" variant="secondary">Full process & facilities</Button></div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
