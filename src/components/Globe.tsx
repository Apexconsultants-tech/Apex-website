"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { flagSize } from "@/lib/flags";

// Small flag chips that orbit the globe in screen space.
type OrbitFlagConfig = { code: string; radius: number; duration: number; delay: number; reverse?: boolean };

// One radius, one duration, one direction, evenly spaced — a single
// symmetric ring of flags moving together, not scattered independent orbits.
// nz dropped in favor of cn — Australia and New Zealand's flags both read as
// "navy blue with a Union Jack canton" at 20px and looked like a duplicate.
const FLAG_CODES = ["gb", "us", "ca", "au", "de", "cn", "fr", "ie"];
const FLAG_RADIUS = 1.5;
const FLAG_DURATION = 40;
const ORBIT_FLAGS: OrbitFlagConfig[] = FLAG_CODES.map((code, i) => ({
  code,
  radius: FLAG_RADIUS,
  duration: FLAG_DURATION,
  delay: -(i * (FLAG_DURATION / FLAG_CODES.length)),
}));

function OrbitFlag({ code, radius, duration, delay, reverse }: OrbitFlagConfig) {
  const outerName = reverse ? "orbit-spin-reverse" : "orbit-spin";
  const innerName = reverse ? "orbit-spin" : "orbit-spin-reverse";
  const timing = { animationDuration: `${duration}s`, animationDelay: `${delay}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" } as const;
  return (
    <div className="pointer-events-none absolute" style={{ inset: `${-radius}%`, animationName: outerName, ...timing }}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div style={{ animationName: innerName, ...timing }}>
          <Image
            src={`/images/flags/${code}.svg`}
            alt=""
            {...flagSize(code, 14)}
            className="rounded-[2px] border border-white shadow-[0_2px_6px_rgba(20,24,26,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}

// Small plane glyph used on the flight-path curve. Sized in the SVG's own
// 0-100 viewBox units, centered on its own origin so rotation looks right.
function PlaneMark() {
  return (
    <path
      d="M-2.6,0 L1.6,0 L3.2,-1 L3.2,-0.35 L0.9,0.55 L0.9,1.9 L2,2.6 L2,3.1 L0,2.6 L-2,3.1 L-2,2.6 L-0.9,1.9 L-0.9,0.55 L-3.2,-0.35 L-3.2,-1 Z"
      fill="var(--color-brand-deep)"
    />
  );
}

// The map asset's own aspect ratio (2600×1300 = 2:1, a standard
// equirectangular projection). This drives every percentage below — get
// this wrong and the pan either shows the same narrow sliver twice (the
// original bug: `fill`+`object-cover` inside a square box crops a wide
// image down to its centered slice and both "copies" end up showing that
// same crop) or drifts out of sync with drag.
const MAP_ASPECT = 2600 / 1300;

// Two copies sit side by side, each rendered at its natural aspect ratio
// (height = 100% of the circular window, width = height × MAP_ASPECT, no
// cropping at all) so each one is the *entire* world map, not a slice of
// it. The reel's own width is then exactly 2× one copy's width, so
// translateX(-50%) — 50% of the REEL's own width — pans exactly one full
// copy across, landing back on an identical starting frame: a seamless loop.
const AUTO_SPEED = 0.015; // % of reel width per frame (~50%/55s ≈ one lap a minute)
const FRICTION = 0.94;
const MOMENTUM_FLOOR = 0.004;
// Dragging one full wrapper-width should pan by one full visible window's
// worth of content. The visible window is wrapWidth out of a copy that's
// 2×MAP_ASPECT×wrapWidth wide (two copies make up the reel), so 1 wrapWidth
// of drag = 100/(2×MAP_ASPECT) percent of the reel.
const REEL_PERCENT_PER_WRAP_WIDTH = 100 / (2 * MAP_ASPECT);

// A real satellite photograph of Earth (NASA Blue Marble source data, via
// Solar System Scope's CC BY 4.0 day-map texture) panning behind a circular
// mask — genuine terrain, oceans, and coastlines, not a flat recolored
// vector map or dot-particle rendering. Two copies sit side by side inside
// a translating strip so the pan loops seamlessly.
export default function Globe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const reel = reelRef.current;
    if (!wrap || !reel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 10; // % of reel width, arbitrary start so land is visible immediately
    let pointerDown = false;
    let pointerX = 0;
    let dragDelta = 0;
    let velocity = 0;
    let momentum = 0;
    let raf = 0;
    let lastMoveTime = 0;

    function apply() {
      // Keep offset within [0, 50) — 50% of the reel is exactly one copy,
      // the seam where it can wrap without a visible jump.
      offset = ((offset % 50) + 50) % 50;
      if (reel) reel.style.transform = `translateX(-${offset}%)`;
    }
    apply();

    function frame() {
      if (pointerDown) {
        offset += dragDelta;
        dragDelta = 0;
      } else if (!reducedMotion) {
        if (Math.abs(momentum) > MOMENTUM_FLOOR) {
          offset += momentum;
          momentum *= FRICTION;
        } else {
          offset += AUTO_SPEED;
        }
      }
      apply();
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function onPointerDown(e: PointerEvent) {
      pointerDown = true;
      pointerX = e.clientX;
      lastMoveTime = performance.now();
      velocity = 0;
      wrap!.style.cursor = "grabbing";
    }
    function onPointerUp() {
      pointerDown = false;
      momentum = velocity;
      wrap!.style.cursor = "grab";
    }
    function onPointerMove(e: PointerEvent) {
      if (!pointerDown || !wrap) return;
      const now = performance.now();
      const dt = Math.max(now - lastMoveTime, 1);
      const deltaPercent = (-(e.clientX - pointerX) / wrap.clientWidth) * REEL_PERCENT_PER_WRAP_WIDTH;
      dragDelta = deltaPercent;
      velocity = (deltaPercent / dt) * 16;
      pointerX = e.clientX;
      lastMoveTime = now;
    }

    wrap.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      {/* ambient halo behind everything — shifted toward a sky-blue
          atmosphere tone now that the globe itself carries real satellite
          color, with a touch of brand green retained for site identity */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(56,142,220,0.22),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_65%_70%,rgba(21,128,61,0.13),transparent_55%)] blur-2xl" />

      {/* decorative orbit rings — plain lines, no riding markers */}
      <div className="pointer-events-none absolute -inset-[7%] animate-orbit rounded-full border border-dashed border-brand/25" />
      <div className="pointer-events-none absolute -inset-[15%] animate-orbit-reverse rounded-full border border-dashed border-brand/15" />

      {/* flight path — a single, very subtle route arcing past the globe,
          kept faint so it never competes with the satellite imagery. The
          dashed curve is static; only the plane moves, via a plain CSS
          animation so it inherits the same global prefers-reduced-motion
          handling as every other animation on the site. */}
      <svg className="pointer-events-none absolute -inset-[6%] overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        <path
          d="M8,72 Q50,-6 92,30"
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.22"
          strokeWidth="0.5"
          strokeDasharray="1.2 2.6"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute -inset-[6%]" aria-hidden="true">
        <div className="absolute h-4 w-4 animate-flight-plane">
          <svg width="16" height="16" viewBox="-4 -4 8 8" className="h-4 w-4 opacity-70">
            <PlaneMark />
          </svg>
        </div>
      </div>

      {/* atmosphere rim — a thin bright glow hugging the globe's own edge,
          distinct from the soft outer halo above; this is what actually
          reads as "atmosphere" rather than just ambient page glow */}
      <div className="pointer-events-none absolute -inset-[2.5%] rounded-full bg-[radial-gradient(circle,transparent_92%,rgba(147,197,253,0.55)_97%,transparent_100%)]" />

      {/* the globe itself: a circular window onto a panning satellite map */}
      <div
        ref={wrapRef}
        className="absolute inset-0 cursor-grab touch-none overflow-hidden rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.35)] animate-[globe-in_0.8s_ease-out]"
        role="img"
        aria-label="Satellite view of Earth highlighting Apex's study destinations, including the UK, USA, Canada, Australia, and Ireland"
      >
        {/* Reel width is intentionally NOT set — with no flex-grow on its
            children, a flex container sizes to the sum of its children's
            natural widths, which is exactly what "two full-width map
            copies side by side" needs. Setting an explicit width here was
            the other half of the original bug (it forced each copy into a
            50%-of-200% = 100%-of-square box, which is what made
            object-cover crop to a sliver in the first place). */}
        <div ref={reelRef} className="absolute inset-y-0 left-0 flex h-full" style={{ willChange: "transform" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="relative h-full shrink-0">
              <Image
                src="/images/brand/earth-satellite.webp"
                alt=""
                width={2600}
                height={1300}
                priority={copy === 0}
                draggable={false}
                sizes="(min-width: 1024px) 620px, 420px"
                className="h-full w-auto max-w-none select-none"
              />
            </div>
          ))}
        </div>

        {/* limb-darkening: fades the map toward the left/right edges, the
            same trick that makes a flat panning strip read as a curved
            sphere instead of a scrolling banner. Neutral navy-black rather
            than green-tinted now that the underlying texture is a real
            photograph with its own color. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_100%_at_50%_50%,transparent_52%,rgba(6,10,18,0.58)_100%)]" />
        {/* lighting highlight, upper-left, for a lit-sphere feel — a
            genuine sunlit-hemisphere look against real terrain */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.4),transparent_52%)]" />
        {/* soft outer ring so the circle edge doesn't look clinically flat */}
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
      </div>

      {/* little flags roaming around the globe */}
      {ORBIT_FLAGS.map((f) => (
        <OrbitFlag key={f.code} {...f} />
      ))}
    </div>
  );
}
