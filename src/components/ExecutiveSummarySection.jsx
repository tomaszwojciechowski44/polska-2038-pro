import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Target } from 'lucide-react';

const EXEC_METRICS = [
  { icon: '🌍', val: '5 000 000', unit: 'zawodników', sub: 'monitorowanych w czasie rzeczywistym', color: 'neon' },
  { icon: '🤖', val: '94%', unit: 'accuracy AI', sub: 'modelu EnsembleScorer', color: 'cyan' },
  { icon: '💰', val: '1,1 MLD', unit: 'PLN wartość', sub: 'zwalidowana wycena systemu', color: 'gold' },
  { icon: '⏱️', val: '<50ms', unit: 'latencja', sub: 'dane LiDAR → AI Score', color: 'red' },
  { icon: '🏟️', val: '10 000', unit: 'Orlików', sub: 'objętych siecią czujników', color: 'neon' },
  { icon: '🏆', val: '2038', unit: 'cel', sub: 'Polska Mistrzem Świata', color: 'gold' },
];

const WHY_NOW = [
  { icon: '⚽', title: 'Euro 2028', desc: 'Selekcja kadry startuje w 2026. Potrzebujemy danych JUŻ TERAZ.' },
  { icon: '🗺️', title: '99% talentów ukrytych', desc: '95% polskich miast poniżej 50K mieszkańców — poza zasięgiem klasycznego skautingu.' },
  { icon: '🇵🇱', title: 'Infrastruktura Orlików', desc: '10,000 gotowych lokalizacji — jedyna sieć tego rodzaju w Europie.' },
  { icon: '🚀', title: 'Technologia gotowa', desc: 'LiDAR w każdym iPhone Pro, 5G w 70% kraju — warunki nigdy nie były lepsze.' },
];

export default function ExecutiveSummarySection() {
  const [ref, inView] = useInView(0.08);

  return (
    <section id="executive" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-brand-neon/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-red font-mono text-sm tracking-widest uppercase mb-3">
            <Target size={14} />
            EXECUTIVE SUMMARY
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Dlaczego{' '}
            <span className="text-brand-red text-glow-red">#Polska2038</span>
            {' '}to konieczność
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Polska ma 5 milionów potencjalnych talentów sportowych. Znajdujemy zaledwie <span className="text-white font-bold">0,1% z nich</span>.
            Ten system zmienia wszystko.
          </p>
        </motion.div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {EXEC_METRICS.map((m, i) => (
            <motion.div
              key={m.unit}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className={`p-5 border text-center relative overflow-hidden ${
                m.color === 'neon' ? 'border-brand-neon/30 bg-brand-neon/5' :
                m.color === 'cyan' ? 'border-brand-cyan/30 bg-brand-cyan/5' :
                m.color === 'gold' ? 'border-brand-gold/30 bg-brand-gold/5' :
                'border-brand-red/30 bg-brand-red/5'
              }`}
            >
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className={`text-2xl font-display font-bold mb-0.5 ${
                m.color === 'neon' ? 'text-brand-neon' :
                m.color === 'cyan' ? 'text-brand-cyan' :
                m.color === 'gold' ? 'text-brand-gold' :
                'text-brand-red'
              }`}>{m.val}</div>
              <div className="text-white text-xs font-mono font-bold uppercase">{m.unit}</div>
              <div className="text-gray-600 text-[10px] font-mono mt-1 leading-tight">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Why Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <span className="text-brand-gold font-mono text-xs uppercase tracking-widest">// dlaczego_teraz — nie_za_rok</span>
            <h3 className="text-3xl font-display font-bold text-white mt-2">
              Okno możliwości zamyka się. <span className="text-brand-gold">2026 = TERAZ.</span>
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_NOW.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-6 border border-brand-border bg-brand-card hover:border-brand-gold/40 transition-all group"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-white font-display font-bold text-sm uppercase tracking-wide mb-2 group-hover:text-brand-gold transition-colors">
                  {item.title}
                </div>
                <div className="text-gray-500 text-xs font-mono leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

