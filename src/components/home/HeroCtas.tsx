"use client";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useOverlays } from "@/components/layout/Overlays";

/**
 * Hero calls to action. "Ask AI" and "Book a Free Consultation" OPEN
 * the slide-over panels (via Overlays) instead of only navigating away;
 * the search form still routes to the full AI Guide page with the query.
 */
export function HeroCtas() {
  const { openAi, openConsult } = useOverlays();
  return (
    <div className="flex w-full flex-col items-start gap-5">
      <form action="/guide" method="get" className="flex w-full max-w-xl flex-col gap-2 rounded-[24px] border border-white/20 bg-white/10 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full">
        <label className="sr-only" htmlFor="hero-search">What do you need help with?</label>
        <Search size={19} className="ml-3 hidden shrink-0 text-white/50 sm:block" />
        <input id="hero-search" name="q" placeholder="What do you need help with?" className="min-h-[48px] w-full flex-1 rounded-full bg-transparent px-4 text-base text-white outline-none placeholder:text-white/50" />
        <Button type="submit" className="shrink-0">Ask AI <ArrowRight size={17} /></Button>
      </form>
      <p className="text-sm text-white/50">Try: “my website is slow” · “I need an app” · “I need AI to answer customers”</p>
      <div className="flex flex-wrap gap-3">
        <Button size="lg" onClick={openConsult}>Book a Free Consultation</Button>
        <Button size="lg" variant="secondary" onClick={openAi} className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
          <Sparkles size={17} className="ct-sparkle text-[#14B8A6]" /> Ask the AI Guide
        </Button>
      </div>
    </div>
  );
}
