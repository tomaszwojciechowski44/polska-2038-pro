import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const COLOR = {
  teal:   { border: 'border-brand-neon/30', bg: 'bg-brand-neon/5', text: 'text-brand-neon' },
  blue:   { border: 'border-brand-cyan/30', bg: 'bg-brand-cyan/5', text: 'text-brand-cyan' },
  amber:  { border: 'border-brand-gold/30', bg: 'bg-brand-gold/5', text: 'text-brand-gold' },
  purple: { border: 'border-purple-400/30', bg: 'bg-purple-400/5', text: 'text-purple-400' },
};

export default function PersonaRouting() {
  const { t } = useLanguage();
  const cards = t?.personas?.cards || [];

  const decorated = [
    { color: 'teal' },
    { color: 'blue' },
    { color: 'amber' },
    { color: 'purple' },
  ].map((d, i) => ({ ...d, ...(cards[i] || {}) }));

  return (
    <section className="py-14 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-white font-display font-bold text-3xl sm:text-4xl">
            {t?.personas?.title}
          </div>
          <p className="mt-3 text-gray-500 font-mono text-sm max-w-2xl mx-auto">
            {t?.personas?.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {decorated.map((p, i) => {
            const c = COLOR[p.color] || COLOR.teal;
            return (
              <motion.a
                key={p.id || i}
                href={p.href || '#modules'}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`block p-5 border ${c.border} ${c.bg} hover:border-white/20 hover:bg-white/[0.03] transition-all`}
              >
                <div className={`text-xs font-mono uppercase tracking-widest ${c.text}`}>
                  {p.title}
                </div>
                <div className="mt-2 text-gray-400 font-mono text-xs leading-relaxed">
                  {p.desc}
                </div>
                <div className={`mt-4 text-[10px] font-mono uppercase tracking-widest ${c.text}`}>
                  Go →
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

