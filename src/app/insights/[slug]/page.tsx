import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";

/**
 * Insights articles — general advice ONLY. No client stories, no invented
 * results or statistics, no prices. Author is always "CraftThink team".
 * No publication dates are shown, so nothing here can go out of date
 * or look backdated.
 */

type Section = { heading: string; paragraphs: string[]; list?: string[] };
type Article = { title: string; summary: string; sections: Section[]; closing: string };

const ARTICLES: Record<string, Article> = {
  "why-a-booking-site-loses-customers": {
    title: "Why a booking site loses customers",
    summary: "Most lost bookings are not about price. They are about confusion, friction, and missing trust at the moment someone is ready to book.",
    sections: [
      {
        heading: "A booking site has one job",
        paragraphs: [
          "A booking site has one job: turn a visitor who is already interested into a confirmed booking, with as little effort as possible. Everything else on the site — beautiful photos, a long story about the business, a list of awards — is secondary. If a visitor cannot work out what to book, when it happens, what it costs, and what happens next, they leave. They rarely send an angry message explaining why. They simply book somewhere else, or they put it off and forget.",
          "That is why fixing a booking site usually starts with watching the booking journey, step by step, exactly as a first-time visitor sees it. Not as the owner sees it, and not as the person who built it sees it. A first-time visitor does not know your shorthand, your internal names for services, or which button matters. If they have to guess at any step, that step is losing you bookings.",
        ],
      },
      {
        heading: "The first screen decides a lot",
        paragraphs: [
          "On the first screen, a visitor should be able to answer three questions in seconds: what is this, who is it for, and how do I book? If the booking button is hidden below a long introduction, or if there are several buttons competing for attention, many visitors will not scroll far enough to find it. Put the main action where it can be seen straight away, and use words the visitor would use — “Book an appointment” beats a clever slogan every time.",
          "The same applies to choice. A long menu of similar-sounding services, with no plain explanation of the difference between them, makes people hesitate. Hesitation is where bookings die. Fewer, clearer options — each with a short description of who it is for and how long it takes — will usually beat a complete catalogue that nobody can navigate.",
        ],
      },
      {
        heading: "Booking should be the easiest step, not the hardest",
        paragraphs: [
          "Once someone has decided to book, every extra step is a chance to lose them. A form that asks for information you do not need yet, a registration wall before they have even picked a time, or a checkout that jumps between pages will all push people away. Ask for the minimum you need to hold the booking, and collect the rest later. Let people pick a real time slot they can see, rather than asking them to request a time and wait for a reply — waiting turns a ready customer into a maybe.",
          "Double bookings are the other side of the same problem. If two people can pick the same slot, someone will be disappointed, and disappointed customers rarely come back quietly. A proper booking system locks a slot as soon as it is chosen, so a time that is taken looks taken. That one detail — showing real availability — does more for trust than any amount of marketing copy.",
        ],
      },
      {
        heading: "Hidden rules destroy trust",
        paragraphs: [
          "Nothing puts a visitor off faster than discovering the real rules at the last step: a deposit they did not expect, a cancellation rule buried in small print, or a pickup detail that only appears after payment. People do not mind rules. They mind surprises. Put payment, cancellation, and arrival details where the booking decision is made, in plain words, before anyone is asked to pay.",
          "The same honesty applies to price. If the price depends on options, say so early and show how the total is built up. A visitor who feels tricked at checkout will not just abandon that booking — they will be wary of booking with you again.",
        ],
      },
      {
        heading: "Most booking happens on a phone",
        paragraphs: [
          "A large share of visitors will find you and try to book on a phone, often while doing something else — on a bus, in a waiting room, between errands. If the booking flow is cramped, if buttons are too small to tap reliably, if a calendar is hard to read on a small screen, or if a page takes a long time to load, the booking will wait for “later”. Later often never comes. Test the whole booking journey on a real phone, on a normal connection, and fix whatever feels slow or fiddly before you spend anything on advertising.",
        ],
      },
      {
        heading: "Confirmation closes the loop",
        paragraphs: [
          "A booking is not finished when the visitor clicks the last button. It is finished when they know, without doubt, that it worked. An instant confirmation — on screen and by message or email — with the date, time, place, and what to bring, turns a nervous visitor into a customer who actually shows up. A short reminder before the appointment helps too, because life gets in the way and a gentle reminder is often the difference between an attended booking and an empty slot.",
        ],
      },
      {
        heading: "What to check on your own site this week",
        paragraphs: [
          "You do not need a rebuild to find the biggest problems. Open your site on your phone and try to book as if you have never seen it before, then write down every moment you hesitated, guessed, or got annoyed. Those moments are your fix list, in order of importance.",
        ],
        list: [
          "Can you see how to book on the first screen, without scrolling or hunting?",
          "Can you pick a real time slot, and does a taken slot clearly look taken?",
          "Are price, payment, and cancellation rules visible before checkout, not after?",
          "Does the whole flow work comfortably on a phone, with buttons big enough to tap?",
          "Do you get an instant confirmation with the date, time, and what happens next?",
        ],
      },
    ],
    closing:
      "If several of those answers are no, the problem is usually fixable without starting over: clearer booking steps, real time slots, honest rules up front, and a proper confirmation. A free software audit is a good way to get that fix list in plain words, in order of what matters most, before you commit to anything bigger.",
  },
  "what-a-crm-does-for-a-small-business": {
    title: "What a CRM does for a small business, in plain words",
    summary: "A CRM is not a fancy spreadsheet. It is one place where your customers, conversations, follow-ups, and sales live together.",
    sections: [
      {
        heading: "Start with the problem, not the software",
        paragraphs: [
          "Most small businesses do not lose customers because their product is bad. They lose them in the gaps: a message answered three days late, a follow-up nobody remembered, a regular customer treated like a stranger, a quote that was promised and never sent. As a business grows, those gaps grow too, because the details stop fitting in one person's head — or in one phone full of chat messages.",
          "A CRM — short for customer relationship management — is simply a system built to close those gaps. Forget the jargon. Think of it as one shared notebook for your whole business, where every customer has a page, and that page remembers what matters about them.",
        ],
      },
      {
        heading: "One page per customer",
        paragraphs: [
          "In a CRM, each customer has a single record: who they are, how to reach them, what they bought or asked about, and what was promised to them. When anyone on your team opens that record, they see the same story. That matters the moment more than one person handles customers — a new staff member can pick up a conversation without asking the customer to repeat everything, and a customer who calls back does not have to start from scratch.",
          "That single record also ends the daily hunt through scattered tools. Instead of checking a chat app, an inbox, a notebook, and a spreadsheet to piece together what happened with one customer, the team looks in one place. The time saved is real, but the bigger win is fewer mistakes: fewer double promises, fewer forgotten replies, fewer customers who feel ignored.",
        ],
      },
      {
        heading: "Follow-ups that do not rely on memory",
        paragraphs: [
          "A lot of business is won in the follow-up: checking in after a quote, reminding a customer about a renewal, calling back someone who asked a question last week. Human memory is bad at this, especially when the business is busy. A CRM turns follow-ups into visible tasks with dates — who is due a call, who is waiting on a quote, who has not been contacted in a while — so nothing depends on someone happening to remember.",
          "The same idea applies to sales. A CRM shows where each potential customer stands: new enquiry, quote sent, waiting for an answer, won, or lost. That simple pipeline view answers questions owners usually guess at: how many open enquiries do we have, where are they stuck, and what needs attention today? You do not need complex reports to benefit from that. A clear list, kept up to date, is enough for most small businesses.",
        ],
      },
      {
        heading: "Sales, billing, and the rest in one place",
        paragraphs: [
          "In many small businesses, sales live in one tool, billing in another, and customer notes in a third. A CRM brings the customer-facing parts together: what was sold, what was paid, what is still owed, and what was agreed. When billing sits next to the customer record, chasing a payment stops being awkward detective work — you can see what is due and what was already discussed, before you pick up the phone.",
          "For businesses with staff, a CRM also gives each person the view they need and nothing they do not. A salesperson sees their customers and follow-ups. A manager sees the whole pipeline. Nobody has to wade through everyone else's work, and sensitive details are not sitting in a shared spreadsheet anyone can edit by accident.",
        ],
      },
      {
        heading: "What a CRM does not do",
        paragraphs: [
          "A CRM will not fix a business on its own. If nobody updates it, it becomes another empty tool. If it is loaded with fields nobody needs, staff will avoid it. The systems that actually get used are the simple ones: a handful of fields that matter, a follow-up list people check every morning, and a setup that matches how the business already works — not how a software demo works.",
          "It also does not replace judgement. A CRM can remind you to call a customer, but it cannot tell you what to say. It can show you that a customer has not ordered in a while, but only a person can decide whether a check-in call or a quiet pause is the right move. Think of it as a memory aid and an organiser, not a replacement for knowing your customers.",
        ],
      },
      {
        heading: "Do you need one, or is a spreadsheet enough?",
        paragraphs: [
          "A spreadsheet is fine when one person handles a small number of customers and nothing is ever forgotten. The signs that you have outgrown it are easy to spot: follow-ups slipping, two people holding different versions of the truth, customers repeating themselves, or a growing dread of opening the spreadsheet. If any of those sound familiar, a simple CRM will probably save more time than it costs — especially if it starts small, with just customers, follow-ups, and sales, and grows only when the business needs it to.",
        ],
      },
    ],
    closing:
      "The best way to start is small: list what you actually lose track of today — enquiries, follow-ups, payments, or all three — and choose a system that fixes that list first. Everything else can wait. If you would like help working out what that first version should look like, a free consultation is a good place to talk it through in plain words.",
  },
  "what-to-check-before-hiring-a-developer": {
    title: "What to check before hiring a developer",
    summary: "Before you pay anyone to build your website or app, check these things: past work, ownership, written scope, and support after launch.",
    sections: [
      {
        heading: "Hiring a developer is hiring a partner for a while",
        paragraphs: [
          "A website or an app is not a one-off purchase like a desk. It is something you will live with, update, and rely on every day. The person or team who builds it will shape how your customers see your business, how easily you can change things later, and how much help you get when something breaks. Choosing on price alone is the most common way to end up paying twice: once for the cheap build, and again to fix or replace it.",
          "The checks below do not require technical knowledge. They are the same checks you would use for any important supplier: have they done this kind of work before, will the agreement be clear, will you own what you paid for, and will they still be there afterwards?",
        ],
      },
      {
        heading: "Look at real work, not just a portfolio page",
        paragraphs: [
          "A portfolio page shows finished screenshots, which anyone can make look good. Ask to use the actual thing: open the website or app on your own phone, try to book, buy, or contact through it, and notice where you get stuck. Good work feels easy. If you cannot complete the main task on their past work without confusion, your customers will struggle with yours too.",
          "Also ask what their role was. On a team project, did they design it, build it, or just make small changes? You want to know who will actually do your work, and whether that person has built something like yours before — a booking system, a store, a business dashboard — not just something that looks similar.",
        ],
      },
      {
        heading: "Ask who will actually do the work",
        paragraphs: [
          "It is common for the person who sells you the project not to be the person who builds it. That is not automatically a problem, but you should know before you start: who is your day-to-day contact, who makes decisions, and how often will you see progress? A good answer includes regular demos — something you can click and try — rather than long silences followed by a finished product you never had a chance to correct.",
          "Communication style matters as much as skill. If explanations are full of jargon you cannot follow during the sales conversation, they will be full of jargon when there is a problem too. You should leave every conversation understanding what will happen next, what it depends on, and what is needed from you.",
        ],
      },
      {
        heading: "Get the scope, timeline, and price in writing",
        paragraphs: [
          "“A website” can mean ten different things, and that ambiguity is where most disputes come from. Before work starts, the agreement should list, in plain words: what will be built, which pages and features are included, what is explicitly not included, how long each phase should take, and what the price covers. If a feature matters to you — online payments, booking, a customer login — it should be named, not assumed.",
          "Be wary of a price given before anyone has asked about your business, your customers, and what the software must do. A serious quote follows questions, not precedes them. And be wary of a timeline with no phases: a project delivered in stages, with something to try at each stage, is far safer than a single big reveal at the end.",
        ],
      },
      {
        heading: "Make sure you will own it",
        paragraphs: [
          "This is the check people most often skip, and the one they most often regret. When you pay for software, you should own the code, the content, and the data — and you should receive the logins, the domain, and the documentation at launch. Ask directly: if we part ways, can another developer pick this up? If the answer is vague, or if your website only works while you keep paying one particular provider, think carefully before signing.",
          "The same applies to your customer data. Enquiries, orders, and customer records are your business assets. They should be exportable, and you should be able to see how they are stored and who can access them. A trustworthy developer will explain this plainly, without making you feel awkward for asking.",
        ],
      },
      {
        heading: "Ask what happens after launch",
        paragraphs: [
          "Software does not stay finished. Phones change, browsers change, payment rules change, and small bugs appear that nobody saw during testing. Ask what support looks like after launch: who fixes a bug, how quickly, and what it costs. A care arrangement — bug fixes, updates, and small improvements — is worth discussing upfront, while you still have a choice, rather than discovering after launch that every small change is a new negotiation.",
          "Also ask how the work is tested before it reaches your customers: on phones as well as computers, with real booking or checkout journeys, not just a quick look at the homepage. Testing is invisible when it goes well, and painfully visible when it does not.",
        ],
      },
      {
        heading: "Red flags worth taking seriously",
        paragraphs: [
          "No single red flag proves a developer is bad, but several together should make you pause. Watch for pressure to pay everything upfront, reluctance to put anything in writing, no past work you can actually try, a refusal to say who will do the work, or promises that sound too neat — a fixed price for a vague idea, a launch date before anyone has understood the project, or claims about results nobody can honestly promise in advance.",
        ],
        list: [
          "Can you try their past work on your own phone, not just look at screenshots?",
          "Is the scope, timeline, and price written down in plain words?",
          "Will you own the code, content, data, and logins at launch?",
          "Who is your contact, and how often will you see real progress?",
          "What happens after launch — who fixes bugs, and what does support cost?",
        ],
      },
    ],
    closing:
      "A good developer will welcome these questions. They show you are taking the project seriously, and they make the developer's job easier too, because a clear agreement protects both sides. If you would like a second opinion on a quote you already have, or help turning your idea into a clear brief first, a free consultation is a straightforward place to start.",
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.summary };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <>
      <section className="ct-section">
        <Container width="narrow">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#4F46E5]">Insights</p>
          <h1 className="ct-h1 mt-3 text-center">{article.title}</h1>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-lg leading-relaxed text-[#475569]">{article.summary}</p>
          <p className="mt-4 text-center text-sm text-[#64748B]">By the CraftThink team</p>

          <article className="mt-10 flex flex-col gap-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="ct-h3">{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-[#475569]">{p}</p>
                ))}
                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-2 text-[#475569]"><span className="text-[#4F46E5]">•</span><span>{item}</span></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
              <p className="leading-relaxed text-[#475569]">{article.closing}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/consultation">Book a free consultation</Button>
                <Button href="/brief" variant="secondary">Send a project brief</Button>
              </div>
            </section>
          </article>

          <p className="mt-10 text-center">
            <Link href="/insights" className="font-semibold text-[#4F46E5]">← All insights</Link>
          </p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
