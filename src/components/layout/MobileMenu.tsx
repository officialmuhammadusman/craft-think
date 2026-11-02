"use client";
/**
 * MobileMenu — full-screen, app-like. Real search form at the top
 * (routes to /guide?q=, the old version was a non-working grey pill),
 * service accordions, plain nav links, contact row, and a sticky CTA
 * bar pinned to the bottom of the panel (not floating over content).
 * Closes on link click, Escape, and the close button. Body scroll locked.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ChevronDown, Search, Mail, Phone, Globe, Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useOverlays } from "@/components/layout/Overlays";
import { megaMenuGroups, industries } from "@/data/offering";


export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("AI Transformation");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { openAi, openConsult } = useOverlays();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    router.push(query.trim() ? `/guide?q=${encodeURIComponent(query.trim())}` : "/guide");
  };

  return (
    <div ref={menuRef} id="mobile-menu" aria-label="Mobile navigation" className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden">
      <div className="flex items-center gap-3 border-b border-[#E7E9F2] px-4 py-3">
        <form onSubmit={search} className="flex min-h-[48px] flex-1 items-center gap-2 rounded-full bg-[#F6F7FB] px-4">
          <Search size={18} className="shrink-0 text-[#64748B]" />
          <label className="sr-only" htmlFor="mobile-search">Search services or ask the AI guide</label>
          <input id="mobile-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you need help with?" className="min-w-0 flex-1 bg-transparent text-base text-[#0B1220] outline-none placeholder:text-[#64748B]" />
          <button type="submit" className="shrink-0 text-base font-semibold text-[#4F46E5]">Ask AI</button>
        </form>
        <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E7E9F2] text-[#0B1220]"><X size={22} /></button>
      </div>

      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-[#64748B]">Explore our offering</p>
        {megaMenuGroups.map((group) => (
          <div key={group.title} className="mb-1">
            <button type="button" onClick={() => setExpandedGroup((p) => (p === group.title ? null : group.title))} aria-expanded={expandedGroup === group.title} className="flex min-h-[52px] w-full items-center justify-between rounded-xl px-3 text-base font-semibold text-[#0B1220] hover:bg-[#F6F7FB]">
              {group.title}
              <ChevronDown size={18} className={cn("text-[#64748B] transition-transform", expandedGroup === group.title && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-200", expandedGroup === group.title ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0")}>
              <p className="px-3 pb-1 text-sm leading-snug text-[#64748B]">{group.description}</p>
              <ul className="flex flex-col gap-0.5 pb-2 pl-1">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} onClick={onClose} className="flex min-h-[52px] items-center rounded-xl px-3 py-2 text-base text-[#0B1220] hover:bg-[#EEF2FF]">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <p className="mb-2 mt-4 px-2 text-xs font-bold uppercase tracking-widest text-[#64748B]">Industries</p>
        <ul className="flex flex-col gap-0.5">
          {industries.map((ind) => (
            <li key={ind.label}><Link href={ind.href} onClick={onClose} className="flex min-h-[52px] items-center rounded-xl px-3 text-base font-medium text-[#0B1220] hover:bg-[#F6F7FB]">{ind.label}</Link></li>
          ))}
        </ul>
        <div className="my-4 border-t border-[#E7E9F2]" />
        <ul className="flex flex-col gap-0.5">
          {[{ label: "Work", href: "/work" }, { label: "Process", href: "/process" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "AI Guide", href: "/guide" }, { label: "Get an Estimate", href: "/estimate" }, { label: "Free Audit", href: "/audit" }, { label: "FAQ", href: "/faq" }].map((link) => (
            <li key={link.href}><Link href={link.href} onClick={onClose} className="flex min-h-[52px] items-center rounded-xl px-3 text-base font-medium text-[#0B1220] hover:bg-[#F6F7FB]">{link.label}</Link></li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-3 px-3 pb-4">
          <a href={`mailto:${siteConfig.email}`} className="flex min-h-[48px] items-center gap-2 break-all text-base text-[#475569]"><Mail size={17} className="shrink-0" />{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex min-h-[48px] items-center gap-2 text-base text-[#475569]"><Phone size={17} className="shrink-0" />{siteConfig.phone}</a>
          <div className="flex flex-col gap-2 pt-1">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#0B1220]"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9F2] text-[#475569]"><Globe size={18} /></span>LinkedIn</a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#0B1220]"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9F2] text-[#475569]"><Code2 size={18} /></span>GitHub</a>
          </div>
        </div>
      </nav>

      <div className="border-t border-[#E7E9F2] bg-white px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <button type="button" onClick={() => { onClose(); openConsult(); }} className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#4F46E5] px-4 text-base font-semibold text-white shadow-lg">Book a Free Consultation</button>
        <button type="button" onClick={() => { onClose(); openAi(); }} className="mt-2 flex min-h-[52px] w-full items-center justify-center rounded-full border border-[#E7E9F2] px-4 text-base font-semibold text-[#0B1220]">Ask the AI Guide — free</button>
      </div>
    </div>
  );
}
