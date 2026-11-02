"use client";
/**
 * Header — GetYourGuide-style TWO TIERS, white, sticky (fixed).
 * Tier 1: logo left; right side exactly two controls — a "Talk with
 * Think" sparkle icon button (opens the existing floating AI chat
 * via a window event) and the solid indigo "Book a Free Consultation"
 * button, the only solid button in the bar.
 * Tier 2 (desktop only, left-aligned): Services ▾, Work ▾, Process,
 * About, Tools ▾. Each ▾ item opens a FULL-WIDTH mega-menu panel
 * below the header, page behind dimmed, NO X button on the panel.
 * Panel layout (GetYourGuide pattern): NARROW LEFT column of groups
 * (first group selected by default) + WIDE RIGHT grid of links.
 * Clicking a left group swaps ONLY the right grid in place, panel
 * stays open. Clicking ANOTHER top item closes the first panel and
 * opens the new one (only one panel ever open). Clicking OUTSIDE
 * closes it completely. Clicking the SAME open item again does NOT
 * toggle it closed (GetYourGuide behaviour). Escape also closes
 * (standard improvement). Active Tier 2 item is underlined indigo;
 * selected left group is marked with an indigo dot.
 * Phones: single-row header (logo + hamburger); Tier 2 is hidden
 * and all links live in MobileMenu (full-screen, single-open
 * accordion) — GetYourGuide hides its Tier 2 on phones, but
 * CraftThink cannot hide all its links, so the hamburger carries
 * them instead. Wordmark: "Craft" dark navy, "Think" solid #4F46E5.
 * Total header height: 64px on phones, 64px + 48px = 112px on
 * desktop — layout.tsx main padding matches (pt-[64px] lg:pt-[112px]).
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { projects, services } from "@/data/content";
import { industries } from "@/data/offering";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Panel = "services" | "work" | "tools" | null;

/* Services grouped by visitor intent — real services only, each once. */
const serviceGroups: { title: string; slugs: string[] }[] = [
  { title: "Build & Launch", slugs: ["website-design", "business-websites", "online-store", "mobile-apps"] },
  { title: "Run Your Business", slugs: ["crm", "booking", "hr-systems"] },
  { title: "Design, AI & Care", slugs: ["ui-ux-design", "ai-solutions", "fix-improve", "testing-care"] },
];

/* Work left groups: "All work" + the real offering industries. The
   industry query value in each industry href is the filter key. */
function industryKey(href: string): string | null {
  const m = href.match(/industry=([^&]+)/);
  return m ? m[1] : null;
}
const workGroups: { title: string; key: string | null }[] = [
  { title: "All work", key: null },
  ...industries.map((ind) => ({ title: ind.label, key: industryKey(ind.href) })),
];

