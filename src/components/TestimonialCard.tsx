import Image from "next/image";
import type { testimonials } from "@/lib/site-config";

export default function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.02] transition-shadow hover:shadow-lg hover:shadow-ink/5 sm:p-7">
      <QuoteIcon />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft sm:text-base">
        {item.name.split(" ")[0]} secured admission to <strong className="text-ink">{item.university}</strong>
        {item.program ? (
          <>
            {" "}for <strong className="text-ink">{item.program}</strong>
          </>
        ) : null}{" "}
        with end-to-end guidance from Apex, from applications and documentation to visa support.
      </p>
      <div className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
        <Image
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full border-2 border-brand-tint object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-ink">{item.name}</p>
          <p className="text-xs text-ink-faint">{item.university}</p>
          <p className="text-xs text-ink-faint">{item.country}</p>
        </div>
      </div>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="text-brand-tint" aria-hidden="true">
      <path
        d="M11.5 0 6 11h5v11H0V11.5L5 0h6.5Zm16.5 0-5.5 11H28v11H16.5V11.5L21.5 0H28Z"
        fill="currentColor"
      />
    </svg>
  );
}
