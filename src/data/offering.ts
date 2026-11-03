/**
 * offering.ts — ScienceSoft-pattern STRUCTURE, CraftThink content only.
 * Nothing here copies ScienceSoft text, stats, testimonials, logos or
 * trademarks. Groups are CraftThink's own 11 services, regrouped into
 * 9 offering categories so the mega menu and home page read like a
 * full software house. No invented clients, testimonials, awards,
 * partner badges, prices or team names.
 * Live-link honesty: only Mejora Tu Dolor and Padel Connect are linked
 * out as live sites. The HR portal link returned 404 in a text fetch
 * and cliender.com now shows a different consultancy, so those two
 * projects without a verified live link show no Live row at all.
 */

export type OfferingLink = { label: string; href: string };
export type OfferingGroup = {
  title: string;
  description: string;
  links: OfferingLink[];
};

export const offeringGroups: OfferingGroup[] = [
  {
    title: "AI Transformation",
    description: "AI that does real work for your business, beyond simple chatbots.",
    links: [
      { label: "AI Solutions & AI Assistant", href: "/services/ai-solutions" },
      { label: "HR AI Agents", href: "/services/hr-systems" },
      { label: "Ask the AI Guide", href: "/guide" },
    ],
  },
  {
    title: "Software Development",
    description: "Websites, stores, apps and business systems, built end to end.",
    links: [
      { label: "Website Design & Development", href: "/services/website-design" },
      { label: "Business Websites & Portfolios", href: "/services/business-websites" },
      { label: "Online Store / E-commerce", href: "/services/online-store" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
  {
    title: "IT Consulting",
    description: "A clear plan before you pay: what to build, what to fix first, what it costs.",
    links: [
      { label: "Fix & Improve Your Existing Software", href: "/services/fix-improve" },
      { label: "Get an Estimate", href: "/estimate" },
      { label: "Free Audit", href: "/audit" },
    ],
  },
  {
    title: "Application Services",
    description: "The apps your customers and staff use every day.",
    links: [
      { label: "CRM & Business Management Systems", href: "/services/crm" },
      { label: "Booking & Appointment Systems", href: "/services/booking" },
      { label: "HR & Staff Systems", href: "/services/hr-systems" },
    ],
  },
  {
    title: "Testing & QA",
    description: "Tested on phones and computers before every release, so launch day is calm.",
    links: [
      { label: "Testing, Support & Care", href: "/services/testing-care" },
      { label: "Fix & Improve Your Existing Software", href: "/services/fix-improve" },
    ],
  },
  {
    title: "Data & AI (RAG)",
    description: "Answers checked against your own business data, not guessed by AI.",
    links: [
      { label: "AI Solutions & AI Assistant", href: "/services/ai-solutions" },
      { label: "RAG AI Assistant — case study", href: "/work/rag-ai-assistant" },
      { label: "CRM & Business Management Systems", href: "/services/crm" },
    ],
  },
  {
    title: "Help Desk & Support",
    description: "After launch, someone answers, fixes and updates — you are not left alone.",
    links: [
      { label: "Testing, Support & Care", href: "/services/testing-care" },
      { label: "Booking & Appointment Systems", href: "/services/booking" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    description: "Hosting, deployment and releases that are repeatable and safe.",
    links: [
      { label: "Testing, Support & Care", href: "/services/testing-care" },
      { label: "Website Design & Development", href: "/services/website-design" },
      { label: "Our Process", href: "/process" },
    ],
  },
  {
    title: "Cybersecurity & Security",
    description: "Safe sign-in, clear permissions and encrypted data — explained clearly.",
    links: [
      { label: "CRM & Business Management Systems", href: "/services/crm" },
      { label: "HR & Staff Systems", href: "/services/hr-systems" },
      { label: "Testing, Support & Care", href: "/services/testing-care" },
    ],
  },
];

export type Industry = {
  label: string;
  href: string;
  description: string;
  projectHref?: string;
  projectLabel?: string;
};

export const industries: Industry[] = [
  {
    label: "Healthcare",
    href: "/work?industry=healthcare",
    description: "Patients book, upload reports, pay securely and consult remotely.",
    projectHref: "/work/telemedicine",
    projectLabel: "Mejora Tu Dolor",
  },
  {
    label: "Finance & Business",
    href: "/work?industry=business",
    description: "Sales, billing and customers in one place, instead of spreadsheets.",
    projectHref: "/work/cliender",
    projectLabel: "Cliender",
  },
  {
    label: "HR & Staff",
    href: "/work?industry=business",
    description: "Leave, payroll checks, hiring and approvals, with a clear audit log.",
    projectHref: "/work/hr-management-system",
    projectLabel: "HR Management System",
  },
  {
    label: "Sports & Clubs",
    href: "/work?industry=sports",
    description: "Courts managed, matches scheduled, memberships paid automatically.",
    projectHref: "/work/padel-connect",
    projectLabel: "Padel Connect",
  },
  {
    label: "SaaS & Digital Products",
    href: "/work?industry=saas",
    description: "AI assistants and business software that customers can rely on every day.",
    projectHref: "/work/rag-ai-assistant",
    projectLabel: "RAG AI Assistant",
  },
  {
    label: "Travel & Tourism",
    href: "/work?industry=travel",
    description: "Desert safaris, buggy rides, yacht cruises and city tours, booked in one place with hotel pickup.",
    projectHref: "/work/book-dubai-guide",
    projectLabel: "BookDubaiGuide",
  },
];

export type AiAction = {
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
};

export const aiInAction: AiAction[] = [
  {
    title: "RAG Agentic AI Assistant",
    description:
      "An AI assistant that answers from a business's own documents, rewrites unclear questions, and checks answers before showing them — so customers get correct answers and staff stop repeating themselves.",
    href: "/work/rag-ai-assistant",
    cta: "See the AI case study",
    image: "/images/work/work-ai.svg",
    imageAlt: "Abstract visualisation of an AI assistant at work",
  },
  {
    title: "The AI Guide on this site",
    description:
      "Try it on this page: ask, and the guide points you to the right service and a similar project. When it does not know, it hands you to a free consultation instead of guessing.",
    href: "/guide",
    cta: "Try the AI Guide",
    image: "/images/services/service-ai.svg",
    imageAlt: "Illustration of an AI assistant answering from documents with sources",
  },
  {
    title: "AI for booking & healthcare",
    description:
      "In Mejora Tu Dolor, patients describe their problem first, are routed to the right specialist, and upload medical files before the consultation — so specialists see the full history, not just a name on a list.",
    href: "/work/telemedicine",
    cta: "See the healthcare case study",
    image: "/images/work/work-telemedicine.svg",
    imageAlt: "A doctor consulting a patient on a tablet",
  },
];

/** Verified live links only. HR and Cliender are intentionally absent here. */
export const verifiedLiveLinks: Record<string, string> = {
  "telemedicine": "https://mejoratudolor.cl",
  "padel-connect": "https://padel-fe.vercel.app",
  "book-dubai-guide": "https://www.bookdubaiguide.com/",
};

export type SuccessPractice = {
  title: string;
  text: string;
  href: string;
  cta: string;
};

export const successPractices: SuccessPractice[] = [
  { title: "Scope Lock", text: "What is in, what is out — agreed before building, so the price never surprises you.", href: "/process", cta: "See the process" },
  { title: "Right-Sized Team", text: "Only the skills your project needs — design, code, mobile or AI — nothing billed for show.", href: "/process", cta: "See the process" },
  { title: "Price Clarity", text: "A rough range first, a firm written quote after consultation, milestones agreed up front.", href: "/estimate", cta: "Get an estimate" },
  { title: "Early Risk Checks", text: "A free audit for existing software, a prototype for new builds — problems found early, not at launch.", href: "/audit", cta: "Get a free audit" },
  { title: "Change Log", text: "Every change agreed in writing first: cost, timeline effect, then build. No silent scope creep.", href: "/process", cta: "See the process" },
  { title: "Outcome Metrics", text: "Success counted in bookings, sales and time saved — not in lines of code.", href: "/work", cta: "See the results" },
  { title: "Weekly Report", text: "One short weekly update: what shipped, what is next, what needs your decision.", href: "/process", cta: "See the process" },
  { title: "Direct Line", text: "Talk to the people building your software, not a ticket queue.", href: "/contact", cta: "Book a consultation" },
];

/**
 * megaMenuGroups — the mega menu (and mobile menu) must never repeat a
 * service. This keeps only /services/ links, first occurrence wins, and
 * drops groups that end up empty. Result: all 11 services, exactly once.
 */
export const megaMenuGroups: OfferingGroup[] = (() => {
  const seen = new Set<string>();
  return offeringGroups
    .map((g) => ({
      ...g,
      links: g.links.filter((l) => l.href.startsWith("/services/") && !seen.has(l.href) && seen.add(l.href)),
    }))
    .filter((g) => g.links.length > 0);
})();
