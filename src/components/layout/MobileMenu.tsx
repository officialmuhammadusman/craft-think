"use client";
/**
 * MobileMenu — PHONE ONLY (lg:hidden). Full-screen menu in the
 * GetYourGuide Profile style: a dark-navy top bar across the full
 * width, X in a grey circle top-right, white panel below, pinned
 * solid indigo "Book a Free Consultation" button at the bottom.
 *
 * DRILL-DOWN menu (replaces the old single-open accordions):
 * the main view lists Services ▸, Work ▸, Process, About, Contact
 * and Talk with Think — NO Tools group (user-requested removal;
 * Estimate/Audit/FAQ stay reachable on desktop, in the footer and
 * on the sticky bar). Tapping Services or Work opens a second
 * panel that SLIDES IN FROM RIGHT TO LEFT like a drawer, covering
 * the main menu, with its own top bar (← Back, centred title, X).
 * Back returns to the main menu (panel slides back out to the
 * right); X or any link closes the whole menu.
 *
 * Each drill-down panel also carries a small help card at its top:
 * Services → "Not sure what you need? Talk with Think" (opens the
 * existing AI sheet, closing the menu first, as before); Work →
 * "Want work like this? Book a free consultation" (link).
 * Body scroll locked while any view is open; drill lists scroll
 * natively (data-lenis-prevent + overscroll-contain).
 * Desktop header is untouched by this file.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight, ArrowLeft, LayoutGrid, Briefcase, Workflow, User, Mail, Sparkles, CalendarDays } from "lucide-react";
import { projects, services } from "@/data/content";

type View = "main" | "services" | "work";

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [view, setView] = useState<View>("main");

  // Reset to the main view on every close path, so the next open
  // always starts at the main view (no setState inside the effect).
  const closeAll = () => { setView("main"); onClose(); };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const talkWithThink = () => {
    closeAll();
    window.dispatchEvent(new CustomEvent("craftthink:open-ai"));
  };

  const drillButton = (target: Exclude<View, "main">, label: string, Icon: typeof LayoutGrid) => (
    <button
      type="button"
      onClick={() => setView(target)}
      className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Icon size={20} /></span>
      <span className="flex-1 text-left">{label}</span>
      <ChevronRight size={18} className="shrink-0 text-[#64748B]" />
    </button>
  );

  const plainRow = (label: string, href: string, Icon: typeof LayoutGrid) => (
    <Link href={href} onClick={closeAll} className="flex min-h-[56px] items-center gap-3 rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Icon size={20} /></span>
      {label}
    </Link>
  );

  return (
    <div id="mobile-menu" aria-label="Mobile navigation" data-lenis-prevent className="fixed inset-0 z-[100] flex flex-col overflow-hidden overscroll-contain bg-white lg:hidden">
      {/* Dark-navy top bar — GetYourGuide Profile style */}
      <div className="flex items-center justify-between gap-3 bg-[#0B1220] px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <p className="text-base font-bold text-white">Menu</p>
        <button type="button" onClick={closeAll} aria-label="Close menu" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"><X size={22} /></button>
      </div>

      {/* MAIN VIEW */}
      <nav aria-label="Main navigation" data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {drillButton("services", "Services", LayoutGrid)}
        {drillButton("work", "Work", Briefcase)}
        {plainRow("Process", "/process", Workflow)}
        {plainRow("About", "/about", User)}
        {plainRow("Contact", "/contact", Mail)}
        <button type="button" onClick={talkWithThink} className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Sparkles size={20} /></span>
          <span className="flex flex-1 items-center gap-1.5 text-left">Talk with Think <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /></span>
        </button>
      </nav>

      {/* Pinned booking button — main view only */}
      <div className="border-t border-[#E7E9F2] bg-white px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Link href="/consultation" onClick={closeAll} className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-4 text-base font-semibold text-white shadow-lg">
          <CalendarDays size={18} /> Book a Free Consultation
        </Link>
      </div>

      {/* DRILL-DOWN PANEL — slides in from right to left, covers main view */}
      {view !== "main" && (
        <div className="ct-drawer-in absolute inset-0 z-10 flex flex-col bg-white" role="dialog" aria-label={view === "services" ? "Services" : "Work"}>
          {/* Drill top bar: Back left, title centred, X right */}
          <div className="flex items-center gap-3 bg-[#0B1220] px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
            <button type="button" onClick={() => setView("main")} aria-label="Back to menu" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"><ArrowLeft size={22} /></button>
            <p className="flex-1 text-center text-base font-bold text-white">{view === "services" ? "Services" : "Work"}</p>
            <button type="button" onClick={closeAll} aria-label="Close menu" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"><X size={22} /></button>
          </div>

          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {/* Help card at the top of each drill panel */}
            {view === "services" ? (
              <div className="rounded-[20px] border border-[#E7E9F2] bg-[#EEF2FF] p-5">
                <p className="text-base font-bold text-[#0B1220]">Not sure what you need?</p>
                <p className="mt-1 text-sm leading-snug text-[#475569]">Talk with Think — it guides you to the right service.</p>
                <button type="button" onClick={talkWithThink} className="mt-3 flex min-h-[48px] items-center gap-1.5 rounded-full bg-[#4F46E5] px-5 text-base font-semibold text-white">Talk with Think <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /></button>
              </div>
            ) : (
              <div className="rounded-[20px] border border-[#E7E9F2] bg-[#EEF2FF] p-5">
                <p className="text-base font-bold text-[#0B1220]">Want work like this?</p>
                <p className="mt-1 text-sm leading-snug text-[#475569]">Book a free consultation and we will show you the plan.</p>
                <Link href="/consultation" onClick={closeAll} className="mt-3 flex min-h-[48px] w-fit items-center rounded-full bg-[#4F46E5] px-5 text-base font-semibold text-white">Book a Free Consultation</Link>
              </div>
            )}

            {view === "services" ? (
              <ul className="mt-4 flex flex-col gap-0.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} onClick={closeAll} className="block min-h-[56px] rounded-xl px-3 py-2.5 hover:bg-[#EEF2FF]">
                      <span className="block text-base font-semibold text-[#0B1220]">{s.title}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-[#475569]">{s.line}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" onClick={closeAll} className="flex min-h-[48px] items-center rounded-xl px-3 text-base font-semibold text-[#4F46E5]">View all services →</Link>
                </li>
              </ul>
            ) : (
              <ul className="mt-4 flex flex-col gap-0.5">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/work/${p.slug}`} onClick={closeAll} className="block min-h-[56px] rounded-xl px-3 py-2.5 hover:bg-[#EEF2FF]">
                      <span className="block text-base font-semibold text-[#0B1220]">{p.title}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-[#475569]">{p.industryLabel} · {p.line}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/work" onClick={closeAll} className="flex min-h-[48px] items-center rounded-xl px-3 text-base font-semibold text-[#4F46E5]">View all work →</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
