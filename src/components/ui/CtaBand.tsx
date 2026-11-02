import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/** Dark final CTA band, reused on every main page. */
export function CtaBand({ title = "Not sure where to start?", text = "Book a free consultation. We will understand your problem, show you a similar project, and give you a clear next step — with no obligation." }: { title?: string; text?: string }) {
  return (
    <section className="bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] py-16">
      <Container>
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="ct-h2 !text-white max-w-2xl">{title}</h2>
          <p className="max-w-xl text-lg text-white/70">{text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">Book a Free Consultation</Button>
            <Button href="/estimate" size="lg" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Get an Estimate</Button>
          </div>
          <p className="text-sm text-white/50">{siteConfig.email} · {siteConfig.phone} · {siteConfig.tagline}</p>
        </div>
      </Container>
    </section>
  );
}
