"use client";

/**
 * StickyMobileCTA.tsx — Fixed bottom bar on mobile only.
 * Two buttons: "Book a Free Consultation" (primary) and "Get an Estimate" (secondary).
 * Hidden on desktop (lg and above).
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
        // Padding — extra bottom for iOS safe area (env())
        "px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        // Two-column button row
        "flex gap-3",
        // Subtle shadow above the bar
        "shadow-[0_-4px_16px_0_rgba(11,18,32,0.08)]",
      ].join(" ")}
    >
      {/* Primary: Book a Free Consultation */}
      <Link
        href="/contact"
        id="mobile-cta-book"
        className="flex-1 flex items-center justify-center rounded-full bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white hover:bg-[#4338CA] active:bg-[#312E81] transition-colors duration-150 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        Book a Free Consultation
      </Link>

      {/* Secondary: Get an Estimate */}
      <Link
        href="/estimate"
        id="mobile-cta-estimate"
        className="flex-1 flex items-center justify-center rounded-full border border-[#E7E9F2] bg-white px-4 py-3 text-sm font-semibold text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors duration-150 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        Get an Estimate
      </Link>
    </div>
  );
}
