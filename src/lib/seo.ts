// AI-training crawlers and third-party SEO/audit bots. This list is the
// single source of truth, kept in sync with the `.htaccess` rewrite rule
// (public/.htaccess) that actually enforces the block — robots.txt here is
// only a polite request; non-conforming bots ignore it.
export const blockedBots = [
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
