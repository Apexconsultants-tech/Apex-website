import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations-data";
import { services } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";
import { partnerUniversities } from "@/lib/universities-data";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
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

  const destinationPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: new Date(p.isoDate),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const partnerUniversityPages: MetadataRoute.Sitemap = partnerUniversities.map((u) => ({
    url: `${base}/partner-universities/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...destinationPages, ...servicePages, ...blogPages, ...partnerUniversityPages];
}
