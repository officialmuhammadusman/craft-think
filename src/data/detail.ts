/**
 * detail.ts — Per-service and per-project detail content for the
 * rebuilt detail pages. The shared shell (page order, headings,
 * closer) is the same on every page, but EVERY filling below is
 * specific to that service or project, so no two pages read alike.
 *
 * Grounding rules (same as content.ts): no employer company names,
 * no technical latency percentages, no invented clients,
 * testimonials, awards, prices, stats, durations or team sizes.
 * Phase timing uses only site-wide language already published
 * ("Week 1 written plan", "prototype first", "weekly demos",
 * "launch checks") — no per-service week counts are invented.
 * Related projects/services are only links to real CraftThink pages
 * whose existing data actually matches that service or project.
 * No cliender.com link anywhere (that domain is now a different
 * consultancy); Cliender is linked only to its CraftThink case page.
 */

export type DetailPhase = { title: string; text: string; exit: string };
export type DetailFaq = { q: string; a: string };

export type ServiceDetail = {
  /** Why it matters: the pain and cost of doing nothing, plain language. */
  pain: string;
  /** Timed process: phases specific to this service, with exits. */
  process: DetailPhase[];
  /** Business benefits/outcomes, plain language. */
  benefits: string[];
  /** Per-service FAQ (3-4), answers grounded in site copy/process. */
  faqs: DetailFaq[];
  /** Slugs of 3 related services. */
  relatedServices: string[];
  /** Slugs of real related projects (from existing project data). */
  relatedProjects: string[];
};

