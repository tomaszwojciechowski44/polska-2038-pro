import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import { TrendingUp, Target, Globe2, Zap } from 'lucide-react';

/* ─── dane ─────────────────────────────────────────── */
const PIPELINE_DATA = [
  { year: '2025', pl: 0.05, de: 4.2, fr: 5.1, en: 3.8, es: 6.0 },
  { year: '2026', pl: 0.32, de: 4.3, fr: 5.2, en: 3.9, es: 6.1 },
  { year: '2027', pl: 1.20, de: 4.4, fr: 5.3, en: 4.0, es: 6.2 },
  { year: '2028', pl: 2.80, de: 4.5, fr: 5.4, en: 4.1, es: 6.3 },
  { year: '2030', pl: 3.90, de: 4.6, fr: 5.5, en: 4.2, es: 6.4 },
  { year: '2032', pl: 5.10, de: 4.7, fr: 5.6, en: 4.3, es: 6.5 },
  { year: '2035', pl: 5.50, de: 4.8, fr: 5.7, en: 4.4, es: 6.6 },
  { year: '2038', pl: 6.20, de: 4.9, fr: 5.8, en: 4.5, es: 6.7 },
];

const ROI_DATA = [
  { year: '2026', roi: 0.18 },
  { year: '2027', roi: 0.54 },
  { year: '2028', roi: 1.20 },
  { year: '2029', roi: 2.10 },
  { year: '2030', roi: 3.40 },
  { year: '2032', roi: 5.80 },
  { year: '2035', roi: 8.20 },
  { year: '2038', roi: 12.60 },
];

const STAGE_DATA = [
  { label: 'Obserwowani', count: 38200 },
  { label: 'Profile AI', count: 47388 },
  { label: 'Skautowani', count: 12400 },
  { label: 'Aktywni zawodnicy', count: 8900 },
  { label: 'Akademia', count: 2240 },
  { label: 'Kadra narodowa', count: 184 },
];

const BENCHMARK_DATA = [
  { country: '🇵🇱 Polska', now: 1.4,  target: 6.2, fill: '#00FF88' },
  { country: '🇩🇪 Niemcy',  now: 4.8,  target: 4.9, fill: '#818cf8' },
  { country: '🇫🇷 Francja', now: 5.1,  target: 5.8, fill: '#60a5fa' },
  { country: '🇪🇸 Hiszpania', now: 6.0, target: 6.7, fill: '#f472b6' },
  { country: '🇳🇱 Holandia', now: 5.6, target: 5.9, fill: '#fbbf24' },
];

