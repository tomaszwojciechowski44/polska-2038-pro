import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Flag, Clock } from 'lucide-react';
import { ROADMAP } from '../data/systemData';

const STATUS_STYLES = {
  done: { dot: 'bg-brand-neon', border: 'border-brand-neon/40', badge: 'text-brand-neon bg-brand-neon/10', label: 'GOTOWE' },
  active: { dot: 'bg-brand-cyan animate-pulse', border: 'border-brand-cyan/60', badge: 'text-brand-cyan bg-brand-cyan/10', label: 'W TOKU' },
  planned: { dot: 'bg-gray-600', border: 'border-brand-border', badge: 'text-gray-500 bg-gray-800', label: 'PLANOWANE' },
  vision: { dot: 'bg-brand-gold animate-pulse', border: 'border-brand-gold/40', badge: 'text-brand-gold bg-brand-gold/10', label: 'WIZJA' },
};

// Urgency milestones
const MILESTONES = [
  { label: 'Architektura systemu', date: 'Q4 2025', done: true },
  { label: 'JESTEŚMY TUTAJ', date: 'Maj 2026', active: true },
  { label: '500 węzłów LiDAR', date: 'Q2 2026', done: false },
  { label: 'Euro 2028 — selekcja kadry', date: '2028', done: false, urgent: true },
  { label: 'MŚ 2030 — deadline systemu', date: '2030', done: false, urgent: true },
  { label: '#Polska2038 — FINAL', date: '2038', done: false, vision: true },
];

function UrgencyBanner() {
  // Days to Euro 2028 (June 14, 2028)
  const euro2028 = new Date('2028-06-14');
  const now = new Date();
  const daysLeft = Math.ceil((euro2028 - now) / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30);

  return (
    <div className="mb-14 p-6 border-2 border-brand-red/60 bg-brand-red/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-brand-red to-transparent" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-brand-red flex-shrink-0" />
          <div>
            <div className="text-brand-red font-display font-bold text-lg uppercase tracking-wide">
              Okno wdrożeniowe zamyka się
            </div>
            <div className="text-gray-400 text-sm font-mono">
              Aby zdążyć z pilotażem przed Euro 2028 — działamy teraz.
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {[
            { val: daysLeft.toLocaleString('pl-PL'), label: 'dni do Euro 2028', color: 'text-brand-red' },
            { val: monthsLeft, label: 'miesięcy na pilotaż', color: 'text-brand-gold' },
            { val: '6', label: 'mies. wdrozenie', color: 'text-brand-neon' },
          ].map((c) => (
            <div key={c.label} className="text-center">
              <div className={`text-2xl font-display font-bold ${c.color}`}>{c.val}</div>
              <div className="text-gray-600 text-[10px] font-mono whitespace-nowrap">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineStrip({ inView }) {
  return (
    <div className="mb-16 overflow-x-auto">
      <div className="min-w-[600px] flex items-center gap-0 relative py-6">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-brand-border" />
        {MILESTONES.map((m, i) => (
          <div key={m.label} className="flex-1 flex flex-col items-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 300 }}
              className={`w-4 h-4 rounded-full border-2 border-brand-dark relative z-10 ${
                m.active ? 'bg-brand-cyan w-6 h-6 ring-4 ring-brand-cyan/30' :
                m.done ? 'bg-brand-neon' :
                m.vision ? 'bg-brand-gold' :
                m.urgent ? 'bg-brand-red/60' :
                'bg-brand-border'
              }`}
            >
              {m.active && (
                <span className="absolute inset-0 rounded-full bg-brand-cyan animate-ping opacity-50" />
              )}
            </motion.div>
            <div className="mt-2 text-center px-1">
              <div className={`text-[10px] font-mono font-bold ${
                m.active ? 'text-brand-cyan' :
                m.done ? 'text-brand-neon' :
                m.vision ? 'text-brand-gold' :
                m.urgent ? 'text-brand-red' :
                'text-gray-600'
              }`}>{m.date}</div>
              <div className={`text-[9px] font-mono leading-tight mt-0.5 max-w-[80px] ${
                m.active ? 'text-white font-bold' : 'text-gray-600'
              }`}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

        <UrgencyBanner />
        <TimelineStrip inView={inView} />
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

