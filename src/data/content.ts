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
  /** Plain-language outcome line, as in the sample structure. */
  outcome?: string;
  /** What you actually receive, as a list. */
  deliverables?: string[];
  /** Detailed capabilities: title + plain description each. */
  capabilities?: { title: string; description: string }[];
  /** Tech stack with a short description per item. */
  techStack?: { name: string; description: string }[];
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
    outcome: "A website that brings you customers and grows with your business — not just a pretty page.",
    deliverables: ["A Next.js / React website, built mobile-first", "A TypeScript + Tailwind design system, so every page looks like one brand", "Clear pages that explain what you sell, with working contact forms", "Search-friendly pages, so people can find you", "Testing on phones before launch"],
    capabilities: [
      { title: "Frontend Architecture", description: "Scalable React and Next.js apps using App Router and server components, so pages load fast and stay easy to grow." },
      { title: "Design System Engineering", description: "Your design turned into reusable, consistent components — the same buttons, colours and spacing on every page." },
      { title: "Complex Pages, Kept Simple", description: "Forms, galleries and booking or enquiry flows built so visitors never get stuck or confused." },
      { title: "Search & Speed Basics", description: "Clean page structure and fast loading, so search engines can read your site and visitors do not leave while waiting." },
    ],
    techStack: [
      { name: "Next.js", description: "The framework your website is built on — fast pages, good search visibility." },
      { name: "React", description: "Builds the interactive parts of your pages, like forms and menus." },
      { name: "TypeScript", description: "Catches mistakes in the code before your visitors ever see them." },
      { name: "Tailwind CSS", description: "Styles every page consistently, without a patchwork look." },
      { name: "Node.js", description: "Runs the behind-the-scenes parts, like form handling." },
      { name: "PostgreSQL", description: "Stores your enquiries and content reliably." },
    ],
  },
  {
    slug: "business-websites",
    title: "Business Websites & Portfolios",
    line: "A polished online home for your business.",
    forWhom: "Shops, clinics, professionals and agencies that need a trusted online home.",
    gets: ["A clean portfolio or company website", "Your services, photos and contact details in one place", "A fast mobile version, because most visitors are on phones", "Easy updates when your services change"],
    example: "Cliender",
    exampleHref: "/work/cliender",
    build: "Next.js and React, with a simple content structure you can update without a developer for everyday changes.",
    image: "/images/services/service-business.jpg",
    imageAlt: "A bright modern office workspace",
    keywords: ["portfolio", "company website", "business website", "brochure", "online presence"],
    outcome: "A trusted online home that explains your business in minutes.",
    deliverables: ["A clean company or portfolio website", "Your services, photos and contact details in one place", "A fast mobile version, because most visitors are on phones", "A simple structure you can update when services change"],
    capabilities: [
      { title: "Scope First", description: "We agree the core pages first — services, about, work, contact — and cut everything that does not help a visitor decide." },
      { title: "Prototype Before Build", description: "You see a clickable version of the site and approve the look before we build it properly." },
      { title: "Design That Looks Established", description: "Premium, consistent design, so even a small business looks like a business customers can trust." },
      { title: "Easy Updates", description: "Everyday changes — a new service, a new photo — without needing a developer for each one." },
    ],
    techStack: [
      { name: "Next.js", description: "Fast, search-friendly pages for your business site." },
      { name: "React", description: "The interactive parts of your pages." },
      { name: "Tailwind CSS", description: "Consistent, clean styling across the whole site." },
      { name: "Vercel", description: "Hosting that deploys updates quickly and reliably." },
    ],
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
    outcome: "Orders and payments handled without chasing every message by hand.",
    deliverables: ["Product pages, cart and checkout", "Secure payments with verification", "Order and customer management", "Stock and delivery basics, set up for your business", "Order records and receipts for every sale"],
    capabilities: [
      { title: "Checkout That Works on Phones", description: "Most shoppers are on phones, so checkout is built phone-first: few steps, clear totals, no dead ends." },
      { title: "Payments Verified, Not Assumed", description: "Every payment is confirmed with the payment provider before an order is marked paid — so you never ship an order that was never actually paid for." },
      { title: "Orders in One Place", description: "Orders, customers and stock in one dashboard, instead of scattered messages and spreadsheets." },
      { title: "Subscriptions and Billing", description: "Repeat billing handled automatically, with clear records when a plan changes or a payment fails." },
    ],
    techStack: [
      { name: "Next.js", description: "Your storefront — fast product pages and checkout." },
      { name: "Node.js", description: "The APIs behind cart, checkout and orders." },
      { name: "PostgreSQL", description: "Orders, customers and stock, stored reliably." },
      { name: "Stripe-style payments", description: "Secure card payments with automatic receipts and records." },
      { name: "Webhooks", description: "Payment updates synced to your orders automatically, so records always match reality." },
    ],
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
    outcome: "One app for iOS and Android that customers keep coming back to.",
    deliverables: ["A React Native app for iOS and Android from one codebase", "Bookings, memberships or subscriptions inside the app", "Sign-in, notifications and an offline-ready experience", "An admin panel so you control what customers see", "An app-store-ready build pipeline and support after launch"],
    capabilities: [
      { title: "Cross-Platform, One Codebase", description: "iOS and Android from a single React Native app — one build to maintain, not two." },
      { title: "Offline-Ready Experience", description: "The app still works when connection drops, and syncs when it returns, so customers are never stuck on a blank screen." },
      { title: "Push Notifications", description: "Reminders and updates that bring customers back — bookings, matches, offers — without spam." },
      { title: "App Store Publishing", description: "We handle the store listings, review requirements and releases for Apple and Google." },
      { title: "Admin Panel Included", description: "A web panel for you to manage content, users and settings without touching the app code." },
    ],
    techStack: [
      { name: "React Native", description: "Builds real native-feeling apps for iOS and Android from one codebase." },
      { name: "Expo", description: "Speeds up building, testing and updating the app." },
      { name: "TypeScript", description: "Keeps the app code reliable as it grows." },
      { name: "React Navigation", description: "Smooth, native-feeling movement between app screens." },
      { name: "Node.js APIs", description: "The same backend style as the web apps, so web and mobile stay in sync." },
    ],
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
    outcome: "One place for customers, sales, staff and billing — no more spreadsheets.",
    deliverables: ["Customers, leads and sales in one dashboard", "Billing and subscriptions handled automatically", "Staff and task views, with clear permissions", "Reports that show what is actually happening", "Point-of-sale records alongside the rest of the business"],
    capabilities: [
      { title: "One Dashboard, Not Tool Sprawl", description: "Appointments, billing, leads and performance share one system, so your team has a single source of truth." },
      { title: "Permissions by Role", description: "Each staff member sees only what their job needs — managers, staff and admins each get their own view." },
      { title: "Billing That Runs Itself", description: "Subscriptions, upgrades and failed payments handled with clear records, instead of manual chasing." },
      { title: "Reports You Can Act On", description: "Productivity, revenue and customer views in one place, so decisions use real numbers, not guesses." },
      { title: "Audit Trail", description: "A record of who changed what, so nothing important happens without a trace." },
    ],
    techStack: [
      { name: "Next.js", description: "The dashboard your team actually opens every day." },
      { name: "NestJS / Node.js", description: "The APIs and business rules behind the dashboard." },
      { name: "PostgreSQL", description: "Customers, orders and staff data, stored reliably." },
      { name: "Prisma", description: "Keeps database access clean and safe as the system grows." },
      { name: "Stripe", description: "Subscription billing and payment records." },
      { name: "Tailwind CSS", description: "A dashboard that stays readable even when it is full of data." },
    ],
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
    outcome: "Bookings without phone calls — and no double-booked slots.",
    deliverables: ["Online booking with real time slots", "Payments at booking, so no-shows drop", "Reminders and a customer portal", "A staff view of the day, week and availability", "WhatsApp or email confirmation for every booking"],
    capabilities: [
      { title: "Slot Locks", description: "When a customer picks a slot, it is locked — two people can never book the same time." },
      { title: "Payment Verification", description: "A booking is only confirmed once payment is verified, so you never get a paid-but-unconfirmed booking." },
      { title: "Reminders That Reduce No-Shows", description: "Automatic reminders before the appointment, so fewer slots go empty." },
      { title: "Staff and Specialist Views", description: "Your team sees the day and week at a glance, with each booking's details in one place." },
      { title: "Async First Where It Helps", description: "Where a visit needs documents first — like medical reports — patients describe the problem and upload files before the appointment, so the appointment itself is shorter and better prepared." },
    ],
    techStack: [
      { name: "Next.js", description: "The booking pages your customers use, phone-first." },
      { name: "Node.js", description: "Booking rules, slot locks and reminders behind the scenes." },
      { name: "PostgreSQL", description: "Slots, bookings and customer records." },
      { name: "Payment verification", description: "Confirms every payment before a booking is marked confirmed." },
      { name: "WhatsApp / email", description: "Instant booking confirmations customers actually read." },
    ],
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
    outcome: "HR work with less manual checking — and a clear record of every decision.",
    deliverables: ["Leave requests with clear approvals", "Payroll anomaly checks that flag problems early", "Applicant screening and onboarding workflows", "A full audit log, so every change is recorded", "Permissions set by role, changeable from the admin panel"],
    capabilities: [
      { title: "Permissions as Data, Not Code", description: "Admins change who can do what from the panel — no new release needed every time a role changes." },
      { title: "Approvals as Clear Steps", description: "Leave and expense approvals follow explicit steps, so everyone can see where a request stands and who approved it." },
      { title: "AI Agents That Check, Not Guess", description: "LangGraph agents help validate leave and flag payroll problems, and hand anything unsure to a human." },
      { title: "Audit Log", description: "Every change recorded in real time, so disputes end with a record, not an argument." },
      { title: "Hiring Pipeline", description: "Applicants tracked through stages, from screening to onboarding, in one place." },
    ],
    techStack: [
      { name: "Next.js", description: "The HR portal your staff opens every day." },
      { name: "NestJS", description: "Structured backend rules for approvals, payroll checks and hiring." },
      { name: "PostgreSQL", description: "Staff, leave and payroll data, stored reliably." },
      { name: "Prisma", description: "Safe, clean access to that data." },
      { name: "LangGraph", description: "The AI agents that validate leave and flag payroll issues." },
      { name: "Supabase", description: "Hosting and data services behind the portal." },
    ],
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
    outcome: "A design customers understand at a glance — approved by you before we build.",
    deliverables: ["Research into what your customers actually need", "Wireframes and clickable prototypes before we build", "A clean design system, so every page looks like one brand", "A redesign that keeps what works and fixes what does not"],
    capabilities: [
      { title: "Research First", description: "We learn who your customers are and what confuses them now, before drawing anything." },
      { title: "Prototype Before Build", description: "A clickable prototype you can try on your phone — you approve the flow before a single line of production code." },
      { title: "Design System", description: "Reusable components in one style, so new pages match the old ones automatically." },
      { title: "Mobile-First Layouts", description: "Designed for the phone screen first, where most of your visitors actually are." },
      { title: "Accessible by Default", description: "Readable text, clear contrast and tappable targets, so more customers can use your site." },
    ],
    techStack: [
      { name: "Figma-style workflow", description: "Designs you can review and comment on before build." },
      { name: "Tailwind CSS", description: "Turns the approved design into consistent, clean pages." },
      { name: "React / Next.js", description: "Builds the approved design exactly — no design that looks good but cannot be built." },
    ],
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
    keywords: ["ai", "chatbot", "assistant", "rag", "agent", "automation", "chat", "artificial intelligence", "langchain", "langgraph", "multi-agent", "multi agent", "corrective rag", "self-rag", "self rag", "vector", "pinecone", "chromadb", "agents"],
    outcome: "AI that answers from your own data, with every answer checked.",
    deliverables: ["An AI assistant that answers from your own business data", "RAG pipelines with grounded retrieval", "LangChain / LangGraph agents, including multi-agent teams", "Vector search over Pinecone, ChromaDB or pgvector", "Agents that answer from a database, safely", "A handover to a human whenever the AI is unsure"],
    capabilities: [
      { title: "RAG Pipelines", description: "The AI searches your documents first — price lists, policies, manuals — and answers from them, instead of guessing from general knowledge." },
      { title: "Corrective RAG", description: "When a question is unclear, the assistant rewrites it and searches again; when your documents do not cover it, it falls back to the web and says so." },
      { title: "Self-RAG Checking", description: "Before an answer is shown, it is graded against the source. If it does not check out, it is not shown as fact." },
      { title: "Agentic Workflows", description: "Multi-step work handled by LangGraph: plan, use tools, check the result, and only then act — with a human step wherever an action matters." },
      { title: "Multi-Agent Teams", description: "A supervisor agent splits work between specialists — one finds, one checks, one writes — instead of one agent guessing everything at once." },
      { title: "Database Answers, Safely", description: "Ask and get an answer from your own database, through checked, read-only queries that cannot change your data." },
      { title: "Human Handover", description: "Whenever the AI is unsure, it hands over to a person instead of inventing an answer." },
    ],
    techStack: [
      { name: "Python", description: "The language the AI agents are built in." },
      { name: "LangChain", description: "The toolkit for building AI apps that use your data and tools." },
      { name: "LangGraph", description: "Builds multi-step, multi-agent workflows that can check and retry their own work." },
      { name: "Pinecone", description: "A managed vector database for searching your documents by meaning." },
      { name: "ChromaDB", description: "An open vector database option for the same job." },
      { name: "pgvector", description: "Vector search inside PostgreSQL, so data and search stay together." },
      { name: "OpenAI / Gemini", description: "The language models behind the answers, chosen per task." },
      { name: "Redis", description: "Fast caching and workflow state for AI streams." },
    ],
  },
  {
    slug: "fix-improve",
    title: "Fix & Improve Your Existing Software",
    line: "Slow or outdated software, fixed and improved.",
    forWhom: "Businesses with software that works, but slowly, with bugs, or with old design.",
    gets: ["A free audit first — what is slow, broken, or risky", "Speed fixes, bug fixes and query improvements", "A modern look without losing your data", "A clear plan, so you pay for fixes that matter first"],
    example: "HR work made faster, with less manual checking",
    exampleHref: "/work/hr-management-system",
    build: "We start by measuring: slow queries, missing indexes, and uncached work. Then we fix in small, tested steps — PostgreSQL indexing and caching, API cleanup, and frontend fixes.",
    image: "/images/services/service-fix.jpg",
    imageAlt: "A developer fixing code on a screen",
    keywords: ["fix", "slow", "old", "improve", "bug", "speed", "broken", "modernise", "modernize", "audit"],
    outcome: "Software that feels new again — fixed in the order of what matters most.",
    deliverables: ["A free audit first — what is slow, broken, or risky", "Speed fixes, bug fixes and query improvements", "A modern look without losing your data", "A clear plan, so you pay for fixes that matter first"],
    capabilities: [
      { title: "Audit First, Fix Second", description: "We measure first: slow queries, missing indexes, uncached work and real bugs — then fix in order of impact, not guesswork." },
      { title: "Fix in Small, Tested Steps", description: "Each fix is small and tested, so your live software never breaks while it is being improved." },
      { title: "Data Kept Safe", description: "Moving from old systems to modern ones without losing records, customers or history." },
      { title: "Modern Look, Same Business", description: "A redesign that keeps what works and fixes what does not — your customers keep using it without relearning everything." },
      { title: "Legacy Integrations", description: "Connecting old tools to new ones, so disjointed systems become one source of truth." },
    ],
    techStack: [
      { name: "PostgreSQL indexing & caching", description: "Finds and fixes the slow queries that make pages crawl." },
      { name: "API cleanup", description: "Tidies the behind-the-scenes connections so features stop breaking each other." },
      { name: "Frontend fixes", description: "Repairs layout, speed and usability problems visitors actually hit." },
      { name: "Node.js / React", description: "The stacks most existing apps here are fixed in." },
    ],
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
    outcome: "Software that keeps working after launch, instead of slowly breaking down.",
    deliverables: ["Manual and automated testing before every release", "Performance, accessibility and security checks", "Bug fixes and updates after launch", "Monitoring, so problems are found before customers report them"],
    capabilities: [
      { title: "Testing Before Every Release", description: "Manual checks plus automated tests, on phones and computers, before anything reaches your customers." },
      { title: "Repeatable Releases", description: "GitHub Actions, Docker and Vercel / AWS delivery, so every release follows the same safe steps — no surprise breakages." },
      { title: "Monitoring", description: "We watch for errors and slowdowns after launch, so problems are found before customers report them." },
      { title: "Care Plan, Cancel Anytime", description: "Bug fixes, updates and small improvements on a plan you can stop whenever you want." },
      { title: "Security Checks", description: "Sign-in, permissions and data handling checked as part of every release, not as an afterthought." },
    ],
    techStack: [
      { name: "GitHub Actions", description: "Automated testing and deployment on every change." },
      { name: "Docker", description: "Identical environments for testing and production, so “it worked here” stops being an excuse." },
      { name: "Vercel / AWS", description: "Reliable hosting and delivery for your software." },
      { name: "API & release testing", description: "Checks that features, payments and forms still work after every update." },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  industry: "saas" | "healthcare" | "business" | "sports" | "travel";
  industryLabel: string;
  line: string;
  problem: string;
  built: string[];
  result: string;
  stack: string;
  live?: string;
  image: string;
  imageAlt: string;
  /** Longer plain-language description, as in the sample structure. */
  longDescription?: string;
  /** Features: title + description each. */
  features?: { title: string; description: string }[];
  /** Technical decisions: title + explanation each. */
  decisions?: { title: string; explanation: string }[];
  /** Challenges: problem + solution each. */
  challenges?: { problem: string; solution: string }[];
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
    longDescription: "An enterprise people platform with a dynamic, admin-configurable role-based permission system — permissions assigned per role from the admin panel, not hardcoded. It covers employee onboarding and department hierarchy, attendance and leave with multi-step approvals, hiring and recruitment pipelines, and project and task tracking for teams, with AI agents helping where manual checking used to slow everything down.",
    features: [
      { title: "Dynamic Role-Based Permissions", description: "Admins assign permissions per role from the panel — access rules are configurable, not hardcoded into the app." },
      { title: "Employee Management", description: "Onboarding flows, department hierarchy, and profile records for the full employee lifecycle." },
      { title: "Attendance & Leave Approvals", description: "Attendance tracking and leave requests with multi-step approval workflows." },
      { title: "Hiring & Recruitment", description: "A candidate pipeline for tracking applicants through hiring stages, with screening help from AI agents." },
      { title: "Project & Task Tracking", description: "Project management for task assignment and team progress tracking." },
      { title: "Secure Portal Access", description: "An authenticated employee portal with sign-in and password recovery for workforce access." },
    ],
    decisions: [
      { title: "Permissions as data, not code", explanation: "RBAC is admin-configurable, so organisations can evolve roles without shipping a new release for every permission change." },
      { title: "Approval workflows as first-class state machines", explanation: "Leave and attendance approvals use explicit multi-step states, so auditability and accountability stay clear." },
    ],
    challenges: [
      { problem: "Hardcoded permissions blocked different organisations from structuring roles their own way.", solution: "Built a dynamic permission matrix configurable from the admin panel." },
      { problem: "HR work was done by hand, with slow checks for leave, payroll and hiring.", solution: "Added AI agents that help validate leave and flag payroll problems, plus a real-time audit log of every change." },
    ],
    image: "/images/work/work-hr.svg",
    imageAlt: "Illustration of the HR management dashboard interface",
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
    longDescription: "A system built for one of the biggest problems with AI in production: confident-sounding answers that are wrong. Using a LangGraph multi-agent architecture, the assistant runs a Corrective RAG flow: it retrieves documents, scores their relevance, and if the context is not enough, it rewrites the question and searches the web as a fallback. A Self-RAG step then grades the answer against the source before it is shown. The result is an assistant that answers from a business's own data — and says when it does not know.",
    features: [
      { title: "Semantic Vector Search", description: "High-accuracy retrieval using embeddings over the business's own documents, stored in Pinecone or ChromaDB." },
      { title: "Relevance Grading", description: "A checking step that asks whether the retrieved documents actually contain the answer, before anything is generated." },
      { title: "Automated Web Fallback", description: "If internal documents lack the answer, the agent rewrites the query and searches the web — and makes clear where the answer came from." },
      { title: "Self-RAG Factual Checking", description: "Answers are graded against their source before they are shown, so customers see checked answers, not guesses." },
      { title: "Supervisor-Worker Agents", description: "A supervisor agent splits work between specialists — one finds, one checks, one writes — instead of one agent guessing everything." },
      { title: "Database Agent", description: "An agent that can answer from a database, through checked queries, and hand anything unsure to a human." },
    ],
    decisions: [
      { title: "Why LangGraph over basic chains?", explanation: "Basic chains are linear. A production RAG system needs conditional logic and cycles — did I find the answer? If not, search again. LangGraph's state-machine design makes those loops reliable." },
      { title: "Separation of concerns via agents", explanation: "Smaller specialised agents for sub-tasks — a strict checker versus a writer — reduce invented answers and make results more predictable than one massive call." },
    ],
    challenges: [
      { problem: "AI chatbots gave answers that sounded confident but were wrong, or missed the right information entirely.", solution: "Built Corrective RAG plus Self-RAG: retrieve, grade, rewrite and fall back when needed, and grade the answer before showing it." },
      { problem: "An agent answering from a database could get the query wrong.", solution: "Added checking and retry steps, and a human handover whenever the answer is unsure — the agent never presents a guess as fact." },
    ],
    image: "/images/work/work-ai.svg",
    imageAlt: "Illustration of the AI assistant chat interface with verified answers",
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
    longDescription: "A telemedicine platform connecting patients with chronic-pain specialists through secure remote consultations. The platform covers the full care journey: time-slot booking, secure payment, automated confirmation with secure video links, asynchronous multi-file medical review (labs, imaging, diagnostic charts), specialist dashboards consolidating patient history, and referral flows for complex cases.",
    features: [
      { title: "Video Consultation Booking", description: "End-to-end booking with time-slot selection, confirmation, and secure video access links delivered by email after payment." },
      { title: "Secure Payment", description: "Checkout wired into the appointment flow with transparent pricing and automated confirmation — a booking is only confirmed once payment is verified." },
      { title: "Async Medical Review", description: "Patients upload diagnostic charts, lab reports and imaging for specialist review on a structured service window, before any live call." },
      { title: "Specialist Dashboard", description: "A patient's full document and consultation history in a single view, ahead of each call." },
      { title: "Cross-Regional Referrals", description: "Physicians can route complex cases to specialists across the platform without leaving the care workflow." },
      { title: "Patient Care Journey", description: "Specialist search, visit types, reminders and health content for chronic conditions, all in one place." },
    ],
    decisions: [
      { title: "Booking + payment as one transactional journey", explanation: "Availability, payment confirmation and video-link issuance are treated as a single journey, so patients never land in a paid-but-unconfirmed state." },
      { title: "Async review for specialist throughput", explanation: "Heavy document review is separated from live video slots, so specialists can triage cases before consultations instead of reading files during them." },
    ],
    challenges: [
      { problem: "Patients needed both live video care and document-heavy specialist review.", solution: "Built dual paths — instant teleconsult booking and a multi-file async review module with specialist routing." },
      { problem: "Complex cases required specialists outside the patient's local region.", solution: "Implemented a referral flow so physicians can hand off cases inside the same platform." },
    ],
    live: "mejoratudolor.cl",
    image: "/images/work/work-telemedicine.svg",
    imageAlt: "Illustration of the telemedicine booking and consultation interface",
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
    longDescription: "A business management SaaS for local businesses. Core delivery includes point-of-sale and cloud operations, unified appointment scheduling with billing and lead tracking, a real-time performance cockpit covering employees, clients and engagement, and location-based targeting for local marketing — helping operators run day-to-day work from one platform instead of many.",
    features: [
      { title: "POS & Cloud Operations", description: "Core dashboard modules for point-of-sale and cloud-based day-to-day business management." },
      { title: "Appointments + Billing + Leads", description: "One system combining scheduling, billing and lead tracking, so operators stop juggling tools." },
      { title: "Real-Time Performance Cockpit", description: "Live views consolidating employee output, client metrics and engagement data." },
      { title: "Geolocation Marketing", description: "Local targeting tools that help businesses run location-aware campaigns from the same platform." },
      { title: "Omnichannel Business Ops", description: "Follow-up, inventory-aware operations and marketing channels around the local business workflow." },
      { title: "Modular Vertical Delivery", description: "Built to serve local service businesses with modules that expand across sales, operations and media workflows." },
    ],
    decisions: [
      { title: "One cockpit instead of tool sprawl", explanation: "Appointments, billing, leads and performance metrics share one operational model, so local teams get a single source of truth." },
      { title: "Geo as a first-class marketing signal", explanation: "Location targeting is wired into the marketing tools rather than bolted on as a separate campaign spreadsheet." },
    ],
    challenges: [
      { problem: "Local businesses were losing leads and time across disconnected point-of-sale, calendar and marketing tools.", solution: "Unified the core modules into one cloud cockpit with live operational metrics." },
    ],
    image: "/images/work/work-cliender.svg",
    imageAlt: "Illustration of the Cliender business management dashboard",
  },
  {
    slug: "book-dubai-guide",
    title: "BookDubaiGuide — Dubai Tours Booking",
    industry: "travel",
    industryLabel: "Travel & Tourism",
    line: "Dubai tours booked in minutes, with hotel pickup and no advance deposit.",
    problem: "Visitors to Dubai had to search separate sites for desert safaris, buggy rides, yacht cruises and city tours, with unclear pickup, payment and cancellation rules.",
    built: ["23 curated experiences in one booking site, grouped as Desert Safaris, Buggy/ATV, City Tours, Water Sports & Cruises, and Aerial Tours", "Red dune safaris and 1000cc Polaris buggy experiences, alongside luxury yacht cruises and city tours", "Hotel pickup across Dubai, with clear pickup details shown before booking", "Pay on pickup with no advance deposit, free cancellation 4–5 hours before, and instant WhatsApp confirmation"],
    result: "Travellers can choose, book and confirm a tour in minutes — and the business takes bookings without phone calls, with pickup and payment rules clear up front.",
    stack: "Booking website with tour listings, hotel pickup scheduling and WhatsApp confirmation",
    longDescription: "A booking platform for Dubai tours and desert experiences, built for visitors booking on their phones. It brings desert safaris, buggy rides, yacht cruises and city tours into one place, with hotel pickup, clear payment and cancellation rules, and instant WhatsApp confirmation — so travellers book in minutes and the business takes bookings without phone calls.",
    features: [
      { title: "Dynamic Tour Packages", description: "23 curated experiences grouped clearly — Desert Safaris, Buggy/ATV, City Tours, Water Sports & Cruises, and Aerial Tours — with clear details before booking." },
      { title: "Direct WhatsApp Booking", description: "A booking flow that drops customers into a WhatsApp conversation with pre-filled tour details, instead of a long multi-step checkout." },
      { title: "Immersive Visuals", description: "Image-first design that shows the experience — red dunes, buggies, yachts — before the customer even reads the details." },
      { title: "Hotel Pickup Scheduling", description: "Hotel pickup across Dubai, with pickup details shown clearly before booking." },
      { title: "Clear Payment & Cancellation Rules", description: "Pay on pickup with no advance deposit, and free cancellation hours before the tour — stated up front, not hidden." },
    ],
    decisions: [
      { title: "Optimised for mobile booking", explanation: "Tourists book on the go, so the site is built phone-first with one-tap WhatsApp confirmation, skipping complex checkout flows." },
      { title: "Rules up front, not at checkout", explanation: "Pickup, payment and cancellation rules are shown before booking, so customers book with confidence and support messages drop." },
    ],
    challenges: [
      { problem: "Visitors dropped off during traditional multi-step checkout.", solution: "Implemented one-tap WhatsApp booking to capture the booking instantly." },
      { problem: "Separate sites left pickup, payment and cancellation rules unclear.", solution: "Put every experience, rule and confirmation in one booking site." },
    ],
    live: "bookdubaiguide.com",
    image: "/images/work/work-dubai.svg",
    imageAlt: "Illustration of the Dubai tours booking interface",
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
    longDescription: "A dual-sided sports platform: a club-owner web dashboard for managing matches, player-level upgrades and club operations; skill-level matchmaking for fair pairing; player-facing mobile flows to view and join matches, approve or decline requests, and track availability; plus a marketing landing with feature sections, pricing tiers and subscription-based access.",
    features: [
      { title: "Club-Owner Dashboard", description: "A web dashboard for managing matches, approving player-level upgrade requests, and overseeing club operations." },
      { title: "Skill-Based Matchmaking", description: "Matchmaking logic pairs players by skill level and playing history, so games stay competitive and fair." },
      { title: "Player Mobile Flows", description: "Core screens for viewing and joining matches, approving or declining requests, and tracking availability." },
      { title: "Marketing Landing", description: "A growth landing with feature sections, pricing tiers and store links for the app." },
      { title: "Subscription Access Model", description: "Tiered plans control platform access for clubs and players, with recurring billing handled automatically." },
      { title: "Dual Product Surface", description: "One system serving club operators and players, with match and availability workflows kept in sync." },
    ],
    decisions: [
      { title: "Skill as the matchmaking primitive", explanation: "Pairing is driven by skill level, so club quality and player retention stay higher than with random open matches." },
      { title: "Club ops + player app as one product", explanation: "Approvals, upgrades and availability are shared across dashboard and mobile, so operations stay consistent." },
    ],
    challenges: [
      { problem: "Clubs needed operations control while players needed a fast mobile match experience.", solution: "Split surfaces — a web dashboard for clubs and mobile flows for players — on shared matchmaking rules." },
      { problem: "Clubs were scheduling matches and chasing memberships by phone and paper lists.", solution: "Added court scheduling, occupancy views and automatic subscription billing in one platform." },
    ],
    live: "padel-fe.vercel.app",
    image: "/images/work/work-padel.svg",
    imageAlt: "Illustration of the Padel Connect court booking interface",
  },
];

