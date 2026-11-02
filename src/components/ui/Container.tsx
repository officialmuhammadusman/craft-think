/**
 * Container.tsx — Centred max-width wrapper.
 * Max width: 1200px, centred, with horizontal padding for all screen sizes.
 * Import this in every section to keep consistent gutters.
 */
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use "narrow" for single-column content like blog posts or forms */
  width?: "default" | "narrow" | "wide";
}

const widthClasses = {
  default: "max-w-[1200px]",
  narrow: "max-w-[720px]",
  wide: "max-w-[1400px]",
};

export function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        widthClasses[width],
        className
      )}
    >
      {children}
    </div>
  );
}
