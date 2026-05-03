import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { ChevronRight, Cpu, Layers, CheckCircle } from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/systemData';

const COLOR_CLASSES = {
  neon: {
    border: 'border-brand-neon',
    bg: 'bg-brand-neon/10',
    text: 'text-brand-neon',
    badge: 'bg-brand-neon/20 text-brand-neon border-brand-neon/40',
    glow: 'border-glow-neon',
    line: 'bg-brand-neon',
  },
  cyan: {
    border: 'border-brand-cyan',
    bg: 'bg-brand-cyan/10',
    text: 'text-brand-cyan',
    badge: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    glow: 'border-glow-cyan',
    line: 'bg-brand-cyan',
  },
  gold: {
    border: 'border-brand-gold',
    bg: 'bg-brand-gold/10',
    text: 'text-brand-gold',
    badge: 'bg-brand-gold/20 text-brand-gold border-brand-gold/40',
    glow: 'border-glow-gold',
    line: 'bg-brand-gold',
  },
  red: {
    border: 'border-brand-red',
    bg: 'bg-brand-red/10',
    text: 'text-brand-red',
    badge: 'bg-brand-red/20 text-brand-red border-brand-red/40',
    glow: 'border-glow-red',
    line: 'bg-brand-red',
  },
};

function SidePanel({ layer, onClose }) {
  const [tab, setTab] = useState('tech');
  const c = COLOR_CLASSES[layer.color];

  const TABS = [
    { id: 'tech', label: '⚙️ Technologie' },
    { id: 'how', label: '🔄 Jak działa' },
    { id: 'req', label: '📋 Wymagania' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-brand-card border-l-4 ${c.border} h-full overflow-y-auto`}
    >
      {/* Header */}
      <div className={`sticky top-0 z-10 p-5 border-b border-brand-border ${c.bg} backdrop-blur-sm`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className={`text-xs font-mono tracking-widest uppercase ${c.text} mb-1`}>
              {layer.label}
            </div>
            <div className="text-xl font-display font-bold text-white leading-tight">{layer.title}</div>
            <div className={`text-sm font-mono ${c.text} mt-1`}>{layer.subtitle}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 border text-xs font-mono rounded ${c.badge}`}>
              {layer.kpi}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white border border-brand-border hover:border-gray-500 transition-colors rounded"
            >
              ✕
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-3 leading-relaxed">{layer.description}</p>

        {/* Tabs */}
        <div className="flex gap-1 mt-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 px-2 py-2 text-xs font-mono transition-colors rounded ${
                tab === t.id ? `${c.bg} ${c.text} border ${c.border}` : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {tab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {layer.technologies.map((tech, i) => (
                <div key={i} className={`p-4 border ${c.border}/30 bg-brand-dark/50 hover:${c.bg} transition-colors`}>
                  <div className={`font-display font-bold text-sm ${c.text} uppercase tracking-wide mb-1`}>
                    {tech.name}
                  </div>
                  <div className="text-gray-400 text-xs leading-relaxed font-mono">{tech.desc}</div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'how' && (
            <motion.div
              key="how"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {layer.howItWorks.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border ${c.border} flex items-center justify-center text-xs font-mono ${c.text}`}>
                    {i + 1}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed font-mono">{step}</p>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'req' && (
            <motion.div
              key="req"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {layer.requirements.map((req, i) => (
                <div key={i} className="flex gap-3 p-3 border border-brand-border bg-brand-dark/30">
                  <CheckCircle size={14} className={`flex-shrink-0 mt-0.5 ${c.text}`} />
                  <p className="text-gray-300 text-xs leading-relaxed font-mono">{req}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function LayerBar({ layer, isActive, onClick, index }) {
  const c = COLOR_CLASSES[layer.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 group ${
        isActive ? `border-2 ${c.border} ${c.bg} ${c.glow}` : 'border border-brand-border bg-brand-card hover:border-gray-600'
      }`}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.line}`} />

      <div className="flex items-center gap-4 p-5 pl-6">
        {/* Icon */}
        <div className={`w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0 border ${
          isActive ? `${c.border} ${c.bg}` : 'border-brand-border'
        }`}>
          {layer.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-mono tracking-widest uppercase mb-0.5 ${c.text}`}>
            {layer.label}
          </div>
          <div className={`text-lg font-display font-bold ${isActive ? c.text : 'text-white'} leading-tight`}>
            {layer.title}
          </div>
          <div className="text-gray-500 text-xs font-mono mt-0.5">{layer.subtitle}</div>
        </div>

        {/* Tech tags - hidden on mobile */}
        <div className="hidden lg:flex flex-wrap gap-1 max-w-xs">
          {layer.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech.name}
              className={`px-2 py-0.5 border text-xs font-mono rounded ${isActive ? c.badge : 'border-brand-border text-gray-600'}`}
            >
              {tech.name.split(' ')[0]}
            </span>
          ))}
        </div>

        {/* KPI */}
        <div className="text-right flex-shrink-0">
          <div className={`text-xl font-display font-bold ${c.text}`}>{layer.kpi}</div>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={18}
          className={`flex-shrink-0 transition-transform ${isActive ? `rotate-90 ${c.text}` : 'text-gray-600'}`}
        />
      </div>
    </motion.div>
  );
}

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [ref, inView] = useInView(0.05);

  const handleLayerClick = (layer) => {
    setActiveLayer(activeLayer?.id === layer.id ? null : layer);
  };

  // Reversed for bottom-up display
  const reversedLayers = [...ARCHITECTURE_LAYERS].reverse();

  return (
    <section id="architektura" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm tracking-widest uppercase mb-3">
            <Layers size={14} />
            ARCHITEKTURA SYSTEMU
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            4 Warstwy.{' '}
            <span className="text-brand-cyan text-glow-cyan">Jeden System.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Kliknij w warstwę, aby zobaczyć technologie, mechanizm działania i wymagania.
          </p>
        </motion.div>

        <div className={`flex gap-6 transition-all duration-300 ${activeLayer ? 'lg:gap-8' : ''}`}>
          {/* Layers stack */}
          <div className={`flex-1 transition-all duration-300 ${activeLayer ? 'lg:w-1/2' : 'w-full'}`}>
            {/* Bottom-up label */}
            <div className="flex items-center gap-3 mb-4">
              <Cpu size={14} className="text-gray-600" />
              <span className="text-gray-600 text-xs font-mono tracking-widest uppercase">
                Od Fundacji do Interfejsu (dół → góra)
              </span>
            </div>

            <div className="space-y-2">
              {reversedLayers.map((layer, i) => (
                <LayerBar
                  key={layer.id}
                  layer={layer}
                  isActive={activeLayer?.id === layer.id}
                  onClick={() => handleLayerClick(layer)}
                  index={i}
                />
              ))}
            </div>

            {/* Flow arrows between layers */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
              <div className="flex-1 h-px bg-brand-border" />
              <span className="text-xs font-mono tracking-widest">DANE PRZEPŁYWAJĄ OD DK WARSTWY 1 → 4</span>
              <div className="flex-1 h-px bg-brand-border" />
            </div>
          </div>

          {/* Side panel */}
          <AnimatePresence>
            {activeLayer && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden lg:block lg:w-[400px] xl:w-[460px] flex-shrink-0"
              >
                <SidePanel layer={activeLayer} onClose={() => setActiveLayer(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile side panel (bottom sheet) */}
        <AnimatePresence>
          {activeLayer && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="lg:hidden fixed inset-x-0 bottom-0 z-50 h-3/4 bg-brand-card rounded-t-2xl border-t border-brand-border shadow-2xl overflow-hidden"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full" />
              <SidePanel layer={activeLayer} onClose={() => setActiveLayer(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {activeLayer && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setActiveLayer(null)}
          />
        )}
      </div>
    </section>
  );
}

