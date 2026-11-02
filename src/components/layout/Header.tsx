"use client";
/**
 * Header — SLIM: always solid white, 72px, five nav items + one CTA.
 * Services mega menu, Work dropdown, Process, About, Contact, and a
 * single "Book a Free Consultation" action. No top bar, no search icon,
 * no Ask AI pill in the header (the AI entry lives on the /guide page
 * and the floating AI button). Hover intent + click, Escape +
 * outside-click close, route change closes, no flicker: a single
 * wrapper owns open state and the panel renders inside it.
 * Wordmark: flat indigo — "Craft" dark navy, "Think" solid #4F46E5.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { projects } from "@/data/content";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { useOverlays } from "@/components/layout/Overlays";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "work" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { openConsult } = useOverlays();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const scheduleOpen = (menu: "services" | "work") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const toggle = (menu: "services" | "work") => setOpenMenu((v) => (v === menu ? null : menu));

  const linkClass = "flex min-h-[48px] items-center rounded-xl px-3 py-2 text-[15px] font-medium text-[#0B1220] hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]";

  return (
    <>
      <header ref={navRef} className={cn("fixed inset-x-0 top-0 z-50 border-b border-[#E7E9F2] bg-white/95 backdrop-blur transition-shadow", isScrolled && "shadow-[0_8px_30px_rgba(11,18,32,0.08)]")}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-4">
            <Link href="/" aria-label="CraftThink — Home" className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]">
              <LogoMark size={44} className="h-11 w-11 rounded-xl object-cover ring-1 ring-[#E7E9F2]" />
              <span className="font-display text-2xl font-bold tracking-tight"><span className="text-[#0B1220]">Craft</span><span className="text-[#4F46E5]">Think</span></span>
            </Link>

            <div className="relative hidden lg:block">
              <nav aria-label="Primary navigation" className="flex items-center gap-1">
                <div onMouseEnter={() => scheduleOpen("services")} onMouseLeave={scheduleClose}>
                  <button type="button" aria-haspopup="true" aria-expanded={openMenu === "services"} onClick={() => toggle("services")} className={cn(linkClass, "gap-1", openMenu === "services" && "bg-[#EEF2FF] text-[#4F46E5]")}>
                    Services <ChevronDown size={16} className={cn("transition-transform", openMenu === "services" && "rotate-180")} />
                  </button>
                </div>
                <div onMouseEnter={() => scheduleOpen("work")} onMouseLeave={scheduleClose}>
                  <button type="button" aria-haspopup="true" aria-expanded={openMenu === "work"} onClick={() => toggle("work")} className={cn(linkClass, "gap-1", openMenu === "work" && "bg-[#EEF2FF] text-[#4F46E5]")}>
                    Work <ChevronDown size={16} className={cn("transition-transform", openMenu === "work" && "rotate-180")} />
                  </button>
                </div>
                <Link href="/process" onClick={() => setOpenMenu(null)} className={linkClass}>Process</Link>
                <Link href="/about" onClick={() => setOpenMenu(null)} className={linkClass}>About</Link>
                <Link href="/contact" onClick={() => setOpenMenu(null)} className={linkClass}>Contact</Link>
              </nav>

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
              <Button size="sm" onClick={openConsult}>Book a Free Consultation</Button>
            </div>

            <button type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E7E9F2] text-[#0B1220] lg:hidden"><Menu size={22} /></button>
          </div>
        </div>

        {openMenu === "services" && (
          <div onMouseEnter={() => scheduleOpen("services")} onMouseLeave={scheduleClose} className="absolute inset-x-0 top-full z-50 hidden lg:block">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
              <div className="ct-menu-in pt-3">
                {/* Single close control lives inside MegaMenu (its X button). */}
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
