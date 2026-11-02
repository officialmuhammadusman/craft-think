import Link from "next/link";

/**
 * FloatingAiButton — a plain link to the proper /guide page (the AI
 * chatbot page), NOT a drawer. Fixed bottom-right, flat solid indigo,
 * teal dot, "Ask AI". No slide-over, no overlay provider.
 */
export function FloatingAiButton() {
  return (
    <Link
      href="/guide"
      aria-label="Ask the AI guide"
      className="fixed bottom-24 right-4 z-[90] flex min-h-[56px] items-center gap-2 rounded-full bg-[#4F46E5] px-5 text-base font-bold text-white shadow-lg transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 lg:bottom-6 lg:right-6"
    >
      <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />
      Ask AI
    </Link>
  );
}
