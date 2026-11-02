import Image from "next/image";
import { Sparkles } from "lucide-react";
import { DashboardMockup } from "@/components/home/DashboardMockup";

/**
 * HeroVisual — layered premium hero composition, not a plain photo+text.
 * The brand hero-abstract image sits behind, the CSS dashboard floats
 * over it, animated glows move behind both, and an animated AI sparkle
 * pill floats on top. DashboardMockup already carries its own floating
 * glass AI card and approval card.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8">
        <div className="ct-hero-glow absolute -top-10 right-0 h-72 w-72 rounded-full bg-[#4F46E5]/40 blur-[100px]" />
        <div className="ct-hero-glow-slow absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#14B8A6]/30 blur-[90px]" />
      </div>
      <div className="relative overflow-hidden rounded-[32px] border border-white/20 shadow-2xl">
        <Image
          src="/images/brand/hero-abstract.png"
          alt="CraftThink brand abstract — indigo and teal shapes"
          width={1200}
          height={800}
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/30 via-transparent to-[#0B1220]/50" />
        <div className="relative p-4 pt-16 sm:p-6 sm:pt-20">
          <DashboardMockup />
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 200 80" className="absolute -bottom-8 -left-6 z-10 hidden w-52 lg:block">
        <path d="M4 72 C 50 70, 70 30, 110 34 S 170 10, 188 8" fill="none" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" className="ct-think-path" />
        <circle cx="190" cy="7" r="6" fill="#14B8A6" />
      </svg>
      <div className="ct-float absolute -top-3 left-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-sm font-bold text-[#0B1220] shadow-xl sm:left-8">
        <Sparkles size={16} className="ct-sparkle text-[#14B8A6]" />
        AI-guided · No jargon
      </div>
    </div>
  );
}
