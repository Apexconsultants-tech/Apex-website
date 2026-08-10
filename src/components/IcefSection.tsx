import Image from "next/image";
import { icef } from "@/lib/site-config";

export default function IcefSection() {
  return (
    <div className="grid grid-cols-1 gap-10 rounded-3xl border border-line bg-surface p-8 shadow-lg shadow-ink/5 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Global quality standard</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          ICEF <span className="text-brand">Agency Status</span> Certified
        </h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          Apex Consulting Services holds ICEF Agency Status (IAS), a globally recognised
          accreditation for international education agencies. It confirms our commitment to
          professional standards, transparency, and ethical student recruitment practices.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-ink-soft">
          <li>Independently verified education agent</li>
          <li>Recognised by institutions worldwide</li>
          <li>Trusted partner for students and parents</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={icef.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/20 transition-all hover:shadow-md hover:shadow-brand/30"
          >
            Verify our certification
          </a>
          <a
            href={icef.aboutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Learn about ICEF
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-brand-tint to-surface-2 p-6 text-center shadow-sm shadow-brand/10">
        <Image
          src="/images/brand/icef-accredited-badge.webp"
          alt="ICEF Accredited Agency badge, trusted agency #4511"
          width={160}
          height={184}
          className="mx-auto h-auto w-40"
        />
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-faint">Certification status</p>
        <p className="font-display text-xl font-semibold text-ink">Valid IAS</p>
        <p className="mt-1 text-sm text-ink-soft">
          IAS ID: <strong className="text-ink">{icef.iasId}</strong>
        </p>
        <a
          href={icef.agencyProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
        >
          View agency profile →
        </a>
      </div>
    </div>
  );
}
