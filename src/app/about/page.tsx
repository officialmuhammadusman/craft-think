import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "About CEO", description: "Muhammad Usman, CEO & Founder of CraftThink — Full Stack and Applied AI Engineer, working remotely with clients worldwide." };

export default function AboutPage() {
  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">About the CEO</p>
          <h1 className="ct-h1 mt-2">Muhammad Usman</h1>
          <p className="ct-body-lg mt-2 text-[#475569]">CEO & Founder, CraftThink — Full Stack and Applied AI Engineer, 2+ years.</p>
          <Image src="/images/about/about-workspace.jpg" alt="A developer workspace with a laptop and notebook" width={1200} height={700} className="mt-8 w-full rounded-3xl border border-[#E7E9F2] object-cover" />
          <p className="mt-2 text-sm text-[#64748B]">Placeholder photo — a workspace, not a photo of Muhammad Usman. A real CEO photo will replace it when supplied.</p>
          <p className="mt-8 text-[#475569]">CraftThink is led by CEO Muhammad Usman, with a development team behind him. He leads sales, architecture, AI, complex backend work and client communication, while the team delivers design, frontend, backend and mobile app work. This is a guided software house: a visitor can search, ask the AI guide, explore services and projects, and be guided to the right solution — not just look at a portfolio and leave.</p>
          <h2 className="ct-h3 mt-10">What we build</h2>
          <p className="mt-2 text-[#475569]">Websites, business systems, online stores, booking systems, mobile apps, and AI assistants — and we fix and improve existing software too. Core stack: TypeScript, Next.js, React, React Native, Node.js, NestJS, Express.js, PostgreSQL, Prisma and Supabase. Applied AI: LangChain, LangGraph, Corrective RAG, Self-RAG, multi-agent systems, OpenAI and Gemini APIs, Pinecone and ChromaDB.</p>
          <h2 className="ct-h3 mt-8">Education</h2>
          <p className="mt-2 text-[#475569]">BSc Computer Science, 2021–2025, COMSATS University Islamabad, Abbottabad Campus — one credibility line, not a full CV.</p>
          <p className="mt-6 rounded-2xl bg-[#F6F7FB] p-6"><strong>Working remotely with clients worldwide.</strong><br />Experience history is draft only and will be confirmed by Muhammad Usman — no employment timeline is presented as final on this site.</p>
          <h2 className="ct-h3 mt-8">Contact</h2>
          <ul className="mt-3 flex flex-col gap-2 text-[#475569]">
            <li>Email: <a className="font-semibold text-[#4F46E5] underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li>Phone: <a className="font-semibold text-[#4F46E5] underline" href={`tel:${siteConfig.phone.replace(/ /g, "")}`}>{siteConfig.phone}</a></li>
            <li>LinkedIn: <a className="font-semibold text-[#4F46E5] underline" href="https://linkedin.com/in/muhammadusman-webdev">linkedin.com/in/muhammadusman-webdev</a></li>
            <li>GitHub: <a className="font-semibold text-[#4F46E5] underline" href="https://github.com/officialmuhammadusman">github.com/officialmuhammadusman</a></li>
          </ul>
          <div className="mt-10"><Button href="/contact">Book a Free Consultation</Button></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
