import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Globe, MapPin, TrendingUp } from "lucide-react";
import { getVoivodeships } from "../api/client";

// ─── Static fallback data (used when API is unavailable) ──────────────────────
const VOIVODESHIPS_FALLBACK = [
  { name: "Mazowieckie",       x: 0.574, y: 0.382, talents: 842, clubs: 124 },
  { name: "Małopolskie",       x: 0.547, y: 0.718, talents: 634, clubs:  89 },
  { name: "Śląskie",           x: 0.452, y: 0.682, talents: 721, clubs: 105 },
  { name: "Wielkopolskie",     x: 0.340, y: 0.382, talents: 510, clubs:  78 },
  { name: "Dolnośląskie",      x: 0.218, y: 0.562, talents: 488, clubs:  71 },
  { name: "Łódzkie",           x: 0.480, y: 0.482, talents: 396, clubs:  62 },
  { name: "Lubelskie",         x: 0.697, y: 0.552, talents: 312, clubs:  49 },
  { name: "Podkarpackie",      x: 0.675, y: 0.758, talents: 298, clubs:  44 },
  { name: "Pomorskie",         x: 0.380, y: 0.120, talents: 445, clubs:  68 },
  { name: "Kujawsko-Pom.",     x: 0.400, y: 0.248, talents: 287, clubs:  43 },
  { name: "Zachodniopomor.",   x: 0.178, y: 0.148, talents: 231, clubs:  38 },
  { name: "Lubuskie",          x: 0.178, y: 0.382, talents: 178, clubs:  29 },
  { name: "Warmińsko-Maz.",    x: 0.618, y: 0.158, talents: 194, clubs:  32 },
  { name: "Podlaskie",         x: 0.750, y: 0.220, talents: 168, clubs:  27 },
  { name: "Świętokrzyskie",    x: 0.582, y: 0.600, talents: 201, clubs:  34 },
  { name: "Opolskie",          x: 0.340, y: 0.600, talents: 156, clubs:  25 },
];

// Poland SVG outline — simplified geographic polygon (clockwise from NW Oder mouth)
const POLAND_PATH = [
  "M 30,97",
  "C 34,85 65,62 92,50",   // Baltic NW coast
  "C 118,38 155,28 188,20", // Koszalin – Słupsk
  "L 218,14",               // Gdańsk Bay approach
  "C 235,8 258,9 280,14",   // Hel Peninsula / Gdańsk Bay
  "L 315,18",               // Vistula spit
  "L 388,14",               // Kaliningrad border start
  "L 438,48",               // Lithuania border
  "L 452,84",               // NE corner
  "L 454,168",              // Belarus border N
  "L 460,226",              // Belarus central
  "L 436,268",              // Brest / Włodawa area
  "L 456,338",              // Bug river S
  "L 422,363",              // Ukraine / Slovakia divide
  "L 392,398",              // SE Bieszczady
  "L 328,414",              // Slovakia border E
  "L 254,414",              // High Tatras / Orava
  "L 208,390",              // Czech–Slovakia divide
  "L 157,360",              // Jeseníky / Sudetes
  "L 89,330",               // Sudetes W
  "L 70,310",               // Neiße junction
  "L 55,232",               // Oder central
  "L 40,152",               // Frankfurt/Oder area
  "L 28,118",               // Oder near sea
  "Z",
].join(" ");

// Reference meridians & parallels (inside SVG coordinate system)
const GEO_LINES = {
  meridians: [
    { lon: 15, x: 70,  label: "15°E" },
    { lon: 17, x: 155, label: "17°E" },
    { lon: 19, x: 240, label: "19°E" },
    { lon: 21, x: 325, label: "21°E" },
    { lon: 23, x: 409, label: "23°E" },
  ],
  parallels: [
    { lat: 54, y:  66, label: "54°N" },
    { lat: 53, y: 136, label: "53°N" },
    { lat: 52, y: 205, label: "52°N" },
    { lat: 51, y: 275, label: "51°N" },
    { lat: 50, y: 345, label: "50°N" },
  ],
};

// Map voiv % ratios to SVG coordinates
const MAP_L = 28, MAP_T = 10, MAP_W = 432, MAP_H = 405;
function voivSVG(v) {
  return { cx: MAP_L + v.x * MAP_W, cy: MAP_T + v.y * MAP_H };
}
function dotColor(talents) {
  if (talents > 500) return "#00FF88";
  if (talents > 300) return "#00E5FF";
  return "#FFD700";
}
function dotRadius(talents) {
  return 4.5 + (talents / 220);
}

