import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Flag } from 'lucide-react';
import { ROADMAP } from '../data/systemData';

const STATUS_STYLES = {
  done: { dot: 'bg-brand-neon', border: 'border-brand-neon/40', badge: 'text-brand-neon bg-brand-neon/10', label: 'GOTOWE' },
  active: { dot: 'bg-brand-cyan animate-pulse', border: 'border-brand-cyan/60', badge: 'text-brand-cyan bg-brand-cyan/10', label: 'W TOKU' },
  planned: { dot: 'bg-gray-600', border: 'border-brand-border', badge: 'text-gray-500 bg-gray-800', label: 'PLANOWANE' },
  vision: { dot: 'bg-brand-gold animate-pulse', border: 'border-brand-gold/40', badge: 'text-brand-gold bg-brand-gold/10', label: 'WIZJA' },
};

export default function RoadmapSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="roadmap" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Flag size={14} />
            ROADMAP WDROŻENIA
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Od Pilotażu do{' '}
            <span className="text-brand-gold text-glow-gold">Mistrzostwa Świata</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-brand-border" />

          <div className="space-y-8">
            {ROADMAP.map((phase, i) => {
              const s = STATUS_STYLES[phase.status];
              const isRight = i % 2 === 0;

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-14 sm:pl-0 ${isRight ? 'sm:pr-12' : 'sm:pl-12'} ${isRight ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className={`inline-block p-5 border ${s.border} bg-brand-dark/80 hover:bg-brand-dark transition-colors max-w-sm w-full`}>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-white font-display font-bold text-lg">{phase.phase}</span>
                        <span className={`px-2 py-0.5 text-xs font-mono rounded ${s.badge}`}>{s.label}</span>
                      </div>
                      <div className={`font-display font-bold text-sm uppercase tracking-widest mb-3 ${
                        phase.status === 'vision' ? 'text-brand-gold' :
                        phase.status === 'active' ? 'text-brand-cyan' :
                        phase.status === 'done' ? 'text-brand-neon' : 'text-gray-400'
                      }`}>
                        {phase.title}
                      </div>
                      <ul className="space-y-1">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-400 font-mono">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 sm:left-1/2 top-6 -translate-x-1/2 flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full border-2 border-brand-dark ${s.dot}`} />
                  </div>

                  {/* Empty spacer for opposite side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

