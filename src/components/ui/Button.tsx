/**
 * Button.tsx — Reusable CraftThink button component.
 * Three variants: primary (indigo filled), secondary (white/border), outline (transparent/border).
 * Three sizes: sm, md (default), lg.
 * Uses Next.js Link when href is provided, otherwise renders a <button> element.
 */
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  /** Open in new tab — only applies when href is set */
  external?: boolean;
  id?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Primary: indigo background, white text — main CTA
  primary:
    "bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#312E81] shadow-sm hover:shadow-md",
  // Secondary: white background, dark text, grey border
  secondary:
    "bg-white text-[#0B1220] border border-[#E7E9F2] hover:border-[#4F46E5] hover:text-[#4F46E5]",
  // Outline: transparent, indigo border and text — used for "Ask AI" in header
  outline:
    "bg-transparent text-[#4F46E5] border border-[#4F46E5] hover:bg-[#EEF2FF]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
  external = false,
  id,
}: ButtonProps) {
  const baseClasses = cn(
    // Base styles shared across all variants
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
    "min-h-[48px]", // Minimum tap target for mobile (48px)
    "select-none whitespace-nowrap",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Render as a Next.js Link when href is provided
  if (href) {
    return (
      <Link
        href={href}
        id={id}
        className={baseClasses}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
