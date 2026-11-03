"use client";
import { useState, type ReactNode } from "react";
import { MOTION_EASE, MOTION_INTERACTIVE_DURATION } from "@/lib/motion";

/**
 * Accordion — smooth open/close using the grid-rows 0fr→1fr
 * technique (transform/opacity only, no height:auto spring
 * clipping). The plus icon rotates 45° when open. Button is
 * keyboard-accessible with aria-expanded.
 */
export function AccordionItem({ question, children, defaultOpen = false }: { question: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="ct-card p-6">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold"
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#4F46E5] transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transitionDuration: `${MOTION_INTERACTIVE_DURATION * 1000}ms`, transitionTimingFunction: `cubic-bezier(${MOTION_EASE.join(",")})` }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transitionDuration: `${MOTION_INTERACTIVE_DURATION * 1000}ms`,
          transitionTimingFunction: `cubic-bezier(${MOTION_EASE.join(",")})`,
        }}
      >
        <div className="overflow-hidden">
          <div className="pt-3 text-[#475569]">{children}</div>
        </div>
      </div>
    </div>
  );
}
