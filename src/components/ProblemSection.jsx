import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const PROBLEMS = [
  {
    icon: '👁️',
    label: 'Subiektywne oko trenera',
    desc: 'Talenty oceniane przez ludzkie uprzedzenia, nepotyzm i ograniczone możliwości obserwacji.',
    severity: 'critical',
  },
  {
    icon: '💸',
    label: 'Drogie, stacjonarne systemy',
    desc: 'Profesjonalna analityka dostępna tylko dla TOP klubów – Akademia Legii vs Orlik w Pcimiu.',
    severity: 'critical',
  },
  {
    icon: '🗺️',
    label: '0% widoczności terenu',
    desc: 'Żaden centralny system nie wie, ile talentów trenuje dziś na polskich Orlikach.',
    severity: 'critical',
  },
  {
    icon: '📋',
    label: 'Papierowe rekordy',
    desc: 'Karty zawodnika w segregatorach, brak historii rozwoju, dane ginące przy zmianie klubu.',
    severity: 'high',
  },
];

const SOLUTIONS = [
  {
    icon: '📡',
    label: 'LiDAR zamiast oka',
    desc: 'Obiektywne dane z czujników – biomechanika w milisekundach, nie "on mi się nie podoba".',
  },
  {
    icon: '🤖',
    label: 'AI zamiast notatnika',
    desc: 'EnsembleScorer porównuje zawodnika z 100K historycznych profili – wynik 0-100 w 2 sekundy.',
  },
  {
    icon: '🗺️',
    label: 'PostGIS mapa talentów',
    desc: 'TalentRadar: skauter wpisuje swoją lokalizację, dostaje TOP talenty w promieniu 50km.',
  },
  {
    icon: '📱',
    label: 'Smartfon = punkt dostępu',
    desc: 'Rodzic z iPhone Pro staje się mobilnym węzłem LiDAR. Infrastruktura w każdej kieszeni.',
  },
];

export default function ProblemSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="problem" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      {/* Red accent top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-red font-mono text-sm tracking-widest uppercase mb-3">
            <AlertTriangle size={14} />
            DIAGNOZA SYSTEMU
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Epoka Ciemności vs{' '}
            <span className="text-brand-neon text-glow-neon">Epoka Danych</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Tradycyjny scouting to "Dark Ages" – subiektywny, drogi, nieskalowalny.
            My budujemy infrastrukturę, która zmienia zasady gry.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Problems */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-red/20 border border-brand-red/40 rounded flex items-center justify-center">
                <AlertTriangle size={16} className="text-brand-red" />
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
                Stan Obecny — Dark Ages
              </h3>
            </div>
            <div className="space-y-3">
              {PROBLEMS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex gap-4 p-4 bg-brand-card border border-brand-red/20 hover:border-brand-red/50 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{p.icon}</span>
                  <div>
                    <div className="font-display font-bold text-white text-sm uppercase tracking-wide mb-1">
                      {p.label}
                    </div>
                    <div className="text-gray-400 text-sm leading-relaxed">{p.desc}</div>
                  </div>
                  <div className={`flex-shrink-0 w-1 self-stretch rounded ${p.severity === 'critical' ? 'bg-brand-red' : 'bg-orange-500'}`} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-neon/20 border border-brand-neon/40 rounded flex items-center justify-center">
                <CheckCircle size={16} className="text-brand-neon" />
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
                #Polska2038 — Data Age
              </h3>
            </div>
            <div className="space-y-3">
              {SOLUTIONS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex gap-4 p-4 bg-brand-card border border-brand-neon/20 hover:border-brand-neon/50 transition-colors group"
                >
                  <span className="text-2xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <div className="font-display font-bold text-brand-neon text-sm uppercase tracking-wide mb-1 group-hover:text-glow-neon">
                      {s.label}
                    </div>
                    <div className="text-gray-400 text-sm leading-relaxed">{s.desc}</div>
                  </div>
                  <div className="flex-shrink-0 w-1 self-stretch rounded bg-brand-neon" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="relative p-8 border border-brand-gold/30 bg-brand-gold/5 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="text-brand-gold" size={24} />
              <span className="text-brand-gold font-mono text-sm tracking-widest uppercase">Projekcja Wartości</span>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-display font-bold text-brand-gold text-glow-gold">1.1 MLD PLN</div>
                <div className="text-gray-400 text-sm font-mono mt-1">realizowana wartość</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-brand-neon text-glow-neon">370%</div>
                <div className="text-gray-400 text-sm font-mono mt-1">projected ROI</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-brand-cyan text-glow-cyan">5M</div>
                <div className="text-gray-400 text-sm font-mono mt-1">talentów w RT</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

