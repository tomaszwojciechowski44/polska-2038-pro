import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Download, ExternalLink, BookOpen, BarChart3, Map, Building2, Newspaper, Mail } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import { FILARY } from '../data/filaryData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const DOCS = [
  {
    icon: BookOpen,
    title: 'Executive Summary',
    desc: 'Krótkie 2-stronicowe podsumowanie całego projektu z kluczowymi faktami, budżetem i celami.',
    meta: '2 strony · 5 min czytania',
    to: '/reforma/materialy/executive-summary',
    color: 'text-brand-neon border-brand-neon/30 hover:border-brand-neon/60',
  },
  {
    icon: Newspaper,
    title: 'Briefing dla Mediów',
    desc: 'Gotowy briefing z key points, cytatami i propozycjami nagłówków dla dziennikarzy.',
    meta: '10 stron · materiał prasowy',
    to: '/reforma/materialy/briefing-media',
    color: 'text-blue-400 border-blue-500/30 hover:border-blue-500/60',
  },
  {
    icon: Map,
    title: 'Mapa Drogowa 2026–2038',
    desc: 'Szczegółowy harmonogram wdrożenia z kamieniami milowymi i etapami realizacji.',
    meta: '15 stron · harmonogram',
    to: '/reforma/materialy/roadmap-2026-2038',
    color: 'text-orange-400 border-orange-500/30 hover:border-orange-500/60',
  },
  {
    icon: BarChart3,
    title: 'Budżet Szczegółowy 2026–2035',
    desc: 'Pełny breakdown budżetu z ROI, źródłami finansowania i analizą kosztów.',
    meta: '20 stron · finanse',
    to: '/reforma/materialy/budget-2026-2035',
    color: 'text-yellow-400 border-yellow-500/30 hover:border-yellow-500/60',
  },
  {
    icon: Building2,
    title: 'Struktura Organizacyjna',
    desc: 'Schemat zarządzania projektem, podział odpowiedzialności i struktura instytucjonalna.',
    meta: '12 stron · organizacja',
    to: '/reforma/materialy/org-structure',
    color: 'text-purple-400 border-purple-500/30 hover:border-purple-500/60',
  },
  {
    icon: FileText,
    title: 'Plan Wdrożenia — Instrukcja',
    desc: 'Operacyjny plan wdrożenia krok po kroku dla Ministerstwa, PZPN i samorządów.',
    meta: '18 stron · operacyjny',
    to: '/reforma/materialy/implementation-playbook',
    color: 'text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60',
  },
  {
    icon: Mail,
    title: 'Instrukcja Wysyłki Email',
    desc: 'Gotowa treść emaila do Ministerstwa Sportu, PZPN i mediów.',
    meta: '1 strona · gotowy email',
    to: '/reforma/materialy/email-template',
    color: 'text-red-400 border-red-500/30 hover:border-red-500/60',
  },
];

export default function DokumentyPage() {
  return (
    <PublicLayout
      pageTitle="Dokumentacja"
      pageSubtitle="Wszystkie materiały projektu #Polska2038 — do druku, dystrybucji i prezentacji Ministerstwu Sportu, PZPN i mediom."
    >
      {/* Breadcrumb */}
      <div className="bg-gray-950 border-b border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm font-mono">
          <Link to="/reforma" className="text-gray-500 hover:text-white transition-colors">← Reforma</Link>
          <span className="text-gray-700">/</span>
          <span className="text-brand-neon">Dokumentacja</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-gray-900/60 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/30 rounded-full px-4 py-1.5 mb-4 text-brand-neon font-mono text-xs uppercase tracking-widest">
              <FileText className="w-4 h-4" /> Materiały do Pobrania
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">📄 Pełna Dokumentacja</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Wszystkie materiały są dostępne bezpłatnie. Mogą być wykorzystywane w publikacjach
              z podaniem źródła <span className="text-white font-semibold">"Projekt Obywatelski POLSKA 2038"</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 bg-black border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {[
              { val: '1,08 mld', label: 'zł/rok budżet' },
              { val: '370%', label: 'ROI zwrot' },
              { val: '28,50 zł', label: 'na Polaka/rok' },
              { val: '100 mld', label: 'zł różnicy' },
              { val: '2026', label: 'start pilotażu' },
              { val: '2038', label: 'Finał MŚ' },
            ].map((s) => (
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
            🏗️ Szczegółowa Dokumentacja — Trzy Filary
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {FILARY.map((f, i) => (
              <motion.div key={f.id} {...fadeUp(i * 0.1)}>
                  <Link
                  to={`/reforma/filar/${f.slug}`}
                  className={`block bg-gray-900 border ${f.color.border} rounded-2xl p-6 hover:bg-gray-800 transition-all group`}
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className={`font-black mb-1 transition-colors ${f.color.text}`}>
                    Filar {f.id}: {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{f.subtitle}</p>
                  <div className={`text-sm font-mono font-bold ${f.color.text}`}>{f.budget}</div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                    Czytaj więcej <ArrowRight className="w-3 h-3" />
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
            📚 Dodatkowe Materiały
          </motion.h2>
          <p className="text-gray-400 text-sm mb-8">Otwórz w przeglądarce → Ctrl+P → Zapisz jako PDF</p>
          <div className="grid md:grid-cols-2 gap-4">
            {DOCS.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.title}
                  {...fadeUp(i * 0.08)}
                  className="group"
                >
                  <Link
                    to={doc.to}
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
            <h2 className="text-xl font-black text-white mb-4">📞 Kontakt dla Mediów</h2>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-sm text-gray-300 space-y-2">
              <p><span className="text-white font-bold">Projekt:</span> POLSKA 2038 — Obywatelska Inicjatywa Reformy Piłki Nożnej</p>
              <p><span className="text-white font-bold">Status:</span> Projekt obywatelski, anonimowy, bezinteresowny</p>
              <p className="text-gray-500 mt-4">
                Projekt może być wykorzystany, zmodyfikowany lub wdrożony przez Ministerstwo, PZPN, kluby lub dowolną inną instytucję bez konieczności kontaktu z autorami.
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
