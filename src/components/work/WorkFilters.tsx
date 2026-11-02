import Link from "next/link";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All", href: "/work", value: undefined },
  { label: "SaaS", href: "/work?industry=saas", value: "saas" },
  { label: "Healthcare", href: "/work?industry=healthcare", value: "healthcare" },
  { label: "Business", href: "/work?industry=business", value: "business" },
  { label: "Sports", href: "/work?industry=sports", value: "sports" },
  { label: "Travel & Tourism", href: "/work?industry=travel", value: "travel" },
];

export function WorkFilters({ current }: { current?: string }) {
  return (
    <>
      {/* Phones: ONE horizontal scroll row (no clipped chips, no page
          overflow-x) with a swipe hint. Desktop: centred wrap. */}
      <nav aria-label="Filter work by industry" data-lenis-prevent className="-mx-4 flex flex-nowrap gap-2 overflow-x-auto overscroll-contain px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
        {filters.map((f) => (
          <Link key={f.label} href={f.href} aria-current={current === f.value ? "true" : undefined} className={cn("inline-flex min-h-[48px] shrink-0 items-center rounded-full border px-5 text-base font-semibold", current === f.value ? "border-[#4F46E5] bg-[#4F46E5] text-white" : "border-[#E7E9F2] bg-white text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]")}>{f.label}</Link>
        ))}
      </nav>
      <p aria-hidden="true" className="mt-1 text-center text-sm text-[#64748B] sm:hidden">Swipe to see all industries →</p>
    </>
  );
}
