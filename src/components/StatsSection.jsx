import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { STATS } from '../data/systemData';

const COLOR_MAP = {
  neon: { text: 'text-brand-neon', border: 'border-brand-neon/30', glow: 'border-glow-neon' },
  cyan: { text: 'text-brand-cyan', border: 'border-brand-cyan/30', glow: 'border-glow-cyan' },
  gold: { text: 'text-brand-gold', border: 'border-brand-gold/30', glow: 'border-glow-gold' },
  red: { text: 'text-brand-red', border: 'border-brand-red/30', glow: 'border-glow-red' },
};

function StatCard({ stat, index }) {
  const [ref, inView] = useInView(0.3);
  const colors = COLOR_MAP[stat.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-brand-card border ${colors.border} p-6 text-center group hover:${colors.glow} transition-all duration-300 cursor-default`}
    >
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className={`text-3xl sm:text-4xl font-display font-bold ${colors.text} mb-1`}>
        {stat.value}
      </div>
      <div className="text-gray-400 text-sm font-mono leading-tight">{stat.label}</div>

      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${colors.border.replace('/30', '')}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${colors.border.replace('/30', '')}`} />
    </motion.div>
  );
}

export default function StatsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="stats" className="py-20 bg-brand-dark border-y border-brand-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">
            // system_metrics.json
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
            Liczby, które mówią same za siebie
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

