"use client";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useOverlays } from "@/components/layout/Overlays";
import { siteConfig } from "@/config/site";

/** Dark final CTA band: solid #0B1220, ONE action only.
    "Book a Free Consultation" opens the consultation slide-over panel.
    No gradient, no glow, no animated motif. */
export function CtaBand({ title = "Not sure where to start?", text = "Book a free consultation. We will understand your problem, show you a similar project, and give you a clear next step — with no obligation." }: { title?: string; text?: string }) {
  const { openConsult } = useOverlays();
  return (
    <section className="bg-[#0B1220] py-16 sm:py-20">
      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col items-start gap-5 text-left">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">Free consultation · No obligation</span>
            <h2 className="ct-h2 !text-white max-w-2xl">{title}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={openConsult}>Book a Free Consultation</Button>
            </div>
            <p className="text-sm text-white/50">{siteConfig.email} · {siteConfig.phone} · {siteConfig.tagline}</p>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-[24px] border border-white/20 shadow-2xl">
              <Image src="/images/brand/hero-abstract.png" alt="CraftThink brand abstract" width={900} height={600} className="w-full rounded-[23px] object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
