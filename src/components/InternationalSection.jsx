import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function InternationalSection() {
  const { lang, t } = useLanguage();
  if (lang !== 'en') return null;

  return (
    <section id="international" className="py-20 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center border border-brand-cyan/25 bg-brand-cyan/5 p-8"
        >
          <div className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
            International
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-white">
            {t?.international?.title}
          </h2>
          <p className="mt-4 text-gray-400 font-mono text-sm">
            {t?.international?.subtitle}
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href="/kontakt"
              className="px-6 py-3 bg-brand-cyan text-brand-dark font-display font-bold text-sm uppercase tracking-widest hover:bg-cyan-300 transition-colors"
            >
              {t?.international?.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

