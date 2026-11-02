import type { MetadataRoute } from "next";
import { services, projects } from "@/data/content";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteConfig.domain}`;
  const staticPages = ["", "/services", "/work", "/process", "/about", "/contact", "/estimate", "/audit", "/faq", "/guide"];
  return [
    ...staticPages.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
