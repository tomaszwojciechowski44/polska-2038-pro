import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ExternalLink, BookOpen, BarChart3, Map, Building2, Newspaper, Mail } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import { FILARY } from '../data/filaryData';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const DOC_ICONS = [BookOpen, Newspaper, Map, BarChart3, Building2, FileText, Mail];

export default function DokumentyPage() {
  const { t, localePath } = useLanguage();
  const d = t?.docsPage ?? {};
  const docItems = Array.isArray(d.items) ? d.items : [];
  const stats = Array.isArray(d.stats) ? d.stats : [];

  const pillarTitle = (f) => t?.filarDetail?.pillars?.[f.slug]?.title ?? f.title;
  const pillarSubtitle = (f) => t?.filarDetail?.pillars?.[f.slug]?.subtitle ?? f.subtitle;

  return (
    <PublicLayout
      pageTitle={t?.pages?.docs?.title ?? 'Dokumentacja'}
      pageSubtitle={t?.pages?.docs?.subtitle ?? ''}
    >
      {/* Breadcrumb */}
      <div className="bg-gray-950 border-b border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm font-mono">
          <Link to={localePath('/')} className="text-gray-500 hover:text-white transition-colors">{d.backReform}</Link>
          <span className="text-gray-700">/</span>
          <span className="text-brand-neon">{d.breadcrumbCurrent}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-gray-900/60 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/30 rounded-full px-4 py-1.5 mb-4 text-brand-neon font-mono text-xs uppercase tracking-widest">
              <FileText className="w-4 h-4" /> {d.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{d.heroTitle}</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {d.heroLeadBefore}{' '}
              <span className="text-white font-semibold">&quot;{d.heroLeadQuote}&quot;</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 bg-black border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-3 border border-gray-800">
                <div className="text-brand-neon font-black text-sm md:text-base">{s.val}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filar pages */}
      <section className="py-14 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-black text-white mb-6">
            {d.pillarsTitle}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {FILARY.map((f, i) => (
              <motion.div key={f.id} {...fadeUp(i * 0.1)}>
                  <Link
                  to={localePath(`/reforma/filar/${f.slug}`)}
                  className={`block bg-gray-900 border ${f.color.border} rounded-2xl p-6 hover:bg-gray-800 transition-all group`}
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className={`font-black mb-1 transition-colors ${f.color.text}`}>
                    {d.pillarPrefix} {f.id}: {pillarTitle(f)}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{pillarSubtitle(f)}</p>
                  <div className={`text-sm font-mono font-bold ${f.color.text}`}>{f.budget}</div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                    {d.readMore} <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Documents */}
      <section className="py-14 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-black text-white mb-2">
            {d.extraTitle}
          </motion.h2>
          <p className="text-gray-400 text-sm mb-8">{d.extraHint}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {docItems.map((doc, i) => {
              const Icon = DOC_ICONS[i] ?? FileText;
              return (
                <motion.div
                  key={doc.to}
                  {...fadeUp(i * 0.08)}
                  className="group"
                >
                  <Link
                    to={localePath(doc.to)}
                    className={`flex items-start gap-4 bg-gray-900 border ${doc.color} rounded-2xl p-5 transition-all`}
                  >
                    <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${doc.color.split(' ')[0]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-bold text-sm">{doc.title}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
                      </div>
                      <p className="text-gray-400 text-xs mt-1 mb-2">{doc.desc}</p>
                      <span className="text-gray-600 text-xs font-mono">{doc.meta}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact for media */}
      <section className="py-14 bg-black">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-xl font-black text-white mb-4">{d.mediaTitle}</h2>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-sm text-gray-300 space-y-2">
              <p><span className="text-white font-bold">{d.mediaProjectLabel}</span> {d.mediaProjectValue}</p>
              <p><span className="text-white font-bold">{d.mediaStatusLabel}</span> {d.mediaStatusValue}</p>
              <p className="text-gray-500 mt-4">
                {d.mediaFoot}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

function ArrowRight({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
