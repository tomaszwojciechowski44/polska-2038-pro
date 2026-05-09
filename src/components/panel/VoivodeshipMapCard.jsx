import { useEffect, useMemo, useState } from 'react';
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

const MAP_L = 28,
  MAP_T = 10,
  MAP_W = 432,
  MAP_H = 405;

/** Approximate voivodeship seats (lon, lat) — used only to pair GeoJSON features with API codes. */
const VOIV_REF_LONLAT = {
  MZ: [21.0122, 52.2297],
  MA: [19.945, 50.0647],
  SL: [19.0238, 50.2649],
  WP: [16.9265, 52.4064],
  DS: [17.0385, 51.1079],
  LD: [19.456, 51.7592],
  LU: [22.5684, 51.2465],
  PK: [22.0045, 50.0412],
  PM: [18.6466, 54.352],
  KP: [18.0084, 53.1235],
  ZP: [14.5528, 53.4285],
  LB: [15.5062, 51.9355],
  WN: [20.4801, 53.7784],
  PD: [23.1688, 53.1325],
  SK: [20.6286, 50.8717],
  OP: [17.9355, 50.6751],
};

function toSvgPoint(v) {
  return { cx: MAP_L + (v.x ?? 0) * MAP_W, cy: MAP_T + (v.y ?? 0) * MAP_H };
}

function ringCentroid(ring) {
  let sx = 0,
    sy = 0;
  for (const [lon, lat] of ring) {
    sx += lon;
    sy += lat;
  }
  const n = ring.length;
  return { lon: sx / n, lat: sy / n };
}

/** Signed area (planar lon/lat); for ordering draw: smaller regions on top. */
function ringArea(ring) {
  let a = 0;
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    a += ring[i][0] * ring[j][1] - ring[j][0] * ring[i][1];
  }
  return Math.abs(a / 2);
}

function assignGreedyMin(centroids, refByCode) {
  const codes = Object.keys(refByCode);
  const usedF = new Set();
  const usedC = new Set();
  const featIndexToCode = new Array(centroids.length);

  for (let iter = 0; iter < centroids.length; iter++) {
    let best = null;
    for (let i = 0; i < centroids.length; i++) {
      if (usedF.has(i)) continue;
      for (const code of codes) {
        if (usedC.has(code)) continue;
        const [lo, la] = refByCode[code];
        const d = (centroids[i].lon - lo) ** 2 + (centroids[i].lat - la) ** 2;
        if (!best || d < best.d) best = { i, code, d };
      }
    }
    usedF.add(best.i);
    usedC.add(best.code);
    featIndexToCode[best.i] = best.code;
  }
  return featIndexToCode;
}

