import Image from "next/image";
import type { testimonials } from "@/lib/site-config";

export default function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.02] transition-shadow hover:shadow-lg hover:shadow-ink/5">
      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          alt={item.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-ink">{item.name}</p>
          <p className="text-xs text-ink-faint">{item.university}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        {item.name.split(" ")[0]} secured admission to <strong className="text-ink">{item.university}</strong>
        {item.program ? (
          <>
            {" "}for <strong className="text-ink">{item.program}</strong>
          </>
        ) : null}{" "}
        with end-to-end guidance from Apex, from applications and documentation to visa support.
      </p>
    </div>
  );
}
