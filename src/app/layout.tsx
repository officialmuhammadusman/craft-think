/**
 * layout.tsx — Root layout for the CraftThink site.
 * - Loads Bricolage Grotesque (display/headings), Instrument Sans
 *   (body/UI) and Instrument Serif italic (hero accent word only).
 * - Sets SEO metadata from site config.
 * - Wraps all pages with Header, Footer, and StickyMobileCTA.
 * - Initialises Lenis smooth scroll (disabled when prefers-reduced-motion is set).
 */
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingAiButton } from "@/components/layout/FloatingAiButton";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

/* ── Google Fonts — display: swap ─────────────────────────────────────── */

// Headings / Display: Bricolage Grotesque — weights 700 and 800
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

// Body / UI: Instrument Sans — weights 400, 500, 600
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Accent only: Instrument Serif italic — hero headline accent word
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/* ── SEO Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.agencyName} — Software, built with thought, guided by AI`,
    template: `%s | ${siteConfig.agencyName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  openGraph: {
    type: "website",
    siteName: siteConfig.agencyName,
    title: `${siteConfig.agencyName} — Software, built with thought, guided by AI`,
    description: siteConfig.description,
    url: `https://${siteConfig.domain}`,
    images: [{ url: "/images/brand/craftthink-og.png", width: 1200, height: 630, alt: "CraftThink — Software, built with thought, guided by AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.agencyName} — Software, built with thought, guided by AI`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

/* ── Root Layout ───────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#0B1220]">
        {/* Lenis smooth scroll wrapper — disabled if prefers-reduced-motion */}
        <LenisProvider>
          {/* Sticky header — sits above all page content */}
          <Header />

          {/* Page content — grows to fill available space */}
          <main className="flex-1 pt-[72px]">
            {/* pt-[72px] offsets the fixed slim 72px header (no top bar) */}
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating AI button — plain link to the /guide page */}
          <FloatingAiButton />

          {/* Mobile-only fixed bottom CTA bar */}
          <StickyMobileCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
