import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/** Final CTA band: WHITE (colour swap — the footer now takes the
    dark navy). Dark navy text, solid indigo primary button, light
    top border so a white banner never merges with a white section
    above it. ONE action: plain link to /consultation. No gradient,
    no glow. The right side carries only a light inline brand motif
    (indigo path + teal dot), not a heavy raster image, so pages
    stay fast. */
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
            <div className="rounded-[24px] border border-[#E7E9F2] bg-[#F6F7FB] p-6 shadow-xl">
              <svg aria-hidden="true" viewBox="0 0 400 260" className="h-auto w-full" fill="none">
                <rect x="20" y="30" width="360" height="200" rx="20" fill="#FFFFFF" stroke="#E7E9F2" strokeWidth="2" />
                <path d="M60 190 C140 120 220 220 340 90" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 12" />
                <circle cx="340" cy="90" r="10" fill="#14B8A6" />
                <rect x="60" y="60" width="130" height="18" rx="9" fill="#4F46E5" />
                <rect x="60" y="90" width="90" height="14" rx="7" fill="#C7D2FE" />
                <rect x="240" y="160" width="100" height="36" rx="18" fill="#4F46E5" />
              </svg>
              <p className="mt-4 text-center text-sm font-semibold text-[#475569]">From first call to launch — guided all the way.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
