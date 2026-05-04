import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, ChevronRight } from 'lucide-react';

const TIER_STYLES = {
  ELITE:    { border: 'border-brand-neon/40', activeBorder: 'border-brand-neon', bg: 'bg-brand-neon/5',  text: 'text-brand-neon',  badge: 'bg-brand-neon/20 text-brand-neon border-brand-neon/40',   hex: '#00FF88' },
  PROSPECT: { border: 'border-brand-cyan/40', activeBorder: 'border-brand-cyan', bg: 'bg-brand-cyan/5',  text: 'text-brand-cyan',  badge: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',   hex: '#00E5FF' },
  MONITOR:  { border: 'border-brand-gold/40', activeBorder: 'border-brand-gold', bg: 'bg-brand-gold/5',  text: 'text-brand-gold',  badge: 'bg-brand-gold/20 text-brand-gold border-brand-gold/40',   hex: '#FFD700' },
};

function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const lastPt = pts[pts.length - 1].split(',');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx={Number(lastPt[0])} cy={Number(lastPt[1])} r="3" fill={color} />
    </svg>
  );
}

export default function TalentCard({ talent, active, onClick }) {
  const c = TIER_STYLES[talent.ai_tier] || TIER_STYLES.MONITOR;

  const metrics = [
    { l: 'Start 0-10m',    v: Math.round(talent.sprint_0_10m * 10) },
    { l: 'Czas reakcji',   v: Math.round(talent.reaction_time * 10) },
    { l: 'Eksplozywność',  v: Math.round(talent.explosiveness * 10) },
    { l: 'Balans osi',     v: Math.round(talent.balance_score * 10) },
    { l: 'Technika',       v: Math.round(talent.technique_score * 10) },
  ];

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer border transition-all duration-300 rounded-sm
        ${active ? `${c.activeBorder} ${c.bg}` : `${c.border} bg-brand-card hover:${c.activeBorder}`}`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm flex-shrink-0 ${c.border} ${c.text}`}>
            {talent.first_name?.[0]}{talent.last_name_initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-[10px] font-mono font-bold border rounded ${c.badge}`}>
                {talent.ai_tier}
              </span>
              <span className="text-gray-500 text-xs font-mono">{talent.sport}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs font-mono truncate">
              <MapPin size={10} className="flex-shrink-0" />
              {talent.lidar_node || talent.voivodeship_code}
            </div>
            <div className="text-gray-600 text-[10px] font-mono">
              {talent.voivodeship_code} &bull; {talent.age} lat &bull; skany: {talent.scan_date || '—'}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-3xl font-display font-bold ${c.text}`}>{talent.ai_score}</div>
            <div className="text-gray-600 text-[10px] font-mono">AI Score</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-[10px] font-mono mb-1">Progresja AI Score</div>
            <Sparkline
              data={talent.score_history?.map((h) => h.score) || [talent.ai_score]}
              color={c.hex}
            />
          </div>
          <ChevronRight
            size={16}
            className={`transition-transform ${active ? `rotate-90 ${c.text}` : 'text-gray-600'}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-brand-border/50 p-4 sm:p-5 space-y-4"
          >
            <div className="space-y-2">
              <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-2">
                Biomechanika — Profil Centylowy
              </div>
              {metrics.map((m, i) => (
                <div key={m.l}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-gray-400 text-xs font-mono">{m.l}</span>
                    <span className={`text-xs font-mono font-bold ${c.text}`}>{m.v} centyl</span>
                  </div>
                  <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: c.hex }}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.v}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {talent.ai_note && (
              <div className={`p-3 border rounded-sm ${active ? `border-${c.hex}/20` : 'border-brand-border'} bg-brand-dark/60`}>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={10} className={c.text} />
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${c.text}`}>
                    AI Raport Skautingowy
                  </span>
                </div>
                <p className="text-gray-300 text-xs font-mono leading-relaxed">{talent.ai_note}</p>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button className={`flex-1 py-2 border text-xs font-mono font-bold uppercase tracking-wide transition-all ${c.border} ${c.text} hover:bg-opacity-20 rounded-sm`}>
                Kontakt ze skautem →
              </button>
              <button className="px-3 py-2 border border-brand-border text-gray-500 hover:text-white text-xs font-mono transition-colors rounded-sm">
                PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
