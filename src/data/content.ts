/**
 * content.ts — Single source for services, projects, process, FAQs.
 * All copy comes from ~/workspace/agency-portfolio-content-picked.md
 * and ~/workspace/software-house-full-plan-and-subtasks.md.
 * Rules: no employer company names, no technical latency percentages,
 * no invented clients, testimonials, awards, prices or team names/size.
 */

export type Service = {
  slug: string;
  title: string;
  line: string;
  forWhom: string;
  gets: string[];
  example: string;
  exampleHref: string;
  build: string;
  image: string;
  imageAlt: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design & Development",
    line: "A fast, beautiful website that brings you customers.",
    forWhom: "Every business that needs customers to find, trust and contact it online.",
    gets: ["A fast, mobile-first website", "Clear pages that explain what you sell", "Contact and enquiry forms that actually work", "Search-friendly pages so people can find you"],
    example: "Cliender and Padel Connect",
    exampleHref: "/work/cliender",
    build: "Next.js, React and TypeScript for the frontend, with Node.js and PostgreSQL behind it. Pages are built mobile-first and tested on phones before launch.",
    image: "/images/services/service-website.jpg",
    imageAlt: "Designer working on a website layout on a computer",
    keywords: ["website", "web design", "new website", "site", "webpage", "landing page"],
  },
  {
    slug: "business-websites",
    title: "Business Websites & Portfolios",
    line: "Your business online, beautifully.",
    forWhom: "Shops, clinics, professionals and agencies that need a trusted online home.",
    gets: ["A clean portfolio or company website", "Your services, photos and contact details in one place", "A fast mobile version, because most visitors are on phones", "Easy updates when your services change"],
    example: "Cliender",
    exampleHref: "/work/cliender",
    build: "Next.js and React, with a simple content structure you can update without a developer for everyday changes.",
    image: "/images/services/service-business.jpg",
    imageAlt: "A bright modern office workspace",
    keywords: ["portfolio", "company website", "business website", "brochure", "online presence"],
  },
  {
    slug: "online-store",
    title: "Online Store / E-commerce",
    line: "Sell online, take payments, manage orders.",
    forWhom: "Shops and sellers who want orders without answering every message by hand.",
    gets: ["Product pages, cart and checkout", "Secure payments", "Order and customer management", "Stock and delivery basics, set up for your business"],
    example: "Cliender, which handles sales and billing in one place",
    exampleHref: "/work/cliender",
    build: "Next.js storefront with Node.js APIs, PostgreSQL for orders and customers, and Stripe-style payment handling with verification.",
    image: "/images/services/service-store.jpg",
    imageAlt: "A shop open for business",
    keywords: ["shop", "store", "ecommerce", "e-commerce", "sell online", "checkout", "payment"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    line: "Your business in your customer's pocket.",
    forWhom: "Businesses with repeat customers, bookings, memberships or matchmaking.",
    gets: ["One app for iOS and Android", "Bookings, memberships or subscriptions inside the app", "An admin panel so you control what customers see", "Updates and support after launch"],
    example: "Padel Connect, with club admin, court scheduling and memberships",
    exampleHref: "/work/padel-connect",
    build: "React Native for iOS and Android from one codebase, with Next.js web admin and Node.js / PostgreSQL behind it.",
    image: "/images/services/service-mobile.jpg",
    imageAlt: "A person holding a smartphone showing an app",
    keywords: ["app", "mobile app", "android", "iphone", "ios", "react native"],
  },
  {
    slug: "crm",
    title: "CRM & Business Management Systems",
    line: "Manage customers, sales, staff, and billing in one place.",
    forWhom: "Growing businesses drowning in spreadsheets, chats and separate tools.",
    gets: ["Customers, leads and sales in one dashboard", "Billing and subscriptions handled automatically", "Staff and task views, with clear permissions", "Reports that show what is actually happening"],
    example: "Cliender and the HR Management System",
    exampleHref: "/work/cliender",
    build: "Next.js and TypeScript frontend, NestJS / Node.js APIs, PostgreSQL with Prisma, and role-based permissions so each staff member sees only what they need.",
    image: "/images/services/service-crm.jpg",
    imageAlt: "A business dashboard with charts on a screen",
    keywords: ["crm", "business system", "management system", "sales", "customers", "billing", "pos", "saas"],
  },
  {
    slug: "booking",
    title: "Booking & Appointment Systems",
    line: "Customers book, pay, and come — without phone calls.",
    forWhom: "Clinics, salons, clubs, coaches and any business that runs on appointments.",
    gets: ["Online booking with real time slots", "Payments at booking, so no-shows drop", "Reminders and a customer portal", "A staff view of the day, week and availability"],
    example: "Mejora Tu Dolor and Padel Connect",
    exampleHref: "/work/telemedicine",
    build: "Slot reservation locks so two people cannot book the same slot, secure payment verification, and portals for customers and specialists.",
    image: "/images/services/service-booking.jpg",
    imageAlt: "A customer paying securely online",
    keywords: ["booking", "appointment", "schedule", "calendar", "reservation", "clinic", "salon"],
  },
  {
    slug: "hr-systems",
    title: "HR & Staff Systems",
    line: "Manage staff, leave, and payroll checks in one place.",
    forWhom: "Companies where HR work is still done by hand, in chats and spreadsheets.",
    gets: ["Leave requests with clear approvals", "Payroll anomaly checks that flag problems early", "Applicant screening and onboarding workflows", "A full audit log, so every change is recorded"],
    example: "HR Management System",
    exampleHref: "/work/hr-management-system",
    build: "Next.js, NestJS, PostgreSQL and Prisma, with an admin-configurable permissions engine and LangGraph AI agents that help validate leave and flag payroll issues.",
    image: "/images/services/service-hr.jpg",
    imageAlt: "A team working together in an office",
    keywords: ["hr", "staff", "human resources", "leave", "payroll", "employees", "hiring"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    line: "Design that is easy to use and looks premium.",
    forWhom: "Any business whose website or app looks old, confusing, or loses customers.",
    gets: ["Research into what your customers actually need", "Wireframes and clickable prototypes before we build", "A clean design system, so every page looks like one brand", "A redesign that keeps what works and fixes what does not"],
    example: "Every project on this site, including Cliender and Padel Connect",
    exampleHref: "/work/cliender",
    build: "Figma-style design workflow, mobile-first layouts, and React / Next.js implementation of the approved design — no design that looks good but cannot be built.",
    image: "/images/services/service-uiux.jpg",
    imageAlt: "UX designer sketching app screens and wireframes",
    keywords: ["design", "ui", "ux", "redesign", "look", "premium", "user experience"],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions & AI Assistant",
    line: "AI that answers customers and does work for you.",
    forWhom: "Businesses answering the same questions again and again, or checking work by hand.",
    gets: ["An AI assistant that answers from your own business data", "Answers that are checked, not guessed", "AI agents that help with leave, approvals and screening", "A handover to a human whenever the AI is unsure"],
    example: "RAG-Based Agentic AI Assistant and the HR AI agents",
    exampleHref: "/work/rag-ai-assistant",
    build: "Python, LangChain and LangGraph, with Corrective RAG (query rewriting and web fallback) and Self-RAG (factual checking), over Pinecone or ChromaDB vector search.",
    image: "/images/services/service-ai.jpg",
    imageAlt: "Abstract visualisation of artificial intelligence",
    keywords: ["ai", "chatbot", "assistant", "rag", "agent", "automation", "chat", "artificial intelligence"],
  },
  {
    slug: "fix-improve",
    title: "Fix & Improve Your Existing Software",
    line: "Your software is slow or old? We make it fast and better.",
    forWhom: "Businesses with software that works, but slowly, with bugs, or with old design.",
    gets: ["A free audit first — what is slow, broken, or risky", "Speed fixes, bug fixes and query improvements", "A modern look without losing your data", "A clear plan, so you pay for fixes that matter first"],
    example: "HR work made faster, with less manual checking",
    exampleHref: "/work/hr-management-system",
    build: "We start by measuring: slow queries, missing indexes, and uncached work. Then we fix in small, tested steps — PostgreSQL indexing and caching, API cleanup, and frontend fixes.",
    image: "/images/services/service-fix.jpg",
    imageAlt: "A developer fixing code on a screen",
    keywords: ["fix", "slow", "old", "improve", "bug", "speed", "broken", "modernise", "modernize", "audit"],
  },
  {
    slug: "testing-care",
    title: "Testing, Support & Care",
    line: "We test, fix, and look after your software after launch.",
    forWhom: "Any business that cannot afford a broken website, app, or checkout.",
    gets: ["Manual and automated testing before every release", "Performance, accessibility and security checks", "Bug fixes and updates after launch", "Monitoring, so problems are found before customers report them"],
    example: "Support for every project on this site",
    exampleHref: "/work/cliender",
    build: "API and release testing, performance testing, and CI/CD with GitHub Actions, Docker and Vercel / AWS deployment, so releases are repeatable and safe.",
    image: "/images/services/service-testing.jpg",
    imageAlt: "Code and testing tools on a developer screen",
    keywords: ["test", "testing", "support", "care", "maintenance", "qa", "bug fix", "after launch"],
  },
];

export type Project = {
  slug: string;
  title: string;
  industry: "saas" | "healthcare" | "business" | "sports";
  industryLabel: string;
  line: string;
  problem: string;
  built: string[];
  result: string;
  stack: string;
  live?: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "hr-management-system",
    title: "HR Management System",
    industry: "business",
    industryLabel: "Business",
    line: "Less manual HR work, faster approvals.",
    problem: "HR work was done by hand across departments, with slow dashboards and manual checking for leave, payroll and hiring.",
    built: ["Admin-configurable permissions, so each role sees only what it needs", "AI agents that help validate leave, flag payroll anomalies, approve expenses and screen applicants", "Onboarding workflows and a real-time audit log of every change"],
    result: "Staff approvals and HR work are handled faster, with less manual checking and a clear record of who approved what.",
    stack: "Next.js, NestJS, PostgreSQL, Prisma, LangGraph, Supabase",
    live: "hrms-portal-beta.vercel.app",
    image: "/images/work/work-hr.jpg",
    imageAlt: "HR dashboard with staff and approval data",
  },
  {
    slug: "rag-ai-assistant",
    title: "RAG-Based Agentic AI Assistant",
    industry: "saas",
    industryLabel: "SaaS",
    line: "Correct answers from your own data, not guesses.",
    problem: "AI chatbots gave answers that sounded confident but were wrong, or missed the right information entirely.",
    built: ["Hybrid vector search over the business's own documents", "Corrective RAG: the assistant rewrites unclear questions and falls back to the web when its own data is not enough", "Self-RAG factual checking, so answers are graded before they are shown", "A supervisor-worker multi-agent system, including an agent that can answer from a database"],
    result: "Customers get correct, checked answers from the business's own data, and staff save time answering the same questions again and again.",
    stack: "Python, LangChain, LangGraph, OpenAI, Gemini Pro, Pinecone, ChromaDB",
    image: "/images/work/work-ai.jpg",
    imageAlt: "Abstract visualisation of an AI assistant at work",
  },
  {
    slug: "telemedicine",
    title: "Mejora Tu Dolor — Telemedicine",
    industry: "healthcare",
    industryLabel: "Healthcare",
    line: "Patients book and consult remotely, with payments handled securely.",
    problem: "People living with chronic pain needed consultations across Latin America, with medical files, payments and the right specialist — without travelling for every visit.",
    built: ["Asynchronous triage, so patients describe their problem first", "Multi-file clinical uploads and a specialist portal with patient history", "Routing to the right specialist within a 7-day service window", "Secure payments with verification, and time-slot locks so slots are never double-booked"],
    result: "Patients book, upload reports, pay securely and consult remotely, and specialists see the full history before the consultation.",
    stack: "React, Node.js, Express.js, PostgreSQL, Webpay",
    live: "mejoratudolor.cl",
    image: "/images/work/work-telemedicine.jpg",
    imageAlt: "A doctor consulting a patient on a tablet",
  },
  {
    slug: "cliender",
    title: "Cliender — Business Management SaaS",
    industry: "saas",
    industryLabel: "SaaS",
    line: "Sales, billing and customers in one place.",
    problem: "Small and growing businesses were tracking sales, billing and customers in separate tools and spreadsheets.",
    built: ["Real-time point of sale, so sales are recorded as they happen", "Automated subscription billing and lead tracking", "An analytics dashboard for productivity, revenue and engagement", "Location filtering, so local marketing can target nearby customers"],
    result: "Sales, billing and customers live in one place, so owners see what is selling and who is buying, without chasing numbers across tools.",
    stack: "Next.js, TypeScript, Node.js, PostgreSQL",
    live: "cliender.com",
    image: "/images/work/work-cliender.jpg",
    imageAlt: "A point-of-sale and billing dashboard",
  },
  {
    slug: "padel-connect",
    title: "Padel Connect — Smart Matchmaking",
    industry: "sports",
    industryLabel: "Sports",
    line: "Matches scheduled, courts managed, memberships paid automatically.",
    problem: "Padel clubs needed a simple way to schedule matches, manage court occupancy and handle memberships — without phone calls and paper lists.",
    built: ["A club admin platform for courts, schedules and occupancy", "Matchmaking by skill tier and playing history", "Recurring subscription billing for memberships", "Mobile-friendly registration for players"],
    result: "Clubs fill courts more easily, players find fair matches, and memberships are paid automatically instead of chased by hand.",
    stack: "Next.js, React Native, Node.js, PostgreSQL",
    live: "padel-fe.vercel.app",
    image: "/images/work/work-padel.jpg",
    imageAlt: "A padel tennis court ready for a match",
  },
];

