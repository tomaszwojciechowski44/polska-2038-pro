import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight, TrendingUp, Clock, Target, Star, HelpCircle } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import { FILARY } from '../data/filaryData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function FilarDetailPage() {
  const { id } = useParams();
  const filar = FILARY.find((f) => f.slug === id);

  if (!filar) return <Navigate to="/reforma" replace />;

  const prevFilar = FILARY.find((f) => f.id === filar.id - 1);
  const nextFilar = FILARY.find((f) => f.id === filar.id + 1);
  const c = filar.color;

  return (
    <PublicLayout
      pageTitle={`Filar ${filar.id}: ${filar.title}`}
      pageSubtitle={filar.subtitle}
    >
      {/* Back breadcrumb */}
      <div className="bg-gray-950 border-b border-gray-800 py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-2 text-sm font-mono">
          <Link to="/reforma" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Reforma
          </Link>
          <span className="text-gray-700">/</span>
          <span className={c.text}>Filar {filar.id}: {filar.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className={`py-16 bg-gradient-to-b ${c.bg} to-black`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 ${c.badge} border ${c.border} rounded-full px-4 py-1.5 mb-4 text-sm font-mono uppercase tracking-widest`}>
              {filar.icon} Filar {filar.id} z 3
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              {filar.icon} {filar.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">{filar.subtitle}</p>
            {filar.warning && (
              <div className="inline-block bg-yellow-900/30 border border-yellow-600/40 rounded-2xl px-6 py-3 text-yellow-300 text-sm font-semibold">
                {filar.warning}
              </div>
            )}
          </motion.div>

          {/* Key numbers */}
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Budżet', val: filar.budget },
              { label: 'ROI', val: filar.roi },
              { label: 'Filar', val: `${filar.id} / 3` },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className={`text-xl font-black ${c.text}`}>{s.val}</div>
                <div className="text-gray-500 text-xs font-mono mt-1 uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Goal */}
      <section className="py-10 bg-black border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp(0)} className={`flex items-start gap-4 bg-gradient-to-r ${c.bg} to-transparent border ${c.border} rounded-2xl p-6`}>
            <Target className={`w-7 h-7 ${c.text} flex-shrink-0 mt-1`} />
            <div>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">Główny cel</p>
              <p className="text-white text-lg font-bold">{filar.goal}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget table */}
      <section className="py-14 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <TrendingUp className={`w-6 h-6 ${c.text}`} /> Szczegółowy Budżet
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-mono text-xs uppercase py-3 pr-4">Kategoria</th>
                    <th className="text-right text-gray-400 font-mono text-xs uppercase py-3 px-4 whitespace-nowrap">Budżet</th>
                    <th className="text-left text-gray-400 font-mono text-xs uppercase py-3 pl-4 hidden md:table-cell">Opis</th>
                  </tr>
                </thead>
                <tbody>
                  {filar.budgetTable.map((row, i) => (
                    <tr key={i} className="border-b border-gray-800 hover:bg-white/2 transition-colors">
                      <td className="py-3 pr-4 text-white font-medium">{row.name}</td>
                      <td className={`py-3 px-4 text-right font-black ${c.text} whitespace-nowrap`}>{row.amount}</td>
                      <td className="py-3 pl-4 text-gray-400 text-sm hidden md:table-cell">{row.desc}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-600">
                    <td className="py-3 pr-4 text-white font-black">ŁĄCZNIE</td>
                    <td className={`py-3 px-4 text-right font-black text-xl ${c.text}`}>{filar.budget}</td>
                    <td className="py-3 pl-4 hidden md:table-cell" />
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Components */}
      <section className="py-14 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-black text-white mb-8">
            🎯 Szczegółowy Opis Komponentów
          </motion.h2>
          <div className="space-y-6">
            {filar.components.map((comp, i) => (
              <motion.div key={comp.number} {...fadeUp(i * 0.08)}
                className={`bg-gray-900 border ${c.border} rounded-2xl p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full ${c.dot} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                    {comp.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">{comp.title}</h3>
                    <p className={`text-sm ${c.text} mb-4 font-medium`}>🎯 Cel: {comp.goal}</p>
                    <ul className="space-y-2">
                      {comp.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                          <CheckCircle className={`w-4 h-4 ${c.text} flex-shrink-0 mt-0.5`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-14 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-400" /> ROI — Zwrot z Inwestycji
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {filar.roi_items.map((r) => (
                <div key={r.label} className="bg-gray-900 border border-yellow-700/30 rounded-xl p-4 text-center">
                  <div className="text-xl font-black text-yellow-400 mb-1">{r.value}</div>
                  <div className="text-gray-400 text-xs">{r.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-5 text-center">
              <p className="text-xl font-black text-yellow-300">{filar.roi_summary}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-14 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <Star className={`w-6 h-6 ${c.text}`} /> Konkretne Rezultaty
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {filar.results.map((r) => (
                <div key={r} className="flex items-start gap-3 bg-gray-900 border border-gray-700 rounded-xl p-4">
                  <CheckCircle className={`w-5 h-5 ${c.text} flex-shrink-0 mt-0.5`} />
                  <span className="text-gray-200 text-sm">{r}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison (Filar 2 only) */}
      {filar.comparison && (
        <section className="py-14 bg-gray-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-2xl font-black text-white mb-6">📊 Porównanie Międzynarodowe</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      {['Kraj', 'Udział rodzin', 'Incydenty/sezon', 'Ocena'].map((h) => (
                        <th key={h} className="text-left text-gray-400 font-mono text-xs uppercase py-3 pr-6">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filar.comparison.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-800 ${row.country.includes('cel') ? 'bg-blue-950/20' : ''}`}>
                        <td className="py-3 pr-6 text-white font-medium">{row.country}</td>
                        <td className="py-3 pr-6 text-gray-300">{row.families}</td>
                        <td className="py-3 pr-6 text-gray-300">{row.incidents}</td>
                        <td className="py-3 pr-6 text-gray-300">{row.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ (Filar 3 only) */}
      {filar.faq && (
        <section className="py-14 bg-gray-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-green-400" /> FAQ
              </h2>
              <div className="space-y-4">
                {filar.faq.map((item, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.08)} className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                    <p className="text-white font-bold mb-2">❓ {item.q}</p>
                    <p className="text-gray-300 text-sm">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="py-14 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-brand-cyan" /> Timeline Wdrożenia
            </h2>
            <div className="space-y-3">
              {filar.timeline.map((t, i) => (
                <motion.div key={t.year} {...fadeUp(i * 0.07)}
                  className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4"
                >
                  <div className={`text-lg font-black ${c.text} w-16 flex-shrink-0 font-mono`}>{t.year}</div>
                  <div className={`w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
                  <p className="text-gray-200 text-sm">{t.milestone}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-14 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl font-black text-white mb-6">🔑 Kluczowe Zalety</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {filar.advantages.map((a) => (
                <div key={a} className={`flex items-start gap-3 bg-gradient-to-r ${c.bg} to-transparent border ${c.border} rounded-xl p-4`}>
                  <CheckCircle className={`w-5 h-5 ${c.text} flex-shrink-0 mt-0.5`} />
                  <span className="text-gray-200 text-sm">{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation between pillars */}
      <section className="py-10 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {prevFilar ? (
              <Link to={`/reforma/filar/${prevFilar.slug}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> {prevFilar.icon} Filar {prevFilar.id}
              </Link>
            ) : <div />}

            <Link to="/reforma"
              className="text-gray-400 hover:text-white transition-colors font-mono text-sm"
            >
              ↑ Powrót do Reformy
            </Link>

            {nextFilar ? (
              <Link to={`/reforma/filar/${nextFilar.slug}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-sm font-medium"
              >
                Filar {nextFilar.id} {nextFilar.icon} <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
