# CLAUDE.md

## Before any change

- Read this file first, every session.
- Keep the site static and HostGator-compatible: no Node server, no API
  routes, no middleware, no SSR adapter. Everything ships as prerendered
  files Apache serves directly.
- Images are local and go through Astro's `<Image>`/`<Picture>`
  (`src/assets/images`, resolved via `src/lib/images.ts`'s `img()`/`ogUrl()`
  helpers) — never link to an external image host, never drop a raw file
  straight into `public/` unless it's an SVG (SVGs stay in `public/`,
  unprocessed) or one of the three brand marks that must stay byte-exact
  (`apex-icon.webp`, `apex-wordmark.webp`, `apex-logo.webp`).
- No React, no Vue, no heavy client-side framework, and no new runtime
  dependency of any real size, without asking first. Interactivity is
  small vanilla TypeScript modules under `src/scripts/`, loaded per-component
  via a `<script>` tag so each page only ships the JS it actually uses.
- Keep the performance budgets: `npm run build` must pass
  (`scripts/check-budgets.mjs` — JS ≤ 30KB/page, total page weight ≤ 1MB),
  and `npm run lighthouse` should stay at Performance ≥ 95, LCP < 2.5s,
  TBT < 200ms, CLS 0 on the representative URL set in
  `scripts/check-lighthouse.mjs`.
- Never rename or remove a URL without adding a matching 301 in
  `public/.htaccess`. `astro.config.mjs` uses `build.format: "file"`
  specifically so generated URLs stay flat (`about-us.html`, not
  `about-us/index.html`) and match `.htaccess`'s rewrite rules — don't
  change that without updating `.htaccess` to match.
- Never commit secrets. The only environment-sensitive things this project
  has are the four FTP deploy secrets, which live in GitHub repo settings
  (Settings → Secrets → Actions), never in a committed file.
- Run the build and checks before pushing: **pushing to `main` deploys the
  live site** via `.github/workflows/deploy.yml`. At minimum run
  `npm run build` (fast, byte budgets); run `npm run lighthouse` too before
  anything that touches images, fonts, or above-the-fold markup.
- `.github/workflows/check.yml` runs on every push to `astro-rebuild`
  (build + byte budgets + Lighthouse, no deploy) and uploads
  `lighthouse-results.json` as a build artifact — use that for real numbers
  from a clean runner instead of a local run, which is noisy on contended
  dev machines. In `deploy.yml`, the Lighthouse step is currently
  `continue-on-error: true` (report-only) while real CI numbers are being
  gathered; byte budgets remain a hard gate in both workflows. Tighten
  Lighthouse back into a hard gate in `deploy.yml` once the numbers are in —
  don't assume it's already blocking deploys.
- Commits on this repo: author is the repo owner only, no `Co-Authored-By`
  trailer. Messages are short, plain, and in the past tense (e.g. "fixed
  mobile nav overflow", not "Fix: Mobile Nav Overflow Issue").

## Stack

Astro 5 (static output), TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite`).
No UI framework. Content lives in `src/lib/*-data.ts` as typed arrays — same
pattern as before: destinations, services, blog posts, partner universities,
courses are all data, not markup, consumed by two shared templates
(`src/components/destination/DestinationTemplate.astro`,
`src/components/service/ServiceTemplate.astro`) via the catch-all
`src/pages/[slug].astro` route.

## Where things live

- `src/pages/` — routes. `[slug].astro` resolves to either a destination or
  a service from the data files; `blogs/[slug].astro` and
  `partner-universities/[slug].astro` are their own catch-alls.
- `src/components/` — Astro components. Anything interactive has a sibling
  module in `src/scripts/` that it imports inside its own `<script>` tag.
  **Never import a `src/scripts/*` module from an Astro component's
  frontmatter** — those modules have browser-only top-level code
  (`document.readyState` checks) that will crash the SSR build if evaluated
  on the server. If a component's frontmatter needs a value a script also
  uses (like the GA4 measurement ID), put that value in `src/lib/` instead
  and have both sides import it from there.
- `src/lib/` — framework-agnostic content and helpers. `*.server.ts` files
  touch the filesystem and must only be imported from `.astro` files, never
  from a `src/scripts/*` client module.
- `scripts/` — build/CI tooling, not part of the site itself:
  `check-budgets.mjs` (byte budgets, runs in `npm run build`),
  `check-lighthouse.mjs` (`npm run lighthouse`, separate so a noisy single
  run never blocks `npm run build`), `screenshot.mjs` (manual visual-diff tool).
- `public/.htaccess` — bot blocking (keep in sync with `src/lib/seo.ts`'s
  `blockedBots`, which also drives `robots.txt`), the extensionless-URL
  rewrite, 404 page, and static-asset caching. `public/contact.php` — the
  form handler, runs on HostGator's PHP, not Node.

## Known limitation

`contact.php` can't be exercised locally (no PHP here) — `npm run dev`/
`npm run preview` will hit a network error on submit. That's expected;
verify the request shape and validation locally, and confirm actual
delivery after a real deploy.
