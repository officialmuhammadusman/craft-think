import Link from "next/link";
import { CalendarCheck, MessageCircle, ShoppingBag, Smartphone } from "lucide-react";

/**
 * HeroPathCollage — Concept A "The Path" hero visual.
 * NOT a dashboard screenshot and NOT a stock photo: a flat-style
 * collage built in pure CSS/HTML from CraftThink's own project
 * types. Each tile is labelled by the JOB it does (Booked /
 * Answered / Ordered), never by a fake metric, and links to the
 * matching service page. A single indigo path line is the brand
 * signature: it snakes through the tile gaps on desktop (drawn
 * once on load via stroke-dashoffset animation) and becomes a
 * short vertical line down the left of the collage on phones.
 * Teal appears only as 2 small dots where the AI steps in.
 * No gradients, no images, so nothing here can break or crop.
 */
export function HeroPathCollage() {
  return (
    <div className="relative min-w-0 rounded-[24px] border border-[#E7E9F2] bg-[#F6F7FB] p-4 sm:p-5">
      {/* Phone path: short vertical line down the left of the collage */}
      <span aria-hidden="true" className="absolute bottom-6 left-0 top-6 w-[3px] rounded-full bg-[#4F46E5] lg:hidden" />
      {/* Desktop path: SVG line through the tile gaps, drawn on load */}
      <svg
        aria-hidden="true"
        className="ct-path-draw pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
        viewBox="0 0 400 420"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 200 8 C 200 60, 60 70, 60 130 C 60 190, 340 200, 340 260 C 340 320, 200 330, 200 412"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="900"
          strokeDashoffset="900"
        />
      </svg>

      <div className="relative z-10 grid min-w-0 grid-cols-2 gap-3 sm:gap-4">
        {/* Website card — a customer ordered */}
        <Link
          href="/services/website-design"
          className="group min-w-0 rounded-2xl border border-[#E7E9F2] bg-white p-3 shadow-sm transition-transform hover:-translate-y-0.5 sm:p-4"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#DC2626]/70" />
            <span className="h-2 w-2 rounded-full bg-[#D97706]/70" />
            <span className="h-2 w-2 rounded-full bg-[#16A34A]/70" />
            <span className="ml-1 min-w-0 flex-1 truncate rounded-full bg-[#F6F7FB] px-2 py-0.5 text-[11px] font-medium text-[#64748B]">your business</span>
          </span>
          <span className="mt-3 block h-2.5 w-3/4 rounded-full bg-[#0B1220]" />
          <span className="mt-2 block h-2 w-1/2 rounded-full bg-[#E7E9F2]" />
          <span className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#EEF2FF] px-2.5 py-2 text-xs font-bold text-[#0B1220]">
            <ShoppingBag size={14} className="shrink-0 text-[#4F46E5]" /> Ordered
          </span>
          <span className="mt-2 block text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">Website</span>
        </Link>

        {/* App phone frame — in the customer's hand */}
        <Link
          href="/services/mobile-apps"
          className="group min-w-0 rounded-2xl border border-[#E7E9F2] bg-white p-3 shadow-sm transition-transform hover:-translate-y-0.5 sm:p-4"
        >
          <span className="mx-auto flex w-[76px] flex-col gap-1.5 rounded-[16px] border-2 border-[#0B1220] px-2 py-2.5">
            <span className="mx-auto h-1 w-6 rounded-full bg-[#E7E9F2]" />
            <span className="flex items-center gap-1.5 rounded-lg bg-[#EEF2FF] px-2 py-1.5 text-[11px] font-bold text-[#0B1220]">
              <Smartphone size={12} className="shrink-0 text-[#4F46E5]" /> Your app
            </span>
            <span className="h-1.5 w-full rounded-full bg-[#E7E9F2]" />
            <span className="h-1.5 w-2/3 rounded-full bg-[#E7E9F2]" />
            <span className="h-5 rounded-lg bg-[#4F46E5]" />
          </span>
          <span className="mt-2 block text-center text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">Mobile app</span>
        </Link>

        {/* Booking calendar — an appointment confirmed */}
        <Link
          href="/services/booking"
          className="group min-w-0 rounded-2xl border border-[#E7E9F2] bg-white p-3 shadow-sm transition-transform hover:-translate-y-0.5 sm:p-4"
        >
          <span className="grid grid-cols-7 gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={`flex h-5 items-center justify-center rounded-md text-[10px] font-bold ${
                  i === 9 ? "bg-[#4F46E5] text-white" : "bg-[#F6F7FB] text-[#64748B]"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </span>
          <span className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#EEF2FF] px-2.5 py-2 text-xs font-bold text-[#0B1220]">
            <CalendarCheck size={14} className="shrink-0 text-[#4F46E5]" /> Booked
          </span>
          <span className="mt-2 block text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">Booking</span>
        </Link>

        {/* AI chat bubble — a customer answered, teal dots = AI steps in */}
        <Link
          href="/services/ai-solutions"
          className="group relative min-w-0 rounded-2xl border border-[#E7E9F2] bg-white p-3 shadow-sm transition-transform hover:-translate-y-0.5 sm:p-4"
        >
          <span className="absolute -right-1 -top-1 z-10 flex gap-1" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]/60" />
          </span>
          <span className="block rounded-xl rounded-tl-sm bg-[#F6F7FB] px-3 py-2 text-xs leading-snug text-[#0B1220]">
            “Do you take bookings on Sundays?”
          </span>
          <span className="mt-2 flex items-center gap-1.5 rounded-xl rounded-tr-sm bg-[#EEF2FF] px-3 py-2 text-xs font-bold text-[#0B1220]">
            <MessageCircle size={14} className="shrink-0 text-[#4F46E5]" /> Answered
          </span>
          <span className="mt-2 block text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">AI assistant</span>
        </Link>
      </div>

      <p className="relative z-10 mt-4 text-center text-xs font-semibold text-[#64748B]">
        One path: website, app, booking, AI — built around your customers.
      </p>
    </div>
  );
}
