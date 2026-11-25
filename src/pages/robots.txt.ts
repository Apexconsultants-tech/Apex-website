import type { APIRoute } from "astro";
import { blockedBots } from "@/lib/seo";
import { site } from "@/lib/site-config";

export const GET: APIRoute = () => {
  const lines = [
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Bingbot",
    "Allow: /",
    "",
    ...blockedBots.flatMap((bot) => [`User-agent: ${bot}`, "Disallow: /", ""]),
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${site.url}/sitemap.xml`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain" } });
};
