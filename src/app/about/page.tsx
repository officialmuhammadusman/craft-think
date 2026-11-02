import type { Metadata } from "next";
import Image from "next/image";
import { Globe, Mail, GraduationCap, Code2, Bot, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "About", description: "Muhammad Usman, CEO & Founder of CraftThink — Full Stack and Applied AI Engineer, working remotely with clients worldwide." };

const stack = ["TypeScript", "Next.js", "React", "React Native", "Node.js", "NestJS", "Express.js", "PostgreSQL", "Prisma", "Supabase"];
const aiStack = ["LangChain", "LangGraph", "Corrective RAG", "Self-RAG", "Multi-agent systems", "OpenAI API", "Gemini API", "Pinecone", "ChromaDB"];

export default function AboutPage() {
  return (
    <>
      <section className="ct-section">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <span className="ct-eyebrow">About</span>
              <h1 className="ct-h1 mt-4">Muhammad Usman</h1>
              <p className="ct-body-lg mt-3 text-[#475569]">CEO & Founder, CraftThink — Full Stack and Applied AI Engineer, 2+ years.</p>
              <p className="mt-6 text-lg leading-relaxed text-[#475569]">
                CraftThink is led by CEO Muhammad Usman, with a development team behind him. He leads sales, architecture, AI, complex backend work and client communication, while the team delivers design, frontend, backend and mobile app work.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#475569]">
                This is a guided software house: a visitor can search, ask the AI guide, explore services and projects, and be guided to the right solution — not just look at a portfolio and leave.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/consultation">Book a Free Consultation</Button>
                <Button href="/work" variant="secondary">See Our Work</Button>
              </div>
              <div className="mt-8 flex items-center gap-2 rounded-[20px] border border-[#E7E9F2] bg-[#F6F7FB] px-5 py-4 text-base font-semibold">
                <Globe size={19} className="shrink-0 text-[#4F46E5]" /> Working remotely with clients worldwide.
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative">
                <Image src="/images/about/about-workspace.jpg" alt="A developer workspace with a laptop and notebook" width={1200} height={700} className="w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
                <div className="absolute -bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 shadow-xl sm:left-8 sm:right-auto">
                  <span><span className="block text-base font-bold text-[#0B1220]">Muhammad Usman</span><span className="text-sm text-[#64748B]">CEO & Founder · CraftThink</span></span>
                  <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-bold text-[#4F46E5]">CEO-led</span>
                </div>
                <p className="mt-8 text-sm text-[#64748B]">Workspace photo, not a photo of Muhammad Usman. A real CEO photo will replace it when supplied.</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="ct-card h-full p-7">
                <h2 className="flex items-center gap-2 ct-h3"><Code2 size={22} className="text-[#4F46E5]" /> What we build</h2>
                <p className="mt-3 text-[#475569]">Websites, business systems, online stores, booking systems, mobile apps, and AI assistants — and we fix and improve existing software too.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {stack.map((s) => (<span key={s} className="rounded-full border border-[#E7E9F2] bg-[#F6F7FB] px-3 py-1.5 text-sm font-medium">{s}</span>))}
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="ct-card h-full p-7">
                <h2 className="flex items-center gap-2 ct-h3"><Bot size={22} className="text-[#4F46E5]" /> Applied AI</h2>
                <p className="mt-3 text-[#475569]">AI that answers from your own business data, with answers checked before they are shown — and a human handover when it is unsure.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {aiStack.map((s) => (<span key={s} className="rounded-full border border-[#E7E9F2] bg-[#EEF2FF] px-3 py-1.5 text-sm font-medium text-[#4F46E5]">{s}</span>))}
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal className="mt-6">
            <article className="ct-card flex flex-col gap-3 p-7 sm:flex-row sm:items-center">
              <GraduationCap size={28} className="shrink-0 text-[#4F46E5]" />
              <div>
                <h2 className="ct-h4">Education — one credibility line, not a full CV</h2>
                <p className="mt-1 text-[#475569]">BSc Computer Science, 2021–2025, COMSATS University Islamabad, Abbottabad Campus.</p>
                <p className="mt-2 text-sm text-[#64748B]">Experience history is draft only and will be confirmed by Muhammad Usman — no employment timeline is presented as final on this site.</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`mailto:${siteConfig.email}`} className="ct-card flex min-h-[72px] items-center gap-3 p-5"><Mail size={20} className="shrink-0 text-[#4F46E5]" /><span className="break-all text-base font-semibold">{siteConfig.email}</span></a>
              <a href="https://wa.me/923135263300?text=Hi%20CraftThink%2C%20I%20need%20help%20with%20my%20business%20software." target="_blank" rel="noopener noreferrer" className="ct-card flex min-h-[72px] items-center gap-3 p-5"><MessageCircle size={20} className="shrink-0 text-[#4F46E5]" /><span className="text-base font-semibold">{siteConfig.phone}</span></a>
              <a href="https://linkedin.com/in/muhammadusman-webdev" target="_blank" rel="noopener noreferrer" className="ct-card flex min-h-[72px] items-center gap-3 p-5"><span className="text-base font-semibold">LinkedIn · muhammadusman-webdev</span></a>
              <a href="https://github.com/officialmuhammadusman" target="_blank" rel="noopener noreferrer" className="ct-card flex min-h-[72px] items-center gap-3 p-5"><span className="text-base font-semibold">GitHub · officialmuhammadusman</span></a>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
