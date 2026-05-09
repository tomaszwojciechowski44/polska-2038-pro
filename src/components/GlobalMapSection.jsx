import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Globe, MapPin, TrendingUp } from "lucide-react";
import { getVoivodeships } from "../api/client";

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

const POLAND_PATH = [
  "M 30,97",
  "C 34,85 65,62 92,50",
  "C 118,38 155,28 188,20",
  "L 218,14",
  "C 235,8 258,9 280,14",
  "L 315,18",
  "L 388,14",
  "L 438,48",
  "L 452,84",
  "L 454,168",
  "L 460,226",
  "L 436,268",
  "L 456,338",
  "L 422,363",
  "L 392,398",
  "L 328,414",
  "L 254,414",
  "L 208,390",
  "L 157,360",
  "L 89,330",
  "L 70,310",
  "L 55,232",
  "L 40,152",
  "L 28,118",
  "Z",
].join(" ");

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

const MAP_L = 28, MAP_T = 10, MAP_W = 432, MAP_H = 405;

function voivSVG(v) {
  return { cx: MAP_L + v.x * MAP_W, cy: MAP_T + v.y * MAP_H };
}

/** Skala jak w raportach danych (bez neonów). */
function tierColor(talents) {
  if (talents > 500) return "#059669";
  if (talents > 300) return "#0284c7";
  return "#d97706";
}

function dotRadius(talents) {
  return 5 + talents / 260;
}

