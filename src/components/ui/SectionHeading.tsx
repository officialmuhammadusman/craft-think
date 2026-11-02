/**
 * SectionHeading.tsx — Reusable section title + subtitle block.
 * Used across all sections to keep heading hierarchy and spacing consistent.
 * Renders an <h2> by default; pass `as="h1"` for the page main heading.
 */
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3";
type Alignment = "left" | "center";

interface SectionHeadingProps {
  /** Main heading text */
  title: string;
  /** Optional subtext shown above the title in indigo — like "Our Services" */
  eyebrow?: string;
  /** Optional paragraph below the title */
  subtitle?: string;
  as?: HeadingLevel;
  align?: Alignment;
  className?: string;
  /** Apply AI teal colour to eyebrow — use only for AI-related sections */
  aiAccent?: boolean;
  /** Optional id for aria-labelledby targets */
  id?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  as: Tag = "h2",
  align = "center",
  className,
  aiAccent = false,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-widest",
            aiAccent ? "border-[#14B8A6]/30 bg-[#F0FDFA] text-[#0F766E]" : "border-[#4F46E5]/20 bg-[#EEF2FF] text-[#4F46E5]"
          )}
        >
          {eyebrow}
        </span>
      )}

      <Tag
        id={id}
        className={cn(
          "font-bold text-[#0B1220] leading-tight",
          // Fluid heading sizes following the design spec
          Tag === "h1" &&
            "text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.02em]",
          Tag === "h2" &&
            "text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.015em]",
          Tag === "h3" &&
            "text-[clamp(1.375rem,3vw,1.75rem)]"
        )}
      >
        {title}
      </Tag>

      {subtitle && (
        <p className="max-w-[600px] text-[#475569] text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