export const processSteps = [
  { n: 1, title: "Discover", text: "We learn your business, your customers, and the problem in plain words. You get a clear scope, timeline and estimate before we build anything." },
  { n: 2, title: "Design", text: "Wireframes and a clickable prototype first, so you see and approve the design before a single line of production code." },
  { n: 3, title: "Build", text: "We build in small, tested steps and show you progress every week — no long silence, no surprise at the end." },
  { n: 4, title: "Test", text: "Manual and automated testing, on phones and computers, for speed, accessibility and security, before every release." },
  { n: 5, title: "Launch", text: "We deploy, check payments, bookings and forms live with you, and fix anything on day one — fast." },
  { n: 6, title: "Support", text: "After launch we monitor, fix bugs, update and add features, so your software keeps working as your business grows." },
];

export const facilities = [
  { title: "Discovery & Planning", text: "Requirements, scope, timeline and estimate, agreed in writing before building." },
  { title: "Security", text: "Sign-in with JWT and OAuth 2.0, role-based permissions, and encryption. Health data is handled with HIPAA-aligned practices — a practice standard, not a certification claim." },
  { title: "DevOps & Deployment", text: "Docker, AWS and Vercel hosting, with GitHub Actions CI/CD, so every release is repeatable and safe." },
  { title: "Support & Maintenance", text: "Bug fixes, updates, performance monitoring and new features after launch, on a care plan you can cancel." },
  { title: "Clear Communication", text: "One point of contact, weekly progress and demos, and work planned around your time zone as far as possible." },
];

