/**
 * layout.tsx — Root layout for the CraftThink site.
 * - Loads Sora (display/headings) and Inter (body/UI) from Google Fonts.
 * - Sets SEO metadata from site config.
 * - Wraps all pages with Header, Footer, and StickyMobileCTA.
 * - Initialises Lenis smooth scroll (disabled when prefers-reduced-motion is set).
 */
import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

/* ── Google Fonts — maximum 2 fonts, display: swap ────────────────────── */

// Headings / Display: Sora — weights 600 and 700
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

// Body / UI: Inter — weights 400, 500, 600
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
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
    // TODO: Add og:image in Prompt 2 when designer delivers brand images
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
      className={`${sora.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#0B1220]">
        {/* Lenis smooth scroll wrapper — disabled if prefers-reduced-motion */}
        <LenisProvider>
          {/* Sticky header — sits above all page content */}
          <Header />

          {/* Page content — grows to fill available space */}
          <main className="flex-1 pt-16">
            {/* pt-16 (64px) offsets the fixed header height */}
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile-only fixed bottom CTA bar */}
          <StickyMobileCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
