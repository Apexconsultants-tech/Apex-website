"use client";

import { useState } from "react";
import { contact, offices } from "@/lib/site-config";

export default function OfficeLocations() {
  const [activeId, setActiveId] = useState<(typeof offices)[number]["id"]>(offices[0].id);
  const active = offices.find((o) => o.id === activeId) ?? offices[0];
  const mapSrc = `https://maps.google.com/maps?q=${active.mapQuery}&hl=en&z=${active.mapZoom}&output=embed`;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
      <div className="flex flex-col gap-3">
        {offices.map((o, i) => {
          const isActive = o.id === activeId;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setActiveId(o.id)}
              aria-pressed={isActive}
              className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                isActive ? "border-brand bg-brand-tint" : "border-line bg-surface hover:border-brand/50"
              }`}
            >
              <span className="text-xs font-semibold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 text-base font-semibold text-ink">{o.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{o.address}</p>
              <a
                href={contact.phoneHref} data-track="phone_click"
                onClick={(e) => e.stopPropagation()}
                className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {contact.phoneDisplay}
              </a>
            </button>
          );
        })}
      </div>
      <div className="overflow-hidden rounded-2xl border border-line">
        <iframe
          key={active.id}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map: ${active.name}`}
          className="h-full min-h-[360px] w-full"
        />
      </div>
    </div>
  );
}
