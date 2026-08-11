// A hand-built suitcase, not a clipart icon: a front face and a darker
// side panel (the same two-plane trick as a CSS box's light/dark faces)
// give it real dimensionality, plus a hanging luggage tag that echoes the
// passport-stamp/boarding-pass motifs used elsewhere on the site.
export default function LuggageIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="luggage-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22a35a" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="luggage-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f4a29" />
          <stop offset="100%" stopColor="#0a3a20" />
        </linearGradient>
        <linearGradient id="luggage-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f9e5c" />
          <stop offset="100%" stopColor="#1b7a45" />
        </linearGradient>
        <filter id="luggage-shadow" x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0a0d0e" floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter="url(#luggage-shadow)">
        {/* handle */}
        <path
          d="M84,46 L84,28 A16,16 0 0 1 100,12 L120,12 A16,16 0 0 1 136,28 L136,46"
          fill="none"
          stroke="#5b4636"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* side panel (depth) */}
        <path d="M150,58 L172,72 L172,178 L150,190 Z" fill="url(#luggage-side)" />
        {/* top panel (depth) */}
        <path d="M40,58 L150,58 L172,72 L62,72 Z" fill="url(#luggage-top)" />

        {/* front face */}
        <rect x="40" y="58" width="110" height="132" rx="12" fill="url(#luggage-front)" />
        <rect x="40" y="58" width="110" height="132" rx="12" fill="none" stroke="#0a3a20" strokeOpacity="0.4" strokeWidth="1.5" />

        {/* horizontal ridge details, like a hard-shell case */}
        <line x1="40" y1="94" x2="150" y2="94" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="2" />
        <line x1="40" y1="120" x2="150" y2="120" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="2" />
        <line x1="40" y1="146" x2="150" y2="146" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="2" />

        {/* front latch */}
        <rect x="85" y="108" width="20" height="14" rx="3" fill="#e8c874" />
        <circle cx="95" cy="115" r="2.4" fill="#0a3a20" />

        {/* wheels */}
        <circle cx="58" cy="196" r="7" fill="#1a1f21" />
        <circle cx="132" cy="196" r="7" fill="#1a1f21" />

        {/* hanging luggage tag, echoing the boarding-pass/passport motif */}
        <g transform="translate(158,96) rotate(14)">
          <line x1="8" y1="0" x2="8" y2="-14" stroke="#c9cfd1" strokeWidth="2" />
          <rect x="-8" y="0" width="34" height="22" rx="4" fill="var(--color-paper)" stroke="#0a3a20" strokeOpacity="0.25" />
          <circle cx="0" cy="11" r="2.2" fill="none" stroke="#0a3a20" strokeOpacity="0.4" strokeWidth="1.4" />
          <line x1="7" y1="7" x2="19" y2="7" stroke="#0a3a20" strokeOpacity="0.35" strokeWidth="1.6" />
          <line x1="7" y1="14" x2="15" y2="14" stroke="#0a3a20" strokeOpacity="0.35" strokeWidth="1.6" />
        </g>
      </g>
    </svg>
  );
}
