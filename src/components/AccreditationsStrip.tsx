import Image from "next/image";
import Reveal from "@/components/Reveal";

const accreditations = [
  {
    name: "ICEF Accredited Agency",
    tag: "Global accreditation",
    caption: "Independently vetted for ethical, professional student recruitment worldwide.",
    logo: "/images/brand/icef-accredited-lg.webp",
    width: 191,
    height: 220,
    accent: "#15803d",
  },
  {
    name: "British Council",
    tag: "UK recognition",
    caption: "Trained and recognised counsellors for UK study and admissions guidance.",
    logo: "/images/brand/british-council-lg.webp",
    width: 400,
    height: 142,
    accent: "#22a7e0",
  },
  {
    name: "YEDAB",
    tag: "Industry association",
    caption: "Member of the Association of Overseas Education Consultants.",
    logo: "/images/brand/yedab-lg.svg",
    width: 320,
    height: 220,
    accent: "#0d9488",
  },
] as const;

export default function AccreditationsStrip() {
  return (
    <section className="px-4 py-16 sm:px-5 sm:py-20 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-deep via-[#0f4d2a] to-ink px-5 py-12 shadow-2xl shadow-brand/20 sm:px-10 sm:py-16 lg:px-14">
        {/* depth: glows + fine grid */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-logo-lime/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-logo-sky/20 blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2 4 5.5v6c0 5 3.4 8.7 8 9.5 4.6-.8 8-4.5 8-9.5v-6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="m8.5 12 2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Trust &amp; recognition
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Accredited &amp; <span className="text-logo-lime">recognised</span> by
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
              Our advice meets international standards, backed by the bodies that set them for overseas education.
            </p>
            <div className="mt-6 flex items-center gap-6 text-white">
              <div>
                <p className="font-display text-2xl font-semibold">15+</p>
                <p className="text-xs text-white/70">Years of trust</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="font-display text-2xl font-semibold">3</p>
                <p className="text-xs text-white/70">Official credentials</p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {accreditations.map((a, i) => (
              <Reveal key={a.name} delay={100 + i * 100} className="h-full">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 sm:p-6 ${
                    i === 1 ? "sm:-translate-y-4 sm:hover:-translate-y-6" : ""
                  }`}
                >
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: a.accent }} />
                  <span
                    className="self-start rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ backgroundColor: `${a.accent}18`, color: a.accent === "#22a7e0" ? "#0b5f8a" : a.accent === "#0d9488" ? "#0f6b62" : "#0f6b31" }}
                  >
                    {a.tag}
                  </span>
                  <div className="mt-4 flex h-28 items-center justify-center rounded-2xl bg-surface-2/70 p-4 transition-colors duration-300 group-hover:bg-surface-2 sm:h-32">
                    <Image
                      src={a.logo}
                      alt={a.name}
                      width={a.width}
                      height={a.height}
                      className="h-full max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{a.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
