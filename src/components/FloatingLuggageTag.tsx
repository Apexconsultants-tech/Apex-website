"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const DISMISS_KEY = "apex-luggage-tag-dismissed";
const SHOW_AFTER_PX = 500;

// Card geometry, shared between the SVG outline and the HTML content
// layered on top of it, so the perforation notches and the dashed divider
// line up exactly with the stub/main column split.
const W = 288;
const H = 104;
const R = 14; // corner radius
const NOTCH_X = 76; // where the stub ends and the perforation sits
const NOTCH_R = 7;

const CARD_PATH = `
  M ${R},0
  L ${NOTCH_X - NOTCH_R},0
  A ${NOTCH_R},${NOTCH_R} 0 0 0 ${NOTCH_X + NOTCH_R},0
  L ${W - R},0
  A ${R},${R} 0 0 1 ${W},${R}
  L ${W},${H - R}
  A ${R},${R} 0 0 1 ${W - R},${H}
  L ${NOTCH_X + NOTCH_R},${H}
  A ${NOTCH_R},${NOTCH_R} 0 0 0 ${NOTCH_X - NOTCH_R},${H}
  L ${R},${H}
  A ${R},${R} 0 0 1 0,${H - R}
  L 0,${R}
  A ${R},${R} 0 0 1 ${R},0
  Z
`.trim();

// A luggage-tag-turned-boarding-ticket CTA that slides in from the right
// once the visitor has actually scrolled into the page, not on arrival.
// Desktop only — the mobile StickyContactBar already owns the bottom of
// small screens. Once dismissed, it stays dismissed for the session.
export default function FloatingLuggageTag() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(DISMISS_KEY) === "1"
  );

  useEffect(() => {
    if (dismissed) return;
    function onScroll() {
      if (window.scrollY > SHOW_AFTER_PX) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden lg:block">
      <div className="animate-slide-in-right pointer-events-auto relative" style={{ width: W }}>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setDismissed(true);
          }}
          aria-label="Dismiss"
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-ink-faint shadow-sm transition-colors hover:text-ink"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        <Link href="/contact-us" className="group relative block" style={{ width: W, height: H }}>
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 drop-shadow-xl transition-transform group-hover:-translate-y-0.5"
          >
            <path d={CARD_PATH} className="fill-surface stroke-line" strokeWidth="1" />
            {/* perforation: dashed divider between the notches */}
            <line
              x1={NOTCH_X}
              y1={NOTCH_R + 4}
              x2={NOTCH_X}
              y2={H - NOTCH_R - 4}
              stroke="var(--color-line)"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            {/* barcode flourish, bottom of the stub */}
            <g className="fill-ink-faint" opacity="0.4">
              {[8, 13, 16, 22, 27, 32, 38, 41, 47, 52, 58, 63].map((x, i) => (
                <rect key={x} x={x} y={H - 14} width={i % 3 === 0 ? 2 : 1} height="8" />
              ))}
            </g>
          </svg>

          {/* stub: destination glyph */}
          <div className="absolute inset-y-0 left-0 flex flex-col items-center justify-center gap-1.5" style={{ width: NOTCH_X }}>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm"
              style={{ background: "linear-gradient(160deg, #0ea5e9, #2563eb)" }}
            >
              <PlaneIcon />
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink-faint">Apex</span>
          </div>

          {/* main: ticket details + CTA */}
          <div className="absolute inset-y-0 flex flex-col justify-center gap-1 py-3 pr-5" style={{ left: NOTCH_X + 14, right: 0 }}>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink-faint">Boarding Pass</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-brand-text">Open</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display text-sm font-bold text-ink">HOME</span>
              <span className="text-ink-faint">✈</span>
              <span className="font-display text-sm font-bold text-ink">ABROAD</span>
            </div>
            <p className="text-[11px] leading-snug text-ink-soft">Book a free consultation</p>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-text">
              Explore countries
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function PlaneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 15v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0V8l-8 5v2l8-2.5V17l-2.5 1.5V20l4-1 4 1v-1.5L13 17v-4.5l8 2.5Z" />
    </svg>
  );
}
