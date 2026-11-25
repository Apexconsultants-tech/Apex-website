# Content & Image Maintenance Guide

Practical guide for updating website content: testimonials, destinations,
universities, and images. No code changes are needed for any of the tasks
below — just edit the relevant data file and drop images into the right
folder.

## Where images live

All images are local, under `public/images/`, organized by category:

```
public/images/
  brand/             Logo, wordmark, icon, world map, ICEF badges
  destinations/       Country hero photos + "life" photos
  flags/               Country flag SVGs
  gallery/              Miscellaneous branded photography
  services/              Hero photo per service page
  stock/                 General-purpose stock photography (homepage, about, contact)
  testimonials/           Student photos
  university-logos/       Partner university logo marks (PNG)
```

There are no remote/external image URLs anywhere on the site — every
`<Image>` points at a path under `/images/...`. `next.config.ts` doesn't
whitelist any external image domains, so a remote image URL would fail to
load even if one were added by mistake. Keep it that way: always save new
images into `public/images/...` rather than linking to an external host.

**Naming convention:** lowercase, kebab-case, matching the slug/identifier
used in the corresponding data file (e.g. `study-in-uk` → `uk.webp`).

## Adding a testimonial

1. Add the student's photo to `public/images/testimonials/firstname-lastname.jpeg`
   (roughly square, at least 300×300px — it's rendered as a 64×64 circular
   avatar, so a tight headshot crop works best).
2. Open `src/lib/site-config.ts` and add an entry to the `testimonials` array:

   ```ts
   { name: "Jane Doe", program: "MSc Data Science", university: "University of Example", country: "United Kingdom", image: "/images/testimonials/jane-doe.jpeg" },
   ```

   - `program` is optional — omit it entirely if the student's program isn't known.
   - If you don't have a usable photo yet, don't add the entry until you do —
     there's no placeholder-avatar fallback by design.

That's it. The homepage carousel and the `/success-stories` page both read
from this same array, so one edit updates both.

## Adding a destination

Destinations are fully data-driven from `src/lib/destinations-data.ts` —
no new page or component is needed.

1. Add two photos:
   - `public/images/destinations/{country}.webp` — hero/landmark photo
   - `public/images/destinations/{country}-life.webp` — campus/student-life photo (optional; falls back to the hero photo if missing)
2. If the country's flag isn't already in `public/images/flags/`, add
   `{code}.svg` (ISO 3166-1 alpha-2 lowercase, e.g. `jp` for Japan) and
   register its width:height ratio in `src/lib/flags.ts` (`FLAG_RATIO`) —
   check the SVG's own `viewBox` for the ratio. If skipped, it falls back
   to a generic 3:2 ratio, which will look stretched for a non-3:2 flag.
3. Add an entry to the `destinations` array in `destinations-data.ts`. Copy
   an existing entry (e.g. `study-in-ireland`) as a template — every field
   is required except `scholarships` (can be an empty array):

   | Field | Notes |
   |---|---|
   | `slug` | `study-in-{country}`, used directly as the page URL |
   | `name`, `short` | Full name and short display name (e.g. "United Kingdom" / "UK") |
   | `flag` | The flag code from step 2 |
   | `region` | `"Popular"` or `"More"` — controls homepage grouping |
   | `heroStats` | 2–3 short strings shown as pills under the H1 |
   | `intro` | 2–4 sentence paragraph |
   | `whyPoints` | 3 `{ title, body }` reasons to study there |
   | `requirements` | List of admission requirements |
   | `universities` | List of `{ name, note? }` |
   | `cost` | Paragraph covering tuition + living costs |
   | `scholarships` | List of scholarship names/descriptions |
   | `visaName` | e.g. "UK Student Visa" |
   | `visaRequirements` | List of visa documents |
   | `postStudyWork` | Paragraph on post-study work rights |
   | `faqs` | List of `{ q, a }` — becomes the page's FAQ section and FAQPage structured data |

4. The page itself (title, canonical, breadcrumbs, Open Graph image, FAQ
   schema) is generated automatically from this data — see "SEO fields"
   below for what's derived vs. what to double-check.

## Adding a partner university

There are two different ways a university can appear, depending on how
much detail you have:

- **Full profile page** (its own URL, shows courses, "why apply" section):
  add an entry to `partnerUniversities` in `src/lib/universities-data.ts`
  (`slug`, `name`, `country`, `city`, `countrySlug`, `flag`, `homepage`).
  These don't use a logo image — the country flag is shown instead.
- **Logo-only listing** (shown in the marquee/grid on the partner
  universities page, no individual page): add the logo file to
  `public/images/university-logos/{name}.png` (transparent background,
  ~400×160px works well) and add an entry to `partnerLogos` in
  `src/lib/partner-logo-data.ts`, with `featured: true` if it should also
  appear in the homepage marquee.

## Adding/replacing a general website image

Drop the file into the matching folder under `public/images/` (see the
table above) and reference it directly as `/images/{folder}/{file}.webp`
in the component or page you're editing — most of these are plain
`<Image src="/images/...">` calls, not data-driven.

## Image specs

| Type | Format | Suggested size | Notes |
|---|---|---|---|
| Destination hero/life photos | `.webp` | ~1600×1067 (3:2) | Landscape orientation |
| Service hero photos | `.webp` | ~1600×1067 (3:2) | |
| Testimonial photos | `.jpeg` or `.webp` | 300×300+ (square) | Rendered as a circular crop |
| University logos | `.png` | ~400×160, transparent bg | |
| Flags | `.svg` | — | Match the source's own aspect ratio |

WebP is preferred for photos (smaller file size, same visual quality).
Compress before committing — large unoptimized source photos slow down
every page that uses them.

## SEO fields to fill in

Most metadata (title, canonical URL, Open Graph image, breadcrumbs) is
generated automatically from the data file for destinations, services, and
university profiles — you don't need to touch `generateMetadata` code.
When adding a new destination or service, just make sure:

- `intro` (destinations) / the page's description source reads as a
  genuine, unique 1–2 sentence summary — it's used directly as the meta
  description (truncated to ~155 characters).
- Every photo you add has already-correct usage in an `<Image>` — alt text
  for destination/service hero photos is generated from the country/service
  name automatically; if you add a photo somewhere else in JSX yourself,
  write a specific, accurate `alt` describing what's actually in the photo
  (or `alt=""` if it's purely decorative).
- New blog posts (`src/lib/blog-data.ts`) need `title`, `excerpt`
  (meta description), `image`, and `imageAlt` filled in directly — these
  aren't derived from anything else.

## Verifying after a content change

```bash
npm run build
```

This catches broken image paths, missing required fields, and type errors
in the data files. If it completes without errors, the new content is
safe to deploy.
