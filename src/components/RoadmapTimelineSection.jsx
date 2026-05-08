import { motion } from 'framer-motion';
import { Flag, Rocket, MapPin, Trophy } from 'lucide-react';

const MILESTONES = [
  {
    q: 'Q3 2025',
    title: 'Pilotaż 5 Orlików',
    desc: 'Pierwsze wdrożenie: skan + scoring + raport skautingowy. Walidacja w terenie.',
    color: 'neon',
    icon: Rocket,
  },
  {
    q: 'Q2 2026',
    title: 'Regionalny rollout',
    desc: '16 województw online. Mapy TalentRadar + standard operacyjny dla skautów.',
    color: 'cyan',
    icon: MapPin,
  },
  {
    q: '2030',
    title: '100 000 profili',
    desc: 'Stabilne pipeline’y: Digital Twin + progresja AI Score. Zasilanie akademii.',
    color: 'gold',
    icon: Flag,
  },
  {
    q: '2034',
    title: '1 000 000 profili',
    desc: 'Skala krajowa + federated learning. Spójna baza talentów dla całej Polski.',
    color: 'cyan',
    icon: Rocket,
  },
  {
    q: '2038',
    title: 'Finał MŚ: Polska 2038',
    desc: 'Cel programu: pipeline talentów domyka się na najwyższym poziomie.',
    color: 'red',
    icon: Trophy,
  },
];

const C = {
  neon: { t: 'text-brand-neon', b: 'border-brand-neon/30', bg: 'bg-brand-neon/5' },
  cyan: { t: 'text-brand-cyan', b: 'border-brand-cyan/30', bg: 'bg-brand-cyan/5' },
  gold: { t: 'text-brand-gold', b: 'border-brand-gold/30', bg: 'bg-brand-gold/5' },
  red: { t: 'text-brand-red', b: 'border-brand-red/30', bg: 'bg-brand-red/5' },
};

export default function RoadmapTimelineSection() {
  return (
    <section id="roadmap" className="py-20 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-red/30 bg-brand-red/5 text-brand-red font-mono text-xs uppercase tracking-widest">
            Timeline wdrożenia
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-white">
            Kiedy to wejdzie u nas?
          </h2>
          <p className="mt-3 text-gray-500 font-mono text-sm max-w-2xl mx-auto">
            Konkretne kamienie milowe od pilotażu do celu 2038.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {MILESTONES.map((m, i) => {
            const Icon = m.icon;
            const cc = C[m.color];
            return (
              <motion.div
                key={m.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`p-5 border ${cc.b} ${cc.bg}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${cc.t}`}>{m.q}</span>
                  <Icon size={16} className={cc.t} />
                </div>
                <div className="text-white font-display font-bold text-lg leading-tight">{m.title}</div>
                <p className="mt-2 text-gray-400 font-mono text-xs leading-relaxed">{m.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

