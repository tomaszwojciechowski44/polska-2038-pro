import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { MapPin, Users, Zap } from 'lucide-react';

// Voivodeship data with approximate positions on a 540x480 Poland map
// x, y as percentage of viewBox (0–100)
const VOIVODESHIPS = [
  { id: 'zachodniopomorskie', name: 'Zachodniopomorskie', short: 'ZP', x: 11, y: 17, talents: 4821, nodes: 38, top: 'Tomasz W., 15', score: 91 },
  { id: 'pomorskie',          name: 'Pomorskie',          short: 'PM', x: 33, y: 10, talents: 7340, nodes: 54, top: 'Kacper L., 13', score: 95 },
  { id: 'warminsko',          name: 'Warmińsko-Mazurskie',short: 'WM', x: 60, y: 16, talents: 3912, nodes: 31, top: 'Marek B., 14', score: 88 },
  { id: 'podlaskie',          name: 'Podlaskie',          short: 'PD', x: 79, y: 27, talents: 2841, nodes: 22, top: 'Paweł S., 12', score: 86 },
  { id: 'lubuskie',           name: 'Lubuskie',           short: 'LB', x: 7,  y: 46, talents: 2108, nodes: 17, top: 'Adam K., 16', score: 84 },
  { id: 'kujawsko',           name: 'Kujawsko-Pomorskie', short: 'KP', x: 33, y: 32, talents: 5614, nodes: 44, top: 'Jan M., 13', score: 92 },
  { id: 'mazowieckie',        name: 'Mazowieckie',        short: 'MZ', x: 63, y: 42, talents: 14820, nodes: 112, top: 'Piotr R., 14', score: 97 },
  { id: 'lubelskie',          name: 'Lubelskie',          short: 'LU', x: 78, y: 57, talents: 6230, nodes: 49, top: 'Radek O., 15', score: 90 },
  { id: 'dolnoslaskie',       name: 'Dolnośląskie',       short: 'DS', x: 14, y: 63, talents: 8910, nodes: 68, top: 'Szymon J., 12', score: 94 },
  { id: 'wielkopolskie',      name: 'Wielkopolskie',      short: 'WP', x: 27, y: 50, talents: 10240, nodes: 79, top: 'Michał T., 14', score: 96 },
  { id: 'lodzkie',            name: 'Łódźkie',            short: 'LD', x: 46, y: 52, talents: 7180, nodes: 55, top: 'Bartek N., 13', score: 91 },
  { id: 'swietokrzyskie',     name: 'Świętokrzyskie',     short: 'SK', x: 60, y: 63, talents: 3240, nodes: 26, top: 'Karol W., 15', score: 87 },
  { id: 'podkarpackie',       name: 'Podkarpackie',       short: 'PK', x: 76, y: 75, talents: 5820, nodes: 45, top: 'Grzegorz H., 13', score: 93 },
  { id: 'opolskie',           name: 'Opolskie',           short: 'OP', x: 27, y: 71, talents: 2640, nodes: 21, top: 'Łukasz P., 14', score: 85 },
  { id: 'slaskie',            name: 'Śląskie',            short: 'SL', x: 37, y: 76, talents: 12380, nodes: 96, top: 'Damian F., 12', score: 98 },
  { id: 'malopolskie',        name: 'Małopolskie',        short: 'ML', x: 54, y: 79, talents: 9140, nodes: 71, top: 'Marek C., 13', score: 95 },
];

const maxTalents = Math.max(...VOIVODESHIPS.map(v => v.talents));

// Pulse events appear on the map
const generatePulse = () => {
  const v = VOIVODESHIPS[Math.floor(Math.random() * VOIVODESHIPS.length)];
  return { id: Date.now(), x: v.x, y: v.y, name: v.name };
};

