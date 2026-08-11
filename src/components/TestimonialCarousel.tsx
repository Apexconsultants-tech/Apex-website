"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import type { testimonials } from "@/lib/site-config";

type Props = { items: readonly (typeof testimonials)[number][] };

const AUTOPLAY_MS = 4000;

// Native scroll-snap carousel: touch/swipe works for free (it's just
// horizontal scrolling), arrow keys and prev/next buttons scroll the track
// directly (scrollLeft, not scrollIntoView — one source of truth for the
// scroll position, no dependence on "nearest scrollable ancestor"
// resolution). Autoplay always runs and always loops; the global CSS
// prefers-reduced-motion override already collapses scroll-behavior to
// "auto" sitewide, so reduced-motion users still auto-advance, just
// without the smooth animation, rather than the carousel going static.
export default function TestimonialCarousel({ items }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const [active, setActiveState] = useState(0);
  const [announce, setAnnounce] = useState("");
  const [inView, setInView] = useState(false);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const el = slideRefs.current[index];
      if (!track || !el) return;
      track.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
      activeRef.current = index;
      setActiveState(index);
      setAnnounce(`Showing story ${index + 1} of ${items.length}: ${items[index].name}`);
    },
    [items]
  );

  // Keep the dot indicator in sync when the user drags/swipes the track
  // directly. Deliberately not IntersectionObserver-based: with 3 cards
  // visible at once on desktop (lg:w-[31%]), all 3 cross any reasonable
  // intersection threshold simultaneously, and a per-entry callback loop
  // ends up overwriting activeRef with whichever of the 3 fires last in
  // that batch — typically the rightmost — corrupting the autoplay driver's
  // "+1" math into an erratic 3-card jump. Finding the slide nearest the
  // track's actual scrollLeft has no such ambiguity.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!track) return;
        let closest = 0;
        let closestDist = Infinity;
        slideRefs.current.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(el.offsetLeft - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        if (closest !== activeRef.current) {
          activeRef.current = closest;
          setActiveState(closest);
        }
      });
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Only run autoplay once the carousel has actually scrolled into view —
  // otherwise it silently cycles through slides while off-screen, and by
  // the time a visitor scrolls down to it, it looks like nothing is moving.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      scrollToIndex((activeRef.current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [inView, items.length, scrollToIndex]);

  function go(delta: number) {
    scrollToIndex((activeRef.current + delta + items.length) % items.length);
  }

  function pause() {
    pausedRef.current = true;
  }
  function resume() {
    pausedRef.current = false;
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onFocus={pause}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) resume();
      }}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Student success stories, auto-advancing, pauses on hover or focus"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        }}
      >
        {items.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <TestimonialCard item={t} />
          </div>
        ))}
      </div>

      <div className="sr-only" aria-live="polite">{announce}</div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous story"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to story ${i + 1} of ${items.length}`}
              aria-current={active === i}
              className={`h-2 rounded-full transition-all ${active === i ? "w-6 bg-brand" : "w-2 bg-line hover:bg-ink-faint"}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next story"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
