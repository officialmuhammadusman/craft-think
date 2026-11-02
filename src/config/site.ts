/**
 * site.ts — Single source of truth for all site-wide configuration.
 * Change the agency name, domain, email, phone, or menu text here ONLY.
 * Every component imports from this file; nothing is hard-coded in pages.
 */

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  // FINAL NAME decided 2026-11-02. Changing agencyName updates logo, header,
  // footer, and <title> everywhere.
  agencyName: "CraftThink",
  // FINAL domain checked available 2026-11-02 via RDAP.
  // Do NOT use craftthink.com — registered since 2018, parked, expires 2027-07-17.
  domain: "craftthink.dev",
  tagline: "Working remotely with clients worldwide.",
  description:
    "A global remote software house for websites, apps, business systems, and AI — working remotely with clients worldwide.",

  // ── Contact ───────────────────────────────────────────────────────────────
  email: "official.muhammadusman01@gmail.com",
  phone: "+92 313 526 3300",

  // ── Leadership ────────────────────────────────────────────────────────────
  ceoName: "Muhammad Usman",
  ceoTitle: "CEO & Founder",

  // ── External Links ────────────────────────────────────────────────────────
  // TODO: Replace "TODO" values once profiles are set up.
  links: {
    fiverr: "TODO",
    upwork: "TODO",
    linkedin: "https://linkedin.com/in/muhammadusman-webdev",
    github: "https://github.com/officialmuhammadusman",
    booking: "TODO", // TODO: Add Calendly / Cal.com link in Prompt 2
  },

  // ── Primary Navigation ────────────────────────────────────────────────────
  // Used by Header.tsx and MobileMenu.tsx.
  // Items with `hasMegaMenu: true` open the full mega menu panel.
  nav: [
    { label: "Services", href: "/services", hasMegaMenu: true },
    { label: "Industries", href: "/work", hasDropdown: true },
    { label: "Work", href: "/work", hasDropdown: true },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // ── Industries Dropdown ───────────────────────────────────────────────
  // Mirrors src/data/offering.ts industries; Process stays in footer/mobile.
  industriesDropdown: [
    { label: "Healthcare", href: "/work?industry=healthcare" },
    { label: "Finance & Business", href: "/work?industry=business" },
    { label: "HR & Staff", href: "/work?industry=business" },
    { label: "Sports & Clubs", href: "/work?industry=sports" },
    { label: "SaaS & Digital Products", href: "/work?industry=saas" },
    { label: "Travel & Tourism", href: "/work?industry=travel" },
  ],

  // ── Services Mega Menu ────────────────────────────────────────────────────
  // 4 columns: Build, Manage, Design & AI, Featured.
  // Each item: icon name (Lucide), title, href, description (one plain line, no jargon).
  megaMenu: {
    columns: [
      {
        heading: "Build",
        items: [
          {
            icon: "Monitor",
            title: "Website Design & Development",
            href: "/services/website-design",
            description: "A fast, beautiful website that brings you customers.",
          },
          {
            icon: "Briefcase",
            title: "Business Websites & Portfolios",
            href: "/services/business-websites",
            description: "Your business online, beautifully.",
          },
          {
            icon: "ShoppingCart",
            title: "Online Store",
            href: "/services/online-store",
            description: "Sell online, take payments, manage orders.",
          },
          {
            icon: "Smartphone",
            title: "Mobile Apps",
            href: "/services/mobile-apps",
            description: "Your business in your customer's pocket.",
          },
        ],
      },
      {
        heading: "Manage",
        items: [
          {
            icon: "Users",
            title: "CRM & Business Systems",
            href: "/services/crm",
            description:
              "Manage customers, sales, staff, and billing in one place.",
          },
          {
            icon: "CalendarCheck",
            title: "Booking & Appointments",
            href: "/services/booking",
            description:
              "Customers book, pay, and come — without phone calls.",
          },
          {
            icon: "UserCheck",
            title: "HR & Staff Systems",
            href: "/services/hr-systems",
            description:
              "Manage staff, leave, and payroll checks in one place.",
          },
        ],
      },
      {
        heading: "Design & AI",
        items: [
          {
            icon: "Palette",
            title: "UI/UX Design",
            href: "/services/ui-ux-design",
            description: "Design that is easy to use and looks premium.",
          },
          {
            icon: "Bot",
            title: "AI Solutions & Assistant",
            href: "/services/ai-solutions",
            description: "AI that answers customers and does work for you.",
          },
          {
            icon: "Wrench",
            title: "Fix & Improve Software",
            href: "/services/fix-improve",
            description:
              "Your software is slow or old? We make it fast and better.",
          },
          {
            icon: "ShieldCheck",
            title: "Testing & Care",
            href: "/services/testing-care",
            description:
              "We test, fix, and look after your software after launch.",
          },
        ],
      },
    ],
    // Column 4: Featured panel (not a list of items — rendered separately)
    featured: {
      aiPrompt: "Not sure what you need? Ask our AI →",
      caseStudyTitle: "HR Management System",
      caseStudyDescription:
        "Less manual HR work, faster approvals.",
      caseStudyHref: "/work/hr-management-system",
      ctaLabel: "Book a Free Consultation",
      ctaHref: "/contact",
    },
  },

  // ── Work Dropdown ─────────────────────────────────────────────────────────
  // Simple dropdown by industry — full work mega menu comes in a later step.
  workDropdown: [
    { label: "SaaS", href: "/work?industry=saas" },
    { label: "Healthcare", href: "/work?industry=healthcare" },
    { label: "Business", href: "/work?industry=business" },
    { label: "Sports", href: "/work?industry=sports" },
    { label: "Travel & Tourism", href: "/work?industry=travel" },
  ],

  // ── Footer Link Groups ────────────────────────────────────────────────────
  footerLinks: {
    services: [
      { label: "Website Design & Development", href: "/services/website-design" },
      { label: "Business Websites & Portfolios", href: "/services/business-websites" },
      { label: "Online Store", href: "/services/online-store" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "CRM & Business Systems", href: "/services/crm" },
      { label: "Booking & Appointments", href: "/services/booking" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "AI Solutions & Assistant", href: "/services/ai-solutions" },
    ],
    company: [
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
