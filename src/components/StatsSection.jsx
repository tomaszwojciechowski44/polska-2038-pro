import { motion } from 'framer-motion';
import { useInView, useCountUp } from '../hooks/useCountUp';
import { STATS } from '../data/systemData';

const COLOR_MAP = {
  neon: { text: 'text-brand-neon', border: 'border-brand-neon/30', glow: 'border-glow-neon', hex: '#00FF88' },
  cyan: { text: 'text-brand-cyan', border: 'border-brand-cyan/30', glow: 'border-glow-cyan', hex: '#00E5FF' },
  gold: { text: 'text-brand-gold', border: 'border-brand-gold/30', glow: 'border-glow-gold', hex: '#FFD700' },
  red:  { text: 'text-brand-red',  border: 'border-brand-red/30',  glow: 'border-glow-red',  hex: '#DC143C' },
};

// Parse value to number + suffix for count-up animation
function parseStatValue(raw) {
  const s = String(raw);
  if (s.endsWith('%'))   return { num: parseFloat(s), suffix: '%',    prefix: '' };
  if (s.endsWith('M'))   return { num: parseFloat(s), suffix: 'M',    prefix: '' };
  if (s.endsWith('K'))   return { num: parseFloat(s), suffix: 'K',    prefix: '' };
  if (s.includes('MLD')) return { num: parseFloat(s), suffix: ' MLD PLN', prefix: '' };
  if (s.includes('B'))   return { num: parseFloat(s), suffix: 'B',    prefix: '' };
  return { num: parseFloat(s) || 0, suffix: '', prefix: '' };
}

function AnimatedValue({ raw, color, inView }) {
  const { num, suffix } = parseStatValue(raw);
  const count = useCountUp(num, 2000, inView);
  const display = Number.isInteger(num) ? Math.round(count) : count.toFixed(1);
  return <span>{display}{suffix}</span>;
}

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
      {/* Animated corner bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ backgroundColor: colors.hex }}
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
      />

      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className={`text-3xl sm:text-4xl font-display font-bold ${colors.text} mb-1`}>
        {inView ? <AnimatedValue raw={stat.value} color={colors} inView={inView} /> : <span>0</span>}
      </div>
      <div className="text-gray-400 text-sm font-mono leading-tight">{stat.label}</div>

      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${colors.border.replace('/30', '')}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${colors.border.replace('/30', '')}`} />
    </motion.div>
  );
}

// Live ticker strip
const TICKER_ITEMS = [
  '5M talentów objętych systemem',
  '10,000 zintegrowanych klubów',
  '22 zawodników/węzeł/sekundę',
  '94% accuracy modelu AI',
  '1.1 MLD PLN realizowana wartość',
  '370% Projected ROI',
  '<50ms latencja danych',
  'RODO-Compliant — zero wideo',
  '100K profili historycznych w AI',
  'Deployment: GovCloud PL',
];

function LiveTicker() {
  return (
    <div className="overflow-hidden border-y border-brand-border/40 bg-brand-dark/60 py-2 mt-12">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="text-xs font-mono text-gray-500 flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-brand-neon flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
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

        <LiveTicker />
      </div>
    </section>
  );
}
