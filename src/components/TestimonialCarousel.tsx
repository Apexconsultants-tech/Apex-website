"use client";

import { useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import type { testimonials } from "@/lib/site-config";

type Props = { items: readonly (typeof testimonials)[number][] };

// A continuous marquee, not a click-through slider: the track renders the
// testimonial list twice back to back, then animates translateX(0) to
// translateX(-50%) — exactly one copy's width — so the loop lands on an
// identical starting frame with no visible reset. Pausing is CSS-first
// (:hover/:focus-within) plus an explicit touch-driven class, since touch
// devices don't reliably sustain :hover during a read.
export default function TestimonialCarousel({ items }: Props) {
  const [touchPaused, setTouchPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onTouchStart() {
      setTouchPaused(true);
    }
    function onTouchEnd() {
      setTouchPaused(false);
    }
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)" }}
    >
      <div
        ref={trackRef}
        className={`animate-marquee-slow flex w-max gap-5 py-2 ${touchPaused ? "marquee-paused" : ""}`}
        role="region"
        aria-label="Student success stories, scrolling automatically. Pause by hovering, focusing, or touching a card."
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="w-[85vw] shrink-0 sm:w-[360px]"
            aria-hidden={i >= items.length}
          >
            <TestimonialCard item={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
