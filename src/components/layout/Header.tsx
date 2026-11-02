"use client";

/**
 * Header.tsx — Sticky site header with mega menu and mobile hamburger.
 * - Transparent over hero area, turns solid white with shadow on scroll.
 * - Desktop: wordmark logo | nav links | right actions (Search, Ask AI, Book CTA)
 * - Mobile: wordmark logo | hamburger button
 * - Services nav item opens MegaMenu on hover + click/focus.
 * - Work nav item opens a simple dropdown.
 * - Keyboard accessible: Escape closes menus, focus visible on all controls.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const workButtonRef = useRef<HTMLButtonElement>(null);
  const workDropdownRef = useRef<HTMLDivElement>(null);

  // Detect scroll to switch header from transparent to solid
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close work dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        workDropdownRef.current &&
        !workDropdownRef.current.contains(e.target as Node) &&
        !workButtonRef.current?.contains(e.target as Node)
      ) {
        setWorkDropdownOpen(false);
      }
    }
    if (workDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [workDropdownOpen]);

  // Close mega menu when Escape is pressed (also handled inside MegaMenu)
  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);
  const closeWorkDropdown = useCallback(() => setWorkDropdownOpen(false), []);

  // Hover handlers for Services mega menu — desktop only
  function handleServicesMouseEnter() {
    setMegaMenuOpen(true);
  }
  function handleServicesMouseLeave(e: React.MouseEvent) {
    // Check if the pointer moved into the mega menu itself
    const related = e.relatedTarget as HTMLElement | null;
    if (related?.closest("#mega-menu-services")) return;
    setMegaMenuOpen(false);
  }
  function handleMegaMenuMouseLeave() {
    setMegaMenuOpen(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white shadow-sm border-b border-[#E7E9F2]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">

            {/* ── Wordmark Logo ──────────────────────────────────────────── */}
            <Link
              href="/"
              aria-label={`${siteConfig.agencyName} — Home`}
              className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-lg"
            >
              {/* CraftThink logo mark — generated brand image, designer can replace the file later */}
              <Image
                src="/images/brand/logo-mark.webp"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg object-cover"
              />
              {/* Wordmark: "Craft" navy, "Think" indigo */}
              <span className="text-xl font-bold tracking-tight select-none">
                <span className="text-[#0B1220]">Craft</span>
                <span className="text-[#4F46E5]">Think</span>
              </span>
            </Link>

            {/* ── Desktop Navigation ────────────────────────────────────── */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-1"
            >
              {/* Services — opens mega menu */}
              <div
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  ref={servicesButtonRef}
                  aria-haspopup="true"
                  aria-expanded={megaMenuOpen}
                  aria-controls="mega-menu-services"
                  onClick={() => setMegaMenuOpen((v) => !v)}
                  onFocus={() => setMegaMenuOpen(true)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium",
                    "text-[#0B1220] hover:text-[#4F46E5] hover:bg-[#EEF2FF]",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]",
                    megaMenuOpen && "text-[#4F46E5] bg-[#EEF2FF]"
                  )}
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      megaMenuOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>

              {/* Work — simple dropdown */}
              <div className="relative">
                <button
                  ref={workButtonRef}
                  aria-haspopup="true"
                  aria-expanded={workDropdownOpen}
                  onClick={() => setWorkDropdownOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium",
                    "text-[#0B1220] hover:text-[#4F46E5] hover:bg-[#EEF2FF]",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]",
                    workDropdownOpen && "text-[#4F46E5] bg-[#EEF2FF]"
                  )}
                >
                  Work
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      workDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Work dropdown */}
                {workDropdownOpen && (
                  <div
                    ref={workDropdownRef}
                    className="absolute top-full left-0 mt-1 w-44 rounded-xl border border-[#E7E9F2] bg-white py-1.5 shadow-lg"
                    role="menu"
                  >
                    {siteConfig.workDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={closeWorkDropdown}
                        className="block px-4 py-2.5 text-sm text-[#0B1220] hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4F46E5]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Static nav links */}
              {[
                { label: "Process", href: "/process" },
                { label: "About CEO", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-[15px] font-medium text-[#0B1220] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop Right Actions ──────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Search icon — opens the AI guide */}
              <Link
                href="/guide"
                aria-label="Search with the AI guide"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#475569] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                <Search size={18} />
              </Link>

              {/* Ask AI — opens the AI guide */}
              <Link
                href="/guide"
                aria-label="Ask the AI guide"
                className="hidden xl:flex items-center gap-1.5 rounded-full border border-[#4F46E5] px-4 py-2 text-sm font-semibold text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                Ask AI
              </Link>

              {/* Primary CTA */}
              <Button
                href="/contact"
                size="sm"
                id="header-book-consultation"
              >
                Book a Free Consultation
              </Button>
            </div>

            {/* ── Mobile Hamburger ──────────────────────────────────────── */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9F2] text-[#0B1220] hover:bg-[#F6F7FB] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            >
              <Menu size={20} />
            </button>

          </div>
        </div>

        {/* ── Mega Menu panel (desktop only) ──────────────────────────── */}
        <div
          onMouseLeave={handleMegaMenuMouseLeave}
          onMouseEnter={() => setMegaMenuOpen(true)}
        >
          <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
        </div>
      </header>

      {/* ── Mobile Full-screen Menu ──────────────────────────────────────── */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
