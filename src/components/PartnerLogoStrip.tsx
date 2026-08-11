import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { featuredPartnerLogos } from "@/lib/partner-logo-data";

// Homepage trust strip: the most recognizable names from the partner logo
// set Apex supplied, sliding in an infinite marquee (list is duplicated so
// the loop is seamless). The full set (48 institutions) lives on the
// partner-universities page — this is a curated subset, not the whole list.
const marqueeLogos = [...featuredPartnerLogos, ...featuredPartnerLogos];

export default function PartnerLogoStrip() {
  return (
    <section className="border-t border-line py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted network"
            title="Partner Universities"
            lead="A selection of the universities we work with as an authorized representative, across the UK, USA, and Australia."
          />
        </Reveal>
        <Reveal
          delay={100}
          className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <div className="flex w-max animate-marquee gap-5" aria-hidden="true">
            {marqueeLogos.map((u, i) => (
              <div
                key={`${u.slug}-${i}`}
                className="flex h-36 w-56 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface p-6 text-center shadow-sm shadow-ink/[0.03] transition-shadow hover:shadow-lg hover:shadow-ink/[0.06]"
              >
                <Image
                  src={`/images/university-logos/${u.logo}`}
                  alt={u.name}
                  width={200}
                  height={80}
                  className="h-16 w-auto max-w-[180px] object-contain"
                />
                <p className="text-xs font-medium leading-snug text-ink-soft">{u.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200} className="mt-8 text-center">
          <Link
            href="/partner-universities"
            className="inline-flex rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
          >
            View all partner universities →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