export type ProjectDetail = {
  /** Who the project was for (business type/scale, anonymised). */
  clientBackground: string;
  /** Phases the project actually went through, from existing data. */
  phases: DetailPhase[];
  /** Slugs of the matching service pages. */
  serviceSlugs: string[];
  /** Optional scannable tech chips when the stack string is prose. */
  techChips?: string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "website-design": {
    pain: "Most visitors decide in seconds. A slow or confusing website sends them to a competitor before they ever contact you — and a site that looks unfinished makes even a good business look unreliable.",
    process: [
      { title: "Discover", text: "We learn what you sell, who your customers are, and what the site must do for them.", exit: "Week 1 · A written plan: pages, scope and price, agreed before we build." },
      { title: "Design prototype", text: "A clickable version of the site first, so you approve the look and flow on your phone.", exit: "Prototype first · No production build starts without your sign-off." },
      { title: "Build", text: "We build the site mobile-first, with forms, pages and search basics in small, tested steps.", exit: "Weekly demos · You see progress every week and can steer it." },
      { title: "Test & launch", text: "We test on phones and computers, check forms and speed, then launch with you.", exit: "Launch checks · You own the site, code and content from day one." },
    ],
    benefits: ["Customers find you, trust you and contact you — instead of bouncing to a competitor.", "A site that works on phones, where most of your visitors actually are.", "Pages that explain what you sell clearly, so enquiries arrive already informed.", "A design system that keeps every new page looking like one brand as you grow."],
    faqs: [
      { q: "How long does a website take?", a: "A small website can take a few weeks. You get a timeline in writing before we start, and weekly demos while it is built." },
      { q: "Do I need all my content ready first?", a: "No. We start with what you have and give you a simple checklist — text, photos, logo, prices — for the rest." },
      { q: "Will I own my website?", a: "Yes. The website, code and content are yours, with logins and access handed over at launch." },
      { q: "Can the site grow into a store or booking system later?", a: "Yes. It is built so new sections — a store, bookings, a customer area — can be added without rebuilding from scratch." },
    ],
    relatedServices: ["business-websites", "ui-ux-design", "online-store"],
    relatedProjects: ["cliender", "padel-connect"],
  },
  "business-websites": {
    pain: "Without a trusted online home, customers cannot check your services, photos or prices — so they call around, or choose a competitor whose business they could see clearly online.",
    process: [
      { title: "Scope", text: "We agree the core pages first — services, about, work, contact — and cut everything that does not help a visitor decide.", exit: "Week 1 · A written plan: pages, scope and price, agreed before we build." },
      { title: "Prototype", text: "A clickable version of the site for you to try on your phone and approve.", exit: "Prototype first · No production build starts without your sign-off." },
      { title: "Build", text: "We build the approved design with a simple content structure you can update yourself.", exit: "Weekly demos · You see progress every week and can steer it." },
      { title: "Launch & updates", text: "We launch, check forms and mobile display with you, and show you how everyday updates work.", exit: "Launch checks · You own the site and can update services and photos yourself." },
    ],
    benefits: ["A business customers can check in minutes — services, photos, contact, all in one place.", "A premium, established look, even for a small business.", "A fast mobile version, because most visitors are on phones.", "Everyday updates without paying a developer for each small change."],
    faqs: [
      { q: "I am a small business — is a full website worth it?", a: "Yes, if customers search for you online first. A clear, trusted site turns searches into enquiries instead of lost calls." },
      { q: "Can I update it myself afterwards?", a: "Yes. Everyday changes — a new service, a new photo — use a simple structure, and we show you how at launch." },
      { q: "How is this different from a landing page?", a: "A landing page sells one thing. A business website explains the whole business — services, proof, contact — so visitors trust you before they call." },
    ],
    relatedServices: ["website-design", "ui-ux-design", "booking"],
    relatedProjects: ["cliender", "padel-connect"],
  },
  "online-store": {
    pain: "Taking orders by message means missed orders, manual payment chasing, and no record of what sold. Every message you answer by hand is time you could spend running the shop.",
    process: [
      { title: "Discover", text: "We learn what you sell, how you deliver, and how payments should work for your business.", exit: "Week 1 · A written plan: catalogue, payments and price, agreed before we build." },
      { title: "Design & catalogue", text: "Product pages, cart and checkout designed phone-first, with clear totals at every step.", exit: "Prototype first · You approve the checkout flow before we build it." },
      { title: "Build & payments", text: "We build the store, wire up verified payments, and connect orders, customers and stock.", exit: "Weekly demos · You test the checkout yourself as it is built." },
      { title: "Test & launch", text: "We test payments, orders and receipts end to end, on phones, before launch.", exit: "Launch checks · Every payment verified before an order is marked paid." },
    ],
    benefits: ["Orders taken while you sleep, with payments verified — not assumed.", "No more chasing messages to confirm an order or a payment.", "Orders, customers and stock in one dashboard, instead of scattered chats.", "A checkout customers actually finish, built phone-first."],
    faqs: [
      { q: "How are payments handled safely?", a: "Every payment is confirmed with the payment provider before an order is marked paid, so you never ship an order that was never actually paid for." },
      { q: "Can I manage stock and orders myself?", a: "Yes. Orders, customers and stock live in one dashboard, and we show you how it works at launch." },
      { q: "What about subscriptions?", a: "Repeat billing is handled automatically, with clear records when a plan changes or a payment fails." },
      { q: "Will the store work well on phones?", a: "Yes — checkout is built phone-first, with few steps and clear totals, because most shoppers are on phones." },
    ],
    relatedServices: ["booking", "crm", "website-design"],
    relatedProjects: ["cliender"],
  },
  "mobile-apps": {
    pain: "Repeat customers have no easy way back to you. Bookings, memberships and matches handled by phone or paper lists mean missed bookings, empty slots and memberships chased by hand.",
    process: [
      { title: "Discover", text: "We learn who the app is for, what it must do, and what the admin side needs to control.", exit: "Week 1 · A written plan: screens, features and price, agreed before we build." },
      { title: "Design & prototype", text: "App screens designed phone-first and prototyped so you can try the flow before we build.", exit: "Prototype first · You approve the screens before production code." },
      { title: "Build", text: "One React Native codebase for iOS and Android, with the web admin panel built alongside it.", exit: "Weekly demos · You test real builds on your own phone as they are made." },
      { title: "Store release & support", text: "We handle store listings and releases for Apple and Google, then support and update the app.", exit: "Launch checks · Support after launch, on a plan you can cancel anytime." },
    ],
    benefits: ["Your business on your customers' home screens, not just in a browser tab.", "Bookings, memberships or matches inside the app — no phone tag.", "One codebase for iOS and Android, so updates ship once, not twice.", "An admin panel so you control what customers see without touching app code."],
    faqs: [
      { q: "Do I need two apps, one for iPhone and one for Android?", a: "No. One React Native app covers both from a single codebase, so you maintain one app, not two." },
      { q: "How do store approvals work?", a: "We handle the store listings, review requirements and releases for Apple and Google." },
      { q: "What happens after launch?", a: "Updates and support continue after launch, on a care plan you can cancel anytime." },
      { q: "Can customers use the app with a bad connection?", a: "Yes. The app is built to keep working when connection drops and sync when it returns, so customers are never stuck on a blank screen." },
    ],
    relatedServices: ["ui-ux-design", "website-design", "booking"],
    relatedProjects: ["padel-connect"],
  },
  crm: {
    pain: "Leads in chats, sales in spreadsheets, billing somewhere else — nothing agrees, and nobody can say what is actually happening in the business. Growing like that means hiring people just to chase information.",
    process: [
      { title: "Discover", text: "We map how customers, sales, billing and staff work today, and where information gets lost.", exit: "Week 1 · A written plan: modules, permissions and price, agreed before we build." },
      { title: "Design workflows", text: "We design the dashboard and the workflows — leads, sales, billing, staff views — and prototype the key screens.", exit: "Prototype first · You approve the workflows before we build them." },
      { title: "Build", text: "We build module by module — customers, billing, staff, reports — with role permissions from the start.", exit: "Weekly demos · Your team tests each module as it is built." },
      { title: "Rollout & support", text: "We launch with your real data, check billing and reports with you, then support and improve it.", exit: "Launch checks · Support after launch, on a plan you can cancel anytime." },
    ],
    benefits: ["One dashboard for customers, sales, staff and billing — no more tool sprawl.", "Billing that runs itself, with clear records instead of manual chasing.", "Reports that show what is actually happening, so decisions use real numbers.", "Every staff member sees only what their job needs, with a record of who changed what."],
    faqs: [
      { q: "We already use spreadsheets — will we lose our data?", a: "No. Moving to the new system keeps your records, customers and history — migration is planned so nothing important is lost." },
      { q: "Can different staff see different things?", a: "Yes. Permissions are set by role, so managers, staff and admins each get their own view." },
      { q: "Does it handle subscriptions and billing?", a: "Yes. Subscriptions, upgrades and failed payments are handled with clear records, instead of manual chasing." },
      { q: "What if we only need part of it first?", a: "That is normal. We build module by module, so you can start with customers and billing and add staff views or reports later." },
    ],
    relatedServices: ["booking", "hr-systems", "online-store"],
    relatedProjects: ["cliender", "hr-management-system"],
  },
  booking: {
    pain: "Phone bookings mean missed calls, double-booked slots and empty slots from no-shows. Staff spend their day answering the phone instead of serving the customers who are already there.",
    process: [
      { title: "Discover", text: "We learn your services, slots, staff and payment rules — and where bookings go wrong today.", exit: "Week 1 · A written plan: booking flow, payments and price, agreed before we build." },
      { title: "Design booking flow", text: "We design and prototype the booking journey — pick a slot, pay, get confirmed — phone-first.", exit: "Prototype first · You approve the flow before we build it." },
      { title: "Build & payments", text: "We build slot locks, verified payments, reminders and staff views, then test them with real scenarios.", exit: "Weekly demos · You test bookings yourself as they are built." },
      { title: "Launch & support", text: "We launch, check real bookings with you, and keep supporting the system afterwards.", exit: "Launch checks · Support after launch, on a plan you can cancel anytime." },
    ],
    benefits: ["Bookings without phone calls — customers book, pay and come.", "Slots that can never be double-booked, because a picked slot is locked.", "Fewer no-shows, thanks to automatic reminders.", "A staff view of the day and week, so the team always knows what is coming."],
    faqs: [
      { q: "Can two people book the same slot?", a: "No. When a customer picks a slot, it is locked — two people can never book the same time." },
      { q: "What if a customer pays but the booking fails?", a: "That cannot happen here. A booking is only confirmed once payment is verified, so nobody lands in a paid-but-unconfirmed state." },
      { q: "Do customers get reminders?", a: "Yes. Automatic reminders go out before the appointment, so fewer slots go empty." },
      { q: "What about visits that need documents first?", a: "Where a visit needs files first — like medical reports — patients describe the problem and upload files before the appointment, so the appointment itself is shorter and better prepared." },
    ],
    relatedServices: ["crm", "mobile-apps", "online-store"],
    relatedProjects: ["telemedicine", "padel-connect", "book-dubai-guide"],
  },
  "hr-systems": {
    pain: "HR work done by hand — in chats and spreadsheets — means slow approvals, payroll mistakes nobody catches, and no record when someone asks who approved what.",
    process: [
      { title: "Discover", text: "We map your roles, approvals, leave and payroll checks, and where manual work slows everything down.", exit: "Week 1 · A written plan: modules, permissions and price, agreed before we build." },
      { title: "Design permissions & workflows", text: "We design role permissions and approval steps, and prototype the key screens for staff and managers.", exit: "Prototype first · You approve the workflows before we build them." },
      { title: "Build & AI checks", text: "We build the portal, approvals and hiring workflows, with AI agents that help validate leave and flag payroll problems.", exit: "Weekly demos · Your team tests each workflow as it is built." },
      { title: "Launch & support", text: "We launch with your staff data, check approvals and the audit log with you, then support it.", exit: "Launch checks · Support after launch, on a plan you can cancel anytime." },
    ],
    benefits: ["Leave and approvals handled faster, with a clear record of every decision.", "Payroll problems flagged early, instead of discovered at month end.", "Permissions you can change from the admin panel, without a new release.", "Hiring and onboarding tracked in one place, from screening to start date."],
    faqs: [
      { q: "Can permissions change without a developer?", a: "Yes. Admins change who can do what from the panel — no new release needed every time a role changes." },
      { q: "Is staff data kept private?", a: "Yes. Sign-in, role-based permissions and encryption protect staff records, and the audit log records every change." },
      { q: "Does the AI decide approvals on its own?", a: "No. AI agents help validate leave and flag payroll problems, and anything unsure goes to a human — the AI checks, it does not decide alone." },
      { q: "Can it handle hiring too?", a: "Yes. Applicants are tracked through stages, from screening to onboarding, in the same system." },
    ],
    relatedServices: ["crm", "ai-solutions", "testing-care"],
    relatedProjects: ["hr-management-system", "rag-ai-assistant"],
  },
  "ui-ux-design": {
    pain: "A website or app that looks old or confusing loses customers before they even try your product. If visitors cannot find what they need in seconds, they leave — and they rarely tell you why.",
    process: [
      { title: "Research", text: "We learn who your customers are and what confuses them now, before drawing anything.", exit: "Week 1 · A written plan: research, screens and price, agreed before we design." },
      { title: "Wireframes & prototype", text: "We sketch the flow, then build a clickable prototype you can try on your phone.", exit: "Prototype first · You approve the flow before a single line of production code." },
      { title: "Design system", text: "We design the full look — colours, type, components — so every page looks like one brand.", exit: "Weekly demos · You review the design as it takes shape." },
      { title: "Handoff & build support", text: "The approved design is built exactly, with no design that looks good but cannot be built.", exit: "Launch checks · The built product matches the approved design." },
    ],
    benefits: ["A design customers understand at a glance, so fewer visitors leave confused.", "A prototype you approve before building, so there are no expensive redesigns later.", "One consistent design system, so new pages match the old ones automatically.", "Mobile-first layouts, designed for the phone screen where most visitors are."],
    faqs: [
      { q: "Do I get to approve the design before you build?", a: "Yes. A clickable prototype comes first — you try the flow on your phone and approve it before production code." },
      { q: "Can you redesign my existing site instead of starting over?", a: "Yes. A redesign keeps what works and fixes what does not, so your customers keep using it without relearning everything." },
      { q: "Will the design work on phones?", a: "Yes. Layouts are designed mobile-first, because most of your visitors are on phones." },
      { q: "Is the design accessible?", a: "Yes. Readable text, clear contrast and tappable targets are part of the design, so more customers can use your site." },
    ],
    relatedServices: ["website-design", "mobile-apps", "business-websites"],
    relatedProjects: ["cliender", "padel-connect"],
  },
  "ai-solutions": {
    pain: "Your team answers the same questions again and again, and checks the same work by hand. A chatbot that guesses is worse than no chatbot — it teaches customers not to trust you.",
    process: [
      { title: "Discover & data review", text: "We learn which questions repeat, which work is checked by hand, and what documents the AI may answer from.", exit: "Week 1 · A written plan: use cases, data and price, agreed before we build." },
      { title: "Grounding & retrieval", text: "We connect your documents, set up vector search, and make sure answers come from your data, not general knowledge.", exit: "Prototype first · You test answers against your own documents before launch." },
      { title: "Agent workflows & checks", text: "We build the agent steps — retrieve, check, act — with LangGraph, and add human handover wherever an action matters.", exit: "Weekly demos · You test the agents on real questions as they are built." },
      { title: "Launch & monitor", text: "We launch, watch what the AI answers, and keep improving retrieval and checks.", exit: "Launch checks · Support after launch, on a plan you can cancel anytime." },
    ],
    benefits: ["Customers get correct, checked answers from your own data, any time of day.", "Staff stop answering the same questions again and again.", "Agents that do checked work — bookings, screening, approvals — with a human step where it matters.", "An AI that hands over to a person when it is unsure, instead of inventing an answer."],
    faqs: [
      { q: "Will the AI invent answers?", a: "No. Answers come from your own documents, are graded against the source before they are shown, and anything unsure goes to a human." },
      { q: "What are LangChain and LangGraph?", a: "LangChain is the toolkit for building AI apps that use your data and tools. LangGraph builds multi-step agent workflows on top of it — steps that check, decide, then act." },
      { q: "What is a multi-agent system?", a: "A small team of AI agents under one supervisor: one finds, one checks, one acts — instead of one agent guessing everything at once." },
      { q: "Can AI do work, not just chat?", a: "Yes. Agents can book, screen, route approvals and check data entries against your rules — and flag anything odd for a human instead of acting blindly." },
    ],
    relatedServices: ["hr-systems", "crm", "fix-improve"],
    relatedProjects: ["rag-ai-assistant", "hr-management-system"],
  },
  "fix-improve": {
    pain: "Software that works slowly, breaks often or looks ten years old quietly costs you customers and staff time. Every workaround your team invents is a sign the software is not doing its job.",
    process: [
      { title: "Free audit", text: "We measure first: slow queries, missing indexes, uncached work and real bugs — and list the top fixes in plain language.", exit: "Audit first · A clear fix list, before you pay for any fix." },
      { title: "Fix plan", text: "We order the fixes by impact, so you pay for what matters first, not everything at once.", exit: "Written plan · Scope, order and price agreed before fixing starts." },
      { title: "Fix in steps", text: "Each fix is small and tested, so your live software never breaks while it is being improved.", exit: "Weekly demos · You see each fix working before the next one starts." },
      { title: "Test & handback", text: "We test the fixed software end to end, on phones and computers, and hand it back with a record of what changed.", exit: "Launch checks · Your data and history kept safe throughout." },
    ],
    benefits: ["Software that feels new again, fixed in the order of what matters most.", "Live software that never breaks while it is being improved.", "Your data and history kept safe through every change.", "A clear plan, so you never pay for fixes that do not matter."],
    faqs: [
      { q: "Is the audit really free?", a: "Yes. The audit lists what is slow, broken or risky in plain language — you decide which fixes to pay for." },
      { q: "Will fixing break my live software?", a: "No. Fixes are small and tested, so live software keeps running while it is improved." },
      { q: "Do I need a full rebuild?", a: "Not always. Many clients start with a small fix sprint and only rebuild the parts that truly need it." },
      { q: "Will I lose my data?", a: "No. Moving from old systems to modern ones is planned so records, customers and history are kept safe." },
    ],
    relatedServices: ["testing-care", "website-design", "crm"],
    relatedProjects: ["hr-management-system", "cliender"],
  },
  "testing-care": {
    pain: "A broken checkout, form or app page is usually discovered by a customer, not by your team — and by then the sale or booking is already lost. Software that is never tested slowly breaks as browsers, phones and payment rules change.",
    process: [
      { title: "Test plan", text: "We agree what must be tested — features, payments, forms, phones and computers — before every release.", exit: "Written plan · Test scope agreed before testing starts." },
      { title: "Test & report", text: "Manual checks plus automated tests, with every problem reported in plain language, not jargon.", exit: "Weekly demos · You see what was tested and what failed, in plain words." },
      { title: "Fix & retest", text: "Bugs are fixed and retested until the release passes — nothing ships on hope.", exit: "Retest first · No release goes out with known breaking bugs." },
      { title: "Care & monitoring", text: "After launch we monitor, fix bugs, update and add small improvements, so problems are found before customers report them.", exit: "Care plan · Cancel anytime, and you keep everything we built." },
    ],
    benefits: ["Releases your customers can trust, tested before they ever see them.", "Problems found by monitoring, not by angry customers.", "Software that keeps working as browsers, phones and payment rules change.", "A care plan you can cancel anytime — no lock-in."],
    faqs: [
      { q: "What does testing actually cover?", a: "Features, payments, forms, speed, accessibility and security — on phones and computers — before every release." },
      { q: "What happens after launch?", a: "Monitoring, bug fixes, updates and small improvements on a care plan, so software keeps working as rules and devices change." },
      { q: "Can I cancel the care plan?", a: "Yes. The care plan can be cancelled anytime, and you keep your website, app, code and data." },
      { q: "Do you test my existing software too?", a: "Yes. Testing is part of the fix-and-improve work as well — start with a free audit to see what is broken first." },
    ],
    relatedServices: ["fix-improve", "crm", "website-design"],
    relatedProjects: ["cliender", "telemedicine", "padel-connect"],
  },
};