export const processSteps = [
  { n: 1, title: "Discover", text: "We learn your business, your customers, and the problem. You get a clear scope, timeline and estimate before we build anything." },
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
  { title: "Clear Communication", text: "One point of contact, weekly progress and demos, and work scheduled to suit your time zone." },
];

export const faqs = [
  { q: "How much does a website or app cost?", a: "It depends on size and features. As a rough guide only: a small website starts in a lower range, a website with booking or CRM costs more, and a custom system or mobile app costs more again. Use the Estimator for a rough range, then book a free consultation for a firm quote — the full price is agreed before work starts." },
  { q: "How long does a project take?", a: "A small website can take a few weeks. A booking system, CRM or mobile app usually takes longer, built in phases: a prototype first, then a working version, then the full product. You will get a timeline in writing before we start." },
  { q: "Do you work with clients outside your country?", a: "Yes. CraftThink works remotely with clients worldwide. Communication is by video call, chat and email, with weekly demos, scheduled to suit your time zone." },
  { q: "I already have a website or software. Can you fix it?", a: "Yes. Start with the free audit: tell us what is slow, broken or confusing, and we will list the top fixes. Many clients start with a small fix sprint before a bigger rebuild." },
  { q: "What is the AI assistant on this site?", a: "It is Think, the guide on this site. It answers only from our own services, projects, process and FAQs. It suggests the right service and project for your problem, and hands you to a free consultation when it does not know." },
  { q: "Can AI answer my customers for me?", a: "Yes — that is one of our services. We build AI assistants that answer from your own business data, with factual checking, and hand over to a human whenever they are unsure. See the RAG AI Assistant project." },
  { q: "Will I own my website, app and data?", a: "Yes. Your website, app, code and customer data are yours. We hand over access, logins and documentation at launch, and we never hold your business hostage." },
  { q: "Do you build mobile apps, or only websites?", a: "Both. Mobile apps are a full service, not a side note: one React Native app for iOS and Android, with bookings, memberships or subscriptions, plus a web admin panel for you." },
  { q: "What happens after launch?", a: "We test, monitor and support your software. A care plan covers bug fixes, updates and small improvements, so your site does not slowly break as browsers, phones and payment rules change." },
  { q: "How do we start?", a: "Book a free consultation, or try the Estimator or Free Audit first. In the first call we will understand your problem, show you a similar project, and give you a clear next step — with no obligation." },
  { q: "Do you need all my content and photos before we start?", a: "No. We start with what you have, and we will tell you exactly what we still need — text, photos, logo, prices — in a simple checklist." },
  { q: "How do payments work?", a: "We agree milestones in writing before building. For medium projects a common split is a deposit to start, a payment at demo, and the balance at launch. The exact split is confirmed in your quote." },
];

