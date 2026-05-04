import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Activity, Cpu, Wifi, Shield, Zap, Database } from 'lucide-react';

const EVENT_POOL = [
  { type: 'talent', msg: 'Nowy talent wykryty', detail: 'Orlik Rzeszów-Południe • Score: 94', color: 'neon' },
  { type: 'scan',   msg: 'Skan zakończony',      detail: 'Orlik Gdańsk-Zaspa • 18 zawodników', color: 'cyan' },
  { type: 'ai',    msg: 'Scoring AI — kompletny', detail: 'EnsembleScorer v3.1 • latencja 43ms', color: 'gold' },
  { type: 'alert', msg: 'Top talent: 97/100',    detail: 'Orlik Kraków-NH • Jan K., 13 lat', color: 'red' },
  { type: 'node',  msg: 'Węzeł online',           detail: 'LiDAR-4821 • Wrocław-Psie Pole', color: 'neon' },
  { type: 'scout', msg: 'Skaut połączony',        detail: 'PZPN Region Śląsk • API auth OK', color: 'cyan' },
  { type: 'talent', msg: 'Nowy profil — 91/100', detail: 'Orlik Warszawa-Białołęka • K. Marta, 11', color: 'neon' },
  { type: 'ai',    msg: 'Model retrenowany',      detail: 'Federated round #3821 • +0.2% acc', color: 'gold' },
  { type: 'scan',  msg: 'Biomechanika zapisana',  detail: 'Orlik Katowice-N • 22 zawodników', color: 'cyan' },
  { type: 'alert', msg: 'Top talent: 96/100',    detail: 'Orlik Poznań-Rataje • P. Kamil, 14', color: 'red' },
];

const generateEvent = () => ({ ...EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)], id: Date.now() + Math.random() });

const BASE_METRICS = [
  { label: 'API calls / sek',         base: 12847, variance: 400,  color: 'neon', icon: Zap },
  { label: 'Aktywne węzły LiDAR',     base: 487,   variance: 3,    color: 'cyan', icon: Wifi },
  { label: 'Zawodników skanowanych',  base: 23419,  variance: 180,  color: 'gold', icon: Activity },
  { label: 'Zapytania AI / min',       base: 3241,  variance: 130,  color: 'red',  icon: Cpu },
];

const SERVICES = [
  { label: 'API Gateway',     status: 100, color: 'neon' },
  { label: 'AI Engine',       status: 98,  color: 'gold' },
  { label: 'LiDAR Mesh',      status: 94,  color: 'cyan' },
  { label: 'PostGIS DB',      status: 100, color: 'neon' },
  { label: 'Kafka Streams',   status: 99,  color: 'cyan' },
  { label: 'GovCloud PL',     status: 100, color: 'neon' },
];

const colorClass = {
  neon: { text: 'text-brand-neon', border: 'border-brand-neon/30', bg: 'bg-brand-neon/5', bar: 'bg-brand-neon', borderL: 'border-brand-neon' },
  cyan: { text: 'text-brand-cyan', border: 'border-brand-cyan/30', bg: 'bg-brand-cyan/5', bar: 'bg-brand-cyan', borderL: 'border-brand-cyan' },
  gold: { text: 'text-brand-gold', border: 'border-brand-gold/30', bg: 'bg-brand-gold/5', bar: 'bg-brand-gold', borderL: 'border-brand-gold' },
  red:  { text: 'text-brand-red',  border: 'border-brand-red/30',  bg: 'bg-brand-red/5',  bar: 'bg-brand-red',  borderL: 'border-brand-red' },
};

