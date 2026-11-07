"use client";

import { useState } from "react";
import { faqs as defaultFaqs } from "@/lib/site-config";

type FaqItem = { q: string; a: string };

/**
 * Mouse users: a question opens while the cursor is over it and closes when
 * the cursor leaves. Touch / keyboard users: tap or press to toggle, since
 * there is no hover on those devices.
 */
export default function FaqAccordion({ items }: { items?: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = items ?? defaultFaqs;

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface shadow-sm shadow-ink/[0.03]">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            className={`transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl ${isOpen ? "bg-brand-tint/40" : ""}`}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setOpenIndex(index);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setOpenIndex((cur) => (cur === index ? null : cur));
            }}
          >
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink sm:px-6 sm:py-5 sm:text-base"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={(e) => {
                  // A mouse click on an item that hover already opened shouldn't close it.
                  if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
                  setOpenIndex(isOpen ? null : index);
                }}
              >
                {item.q}
                <span
                  className={`shrink-0 transition-all duration-300 ${isOpen ? "rotate-45 text-brand" : "text-ink-faint"}`}
                  aria-hidden="true"
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-6">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
