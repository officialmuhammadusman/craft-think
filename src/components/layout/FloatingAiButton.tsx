"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, X } from "lucide-react";
import { AiGuide } from "@/components/ai/AiGuide";

/**
 * FloatingAiButton — chatbot window on desktop, BOTTOM SHEET on
 * phones (user-requested, app-like). Phones (<=640px): full width
 * with small side margins, ~85dvh tall, rounded top corners, a
 * drag-handle pill at the top, sitting ABOVE the sticky mobile CTA
 * bar (bottom offset clears it) — never covered by it. Desktop
 * (>=1024px): the existing bottom-right window (~400px).
 * data-lenis-prevent + overscroll-contain are kept everywhere: they
 * fix the Lenis scroll-stealing bug. Not a separate page, not a
 * side drawer. The full /guide page still exists, linked from the
 * header.
 */
export function FloatingAiButton() {
  // Keyed remount on route change closes the chat window, without
  // calling setState inside an effect (which the linter forbids).
  const pathname = usePathname();
  return <FloatingAiButtonInner key={pathname} />;
}

function FloatingAiButtonInner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <>
      {open && (
        <div
          data-lenis-prevent
          data-chat-scroll
          role="dialog"
          aria-modal="false"
          aria-label="CraftThink AI chat"
          className="ct-sheet-up fixed bottom-[calc(88px+env(safe-area-inset-bottom))] left-3 right-3 z-[95] flex h-[min(85dvh,calc(100dvh-104px-env(safe-area-inset-bottom)))] w-auto flex-col overflow-hidden overscroll-contain rounded-t-[24px] rounded-b-[24px] border border-[#E7E9F2] bg-white shadow-2xl sm:bottom-24 sm:left-auto sm:right-4 sm:h-[min(620px,calc(100dvh-120px))] sm:w-[calc(100vw-2rem)] sm:max-w-[420px] lg:bottom-6 lg:right-6"

        >
          <div aria-hidden="true" className="flex shrink-0 justify-center bg-white pb-1 pt-2.5 sm:hidden">
            <span className="h-1.5 w-10 rounded-full bg-[#E7E9F2]" />
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 bg-[#0B1220] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
                <Bot size={20} />
              </span>
              <div>
                <p className="text-base font-bold leading-tight">Think</p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> CraftThink guide · replies instantly
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href="/guide"
                onClick={() => setOpen(false)}
                className="flex min-h-[40px] items-center rounded-full px-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                Full page
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI chat"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <AiGuide bare />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI chat" : "Ask the AI guide"}
        aria-expanded={open}
        className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] right-4 z-[90] flex min-h-[56px] items-center gap-2 rounded-full bg-[#4F46E5] px-5 text-base font-bold text-white shadow-lg transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 sm:bottom-24 lg:bottom-6 lg:right-6"
      >
        <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />
        {open ? "Close chat" : "Ask AI"}
      </button>
    </>
  );
}
