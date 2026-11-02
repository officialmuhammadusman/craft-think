"use client";

/**
 * StickyMobileCTA.tsx — Fixed bottom bar on mobile only.
 * Two buttons: "Book a Free Consultation" (primary) and "Talk with me" (secondary,
 * opens the Think chat sheet via the craftthink:open-ai event — NOT a link to a page).
 * "Get an Estimate" was REMOVED from this bar per user request (estimate stays
 * reachable from footer/in-page links). Hidden on desktop (lg and above).
 * The layout.tsx adds pb-[80px] on mobile so the footer is never hidden behind this bar.
 */
import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div
      aria-label="Quick action bar"
      className={[
        // Mobile only — hidden on lg+
        "lg:hidden",
        // Fixed to bottom, full width, above everything except mobile menu (z-[99])
        "fixed bottom-0 left-0 right-0 z-[99]",
        // Background + border
        "bg-white border-t border-[#E7E9F2]",
        // Padding — tighter on very small phones, extra bottom for iOS safe area (env())
        "px-3 py-2.5 sm:px-4 sm:py-3 pb-[calc(0.625rem+env(safe-area-inset-bottom))] sm:pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        // Two-column button row
        "flex gap-2 sm:gap-3",
        // Subtle shadow above the bar
        "shadow-[0_-4px_16px_0_rgba(11,18,32,0.08)]",
      ].join(" ")}
    >
      {/* Primary: Book a Free Consultation */}
      <Link
        href="/consultation"
        id="mobile-cta-book"
        className="flex-1 flex items-center justify-center text-center rounded-full bg-[#4F46E5] px-2 py-2.5 sm:py-3 text-sm leading-tight sm:text-base font-semibold text-white hover:bg-[#4338CA] active:bg-[#312E81] transition-colors duration-150 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        Book a Free Consultation
      </Link>

      {/* Secondary: Talk with me — opens the Think chat sheet, same event as the header */}
      <button
        type="button"
        id="mobile-cta-talk"
        onClick={() => window.dispatchEvent(new CustomEvent("craftthink:open-ai"))}
        className="flex-1 flex items-center justify-center text-center rounded-full border border-[#E7E9F2] bg-white px-2 py-2.5 sm:py-3 text-sm leading-tight sm:text-base font-semibold text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors duration-150 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        Talk with me
      </button>
    </div>
  );
}
