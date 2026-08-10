// Original flat-illustration "postcard" skylines, one per featured
// destination — two or three recognizable landmarks per country, drawn as
// simple geometric silhouettes in the site's own palette. Inspired by the
// idea of illustrated destination cards (a common pattern in this industry)
// but composed from scratch: our own shapes, our own color story, no traced
// or copied artwork.

const SKY_TOP = "#0f3d24";
const SKY_BOTTOM = "#1f8a4c";
const INK = "#f7fbf8";
const GROUND = "rgba(247,251,248,0.16)";

function Birds() {
  return (
    <g stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none">
      <path d="M60 46q6 -8 12 0q6 -8 12 0" />
      <path d="M320 30q5 -7 10 0q5 -7 10 0" />
      <path d="M270 60q4 -6 8 0q4 -6 8 0" />
    </g>
  );
}

function Ground() {
  return <rect x="0" y="196" width="400" height="44" fill={GROUND} />;
}

function Scene({ slug, children }: { slug: string; children: React.ReactNode }) {
  const gid = `sky-${slug}`;
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY_TOP} />
          <stop offset="100%" stopColor={SKY_BOTTOM} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="240" fill={`url(#${gid})`} />
      <Birds />
      <Ground />
      <g fill={INK}>{children}</g>
    </svg>
  );
}

