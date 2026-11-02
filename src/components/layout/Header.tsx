"use client";
/**
 * Header — ALWAYS solid white (the old transparent-over-dark-hero header
 * made dark nav text invisible on the dark hero). Premium agency header:
 * logo, Services mega menu, Work dropdown, Process, About, Contact,
 * Search, Ask AI, Book CTA. Hover intent + click, Escape + outside-click
 * close, route change closes, no flicker: a single wrapper owns open state
 * and the panel is rendered inside it, so moving from button to panel
 * never triggers a mouse-leave close.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, ChevronDown, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/content";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { useOverlays } from "@/components/layout/Overlays";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | "work" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Ref on the whole header, so the full-width services panel counts as
  // "inside" for outside-click, and moving button -> panel never closes it.
  const navRef = useRef<HTMLElement>(null);
  const { openAi, openConsult } = useOverlays();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route-change close is handled by onClick on every nav link below
  // (avoids a setState-in-effect lint error); Escape/outside-click below.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [openMenu]);

  const scheduleOpen = (menu: "services" | "industries" | "work") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const toggle = (menu: "services" | "industries" | "work") => setOpenMenu((v) => (v === menu ? null : menu));

  const linkClass = "flex min-h-[48px] items-center rounded-xl px-3 py-2 text-[15px] font-medium text-[#0B1220] hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]";

  return (
    <>
      <header ref={navRef} className={cn("fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E7E9F2] transition-shadow", isScrolled && "shadow-[0_8px_30px_rgba(11,18,32,0.08)]")}>
        {/* Branded top bar — navy, tagline + direct contact, never a generic strip */}
        <div className="flex h-9 items-center bg-[#0B1220] text-white">
          <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
            <p className="truncate font-medium text-white/80">Software, built with thought, guided by AI. Led by CEO Muhammad Usman.</p>
            <div className="hidden shrink-0 items-center gap-4 md:flex">
              <a href={`mailto:${siteConfig.email}`} className="text-white/80 hover:text-white">{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="font-semibold text-[#2DD4BF] hover:text-white">{siteConfig.phone}</a>
            </div>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="shrink-0 font-semibold text-[#2DD4BF] md:hidden">{siteConfig.phone}</a>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-4">
            <Link href="/" aria-label="CraftThink — Home" className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]">
              <Image src="/images/brand/logo-mark.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-xl object-cover ring-1 ring-[#E7E9F2]" />
              <span className="font-display text-2xl font-bold tracking-tight"><span className="text-[#0B1220]">Craft</span><span className="text-[#4F46E5]">Think</span></span>
            </Link>

            <div className="relative hidden lg:block">
              <nav aria-label="Primary navigation" className="flex items-center gap-1">
                <div onMouseEnter={() => scheduleOpen("services")} onMouseLeave={scheduleClose}>
                  <button type="button" aria-haspopup="true" aria-expanded={openMenu === "services"} onClick={() => toggle("services")} className={cn(linkClass, "gap-1", openMenu === "services" && "bg-[#EEF2FF] text-[#4F46E5]")}>
                    Services <ChevronDown size={16} className={cn("transition-transform", openMenu === "services" && "rotate-180")} />
                  </button>
                </div>
                <div onMouseEnter={() => scheduleOpen("industries")} onMouseLeave={scheduleClose}>
                  <button type="button" aria-haspopup="true" aria-expanded={openMenu === "industries"} onClick={() => toggle("industries")} className={cn(linkClass, "gap-1", openMenu === "industries" && "bg-[#EEF2FF] text-[#4F46E5]")}>
                    Industries <ChevronDown size={16} className={cn("transition-transform", openMenu === "industries" && "rotate-180")} />
                  </button>
                </div>
                <div onMouseEnter={() => scheduleOpen("work")} onMouseLeave={scheduleClose}>
                  <button type="button" aria-haspopup="true" aria-expanded={openMenu === "work"} onClick={() => toggle("work")} className={cn(linkClass, "gap-1", openMenu === "work" && "bg-[#EEF2FF] text-[#4F46E5]")}>
                    Work <ChevronDown size={16} className={cn("transition-transform", openMenu === "work" && "rotate-180")} />
                  </button>
                </div>
                <Link href="/about" onClick={() => setOpenMenu(null)} className={linkClass}>About</Link>
                <Link href="/contact" onClick={() => setOpenMenu(null)} className={linkClass}>Contact</Link>
              </nav>

              {/* Industries / Work dropdowns render here, anchored to the nav.
                  The Services mega menu renders at header level below, full
                  width, centred on the page — not on the narrow nav. */}

              {openMenu === "industries" && (
                <div onMouseEnter={() => scheduleOpen("industries")} onMouseLeave={scheduleClose} className="absolute left-0 top-full z-50 w-72 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-[#E7E9F2] bg-white p-2 shadow-xl" role="menu">
                    <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-[#64748B]">Industries we serve</p>
                    {siteConfig.industriesDropdown.map((item) => (
                      <Link key={item.label + item.href} href={item.href} role="menuitem" onClick={() => setOpenMenu(null)} className="block min-h-[48px] rounded-xl px-3 py-3 text-base text-[#0B1220] hover:bg-[#EEF2FF] hover:text-[#4F46E5]">{item.label}</Link>
                    ))}
                    <Link href="/work" onClick={() => setOpenMenu(null)} className="mt-1 block min-h-[48px] rounded-xl bg-[#F6F7FB] px-3 py-3 text-base font-semibold text-[#4F46E5]">View all work →</Link>
                  </div>
                </div>
              )}
              {openMenu === "work" && (
                <div onMouseEnter={() => scheduleOpen("work")} onMouseLeave={scheduleClose} className="absolute left-0 top-full z-50 w-72 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-[#E7E9F2] bg-white p-2 shadow-xl" role="menu">
                    <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-[#64748B]">Featured projects</p>
                    {projects.map((item) => (
                      <Link key={item.slug} href={`/work/${item.slug}`} role="menuitem" onClick={() => setOpenMenu(null)} className="block min-h-[48px] rounded-xl px-3 py-3 text-base text-[#0B1220] hover:bg-[#EEF2FF] hover:text-[#4F46E5]">{item.title}</Link>
                    ))}
                    <Link href="/work" onClick={() => setOpenMenu(null)} className="mt-1 block min-h-[48px] rounded-xl bg-[#F6F7FB] px-3 py-3 text-base font-semibold text-[#4F46E5]">View all work →</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <Link href="/guide" aria-label="Search with the AI guide" className="flex h-11 w-11 items-center justify-center rounded-full text-[#475569] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"><Search size={19} /></Link>
              <button type="button" onClick={openAi} className="hidden min-h-[48px] items-center gap-2 rounded-full border border-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-[#4F46E5] hover:bg-[#EEF2FF] xl:flex"><span className="h-2 w-2 rounded-full bg-[#14B8A6]" /><Sparkles size={15} className="ct-sparkle text-[#14B8A6]" /> Ask AI</button>
              <Button size="sm" onClick={openConsult}>Book a Free Consultation</Button>
            </div>

            <button type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E7E9F2] text-[#0B1220] lg:hidden"><Menu size={22} /></button>
          </div>
        </div>

        {/* Services mega menu — FULL WIDTH, anchored to the header itself
            (not the narrow nav), so it is centred on the page. Hovering
            from the button into this panel keeps it open; it scrolls
            internally at 80vh so 9 groups never run off the screen. */}
        {openMenu === "services" && (
          <div onMouseEnter={() => scheduleOpen("services")} onMouseLeave={scheduleClose} className="absolute inset-x-0 top-full z-50 hidden lg:block">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
              <div className="ct-menu-in pt-3">
                <div className="flex justify-end pb-2">
                  <button type="button" onClick={() => setOpenMenu(null)} aria-label="Close services menu" className="flex min-h-[44px] items-center gap-1 rounded-full bg-white px-4 text-sm font-semibold text-[#0B1220] shadow-md ring-1 ring-[#E7E9F2] hover:text-[#4F46E5]">Close menu ✕</button>
                </div>
                <MegaMenu onClose={() => setOpenMenu(null)} />
              </div>
            </div>
          </div>
        )}
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
