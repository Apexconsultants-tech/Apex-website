"use client";

import { useState } from "react";
import { faqs as defaultFaqs } from "@/lib/site-config";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items?: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = items ?? defaultFaqs;

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface shadow-sm shadow-ink/[0.03]">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink sm:px-6 sm:py-5 sm:text-base"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.q}
                <span
                  className={`shrink-0 text-ink-faint transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={`faq-panel-${index}`} className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-6">
                {item.a}
              </div>
            )}
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
