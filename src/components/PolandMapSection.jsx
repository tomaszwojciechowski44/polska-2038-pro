import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, TrendingUp, Star } from 'lucide-react';

/* ─── dane województw ─────────────────────────────── */
const VOIVODESHIPS = [
  { id: 'ZP', name: 'Zachodnio\u002dpomorskie', capital: 'Szczecin',
    talents: 1240, scouts: 48, score: 71, trend: '+12%', col: 0, row: 0 },
  { id: 'PM', name: 'Pomorskie', capital: 'Gdańsk',
    talents: 2180, scouts: 74, score: 84, trend: '+18%', col: 1, row: 0 },
  { id: 'WM', name: 'Warmińsko-Mazurskie', capital: 'Olsztyn',
    talents: 980, scouts: 36, score: 66, trend: '+9%', col: 2, row: 0 },
  { id: 'PD', name: 'Podlaskie', capital: 'Białystok',
    talents: 870, scouts: 31, score: 63, trend: '+7%', col: 3, row: 0 },
  { id: 'LB', name: 'Lubuskie', capital: 'Zielona Góra',
    talents: 760, scouts: 28, score: 62, trend: '+11%', col: 0, row: 1 },
  { id: 'KP', name: 'Kujawsko-Pomorskie', capital: 'Bydgoszcz',
    talents: 1680, scouts: 61, score: 77, trend: '+14%', col: 1, row: 1 },
  { id: 'MZ', name: 'Mazowieckie', capital: 'Warszawa',
    talents: 6420, scouts: 187, score: 95, trend: '+22%', col: 2, row: 1 },
  { id: 'LN', name: 'Lubelskie', capital: 'Lublin',
    talents: 1540, scouts: 55, score: 72, trend: '+13%', col: 3, row: 1 },
  { id: 'DS', name: 'Dolnośląskie', capital: 'Wrocław',
    talents: 2890, scouts: 96, score: 88, trend: '+19%', col: 0, row: 2 },
  { id: 'WP', name: 'Wielkopolskie', capital: 'Poznań',
    talents: 3140, scouts: 108, score: 90, trend: '+21%', col: 1, row: 2 },
  { id: 'LD', name: 'Łódzkie', capital: 'Łódź',
    talents: 2240, scouts: 79, score: 82, trend: '+16%', col: 2, row: 2 },
  { id: 'SK', name: 'Świętokrzyskie', capital: 'Kielce',
    talents: 890, scouts: 33, score: 67, trend: '+10%', col: 3, row: 2 },
  { id: 'OP', name: 'Opolskie', capital: 'Opole',
    talents: 640, scouts: 24, score: 60, trend: '+8%', col: 0, row: 3 },
  { id: 'SL', name: 'Śląskie', capital: 'Katowice',
    talents: 4980, scouts: 162, score: 93, trend: '+20%', col: 1, row: 3 },
  { id: 'MP', name: 'Małopolskie', capital: 'Kraków',
    talents: 3680, scouts: 124, score: 91, trend: '+23%', col: 2, row: 3 },
  { id: 'PK', name: 'Podkarpackie', capital: 'Rzeszów',
    talents: 1820, scouts: 64, score: 79, trend: '+17%', col: 3, row: 3 },
];

function scoreColor(score) {
  if (score >= 90) return { bg: '#14532d', border: '#16a34a', text: '#4ade80' }; // deep green
  if (score >= 80) return { bg: '#14432d', border: '#10b981', text: '#34d399' }; // green
  if (score >= 70) return { bg: '#1c3a1e', border: '#65a30d', text: '#a3e635' }; // lime
  if (score >= 60) return { bg: '#1c2a12', border: '#ca8a04', text: '#facc15' }; // yellow
  return         { bg: '#1c150a', border: '#b45309', text: '#fb923c' };           // orange
}

function ScoreBar({ score }) {
  const c = scoreColor(score);
  return (
    <div style={{ height: 3, background: '#1f2937', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ height: '100%', background: c.text, borderRadius: 2 }}
      />
    </div>
  );
}