export default function TalentMapSection() {
  const [ref, inView] = useInView(0.1);
  const [selected, setSelected] = useState(VOIVODESHIPS[6]); // Mazowieckie default
  const [pulses, setPulses] = useState([]);
  const [totalToday] = useState(97840);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      const pulse = generatePulse();
      setPulses(prev => [...prev.slice(-4), pulse]);
    }, 1800);
    return () => clearInterval(timer);
  }, [inView]);

  const getBubbleSize = (talents) => {
    const ratio = talents / maxTalents;
    return 14 + ratio * 28; // 14px to 42px radius
  };

  const getIntensity = (talents) => {
    const ratio = talents / maxTalents;
    if (ratio > 0.75) return 'high';
    if (ratio > 0.4)  return 'med';
    return 'low';
  };

  const intensityStyles = {
    high: { dot: 'bg-brand-neon', ring: 'border-brand-neon/40', text: 'text-brand-neon', label: 'Wysoka gęstość' },
    med:  { dot: 'bg-brand-gold', ring: 'border-brand-gold/40', text: 'text-brand-gold', label: 'Średnia gęstość' },
    low:  { dot: 'bg-brand-cyan', ring: 'border-brand-cyan/40', text: 'text-brand-cyan', label: 'Niska gęstość' },
  };

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
            TALENT RADAR — MAPA POLSKI
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            {totalToday.toLocaleString('pl-PL')}{' '}
            <span className="text-brand-neon text-glow-neon">talentów</span>
            <br className="hidden sm:block" />
            we wszystkich 16 województwach
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Interaktywna mapa gęstości talentów sportowych. Kliknij na województwo — zobaczysz live dane AI.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Map — SVG Poland with voivodeship bubbles */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="relative border border-brand-border bg-brand-dark/80 rounded-sm overflow-hidden"
              style={{ aspectRatio: '540/480' }}
            >
              {/* Background grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />

              {/* Corner HUD */}
              <div className="absolute top-3 left-3 font-mono text-[10px] text-brand-neon/60">
                TALENT RADAR • POLSKA • 16 WOJEWÓDZTW
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] text-brand-neon/60">
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] text-brand-cyan/50">
                PostGIS TalentRadar v2.0 • ST_DWithin queries
              </div>

              {/* SVG overlay for voivodeship bubbles */}
              <svg
                viewBox="0 0 540 480"
                className="absolute inset-0 w-full h-full"
                style={{ overflow: 'visible' }}
              >
                {/* Poland outline — simplified polygon */}
                <polygon
                  points="
                    60,50 140,30 200,25 260,20 320,28 380,35 430,42 480,55
                    510,90 520,130 510,165 495,190 490,230 475,265
                    460,290 450,320 430,345 410,360 390,375 370,390
                    340,400 310,415 280,420 250,418 220,412 195,400
                    165,385 140,370 115,350 90,320 68,295 52,268
                    38,235 35,200 40,165 45,130 48,95
                  "
                  fill="none"
                  stroke="#1A2540"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Voivodeship bubbles */}
                {VOIVODESHIPS.map((v, i) => {
                  const cx = (v.x / 100) * 540;
                  const cy = (v.y / 100) * 480;
                  const r = getBubbleSize(v.talents);
                  const intensity = getIntensity(v.talents);
                  const color = intensity === 'high' ? '#00FF88' : intensity === 'med' ? '#FFD700' : '#00E5FF';
                  const isSelected = selected?.id === v.id;

                  return (
                    <g key={v.id} onClick={() => setSelected(v)} style={{ cursor: 'pointer' }}>
                      {/* Outer ring for selected */}
                      {isSelected && (
                        <motion.circle
                          cx={cx} cy={cy} r={r + 8}
                          fill="none" stroke={color} strokeWidth="1.5" opacity="0.4"
                          animate={{ r: [r + 6, r + 12, r + 6], opacity: [0.4, 0.1, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Pulse rings for live discovery */}
                      {pulses.some(p => Math.abs(p.x - v.x) < 5 && Math.abs(p.y - v.y) < 5) && (
                        <motion.circle
                          cx={cx} cy={cy} r={r + 4}
                          fill="none" stroke={color} strokeWidth="1"
                          initial={{ r: r, opacity: 0.8 }}
                          animate={{ r: r + 20, opacity: 0 }}
                          transition={{ duration: 1.2 }}
                        />
                      )}

                      {/* Main bubble */}
                      <motion.circle
                        cx={cx} cy={cy} r={r}
                        fill={color} fillOpacity={isSelected ? 0.25 : 0.12}
                        stroke={color} strokeWidth={isSelected ? 2 : 1}
                        strokeOpacity={isSelected ? 0.9 : 0.5}
                        initial={{ r: 0, opacity: 0 }}
                        animate={inView ? { r, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.04 }}
                        whileHover={{ fillOpacity: 0.3 }}
                      />

                      {/* Short label */}
                      <motion.text
                        x={cx} y={cy + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize={Math.max(8, Math.min(11, r * 0.55))}
                        fill={color}
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="700"
                        opacity={isSelected ? 1 : 0.8}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: isSelected ? 1 : 0.75 } : {}}
                        transition={{ delay: 0.3 + i * 0.04 }}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {v.short}
                      </motion.text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
                {['high', 'med', 'low'].map(level => {
                  const s = intensityStyles[level];
                  return (
                    <div key={level} className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                      <span className={`text-[9px] font-mono ${s.text}`}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="space-y-4"
          >
            {/* Selected voivodeship card */}
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 border-2 border-brand-neon/40 bg-brand-neon/5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={14} className="text-brand-neon" />
                    <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">
                      Województwo aktywne
                    </span>
                  </div>
                  <div className="text-white font-display font-bold text-xl mb-4">
                    {selected.name}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs font-mono">Talenty w systemie</span>
                      <span className="text-brand-neon font-display font-bold text-lg">
                        {selected.talents.toLocaleString('pl-PL')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs font-mono">Węzły LiDAR</span>
                      <span className="text-brand-cyan font-mono font-bold">{selected.nodes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs font-mono">Top talent — Score</span>
                      <span className="text-brand-gold font-mono font-bold">{selected.score}/100</span>
                    </div>
                    <div className="pt-3 border-t border-brand-border">
                      <div className="text-gray-600 text-[10px] font-mono mb-1">NAJLEPSZY PROSPEKT</div>
                      <div className="text-white text-sm font-mono font-bold">{selected.top}</div>
                    </div>

                    {/* Talent density bar */}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-gray-600 text-[10px] font-mono">Gęstość regionu</span>
                        <span className="text-brand-neon text-[10px] font-mono">
                          {Math.round((selected.talents / maxTalents) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-brand-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-brand-neon to-brand-cyan"
                          initial={{ width: 0 }}
                          animate={{ width: `${(selected.talents / maxTalents) * 100}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* National totals */}
            <div className="p-5 border border-brand-border bg-brand-dark">
              <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users size={11} />
                Łącznie — cała Polska
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Talentów w systemie', val: VOIVODESHIPS.reduce((a, v) => a + v.talents, 0).toLocaleString('pl-PL'), color: 'text-brand-neon' },
                  { label: 'Aktywnych węzłów', val: VOIVODESHIPS.reduce((a, v) => a + v.nodes, 0).toLocaleString('pl-PL'), color: 'text-brand-cyan' },
                  { label: 'Województw online', val: '16 / 16', color: 'text-brand-gold' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-mono">{item.label}</span>
                    <span className={`font-display font-bold text-base ${item.color}`}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick voivodeship list */}
            <div className="p-4 border border-brand-border bg-brand-dark">
              <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-3">
                Top 5 województw
              </div>
              <div className="space-y-2">
                {[...VOIVODESHIPS]
                  .sort((a, b) => b.talents - a.talents)
                  .slice(0, 5)
                  .map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelected(v)}
                      className={`w-full flex items-center justify-between p-2 transition-colors text-left ${
                        selected?.id === v.id
                          ? 'bg-brand-neon/10 border border-brand-neon/30'
                          : 'hover:bg-brand-card border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-[10px] font-mono w-4">{i + 1}.</span>
                        <Zap size={10} className="text-brand-neon" />
                        <span className="text-white text-xs font-mono">{v.short}</span>
                        <span className="text-gray-600 text-[10px] font-mono hidden sm:block">{v.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-brand-neon text-xs font-mono font-bold">
                        {v.talents.toLocaleString('pl-PL')}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
