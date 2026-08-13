"use client";

import { useEffect, useState } from "react";
import { flagSize } from "@/lib/flags";
import { MAP_VIEWBOX, type HeroMapData } from "@/lib/hero-map-geo";

const SEEN_KEY = "apex-hero-map-seen";

// Base delay before the first arc starts revealing (lets the land + Pakistan
// highlight land first), and the stagger between each subsequent arc.
const ARC_BASE_DELAY = 550;
const ARC_STAGGER = 150;
const ARC_DURATION = 950;
// Marker + label pop-in is timed to land just as its arc finishes drawing.
const MARKER_LEAD = ARC_DURATION * 0.82;

type AnimState = "settled" | "priming" | "playing";

// Renders the pre-projected map data from hero-map-geo.ts (server-computed,
// so this component never needs d3-geo/topojson-client itself): Pakistan
// highlighted, dotted routes arcing out to each featured destination. On a
// visitor's first-ever load the routes draw themselves in, staggered, one at
// a time, with a small pulse traveling along each one; on every later load —
// or with prefers-reduced-motion — the map simply renders already fully
// drawn (the "settled" default state below, also what non-JS clients see).
//
// Everything (land, Pakistan, routes, flag labels) is plain SVG in one
// coordinate system on purpose: an HTML overlay positioned by percentage
// would drift out of alignment with the map the moment the SVG's own
// scaling kicks in. Native SVG content scales together automatically.
//
// preserveAspectRatio is left at its default ("xMidYMid meet") deliberately
// — the caller is expected to size this element's box to the same
// MAP_WIDTH:MAP_CROP_HEIGHT ratio the viewBox uses (see hero-preview's
// `aspectRatio: "1000 / 480"` wrapper) so "meet" never needs to letterbox:
// the whole map renders, uncropped, at every viewport width.
export default function HeroWorldMap({ data, className = "" }: { data: HeroMapData; className?: string }) {
  const { landPath, pakistanPath, origin, destinations, arcs } = data;
  const [state, setState] = useState<AnimState>("settled");

  useEffect(() => {
    let seen = true;
    try {
      seen = !!window.localStorage.getItem(SEEN_KEY);
    } catch {
      /* localStorage unavailable (privacy mode, etc.) — treat as already seen */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;

    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }

    // Reset to the hidden "priming" state, let it paint, then flip to
    // "playing" on the next frame so the CSS transitions actually animate
    // instead of jumping straight from settled to visible. Both setState
    // calls happen inside rAF callbacks (never synchronously in the effect
    // body) so the reset itself doesn't trigger a cascading render warning.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      setState("priming");
      raf2 = requestAnimationFrame(() => setState("playing"));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  const hidden = state === "priming";
  const animating = state === "playing";
  const baseTransition = animating ? "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)" : "none";

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      className={`block ${className}`}
      role="img"
      aria-label="World map showing Apex's study destinations connected by routes from Pakistan"
    >
      <defs>
        <radialGradient id="hm-pk-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
        <filter id="hm-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        {destinations.map((d, i) => (
          <mask id={`hm-mask-${d.slug}`} key={d.slug} maskUnits="userSpaceOnUse">
            <path
              d={arcs[d.slug]}
              stroke="#fff"
              strokeWidth={26}
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: hidden ? 1 : 0,
                transition: animating
                  ? `stroke-dashoffset ${ARC_DURATION}ms cubic-bezier(0.3,0.7,0.3,1) ${ARC_BASE_DELAY + i * ARC_STAGGER}ms`
                  : "none",
              }}
            />
          </mask>
        ))}
      </defs>

      {/* base landmass: pale green continents on the section's white/paper background */}
      <path
        d={landPath}
        className="fill-brand-tint stroke-brand/25"
        strokeWidth={0.6}
        style={{ opacity: hidden ? 0 : 1, transition: baseTransition }}
      />

      {/* Pakistan, called out in the site's brand green */}
      <g
        style={{
          opacity: hidden ? 0 : 1,
          transform: hidden ? "scale(0.9)" : "scale(1)",
          transformOrigin: `${origin.x}px ${origin.y}px`,
          transformBox: "fill-box",
          transition: animating ? "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 120ms" : "none",
        }}
      >
        <circle cx={origin.x} cy={origin.y} r={50} fill="url(#hm-pk-glow)" />
        <path d={pakistanPath} className="fill-brand stroke-brand-deep" strokeWidth={1.2} />
      </g>

      {/* routes: white halo + dotted green line, revealed by the masks above.
          The dotted line blinks continuously (staggered per route) on every
          load, not just the first-visit reveal — same "always animating"
          treatment as the rest of the site's decorative motion. */}
      {destinations.map((d, i) => (
        <g key={d.slug} mask={`url(#hm-mask-${d.slug})`}>
          <path d={arcs[d.slug]} fill="none" stroke="var(--color-paper)" strokeOpacity={0.9} strokeWidth={4} strokeLinecap="round" />
          <path
            d={arcs[d.slug]}
            fill="none"
            stroke="var(--color-brand-deep)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray="0.5 6.5"
            className="animate-route-blink"
            style={{ animationDelay: `${i * 0.22}s` }}
          />
        </g>
      ))}

      {/* traveling pulse: a glowing dot departs Karachi and flies to each
          destination on a continuous loop (a beat of travel, then a brief
          rest before the next one departs) — runs on every load, not just
          the first-visit reveal, same as the route blink above. */}
      {destinations.map((d, i) => {
        const beginMs = ARC_BASE_DELAY + i * ARC_STAGGER;
        const cycle = 4200;
        return (
          <circle key={d.slug} r={4.5} className="fill-brand stroke-white" strokeWidth={1} opacity={0}>
            <animateMotion
              dur={`${cycle}ms`}
              begin={`${beginMs}ms`}
              repeatCount="indefinite"
              keyPoints="0;1;1"
              keyTimes="0;0.55;1"
              calcMode="linear"
              path={arcs[d.slug]}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0;0"
              keyTimes="0;0.08;0.5;0.58;1"
              dur={`${cycle}ms`}
              begin={`${beginMs}ms`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* origin marker, Karachi */}
      <g style={{ opacity: hidden ? 0 : 1, transition: animating ? "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 200ms" : "none" }}>
        <circle cx={origin.x} cy={origin.y} r={10} className="fill-brand/30 animate-pulse-ring" style={{ transformOrigin: `${origin.x}px ${origin.y}px` }} />
        <circle cx={origin.x} cy={origin.y} r={4.5} className="fill-white stroke-brand-deep" strokeWidth={2} />
      </g>

      {/* destination markers + flag/name chips, popping in as their route finishes drawing */}
      {destinations.map((d, i) => {
        const delay = ARC_BASE_DELAY + i * ARC_STAGGER + MARKER_LEAD;
        const chipW = 15 + d.short.length * 5.6;
        const flag = flagSize(d.flag, 8.5);
        return (
          <a key={d.slug} href={`/${d.slug}`}>
            <g
              style={{
                opacity: hidden ? 0 : 1,
                transform: hidden ? "scale(0.4)" : "scale(1)",
                transformOrigin: `${d.point.x}px ${d.point.y}px`,
                transformBox: "fill-box",
                transition: animating
                  ? `opacity 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`
                  : "none",
              }}
            >
              <circle
                cx={d.point.x}
                cy={d.point.y}
                r={3.6}
                className="fill-white stroke-brand-deep animate-marker-blink"
                strokeWidth={1.6}
                style={{ animationDelay: `${i * 0.22}s` }}
              />
              <g transform={`translate(${d.point.x - chipW / 2}, ${d.point.y - 24})`}>
                <rect width={chipW} height={15} rx={7.5} className="fill-white stroke-brand/20" strokeWidth={0.6} />
                <image href={`/images/flags/${d.flag}.svg`} x={5} y={(15 - flag.height) / 2} width={flag.width} height={flag.height} />
                <text x={7 + flag.width} y={10.6} fontSize={7.5} fontWeight={600} className="fill-ink">
                  {d.short}
                </text>
              </g>
            </g>
          </a>
        );
      })}
    </svg>
  );
}
