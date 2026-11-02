import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * HeroBento — Concept C "Work, Not Words" hero visual.
 * Four bento tiles, each a cropped, brand-styled fragment of a real
 * CraftThink project type — pure CSS/HTML, no screenshots, no stock
 * photos. Each tile links to its service; on hover the tile lifts
 * slightly and the one-line "what it does for you" caption shows.
 * Phones: single column, fragment + label + one line, never cropped
 * mid-text. Flat solid indigo only; teal only as the AI tile's dot.
 */
const tiles = [
  {
    label: "Website",
    href: "/services/website-design",
    caption: "The website your customers find — clear, fast, and easy to trust.",
    fragment: (
      <div className="flex flex-col gap-2.5">
        <span className="h-2 w-2/3 rounded-full bg-[#0B1220]" />
        <span className="h-2 w-1/2 rounded-full bg-[#64748B]" />
        <span className="mt-1 inline-flex h-8 w-24 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-bold text-white">
          Book a call
        </span>
        <span className="h-16 rounded-xl bg-white ring-1 ring-[#E7E9F2]" />
      </div>
    ),
  },
  {
    label: "Mobile app",
    href: "/services/mobile-apps",
    caption: "The app your customers use — bookings, orders, and updates in their pocket.",
    fragment: (
      <div className="flex items-start gap-3">
        <span className="flex h-24 w-14 shrink-0 flex-col gap-1.5 rounded-2xl border-2 border-[#0B1220] bg-white p-2">
          <span className="h-2 w-full rounded-full bg-[#4F46E5]" />
          <span className="h-2 w-3/4 rounded-full bg-[#64748B]" />
          <span className="mt-auto h-5 rounded-md bg-[#EEF2FF]" />
        </span>
        <span className="flex flex-1 flex-col gap-2">
          <span className="h-2 w-full rounded-full bg-[#0B1220]" />
          <span className="h-2 w-2/3 rounded-full bg-[#64748B]" />
          <span className="h-10 rounded-xl bg-white ring-1 ring-[#E7E9F2]" />
        </span>
      </div>
    ),
  },
  {
    label: "Booking & CRM",
    href: "/services/booking",
    caption: "The booking system that saves you time — every appointment in one place.",
    fragment: (
      <div className="flex flex-col gap-2.5">
        <span className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={`h-6 rounded-md ${i === 8 ? "bg-[#4F46E5]" : "bg-white ring-1 ring-[#E7E9F2]"}`}
            />
          ))}
        </span>
        <span className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-[#E7E9F2]">
          <span className="text-xs font-bold text-[#0B1220]">Booking confirmed</span>
          <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-bold text-[#4F46E5]">Today</span>
        </span>
      </div>
    ),
  },
  {
    label: "AI assistant",
    href: "/services/ai-solutions",
    caption: "The assistant that answers your customers — day and night, in plain words.",
    fragment: (
      <div className="flex flex-col gap-2.5">
        <span className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-xs font-medium text-[#475569] ring-1 ring-[#E7E9F2]">
          Do you have an appointment tomorrow?
        </span>
        <span className="flex items-start gap-1.5 self-end">
          <span className="max-w-[220px] rounded-2xl rounded-tr-sm bg-[#4F46E5] px-3 py-2 text-xs font-semibold text-white">
            Yes — 10:30, and I can move it if you like.
          </span>
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#14B8A6]" />
        </span>
      </div>
    ),
  },
];

export function HeroBento() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
      {tiles.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className="group block min-w-0 rounded-[24px] bg-[#F6F7FB] p-5 ring-1 ring-[#E7E9F2] transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-[#4F46E5]/40"
        >
          <div className="min-w-0">{t.fragment}</div>
          <p className="mt-4 flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0B1220]">{t.label}</span>
            <ArrowRight size={16} className="shrink-0 text-[#4F46E5] transition-transform duration-200 group-hover:translate-x-1" />
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#475569] sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
            {t.caption}
          </p>
        </Link>
      ))}
    </div>
  );
}
