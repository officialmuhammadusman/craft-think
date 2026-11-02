"use client";

/**
 * MegaMenu.tsx — Full-width desktop services mega menu.
 * Opens on hover or focus of the "Services" nav item.
 * 4 columns: Build, Manage, Design & AI, Featured.
 * Closes on Escape key or click outside.
 * Fade + slide-down animation (200ms) — respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Monitor,
  Briefcase,
  ShoppingCart,
  Smartphone,
  Users,
  CalendarCheck,
  UserCheck,
  Palette,
  Bot,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Map icon name strings from config to actual Lucide components
const iconMap = {
  Monitor,
  Briefcase,
  ShoppingCart,
  Smartphone,
  Users,
  CalendarCheck,
  UserCheck,
  Palette,
  Bot,
  Wrench,
  ShieldCheck,
} as const;

type IconName = keyof typeof iconMap;

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when clicking outside the menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const { columns, featured } = siteConfig.megaMenu;

  return (
    <div
      ref={menuRef}
      id="mega-menu-services"
      role="region"
      aria-label="Services menu"
      className={cn(
        // Position: full width, below header
        "absolute left-0 right-0 top-full z-50",
        "bg-white border-b border-[#E7E9F2] shadow-xl",
        // Transition: fade + slide — respects prefers-reduced-motion via CSS
        "transition-all duration-200 ease-out origin-top",
        "motion-safe:transition-all",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-4 gap-8">

          {/* Columns 1–3: Build, Manage, Design & AI */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#64748B]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-1" role="list">
                {col.items.map((item) => {
                  const Icon = iconMap[item.icon as IconName];
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-start gap-3 rounded-xl p-3",
                          "hover:bg-[#EEF2FF] transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-inset"
                        )}
                      >
                        {/* Icon container */}
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors duration-150">
                          {Icon && <Icon size={18} strokeWidth={1.75} />}
                        </span>
                        {/* Text */}
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-[#0B1220] group-hover:text-[#4F46E5] transition-colors duration-150">
                            {item.title}
                          </span>
                          <span className="text-xs text-[#64748B] leading-snug mt-0.5">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Column 4: Featured panel */}
          <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-5 text-white">
            {/* AI prompt link — teal accent (AI only) */}
            <Link
              href="/services/ai-solutions"
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-semibold text-[#14B8A6] hover:text-[#06B6D4] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] rounded"
            >
              {featured.aiPrompt}
              <ArrowRight size={14} />
            </Link>

            {/* Case study snippet */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
                Featured Work
              </p>
              <Link
                href={featured.caseStudyHref}
                onClick={onClose}
                className="group block hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                <p className="font-semibold text-white text-sm leading-snug">
                  {featured.caseStudyTitle}
                </p>
                <p className="text-xs text-white/60 mt-1 leading-snug">
                  {featured.caseStudyDescription}
                </p>
              </Link>
            </div>

            {/* CTA button */}
            <Link
              href={featured.ctaHref}
              onClick={onClose}
              className="mt-auto inline-flex items-center justify-center rounded-full bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {featured.ctaLabel}
            </Link>

            {/* Contact details */}
            <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
              >
                <Mail size={12} />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
              >
                <Phone size={12} />
                {siteConfig.phone}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
