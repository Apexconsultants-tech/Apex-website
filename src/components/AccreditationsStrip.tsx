import Image from "next/image";
import Reveal from "@/components/Reveal";

const accreditations = [
  { name: "ICEF Accredited Agency", logo: "/images/brand/icef-accredited-lg.webp", width: 191, height: 220 },
  { name: "British Council", logo: "/images/brand/british-council-lg.webp", width: 400, height: 142 },
  { name: "YEDAB — Association of Overseas Education Consultants", logo: "/images/brand/yedab-lg.svg", width: 320, height: 220 },
] as const;

export default function AccreditationsStrip() {
  return (
    <section className="border-t border-line py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Trust &amp; recognition</p>
          <h2 className="mt-1.5 text-xl font-semibold text-ink sm:text-2xl">Accredited &amp; Recognised By</h2>
        </Reveal>
        <Reveal delay={100} className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {accreditations.map((a) => (
            <div
              key={a.name}
              className="flex h-52 w-80 items-center justify-center rounded-2xl border border-line bg-surface p-8 shadow-sm shadow-ink/[0.03]"
            >
              <Image
                src={a.logo}
                alt={a.name}
                width={a.width}
                height={a.height}
                className="h-full max-h-36 w-auto object-contain"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
