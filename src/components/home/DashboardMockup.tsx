"use client";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Sparkles } from "lucide-react";

/**
 * Premium hero visual: a CSS-built product dashboard, not a plain photo.
 * The dashboard frame holds the real dashboard photo, with floating
 * glass KPI / AI cards on top. All bars and cards are pure CSS divs,
 * so nothing breaks if an image is swapped later.
 */
export function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[560px]">
      <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-[#E7E9F2] bg-[#F6F7FB] px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-[#DC2626]/70" />
          <span className="h-3 w-3 rounded-full bg-[#D97706]/70" />
          <span className="h-3 w-3 rounded-full bg-[#16A34A]/70" />
          <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs font-medium text-[#64748B]">craftthink.dev — your business, in one place</span>
        </div>
        <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[160px_1fr]">
          {/* Sidebar */}
          <div className="hidden flex-col gap-1 border-r border-[#E7E9F2] bg-white p-3 sm:flex">
            {["Dashboard", "Customers", "Bookings", "Sales", "AI Assistant"].map((item, i) => (
              <span key={item} className={`rounded-lg px-3 py-2 text-sm font-medium ${i === 0 ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-[#475569]"}`}>{item}</span>
            ))}
            <span className="mt-auto rounded-xl bg-[#EEF2FF] px-3 py-2 text-xs font-semibold text-[#0B1220]">AI is answering customers for you</span>
          </div>
          <div className="min-w-0 bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Business overview</p>
                <p className="mt-1 font-display text-lg font-bold text-[#0B1220] sm:text-xl">Everything, in one dashboard</p>
              </div>
              <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#4F46E5]">Live preview</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Bookings", value: "This week" },
                { label: "Customers", value: "In one place" },
                { label: "Payments", value: "Handled" },
              ].map((k) => (
                <div key={k.label} className="min-w-0 rounded-2xl border border-[#E7E9F2] bg-[#F6F7FB] p-2.5 sm:p-3">
                  <p className="text-xs text-[#64748B]">{k.label}</p>
                  <p className="mt-1 break-words text-sm font-bold text-[#0B1220]">{k.value}</p>
                </div>
              ))}
            </div>
            {/* Chart — pure CSS bars, no fake numbers */}
            <div className="mt-4 rounded-2xl border border-[#E7E9F2] p-4">
              <p className="text-sm font-semibold text-[#0B1220]">Bookings and sales, at a glance</p>
              <div className="mt-4 flex h-24 items-end gap-2 sm:gap-3">
                {[38, 55, 42, 68, 52, 82, 96].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg bg-[#4F46E5]" style={{ height: `${h}%`, opacity: 0.45 + (i / 7) * 0.55 }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-[#64748B]"><span>Mon</span><span>Sun</span></div>
            </div>
            <div className="relative mt-4 overflow-hidden rounded-2xl">
              <Image src="/images/hero/hero-dashboard.jpg" alt="A business dashboard on a laptop, showing charts and results" width={900} height={520} className="aspect-[16/10] h-auto w-full object-cover" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0B1220]">Real product view — placeholder photo</span>
            </div>
          </div>
        </div>
      </div>
      {/* AI card BELOW the dashboard — never covering its content or caption */}
      <div className="relative z-10 mx-auto mt-4 flex w-full max-w-[420px] items-start gap-3 rounded-2xl border border-[#E7E9F2] bg-white p-4 shadow-xl">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]"><Sparkles size={20} /><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#14B8A6]" /></span>
        <span>
          <span className="block text-sm font-bold text-[#0B1220]">AI Guide</span>
          <span className="block text-sm leading-snug text-[#475569]">“I need bookings without phone calls” — here is the right service.</span>
        </span>
      </div>
    </div>
  );
}
