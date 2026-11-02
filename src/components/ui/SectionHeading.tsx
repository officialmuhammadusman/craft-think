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
            "ct-eyebrow",
            aiAccent && "border-[#14B8A6]/40 bg-[#F0FDFA] text-[#0F766E]"
          )}
        >
          {eyebrow}
        </span>
      )}

      <Tag
        id={id}
        className={cn(
          "font-bold text-[#0B1220] leading-tight",
          // Editorial sizes: hero 44-72px, section titles 32-48px
          Tag === "h1" && "ct-display-xl",
          Tag === "h2" && "ct-section-title",
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