export const projectDetails: Record<string, ProjectDetail> = {
  "hr-management-system": {
    clientBackground: "A business whose HR work — leave, payroll checks, hiring and approvals — was done by hand across departments, with no single record of who approved what.",
    phases: [
      { title: "Permissions first", text: "A dynamic permission matrix configurable from the admin panel, so each role sees only what it needs.", exit: "Permissions as data · Roles change without a new release." },
      { title: "Approvals & workflows", text: "Attendance, leave and hiring flows built as explicit multi-step approvals, with a record at every step.", exit: "Clear steps · Everyone sees where a request stands." },
      { title: "AI checking", text: "LangGraph agents added to help validate leave and flag payroll problems, with a human step wherever it matters.", exit: "Check, don't guess · Anything unsure goes to a human." },
      { title: "Audit & rollout", text: "A real-time audit log of every change, and a secure employee portal for the workforce.", exit: "Launch checks · Every change recorded, from day one." },
    ],
    serviceSlugs: ["hr-systems", "ai-solutions"],
  },
  "rag-ai-assistant": {
    clientBackground: "A business whose customers needed correct answers from its own documents, where a confident-sounding but wrong chatbot answer was worse than no answer at all.",
    phases: [
      { title: "Retrieval & grounding", text: "Semantic vector search over the business's own documents, stored in Pinecone or ChromaDB, so answers start from real data.", exit: "Grounded first · No answer without a source." },
      { title: "Corrective search", text: "Relevance grading on retrieved documents, with question rewriting and web fallback when internal data does not cover the question.", exit: "Rewrite & retry · A missing answer triggers a better search, not a guess." },
      { title: "Self-checking", text: "Self-RAG factual checking grades every answer against its source before it is shown to a customer.", exit: "Checked before shown · Ungraded answers are never presented as fact." },
      { title: "Multi-agent delivery", text: "A supervisor-worker system splits work between specialists — find, check, write — plus a database agent for checked queries.", exit: "Launch checks · Human handover whenever the answer is unsure." },
    ],
    serviceSlugs: ["ai-solutions"],
  },
  telemedicine: {
    clientBackground: "A telemedicine service for people living with chronic pain, needing consultations, medical files, payments and the right specialist — without travelling for every visit.",
    phases: [
      { title: "Booking & payments", text: "Time-slot booking wired to verified payment, so a booking is only confirmed once payment is confirmed.", exit: "One journey · Never paid-but-unconfirmed." },
      { title: "Async review", text: "A multi-file review module so patients upload labs, imaging and diagnostic charts for specialist review before any live call.", exit: "Review before the call · Consultations start prepared." },
      { title: "Specialist dashboard", text: "A single view of a patient's full document and consultation history, ahead of each call.", exit: "Full history first · Specialists never start blind." },
      { title: "Referrals & launch", text: "Cross-regional referral flows for complex cases, plus reminders and health content for patients.", exit: "Launch checks · Complex cases routed inside the same platform." },
    ],
    serviceSlugs: ["booking"],
  },
  cliender: {
    clientBackground: "Local service businesses tracking sales, billing, appointments and customers across separate tools and spreadsheets, losing leads and time between them.",
    phases: [
      { title: "POS & operations", text: "Core dashboard modules for point-of-sale and cloud-based day-to-day business management.", exit: "Sales recorded live · As they happen, not at day end." },
      { title: "Scheduling & billing", text: "One system combining appointments, billing and lead tracking, so operators stop juggling tools.", exit: "One system · No more tool sprawl." },
      { title: "Live cockpit", text: "Real-time views consolidating employee output, client metrics and engagement data.", exit: "Live numbers · Owners see what is selling, live." },
      { title: "Marketing & rollout", text: "Location-aware marketing tools on the same platform, so campaigns run from real business data.", exit: "Launch checks · Marketing from the same source of truth." },
    ],
    serviceSlugs: ["crm", "online-store"],
  },
  "book-dubai-guide": {
    clientBackground: "A Dubai tours business whose visitors had to search separate sites for desert safaris, buggy rides, yacht cruises and city tours, with unclear pickup, payment and cancellation rules.",
    phases: [
      { title: "Experiences & listings", text: "23 curated experiences grouped clearly — safaris, buggy/ATV, city tours, water sports and cruises, aerial tours — with clear details before booking.", exit: "Everything in one place · No more separate sites." },
      { title: "Booking & WhatsApp", text: "One-tap WhatsApp booking with pre-filled tour details, replacing a long multi-step checkout.", exit: "Book in minutes · No drop-off at checkout." },
      { title: "Pickup & rules", text: "Hotel pickup across Dubai, with pickup, payment and cancellation rules shown before booking, not hidden at checkout.", exit: "Rules up front · Pay on pickup, free cancellation stated clearly." },
      { title: "Launch & confirmations", text: "Instant WhatsApp confirmation for every booking, with image-first design that shows the experience before the details.", exit: "Launch checks · Bookings confirmed instantly." },
    ],
    serviceSlugs: ["booking"],
    techChips: ["Booking website", "Tour listings", "Hotel pickup scheduling", "WhatsApp confirmation"],
  },
  "padel-connect": {
    clientBackground: "Padel clubs that scheduled matches and chased memberships by phone and paper lists, and players who needed fair, skill-matched games without the hassle.",
    phases: [
      { title: "Club dashboard", text: "A web dashboard for managing matches, approving player-level upgrades, and overseeing club operations.", exit: "Clubs in control · One dashboard for operations." },
      { title: "Matchmaking", text: "Skill-based pairing by skill level and playing history, so games stay competitive and fair.", exit: "Fair matches · Skill, not chance, drives pairing." },
      { title: "Player mobile flows", text: "Mobile screens for viewing and joining matches, approving or declining requests, and tracking availability.", exit: "Players on mobile · Join, approve, play." },
      { title: "Subscriptions & launch", text: "Tiered plans controlling access for clubs and players, with recurring billing handled automatically, plus a marketing landing.", exit: "Launch checks · Memberships paid automatically." },
    ],
    serviceSlugs: ["mobile-apps", "booking"],
  },
};
