import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Trophy, DollarSign } from 'lucide-react';

function fmt(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace('.0', '') + ' mld zł';
  if (n >= 1e6) return Math.round(n / 1e6) + ' mln zł';
  return n.toLocaleString('pl-PL') + ' zł';
}

function Bar({ label, value, max, color, suffix = '' }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-400 text-xs font-mono">{label}</span>
        <span className={`text-sm font-black ${color}`}>{suffix}{fmt(value)}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function RoiCalculatorSection() {
  const [children, setChildren] = useState(500);     // 100–1000
  const [years,    setYears]    = useState(12);       // 5–15
  const [scale,    setScale]    = useState(50);       // 10–100 %

  // Derived
  const budgetPerYear  = 1_080_000_000 * (scale / 100);
  const totalInvest    = budgetPerYear * years;
  const transferFees   = children * years * 280_000 * (scale / 100);
  const tvRights       = 200_000_000  * (scale / 100) * Math.min(years / 12, 1);
  const tourismRevenue = 200_000_000  * (scale / 100) * Math.min(years / 12, 1);
  const sponsoring     = 80_000_000   * (scale / 100) * Math.min(years / 12, 1);
  const totalReturn    = transferFees + tvRights + tourismRevenue + sponsoring;
  const roi            = totalInvest > 0 ? Math.round((totalReturn / totalInvest) * 100) : 0;
  const playersTop5    = Math.round(children * years * 0.012 * (scale / 100));

  return (
    <section id="roi" className="py-20 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Interaktywny symulator</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">💰 Kalkulator ROI Reformy</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Dostosuj parametry programu i zobacz jak zmienia się zwrot z inwestycji w czasie rzeczywistym.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-8"
          >
            <h3 className="text-white font-bold mb-4">⚙️ Parametry Programu</h3>

            {/* Children slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-400 font-mono text-sm">Dzieci w programie/rok</label>
                <span className="text-brand-neon font-black text-lg">{children.toLocaleString('pl-PL')}</span>
              </div>
              <input type="range" min="100" max="1000" step="50"
                value={children} onChange={e => setChildren(+e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-brand-neon"
              />
              <div className="flex justify-between text-gray-600 text-xs font-mono mt-1">
                <span>100</span><span>1 000</span>
              </div>
            </div>

            {/* Years slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-400 font-mono text-sm">Horyzont programu (lata)</label>
                <span className="text-brand-cyan font-black text-lg">{years} lat</span>
              </div>
              <input type="range" min="5" max="15" step="1"
                value={years} onChange={e => setYears(+e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-brand-cyan"
              />
              <div className="flex justify-between text-gray-600 text-xs font-mono mt-1">
                <span>5 lat</span><span>15 lat</span>
              </div>
            </div>

            {/* Scale slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-400 font-mono text-sm">Skala wdrożenia</label>
                <span className="text-yellow-400 font-black text-lg">{scale}%</span>
              </div>
              <input type="range" min="10" max="100" step="5"
                value={scale} onChange={e => setScale(+e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-gray-600 text-xs font-mono mt-1">
                <span>10% (pilotaż)</span><span>100% (pełne)</span>
              </div>
            </div>

            {/* Summary input */}
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-mono">Budżet / rok</span>
                <span className="text-white font-bold">{fmt(budgetPerYear)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-mono">Łączna inwestycja</span>
                <span className="text-white font-bold">{fmt(totalInvest)}</span>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold mb-6">📈 Prognozowane Zwroty</h3>

            <div className="space-y-4 mb-6">
              <Bar label="Transfery piłkarzy (fees)" value={transferFees} max={totalReturn} color="text-brand-neon" />
              <Bar label="Prawa telewizyjne" value={tvRights}      max={totalReturn} color="text-brand-cyan" />
              <Bar label="Turystyka meczowa" value={tourismRevenue} max={totalReturn} color="text-yellow-400" />
              <Bar label="Sponsoring kadry"  value={sponsoring}     max={totalReturn} color="text-purple-400" />
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-mono text-sm">Łączny zwrot</span>
                <span className="text-brand-neon font-black text-xl">{fmt(totalReturn)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-mono text-sm">ROI</span>
                <span className={`font-black text-2xl ${roi > 200 ? 'text-brand-neon' : roi > 100 ? 'text-yellow-400' : 'text-brand-red'}`}>
                  {roi}%
                </span>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: Users,     val: children.toLocaleString('pl-PL'), label: 'dzieci/rok',         color: 'text-brand-neon' },
                { icon: Trophy,    val: playersTop5,                      label: 'zawodników TOP 5',  color: 'text-yellow-400' },
                { icon: TrendingUp,val: `${roi}%`,                        label: 'ROI',                color: 'text-brand-cyan' },
                { icon: DollarSign,val: fmt(budgetPerYear),               label: 'budżet/rok',         color: 'text-brand-red'  },
              ].map(({ icon: Icon, val, label, color }) => (
                <div key={label} className="bg-black/40 rounded-xl p-3 text-center border border-white/5">
                  <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                  <div className={`font-black text-sm ${color}`}>{val}</div>
                  <div className="text-gray-600 text-[10px] font-mono uppercase">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center text-gray-600 text-xs font-mono mt-6"
        >
          * Szacunki oparte na danych z Chorwacji, Portugali, Belgii. Model konserwatywny (30% odchylenia możliwe).
        </motion.p>
      </div>
    </section>
  );
}
