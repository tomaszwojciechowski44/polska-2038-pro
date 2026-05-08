import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, MapPin, Layers, DollarSign, Wrench } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import ArchitectureSection from './ArchitectureSection';
import AIEngineSection from './AIEngineSection';
import GlobalMapSection from './GlobalMapSection';
import TalentMapSection from './TalentMapSection';
import ScoutDemoSection from './ScoutDemoSection';
import RoiCalculatorSection from './RoiCalculatorSection';
import KpiChartsSection from './KpiChartsSection';
import TechStackSection from './TechStackSection';

const TABS = [
  { id: 'system', label: 'System', icon: Layers, anchor: 'modules' },
  { id: 'ai', label: 'Scouting AI', icon: Cpu, anchor: 'scouting-ai' },
  { id: 'map', label: 'Mapa', icon: MapPin, anchor: 'mapa' },
  { id: 'biz', label: 'Business case', icon: DollarSign, anchor: 'business' },
  { id: 'tech', label: 'Tech stack', icon: Wrench, anchor: 'tech-stack' },
];

export default function TabbedExplorerSection() {
  const [tab, setTab] = useState('system');
  const location = useLocation();
  const navigate = useNavigate();

  const active = useMemo(() => TABS.find((t) => t.id === tab) ?? TABS[0], [tab]);

  const hashToTab = useMemo(() => ({
    '#modules': 'system',
    '#scouting-ai': 'ai',
    '#mapa': 'map',
    '#business': 'biz',
    '#tech-stack': 'tech',
  }), []);

  useEffect(() => {
    // If user clicked contextual navbar links (hash), switch to the right tab.
    const h = (location.hash || '#modules').toLowerCase();
    const next = hashToTab[h];
    if (next && next !== tab) setTab(next);
  }, [location.hash, hashToTab, tab]);

  useEffect(() => {
    // Keep URL hash in sync with active module (for highlighting + deep links).
    // Use router navigation so it works consistently in SPA.
    const targetHash = `#${active.anchor}`;
    if ((location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
      navigate({ hash: targetHash }, { replace: true });
    }
  }, [active.anchor, location.hash, navigate]);

  useEffect(() => {
    // After hash/tab changes, ensure we actually scroll to the anchor target.
    const h = (location.hash || '#modules').replace('#', '');
    const el = document.getElementById(h);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash, tab]);

  return (
    <section id="modules" className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Anchor targets for contextual navbar */}
        <div id="scouting-ai" className="scroll-mt-28" />
        <div id="mapa" className="scroll-mt-28" />
        <div id="business" className="scroll-mt-28" />
        <div id="tech-stack" className="scroll-mt-28" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-neon/30 bg-brand-neon/5 text-brand-neon font-mono text-xs uppercase tracking-widest">
            Tabbed exploration · 5 modułów
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-white">
            Kliknij swój obszar — bez scroll fatigue
          </h2>
          <p className="mt-3 text-gray-500 font-mono text-sm max-w-2xl mx-auto">
            Trener → „Scouting AI”. Prezes akademii → „Business case”. CTO PZPN → „Tech stack”.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 sticky top-16 md:top-[104px] z-30">
          {TABS.map((t) => {
            const Icon = t.icon;
            const is = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={[
                  'px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-colors',
                  'backdrop-blur-md',
                  is
                    ? 'border-brand-neon/60 bg-brand-neon/10 text-brand-neon'
                    : 'border-brand-border bg-brand-dark/60 text-gray-400 hover:text-white hover:border-gray-500',
                ].join(' ')}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={14} />
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border border-brand-border bg-brand-card/20"
        >
          {tab === 'system' && (
            <div id="system">
              <LiveBlock>
                <ArchitectureSection />
              </LiveBlock>
            </div>
          )}

          {tab === 'ai' && (
            <div id="scouting-ai">
              <LiveBlock>
                <AIEngineSection />
                <ScoutDemoSection />
              </LiveBlock>
            </div>
          )}

          {tab === 'map' && (
            <div id="mapa">
              <LiveBlock>
                <GlobalMapSection />
                <TalentMapSection />
              </LiveBlock>
            </div>
          )}

          {tab === 'biz' && (
            <div id="business">
              <LiveBlock>
                <RoiCalculatorSection />
                <KpiChartsSection />
              </LiveBlock>
            </div>
          )}

          {tab === 'tech' && (
            <div id="tech-stack">
              <LiveBlock>
                <TechStackSection />
              </LiveBlock>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function LiveBlock({ children }) {
  // Wrapper to keep each imported section visually separated
  return (
    <div className="bg-brand-dark">
      {children}
    </div>
  );
}

