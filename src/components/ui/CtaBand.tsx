"use client";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useOverlays } from "@/components/layout/Overlays";
import { siteConfig } from "@/config/site";

/** Premium dark final CTA: gradient, glow, brand abstract, real counts only.
    "Book a Free Consultation" opens the consultation slide-over panel. */
export function CtaBand({ title = "Not sure where to start?", text = "Book a free consultation. We will understand your problem, show you a similar project, and give you a clear next step — with no obligation." }: { title?: string; text?: string }) {
  const { openConsult } = useOverlays();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#171344] to-[#1E1B4B] py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4F46E5]/30 blur-[100px]" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#14B8A6]/20 blur-[100px]" />
      </div>
      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col items-start gap-5 text-left">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#14B8A6]">Free consultation · No obligation</span>
            <h2 className="ct-h2 !text-white max-w-2xl">{title}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={openConsult}>Book a Free Consultation</Button>
              <Button href="/estimate" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Get an Estimate</Button>
            </div>
            <p className="text-sm text-white/50">{siteConfig.email} · {siteConfig.phone} · {siteConfig.tagline}</p>
          </div>
          <div className="relative hidden lg:block">
            <Image src="/images/brand/hero-abstract.png" alt="CraftThink brand abstract — indigo and teal shapes" width={900} height={600} className="w-full rounded-[24px] border border-white/20 object-cover shadow-2xl" />
            <div className="absolute -bottom-4 left-4 flex gap-6 rounded-2xl border border-white/20 bg-white px-5 py-4 shadow-xl">
              <span><span className="block text-xl font-bold text-[#0B1220]">11</span><span className="text-xs text-[#64748B]">Services</span></span>
              <span><span className="block text-xl font-bold text-[#0B1220]">6</span><span className="text-xs text-[#64748B]">Projects</span></span>
              <span><span className="block text-xl font-bold text-[#0B1220]">6</span><span className="text-xs text-[#64748B]">Process steps</span></span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