// ─── SVG Map component ────────────────────────────────────────────────────────
function PolandSVGMap({ selectedVoiv, onSelect, voivodeships }) {
  return (
    <svg
      viewBox="0 0 500 430"
      className="w-full h-full"
      style={{ display: "block" }}
      aria-label="Interaktywna mapa Polski — sieć węzłów LiDAR Polska2038"
    >
      <defs>
        {voivodeships.map((_, i) => (
          <filter key={i} id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
        <radialGradient id="mapBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#001a1a"  stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background radial glow */}
      <rect x="0" y="0" width="500" height="430" fill="url(#mapBg)" />

      {/* Geographic grid */}
      {GEO_LINES.meridians.map((m) => (
        <g key={`m${m.lon}`}>
          <line x1={m.x} y1={0} x2={m.x} y2={430}
            stroke="rgba(0,229,255,0.07)" strokeWidth="0.6" strokeDasharray="3,4" />
          <text x={m.x} y={422} textAnchor="middle" fill="rgba(0,229,255,0.3)"
            fontSize="7" fontFamily="JetBrains Mono, monospace">{m.label}</text>
        </g>
      ))}
      {GEO_LINES.parallels.map((p) => (
        <g key={`p${p.lat}`}>
          <line x1={0} y1={p.y} x2={500} y2={p.y}
            stroke="rgba(0,229,255,0.07)" strokeWidth="0.6" strokeDasharray="3,4" />
          <text x={4} y={p.y + 3} fill="rgba(0,229,255,0.3)"
            fontSize="7" fontFamily="JetBrains Mono, monospace">{p.label}</text>
        </g>
      ))}

      {/* Poland outline fill */}
      <path d={POLAND_PATH} fill="rgba(0,229,255,0.05)" />
      {/* Poland border — inner glow */}
      <path d={POLAND_PATH} fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="4" />
      {/* Poland border — sharp line */}
      <path d={POLAND_PATH} fill="none" stroke="rgba(0,229,255,0.55)" strokeWidth="1.2" />

      {/* Voivodeship dots */}
      {voivodeships.map((v, i) => {
        const { cx, cy } = voivSVG(v);
        const isSelected = selectedVoiv === i;
        const color = isSelected ? "#00FF88" : dotColor(v.talents);
        const r = dotRadius(v.talents);

        return (
          <g
            key={v.name}
            onClick={() => onSelect(i === selectedVoiv ? null : i)}
            style={{ cursor: "pointer" }}
          >
            {/* Outer pulse ring (animated via CSS) */}
            <circle cx={cx} cy={cy} r={r * 2.8} fill="none" stroke={color} strokeWidth="0.8" opacity="0.18">
              <animate attributeName="r"
                values={`${r * 2};${r * 4.5};${r * 2}`}
                dur={`${2.2 + i * 0.31}s`}
                repeatCount="indefinite" />
              <animate attributeName="opacity"
                values="0.25;0;0.25"
                dur={`${2.2 + i * 0.31}s`}
                repeatCount="indefinite" />
            </circle>

            {/* Inner glow halo */}
            <circle cx={cx} cy={cy} r={r * 1.8} fill={color} opacity="0.12"
              filter={`url(#glow${i})`} />

            {/* Main dot */}
            <circle cx={cx} cy={cy} r={r}
              fill={color}
              opacity={isSelected ? 1 : 0.88}
              stroke={isSelected ? "#ffffff" : color}
              strokeWidth={isSelected ? "1.2" : "0.5"}
            />

            {/* Selected voivodeship label */}
            {isSelected && (
              <>
                {/* White name label with backdrop */}
                <rect x={cx - 52} y={cy - r - 26} width={104} height={18}
                  fill="rgba(0,20,15,0.85)" rx="2" />
                <text x={cx} y={cy - r - 13}
                  textAnchor="middle" fill="#ffffff"
                  fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                  {v.name}
                </text>
                {/* Talent count */}
                <rect x={cx - 38} y={cy + r + 6} width={76} height={15}
                  fill="rgba(0,20,15,0.85)" rx="2" />
                <text x={cx} y={cy + r + 17}
                  textAnchor="middle" fill="#00FF88"
                  fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                  {v.talents} talentów
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function GlobalMapSection() {
  const [ref, inView] = useInView(0.08);
  const [selectedVoiv, setSelectedVoiv] = useState(0);
  const [VOIVODESHIPS, setVOIVODESHIPS] = useState(VOIVODESHIPS_FALLBACK);

  useEffect(() => {
    getVoivodeships()
      .then((res) => {
        const apiData = res.data.map((v) => ({
          name: v.name,
          x: v.x,
          y: v.y,
          talents: v.talent_count,
          clubs: Math.round(v.talent_count / 7),
        }));
        if (apiData.length > 0) setVOIVODESHIPS(apiData);
      })
      .catch(() => {
        // Silently use fallback data when API unavailable
      });
  }, []);

  const v = VOIVODESHIPS[selectedVoiv] ?? VOIVODESHIPS[0];
  const totalTalents = VOIVODESHIPS.reduce((s, x) => s + x.talents, 0);
  const top5 = [...VOIVODESHIPS].sort((a, b) => b.talents - a.talents).slice(0, 5);

  return (
    <section id="mapa" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm tracking-widest uppercase mb-3">
            <Globe size={14} />
            TalentRadar Live — Polska i Świat
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            {totalTalents.toLocaleString("pl-PL")} Talentów{" "}
            <span className="text-brand-cyan text-glow-cyan">w pilotażu.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Interaktywna mapa sieci węzłów LiDAR — dane pilotażowe Q2 2026.
            Docelowa skala: <span className="text-white font-semibold">5 000 000 zawodników</span>.
            Kliknij województwo, aby zobaczyć szczegóły.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan/80 text-xs font-mono rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            DANE PILOTAŻOWE — faza Q2 2026 — docelowa skala: 5 000 000 zawodników
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Map panel ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div
              className="relative border border-brand-cyan/25 bg-[#030d0f] rounded-sm overflow-hidden flex flex-col"
              style={{ minHeight: "320px", height: "clamp(320px, 50vw, 500px)" }}
            >
              {/* Map header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-brand-cyan/15 bg-brand-cyan/5 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-brand-cyan" />
                  <span className="text-brand-cyan font-mono text-[10px] uppercase tracking-widest">
                    TalentRadar — Polska — Live
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[9px] font-mono">Kliknij województwo</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                    <span className="text-brand-neon font-mono text-[10px]">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Map SVG fills remaining space */}
              <div className="flex-1 min-h-0 p-2">
                <PolandSVGMap selectedVoiv={selectedVoiv} onSelect={setSelectedVoiv} voivodeships={VOIVODESHIPS} />
              </div>

              {/* Legend bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-brand-cyan/15 bg-brand-dark/60 flex-shrink-0">
                <div className="flex items-center gap-5">
                  {[
                    { color: "#00FF88", label: "500+ talentów" },
                    { color: "#00E5FF", label: "300–500" },
                    { color: "#FFD700", label: "<300" },
                  ].map((lg) => (
                    <div key={lg.label} className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: lg.color, boxShadow: `0 0 5px ${lg.color}` }}
                      />
                      <span className="text-[10px] font-mono text-gray-400">{lg.label}</span>
                    </div>
                  ))}
                </div>
                <span className="text-gray-600 text-[9px] font-mono">
                  {VOIVODESHIPS.length} województw · pilotaż Q2 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right panel ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Selected voivodeship card */}
            <div className="p-5 border border-brand-cyan/35 bg-brand-cyan/5 rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={11} className="text-brand-cyan" />
                <span className="text-brand-cyan text-[10px] font-mono uppercase tracking-widest">
                  Wybrane województwo
                </span>
              </div>
              <div className="text-white font-display font-bold text-xl mb-4">{v.name}</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Talentów",       val: v.talents, c: "text-brand-neon" },
                  { l: "Węzłów LiDAR",  val: Math.round(v.clubs / 3), c: "text-brand-cyan" },
                  { l: "AI Score śr.",  val: "78.4", c: "text-brand-gold" },
                  { l: "Klubów",        val: v.clubs, c: "text-gray-300" },
                ].map((s) => (
                  <div key={s.l}
                    className="p-3 border border-brand-border bg-brand-dark/50 text-center rounded-sm">
                    <div className={`font-mono font-bold text-sm ${s.c}`}>
                      {typeof s.val === "number" ? s.val.toLocaleString("pl-PL") : s.val}
                    </div>
                    <div className="text-gray-500 text-[10px] font-mono mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 5 voivodeships */}
            <div className="p-4 border border-brand-border bg-brand-card rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={11} className="text-brand-gold" />
                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                  Top 5 województw
                </span>
              </div>
              <div className="space-y-1">
                {top5.map((vo, i) => {
                  const idx = VOIVODESHIPS.indexOf(vo);
                  const isActive = selectedVoiv === idx;
                  const pct = Math.round((vo.talents / top5[0].talents) * 100);
                  return (
                    <button
                      key={vo.name}
                      onClick={() => setSelectedVoiv(idx)}
                      className={[
                        "w-full text-left px-3 py-2 transition-all rounded-sm",
                        isActive ? "bg-brand-neon/10" : "hover:bg-white/5",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[11px] font-mono ${isActive ? "text-brand-neon font-bold" : "text-gray-400"}`}>
                          {i + 1}. {vo.name}
                        </span>
                        <span className={`text-[11px] font-mono font-bold ${isActive ? "text-brand-neon" : "text-gray-300"}`}>
                          {vo.talents}
                        </span>
                      </div>
                      <div className="h-0.5 bg-brand-dark/60 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: dotColor(vo.talents),
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
