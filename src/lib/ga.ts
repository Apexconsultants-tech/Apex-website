// Apex's live GA4 property ID. Split out from scripts/analytics.ts (which
// has side-effecting top-level code meant only to run in the browser) so
// Astro component frontmatter can read the ID at build time without
// triggering that browser-only code during SSR.
export const GA_MEASUREMENT_ID = "G-59DYL2S7YT";
