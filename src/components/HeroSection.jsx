import { motion } from 'framer-motion';
import { ArrowDown, Zap, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Animated particle dot
function Particle({ x, y, delay, color }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: color }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: Math.random() * 4 }}
    />
  );
}

const PARTICLES = [
  { x: 10, y: 20, color: '#00FF88' }, { x: 85, y: 15, color: '#00E5FF' },
  { x: 30, y: 70, color: '#DC143C' }, { x: 70, y: 60, color: '#00FF88' },
  { x: 50, y: 30, color: '#FFD700' }, { x: 20, y: 85, color: '#00E5FF' },
  { x: 90, y: 50, color: '#DC143C' }, { x: 15, y: 45, color: '#FFD700' },
  { x: 60, y: 90, color: '#00FF88' }, { x: 40, y: 10, color: '#00E5FF' },
  { x: 75, y: 35, color: '#DC143C' }, { x: 55, y: 75, color: '#FFD700' },
];

export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-dark">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-neon/5 rounded-full blur-3xl" />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} delay={i * 0.3} />
      ))}

      {/* Scan line */}
      <div className="scan-line" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-brand-neon/30 bg-brand-neon/5 rounded-full"
        >
          <span className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
          <span className="text-brand-neon font-mono text-xs tracking-widest uppercase">
            {h.badge}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-bold leading-none mb-4"
        >
          <span className="block text-5xl sm:text-7xl lg:text-9xl text-white">
            {h.h1a}
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-9xl text-brand-red text-glow-red">
            {h.h1b}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-gray-300 mb-6 tracking-wide"
        >
          {h.tagline1}{' '}
          <span className="text-brand-neon text-glow-neon">{h.tagline2}</span>{' '}
          {h.tagline3}
        </motion.p>

        {/* Sub description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-mono"
        >
          {h.sub}
        </motion.p>

        {/* Pill stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { icon: <Zap size={14} />, label: '5M zawodników', color: 'neon' },
            { icon: <Shield size={14} />, label: '10K zintegrowanych klubów', color: 'cyan' },
            { icon: <Globe size={14} />, label: '1.1 MLD PLN wartość', color: 'gold' },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-4 py-2 bg-brand-card border rounded-full text-sm font-mono ${
                item.color === 'neon' ? 'border-brand-neon/40 text-brand-neon' :
                item.color === 'cyan' ? 'border-brand-cyan/40 text-brand-cyan' :
                'border-brand-gold/40 text-brand-gold'
              }`}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {[
            { emoji: '⚽', name: 'PZPN', detail: 'rozmowy o pilotażu', color: 'text-brand-neon' },
            { emoji: '🏛️', name: 'MSiT', detail: 'pilotaż 50 Orlików', color: 'text-brand-red' },
            { emoji: '🏆', name: 'UEFA', detail: 'obserwuje projekt', color: 'text-brand-gold' },
            { emoji: '🌍', name: 'FIFA', detail: 'kontakt nawiązany', color: 'text-brand-cyan' },
            { emoji: '⭐', name: 'Lewandowski', detail: 'ambasador projektu', color: 'text-brand-gold' },
          ].map(p => (
            <div key={p.name} className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border/60 bg-brand-card/40 backdrop-blur-sm">
              <span className="text-sm">{p.emoji}</span>
              <span className={`font-mono font-bold text-xs ${p.color}`}>{p.name}</span>
              <span className="text-gray-600 font-mono text-[10px]">— {p.detail}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#architektura"
            className="px-8 py-4 bg-brand-red text-white font-display font-bold text-lg uppercase tracking-widest hover:bg-red-700 transition-all duration-200 border-glow-red"
          >
            {h.cta1}
          </a>
          <a
            href="#lidar"
            className="px-8 py-4 border-2 border-brand-neon text-brand-neon font-display font-bold text-lg uppercase tracking-widest hover:bg-brand-neon hover:text-brand-dark transition-all duration-200"
          >
            {h.cta2}
          </a>
        </motion.div>

        {/* Hero visual — LiDAR field visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative mx-auto w-full max-w-3xl h-48 sm:h-64 border border-brand-neon/20 rounded-lg overflow-hidden bg-brand-card/50 backdrop-blur-sm"
        >
          {/* Field outline */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 300">
            <rect x="50" y="20" width="700" height="260" fill="none" stroke="#00FF88" strokeWidth="1.5" />
            <line x1="400" y1="20" x2="400" y2="280" stroke="#00FF88" strokeWidth="0.8" />
            <circle cx="400" cy="150" r="60" fill="none" stroke="#00FF88" strokeWidth="0.8" />
            <rect x="50" y="100" width="80" height="100" fill="none" stroke="#00FF88" strokeWidth="0.8" />
            <rect x="670" y="100" width="80" height="100" fill="none" stroke="#00FF88" strokeWidth="0.8" />
          </svg>

          {/* LiDAR dots — players */}
          {[
            { cx: '20%', cy: '40%', color: '#00FF88', score: 94 },
            { cx: '35%', cy: '65%', color: '#00E5FF', score: 87 },
            { cx: '50%', cy: '30%', color: '#FFD700', score: 91 },
            { cx: '65%', cy: '55%', color: '#00FF88', score: 78 },
            { cx: '80%', cy: '40%', color: '#DC143C', score: 72 },
            { cx: '45%', cy: '70%', color: '#00E5FF', score: 83 },
            { cx: '25%', cy: '75%', color: '#FFD700', score: 89 },
            { cx: '72%', cy: '25%', color: '#00FF88', score: 95 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: dot.cx, top: dot.cy }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              <div
                className="w-4 h-4 rounded-full -translate-x-2 -translate-y-2 flex items-center justify-center text-[7px] font-bold font-mono text-black"
                style={{ backgroundColor: dot.color, boxShadow: `0 0 8px ${dot.color}` }}
              >
                {dot.score}
              </div>
              <div
                className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 lidar-dot"
                style={{ backgroundColor: dot.color }}
              />
            </motion.div>
          ))}

          {/* HUD overlay */}
          <div className="absolute top-3 left-3 font-mono text-xs text-brand-neon/70">
            LIDAR SCAN • LIVE
          </div>
          <div className="absolute top-3 right-3 font-mono text-xs text-brand-neon/70">
            22 ZAWODNIKÓW AKTYWNYCH
          </div>
          <div className="absolute bottom-3 left-3 font-mono text-xs text-brand-cyan/70">
            Orlik Rzeszów-Południe • 51.1°N 22.0°E
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-xs font-mono rounded">
              ● LIVE
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}

