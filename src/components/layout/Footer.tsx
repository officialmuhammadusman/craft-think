/**
 * Footer — WHITE band with a 4px solid indigo top border (the dark
 * navy colour moved to the CTA banner above it).
 * 4 columns: Brand, Services (all 11), Company + Resources, Contact.
 * Social links carry visible text labels (LinkedIn, GitHub), not icons
 * alone. Email uses break-words at small size so it never wraps
 * awkwardly. No address, no city, no invented social links, no fake
 * logos, no gradients.
 */
import Link from "next/link";
import { Mail, Phone, Globe, Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LogoMark } from "@/components/ui/LogoMark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-4 border-[#4F46E5] bg-white text-[#0B1220]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark size={44} className="h-11 w-11 rounded-xl object-cover ring-1 ring-[#E7E9F2]" />
              <span className="font-display text-2xl font-bold tracking-tight"><span className="text-[#0B1220]">Craft</span><span className="text-[#4F46E5]">Think</span></span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#475569]">Software, built with thought, guided by AI. Led by CEO Muhammad Usman.</p>
            <p className="mt-3 text-sm text-[#475569]">Working remotely with clients worldwide.</p>
          </div>
          <nav aria-label="Services">
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Services</p>
            <ul className="mt-4 flex flex-col gap-1">
              {siteConfig.footerLinks.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="flex min-h-[40px] items-center text-sm text-[#475569] hover:text-[#4F46E5]">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company and resources">
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Company</p>
            <ul className="mt-4 flex flex-col gap-1">
              {siteConfig.footerLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="flex min-h-[40px] items-center text-sm text-[#475569] hover:text-[#4F46E5]">{l.label}</Link></li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#64748B]">Free tools</p>
            <ul className="mt-4 flex flex-col gap-1">
              <li><Link href="/guide" className="flex min-h-[40px] items-center text-sm text-[#475569] hover:text-[#4F46E5]">AI Guide</Link></li>
              <li><Link href="/estimate" className="flex min-h-[40px] items-center text-sm text-[#475569] hover:text-[#4F46E5]">Get an Estimate</Link></li>
              <li><Link href="/audit" className="flex min-h-[40px] items-center text-sm text-[#475569] hover:text-[#4F46E5]">Free Software Audit</Link></li>
              <li><Link href="/faq" className="flex min-h-[40px] items-center text-sm text-[#475569] hover:text-[#4F46E5]">FAQ</Link></li>
            </ul>
          </nav>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Contact</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 flex min-h-[44px] items-start gap-2 text-sm break-words text-[#475569] hover:text-[#4F46E5]"><Mail size={17} className="mt-0.5 shrink-0" />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-[#475569] hover:text-[#4F46E5]"><Phone size={17} className="shrink-0" />{siteConfig.phone}</a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-[#475569] hover:text-[#4F46E5]"><Globe size={17} className="shrink-0" />LinkedIn</a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-[#475569] hover:text-[#4F46E5]"><Code2 size={17} className="shrink-0" />GitHub</a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-[#E7E9F2] pt-6 text-sm text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} CraftThink. All rights reserved.</p>
          <p>Led by CEO Muhammad Usman · Remote, worldwide</p>
        </div>
      </div>
    </footer>
  );
}
