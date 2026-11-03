import type { Metadata } from "next";
import { Code2, Bot, MessagesSquare, GraduationCap, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About the CEO — Muhammad Usman",
  description: "Muhammad Usman, CEO & Founder of CraftThink — Full Stack and Applied AI Engineer who leads every client project personally, working remotely with clients worldwide.",
};

const stack = ["TypeScript", "Next.js", "React", "React Native", "Node.js", "NestJS", "Express.js", "PostgreSQL", "Prisma", "Supabase"];
const aiStack = ["LangChain", "LangGraph", "Corrective RAG", "Self-RAG", "Multi-agent systems", "OpenAI API", "Gemini API", "Pinecone", "ChromaDB"];
const leads = [
  { title: "Sales and first conversations", text: "He talks to you himself on the free consultation — no handover to a salesperson who then hands you to someone else." },
  { title: "Architecture and AI", text: "He designs how your system fits together and builds the AI parts: assistants that answer from your own business data, checked before they are shown." },
  { title: "Complex backend work", text: "Bookings, CRMs, payments logic, multi-user systems and the parts where a mistake costs a business real money." },
  { title: "Client communication", text: "One person who knows your whole project answers you, from the first call to support after launch." },
];

export default function CeoPage() {
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="About the CEO"
            title="Muhammad Usman"
            subtitle="CEO & Founder, CraftThink — Full Stack and Applied AI Engineer, 2+ years. You talk directly with the person leading your project."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Reveal>
              <Image src="/images/sections/about-ceo.svg" alt="Illustration of direct contact with the project lead: one conversation, no ticket queue" width={1200} height={700} className="mb-8 h-auto w-full rounded-[24px] border border-[#E7E9F2] object-cover shadow-xl" />
            </Reveal>
            <Reveal>
              <p className="text-lg leading-relaxed text-[#475569]">
                CraftThink is led by its CEO, not by an account manager. Muhammad Usman leads sales, architecture, AI, complex backend work and client communication, while a development team behind him delivers design, frontend, backend and mobile app work — and a designer creates the unique images and visuals.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#475569]">
                That matters if you are not technical: you explain your problem once, to the person building your solution, and you keep talking to that same person throughout.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {leads.map((l) => (
              <Reveal key={l.title}>
                <article className="ct-card h-full p-7">
                  <h2 className="ct-h3">{l.title}</h2>
                  <p className="mt-3 text-[#475569]">{l.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <article className="ct-card p-7">
              <h2 className="flex items-center gap-2 ct-h3"><Code2 size={22} className="text-[#4F46E5]" /> What he builds with</h2>
              <p className="mt-3 text-[#475569]">Modern web and mobile technology, chosen for reliability and for systems that can grow — not for showing off.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((s) => (<span key={s} className="rounded-full border border-[#E7E9F2] bg-[#F6F7FB] px-3 py-1.5 text-sm font-medium">{s}</span>))}
              </div>
            </article>
          </Reveal>
          <Reveal className="mt-6">
            <article className="ct-card p-7">
              <h2 className="flex items-center gap-2 ct-h3"><Bot size={22} className="text-[#4F46E5]" /> Applied AI</h2>
              <p className="mt-3 text-[#475569]">AI that answers your customers from your own documents and data, with answers checked before they are shown — and a human handover when it is unsure. That includes RAG systems and multi-agent setups, not just a chatbot pasted on a page.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {aiStack.map((s) => (<span key={s} className="rounded-full border border-[#E7E9F2] bg-[#EEF2FF] px-3 py-1.5 text-sm font-medium text-[#4F46E5]">{s}</span>))}
              </div>
            </article>
          </Reveal>
          <Reveal className="mt-6">
            <article className="ct-card flex flex-col gap-3 p-7 sm:flex-row sm:items-center">
              <GraduationCap size={28} className="shrink-0 text-[#4F46E5]" />
              <div>
                <h2 className="ct-h4">Education — one credibility line, not a full CV</h2>
                <p className="mt-1 text-[#475569]">BSc Computer Science, 2021–2025, COMSATS University Islamabad, Abbottabad Campus.</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[24px] bg-[#0B1220] p-7 text-white">
              <div>
                <p className="text-lg font-bold">Talk to Muhammad directly</p>
                <p className="mt-1 text-white/70">A free consultation, no pressure — just a conversation about your business.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/consultation">Book a Free Consultation</Button>
                <Button href="/about/company" variant="secondary">About the company <ArrowRight size={18} /></Button>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${siteConfig.email}`} className="ct-card flex min-h-[56px] items-center px-5 text-base font-semibold">{siteConfig.email}</a>
              <a href="https://wa.me/923135263300?text=Hi%20CraftThink%2C%20I%20need%20help%20with%20my%20business%20software." target="_blank" rel="noopener noreferrer" className="ct-card flex min-h-[56px] items-center gap-2 px-5 text-base font-semibold"><MessagesSquare size={19} className="text-[#4F46E5]" /> WhatsApp · {siteConfig.phone}</a>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
