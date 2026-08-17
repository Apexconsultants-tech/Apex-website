import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import CourseFinder from "@/components/CourseFinder";
import StatStrip from "@/components/StatStrip";
import { contact } from "@/lib/site-config";

// Code-split: the Globe's own JS (orbit-flag layout, drag/momentum
// panning, flag data) is sizeable and irrelevant to the rest of the hero,
// so it's fetched as its own chunk instead of bloating the bundle every
// other above-the-fold element has to wait behind. The skeleton keeps the
// hero's layout stable and shows something shaped immediately rather than
// an empty gap while that chunk loads.
const Globe = dynamic(() => import("@/components/Globe"), {
  loading: () => <GlobeSkeleton />,
});

// The homepage hero: cinematic photo background with the orbiting Globe.
export default function HeroClassic() {
  return (
    <section className="relative overflow-hidden">
      {/* Cinematic full-bleed background photo — a real, high-resolution
          airport departure scene rather than a flat brand-tinted
          background. Everything else in the hero (headline, globe,
          boarding pass) layers on top of it. */}
      <div className="absolute inset-0">
        <Image
          src="/images/stock/hero-cinematic-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Readability stack: strong on the left where the headline sits,
          fading out toward the globe on the right so the photo still
          reads as photography rather than disappearing under a flat
          wash. A faint brand tint keeps it tied to the site's palette,
          and a bottom fade blends the photo into the page's normal
          background instead of ending in a hard edge. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-brand-deep/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-paper)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="animate-hero-in">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
              Overseas education consultants since 2009
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Where Futures <span className="text-brand-tint">Cross Continents</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Dreaming of a degree abroad but not sure where to even start? You&apos;re not alone, and
              you don&apos;t have to figure it out by yourself. Since 2009, we&apos;ve walked students
              from Karachi, Hyderabad, and beyond through every step, picking the right course,
              acing the visa interview, and settling into life on a new campus, as ICEF-certified
              consultants who stay with you from your first conversation to the day you land.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/35"
              >
                Book free consultation
              </Link>
              <a
                href={contact.whatsappHref} data-track="whatsapp_click"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center animate-hero-in" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <div className="animate-float">
                <Globe />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-20 animate-hero-in lg:mt-24" style={{ animationDelay: "200ms" }}>
          <div className="mb-6 flex flex-col items-center rounded-3xl bg-black/35 px-6 py-6 text-center shadow-lg shadow-black/20 backdrop-blur-sm sm:px-10 sm:py-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand-deep shadow-lg shadow-black/10">
              <SearchGlyph />
              Course Finder
            </span>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Not sure where to start? <span className="text-brand-tint">Find your perfect course</span> in seconds
            </h2>
          </div>
          <CourseFinder />
        </div>

        <div className="mt-14 animate-hero-in" style={{ animationDelay: "260ms" }}>
          <StatStrip />
        </div>
      </div>
    </section>
  );
}

// Mirrors Globe's own outer shape (a circular window with the same ambient
// halo tones) so swapping the skeleton out for the real thing once its
// chunk loads doesn't shift the hero's layout.
function GlobeSkeleton() {
  return (
    <div className="relative aspect-square w-full">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(56,142,220,0.22),transparent_65%)] blur-2xl" />
      <div
        className="absolute inset-0 animate-skeleton-pulse rounded-full bg-gradient-to-br from-brand/25 via-brand-deep/20 to-black/30 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      />
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
