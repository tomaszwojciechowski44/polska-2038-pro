import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { GitBranch, ExternalLink, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: '\u26a1',
    title: 'Open Data',
    desc: 'Ka\u017cdy talent ma prawo by\u0107 zauwa\u017cony \u2013 niezale\u017cnie od miejsca urodzenia. Dane s\u0105 publiczne tam, gdzie prawo pozwala.',
    color: 'neon',
  },
  {
    icon: '\ud83d\udd12',
    title: 'Privacy First',
    desc: 'Zero nagra\u0144 wideo. Tylko chmury punkt\u00f3w 3D. RODO Art. 25 \u2013 Privacy by Design od pierwszego commita.',
    color: 'cyan',
  },
  {
    icon: '\ud83c\uddf5\ud83c\uddf1',
    title: 'Polska Suwerenno\u015b\u0107',
    desc: 'Infrastruktura hostowana na GovCloud PL. Dane sportowe Polak\u00f3w pozostaj\u0105 w Polsce.',
    color: 'red',
  },
  {
    icon: '\ud83c\udf31',
    title: 'MIT Open Core',
    desc: 'Rdze\u0144 modeli AI i API dost\u0119pny na licencji MIT. Nauka i uczelnie korzystaj\u0105 za darmo.',
    color: 'gold',
  },
];

const TECH_PILLARS = [
  { name: 'LiDAR 3D', desc: 'Zbieranie danych', icon: '\ud83d\udce1' },
  { name: 'FastAPI', desc: 'Backend RT', icon: '\u26a1' },
  { name: 'PostgreSQL + PostGIS', desc: 'Geodane', icon: '\ud83d\uddfa\ufe0f' },
  { name: 'scikit-learn', desc: 'EnsembleAI', icon: '\ud83e\udde0' },
  { name: 'React 18', desc: 'Dashboard', icon: '\ud83d\udda5\ufe0f' },
  { name: 'Kubernetes', desc: 'Infrastruktura', icon: '\u2638\ufe0f' },
  { name: 'Apache Kafka', desc: 'Streaming 1M/s', icon: '\ud83c\udf0a' },
  { name: 'Docker', desc: 'Deployment', icon: '\ud83d\udc33' },
];

export default function AboutSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="o-projekcie" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm tracking-widest uppercase mb-3">
            <Heart size={14} />
            O PROJEKCIE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Misja:{' '}
            <span className="text-brand-cyan text-glow-cyan">
              \u017baden Talent Nie Umknie
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
            #Polska2038 to inicjatywa techniczna buduj\u0105ca narodowy system wykrywania talent\u00f3w sportowych.
            \u0141\u0105czymy najta\u0144sz\u0105 technologi\u0119 skanowania 3D ze sztuczn\u0105 inteligencj\u0105, \u017ceby ka\u017cdy
            6-latek na Orliku w Pcimiu mia\u0142 tak\u0105 sam\u0105 szans\u0119 jak dziecko w Akademii Legii.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`p-6 border relative group transition-all duration-300 ${
                v.color === 'neon'
                  ? 'border-brand-neon/20 bg-brand-neon/5 hover:border-brand-neon/50'
                  : v.color === 'cyan'
                  ? 'border-brand-cyan/20 bg-brand-cyan/5 hover:border-brand-cyan/50'
                  : v.color === 'red'
                  ? 'border-brand-red/20 bg-brand-red/5 hover:border-brand-red/50'
                  : 'border-brand-gold/20 bg-brand-gold/5 hover:border-brand-gold/50'
              }`}
            >
              <div
                className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${
                  v.color === 'neon'
                    ? 'border-brand-neon'
                    : v.color === 'cyan'
                    ? 'border-brand-cyan'
                    : v.color === 'red'
                    ? 'border-brand-red'
                    : 'border-brand-gold'
                }`}
              />
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3
                className={`font-display font-bold text-lg uppercase tracking-wide mb-2 ${
                  v.color === 'neon'
                    ? 'text-brand-neon'
                    : v.color === 'cyan'
                    ? 'text-brand-cyan'
                    : v.color === 'red'
                    ? 'text-brand-red'
                    : 'text-brand-gold'
                }`}
              >
                {v.title}
              </h3>
              <p className="text-gray-400 text-sm font-mono leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
              // tech_stack.json \u2014 fundament systemu
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {TECH_PILLARS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex flex-col items-center gap-2 p-3 border border-brand-border bg-brand-card hover:border-brand-neon/30 hover:bg-brand-neon/5 transition-all cursor-default"
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="text-white text-xs font-mono font-bold text-center leading-tight">{t.name}</span>
                <span className="text-gray-600 text-[10px] font-mono text-center">{t.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="relative p-8 sm:p-12 border border-brand-red/30 bg-brand-red/5 text-center overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-[120px] font-display font-bold text-brand-red">2038</span>
          </div>

          <div className="relative">
            <div className="text-brand-red text-xs font-mono uppercase tracking-widest mb-4">
              // vision_statement.txt
            </div>
            <blockquote className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug mb-8">
              &quot;W 2038 Polska wygrywa mistrzostwa \u015bwiata nie dlatego,
              \u017ce mieli\u015bmy{' '}
              <span className="text-brand-red text-glow-red">szcz\u0119\u015bcie</span>{' '}
              &mdash; lecz dlatego, \u017ce zbudowali\u015bmy{' '}
              <span className="text-brand-neon text-glow-neon">system</span>.&quot;
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/projek-polska-2038/polska-2038-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-display font-bold text-sm uppercase tracking-widest transition-all"
              >
                <GitBranch size={16} />
                GitHub Repository
              </a>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white hover:bg-red-700 font-display font-bold text-sm uppercase tracking-widest transition-all"
              >
                <ExternalLink size={16} />
                {'\u0044\u006f\u0142\u0105\u0063z do Projektu'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

