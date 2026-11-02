/**
 * page.tsx — Home page shell.
 * Temporary placeholder only — full hero, services, work, and AI sections come in later prompts.
 * No fake content, no lorem ipsum, no invented testimonials.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `${siteConfig.agencyName} — Software, built with thought, guided by AI`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      {/* ── Temporary hero placeholder ─── */}
      {/* Full hero section with dark gradient, headline, and AI guide comes in Prompt 2 */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] px-4"
      >
        {/* Subtle indigo glow — decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#4F46E5] opacity-10 blur-[120px]" />
        </div>

        <Container>
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            {/* Eyebrow */}
            <span className="text-sm font-semibold uppercase tracking-widest text-[#14B8A6]">
              Step 1 complete — shell is live
            </span>

            {/* Main heading */}
            <h1
              id="hero-heading"
              className="ct-h1 text-white max-w-3xl"
            >
              {siteConfig.agencyName}
            </h1>

            <p className="ct-body-lg max-w-xl text-white/70">
              Software, built with thought, guided by AI.{" "}
              <span className="text-white font-medium">
                Led by CEO {siteConfig.ceoName}.
              </span>
            </p>

            <p className="text-sm text-white/50 italic">
              {siteConfig.tagline}
            </p>

            {/* Setup status card */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm text-left max-w-lg w-full">
              <p className="text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-3">
                Setup complete — sections coming next
              </p>
              <ul className="flex flex-col gap-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Project scaffolded — Next.js 16 + Tailwind v4
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Design tokens — CraftThink brand colours loaded
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Fonts — Sora (headings) + Inter (body)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Header — sticky, transparent, mega menu, mobile
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Footer — 4 columns, copyright, contact
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Mobile sticky CTA — Book + Estimate
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16A34A]">✓</span> Lenis smooth scroll + Framer Motion ready
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white/40">○</span> <span className="text-white/40">Hero, services, work sections — Prompt 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white/40">○</span> <span className="text-white/40">AI chat guide + estimator — Prompt 3</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <Button href="/contact" size="lg" id="hero-book-consultation">
                Book a Free Consultation
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                See Our Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Placeholder for sections coming in Prompt 2 ─── */}
      <section aria-label="Coming soon sections" className="ct-section bg-[#F6F7FB]">
        <Container>
          <SectionHeading
            title="Full site sections coming in Prompt 2"
            eyebrow="Up Next"
            subtitle="Hero with AI guide, services grid, featured projects, process timeline, and the booking flow."
            align="center"
          />
        </Container>
      </section>
    </>
  );
}
