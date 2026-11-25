# Apex Consulting Services

Marketing website for Apex Consulting Services, an ICEF-accredited overseas
education consultancy based in Karachi with offices in Hyderabad and the UK.
The site covers destination and service guides, a partner university
directory, a course finder, success stories, a blog, and a contact/enquiry
form.

## Tech stack

- **Framework:** [Astro 5](https://astro.build), static output
  (`output: "static"`), TypeScript
- **UI:** no client-side framework. Interactive bits (header menus, course
  finder, contact form, carousels, tilt cards, reveal animations, the hero
  globe) are small vanilla TypeScript modules under `src/scripts/`, each
  loaded only on the page that uses it via a `<script>` tag inside the
  relevant Astro component.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via
  `@tailwindcss/vite`, configured in `src/styles/globals.css` (CSS-based
  configuration, no `tailwind.config`)
- **Fonts:** self-hosted via `@fontsource/sora` and `@fontsource/public-sans`
  (`font-display: swap`, the two above-the-fold weights preloaded in
  `src/components/BaseHead.astro`)
- **Images:** `src/assets/images/`, processed at build time by Astro's
  `<Image>`/`<Picture>` (AVIF + WebP, explicit dimensions, responsive
  `sizes`), resolved from their original `/images/...` path strings via
  `src/lib/images.ts`. SVGs (flags, a few vector logos) and the three brand
  marks that must stay byte-exact (`apex-icon.webp`, `apex-wordmark.webp`,
  `apex-logo.webp`) stay in `public/images/`, unprocessed.
- **Contact form:** `src/components/ContactForm.astro` posts to
  `public/contact.php`, a plain PHP mail handler that runs on HostGator's
  own PHP/Apache — no Node server, no third-party form service.
- **Analytics:** Google Analytics 4, loaded with `defer` and bootstrapped on
  `requestIdleCallback` so it never competes with LCP/TBT
  (`src/scripts/analytics.ts`).

## Project architecture

- Content-heavy pages (destinations, services) are rendered from a single
  catalog-style dynamic route (`src/pages/[slug].astro`) that resolves the
  slug against either the destinations or services data set and renders a
  shared template component. This keeps ~28 pages consistent without
  duplicating markup.
- Structured content lives in `src/lib/*-data.ts` as typed arrays/objects,
  not in a CMS or database. Editing copy, adding a destination, or adding a
  partner university means editing the relevant data file.
- `src/lib/*.server.ts` files touch the filesystem (`node:fs`) to resolve
  optional per-page photos and must only be imported from `.astro` files
  (never from a `src/scripts/*` client module).
- `src/scripts/*` modules have browser-only top-level code — never import
  one from an Astro component's frontmatter (that runs during the SSG
  build, where `document`/`window` don't exist). If frontmatter and a
  script both need the same value, put it in `src/lib/` instead.

## Directory structure

```
src/
  pages/                Routes. [slug].astro resolves to a destination or a
                         service; blogs/[slug].astro and
                         partner-universities/[slug].astro are their own
                         catch-alls. sitemap.xml.ts / robots.txt.ts are
                         generated endpoints.
  layouts/BaseLayout.astro  Root layout: head, header/footer, global scripts
  components/            Astro components (.astro)
    destination/          Destination-page template
    service/                Service-page template
    ui/                      Shared dropdown primitives
  scripts/               Vanilla TS modules, one per interactive component
  lib/                    Typed content data, site config, and helpers
  styles/                 globals.css (Tailwind + custom CSS), fonts.css
public/
  images/                 Local SVGs + the 3 byte-exact brand marks
  contact.php             Form handler (runs on HostGator's PHP)
  .htaccess               Bot blocking, URL rewrite, caching, 404
scripts/                  Build/CI tooling (not shipped): byte-budget gate,
                         Lighthouse gate, screenshot tool
```

## Prerequisites

- Node.js 20+
- npm

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`. The contact form will hit a
network error locally — there's no PHP server here, so `/contact.php`
can't actually run. That's expected; it only runs after deploying to
HostGator.

## Environment variables

None are required to build or run the site — see `.env.example`. The only
secrets this project has are the four FTP deploy credentials, which live in
the GitHub repo's Actions secrets, not in any file here.

## Build, checks, and deployment

```bash
npm run build       # astro build, then the byte-budget gate (fast, no browser)
npm run lighthouse   # separate: mobile Lighthouse gate, median of 3 runs/URL
npm run check        # astro check (TypeScript + template diagnostics)
npm run preview      # serve the production build locally
```

**Pushing to `main` deploys the live site** via
`.github/workflows/deploy.yml`: `npm ci` → `astro check` → `npm run build`
→ `npm run lighthouse` → upload `dist/` to HostGator over FTPS
(`SamKirkland/FTP-Deploy-Action`, changed files only). That workflow needs
four repository secrets set in GitHub (Settings → Secrets and variables →
Actions): `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.

Run `npm run build` (and `npm run lighthouse` for anything touching images,
fonts, or above-the-fold markup) before pushing to `main`.

## Assets

- `src/assets/images/` holds first-party raster imagery (destination and
  service photography, university logos, testimonial photos, brand badges),
  processed into AVIF/WebP at build time. Nothing in the UI depends on a
  remote image host.
- Destination and service hero photos are resolved by filename convention
  (`src/lib/destination-photos.server.ts`, `src/lib/service-photos.server.ts`)
  so adding a new photo is just adding a correctly named file.
- See **[CONTENT-GUIDE.md](./CONTENT-GUIDE.md)** for step-by-step
  instructions on adding testimonials, destinations, universities, and
  other content (the image-location details there predate this Astro
  rebuild — paths now resolve through `src/lib/images.ts`, but the
  naming conventions are unchanged).

## Integrations

- **Google Analytics 4** — `src/scripts/analytics.ts` + `src/lib/ga.ts` for
  the measurement ID. Any element with a `data-track="event_name"`
  attribute fires that GA4 event on click.
- **Google Maps embeds** — office locations on the Contact page
  (`src/components/OfficeLocations.astro`) use unauthenticated Maps embed
  URLs, no API key required.
- **ICEF Agency Status** — the agency's accreditation is verifiable at the
  URLs in `src/lib/site-config.ts` (`icef.certificateUrl`,
  `icef.agencyProfileUrl`).
