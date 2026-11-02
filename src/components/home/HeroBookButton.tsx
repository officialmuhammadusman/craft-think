"use client";

/**
 * HeroBookButton — the homepage's single CTA. Opens the consultation
 * slide-over panel (no backend; the panel's form prepares a mailto
 * draft and says so plainly).
 */
import { useOverlays } from "@/components/layout/Overlays";

export function HeroBookButtonClient() {
  const { openConsult } = useOverlays();
  return (
    <button
      type="button"
      onClick={openConsult}
      className="flex min-h-[52px] items-center justify-center rounded-full bg-[#4F46E5] px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#4338CA]"
    >
      Book a Free Consultation
    </button>
  );
}
