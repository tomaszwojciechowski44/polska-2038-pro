import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { MapPin, Users, Zap, TrendingUp } from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────
// Numbers represent Year-1 nationwide rollout projection
const VDATA = [
  { id: 'zachodniopomorskie', name: 'Zachodniopomorskie', short: 'ZP', x: 11, y: 17, talents:  4821, nodes:  38, top: 'Tomasz W., 15',    score: 91 },
  { id: 'pomorskie',          name: 'Pomorskie',          short: 'PM', x: 33, y: 10, talents:  7340, nodes:  54, top: 'Kacper L., 13',    score: 95 },
  { id: 'warminsko',          name: 'Warmińsko-Mazurskie',short: 'WM', x: 60, y: 16, talents:  3912, nodes:  31, top: 'Marek B., 14',     score: 88 },
  { id: 'podlaskie',          name: 'Podlaskie',          short: 'PD', x: 79, y: 27, talents:  2841, nodes:  22, top: 'Paweł S., 12',     score: 86 },
  { id: 'lubuskie',           name: 'Lubuskie',           short: 'LB', x:  7, y: 46, talents:  2108, nodes:  17, top: 'Adam K., 16',      score: 84 },
  { id: 'kujawsko',           name: 'Kujawsko-Pomorskie', short: 'KP', x: 33, y: 32, talents:  5614, nodes:  44, top: 'Jan M., 13',       score: 92 },
  { id: 'mazowieckie',        name: 'Mazowieckie',        short: 'MZ', x: 63, y: 42, talents: 14820, nodes: 112, top: 'Piotr R., 14',    score: 97 },
  { id: 'lubelskie',          name: 'Lubelskie',          short: 'LU', x: 78, y: 57, talents:  6230, nodes:  49, top: 'Radek O., 15',     score: 90 },
  { id: 'dolnoslaskie',       name: 'Dolnośląskie',       short: 'DS', x: 14, y: 63, talents:  8910, nodes:  68, top: 'Szymon J., 12',   score: 94 },
  { id: 'wielkopolskie',      name: 'Wielkopolskie',      short: 'WP', x: 27, y: 50, talents: 10240, nodes:  79, top: 'Michał T., 14',   score: 96 },
  { id: 'lodzkie',            name: 'Łódzkie',            short: 'LD', x: 46, y: 52, talents:  7180, nodes:  55, top: 'Bartek N., 13',   score: 91 },
  { id: 'swietokrzyskie',     name: 'Świętokrzyskie',     short: 'SK', x: 60, y: 63, talents:  3240, nodes:  26, top: 'Karol W., 15',    score: 87 },
  { id: 'podkarpackie',       name: 'Podkarpackie',       short: 'PK', x: 76, y: 75, talents:  5820, nodes:  45, top: 'Grzegorz H., 13',score: 93 },
  { id: 'opolskie',           name: 'Opolskie',           short: 'OP', x: 27, y: 71, talents:  2640, nodes:  21, top: 'Łukasz P., 14',   score: 85 },
  { id: 'slaskie',            name: 'Śląskie',            short: 'SL', x: 37, y: 76, talents: 12380, nodes:  96, top: 'Damian F., 12',   score: 98 },
  { id: 'malopolskie',        name: 'Małopolskie',        short: 'ML', x: 54, y: 79, talents:  9140, nodes:  71, top: 'Marek C., 13',    score: 95 },
];

const MAX_TALENTS = Math.max(...VDATA.map((v) => v.talents));
const TOTAL       = VDATA.reduce((s, v) => s + v.talents, 0);
const TOTAL_NODES = VDATA.reduce((s, v) => s + v.nodes, 0);

