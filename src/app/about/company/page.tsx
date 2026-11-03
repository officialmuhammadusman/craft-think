import type { Metadata } from "next";
import Link from "next/link";
import { Search, Compass, ShieldCheck, Rocket, HeartHandshake, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { services, projects } from "@/data/content";

export const metadata: Metadata = {
  title: "About the Company — CraftThink",
  description: "CraftThink is a guided software house led by CEO Muhammad Usman: websites, mobile apps, booking and CRM systems, and AI solutions powered by RAG and automation, for clients worldwide.",
};

const journey = [
  { icon: Search, title: "1. You search and ask", text: "Find the service you need, or ask Think, the guide on this site, and it points you to the right service and a similar project." },
  { icon: Compass, title: "2. Discovery", text: "On a free call we learn what your business does, who your customers are, and what is slow, manual, or losing you sales — before anyone talks about code." },
  { icon: ShieldCheck, title: "3. Built safely, in phases", text: "Your project is built in clear phases you can see and approve. Security, logins, and data protection are built in from the start, not added later." },
  { icon: Rocket, title: "4. Launch and handover", text: "Your website, app, or system goes live, your team learns how to use it, and nothing is left half-finished or unexplained." },
  { icon: HeartHandshake, title: "5. Support after launch", text: "Fixes, small improvements, and care plans keep your software working as your business grows — you are not left alone after launch day." },
];

const facilities = [
  { title: "Discovery first", text: "We understand the business problem before building, so you do not pay for features nobody needs." },
  { title: "Security built in", text: "Safe logins, controlled access for different staff roles, and encrypted data as standard practice." },
  { title: "Deployment and hosting", text: "Your project is launched properly and kept running, with updates handled for you." },
  { title: "Support and maintenance", text: "A care plan covers fixes and improvements after launch, so small problems never become lost sales." },
  { title: "Clear communication", text: "One lead contact, clear updates, and no jargon." },
];

export default function CompanyPage() {
  return (
    <>
      <section className="ct-section">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="About the company"
            title="CraftThink, a guided software house"
            subtitle="Software, built with thought, guided by AI. Led by CEO Muhammad Usman, working remotely with clients worldwide."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Reveal>
              <p className="text-lg leading-relaxed text-[#475569]">
                CraftThink is not a static portfolio. It is a software house you can explore, ask questions of, and be guided through: search for what you need, talk to Think, look at real projects, and book a free consultation — all before you spend anything.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#475569]">
                Clients come from Fiverr, Upwork, cold outreach, and this website itself. Wherever you found us, the experience is the same: one senior lead, a team behind him, and a project built around how your business actually works.
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            <SectionHeading eyebrow="What we build" title="Services" subtitle="If you are not technical, start here. The technical detail lives inside each service page." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Reveal key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="ct-card block h-full p-6 hover:border-[#4F46E5]">
                    <h3 className="ct-h4">{s.title}</h3>
                    <p className="mt-2 text-[#475569]">{s.line}</p>
                    <span className="mt-4 block text-base font-semibold text-[#4F46E5]">Learn more →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="How a project runs" title="From first call to support after launch" subtitle="No surprises. You always know what phase your project is in and what comes next." />
            <ol className="mt-8 grid gap-4 lg:grid-cols-2">
              {journey.map((j) => (
                <Reveal key={j.title}>
                  <li className="ct-card flex h-full gap-4 p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><j.icon size={22} /></span>
                    <span><strong className="block text-base">{j.title}</strong><span className="mt-1 block text-[#475569]">{j.text}</span></span>
                  </li>
                </Reveal>
              ))}
              <Reveal>
                <li className="ct-card flex h-full flex-col justify-center gap-3 p-6">
                  <p className="text-base font-semibold">Want the full process, step by step?</p>
                  <Button href="/process" variant="secondary">See how we work →</Button>
                </li>
              </Reveal>
            </ol>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="Everything a software house should provide" title="Not just code" subtitle="A finished project needs discovery, security, launch, and care — all of it is part of the service." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((f) => (
                <Reveal key={f.title}>
                  <article className="ct-card h-full p-6">
                    <h3 className="ct-h4">{f.title}</h3>
                    <p className="mt-2 text-[#475569]">{f.text}</p>
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <article className="ct-card flex h-full flex-col justify-center gap-3 p-6">
                  <Users size={24} className="text-[#4F46E5]" />
                  <h3 className="ct-h4">The team behind the lead</h3>
                  <p className="text-[#475569]">Developers handle design, frontend, backend, and mobile apps, and a designer creates unique visuals — all led by the CEO, so you deal with one person.</p>
                </article>
              </Reveal>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="Proof, not promises" title="Real projects, real businesses" subtitle="Every project below is work CraftThink has actually built. Click one to see what it does and how it was built." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Reveal key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="ct-card block h-full p-6 hover:border-[#4F46E5]">
                    <span className="text-sm font-semibold text-[#4F46E5]">{p.industryLabel}</span>
                    <h3 className="ct-h4 mt-2">{p.title}</h3>
                    <p className="mt-2 text-[#475569]">{p.line}</p>
                    <span className="mt-4 block text-base font-semibold text-[#4F46E5]">See the project →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[24px] bg-[#0B1220] p-7 text-white">
              <div>
                <p className="text-lg font-bold">Working remotely with clients worldwide</p>
                <p className="mt-1 text-white/70">Start with a free consultation — or meet the person leading it first.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/consultation">Book a Free Consultation</Button>
                <Button href="/about/ceo" variant="secondary">About the CEO →</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
