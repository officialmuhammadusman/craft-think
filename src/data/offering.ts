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
 * projects show "Demo on request" instead of a live link.
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
    description: "AI that does real work for your business, not just a chatbot demo.",
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
    description: "The apps your customers and staff actually use every day.",
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
    description: "Safe sign-in, clear permissions and encrypted data — explained in plain words.",
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
    image: "/images/work/work-ai.jpg",
    imageAlt: "Abstract visualisation of an AI assistant at work",
  },
  {
    title: "The AI Guide on this site",
    description:
      "Try it on this page: ask in plain words, and the guide points you to the right service and a similar project. When it does not know, it hands you to a free consultation instead of guessing.",
    href: "/guide",
    cta: "Try the AI Guide",
    image: "/images/services/service-ai.jpg",
    imageAlt: "Abstract visualisation of artificial intelligence",
  },
  {
    title: "AI for booking & healthcare",
    description:
      "In Mejora Tu Dolor, patients describe their problem first, are routed to the right specialist, and upload medical files before the consultation — so specialists see the full history, not just a name on a list.",
    href: "/work/telemedicine",
    cta: "See the healthcare case study",
    image: "/images/work/work-telemedicine.jpg",
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
  {
    title: "Scoping",
    text: "We write down what is in and what is out, in plain words, before building. You approve the scope, so there is no surprise feature bill at the end.",
    href: "/process",
    cta: "See the process",
  },
  {
    title: "Resource Planning",
    text: "One clear point of contact and a team planned around your project — design, frontend, backend, mobile and AI, only where your project actually needs them.",
    href: "/process",
    cta: "See the process",
  },
  {
    title: "Cost Estimation",
    text: "A rough range first from the Estimator, then a firm quote after a free consultation. Milestones are agreed in writing before we start.",
    href: "/estimate",
    cta: "Get an estimate",
  },
  {
    title: "Risk Management",
    text: "We start with a free audit for existing software, prototype before full build for new software, and test before every release — so problems are found early, not at launch.",
    href: "/audit",
    cta: "Get a free audit",
  },
  {
    title: "Change Management",
    text: "When your needs change, we agree the change, its cost and its effect on the timeline in writing first — then build it. No silent scope creep in either direction.",
    href: "/process",
    cta: "See the process",
  },
  {
    title: "Success Measurement",
    text: "Success is measured in business words, not code words: bookings without phone calls, less manual HR work, customers and sales in one place, faster approvals.",
    href: "/work",
    cta: "See the results",
  },
  {
    title: "Project Reporting",
    text: "Weekly progress and demos, in plain language, planned around your time zone as far as possible. You see what is built, what is next, and what needs your decision.",
    href: "/process",
    cta: "See the process",
  },
  {
    title: "Collaboration",
    text: "You talk to the people building your software, not a ticket queue. One contact, clear answers, and your feedback built into the next demo — not filed away.",
    href: "/contact",
    cta: "Book a consultation",
  },
];