// ─── Poland SVG outline for 540×480 viewBox ──────────────────────────────────
// Scaled from GlobalMapSection 500×430 path (sx=1.08, sy=1.116)
// Geographic bounds: lon 14.0–24.2°E, lat 49.0–54.8°N
const POLAND_540_PATH = [
  'M 32,108',
  'C 37,95 70,69 99,56',
  'C 127,42 167,31 203,22',
  'L 235,16',
  'C 254,9 279,10 302,16',
  'L 340,20',
  'L 419,16',
  'L 473,54',
  'L 488,94',
  'L 490,188',
  'L 497,252',
  'L 471,299',
  'L 492,377',
  'L 456,405',
  'L 423,444',
  'L 354,462',
  'L 274,462',
  'L 225,435',
  'L 170,402',
  'L 96,368',
  'L 76,346',
  'L 59,259',
  'L 43,170',
  'L 30,132',
  'Z',
].join(' ');

// Geographic grid for 540×480
// x = 32 + (lon - 14.1) * 46.5
// y = 16 + (54.7 - lat) * 81.1
const MERIDIANS = [
  { lon: 15, x:  74, label: '15°E' },
  { lon: 17, x: 167, label: '17°E' },
  { lon: 19, x: 260, label: '19°E' },
  { lon: 21, x: 353, label: '21°E' },
  { lon: 23, x: 446, label: '23°E' },
];
const PARALLELS = [
  { lat: 54, y:  73, label: '54°N' },
  { lat: 53, y: 154, label: '53°N' },
  { lat: 52, y: 235, label: '52°N' },
  { lat: 51, y: 316, label: '51°N' },
  { lat: 50, y: 397, label: '50°N' },
];

function bubbleRadius(talents) {
  return 12 + (talents / MAX_TALENTS) * 26;
}
function talentColor(talents) {
  const r = talents / MAX_TALENTS;
  if (r > 0.65) return '#00FF88';
  if (r > 0.35) return '#FFD700';
  return '#00E5FF';
}