export default function PolandMapSection() {
  const [active, setActive] = useState('MZ');
  const activeV = VOIVODESHIPS.find(v => v.id === active);
  const totalTalents = VOIVODESHIPS.reduce((s, v) => s + v.talents, 0);
  const totalScouts  = VOIVODESHIPS.reduce((s, v) => s + v.scouts, 0);

  const COLS = 4;
  const ROWS = 4;
  const CELL = 78; // px
  const GAP  = 6;

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">
            Dane demo · 16 województw
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            🗺️ Mapa Talentów Polski
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Interaktywna mapa rozkładu zidentyfikowanych talentów piłkarskich.
            Kliknij województwo, aby zobaczyć szczegóły.
          </p>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users,      val: totalTalents.toLocaleString('pl-PL'), label: 'Profili w systemie',      color: 'text-brand-neon' },
            { icon: MapPin,     val: '16',                                  label: 'Województw aktywnych',   color: 'text-brand-cyan' },
            { icon: Star,       val: totalScouts.toLocaleString('pl-PL'),   label: 'Certyfikowanych skautów', color: 'text-yellow-400' },
            { icon: TrendingUp, val: '+17%',                                label: 'Wzrost r/r (avg)',        color: 'text-brand-red' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
              >
                <Icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-gray-500 text-xs font-mono mt-1 uppercase tracking-wide">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Map + detail panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

          {/* Schematic tile map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
            style={{
              width: COLS * CELL + (COLS - 1) * GAP,
              height: ROWS * CELL + (ROWS - 1) * GAP,
              position: 'relative',
            }}
          >
            {VOIVODESHIPS.map(v => {
              const c = scoreColor(v.score);
              const isActive = v.id === active;
              const left = v.col * (CELL + GAP);
              const top  = v.row * (CELL + GAP);
              return (
                <motion.button
                  key={v.id}
                  onClick={() => setActive(v.id)}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: 'absolute',
                    left, top,
                    width: CELL, height: CELL,
                    background: isActive ? c.border + '33' : c.bg,
                    border: `2px solid ${isActive ? c.border : c.border + '66'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    padding: 4,
                    transition: 'background 0.2s, border-color 0.2s',
                    outline: isActive ? `2px solid ${c.border}` : 'none',
                    outlineOffset: 2,
                  }}
                >
                  <span style={{ color: c.text, fontFamily: 'monospace', fontSize: 11, fontWeight: 900, lineHeight: 1.2, textAlign: 'center' }}>
                    {v.id}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: 9, lineHeight: 1.1, textAlign: 'center' }}>
                    {v.talents >= 1000 ? (v.talents / 1000).toFixed(1) + 'K' : v.talents}
                  </span>
                  <ScoreBar score={v.score} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {activeV && (
              <motion.div
                key={activeV.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="flex-1 max-w-sm"
              >
                <div
                  className="rounded-2xl p-6 border"
                  style={{
                    background: scoreColor(activeV.score).bg,
                    borderColor: scoreColor(activeV.score).border + '66',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-black text-xl">{activeV.name}</h3>
                      <p className="text-gray-400 text-sm font-mono">{activeV.capital}</p>
                    </div>
                    <div
                      className="text-3xl font-black"
                      style={{ color: scoreColor(activeV.score).text }}
                    >
                      {activeV.score}
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    {[
                      { label: 'Profile w systemie',      val: activeV.talents.toLocaleString('pl-PL'), color: 'text-brand-neon' },
                      { label: 'Certyfikowani skauci',    val: activeV.scouts,                          color: 'text-brand-cyan' },
                      { label: 'Wzrost r/r',              val: activeV.trend,                           color: 'text-yellow-400' },
                      { label: 'Wynik AI województwa',    val: `${activeV.score}/100`,                  color: scoreColor(activeV.score).text },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-gray-400 text-sm">{r.label}</span>
                        <span className={`font-black text-sm ${r.color}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress to national target */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-gray-500">Postęp do celu 2030</span>
                      <span style={{ color: scoreColor(activeV.score).text }}>{activeV.score}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeV.score}%` }}
                        transition={{ duration: 1 }}
                        style={{ height: '100%', background: scoreColor(activeV.score).text, borderRadius: 9999 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Ranking in context */}
                <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-500 text-xs font-mono mb-3 uppercase tracking-widest">
                    Top 5 województw
                  </p>
                  {[...VOIVODESHIPS]
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setActive(v.id)}
                        className="w-full flex items-center gap-3 py-1.5 hover:opacity-80 transition-opacity text-left"
                      >
                        <span className="text-gray-600 font-mono text-xs w-4">#{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className={`text-xs font-medium ${v.id === activeV.id ? 'text-white' : 'text-gray-300'}`}>
                              {v.name}
                            </span>
                            <span className="text-xs font-black" style={{ color: scoreColor(v.score).text }}>
                              {v.score}
                            </span>
                          </div>
                          <div className="h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div
                              style={{ width: `${v.score}%`, height: '100%', background: scoreColor(v.score).text, borderRadius: 9999 }}
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-500">
          {[
            { label: '90–100 Lider', c: '#4ade80' },
            { label: '80–89 Dobry', c: '#34d399' },
            { label: '70–79 Rozwijający się', c: '#a3e635' },
            { label: '60–69 Podstawowy', c: '#facc15' },
            { label: '<60 Wymaga wsparcia', c: '#fb923c' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.c }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