/** Least squares: target = c0*lon + c1*lat + c2 */
function fitAffineLonLat(rows) {
  const AtA = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const Atb = [0, 0, 0];
  for (const [lon, lat, target] of rows) {
    const v = [lon, lat, 1];
    for (let j = 0; j < 3; j++) {
      Atb[j] += v[j] * target;
      for (let k = 0; k < 3; k++) {
        AtA[j][k] += v[j] * v[k];
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    let piv = i;
    for (let r = i + 1; r < 3; r++) {
      if (Math.abs(AtA[r][i]) > Math.abs(AtA[piv][i])) piv = r;
    }
    [AtA[i], AtA[piv]] = [AtA[piv], AtA[i]];
    [Atb[i], Atb[piv]] = [Atb[piv], Atb[i]];
    const div = AtA[i][i];
    if (Math.abs(div) < 1e-12) return [0, 0, 0];
    for (let c = i; c < 3; c++) AtA[i][c] /= div;
    Atb[i] /= div;
    for (let r = 0; r < 3; r++) {
      if (r === i) continue;
      const f = AtA[r][i];
      for (let c = i; c < 3; c++) AtA[r][c] -= f * AtA[i][c];
      Atb[r] -= f * Atb[i];
    }
  }
  return Atb;
}

function makeProjector(voivodeships, featureCentroids, featIndexToCode) {
  const rowsX = [];
  const rowsY = [];
  for (let i = 0; i < featureCentroids.length; i++) {
    const code = featIndexToCode[i];
    const v = voivodeships.find((x) => x.code === code);
    if (!v) continue;
    const { cx, cy } = toSvgPoint(v);
    const { lon, lat } = featureCentroids[i];
    rowsX.push([lon, lat, cx]);
    rowsY.push([lon, lat, cy]);
  }
  if (rowsX.length < 3) return null;
  const ax = fitAffineLonLat(rowsX);
  const ay = fitAffineLonLat(rowsY);
  return (lon, lat) => ({
    x: ax[0] * lon + ax[1] * lat + ax[2],
    y: ay[0] * lon + ay[1] * lat + ay[2],
  });
}

function ringToPath(ring, project) {
  if (!ring.length) return '';
  const p0 = project(ring[0][0], ring[0][1]);
  let d = `M ${p0.x} ${p0.y}`;
  for (let i = 1; i < ring.length; i++) {
    const p = project(ring[i][0], ring[i][1]);
    d += ` L ${p.x} ${p.y}`;
  }
  d += ' Z';
  return d;
}

function regionFillColor(count, max) {
  if (!max) return 'rgba(0, 229, 255, 0.22)';
  const r = count / max;
  if (r > 0.65) return 'rgba(0, 255, 136, 0.28)';
  if (r > 0.35) return 'rgba(255, 215, 0, 0.26)';
  return 'rgba(0, 229, 255, 0.22)';
}

function tierAccentColor(count, max, isSelected) {
  if (isSelected) return '#00FF88';
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
  subtitle = 'Kliknij województwo na mapie, aby filtrować tabelę poniżej.',
}) {
  const [selected, setSelected] = useState(null);
  const [geoState, setGeoState] = useState({ status: 'idle', regions: null });

  const max = useMemo(
    () => voivodeships.reduce((m, v) => Math.max(m, v.talent_count ?? 0), 0),
    [voivodeships]
  );

  const selectedVoiv = useMemo(
    () => voivodeships.find((v) => v.code === selected) ?? null,
    [voivodeships, selected]
  );

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL || '/';

    (async () => {
      try {
        const res = await fetch(`${base}geo/wojewodztwa-min.geojson`);
        if (!res.ok) throw new Error(String(res.status));
        const fc = await res.json();
        const features = fc?.features ?? [];
        if (features.length !== 16) throw new Error('expected 16 voivodeship features');

        const centroids = features.map((f) => ringCentroid(f.geometry.coordinates[0]));
        const featIndexToCode = assignGreedyMin(centroids, VOIV_REF_LONLAT);

        setGeoState((prev) => {
          if (cancelled) return prev;
          return { status: 'pending', regions: null, featIndexToCode, features, centroids };
        });
      } catch {
        if (!cancelled) setGeoState({ status: 'error', regions: null });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (geoState.status !== 'pending' || !geoState.features || !voivodeships.length) return;

    const { features, centroids, featIndexToCode } = geoState;
    const project = makeProjector(voivodeships, centroids, featIndexToCode);
    if (!project) {
      setGeoState({ status: 'error', regions: null });
      return;
    }

    const regions = [];
    for (let i = 0; i < features.length; i++) {
      const code = featIndexToCode[i];
      const ring = features[i].geometry.coordinates[0];
      const path = ringToPath(ring, project);
      regions.push({ code, path, area: ringArea(ring) });
    }
    regions.sort((a, b) => a.area - b.area);

    setGeoState({ status: 'ok', regions });
  }, [geoState, voivodeships]);

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
            aria-label="Mapa województw — kliknij region aby filtrować"
          >
            <defs>
              <radialGradient id="panelMapBg" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#001a1a" stopOpacity="0" />
              </radialGradient>
              <filter id="panelRegionGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="500" height="430" fill="url(#panelMapBg)" />

            <path d={POLAND_PATH} fill="rgba(0,229,255,0.03)" />
            <path d={POLAND_PATH} fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="4" />
            <path d={POLAND_PATH} fill="none" stroke="rgba(0,229,255,0.45)" strokeWidth="1.2" />

            {geoState.status === 'ok' &&
              geoState.regions?.map(({ code, path }) => {
                const v = voivodeships.find((x) => x.code === code);
                const count = v?.talent_count ?? 0;
                const isSelected = selected === code;
                const fill = isSelected ? 'rgba(0, 255, 136, 0.38)' : regionFillColor(count, max);
                const stroke = isSelected ? 'rgba(0, 255, 136, 0.95)' : 'rgba(0, 229, 255, 0.35)';
                const sw = isSelected ? 2.2 : 1;

                return (
                  <path
                    key={code}
                    d={path}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={sw}
                    vectorEffect="non-scaling-stroke"
                    filter={isSelected ? 'url(#panelRegionGlow)' : undefined}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const next = isSelected ? null : code;
                      setSelected(next);
                      onSelect?.(next ?? '');
                    }}
                  />
                );
              })}

            {voivodeships.map((v) => {
              const count = v.talent_count ?? 0;
              const { cx, cy } = toSvgPoint(v);
              const isSelected = selected === v.code;
              const color = tierAccentColor(count, max, isSelected);
              const fs = 11;

              return (
                <text
                  key={`lbl-${v.code}`}
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={fs}
                  fill={color}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="800"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {v.code}
                </text>
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
            {geoState.status === 'error'
              ? 'Nie udało się wczytać granic województw (GeoJSON). Odśwież stronę lub sprawdź sieć.'
              : geoState.status === 'idle' || geoState.status === 'pending'
                ? 'Ładowanie granic województw…'
                : 'Tip: klik w obszar województwa ustawia filtr `voivodeship` i odświeża listę talentów.'}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