const SCENES: Record<string, React.ReactNode> = {
  "study-in-uk": (
    <Scene slug="uk">
      {/* Big Ben */}
      <rect x="52" y="80" width="26" height="118" />
      <polygon points="52,80 78,80 65,58" />
      <circle cx="65" cy="96" r="7" fill={SKY_TOP} />
      {/* Tower Bridge */}
      <rect x="170" y="110" width="14" height="88" />
      <rect x="236" y="110" width="14" height="88" />
      <rect x="170" y="104" width="80" height="10" />
      <path d="M184 150 L236 150" stroke={INK} strokeWidth="2" strokeDasharray="3 5" />
      {/* London Eye */}
      <circle cx="330" cy="146" r="42" fill="none" stroke={INK} strokeWidth="4" />
      <path d="M330 104 L330 188 M288 146 L372 146 M300 116 L360 176 M300 176 L360 116" stroke={INK} strokeWidth="1.5" opacity="0.6" />
      <rect x="326" y="186" width="8" height="12" />
    </Scene>
  ),
  "study-in-usa": (
    <Scene slug="usa">
      {/* skyscraper cluster */}
      <rect x="40" y="120" width="24" height="78" />
      <rect x="68" y="90" width="24" height="108" />
      <rect x="96" y="140" width="22" height="58" />
      {/* Statue of Liberty */}
      <rect x="195" y="180" width="22" height="18" />
      <polygon points="184,180 228,180 206,110" />
      <rect x="222" y="86" width="8" height="30" />
      <polygon points="222,84 234,84 228,72" />
      <circle cx="206" cy="96" r="10" />
      {/* arch bridge */}
      <path d="M280 198 L280 150 Q320 110 360 150 L360 198" fill="none" stroke={INK} strokeWidth="6" />
    </Scene>
  ),
  "study-in-canada": (
    <Scene slug="canada">
      {/* mountains */}
      <polygon points="30,198 80,120 130,198" opacity="0.75" />
      <polygon points="90,198 140,140 190,198" opacity="0.55" />
      {/* CN Tower */}
      <rect x="238" y="176" width="8" height="22" />
      <polygon points="234,176 250,176 242,138 236,90 248,90 242,50" />
      <ellipse cx="242" cy="120" rx="20" ry="9" />
      {/* Peace Tower */}
      <rect x="300" y="120" width="20" height="78" />
      <polygon points="300,120 320,120 310,96" />
      <rect x="306" y="132" width="8" height="8" fill={SKY_TOP} />
    </Scene>
  ),
  "study-in-australia": (
    <Scene slug="australia">
      {/* Uluru */}
      <ellipse cx="80" cy="196" rx="60" ry="16" opacity="0.5" />
      <path d="M30 198 Q60 140 100 150 Q130 158 150 198 Z" opacity="0.75" />
      {/* Opera House */}
      <path d="M220 198 L220 165 Q235 140 250 165 L250 198 Z" />
      <path d="M245 198 L245 158 Q262 128 279 158 L279 198 Z" />
      <path d="M274 198 L274 168 Q286 148 298 168 L298 198 Z" />
      {/* Harbour Bridge */}
      <path d="M300 198 L300 160 Q340 120 380 160 L380 198" fill="none" stroke={INK} strokeWidth="6" />
    </Scene>
  ),
  "study-in-new-zealand": (
    <Scene slug="new-zealand">
      {/* Southern Alps */}
      <polygon points="20,198 70,110 110,160 140,120 175,198" opacity="0.7" />
      <path d="M55 140 L70 110 L85 140 Z" fill={SKY_TOP} opacity="0.6" />
      {/* Sky Tower */}
      <rect x="255" y="182" width="10" height="16" />
      <polygon points="250,182 270,182 264,80 256,80" />
      <ellipse cx="260" cy="108" rx="16" ry="8" />
      <rect x="257" y="60" width="6" height="20" />
      {/* simple bridge */}
      <path d="M300 198 Q330 170 360 198" fill="none" stroke={INK} strokeWidth="5" />
    </Scene>
  ),
  "study-in-china": (
    <Scene slug="china">
      {/* Great Wall */}
      <path d="M20 198 L20 170 L35 170 L35 158 L50 158 L50 170 L65 170 L65 158 L80 158 L80 170 L95 170 L95 198 Z" opacity="0.8" />
      <rect x="55" y="120" width="20" height="40" />
      <polygon points="52,120 78,120 65,100" />
      {/* pagoda */}
      <rect x="220" y="176" width="16" height="22" />
      <polygon points="204,176 252,176 228,158" />
      <polygon points="210,156 246,156 228,140" />
      <polygon points="215,138 241,138 228,124" />
      <rect x="225" y="108" width="6" height="18" />
      {/* mountains */}
      <polygon points="270,198 320,130 370,198" opacity="0.5" />
    </Scene>
  ),
  "study-in-ireland": (
    <Scene slug="ireland">
      {/* cliffs */}
      <path d="M20 198 L20 160 L45 170 L60 140 L85 165 L100 198 Z" opacity="0.7" />
      {/* round tower */}
      <rect x="200" y="120" width="24" height="78" rx="2" />
      <polygon points="198,120 226,120 212,96" />
      <rect x="208" y="140" width="8" height="12" fill={SKY_TOP} />
      {/* small castle */}
      <rect x="270" y="150" width="60" height="48" />
      <rect x="270" y="138" width="10" height="14" />
      <rect x="292" y="132" width="10" height="20" />
      <rect x="320" y="138" width="10" height="14" />
    </Scene>
  ),
  "study-in-italy": (
    <Scene slug="italy">
      {/* Colosseum */}
      <path d="M40 198 L40 160 Q100 130 160 160 L160 198 Z" />
      <g fill={SKY_TOP} opacity="0.7">
        <rect x="55" y="168" width="10" height="22" />
        <rect x="75" y="162" width="10" height="28" />
        <rect x="95" y="160" width="10" height="30" />
        <rect x="115" y="162" width="10" height="28" />
        <rect x="135" y="168" width="10" height="22" />
      </g>
      {/* Leaning Tower of Pisa */}
      <g transform="translate(255,140) rotate(6)">
        <rect x="-14" y="0" width="28" height="60" />
        <ellipse cx="0" cy="0" rx="16" ry="6" />
      </g>
      {/* dome */}
      <path d="M320 198 L320 176 Q340 148 360 176 L360 198 Z" />
      <rect x="336" y="130" width="8" height="18" />
    </Scene>
  ),
  "study-in-germany": (
    <Scene slug="germany">
      {/* Brandenburg Gate */}
      <rect x="40" y="150" width="8" height="48" />
      <rect x="60" y="150" width="8" height="48" />
      <rect x="80" y="150" width="8" height="48" />
      <rect x="100" y="150" width="8" height="48" />
      <rect x="120" y="150" width="8" height="48" />
      <rect x="34" y="138" width="100" height="12" />
      <rect x="50" y="120" width="68" height="10" opacity="0.8" />
      {/* TV Tower */}
      <rect x="252" y="176" width="6" height="22" />
      <rect x="248" y="60" width="14" height="60" opacity="0.9" />
      <circle cx="255" cy="66" r="14" />
      <rect x="252" y="40" width="6" height="20" />
      {/* castle turret */}
      <rect x="310" y="140" width="30" height="58" />
      <polygon points="310,140 340,140 325,110" />
    </Scene>
  ),
  "study-in-france": (
    <Scene slug="france">
      {/* Eiffel Tower */}
      <path d="M140 198 L118 198 L150 100 L128 100 L150 40 L172 100 L150 100 L182 198 L160 198 L150 130 Z" />
      <rect x="140" y="110" width="20" height="8" opacity="0.85" />
      {/* Arc de Triomphe */}
      <path d="M220 198 L220 130 Q240 108 260 130 L260 198 Z" fill="none" stroke={INK} strokeWidth="7" />
      {/* Louvre pyramid */}
      <polygon points="300,198 330,150 360,198" />
      <path d="M300 198 L360 198" stroke={SKY_TOP} strokeWidth="2" />
    </Scene>
  ),
  "study-in-uae": (
    <Scene slug="uae">
      {/* Burj Khalifa */}
      <polygon points="255,198 265,198 262,90 258,50 255,90" />
      <polygon points="256,50 264,50 260,20" />
      {/* Burj Al Arab sail */}
      <path d="M180 198 L180 120 Q210 70 210 198 Z" opacity="0.9" />
      {/* palm tree */}
      <rect x="90" y="170" width="6" height="28" />
      <path d="M93 170 Q70 160 60 172 M93 170 Q75 150 65 156 M93 170 Q110 156 122 164 M93 170 Q116 150 128 152" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* low skyline */}
      <rect x="300" y="160" width="16" height="38" opacity="0.6" />
      <rect x="320" y="150" width="16" height="48" opacity="0.6" />
      <rect x="340" y="168" width="16" height="30" opacity="0.6" />
    </Scene>
  ),
  "study-in-spain": (
    <Scene slug="spain">
      {/* Sagrada Familia spire cluster */}
      <polygon points="90,198 100,198 96,120" />
      <polygon points="70,198 80,198 75,140" />
      <polygon points="108,198 118,198 113,140" />
      <circle cx="96" cy="126" r="5" />
      {/* horseshoe arch (Alhambra nod) */}
      <path d="M230 198 L230 150 Q230 118 260 118 Q290 118 290 150 L290 198" fill="none" stroke={INK} strokeWidth="6" />
      {/* sun motif */}
      <circle cx="340" cy="70" r="16" opacity="0.85" />
      <g stroke={INK} strokeWidth="2" opacity="0.6">
        <path d="M340 44 L340 34 M340 106 L340 96 M314 70 L304 70 M376 70 L366 70" />
      </g>
    </Scene>
  ),
  "study-in-netherlands": (
    <Scene slug="netherlands">
      {/* windmill */}
      <rect x="70" y="150" width="20" height="48" />
      <polygon points="70,150 90,150 80,120" />
      <g stroke={INK} strokeWidth="4" strokeLinecap="round">
        <path d="M80 132 L50 108 M80 132 L110 112 M80 132 L104 158 M80 132 L54 156" />
      </g>
      {/* canal houses */}
      <rect x="210" y="150" width="34" height="48" />
      <polygon points="210,150 244,150 227,128" />
      <rect x="248" y="140" width="34" height="58" />
      <polygon points="248,140 282,140 265,118" />
      <rect x="286" y="156" width="34" height="42" />
      <polygon points="286,156 320,156 303,136" />
    </Scene>
  ),
  "study-in-finland": (
    <Scene slug="finland">
      {/* Helsinki Cathedral */}
      <rect x="200" y="150" width="60" height="48" />
      <rect x="210" y="120" width="8" height="30" />
      <rect x="242" y="120" width="8" height="30" />
      <circle cx="230" cy="112" r="16" />
      <rect x="226" y="90" width="8" height="14" />
      {/* pine trees */}
      <polygon points="70,198 85,150 100,198" opacity="0.8" />
      <polygon points="95,198 112,140 129,198" opacity="0.9" />
      <polygon points="40,198 55,160 70,198" opacity="0.7" />
      {/* lighthouse */}
      <rect x="330" y="140" width="14" height="58" />
      <polygon points="330,140 344,140 337,120" />
    </Scene>
  ),
  "study-in-sweden": (
    <Scene slug="sweden">
      {/* City Hall tower with three crowns */}
      <rect x="230" y="140" width="24" height="58" />
      <rect x="236" y="110" width="12" height="30" />
      <circle cx="242" cy="102" r="8" />
      {/* pine trees */}
      <polygon points="60,198 78,145 96,198" opacity="0.85" />
      <polygon points="90,198 108,155 126,198" opacity="0.7" />
      {/* ship hull */}
      <path d="M300 198 L380 198 L364 178 L316 178 Z" />
      <rect x="336" y="140" width="6" height="38" />
      <path d="M342 144 L366 158 L342 168 Z" opacity="0.85" />
    </Scene>
  ),
  "study-in-malaysia": (
    <Scene slug="malaysia">
      {/* Petronas Towers */}
      <rect x="150" y="120" width="20" height="78" />
      <polygon points="150,120 170,120 160,96" />
      <rect x="156" y="80" width="8" height="18" />
      <rect x="182" y="130" width="20" height="68" />
      <polygon points="182,130 202,130 192,106" />
      <rect x="188" y="90" width="8" height="18" />
      <path d="M170 150 L182 150" stroke={INK} strokeWidth="3" />
      {/* KL Tower */}
      <rect x="270" y="180" width="6" height="18" />
      <rect x="266" y="90" width="14" height="90" opacity="0.85" />
      <ellipse cx="273" cy="98" rx="14" ry="7" />
    </Scene>
  ),
  "study-in-south-korea": (
    <Scene slug="south-korea">
      {/* mountain hill */}
      <polygon points="220,198 270,140 320,198" opacity="0.55" />
      {/* N Seoul Tower */}
      <rect x="262" y="168" width="8" height="30" />
      <rect x="258" y="120" width="16" height="50" />
      <ellipse cx="266" cy="118" rx="12" ry="7" />
      <rect x="263" y="98" width="6" height="22" />
      {/* palace gate */}
      <rect x="60" y="160" width="90" height="38" />
      <polygon points="52,160 158,160 105,132" />
      <rect x="95" y="168" width="20" height="30" fill={SKY_TOP} />
    </Scene>
  ),
  "study-in-north-cyprus": (
    <Scene slug="north-cyprus">
      {/* Kyrenia harbour castle */}
      <rect x="60" y="150" width="100" height="48" />
      <rect x="60" y="136" width="14" height="16" />
      <rect x="92" y="130" width="14" height="22" />
      <rect x="146" y="136" width="14" height="16" />
      {/* minaret */}
      <rect x="260" y="150" width="8" height="48" />
      <polygon points="256,150 272,150 264,132" />
      <ellipse cx="264" cy="132" rx="7" ry="4" />
      {/* waves */}
      <path d="M190 198 Q200 190 210 198 Q220 190 230 198" stroke={INK} strokeWidth="2" fill="none" opacity="0.6" />
    </Scene>
  ),
  "study-in-south-cyprus": (
    <Scene slug="south-cyprus">
      {/* ancient ruin columns */}
      <rect x="70" y="140" width="12" height="58" />
      <rect x="66" y="134" width="20" height="8" />
      <rect x="100" y="130" width="12" height="68" />
      <rect x="96" y="124" width="20" height="8" />
      <rect x="130" y="146" width="12" height="52" />
      <rect x="126" y="140" width="20" height="8" />
      <path d="M76 198 L106 198 L136 198" stroke={INK} strokeWidth="2" opacity="0.5" />
      {/* lighthouse */}
      <rect x="290" y="140" width="14" height="58" />
      <polygon points="290,140 304,140 297,120" />
      {/* waves */}
      <path d="M210 198 Q222 188 234 198 Q246 188 258 198" stroke={INK} strokeWidth="2" fill="none" opacity="0.6" />
    </Scene>
  ),
};

export default function DestinationSkyline({ slug }: { slug: string }) {
  return SCENES[slug] ?? null;
}
