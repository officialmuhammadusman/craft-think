"use client";
/**
 * MobileMenu — full-screen menu in the GetYourGuide Profile style:
 * a dark-navy top bar across the full width, X in a grey circle
 * top-right, white panel below, flat icon rows with chevrons.
 * SINGLE-OPEN ACCORDION (user's rule: tap one group and it opens,
 * the previously opened group closes — only one group is ever
 * expanded). Groups: Services (all 11 real services, with their
 * one-line promise), Work (all 6 real projects, with industry +
 * line), Tools (the 4 real tools, with one plain line). Plain rows:
 * Process, About, Contact, Talk with Think. Pinned solid indigo
 * "Book a Free Consultation" button at the bottom.
 * Talk with Think: dispatches the same "craftthink:open-ai" event
 * the header uses and closes this menu, so the existing AI bottom
 * sheet opens on its own (the sheet sits below this menu's z-index,
 * so opening it over the still-open menu would hide it behind the
 * menu — closing first is the clean wiring, reported as such).
 * The sticky bottom CTA bar (z-[99]) is covered by this menu
 * (z-[100]) while open, so it never shows above the menu.
 * Body scroll locked, safe-area padding, Lenis opted out so the
 * menu list scrolls natively. Closes on link click, Escape, X.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown, LayoutGrid, Briefcase, Workflow, User, Mail, Sparkles, CalendarDays, Wrench } from "lucide-react";
import { projects, services } from "@/data/content";
import { cn } from "@/lib/utils";

type GroupKey = "services" | "work" | "tools" | null;

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<GroupKey>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Single-open: opening a group closes any previously opened one;
  // tapping the open group again collapses it.
  const toggle = (key: Exclude<GroupKey, null>) =>
    setExpanded((prev) => (prev === key ? null : key));

  const talkWithThink = () => {
    onClose();
    window.dispatchEvent(new CustomEvent("craftthink:open-ai"));
  };

  const groupButton = (key: Exclude<GroupKey, null>, label: string, Icon: typeof LayoutGrid) => (
    <button
      type="button"
      onClick={() => toggle(key)}
      aria-expanded={expanded === key}
      className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Icon size={20} /></span>
      <span className="flex-1 text-left">{label}</span>
      <ChevronDown size={18} className={cn("shrink-0 text-[#64748B] transition-transform", expanded === key && "rotate-180")} />
    </button>
  );

  return (
    <div id="mobile-menu" aria-label="Mobile navigation" data-lenis-prevent className="fixed inset-0 z-[100] flex flex-col overscroll-contain bg-white lg:hidden">
      {/* Dark-navy top bar — GetYourGuide Profile style */}
      <div className="flex items-center justify-between gap-3 bg-[#0B1220] px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <p className="text-base font-bold text-white">Menu</p>
        <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"><X size={22} /></button>
      </div>

      <nav aria-label="Main navigation" data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {/* Services accordion — all 11, with promise lines */}
        {groupButton("services", "Services", LayoutGrid)}
        <div className={cn("overflow-hidden transition-all duration-200", expanded === "services" ? "max-h-[1400px] opacity-100" : "max-h-0 opacity-0")}>
          <ul className="flex flex-col gap-0.5 pb-2 pl-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} onClick={onClose} className="block min-h-[56px] rounded-xl px-3 py-2.5 hover:bg-[#EEF2FF]">
                  <span className="block text-base font-semibold text-[#0B1220]">{s.title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-[#475569]">{s.line}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" onClick={onClose} className="flex min-h-[48px] items-center rounded-xl px-3 text-base font-semibold text-[#4F46E5]">View all 11 services →</Link>
            </li>
          </ul>
        </div>

        {/* Work accordion — all 6, with industry + line */}
        {groupButton("work", "Work", Briefcase)}
        <div className={cn("overflow-hidden transition-all duration-200", expanded === "work" ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0")}>
          <ul className="flex flex-col gap-0.5 pb-2 pl-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} onClick={onClose} className="block min-h-[56px] rounded-xl px-3 py-2.5 hover:bg-[#EEF2FF]">
                  <span className="block text-base font-semibold text-[#0B1220]">{p.title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-[#475569]">{p.industryLabel} · {p.line}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/work" onClick={onClose} className="flex min-h-[48px] items-center rounded-xl px-3 text-base font-semibold text-[#4F46E5]">View all work →</Link>
            </li>
          </ul>
        </div>

        {/* Tools accordion — the 4 real tools, with plain lines */}
        {groupButton("tools", "Tools", Wrench)}
        <div className={cn("overflow-hidden transition-all duration-200", expanded === "tools" ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0")}>
          <ul className="flex flex-col gap-0.5 pb-2 pl-1">
            {[
              { title: "Talk with Think", href: "/guide", line: "Ask in plain words — guided to the right service and project.", action: true },
              { title: "Get an Estimate", href: "/estimate", line: "Tell us what you need and get a written estimate.", action: false },
              { title: "Free Software Audit", href: "/audit", line: "A free check of your existing software — what is slow or broken.", action: false },
              { title: "FAQ", href: "/faq", line: "Plain answers to common questions, no jargon.", action: false },
            ].map((t) => (
              <li key={t.href}>
                {t.action ? (
                  <button type="button" onClick={talkWithThink} className="block min-h-[56px] w-full rounded-xl px-3 py-2.5 text-left hover:bg-[#EEF2FF]">
                    <span className="flex items-center gap-1.5 text-base font-semibold text-[#0B1220]">{t.title} <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /></span>
                    <span className="mt-0.5 block text-sm leading-snug text-[#475569]">{t.line}</span>
                  </button>
                ) : (
                  <Link href={t.href} onClick={onClose} className="block min-h-[56px] rounded-xl px-3 py-2.5 hover:bg-[#EEF2FF]">
                    <span className="block text-base font-semibold text-[#0B1220]">{t.title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-[#475569]">{t.line}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Plain rows */}
        {[
          { label: "Process", href: "/process", icon: Workflow },
          { label: "About", href: "/about", icon: User },
          { label: "Contact", href: "/contact", icon: Mail },
        ].map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className="flex min-h-[56px] items-center gap-3 rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><link.icon size={20} /></span>
            {link.label}
          </Link>
        ))}
        <button type="button" onClick={talkWithThink} className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Sparkles size={20} /></span>
          <span className="flex flex-1 items-center gap-1.5 text-left">Talk with Think <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /></span>
        </button>
      </nav>

      {/* Pinned booking button */}
      <div className="border-t border-[#E7E9F2] bg-white px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Link href="/consultation" onClick={onClose} className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-4 text-base font-semibold text-white shadow-lg">
          <CalendarDays size={18} /> Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}
