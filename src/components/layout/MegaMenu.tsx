"use client";
/**
 * MegaMenu — presentational panel only. The Header owns open/close state,
 * hover intent, Escape and outside-click, so this panel never fights the
 * button (the old version closed itself when the Services button was
 * clicked, which caused flicker). Full-width, 3 service columns +
 * a dark featured panel, plus an "All services" footer row.
 */
import Link from "next/link";
import { Monitor, Briefcase, ShoppingCart, Smartphone, Users, CalendarCheck, UserCheck, Palette, Bot, Wrench, ShieldCheck, ArrowRight, Mail, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const iconMap = { Monitor, Briefcase, ShoppingCart, Smartphone, Users, CalendarCheck, UserCheck, Palette, Bot, Wrench, ShieldCheck } as const;
type IconName = keyof typeof iconMap;

export function MegaMenu({ onClose }: { onClose: () => void }) {
  const { columns, featured } = siteConfig.megaMenu;
  return (
    <div id="mega-menu-services" role="region" aria-label="Services menu" className="overflow-hidden rounded-[24px] border border-[#E7E9F2] bg-white shadow-2xl">
      <div className="grid lg:grid-cols-[1fr_1fr_1fr_320px]">
        {columns.map((col) => (
          <div key={col.heading} className="border-b border-[#E7E9F2] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#64748B]">{col.heading}</p>
            <ul className="flex flex-col gap-1">
              {col.items.map((item) => {
                const Icon = iconMap[item.icon as IconName];
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={onClose} className="group flex min-h-[64px] items-start gap-3 rounded-2xl p-3 hover:bg-[#EEF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5] transition-colors group-hover:bg-[#4F46E5] group-hover:text-white">{Icon && <Icon size={19} strokeWidth={1.75} />}</span>
                      <span>
                        <span className="block text-base font-semibold leading-snug text-[#0B1220] group-hover:text-[#4F46E5]">{item.title}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-[#64748B]">{item.description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-4 bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-6 text-white">
          <Link href="/guide" onClick={onClose} className="flex items-center gap-2 rounded-lg text-base font-semibold text-[#14B8A6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]">
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
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 break-all hover:text-white"><Mail size={14} className="shrink-0" />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white"><Phone size={14} className="shrink-0" />{siteConfig.phone}</a>
          </div>
        </div>
      </div>
      <Link href="/services" onClick={onClose} className="flex min-h-[56px] items-center justify-between bg-[#F6F7FB] px-6 py-3 text-base font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]">
        View all 11 services <ArrowRight size={18} />
      </Link>
    </div>
  );
}