/** Knowledge base for the Think chat: scored keyword topics -> reply + links. */
export type GuideReply = { text: string; serviceHref?: string; serviceLabel?: string; projectHref?: string; projectLabel?: string };

export type GuideContext = {
  /** Last reply that pointed at a service (for follow-up questions). */
  topic?: GuideReply;
  /** Previous visitor messages, oldest first (for business context). */
  history?: string[];
};

/**
 * The on-site guide brain. No external key, no paid dependency, and no
 * visitor data leaves the site: every answer is composed here from
 * CraftThink's own services, projects and FAQs below.
 *
 * How it answers:
 * 1. FAQ match — if the question closely matches a real FAQ question,
 *    the answer is that FAQ's own answer, plus a next-step card.
 * 2. Scored topic match — keyword/synonym hits across services (with
 *    multi-word phrases worth more, short words matched whole-word so
 *    "site" never fires inside "website"). The winning service's real
 *    title, line, outcome and a similar project's real line are
 *    composed into natural sentences — not a single canned line.
 * 3. Follow-ups — a question with no new topic ("and for that?",
 *    "what about price?") reuses the last discussed service, and a
 *    business type mentioned earlier ("my salon", "my shop") is
 *    carried into the answer.
 * 4. Anything else — an honest answer that Think only covers
 *    CraftThink's services, projects and process, with a free
 *    consultation card. Nothing is invented.
 * Cost answers never give a number: cost depends on size and features,
 * and a free consultation gives the firm quote.
 */
