// A genuine passport/customs-stamp layout: a paper backing disc (so the ink
// always has guaranteed contrast no matter what photo sits behind it, same
// as a real stamp is pressed onto a page rather than floating in mid-air),
// concentric rings, curved text following the circle (top reads normally
// left-to-right; bottom path runs the opposite direction so its text reads
// normally too, rather than upside down), a big central country code, and a
// feTurbulence/feDisplacementMap filter so the ink looks stamped rather than
// vector-perfect. One template, reused for every destination — only the
// code and rotation change.
export default function PassportStamp({
  code,
  rotate = -8,
  className = "",
}: {
  code: string;
  rotate?: number;
  className?: string;
}) {
  const filterId = `stamp-ink-${code.replace(/\s+/g, "-")}`;
  const topPathId = `stamp-top-${code.replace(/\s+/g, "-")}`;
  const bottomPathId = `stamp-bottom-${code.replace(/\s+/g, "-")}`;
  // Codes range from "UK" to "AUSTRALIA" — scale the center text down rather
  // than requiring every long country name to be manually abbreviated.
  const codeFontSize = code.length <= 4 ? 32 : code.length <= 6 ? 25 : code.length <= 9 ? 18 : 14;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, filter: "drop-shadow(0 8px 18px rgba(20,24,26,0.4)) drop-shadow(0 2px 5px rgba(20,24,26,0.3))" }}
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.045" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <path id={topPathId} d="M 24,100 A 76,76 0 0 1 176,100" fill="none" />
        <path id={bottomPathId} d="M 176,108 A 76,76 0 0 0 24,108" fill="none" />
      </defs>

      {/* paper backing: a stamp is always pressed onto a page, so this
          guarantees the ink reads clearly regardless of what photo sits
          behind the component in the layout. */}
      <circle cx="100" cy="100" r="96" style={{ fill: "var(--color-paper)" }} />
      <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(20,24,26,0.08)" strokeWidth="1" />

      {/* faint offset double-impression, as if the stamp landed slightly
          shaky — a small authenticity detail real stamps often have. */}
      <g
        className="fill-none stroke-brand-deep"
        style={{ filter: `url(#${filterId})`, opacity: 0.18, transform: "translate(2.5px, -1.5px)" }}
      >
        <circle cx="100" cy="100" r="88" strokeWidth="4.5" />
      </g>

      <g
        className="fill-none stroke-brand-deep text-brand-deep"
        style={{ filter: `url(#${filterId})`, opacity: 0.9 }}
      >
        <circle cx="100" cy="100" r="88" strokeWidth="4.5" />
        <circle cx="100" cy="100" r="74" strokeWidth="1.5" />

        <text className="fill-brand-deep" style={{ fontSize: "13.5px", fontWeight: 700, letterSpacing: "2.5px" }}>
          <textPath href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
            STUDY ABROAD
          </textPath>
        </text>
        <text className="fill-brand-deep" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px" }}>
          <textPath href={`#${bottomPathId}`} startOffset="50%" textAnchor="middle">
            ★ APEX CONSULTING ★
          </textPath>
        </text>

        <text
          x="100"
          y="106"
          textAnchor="middle"
          className="fill-brand-deep"
          style={{ fontSize: `${codeFontSize}px`, fontWeight: 800, fontFamily: "var(--font-display)" }}
        >
          {code}
        </text>
        <line x1="55" y1="116" x2="145" y2="116" strokeWidth="2" />
        <text
          x="100"
          y="130"
          textAnchor="middle"
          className="fill-brand-deep"
          style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px" }}
        >
          EST. 2009
        </text>
      </g>
    </svg>
  );
}
