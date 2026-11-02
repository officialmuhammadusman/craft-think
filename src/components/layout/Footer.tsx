/**
 * Footer — DARK band, solid #0B1220 with a 4px solid indigo top border.
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
    <footer className="border-t-4 border-[#4F46E5] bg-[#0B1220] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark size={44} className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/20" />
              <span className="font-display text-2xl font-bold tracking-tight"><span className="text-white">Craft</span><span className="text-[#4F46E5]">Think</span></span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">Software, built with thought, guided by AI. Led by CEO Muhammad Usman.</p>
            <p className="mt-3 text-sm text-white/60">Working remotely with clients worldwide.</p>
          </div>
          <nav aria-label="Services">
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Services</p>
            <ul className="mt-4 flex flex-col gap-1">
              {siteConfig.footerLinks.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company and resources">
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Company</p>
            <ul className="mt-4 flex flex-col gap-1">
              {siteConfig.footerLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/50">Free tools</p>
            <ul className="mt-4 flex flex-col gap-1">
              <li><Link href="/guide" className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-white">AI Guide</Link></li>
              <li><Link href="/estimate" className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-white">Get an Estimate</Link></li>
              <li><Link href="/audit" className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-white">Free Software Audit</Link></li>
              <li><Link href="/faq" className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-white">FAQ</Link></li>
            </ul>
          </nav>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Contact</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 flex min-h-[44px] items-start gap-2 text-sm break-words text-white/75 hover:text-white"><Mail size={17} className="mt-0.5 shrink-0" />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-white/75 hover:text-white"><Phone size={17} className="shrink-0" />{siteConfig.phone}</a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-white/75 hover:text-white"><Globe size={17} className="shrink-0" />LinkedIn</a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-white/75 hover:text-white"><Code2 size={17} className="shrink-0" />GitHub</a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} CraftThink. All rights reserved.</p>
          <p>Led by CEO Muhammad Usman · Remote, worldwide</p>
        </div>
      </div>
    </footer>
  );
}
