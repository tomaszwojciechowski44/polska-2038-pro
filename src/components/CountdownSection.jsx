import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Zap } from 'lucide-react';

function useCountdown(target) {
  const [diff, setDiff] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-black border border-white/10 rounded-xl px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[80px] text-center">
          <span className="font-mono font-black text-2xl sm:text-4xl text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mt-2">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="font-mono font-black text-2xl sm:text-3xl text-white/30 self-start mt-3">:</span>;
}

export default function CountdownSection() {
  const pilot  = new Date('2026-01-01T00:00:00').getTime();
  const final  = new Date('2038-07-19T18:00:00').getTime(); // approx World Cup final date

  const c1 = useCountdown(pilot);
  const c2 = useCountdown(final);

  return (
    <section className="py-14 bg-black border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">

          {/* Countdown 1 — Pilot 2026 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-yellow-950/40 to-black border border-yellow-700/30 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest">Start pilotażu</span>
            </div>
            <p className="text-white font-black text-lg mb-5">1 stycznia 2026 — Oficjalny start programu</p>
            <div className="flex items-start gap-2 sm:gap-3">
              <Digit value={c1.d} label="dni" />
              <Colon />
              <Digit value={c1.h} label="godz" />
              <Colon />
              <Digit value={c1.m} label="min" />
              <Colon />
              <Digit value={c1.s} label="sek" />
            </div>
            <p className="text-gray-500 text-xs font-mono mt-4">3 województwa · 50 boisk Orlik · 500 trenerów</p>
          </motion.div>

          {/* Countdown 2 — World Cup Final 2038 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-gradient-to-br from-red-950/40 to-black border border-red-700/30 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-brand-red" />
              <span className="text-brand-red font-mono text-xs uppercase tracking-widest">Cel finalny</span>
            </div>
            <p className="text-white font-black text-lg mb-5">Finał Mistrzostw Świata 2038 🏆</p>
            <div className="flex items-start gap-2 sm:gap-3">
              <Digit value={c2.d} label="dni" />
              <Colon />
              <Digit value={c2.h} label="godz" />
              <Colon />
              <Digit value={c2.m} label="min" />
              <Colon />
              <Digit value={c2.s} label="sek" />
            </div>
            <p className="text-gray-500 text-xs font-mono mt-4">
              Okno możliwości 2026–2030 · Roczniki 2010–2016 · 12 lat na budowę mistrzów
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            to="/reforma"
            className="inline-flex items-center gap-2 text-brand-neon hover:text-white font-mono text-sm transition-colors"
          >
            Zobacz pełny plan reformy →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
