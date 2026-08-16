# Apex Consulting Services

Marketing website for Apex Consulting Services, an ICEF-accredited overseas
education consultancy based in Karachi with offices in Hyderabad and the UK.
The site covers destination and service guides, a partner university
directory, a course finder, success stories, a blog, and a contact/enquiry
form.

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, React Server
  Components, TypeScript)
- **UI:** React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com), configured via
  `src/app/globals.css` (no separate `tailwind.config`, Tailwind v4 uses
  CSS-based configuration)
- **Fonts:** `next/font` (Sora for display type, Public Sans for body text)
- **Email:** [Nodemailer](https://nodemailer.com) over SMTP, invoked from a
  server action
- **Analytics:** Google Analytics 4, loaded via `next/script`
- **Linting:** ESLint with `eslint-config-next`

## Project architecture

- Content-heavy pages (destinations, services) are rendered from a single
  catalog-style dynamic route (`src/app/[slug]/page.tsx`) that resolves the
  slug against either the destinations or services data set and renders a
  shared template component. This keeps ~28 pages consistent without
  duplicating markup.
- Structured content lives in `src/lib/*-data.ts` as typed arrays/objects,
  not in a CMS or database. Editing copy, adding a destination, or adding a
  partner university means editing the relevant data file.
- `src/lib/*.server.ts` files touch the filesystem (`node:fs`) to resolve
  optional per-page photos and must only be imported from server components;
  everything else in `src/lib` is safe to import from client components too.
- Server Actions (`src/app/actions.ts`) handle the contact form submission,
  including validation and the honeypot spam check, without a separate API
  route.

## Directory structure

```
src/
  app/                  Routes (App Router). One folder per top-level page,
                         plus [slug] for destinations/services and
                         blogs/[slug], partner-universities/[slug] for their
                         respective detail pages.
    actions.ts           Server action backing the contact form
    layout.tsx            Root layout: fonts, global nav/footer, JSON-LD
    sitemap.ts / robots.ts  Generated sitemap.xml and robots.txt
    opengraph-image.tsx     Auto-generated OG image for the homepage
  components/            Shared UI components
    destination/          Destination-page template
    service/               Service-page template
  lib/                    Typed content data, site config, and helpers
public/
  images/                 Local, optimized image assets (see below)
```

## Prerequisites

- Node.js 20+
- npm (the repo is set up with `package-lock.json`)

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values for local SMTP
testing. The mailbox is hosted on HostGator/cPanel — see the comments in
`.env.example` for exactly where to find each value. Without these set, the
contact form still validates submissions and logs them server-side, but
correctly returns an error to the visitor rather than claiming the enquiry
was sent — no email is delivered until they're configured.

| Variable           | Purpose                                    |
| ------------------ | ------------------------------------------- |
| `SMTP_HOST`         | SMTP server host (no default — must be set; see `.env.example`) |
| `SMTP_PORT`          | SMTP port (defaults to `465`)                |
| `SMTP_USER`           | SMTP account username (the full mailbox address) |
| `SMTP_PASS`            | SMTP account password                         |
| `CONTACT_TO_EMAIL`     | Inbox that receives enquiries (`info@apexconsultants.org`) |

## Build and deployment

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

Production deploys to Netlify from this repo's `main` branch. Set the SMTP
environment variables in the Netlify dashboard (Site configuration ->
Environment variables) for the contact form to send email in production —
see `.env.example` for the full list.

## Assets

- `public/images/` holds all first-party imagery (brand marks, destination
  and service photography, university logos, testimonial photos, flags) as
  local, pre-optimized WebP/SVG/PNG files. Nothing in the UI depends on a
  remote image host.
- Destination and service hero photos are resolved by filename convention
  (`src/lib/destination-photos.server.ts`, `src/lib/service-photos.server.ts`)
  so adding a new photo is just adding a correctly named file.
- See **[CONTENT-GUIDE.md](./CONTENT-GUIDE.md)** for step-by-step instructions
  on adding testimonials, destinations, universities, and other content.

## Integrations

- **Google Analytics 4** — loaded client-side in `src/components/Analytics.tsx`;
  the measurement ID lives in `src/lib/analytics.ts`. Any element with a
  `data-track="event_name"` attribute fires that GA4 event on click.
- **Google Maps embeds** — office locations on the Contact page
  (`src/components/OfficeLocations.tsx`) use unauthenticated Maps embed URLs,
  no API key required.
- **ICEF Agency Status** — the agency's accreditation is verifiable at the
  URLs in `src/lib/site-config.ts` (`icef.certificateUrl`,
  `icef.agencyProfileUrl`).
