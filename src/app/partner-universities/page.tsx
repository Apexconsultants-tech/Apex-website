import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { partnerUniversities } from "@/lib/universities-data";
import { otherPartnerLogos } from "@/lib/partner-logo-data";
import { flagSize } from "@/lib/flags";
import { contact } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const logosByCountry = otherPartnerLogos.reduce<Record<string, typeof otherPartnerLogos>>((acc, u) => {
  (acc[u.country] ??= []).push(u);
  return acc;
}, {});

const partnersTitle = "Partner Universities Abroad for Pakistani Students";
const partnersDescription =
  "Apex Consulting Services works directly with universities across 50+ countries as an authorized representative, not a third-party reseller.";

export const metadata: Metadata = {
  title: partnersTitle,
  description: partnersDescription,
  alternates: { canonical: "/partner-universities" },
  openGraph: { title: partnersTitle, description: partnersDescription, url: "/partner-universities" },
  twitter: { card: "summary_large_image", title: partnersTitle, description: partnersDescription },
};

export default function PartnerUniversitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Partner Universities", path: "/partner-universities" }])} />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current="Partner Universities" />
        <Reveal className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Global university network</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            Partner <span className="text-brand">Universities</span> Worldwide
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            We work directly with universities and institutions across 50+ countries, giving you access
            to a wide range of undergraduate, postgraduate, diploma, language, and professional programs,
            backed by our standing as an authorized representative, not a third-party reseller.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-8 grid grid-cols-3 gap-4 sm:max-w-md">
          <MiniStat value="16+" label="Partner universities" />
          <MiniStat value="6+" label="Countries" />
          <MiniStat value="2009" label="Trusted guidance since" />
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partnerUniversities.map((u, i) => (
              <Reveal key={u.slug} delay={(i % 6) * 60}>
                <Link href={`/partner-universities/${u.slug}`} className="block h-full">
                  <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-lg hover:shadow-ink/5" max={5}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-snug text-ink">{u.name}</h3>
                      <Image
                        src={`/images/flags/${u.flag}.svg`}
                        alt=""
                        {...flagSize(u.flag, 18)}
                        className="mt-1 shrink-0 rounded-sm"
                      />
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">
                      {u.country} &middot; {u.city}
                    </p>
                    <span className="mt-3 inline-flex text-xs font-semibold text-brand-text">
                      View courses and details →
                    </span>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Extended network</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            More Partner <span className="text-brand">Institutions</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Beyond the universities above, Apex works with institutions across the UK, USA, Australia,
            Germany, and Ireland.
          </p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {Object.entries(logosByCountry).map(([country, logos]) => (
            <div key={country}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">{country}</h3>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {logos.map((u) => (
                  <div
                    key={u.slug}
                    className="flex h-32 flex-col items-center justify-center gap-3 rounded-xl border border-line bg-surface p-4 text-center shadow-sm shadow-ink/[0.03] transition-shadow hover:shadow-md hover:shadow-ink/[0.06]"
                  >
                    <Image
                      src={`/images/university-logos/${u.logo}`}
                      alt={u.name}
                      width={140}
                      height={56}
                      className="h-11 w-auto max-w-[130px] object-contain"
                    />
                    <p className="text-[11px] font-medium leading-tight text-ink-soft">{u.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Not sure which university fits you?</h2>
              <p className="mt-3 max-w-lg text-white">
                Tell us your grades, budget, and goals, and we will match you to the right program.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
              >
                Book free consultation
              </Link>
              <a
                href={contact.whatsappHref} data-track="whatsapp_click"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-3 text-center">
      <p className="font-display text-lg font-semibold text-brand-text">{value}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-ink-faint">{label}</p>
    </div>
  );
}
