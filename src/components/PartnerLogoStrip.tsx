import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { partnerLogos } from "@/lib/partner-logo-data";

// Homepage trust strip, styled after a competitor reference site's "Popular
// and Partner Universities" section: a full-bleed tinted band with three
// stacked marquee rows of plain logos, no per-logo card/border/shadow — see
// reference-timesconsultant-competitor in project memory. Every logo sits in
// an identically-sized frame (object-contain, not natural aspect ratio) so
// a square emblem and a wide wordmark read as the same visual size instead
// of the wordmark dominating; only the handful of white-only marks
// (darkLogo: true, pulled from a dark website header) get an invert filter
// instead of a background chip, so nothing needs a box.
const rows: (typeof partnerLogos)[] = [[], [], []];
partnerLogos.forEach((u, i) => rows[i % 3].push(u));
const marqueeRows = rows.map((row) => [...row, ...row]);
const rowDurations = ["70s", "85s", "100s"];

export default function PartnerLogoStrip() {
  return (
    <section id="partner-logos" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted network"
            title="Partner Universities"
            lead="The universities and institutions we work with as an authorized representative, across the UK, USA, Australia, Germany, and Ireland."
          />
        </Reveal>
      </div>
      <div className="mt-10 space-y-14 bg-brand-tint/50 py-10">
        {marqueeRows.map((row, r) => (
          <Reveal
            key={r}
            delay={r * 100}
            className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          >
            <div
              className="flex w-max animate-marquee items-center gap-6"
              style={{ animationDuration: rowDurations[r], willChange: "transform" }}
              aria-hidden="true"
            >
              {row.map((u, i) => (
                <div key={`${u.slug}-${i}`} className="flex h-12 w-32 shrink-0 items-center justify-center sm:h-14 sm:w-36">
                  <Image
                    src={`/images/university-logos/${u.logo}`}
                    alt={u.name}
                    width={200}
                    height={64}
                    loading="eager"
                    className={u.darkLogo ? "aspect-auto h-full w-full object-contain invert" : "aspect-auto h-full w-full object-contain"}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
