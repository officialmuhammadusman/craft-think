"use client";
/**
 * Search page — searches the REAL site data in src/data/content.ts only:
 * services, projects, and faqs. No invented entries, no other sources.
 * Matching is case-insensitive over title / line / description text.
 * Results link to the real pages: /services/[slug], /work/[slug], /faq.
 * An empty query shows popular searches built from real service and
 * project names. The query lives in the URL (?q=…) so results can be
 * shared and the back button works.
 */
import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { services, projects, faqs } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Result = { kind: "Service" | "Project" | "FAQ"; title: string; line: string; href: string };

const INDEX: Result[] = [
  ...services.map((s): Result => ({
    kind: "Service",
    title: s.title,
    line: s.line,
    href: `/services/${s.slug}`,
  })),
  ...projects.map((p): Result => ({
    kind: "Project",
    title: p.title,
    line: p.line,
    href: `/work/${p.slug}`,
  })),
  ...faqs.map((f): Result => ({
    kind: "FAQ",
    title: f.q,
    line: f.a,
    href: "/faq",
  })),
];

// Haystacks are built from the same real records, so a search can match
// description words (for example a service keyword) as well as titles.
function haystackFor(r: Result): string {
  const service = services.find((s) => `/services/${s.slug}` === r.href);
  if (service) {
    return [service.title, service.line, service.forWhom, service.keywords.join(" "), service.gets.join(" ")].join(" ").toLowerCase();
  }
  const project = projects.find((p) => `/work/${p.slug}` === r.href);
  if (project) {
    return [project.title, project.line, project.problem, project.industryLabel, project.stack].join(" ").toLowerCase();
  }
  return [r.title, r.line].join(" ").toLowerCase();
}

const POPULAR_SEARCHES: string[] = [
  ...services.slice(0, 4).map((s) => s.title),
  ...projects.slice(0, 2).map((p) => p.title),
];

function SearchInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  // The input is uncontrolled and keyed by q, so navigating to a new ?q=
  // (e.g. a popular-search link) resets its text without an effect.
  const needle = q.trim().toLowerCase();
  const results = needle === "" ? [] : INDEX.filter((r) => haystackFor(r).includes(needle));

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <section className="ct-section">
      <Container width="narrow">
        <SectionHeading
          as="h1"
          eyebrow="Search"
          title="Search CraftThink"
          subtitle="Search our real services, projects and frequently asked questions — in plain words."
        />
        <form onSubmit={submit} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="site-search">Search services, projects and FAQs</label>
          <input
            id="site-search"
            name="q"
            key={q}
            type="search"
            defaultValue={q}
            placeholder="Try: booking, mobile app, CRM…"
            className="min-h-[48px] flex-1 rounded-xl border border-[#E7E9F2] bg-white px-4 text-base"
          />
          <Button type="submit">Search</Button>
        </form>

        {needle === "" ? (
          <div className="mt-10">
            <h2 className="ct-h3">Popular searches</h2>
            <p className="mt-2 text-[#475569]">Start with one of these, or type your own words above.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="flex min-h-[48px] items-center rounded-full border border-[#E7E9F2] bg-white px-4 text-sm font-semibold text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]">
                  {s}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/services" variant="secondary">Browse all services</Button>
              <Button href="/work" variant="secondary">Browse all work</Button>
              <Button href="/insights" variant="secondary">Read insights</Button>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E7E9F2] bg-white p-6">
            <h2 className="ct-h3">No results for “{q.trim()}”</h2>
            <p className="mt-2 text-[#475569]">Try simpler words — for example “booking”, “app”, “website” or “CRM”. Or ask us directly:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="/contact">Contact us</Button>
              <Button href="/brief" variant="secondary">Send a project brief</Button>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-[#475569]">{results.length} result{results.length === 1 ? "" : "s"} for “{q.trim()}”</p>
            <ul className="mt-4 flex flex-col gap-4">
              {results.map((r) => (
                <li key={`${r.kind}-${r.href}-${r.title}`}>
                  <Link href={r.href} className="ct-card block p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4F46E5]">{r.kind}</span>
                    <span className="mt-1 block text-lg font-bold">{r.title}</span>
                    <span className="mt-1 block text-[#475569]">{r.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading search…</p>}>
      <SearchInner />
    </Suspense>
  );
}