export function guideAnswer(input: string, context?: GuideContext): GuideReply {
  const q = input.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));
  const lastTopic = context?.topic;
  const history = context?.history ?? [];

  const findService = (slug: string) => services.find((s) => s.slug === slug);
  const findProject = (slug: string) => projects.find((p) => p.slug === slug);

  // --- Business context from this and earlier messages ----------------------
  const businessTypes: { keywords: string[]; label: string }[] = [
    { keywords: ["salon", "barber", "spa"], label: "salon" },
    { keywords: ["clinic", "doctor", "dentist", "patient"], label: "clinic" },
    { keywords: ["shop", "store", "boutique"], label: "shop" },
    { keywords: ["restaurant", "cafe"], label: "restaurant" },
    { keywords: ["gym", "club"], label: "club" },
    { keywords: ["school", "academy"], label: "school" },
    { keywords: ["tour", "travel", "dubai"], label: "tour business" },
    { keywords: ["hotel", "guesthouse"], label: "hotel" },
  ];
  const businessOf = (text: string) => {
    const t = text.toLowerCase();
    return businessTypes.find((b) => b.keywords.some((k) => t.includes(k)))?.label;
  };
  const business = businessOf(q) ?? [...history].reverse().map(businessOf).find(Boolean);

  // --- Composed answers from real service / project data --------------------
  const nextStep = "The next step is a free consultation, where we confirm the scope and a firm quote for your business.";
  function serviceAnswer(service: NonNullable<ReturnType<typeof findService>>, project?: ReturnType<typeof findProject>, second?: ReturnType<typeof findService>): GuideReply {
    const lead = business ? `For a ${business}, ${service.title} fits best.` : `${service.title} fits best here.`;
    let text = `${lead} ${service.line}${service.outcome ? ` ${service.outcome}` : ""}`;
    if (project) text += ` A similar project is ${project.title} — ${project.line}`;
    if (second) text += ` You may also need ${second.title}: ${second.line}`;
    text += ` ${nextStep}`;
    return {
      text,
      serviceHref: `/services/${service.slug}`,
      serviceLabel: service.title,
      projectHref: project ? `/work/${project.slug}` : undefined,
      projectLabel: project?.title,
    };
  }
  function aiService() {
    return findService("ai-solutions")!;
  }
  function aiCapability(title: string) {
    return aiService().capabilities?.find((c) => c.title === title)?.description ?? "";
  }
  function aiTech(name: string) {
    return aiService().techStack?.find((t) => t.name === name)?.description ?? "";
  }

  // --- FAQ match -------------------------------------------------------------
  const stopwords = new Set("how does you your can the and for with before after what when where why will would should about this that are its from have has had but not all any out per use using need needs want wants get got make made".split(" "));
  const tokens = (text: string) =>
    text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length > 3 && !stopwords.has(w));
  const qTokens = tokens(q);
  let bestFaq: { a: string; q: string; score: number } | null = null;
  for (const f of faqs) {
    const overlap = tokens(f.q).filter((w) => qTokens.includes(w)).length;
    if (overlap > (bestFaq?.score ?? 0)) bestFaq = { a: f.a, q: f.q, score: overlap };
  }
  function faqLink(faqQ: string): { href: string; label: string } {
    if (faqQ.includes("cost")) return { href: "/estimate", label: "Get an Estimate" };
    if (faqQ.includes("how long")) return { href: "/process", label: "Our Process" };
    if (faqQ.includes("outside your country")) return { href: "/about", label: "About the CEO" };
    if (faqQ.includes("fix it")) return { href: "/services/fix-improve", label: "Fix & Improve Your Existing Software" };
    if (faqQ.includes("AI assistant on this site") || faqQ.includes("answer my customers")) return { href: "/services/ai-solutions", label: "AI Solutions & AI Assistant" };
    if (faqQ.includes("mobile apps")) return { href: "/services/mobile-apps", label: "Mobile Apps" };
    if (faqQ.includes("after launch")) return { href: "/services/testing-care", label: "Testing, Support & Care" };
    return { href: "/consultation", label: "Book a Free Consultation" };
  }

  // --- Scored topic match ------------------------------------------------------
  // Short keywords match whole words only, so "site" does not fire inside
  // "website" and "app" does not fire inside "apple". Longer keywords
  // and phrases match as substrings, as before.
  const matchKw = (kw: string) =>
    kw.includes(" ") ? q.includes(kw) : kw.length <= 4 ? new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(q) : q.includes(kw);
  type Topic = { keywords: string[]; serviceSlug: string; projectSlug?: string; special?: "langchain" | "multi-agent" | "rag" | "automation" };
  const topics: Topic[] = [
    { keywords: ["slow", "loading", "loads slowly", "takes long to load", "fast", "speed", "lag", "crash", "broken", "fix", "bug", "error", "not working", "old", "outdated"], serviceSlug: "fix-improve", projectSlug: "hr-management-system" },
    { keywords: ["mobile app", "app", "android", "iphone", "ios", "react native"], serviceSlug: "mobile-apps", projectSlug: "padel-connect" },
    { keywords: ["langchain", "langgraph"], serviceSlug: "ai-solutions", projectSlug: "rag-ai-assistant", special: "langchain" },
    { keywords: ["multi-agent", "multi agent", "supervisor", "agent team", "team of agents"], serviceSlug: "ai-solutions", projectSlug: "rag-ai-assistant", special: "multi-agent" },
    { keywords: ["rag", "corrective", "self-rag", "self rag", "vector", "pinecone", "chromadb", "from my documents", "my documents", "own documents", "our documents", "answers from"], serviceSlug: "ai-solutions", projectSlug: "rag-ai-assistant", special: "rag" },
    { keywords: ["automation", "agents doing", "agent that does", "agents that do", "do work for", "does work for", "automate"], serviceSlug: "ai-solutions", special: "automation" },
    { keywords: ["ai", "chatbot", "assistant", "answer customer", "answer my customers"], serviceSlug: "ai-solutions", projectSlug: "rag-ai-assistant" },
    { keywords: ["crm", "customer", "sales", "billing", "manage business", "pos"], serviceSlug: "crm", projectSlug: "cliender" },
    { keywords: ["tour", "dubai", "desert", "safari", "buggy", "yacht", "travel", "holiday", "trip", "excursion"], serviceSlug: "booking", projectSlug: "book-dubai-guide" },
    { keywords: ["book", "booking", "appointment", "schedule", "reservation", "clinic", "doctor", "dentist", "patient", "salon", "barber", "spa", "restaurant", "cafe", "gym", "club", "school", "class", "court"], serviceSlug: "booking", projectSlug: "telemedicine" },
    { keywords: ["shop", "store", "sell", "ecommerce", "e-commerce", "checkout", "product", "market", "boutique"], serviceSlug: "online-store", projectSlug: "cliender" },
    { keywords: ["hr", "staff", "leave", "payroll", "employee", "hiring"], serviceSlug: "hr-systems", projectSlug: "hr-management-system" },
    { keywords: ["design", "redesign", "look", "premium", "ui", "ux"], serviceSlug: "ui-ux-design", projectSlug: "cliender" },
    { keywords: ["website", "site", "portfolio", "online"], serviceSlug: "website-design", projectSlug: "cliender" },
    { keywords: ["support", "care", "test", "maintenance", "after launch"], serviceSlug: "testing-care" },
    { keywords: ["remote", "worldwide", "country", "location"], serviceSlug: "website-design", projectSlug: "cliender" },
  ];
  const scored = topics
    .map((t) => ({ topic: t, score: t.keywords.reduce((s, kw) => s + (matchKw(kw) ? (kw.includes(" ") ? 2 : 1) : 0), 0) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  const second = scored[1] && scored[1].score >= 2 && scored[1].score >= (best?.score ?? 0) - 1 ? scored[1].topic : undefined;

  // A FAQ match beats a weaker topic match; otherwise the topic wins,
  // and a FAQ still wins when nothing else scored.
  if (bestFaq && bestFaq.score >= 2 && (!best || bestFaq.score >= best.score)) {
    const link = faqLink(bestFaq.q);
    return { text: `${bestFaq.a} ${nextStep}`, serviceHref: link.href, serviceLabel: link.label };
  }

  // Cost: never a number. Keep the best topic's cards when one scored,
  // or the last discussed service for follow-up price questions.
  const costHit = has("cost", "price", "budget", "quote", "estimate", "how much", "expensive", "cheap");
  if (costHit) {
    const topic = best?.topic;
    const service = topic ? findService(topic.serviceSlug) : undefined;
    const project = topic?.projectSlug ? findProject(topic.projectSlug) : undefined;
    const linkService = service ?? (lastTopic?.serviceHref?.startsWith("/services/") ? findService(lastTopic.serviceHref.replace("/services/", "")) : undefined);
    return {
      text: `Costs depend on size and features. The Estimator gives a rough range and timeline, labelled as an estimate only — then a free consultation gives you a firm quote.${linkService ? ` For ${linkService.title}, that quote follows the same free consultation.` : ""}`,
      serviceHref: linkService ? `/services/${linkService.slug}` : "/estimate",
      serviceLabel: linkService ? linkService.title : "Get an Estimate",
      projectHref: project ? `/work/${project.slug}` : lastTopic?.projectHref,
      projectLabel: project?.title ?? lastTopic?.projectLabel,
    };
  }
  // Timeline questions get the process answer, keeping topic cards.
  if (has("how long", "duration", "turnaround", "deadline") || (has("time") && has("take"))) {
    const project = best?.topic.projectSlug ? findProject(best.topic.projectSlug) : undefined;
    return {
      text: "A small website can take a few weeks; a booking system, CRM or app takes longer, built in phases. Your timeline is agreed in writing before we start. See our process for the 6 steps.",
      serviceHref: "/process",
      serviceLabel: "Our Process",
      projectHref: project ? `/work/${project.slug}` : undefined,
      projectLabel: project?.title,
    };
  }

  if (best) {
    const service = findService(best.topic.serviceSlug)!;
    const project = best.topic.projectSlug ? findProject(best.topic.projectSlug) : undefined;
    const secondService = second ? findService(second.serviceSlug) : undefined;
    // Remote-work questions are not a service: keep the honest answer.
    if (best.topic.keywords.includes("remote") && best.topic.serviceSlug === "website-design" && !has("website", "site", "portfolio")) {
      return { text: "We work remotely with clients worldwide, with weekly demos planned around your time zone as far as possible. There is no office you need to visit.", serviceHref: "/about", serviceLabel: "About the CEO" };
    }
    if (best.topic.special === "langchain") {
      return {
        text: `LangChain — ${aiTech("LangChain")} LangGraph — ${aiTech("LangGraph")} Together, that means instead of one chatbot answering one question, you get a small team of AI steps that follow a process, with checks along the way. ${nextStep}`,
        serviceHref: "/services/ai-solutions", serviceLabel: "AI Solutions & AI Assistant", projectHref: "/work/rag-ai-assistant", projectLabel: "RAG-Based Agentic AI Assistant",
      };
    }
    if (best.topic.special === "multi-agent") {
      return {
        text: `${aiCapability("Multi-Agent Teams")} ${aiCapability("Human Handover")} ${nextStep}`,
        serviceHref: "/services/ai-solutions", serviceLabel: "AI Solutions & AI Assistant", projectHref: "/work/rag-ai-assistant", projectLabel: "RAG-Based Agentic AI Assistant",
      };
    }
    if (best.topic.special === "rag") {
      return {
        text: `${aiCapability("RAG Pipelines")} ${aiCapability("Corrective RAG")} ${aiCapability("Self-RAG Checking")} ${nextStep}`,
        serviceHref: "/services/ai-solutions", serviceLabel: "AI Solutions & AI Assistant", projectHref: "/work/rag-ai-assistant", projectLabel: "RAG-Based Agentic AI Assistant",
      };
    }
    if (best.topic.special === "automation") {
      return {
        text: `${aiCapability("Agentic Workflows")} ${nextStep}`,
        serviceHref: "/services/ai-solutions", serviceLabel: "AI Solutions & AI Assistant",
      };
    }
    return serviceAnswer(service, project, secondService);
  }

  // Greetings and thanks: friendly, but never a dead end.
  if (has("thank", "thanks", "great", "perfect", "awesome")) {
    return { text: "You are welcome! Tell me a little about your business and what you need, and I will point you to the right service — or book a free call and we will talk it through.", serviceHref: "/consultation", serviceLabel: "Book a Free Consultation" };
  }
  if (has("hello", "hi", "hey", "help", "start", "need")) {
    return { text: "Hello! Tell me what you need help with — for example: 'my website is slow', 'I need an app', or 'I need AI to answer customers'. I will point you to the right service and a similar project.", serviceHref: "/consultation", serviceLabel: "Book a Free Consultation" };
  }

  // Follow-ups with no new topic ("and for that?", "tell me more",
  // "what about that?") reuse the last discussed service, composed
  // from its real data, with the business type carried over.
  if (lastTopic?.serviceHref?.startsWith("/services/")) {
    const service = findService(lastTopic.serviceHref.replace("/services/", ""));
    if (service && has("and", "what about", "tell me more", "more about", "that one", "also", "too", "how does that work", "how would that work", "what else", "anything else")) {
      const project = lastTopic.projectHref ? findProject(lastTopic.projectHref.replace("/work/", "")) : undefined;
      return serviceAnswer(service, project);
    }
  }

  // Unknown topic: honest, with a consultation card — never a dead end
  // and never an invented answer.
  return {
    text: "I am not sure about that one yet — Think only helps with CraftThink's own services, projects and process, so I cannot answer that one properly. The best next step is a free consultation, where Muhammad can answer it for your business.",
    serviceHref: "/consultation",
    serviceLabel: "Book a Free Consultation",
  };
}