export const faqs = [
  { q: "How much does a website or app cost?", a: "It depends on size and features. As a rough guide only: a small website starts in a lower range, a website with booking or CRM costs more, and a custom system or mobile app costs more again. Use the Estimator for a rough range, then book a free consultation for a firm quote — we never hide the price until the end." },
  { q: "How long does a project take?", a: "A small website can take a few weeks. A booking system, CRM or mobile app usually takes longer, built in phases: a prototype first, then a working version, then the full product. You will get a timeline in writing before we start." },
  { q: "Do you work with clients outside your country?", a: "Yes. CraftThink works remotely with clients worldwide. Communication is by video call, chat and email, with weekly demos, planned around your time zone as far as possible." },
  { q: "I already have a website or software. Can you fix it?", a: "Yes. Start with the free audit: tell us what is slow, broken or confusing, and we will list the top fixes in plain language. Many clients start with a small fix sprint before a bigger rebuild." },
  { q: "What is the AI assistant on this site?", a: "It is a guided demo that answers only from our own services, projects, process and FAQs. It suggests the right service and project for your problem, and hands you to a free consultation when it does not know. A live AI connection can be added later; nothing here pretends to be a real external AI service." },
  { q: "Can AI answer my customers for me?", a: "Yes — that is one of our services. We build AI assistants that answer from your own business data, with factual checking, and hand over to a human whenever they are unsure. See the RAG AI Assistant project." },
  { q: "Will I own my website, app and data?", a: "Yes. Your website, app, code and customer data are yours. We hand over access, logins and documentation at launch, and we never hold your business hostage." },
  { q: "Do you build mobile apps, or only websites?", a: "Both. Mobile apps are a full service, not a side note: one React Native app for iOS and Android, with bookings, memberships or subscriptions, plus a web admin panel for you." },
  { q: "What happens after launch?", a: "We test, monitor and support your software. A care plan covers bug fixes, updates and small improvements, so your site does not slowly break as browsers, phones and payment rules change." },
  { q: "How do we start?", a: "Book a free consultation, or try the Estimator or Free Audit first. In the first call we will understand your problem, show you a similar project, and give you a clear next step — with no obligation." },
  { q: "Do you need all my content and photos before we start?", a: "No. We start with what you have, and we will tell you exactly what we still need — text, photos, logo, prices — in a simple checklist. Stock photos are used here only as placeholders until your designer images are ready." },
  { q: "How do payments work?", a: "We agree milestones in writing before building. For medium projects a common split is a deposit to start, a payment at demo, and the balance at launch. The exact split is confirmed in your quote, not guessed here." },
];

