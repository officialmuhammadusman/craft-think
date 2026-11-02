"use client";
/**
 * MegaMenu — presentational panel only. The Header owns open/close state,
 * hover intent, Escape and outside-click, so this panel never fights the
 * button. Structure mirrors the offering pattern: 9 offering groups
 * (CraftThink's own services, regrouped) in a full-width panel, plus a
 * dark featured panel. No ScienceSoft text, stats or trademarks.
 */
import Link from "next/link";
import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { offeringGroups } from "@/data/offering";

export function MegaMenu({ onClose }: { onClose: () => void }) {
  const { featured } = siteConfig.megaMenu;
  return (
    <div id="mega-menu-services" role="region" aria-label="Services menu" className="overflow-hidden rounded-[24px] border border-[#E7E9F2] bg-white shadow-2xl">
      <div className="grid lg:grid-cols-[1fr_300px]">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3">
          {offeringGroups.map((group) => (
            <div key={group.title} className="border-b border-[#E7E9F2] p-5 sm:p-6">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#64748B]">{group.title}</p>
              <p className="mb-3 text-sm leading-snug text-[#475569]">{group.description}</p>
              <ul className="flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} onClick={onClose} className="flex min-h-[48px] items-center rounded-xl px-3 py-2 text-base font-medium text-[#0B1220] hover:bg-[#EEF2FF] hover:text-[#4F46E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-6 text-white">
          <Link href="/guide" onClick={onClose} className="flex min-h-[48px] items-center gap-2 rounded-lg text-base font-semibold text-[#14B8A6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]">
            <Sparkles size={17} /> {featured.aiPrompt}
          </Link>
          <div className="border-t border-white/10 pt-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">Featured work</p>
            <Link href={featured.caseStudyHref} onClick={onClose} className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <p className="text-base font-semibold leading-snug text-white">{featured.caseStudyTitle}</p>
              <p className="mt-1 text-sm leading-snug text-white/60">{featured.caseStudyDescription}</p>
            </Link>
          </div>
          <Link href={featured.ctaHref} onClick={onClose} className="mt-auto inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#4F46E5] px-4 py-3 text-base font-semibold text-white hover:bg-[#4338CA]">{featured.ctaLabel}</Link>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-3 text-sm text-white/60">
            <a href={`mailto:${siteConfig.email}`} className="flex min-h-[48px] items-center gap-2 break-all hover:text-white"><Mail size={14} className="shrink-0" />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex min-h-[48px] items-center gap-2 hover:text-white"><Phone size={14} className="shrink-0" />{siteConfig.phone}</a>
          </div>
        </div>
      </div>
      <Link href="/services" onClick={onClose} className="flex min-h-[56px] items-center justify-between bg-[#F6F7FB] px-6 py-3 text-base font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]">
        View all 11 services <ArrowRight size={18} />
      </Link>
    </div>
  );
}
