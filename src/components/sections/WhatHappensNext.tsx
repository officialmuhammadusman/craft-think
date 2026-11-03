import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * WhatHappensNext — the honest journey after a visitor contacts
 * CraftThink. Steps are drawn only from the site's real process
 * (processSteps) and the consultation flow: request → free call →
 * written plan before payment → build safely → launch → support.
 * No reply-time promise, no invented timelines or dates.
 */
const steps = [
  { n: "1", title: "You send a request", text: "Tell us what your business does and what you need help with." },
  { n: "2", title: "Free call", text: "We learn your business, your customers and the problem — on a call with the person leading your project." },
  { n: "3", title: "Written plan before payment", text: "You get a clear scope, timeline and estimate in writing before you pay anything." },
  { n: "4", title: "Build safely", text: "Small, tested steps with a working demo every week, so you steer the product as it grows." },
  { n: "5", title: "Launch", text: "We deploy and check payments, bookings and forms live with you." },
  { n: "6", title: "Support", text: "After launch we monitor, fix bugs and update, so your software keeps working as your business grows." },
];

export function WhatHappensNext({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <Reveal>
        <SectionHeading
          eyebrow="What happens next"
          title="After you contact us"
          subtitle="No obligation at any step — you decide from a written plan, before you pay anything."
        />
      </Reveal>
      <ol className={`mt-10 grid gap-4 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={(i % 3) * 0.06}>
            <li className="h-full rounded-[20px] border border-[#E7E9F2] bg-white px-5 py-4 shadow-sm">
              <span className="font-display text-3xl font-bold text-[#4F46E5]">{s.n}</span>
              <h3 className="ct-h4 mt-2">{s.title}</h3>
              <p className="mt-1 text-[#475569]">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <p className="mt-8">
          <Link href="/consultation" className="flex min-h-[48px] items-center gap-1 font-semibold text-[#4F46E5]">
            Start with a free consultation <ArrowRight size={16} />
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
