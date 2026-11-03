"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AiGuide } from "@/components/ai/AiGuide";

/**
 * FloatingAiButton — chatbot window on desktop, BOTTOM SHEET on
 * phones (user-requested, app-like). Phones (<=640px): full width
 * with small side margins, ~85dvh tall, rounded top corners, a
 * drag-handle pill at the top, sitting ABOVE the sticky mobile CTA
 * bar (bottom offset clears it) — never covered by it. Desktop
 * (>=1024px): the existing bottom-right window (~400px).
 * Body scroll is locked while the sheet is open and restored on
 * close; the sheet's own content scrolls as ONE region (header,
 * greeting, messages, chips, follow-up) with only the input row
 * pinned at the bottom — no fixed header above a separately
 * scrolling list. Not a separate page, not a side drawer. The full
 * /guide page still exists, linked from the header.
 */
export function FloatingAiButton() {
  // Keyed remount on route change closes the chat window, without
  // calling setState inside an effect (which the linter forbids).
  const pathname = usePathname();
  return <FloatingAiButtonInner key={pathname} />;
}

function FloatingAiButtonInner() {
  const [open, setOpen] = useState(false);

  // Header (Tier 1 sparkle button) and the phone menu open this chat
  // via a window event, since the chat owns its own open state.
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("craftthink:open-ai", openChat);
    return () => window.removeEventListener("craftthink:open-ai", openChat);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Lock page scroll while the sheet is open; restore on close.
    // The sheet's own content still scrolls (overscroll-contain).
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      {open && (
        <div
         
          role="dialog"
          aria-modal="false"
          aria-label="CraftThink AI chat"
          className="ct-sheet-up fixed bottom-[calc(92px+env(safe-area-inset-bottom))] left-0 right-0 z-[95] flex h-[min(85dvh,calc(100dvh-108px-env(safe-area-inset-bottom)))] w-auto flex-col overflow-hidden overscroll-contain rounded-t-[24px] rounded-b-[24px] border border-[#E7E9F2] bg-white shadow-2xl sm:bottom-24 sm:left-auto sm:right-4 sm:h-[min(620px,calc(100dvh-120px))] sm:w-[calc(100vw-2rem)] sm:max-w-[420px] lg:bottom-6 lg:right-6"

        >
          <div className="relative flex shrink-0 justify-center bg-white pb-1 pt-2.5 sm:hidden">
            <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-[#E7E9F2]" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close AI chat"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F6F7FB]"
            >
              <X size={18} />
            </button>
          </div>
          {/* The sheet header lives inside AiGuide's single scroll
              region (it scrolls with the rest of the sheet content).
              On phones the header's own X is hidden, so this
              drag-handle X is the one close button; on larger
              screens this row is hidden and the header X shows. */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain">
            <AiGuide bare />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI chat" : "Talk with me"}
        aria-expanded={open}
        className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] right-4 z-[90] hidden min-h-[56px] items-center gap-2 rounded-full bg-[#4F46E5] px-5 text-base font-bold text-white shadow-lg transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 sm:bottom-24 lg:bottom-6 lg:flex lg:right-6"
      >
        <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />
        {open ? "Close chat" : "Talk with me"}
      </button>
    </>
  );
}
