"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site-config";

export default function StatStrip() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-lg shadow-ink/5 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-5 py-6 text-center sm:text-left">
          <StatValue value={s.value} />
          <p className="mt-1 text-sm text-ink-soft">
            {s.label}
            {"sub" in s && s.sub ? <span className="block text-xs text-ink-faint">{s.sub}</span> : null}
          </p>
        </div>
      ))}
    </div>
  );
}

// Counts up from 0 to the stat's numeric value the first time it scrolls
// into view. Non-numeric values (e.g. "Strong", "ICEF") just render as-is,
// no animation to fake.
function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            if (reduced) {
              setDisplay(`${target}${suffix}`);
              io.disconnect();
              continue;
            }
            const duration = 1200;
            const start = performance.now();
            const frame = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(`${Math.round(eased * target)}${suffix}`);
              if (progress < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return (
    <p ref={ref} className="font-display text-3xl font-semibold text-brand">
      {display}
    </p>
  );
}
