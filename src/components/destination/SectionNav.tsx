"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

// Sticky in-page navigation for destination pages: highlights the section
// currently in view and keeps the active pill scrolled into view on small
// screens, where the bar scrolls horizontally.
export default function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const bar = barRef.current;
    const pill = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (bar && pill) {
      bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav aria-label="On this page" className="sticky top-[73px] z-40 border-y border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75 sm:top-[79px] lg:top-[83px]">
      <div ref={barRef} className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              data-id={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "bg-gradient-to-r from-brand to-logo-teal text-white shadow-sm shadow-brand/30" : "text-ink-soft hover:bg-brand-tint hover:text-brand-text"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