const TABS = [
  { id: 'pipeline',   label: '📈 Zawodnicy', icon: TrendingUp },
  { id: 'roi',        label: '💰 ROI',       icon: Target },
  { id: 'funnel',     label: '⚽ Lejek',      icon: Zap },
  { id: 'benchmark',  label: '🌍 Benchmark',  icon: Globe2 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-gray-400 font-mono text-xs mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-300">{p.name}:</span>
          <span className="font-black" style={{ color: p.color }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function KpiChartsSection() {
  const [tab, setTab] = useState('pipeline');

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
            Analityka systemu
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            📊 Wskaźniki KPI &amp; Prognozy
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Twarda liczba: Polska vs Europa, lejek talentów, prognoza ROI
            i pipeline zawodników do 2038 r.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                tab === t.id
                  ? 'bg-brand-neon text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Chart area */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >

          {/* ── Pipeline chart ── */}
          {tab === 'pipeline' && (
            <>
              <h3 className="text-white font-black mb-1">
                Zawodnicy w systemie TOP-5 na 100K mieszkańców
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Polska startuje z 1,4 → cel: 6,2 w 2038 (dorównanie Niemcom w 2032)
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={PIPELINE_DATA} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} />
                  <ReferenceLine y={1.4} stroke="#00FF88" strokeDasharray="4 2" label={{ value: 'PL dziś', fill: '#00FF88', fontSize: 10 }} />
                  <Line type="monotone" dataKey="pl" name="🇵🇱 Polska" stroke="#00FF88" strokeWidth={3} dot={{ fill: '#00FF88', r: 3 }} />
                  <Line type="monotone" dataKey="de" name="🇩🇪 Niemcy" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  <Line type="monotone" dataKey="fr" name="🇫🇷 Francja" stroke="#60a5fa" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  <Line type="monotone" dataKey="es" name="🇪🇸 Hiszpania" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {/* ── ROI chart ── */}
          {tab === 'roi' && (
            <>
              <h3 className="text-white font-black mb-1">
                Prognoza ROI systemu (mld PLN / rok)
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Break-even w 2027 · ROI ×12,6 do 2038 (transfery, prawa TV, turystyka, branding)
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={ROI_DATA} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={1.08} stroke="#ef4444" strokeDasharray="4 2"
                    label={{ value: 'Inwestycja 1,08 mld/rok', fill: '#ef4444', fontSize: 10 }} />
                  <Bar dataKey="roi" name="ROI (mld PLN)" fill="#00FF88" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* ── Funnel chart ── */}
          {tab === 'funnel' && (
            <>
              <h3 className="text-white font-black mb-1">
                Lejek talentów — od obserwacji do kadry narodowej
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Każdy zawodnik zaczyna jako punkt w bazie → kończy jako reprezentant Polski
              </p>
              <div className="space-y-3">
                {STAGE_DATA.map((s, i) => {
                  const pct = Math.round((s.count / STAGE_DATA[0].count) * 100);
                  const colors = ['#00FF88', '#22d3ee', '#818cf8', '#f59e0b', '#f472b6', '#ef4444'];
                  return (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300 font-medium">{s.label}</span>
                        <span className="font-black" style={{ color: colors[i] }}>
                          {s.count.toLocaleString('pl-PL')}
                        </span>
                      </div>
                      <div className="h-8 bg-gray-800 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          style={{ height: '100%', background: colors[i], borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 10 }}
                        >
                          <span className="text-xs font-black text-black/70">{pct}%</span>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-gray-600 text-xs font-mono mt-5 text-center">
                * dane demo — system pilotażowy 2025/2026
              </p>
            </>
          )}

          {/* ── Benchmark chart ── */}
          {tab === 'benchmark' && (
            <>
              <h3 className="text-white font-black mb-1">
                Benchmark: Polska vs Europa
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Zawodnicy TOP-5 ligi / 100K mieszkańców · stan 2025 vs cel 2038
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={BENCHMARK_DATA}
                  layout="vertical"
                  margin={{ top: 8, right: 30, left: 16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis dataKey="country" type="category" tick={{ fill: '#d1d5db', fontSize: 12 }} width={110} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} />
                  <Bar dataKey="now"    name="Dziś (2025)" fill="#374151" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="target" name="Cel (2038)"
                    radius={[0, 4, 4, 0]}
                    fill="#00FF88"
                    fillOpacity={0.7}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </motion.div>

        {/* Bottom row of quick KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { val: '47 388', label: 'Profili w bazie', sub: 'demo · pilot 2026',        color: 'text-brand-neon'  },
            { val: '847',    label: 'Skautów',         sub: 'certyfikowanych PZPN',      color: 'text-brand-cyan' },
            { val: '94%',    label: 'Accuracy AI',     sub: 'model EnsembleScorer v2',   color: 'text-purple-400' },
            { val: '×11,6',  label: 'Prognoza ROI',    sub: 'do 2038 vs nakład roczny',  color: 'text-yellow-400' },
          ].map(k => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
            >
              <div className={`text-2xl font-black ${k.color}`}>{k.val}</div>
              <div className="text-gray-300 text-sm font-medium mt-1">{k.label}</div>
              <div className="text-gray-600 text-xs font-mono">{k.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
