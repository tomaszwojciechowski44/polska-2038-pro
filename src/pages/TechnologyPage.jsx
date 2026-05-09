import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import LidarSection from '../components/LidarSection';
import AIEngineSection from '../components/AIEngineSection';
import TechStackSection from '../components/TechStackSection';
import ArchitectureSection from '../components/ArchitectureSection';
import LiveSystemSection from '../components/LiveSystemSection';
import { useLanguage } from '../context/LanguageContext';

function ReformaCallout() {
  const { lang, localePath } = useLanguage();
  return (
    <section className="py-14 bg-gradient-to-r from-red-950/50 via-black to-red-950/50 border-y border-red-800/30">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Trophy className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          {lang === 'en' ? 'Want to see the reform plan?' : 'Chcesz zobaczyć plan reformy?'}
        </h2>
        <p className="text-gray-400 mb-6">
          {lang === 'en'
            ? 'Three pillars, a 1.08B PLN/year budget, a 2026–2038 timeline, and a public brief for the Ministry of Sport.'
            : 'Trzy filary reformy piłki nożnej, budżet 1,08 mld zł/rok, timeline 2026–2038 i komunikat dla Ministerstwa Sportu.'}
        </p>
        <Link
          to={localePath('/')}
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-600/30"
        >
          <Trophy className="w-5 h-5" /> {lang === 'en' ? 'View the reform plan →' : 'Zobacz Plan Reformy →'}
        </Link>
      </div>
    </section>
  );
}

export default function TechnologyPage() {
  const { t, lang, localePath } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.technology?.title ?? 'Technologia'}
      pageSubtitle={t?.pages?.technology?.subtitle ?? ''}
    >
      {lang === 'en' ? (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">English technical docs</h2>
            <p className="mt-3 text-gray-400 font-mono text-sm leading-relaxed">
              We’re translating the full technical deep-dive (LiDAR, AI engine, architecture). For now, the reform overview is fully available in English.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Link
                to={localePath('/')}
                className="px-6 py-3 bg-brand-cyan text-brand-dark font-display font-bold text-sm uppercase tracking-wider hover:bg-cyan-300 transition-colors"
              >
                Open the English home →
              </Link>
              <Link
                to={localePath('/kontakt')}
                className="px-6 py-3 border border-brand-border text-gray-300 font-mono text-sm hover:border-brand-cyan hover:text-brand-cyan transition-colors"
              >
                Contact →
              </Link>
            </div>
          </div>
        </section>
      ) : (
      <LidarSection />
      )}
      {lang !== 'en' && (
      <AIEngineSection />
      )}
      {lang !== 'en' && (
      <TechStackSection />
      )}
      {lang !== 'en' && (
      <ArchitectureSection />
      )}
      {lang !== 'en' && (
      <LiveSystemSection />
      )}
      <ReformaCallout />
    </PublicLayout>
  );
}
