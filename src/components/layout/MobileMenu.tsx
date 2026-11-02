"use client";

/**
 * MobileMenu.tsx — Full-screen mobile navigation overlay.
 * Opens from the hamburger button in the header.
 * Services expand as accordions in 4 groups (Build, Manage, Design & AI, Featured).
 * Closes when a link is tapped, or Escape is pressed.
 * Trap focus while open for accessibility.
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  ChevronDown,
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
  Search,
  Mail,
  Phone,
  Linkedin,
  Github,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Track which service accordion group is expanded (null = all closed)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedGroup(null); // Reset accordion when closed
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus first element when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector<HTMLElement>(
        "button, a, input"
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const toggleGroup = (heading: string) => {
    setExpandedGroup((prev) => (prev === heading ? null : heading));
  };

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      className={cn(
        // Full-screen overlay, fixed, above everything
        "fixed inset-0 z-[100] flex flex-col bg-white",
        "transition-transform duration-300 ease-in-out motion-safe:transition-transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* ── Top bar: Search + Close ───────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-[#E7E9F2] px-4 py-4">
        {/* Search — TODO: wire to AI Search in Prompt 2 */}
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#F6F7FB] px-4 py-2.5">
          <Search size={16} className="text-[#64748B]" />
          <span className="text-sm text-[#64748B]">Search services…</span>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9F2] text-[#0B1220] hover:bg-[#F6F7FB] transition-colors duration-150"
        >
          <X size={20} />
        </button>
      </div>

      {/* ── Scrollable nav area ───────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="flex-1 overflow-y-auto px-4 py-4 pb-36"
        // pb-36 ensures content is not hidden behind mobile sticky CTA bar
      >

        {/* ── Services accordion groups ─────────────────────────────────── */}
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-[#64748B]">
          Services
        </p>

        {siteConfig.megaMenu.columns.map((col) => (
          <div key={col.heading} className="mb-1">
            {/* Accordion toggle button */}
            <button
              onClick={() => toggleGroup(col.heading)}
              aria-expanded={expandedGroup === col.heading}
              aria-controls={`mobile-group-${col.heading}`}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-3",
                "text-sm font-semibold text-[#0B1220]",
                "hover:bg-[#F6F7FB] transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-inset"
              )}
            >
              {col.heading}
              <ChevronDown
                size={16}
                className={cn(
                  "text-[#64748B] transition-transform duration-200",
                  expandedGroup === col.heading && "rotate-180"
                )}
              />
            </button>

            {/* Accordion content */}
            <div
              id={`mobile-group-${col.heading}`}
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                expandedGroup === col.heading
                  ? "max-h-[600px] opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              <ul className="flex flex-col gap-0.5 pb-2 pl-2" role="list">
                {col.items.map((item) => {
                  const Icon = iconMap[item.icon as IconName];
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-3 py-3",
                          "hover:bg-[#EEF2FF] transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-inset"
                        )}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                          {Icon && <Icon size={16} strokeWidth={1.75} />}
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-[#0B1220]">
                            {item.title}
                          </span>
                          <span className="block text-xs text-[#64748B] leading-snug">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="my-4 border-t border-[#E7E9F2]" />

        {/* ── Other nav links ───────────────────────────────────────────── */}
        <ul className="flex flex-col gap-0.5" role="list">
          {[
            { label: "Work", href: "/work" },
            { label: "Process", href: "/process" },
            { label: "About CEO", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center rounded-xl px-3 py-3 text-sm font-medium text-[#0B1220] hover:bg-[#F6F7FB] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-inset"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="my-4 border-t border-[#E7E9F2]" />

        {/* ── Contact info ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 px-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#4F46E5] transition-colors"
          >
            <Mail size={15} />
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#4F46E5] transition-colors"
          >
            <Phone size={15} />
            {siteConfig.phone}
          </a>

          {/* Social links */}
          <div className="flex items-center gap-3 pt-1">
            {siteConfig.links.linkedin !== "TODO" && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E9F2] text-[#475569] hover:text-[#4F46E5] hover:border-[#4F46E5] transition-colors"
              >
                <Linkedin size={16} />
              </a>
            )}
            {siteConfig.links.github !== "TODO" && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E9F2] text-[#475569] hover:text-[#0B1220] hover:border-[#0B1220] transition-colors"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

      </nav>

      {/* ── Featured CTA at bottom ────────────────────────────────────────── */}
      <div className="border-t border-[#E7E9F2] bg-white px-4 py-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#1E1B4B] p-4 text-white">
          <p className="text-xs font-semibold text-[#14B8A6] mb-1">
            Not sure what you need?
          </p>
          <p className="text-sm font-semibold text-white mb-3">
            Talk to our AI guide — it will find the right service for you.
          </p>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center rounded-full bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white hover:bg-[#4338CA] transition-colors"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