const tools: { title: string; href: string; line: string }[] = [
  { title: "Talk with Think", href: "/guide", line: "Ask in plain words — guided to the right service and project." },
  { title: "Get an Estimate", href: "/estimate", line: "Tell us what you need and get a written estimate." },
  { title: "Free Software Audit", href: "/audit", line: "A free check of your existing software — what is slow or broken." },
  { title: "FAQ", href: "/faq", line: "Plain answers to common questions, no jargon." },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const [serviceGroup, setServiceGroup] = useState(0);
  const [workGroup, setWorkGroup] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openPanel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenPanel(null); };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [openPanel]);

  const openAi = () => {
    setOpenPanel(null);
    window.dispatchEvent(new CustomEvent("craftthink:open-ai"));
  };

  /* Panel content for the currently open panel. */
  const serviceItems = serviceGroups[serviceGroup].slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const workKey = workGroups[workGroup].key;
  const workItems = workKey === null ? projects : projects.filter((p) => p.industry === workKey);

  const tier2Button = (panel: Exclude<Panel, null>, label: string) => (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={openPanel === panel}
      onClick={() => {
        // GetYourGuide behaviour: clicking the open item does NOT close it.
        // Clicking another item swaps panels (setOpenPanel replaces).
        setOpenPanel(panel);
        if (panel === "services") setServiceGroup(0);
        if (panel === "work") setWorkGroup(0);
      }}
      className={cn(
        "flex min-h-[48px] items-center gap-1 border-b-2 px-3 text-base font-semibold transition-colors",
        openPanel === panel
          ? "border-[#4F46E5] text-[#4F46E5]"
          : "border-transparent text-[#0B1220] hover:text-[#4F46E5]"
      )}
    >
      {label} <ChevronDown size={16} className={cn("transition-transform", openPanel === panel && "rotate-180")} />
    </button>
  );

  return (
    <>
      <header ref={headerRef} className={cn("fixed inset-x-0 top-0 z-50 border-b border-[#E7E9F2] bg-white transition-shadow", isScrolled && "shadow-[0_8px_30px_rgba(11,18,32,0.08)]")}>
        {/* TIER 1 */}
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[64px] items-center justify-between gap-4">
            <Link href="/" aria-label="CraftThink — Home" onClick={() => setOpenPanel(null)} className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]">
              <LogoMark size={44} className="h-11 w-11 rounded-xl object-cover ring-1 ring-[#E7E9F2]" />
              <span className="font-display text-2xl font-bold tracking-tight"><span className="text-[#0B1220]">Craft</span><span className="text-[#4F46E5]">Think</span></span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={openAi}
                aria-label="Talk with Think — open the AI chat"
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#E7E9F2] text-[#4F46E5] hover:border-[#4F46E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] lg:flex"
              >
                <Sparkles size={20} />
              </button>
              <div className="hidden lg:block">
                <Button size="sm" href="/consultation">Book a Free Consultation</Button>
              </div>
              <button type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E7E9F2] text-[#0B1220] lg:hidden"><Menu size={22} /></button>
            </div>
          </div>
        </div>

        {/* TIER 2 — desktop only */}
        <div className="hidden border-t border-[#E7E9F2] lg:block">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <nav aria-label="Primary navigation" className="flex items-center gap-1">
              {tier2Button("services", "Services")}
              {tier2Button("work", "Work")}
              <Link href="/process" onClick={() => setOpenPanel(null)} className="flex min-h-[48px] items-center border-b-2 border-transparent px-3 text-base font-semibold text-[#0B1220] hover:text-[#4F46E5]">Process</Link>
              <Link href="/about" onClick={() => setOpenPanel(null)} className="flex min-h-[48px] items-center border-b-2 border-transparent px-3 text-base font-semibold text-[#0B1220] hover:text-[#4F46E5]">About</Link>
              {tier2Button("tools", "Tools")}
            </nav>
          </div>
        </div>

        {/* FULL-WIDTH MEGA-MENU PANEL — no X; closes on outside click,
            Escape, link click, or opening another panel. */}
        {openPanel && (
          <div className="absolute inset-x-0 top-full z-50 border-b border-[#E7E9F2] bg-white shadow-xl">
            <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
              {openPanel === "services" && (
                <div className="flex gap-8">
                  <div className="w-56 shrink-0">
                    {serviceGroups.map((g, i) => (
                      <button
                        key={g.title}
                        type="button"
                        onClick={() => setServiceGroup(i)}
                        aria-pressed={serviceGroup === i}
                        className={cn(
                          "flex min-h-[48px] w-full items-center gap-2 rounded-xl px-3 text-left text-base font-semibold",
                          serviceGroup === i ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-[#0B1220] hover:bg-[#F6F7FB]"
                        )}
                      >
                        <span className={cn("h-2 w-2 shrink-0 rounded-full", serviceGroup === i ? "bg-[#4F46E5]" : "bg-transparent")} />
                        {g.title}
                      </button>
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                      {serviceItems.map((item) => (
                        <Link key={item.slug} href={`/services/${item.slug}`} onClick={() => setOpenPanel(null)} className="block min-h-[72px] rounded-xl px-3 py-3 hover:bg-[#F6F7FB]">
                          <span className="block text-base font-semibold text-[#0B1220]">{item.title}</span>
                          <span className="mt-1 block text-sm leading-snug text-[#475569]">{item.line}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/services" onClick={() => setOpenPanel(null)} className="mt-4 inline-flex min-h-[48px] items-center px-3 text-base font-semibold text-[#4F46E5]">View all 11 services →</Link>
                  </div>
                </div>
              )}

              {openPanel === "work" && (
                <div className="flex gap-8">
                  <div className="w-56 shrink-0">
                    {workGroups.map((g, i) => (
                      <button
                        key={g.title}
                        type="button"
                        onClick={() => setWorkGroup(i)}
                        aria-pressed={workGroup === i}
                        className={cn(
                          "flex min-h-[48px] w-full items-center gap-2 rounded-xl px-3 text-left text-base font-semibold",
                          workGroup === i ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-[#0B1220] hover:bg-[#F6F7FB]"
                        )}
                      >
                        <span className={cn("h-2 w-2 shrink-0 rounded-full", workGroup === i ? "bg-[#4F46E5]" : "bg-transparent")} />
                        {g.title}
                      </button>
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                      {workItems.map((item) => (
                        <Link key={item.slug} href={`/work/${item.slug}`} onClick={() => setOpenPanel(null)} className="block min-h-[72px] rounded-xl px-3 py-3 hover:bg-[#F6F7FB]">
                          <span className="block text-base font-semibold text-[#0B1220]">{item.title}</span>
                          <span className="mt-1 block text-sm leading-snug text-[#475569]">{item.industryLabel} · {item.line}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/work" onClick={() => setOpenPanel(null)} className="mt-4 inline-flex min-h-[48px] items-center px-3 text-base font-semibold text-[#4F46E5]">View all work →</Link>
                  </div>
                </div>
              )}

              {openPanel === "tools" && (
                <div className="flex gap-8">
                  <div className="w-56 shrink-0">
                    <span className="flex min-h-[48px] items-center gap-2 rounded-xl bg-[#EEF2FF] px-3 text-base font-semibold text-[#4F46E5]">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#4F46E5]" /> Free tools
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                      {tools.map((tool) => (
                        <Link key={tool.href} href={tool.href} onClick={() => setOpenPanel(null)} className="block min-h-[72px] rounded-xl px-3 py-3 hover:bg-[#F6F7FB]">
                          <span className="block text-base font-semibold text-[#0B1220]">{tool.title}</span>
                          <span className="mt-1 block text-sm leading-snug text-[#475569]">{tool.line}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Dim layer behind the panel, above page content — click closes. */}
      {openPanel && (
        <div aria-hidden="true" onClick={() => setOpenPanel(null)} className="fixed inset-0 z-40 bg-[#0B1220]/40" />
      )}

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