// ─── SVG Map ──────────────────────────────────────────────────────────────────
function PolandBubbleMap({ selected, onSelect, inView }) {
  return (
    <svg
      viewBox="0 0 540 480"
      className="w-full h-full"
      style={{ display: 'block' }}
      aria-label="Interaktywna mapa talentów sportowych w Polsce — projekcja Rok 1"
    >
      <defs>
        <radialGradient id="tbMapBg" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="#00FF88" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#001a0d"  stopOpacity="0" />
        </radialGradient>
        <filter id="bubbleGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <rect x="0" y="0" width="540" height="480" fill="url(#tbMapBg)" />

      {/* Geographic grid */}
      {MERIDIANS.map((m) => (
        <g key={`m${m.lon}`}>
          <line x1={m.x} y1={0} x2={m.x} y2={480}
            stroke="rgba(0,255,136,0.07)" strokeWidth="0.6" strokeDasharray="3,5" />
          <text x={m.x} y={473} textAnchor="middle"
            fill="rgba(0,255,136,0.28)" fontSize="7" fontFamily="JetBrains Mono,monospace">
            {m.label}
          </text>
        </g>
      ))}
      {PARALLELS.map((p) => (
        <g key={`p${p.lat}`}>
          <line x1={0} y1={p.y} x2={540} y2={p.y}
            stroke="rgba(0,255,136,0.07)" strokeWidth="0.6" strokeDasharray="3,5" />
          <text x={5} y={p.y + 3}
            fill="rgba(0,255,136,0.28)" fontSize="7" fontFamily="JetBrains Mono,monospace">
            {p.label}
          </text>
        </g>
      ))}

      {/* Poland border — glow + sharp */}
      <path d={POLAND_540_PATH} fill="rgba(0,255,136,0.04)" />
      <path d={POLAND_540_PATH} fill="none" stroke="rgba(0,255,136,0.12)" strokeWidth="5" />
      <path d={POLAND_540_PATH} fill="none" stroke="rgba(0,255,136,0.5)"  strokeWidth="1.2" />

      {/* Voivodeship bubbles */}
      {VDATA.map((v, i) => {
        const cx = (v.x / 100) * 540;
        const cy = (v.y / 100) * 480;
        const r  = bubbleRadius(v.talents);
        const color = talentColor(v.talents);
        const isSel = selected?.id === v.id;

        return (
          <g key={v.id} onClick={() => onSelect(isSel ? null : v)} style={{ cursor: 'pointer' }}>
            {/* Pulsing outer ring */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="0.8" opacity="0.2">
              <animate attributeName="r"     values={`${r};${r*1.7};${r}`}   dur={`${2.5+i*0.18}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25"           dur={`${2.5+i*0.18}s`} repeatCount="indefinite" />
            </circle>

            {/* Selected ring */}
            {isSel && (
              <circle cx={cx} cy={cy} r={r + 7}
                fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
                <animate attributeName="r" values={`${r+5};${r+10};${r+5}`} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.15;0.5"      dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Bubble fill */}
            <motion.circle
              cx={cx} cy={cy} r={r}
              fill={color}
              fillOpacity={isSel ? 0.22 : 0.10}
              stroke={color}
              strokeWidth={isSel ? 1.8 : 1}
              strokeOpacity={isSel ? 1 : 0.55}
              initial={{ r: 0, opacity: 0 }}
              animate={inView ? { r, opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.04, ease: 'easeOut' }}
              filter="url(#bubbleGlow)"
            />

            {/* Short label */}
            <motion.text
              x={cx} y={cy + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={Math.max(8, Math.min(11, r * 0.56))}
              fill={color}
              fontFamily="JetBrains Mono,monospace"
              fontWeight="700"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: isSel ? 1 : 0.78 } : {}}
              transition={{ delay: 0.3 + i * 0.04 }}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {v.short}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function TalentMapSection() {
  const [ref, inView] = useInView(0.08);
  const [selected, setSelected] = useState(VDATA[6]); // Mazowieckie default

  const v = selected ?? VDATA[6];

  return (
    <section id="mapa-talentow" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-brand-neon font-mono text-sm tracking-widest uppercase mb-3">
            <MapPin size={14} />
            TalentRadar — Mapa Polski
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            {TOTAL.toLocaleString('pl-PL')}{' '}
            <span className="text-brand-neon text-glow-neon">talentów</span>
            <br className="hidden sm:block" />
            we wszystkich 16 województwach
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Interaktywna mapa gęstości talentów sportowych — projekcja Rok 1 wdrożenia.
            Kliknij województwo, aby zobaczyć szczegóły i AI Score.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 border border-brand-neon/30 bg-brand-neon/5 text-brand-neon/80 text-xs font-mono rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
            PROJEKCJA ROK 1 — ogólnopolskie wdrożenie — cel: 100 000 zawodników
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Map ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="border border-brand-neon/20 bg-[#030f08] rounded-sm overflow-hidden flex flex-col"
              style={{ height: '520px' }}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-brand-neon/15 bg-brand-neon/5 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MapPin size={11} className="text-brand-neon" />
                  <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest">
                    TalentRadar · Polska · 16 województw
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-[9px] font-mono">Kliknij województwo</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                    <span className="text-brand-neon font-mono text-[10px]">LIVE</span>
                  </div>
                </div>
              </div>

              {/* SVG map area */}
              <div className="flex-1 min-h-0 p-2">
                <PolandBubbleMap selected={selected} onSelect={setSelected} inView={inView} />
              </div>

              {/* Legend + footnote */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-brand-neon/15 bg-brand-dark/60 flex-shrink-0">
                <div className="flex items-center gap-5">
                  {[
                    { color: '#00FF88', label: 'Wysoka gęstość (>65%)' },
                    { color: '#FFD700', label: 'Średnia (35–65%)' },
                    { color: '#00E5FF', label: 'Niska (<35%)' },
                  ].map((lg) => (
                    <div key={lg.label} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: lg.color, boxShadow: `0 0 5px ${lg.color}` }} />
                      <span className="text-[10px] font-mono text-gray-400">{lg.label}</span>
                    </div>
                  ))}
                </div>
                <span className="text-gray-600 text-[9px] font-mono">
                  PostGIS TalentRadar v2.0 · ST_DWithin
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right panel ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Selected voivodeship */}
            <AnimatePresence mode="wait">
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="p-5 border border-brand-neon/40 bg-brand-neon/5 rounded-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={11} className="text-brand-neon" />
                  <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest">
                    Województwo aktywne
                  </span>
                </div>
                <div className="text-white font-display font-bold text-xl mb-4">{v.name}</div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-mono">Talenty w systemie</span>
                    <span className="text-brand-neon font-display font-bold text-lg">
                      {v.talents.toLocaleString('pl-PL')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-mono">Węzłów LiDAR</span>
                    <span className="text-brand-cyan font-mono font-bold">{v.nodes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-mono">Top talent — AI Score</span>
                    <span className="text-brand-gold font-mono font-bold">{v.score}/100</span>
                  </div>

                  <div className="pt-3 border-t border-brand-border">
                    <div className="text-gray-600 text-[10px] font-mono mb-1 uppercase tracking-widest">
                      Najlepszy prospekt
                    </div>
                    <div className="text-white text-sm font-mono font-bold">{v.top}</div>
                  </div>

                  {/* Density bar */}
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-gray-600 text-[10px] font-mono">Gęstość regionu</span>
                      <span className="text-brand-neon text-[10px] font-mono">
                        {Math.round((v.talents / MAX_TALENTS) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand-neon to-brand-cyan"
                        initial={{ width: 0 }}
                        animate={{ width: `${(v.talents / MAX_TALENTS) * 100}%` }}
                        transition={{ duration: 0.55 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* National totals */}
            <div className="p-4 border border-brand-border bg-brand-dark rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users size={11} className="text-brand-gold" />
                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                  Łącznie — cała Polska
                </span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Talentów w systemie', val: TOTAL.toLocaleString('pl-PL'),        color: 'text-brand-neon' },
                  { label: 'Aktywnych węzłów',    val: TOTAL_NODES.toLocaleString('pl-PL'),  color: 'text-brand-cyan' },
                  { label: 'Województw online',   val: '16 / 16',                             color: 'text-brand-gold' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-mono">{item.label}</span>
                    <span className={`font-display font-bold text-base ${item.color}`}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 5 */}
            <div className="p-4 border border-brand-border bg-brand-dark rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={11} className="text-brand-neon" />
                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                  Top 5 województw
                </span>
              </div>
              <div className="space-y-1.5">
                {[...VDATA]
                  .sort((a, b) => b.talents - a.talents)
                  .slice(0, 5)
                  .map((vo, i) => {
                    const isSel = selected?.id === vo.id;
                    const pct   = Math.round((vo.talents / MAX_TALENTS) * 100);
                    return (
                      <button
                        key={vo.id}
                        onClick={() => setSelected(vo)}
                        className={[
                          'w-full text-left px-2 py-2 rounded-sm transition-all',
                          isSel ? 'bg-brand-neon/10' : 'hover:bg-white/5',
                        ].join(' ')}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600 text-[10px] font-mono w-4">{i + 1}.</span>
                            <Zap size={9} className={isSel ? 'text-brand-neon' : 'text-gray-600'} />
                            <span className={`text-xs font-mono ${isSel ? 'text-brand-neon font-bold' : 'text-gray-300'}`}>
                              {vo.short}
                            </span>
                            <span className="text-gray-600 text-[10px] font-mono hidden sm:block">
                              {vo.name.split(' ')[0]}
                            </span>
                          </div>
                          <span className={`text-xs font-mono font-bold ${isSel ? 'text-brand-neon' : 'text-gray-300'}`}>
                            {vo.talents.toLocaleString('pl-PL')}
                          </span>
                        </div>
                        <div className="h-0.5 bg-brand-dark/80 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: talentColor(vo.talents) }}
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
