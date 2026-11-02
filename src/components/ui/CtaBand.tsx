import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/** Final CTA band: WHITE (colour swap — the footer now takes the
    dark navy). Dark navy text, solid indigo primary button, light
    top border so a white banner never merges with a white section
    above it. ONE action: plain link to /consultation. No gradient,
    no glow. */
export function CtaBand({ title = "Not sure where to start?", text = "Book a free consultation. We will understand your problem, show you a similar project, and give you a clear next step — with no obligation." }: { title?: string; text?: string }) {
  return (
    <section className="border-t border-[#E7E9F2] bg-white py-16 text-[#0B1220] sm:py-20">
      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col items-start gap-5 text-left">
            <span className="rounded-full border border-[#E7E9F2] bg-[#EEF2FF] px-4 py-1.5 text-sm font-semibold text-[#4F46E5]">Free consultation · No obligation</span>
            <h2 className="ct-h2 max-w-2xl">{title}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-[#475569]">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" href="/consultation">Book a Free Consultation</Button>
            </div>
            <p className="flex flex-wrap gap-2 break-words text-sm text-[#64748B]">{siteConfig.email} · {siteConfig.phone} · {siteConfig.tagline}</p>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-[24px] border border-[#E7E9F2] shadow-2xl">
              <Image src="/images/brand/hero-abstract.png" alt="CraftThink brand abstract" width={900} height={600} className="w-full rounded-[23px] object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