function PolandSVGMap({ selectedVoiv, onSelect, voivodeships }) {
  return (
    <svg
      viewBox="0 0 500 430"
      className="w-full h-full"
      style={{ display: "block" }}
      aria-label="Mapa Polski — liczba talentów w województwach (pilotaż)"
    >
      <defs>
        <filter id="mapDotShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect x="0" y="0" width="500" height="430" fill="#f8fafc" />

      {GEO_LINES.meridians.map((m) => (
        <g key={`m${m.lon}`}>
          <line
            x1={m.x} y1={0} x2={m.x} y2={430}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <text
            x={m.x}
            y={422}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="9"
            fontFamily='system-ui, "Segoe UI", sans-serif'
          >
            {m.label}
          </text>
        </g>
      ))}
      {GEO_LINES.parallels.map((p) => (
        <g key={`p${p.lat}`}>
          <line
            x1={0} y1={p.y} x2={500} y2={p.y}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <text
            x={8}
            y={p.y + 4}
            fill="#94a3b8"
            fontSize="9"
            fontFamily='system-ui, "Segoe UI", sans-serif'
          >
            {p.label}
          </text>
        </g>
      ))}

      <path d={POLAND_PATH} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.25" />
      <path d={POLAND_PATH} fill="none" stroke="#64748b" strokeWidth="1" vectorEffect="non-scaling-stroke" />

      {voivodeships.map((v, i) => {
        const { cx, cy } = voivSVG(v);
        const isSelected = selectedVoiv === i;
        const fill = tierColor(v.talents);
        const r = dotRadius(v.talents);

        return (
          <g
            key={v.name}
            onClick={() => onSelect(i === selectedVoiv ? null : i)}
            style={{ cursor: "pointer" }}
          >
            {isSelected && (
              <circle cx={cx} cy={cy} r={r + 7} fill="none" stroke="#1d4ed8" strokeWidth="2" opacity="0.85" />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={fill}
              stroke="#ffffff"
              strokeWidth="2"
              filter="url(#mapDotShadow)"
              opacity={isSelected ? 1 : 0.92}
            />
            {isSelected && (
              <g style={{ pointerEvents: "none" }}>
                <rect
                  x={cx - 88}
                  y={cy - r - 40}
                  width="176"
                  height="34"
                  rx="6"
                  fill="#ffffff"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={cy - r - 26}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily='system-ui, "Segoe UI", sans-serif'
                >
                  {v.name}
                </text>
                <text
                  x={cx}
                  y={cy - r - 12}
                  textAnchor="middle"
                  fill="#1d4ed8"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily='system-ui, "Segoe UI", sans-serif'
                >
                  {v.talents.toLocaleString("pl-PL")} talentów
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

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
          clubs: Math.max(1, Math.round((v.talent_count || 0) / 7)),
        }));
        if (apiData.length > 0) setVOIVODESHIPS(apiData);
      })
      .catch(() => {});
  }, []);

  const v = VOIVODESHIPS[selectedVoiv] ?? VOIVODESHIPS[0];
  const totalTalents = VOIVODESHIPS.reduce((s, x) => s + x.talents, 0);
  const top5 = [...VOIVODESHIPS].sort((a, b) => b.talents - a.talents).slice(0, 5);

  return (
    <section id="mapa" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium tracking-wide">
            <Globe size={16} className="text-slate-500" strokeWidth={1.75} />
            TalentRadar — Polska
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-display">
            {totalTalents.toLocaleString("pl-PL")}{" "}
            <span className="text-emerald-400/95 font-semibold">talentów w pilotażu</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Interaktywna mapa zasięgu danych — faza pilotażowa Q2 2026.
            Docelowo system obejmie{" "}
            <span className="text-slate-200 font-medium">5&nbsp;000&nbsp;000</span> profili zawodników.
            Wybierz województwo, aby zobaczyć szczegóły.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-600/50 bg-slate-900/40 px-4 py-2 text-slate-400 text-xs sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500/90" aria-hidden />
            Dane demonstracyjne pilotażu · aktualizacja ciągła
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/10 bg-white shadow-xl shadow-slate-950/25 ring-1 ring-white/10"
              style={{ minHeight: "320px", height: "clamp(320px, 48vw, 480px)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-4 sm:px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600">
                    <MapPin size={16} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-slate-900 font-semibold text-sm">Rozkład regionalny</div>
                    <div className="text-slate-500 text-xs">Polska — 16 województw</div>
                  </div>
                </div>
                <span className="text-slate-500 text-xs font-medium">Kliknij punkt na mapie</span>
              </div>

              <div className="flex-1 min-h-0 bg-white p-3 sm:p-4">
                <PolandSVGMap selectedVoiv={selectedVoiv} onSelect={setSelectedVoiv} voivodeships={VOIVODESHIPS} />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/90 px-4 sm:px-5 py-3">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {[
                    { color: "#059669", label: "500+ talentów" },
                    { color: "#0284c7", label: "300–500" },
                    { color: "#d97706", label: "< 300" },
                  ].map((lg) => (
                    <div key={lg.label} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: lg.color }}
                      />
                      <span className="text-xs text-slate-600">{lg.label}</span>
                    </div>
                  ))}
                </div>
                <span className="text-xs text-slate-400 tabular-nums">
                  {VOIVODESHIPS.length} jednostek · Q2 2026
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-slate-200/10 bg-white p-5 sm:p-6 shadow-lg shadow-slate-950/20 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <MapPin size={14} className="text-slate-400" />
                Wybrane województwo
              </div>
              <h3 className="mt-2 text-xl font-bold text-slate-900 tracking-tight">{v.name}</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { l: "Talentów", val: v.talents, accent: "text-emerald-700" },
                  { l: "Węzłów LiDAR", val: Math.round(v.clubs / 3), accent: "text-sky-700" },
                  { l: "AI Score śr.", val: "78.4", accent: "text-amber-700" },
                  { l: "Klubów", val: v.clubs, accent: "text-slate-700" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3 text-center"
                  >
                    <div className={`text-lg font-bold tabular-nums ${s.accent}`}>
                      {typeof s.val === "number" ? s.val.toLocaleString("pl-PL") : s.val}
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1 font-medium">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/10 bg-white p-4 sm:p-5 shadow-lg shadow-slate-950/20 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">
                <TrendingUp size={14} className="text-slate-400" />
                Top 5 województw
              </div>
              <div className="space-y-2">
                {top5.map((vo, i) => {
                  const idx = VOIVODESHIPS.indexOf(vo);
                  const isActive = selectedVoiv === idx;
                  const pct = Math.round((vo.talents / top5[0].talents) * 100);
                  return (
                    <button
                      key={vo.name}
                      type="button"
                      onClick={() => setSelectedVoiv(idx)}
                      className={[
                        "w-full text-left rounded-xl px-3 py-2.5 transition-colors border",
                        isActive
                          ? "border-emerald-200 bg-emerald-50/80"
                          : "border-transparent hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={
                            isActive
                              ? "text-emerald-900 text-sm font-semibold"
                              : "text-slate-600 text-sm"
                          }
                        >
                          {i + 1}. {vo.name}
                        </span>
                        <span
                          className={
                            isActive
                              ? "text-emerald-800 font-bold text-sm tabular-nums"
                              : "text-slate-700 font-semibold text-sm tabular-nums"
                          }
                        >
                          {vo.talents.toLocaleString("pl-PL")}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: tierColor(vo.talents),
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
