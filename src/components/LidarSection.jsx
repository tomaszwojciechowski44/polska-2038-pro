import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Smartphone, Radio, Cloud, ChevronDown } from 'lucide-react';
import { LIDAR_LEVELS } from '../data/systemData';

const LEVEL_ICONS = [<Smartphone size={20} />, <Radio size={20} />, <Cloud size={20} />];

function LidarNode({ level, index, active, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      onClick={onClick}
      className={`relative cursor-pointer p-6 border transition-all duration-300 ${
        active
          ? 'border-brand-neon bg-brand-neon/10 border-glow-neon'
          : 'border-brand-border bg-brand-card hover:border-brand-neon/40'
      }`}
    >
      {/* Level number */}
      <div className={`absolute top-3 right-3 text-xs font-mono ${active ? 'text-brand-neon' : 'text-gray-600'}`}>
        POZIOM {index + 1}
      </div>

      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded border ${
          active ? 'border-brand-neon/50 bg-brand-neon/10' : 'border-brand-border'
        }`}>
          {level.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-display font-bold text-lg mb-1 ${active ? 'text-brand-neon' : 'text-white'}`}>
            {level.title}
          </div>
          <div className="text-gray-400 text-sm leading-relaxed">{level.desc}</div>
        </div>
        <div className={`flex-shrink-0 mt-1 transition-transform ${active ? 'rotate-180' : ''}`}>
          <ChevronDown size={16} className={active ? 'text-brand-neon' : 'text-gray-600'} />
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-brand-neon/20"
          >
            <p className="text-brand-cyan text-sm font-mono leading-relaxed">{level.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Animated LiDAR visualization
function LidarVisualization() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      {/* Concentric rings */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-brand-neon/20"
          style={{ margin: `${i * 10}%` }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
      ))}

      {/* Central mast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-6 h-6 bg-brand-neon rounded-full"
          animate={{ boxShadow: ['0 0 10px #00FF88', '0 0 30px #00FF88', '0 0 10px #00FF88'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Rotating scan ray */}
      <motion.div
        className="absolute top-1/2 left-1/2 origin-left"
        style={{ width: '45%', height: '2px', marginTop: '-1px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full bg-gradient-to-r from-brand-neon to-transparent opacity-80" />
      </motion.div>

      {/* Player dots */}
      {[
        { angle: 30, dist: 70 }, { angle: 80, dist: 55 }, { angle: 130, dist: 75 },
        { angle: 200, dist: 60 }, { angle: 260, dist: 70 }, { angle: 310, dist: 50 },
        { angle: 350, dist: 65 }, { angle: 170, dist: 45 },
      ].map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = 50 + (p.dist / 2) * Math.cos(rad);
        const y = 50 + (p.dist / 2) * Math.sin(rad);
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-cyan rounded-full -translate-x-1 -translate-y-1"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
          />
        );
      })}

      {/* Labels */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-brand-neon/60 text-xs font-mono">
        LIVE SCAN
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-brand-cyan/60 text-xs font-mono">
        22 zawodników
      </div>
    </div>
  );
}

export default function LidarSection() {
  const [activeLevel, setActiveLevel] = useState(1);
  const [ref, inView] = useInView(0.1);

  const toggle = (idx) => setActiveLevel(activeLevel === idx ? null : idx);

  return (
    <section id="lidar" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-neon font-mono text-sm tracking-widest uppercase mb-3">
            <Radio size={14} />
            CASE STUDY: INFRASTRUKTURA W KAŻDEJ KIESZENI
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            LiDAR:{' '}
            <span className="text-brand-neon text-glow-neon">Trzy Poziomy</span>
            {' '}Zasięgu
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Od smartfona rodzica, przez autonomiczny węzeł na maszcie,
            aż po centralną chmurę danych — każdy punkt Polski pod kontrolą.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <LidarVisualization />

            {/* Data specs below */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { val: '<50ms', label: 'Latencja danych' },
                { val: '1mm', label: 'Dokładność 3D' },
                { val: '0%', label: 'Nagrywanie wideo' },
              ].map((spec) => (
                <div key={spec.label} className="p-3 border border-brand-border bg-brand-dark/50">
                  <div className="text-brand-neon font-mono font-bold text-lg">{spec.val}</div>
                  <div className="text-gray-500 text-xs font-mono mt-1">{spec.label}</div>
                </div>
              ))}
            </div>

            {/* RODO badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 px-3 py-2 bg-brand-card border border-brand-gold/50 text-brand-gold text-xs font-mono"
            >
              🛡️ RODO-Compliant<br />
              <span className="text-gray-500">Zero wideo</span>
            </motion.div>
          </motion.div>

          {/* Level accordions */}
          <div className="space-y-3">
            {LIDAR_LEVELS.map((level, i) => (
              <LidarNode
                key={level.id}
                level={level}
                index={i}
                active={activeLevel === i}
                onClick={() => toggle(i)}
              />
            ))}

            {/* Algorithm filter box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="p-6 border border-brand-gold/30 bg-brand-gold/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔬</span>
                <div className="font-display font-bold text-brand-gold uppercase tracking-wide">
                  Algorytmiczny Filtr
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dane z obu poziomów trafiają do chmury #Polska2038, gdzie algorytm
                <strong className="text-white"> odcina błąd ludzki i subiektywizm</strong>.
                Trener dostaje obiektywny profil zawodnika, którego{' '}
                <span className="text-brand-gold">nie da się sfałszować "na oko"</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

