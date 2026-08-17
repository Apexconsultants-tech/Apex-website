import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

// Required for output: "export" — built from static local data, so it's
// safe to prerender once at build time.
export const dynamic = "force-static";

// AI-training crawlers and third-party SEO/audit bots, blocked directly
// here now that the site is off Netlify — this list was previously
// enforced by Netlify's own User Agent Blocker extension at the edge,
// which doesn't exist on HostGator. Googlebot and Bingbot are listed
// explicitly as allowed so there's no ambiguity about search-engine access.
const blockedBots = [
  "GPTBot",
  "PetalBot",
  "Factset_spyderbot",
  "LINER Bot",
  "ClaudeBot",
  "Timpibot",
  "SemrushBot",
  "AhrefsBot",
  "AhrefsSiteAudit",
  "AwarioBot",
  "DotBot",
  "MJ12bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      ...blockedBots.map((userAgent) => ({ userAgent, disallow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