export default function LiveSystemSection() {
  const [ref, inView] = useInView(0.1);
  const [events, setEvents] = useState(() => Array.from({ length: 7 }, generateEvent));
  const [metrics, setMetrics] = useState(BASE_METRICS.map(m => ({ ...m, val: m.base })));
  const [talentsToday, setTalentsToday] = useState(1247);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setEvents(prev => [generateEvent(), ...prev.slice(0, 7)]);
      setMetrics(prev =>
        prev.map(m => ({ ...m, val: m.base + Math.floor((Math.random() - 0.5) * m.variance) }))
      );
      setTalentsToday(prev => prev + Math.floor(Math.random() * 3));
    }, 2200);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section id="system-live" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-brand-neon font-mono text-sm tracking-widest uppercase mb-3">
            <span className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
            INFRASTRUCTURE STATUS — LIVE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Mission Control:{' '}
            <span className="text-brand-neon text-glow-neon">System Online</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Dane z infrastruktury w czasie rzeczywistym. Każda wartość aktualizuje się co 2 sekundy.
          </p>
        </motion.div>

        {/* Top: talents today hero stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 border-2 border-brand-neon/40 bg-brand-neon/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-neon to-transparent" />
          <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">
            // talenty_wykryte_dzisiaj
          </div>
          <motion.div
            key={talentsToday}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl sm:text-7xl font-display font-bold text-brand-neon text-glow-neon tabular-nums"
          >
            {talentsToday.toLocaleString('pl-PL')}
          </motion.div>
          <div className="text-white font-display font-bold text-lg mt-1">
            nowych talentów wykrytych dziś przez system AI
          </div>
          <div className="text-gray-600 font-mono text-xs mt-2">
            Dane demo — symulacja produkcyjna 487 węzłów LiDAR
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left + center: metrics + health */}
          <div className="lg:col-span-2 space-y-5">

            {/* 4 live metric cards */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => {
                const Icon = m.icon;
                const c = colorClass[m.color];
                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className={`p-5 border relative overflow-hidden ${c.border} ${c.bg}`}
                  >
                    <div className={`flex items-center gap-2 mb-3 ${c.text}`}>
                      <Icon size={13} />
                      <span className="text-[11px] font-mono uppercase tracking-wide">{m.label}</span>
                    </div>
                    <motion.div
                      key={m.val}
                      initial={{ opacity: 0.6, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`text-3xl font-display font-bold tabular-nums ${c.text}`}
                    >
                      {m.val.toLocaleString('pl-PL')}
                    </motion.div>
                    {/* Sparkle indicator */}
                    <motion.div
                      className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${c.bar}`}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* System health grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-5 border border-brand-border bg-brand-card"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-widest">
                  <Shield size={12} />
                  System Health — 6 serwisów
                </div>
                <span className="text-brand-neon text-xs font-mono font-bold">
                  Uptime: 99.97%
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SERVICES.map((svc, i) => {
                  const c = colorClass[svc.color];
                  return (
                    <div key={svc.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-gray-500 text-xs font-mono">{svc.label}</span>
                        <span className={`text-xs font-mono font-bold ${c.text}`}>{svc.status}%</span>
                      </div>
                      <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${c.bar}`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${svc.status}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.6 + i * 0.07 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tech badges */}
              <div className="mt-5 pt-4 border-t border-brand-border flex flex-wrap gap-2">
                {['FastAPI 0.111', 'PostgreSQL 16', 'Kafka 3.7', 'K8s 1.30', 'ONNX Runtime', 'Flower FL'].map(t => (
                  <span key={t} className="px-2 py-1 border border-brand-border text-gray-600 text-[10px] font-mono rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Live event feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="border border-brand-border bg-brand-card flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-brand-border">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-widest">
                <Database size={11} />
                Live Event Stream
              </div>
              <span className="flex items-center gap-1.5 text-brand-neon text-[10px] font-mono">
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
                LIVE
              </span>
            </div>

            <div className="flex-1 overflow-hidden p-3 space-y-2">
              <AnimatePresence mode="popLayout">
                {events.map((ev) => {
                  const c = colorClass[ev.color];
                  return (
                    <motion.div
                      key={ev.id}
                      layout
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      className={`p-3 border-l-2 ${c.borderL} ${c.bg}`}
                    >
                      <div className={`text-xs font-mono font-bold ${c.text}`}>{ev.msg}</div>
                      <div className="text-gray-600 text-[10px] font-mono mt-0.5 leading-snug">{ev.detail}</div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="p-3 border-t border-brand-border text-center">
              <span className="text-gray-700 text-[10px] font-mono">
                Dane demo — model produkcyjny na 487 węzłach
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
