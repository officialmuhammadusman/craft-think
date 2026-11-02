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
    <nav aria-label="Filter work by industry" className="mt-8 flex flex-wrap justify-center gap-2">
      {filters.map((f) => (
        <Link key={f.label} href={f.href} className={cn("min-h-[48px] inline-flex items-center rounded-full border px-5 text-base font-semibold", current === f.value ? "border-[#4F46E5] bg-[#4F46E5] text-white" : "border-[#E7E9F2] bg-white text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]")}>{f.label}</Link>
      ))}
    </nav>
  );
}
