import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const POLAND_PATH = [
  'M 30,97',
  'C 34,85 65,62 92,50',
  'C 118,38 155,28 188,20',
  'L 218,14',
  'C 235,8 258,9 280,14',
  'L 315,18',
  'L 388,14',
  'L 438,48',
  'L 452,84',
  'L 454,168',
  'L 460,226',
  'L 436,268',
  'L 456,338',
  'L 422,363',
  'L 392,398',
  'L 328,414',
  'L 254,414',
  'L 208,390',
  'L 157,360',
  'L 89,330',
  'L 70,310',
  'L 55,232',
  'L 40,152',
  'L 28,118',
  'Z',
].join(' ');

const MAP_L = 28, MAP_T = 10, MAP_W = 432, MAP_H = 405; // for 500×430 viewBox
function toSvgPoint(v) {
  return { cx: MAP_L + (v.x ?? 0) * MAP_W, cy: MAP_T + (v.y ?? 0) * MAP_H };
}

function dotRadius(count, max) {
  if (!max) return 6;
  return 5 + (count / max) * 14;
}

function dotColor(count, max) {
  if (!max) return '#00E5FF';
  const r = count / max;
  if (r > 0.65) return '#00FF88';
  if (r > 0.35) return '#FFD700';
  return '#00E5FF';
}

export default function VoivodeshipMapCard({
  voivodeships = [],
  onSelect,
  title = 'Mapa talentów (panel)',
  subtitle = 'Kliknij województwo, aby filtrować tabelę poniżej.',
}) {
  const [selected, setSelected] = useState(null);

  const max = useMemo(
    () => voivodeships.reduce((m, v) => Math.max(m, v.talent_count ?? 0), 0),
    [voivodeships]
  );

  const selectedVoiv = useMemo(
    () => voivodeships.find((v) => v.code === selected) ?? null,
    [voivodeships, selected]
  );

  return (
    <div className="border border-brand-border bg-brand-card rounded-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-brand-cyan" />
          <div>
            <div className="text-white font-display font-bold text-sm">{title}</div>
            <div className="text-gray-500 font-mono text-[10px]">{subtitle}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            onSelect?.('');
          }}
          className="px-3 py-1.5 border border-brand-border text-gray-400 hover:text-white hover:border-gray-500 font-mono text-[10px] rounded-sm transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 p-2 bg-[#030d0f]">
          <svg
            viewBox="0 0 500 430"
            className="w-full"
            style={{ display: 'block', height: 320 }}
            aria-label="Mapa województw — kliknij aby filtrować"
          >
            <defs>
              <radialGradient id="panelMapBg" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#001a1a" stopOpacity="0" />
              </radialGradient>
              <filter id="panelDotGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="500" height="430" fill="url(#panelMapBg)" />

            <path d={POLAND_PATH} fill="rgba(0,229,255,0.05)" />
            <path d={POLAND_PATH} fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="4" />
            <path d={POLAND_PATH} fill="none" stroke="rgba(0,229,255,0.55)" strokeWidth="1.2" />

            {voivodeships.map((v) => {
              const count = v.talent_count ?? 0;
              const { cx, cy } = toSvgPoint(v);
              const r = dotRadius(count, max);
              const isSelected = selected === v.code;
              const color = isSelected ? '#00FF88' : dotColor(count, max);

              return (
                <g
                  key={v.code}
                  onClick={() => {
                    const next = isSelected ? null : v.code;
                    setSelected(next);
                    onSelect?.(next ?? '');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={cx} cy={cy} r={r * 1.9} fill={color} opacity="0.10" filter="url(#panelDotGlow)" />
                  <circle cx={cx} cy={cy} r={r} fill={color} opacity={isSelected ? 1 : 0.85} stroke={color} strokeWidth="1" />
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.max(9, Math.min(12, r * 0.7))}
                    fill={color}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="800"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {v.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="p-4 border-t lg:border-t-0 lg:border-l border-brand-border bg-brand-dark">
          <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
            Wybrane województwo
          </div>
          <div className="mt-1 text-white font-display font-bold text-lg">
            {selectedVoiv?.name ?? 'Wszystkie'}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-mono text-xs">Kod</span>
              <span className="text-gray-300 font-mono font-bold">{selectedVoiv?.code ?? '—'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-mono text-xs">Talenty</span>
              <span className="text-brand-neon font-display font-bold">
                {(selectedVoiv?.talent_count ?? 0).toLocaleString('pl-PL')}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 border border-brand-border bg-brand-card rounded-sm text-gray-500 font-mono text-[11px]"
          >
            Tip: klik w kropkę ustawia filtr `voivodeship` i odświeża listę talentów.
          </motion.div>
        </div>
      </div>
    </div>
  );
}

