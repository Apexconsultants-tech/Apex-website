import type { APIRoute } from "astro";
import { destinations } from "@/lib/destinations-data";
import { services } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";
import { partnerUniversities } from "@/lib/universities-data";
import { site } from "@/lib/site-config";

type Entry = { url: string; lastModified: string; changeFrequency: string; priority: number };

function toXml(entries: Entry[]): string {
  const items = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastModified}</lastmod>
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

export const GET: APIRoute = () => {
  const base = site.url;
  const now = new Date().toISOString();

  const staticPages: Entry[] = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/success-stories`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/partner-universities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const destinationPages: Entry[] = destinations.map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const servicePages: Entry[] = services.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: Entry[] = blogPosts.map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: new Date(p.isoDate).toISOString(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const partnerUniversityPages: Entry[] = partnerUniversities.map((u) => ({
    url: `${base}/partner-universities/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const body = toXml([...staticPages, ...destinationPages, ...servicePages, ...blogPages, ...partnerUniversityPages]);
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
