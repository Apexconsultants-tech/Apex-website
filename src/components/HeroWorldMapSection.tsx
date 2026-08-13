import Link from "next/link";
import CourseFinder from "@/components/CourseFinder";
import HeroWorldMap from "@/components/HeroWorldMap";
import Reveal from "@/components/Reveal";
import StatStrip from "@/components/StatStrip";
import { getHeroMapData } from "@/lib/hero-map-geo";
import { contact } from "@/lib/site-config";

// Current homepage hero: a full-bleed world map (green landmass + Pakistan
// highlighted on white) with dotted routes animating out to Apex's
// featured destinations. Replaces HeroClassic (kept, unused, alongside
// this file if we ever want to revert).
export default function HeroWorldMapSection() {
  const mapData = getHeroMapData();

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Map band + headline share one grid cell at lg+ so the text
          overlays the map without needing position:absolute math; below
          lg there's no grid, so they simply stack — headline first, full
          map banner underneath. The map's wrapper is aspect-locked to the
          exact viewBox ratio at every size (not just lg+), so the SVG's
          default "meet" fit never has to crop or letterbox: the whole
          world map is always fully visible, edge to edge.

          The headline is bottom-anchored (lg:items-end) rather than
          centered: every featured destination projects into the top
          third of the map (UK/Ireland/Italy/USA/Canada/China all land
          between ~24-33% from the top), so anchoring the text block to
          the band's lower half keeps it clear of all of them — including
          North America — at any viewport width, instead of relying on a
          gradient to fade destinations out from underneath it. */}
      <div className="lg:grid lg:grid-cols-1">
        <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:flex lg:items-end">
          <div className="mx-auto w-full max-w-7xl px-5 pt-14 lg:px-8 lg:pb-40 lg:pt-16">
            <Reveal className="max-w-xl lg:-m-5 lg:rounded-3xl lg:bg-paper/45 lg:p-5 lg:backdrop-blur-[1px]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Overseas education consultants since 2009
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl lg:text-6xl">
                Where Futures <span className="text-brand">Cross Continents</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Since 2009, Apex Consulting Services has guided students from Karachi, Hyderabad, and
                beyond into leading universities in the UK, USA, Canada, Australia, and more. As
                ICEF-certified overseas education consultants, we build the right plan for your future,
                from your first consultation to the day you land abroad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/35"
                >
                  Book free consultation
                </Link>
                <a
                  href={contact.whatsappHref}
                  data-track="whatsapp_click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/35"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div
          className="animate-map-border-glow mt-8 w-full overflow-hidden rounded-2xl lg:col-start-1 lg:row-start-1 lg:mt-0"
          style={{ aspectRatio: "1000 / 480" }}
        >
          <HeroWorldMap data={mapData} className="h-full w-full" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-8 lg:px-8 lg:pb-16 lg:pt-10">
        <Reveal delay={200}>
          <CourseFinder />
        </Reveal>

        <Reveal delay={260} className="mt-14">
          <StatStrip />
        </Reveal>
      </div>
    </section>
  );
}