/** Knowledge base for the guided demo chat: keyword -> reply + links. */
export type GuideReply = { text: string; serviceHref?: string; serviceLabel?: string; projectHref?: string; projectLabel?: string };

export function guideAnswer(input: string): GuideReply {
  const q = input.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));
  if (has("slow", "broken", "fix", "bug", "old", "outdated")) return { text: "That sounds like a Fix & Improve job. We start with a free audit, find what is slow or broken, and fix it in small tested steps — without losing your data.", serviceHref: "/services/fix-improve", serviceLabel: "Fix & Improve Your Existing Software", projectHref: "/work/hr-management-system", projectLabel: "HR Management System" };
  if (has("app", "android", "iphone", "ios", "mobile")) return { text: "A mobile app puts your business in your customer's pocket. We build one React Native app for both iOS and Android, with bookings or memberships inside, plus an admin panel for you.", serviceHref: "/services/mobile-apps", serviceLabel: "Mobile Apps", projectHref: "/work/padel-connect", projectLabel: "Padel Connect" };
  if (has("ai", "chatbot", "assistant", "answer customer", "automate")) return { text: "An AI assistant can answer your customers from your own business data, with answers checked before they are shown — and it hands over to a human when it is unsure.", serviceHref: "/services/ai-solutions", serviceLabel: "AI Solutions & AI Assistant", projectHref: "/work/rag-ai-assistant", projectLabel: "RAG-Based Agentic AI Assistant" };
  if (has("crm", "customer", "sales", "billing", "manage business", "pos")) return { text: "A CRM and business system puts customers, sales, staff and billing in one place, instead of spreadsheets and separate tools.", serviceHref: "/services/crm", serviceLabel: "CRM & Business Management Systems", projectHref: "/work/cliender", projectLabel: "Cliender" };
  if (has("book", "appointment", "schedule", "reservation", "clinic", "salon", "court")) return { text: "A booking system lets customers book, pay and come — without phone calls. Slots are locked so two people cannot book the same time.", serviceHref: "/services/booking", serviceLabel: "Booking & Appointment Systems", projectHref: "/work/telemedicine", projectLabel: "Mejora Tu Dolor" };
  if (has("shop", "store", "sell", "ecommerce", "e-commerce", "checkout", "product")) return { text: "An online store lets you sell, take payments and manage orders in one place, with a checkout that works well on phones.", serviceHref: "/services/online-store", serviceLabel: "Online Store / E-commerce", projectHref: "/work/cliender", projectLabel: "Cliender" };
  if (has("hr", "staff", "leave", "payroll", "employee", "hiring")) return { text: "An HR and staff system handles leave, payroll checks, hiring and onboarding in one place, with clear approvals and an audit log.", serviceHref: "/services/hr-systems", serviceLabel: "HR & Staff Systems", projectHref: "/work/hr-management-system", projectLabel: "HR Management System" };
  if (has("design", "redesign", "look", "premium", "ui", "ux")) return { text: "Good design is easy to use and looks premium. We research your customers, prototype first, and only then build — so you approve the look before we code it.", serviceHref: "/services/ui-ux-design", serviceLabel: "UI/UX Design", projectHref: "/work/cliender", projectLabel: "Cliender" };
  if (has("cost", "price", "estimate", "quote", "budget")) return { text: "Costs depend on size and features. The Estimator gives a rough range and timeline, labelled as an estimate only — then a free consultation gives you a firm quote.", serviceHref: "/estimate", serviceLabel: "Get an Estimate" };
  if (has("time", "how long", "duration")) return { text: "A small website can take a few weeks; a booking system, CRM or app takes longer, built in phases. Your timeline is agreed in writing before we start. See our process for the 6 steps.", serviceHref: "/process", serviceLabel: "Our Process" };
  if (has("remote", "worldwide", "country", "location")) return { text: "We work remotely with clients worldwide, with weekly demos planned around your time zone as far as possible. There is no office you need to visit.", serviceHref: "/about", serviceLabel: "About the CEO" };
  if (has("website", "site", "portfolio", "online")) return { text: "A fast, beautiful website brings you customers and builds trust. Tell me if you need a simple business site, a portfolio, or a full store — I can point you to the right one.", serviceHref: "/services/website-design", serviceLabel: "Website Design & Development", projectHref: "/work/cliender", projectLabel: "Cliender" };
  if (has("support", "care", "test", "maintenance", "after launch")) return { text: "After launch we test, monitor, fix bugs and update your software, so it keeps working as browsers, phones and payment rules change.", serviceHref: "/services/testing-care", serviceLabel: "Testing, Support & Care" };
  if (has("hello", "hi", "help", "start", "need")) return { text: "Hello! Tell me in plain words what you need help with — for example: 'my website is slow', 'I need an app', or 'I need AI to answer customers'. I will point you to the right service and a similar project." };
  return { text: "I am not sure about that one yet — this guide only answers from CraftThink's own services, projects, process and FAQs. The best next step is a free consultation, where Muhammad can answer it properly. Tell me your problem in the lead form below and we will take it from there." };
}
