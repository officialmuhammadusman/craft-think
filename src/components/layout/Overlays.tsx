"use client";
/**
 * Site-wide overlays, so "Ask AI" and "Book a Free Consultation" actually
 * OPEN something instead of only navigating away:
 * - Floating AI button (bottom-right, teal pulse ring) opens the AI Guide
 *   as a right slide-over panel, reusing the existing AiGuide component.
 * - Consultation panel opens from Book buttons, reusing the contact
 *   form fields (name, email, what you need, message) with a mailto
 *   submit, exactly like the contact page. No backend is invented.
 * Both close with Escape, outside-click (backdrop), and a visible X,
 * and work on mobile (full-width panel). Panels close on route change.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AiGuide } from "@/components/ai/AiGuide";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

type OverlayCtx = { openAi: () => void; openConsult: () => void };
const Ctx = createContext<OverlayCtx>({ openAi: () => {}, openConsult: () => {} });
export const useOverlays = () => useContext(Ctx);

function Panel({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label={title}>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default bg-[#0B1220]/50 backdrop-blur-[2px]" />
      <div className="ct-panel-in absolute bottom-0 right-0 top-0 flex w-full max-w-[560px] flex-col overflow-hidden bg-white shadow-2xl sm:rounded-l-[24px]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E7E9F2] bg-[#0B1220] px-6 py-5 text-white">
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="mt-0.5 text-sm leading-snug text-white/60">{subtitle}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close panel" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function ConsultationForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("CraftThink consultation request")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWhat you need: ${need}\n\n${message}`)}`;
  if (sent) {
    return (
      <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h3 className="ct-h3">Thank you — your message is ready to send</h3>
        <p className="mt-2 text-[#475569]">This site has no backend, so your form is not stored anywhere. Click below to open your email app with your message prefilled to {siteConfig.email}.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={mailto}>Open Email to Send →</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <label className="flex flex-col gap-2 font-semibold">Your name *<input required value={name} onChange={(e) => setName(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" /></label>
      <label className="flex flex-col gap-2 font-semibold">Your email *<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" /></label>
      <label className="flex flex-col gap-2 font-semibold">What do you need?
        <select value={need} onChange={(e) => setNeed(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal">
          <option value="">Not sure yet — help me choose</option>
          <option>Website Design & Development</option><option>Business Websites & Portfolios</option><option>Online Store</option><option>Mobile Apps</option><option>CRM & Business Systems</option><option>Booking & Appointments</option><option>HR & Staff Systems</option><option>UI/UX Design</option><option>AI Solutions & Assistant</option><option>Fix & Improve Software</option><option>Testing, Support & Care</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 font-semibold">Tell us about your problem *<textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you need help with? What does your business do?" className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" /></label>
      <Button type="submit">Send Consultation Request</Button>
      <p className="text-sm text-[#64748B]">No backend: on submit we prepare an email to {siteConfig.email} for you to send. Prefer the full page? <a href="/contact" className="font-semibold text-[#4F46E5]">Open the contact page →</a></p>
    </form>
  );
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  // Keyed remount on route change closes any open panel, without
  // calling setState inside an effect (which the linter forbids).
  const pathname = usePathname();
  return <OverlayProviderInner key={pathname}>{children}</OverlayProviderInner>;
}

function OverlayProviderInner({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<"ai" | "consult" | null>(null);
  const close = useCallback(() => setPanel(null), []);
  return (
    <Ctx.Provider value={{ openAi: () => setPanel("ai"), openConsult: () => setPanel("consult") }}>
      {children}
      {panel === "ai" && (
        <Panel title="Ask the CraftThink Guide" subtitle="Guided demo — answers come only from this site's services, projects and FAQs." onClose={close}>
          <AiGuide bare />
        </Panel>
      )}
      {panel === "consult" && (
        <Panel title="Book a Free Consultation" subtitle="Tell us your problem in plain words. No obligation, no backend — your message opens as an email." onClose={close}>
          <ConsultationForm onClose={close} />
        </Panel>
      )}
    </Ctx.Provider>
  );
}

export function FloatingAiButton() {
  const { openAi } = useOverlays();
  return (
    <button
      type="button"
      onClick={openAi}
      aria-label="Ask the AI guide"
      className="fixed bottom-24 right-4 z-[90] flex min-h-[56px] items-center gap-2 rounded-full bg-[#4F46E5] px-5 text-base font-bold text-white shadow-lg transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 lg:bottom-6 lg:right-6"
    >
      <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />
      Ask AI
    </button>
  );
}
