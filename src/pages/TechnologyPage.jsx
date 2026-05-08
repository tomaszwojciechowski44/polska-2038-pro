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
  const { lang } = useLanguage();
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
          to={lang === 'en' ? '/en' : '/'}
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-600/30"
        >
          <Trophy className="w-5 h-5" /> {lang === 'en' ? 'View the reform plan →' : 'Zobacz Plan Reformy →'}
        </Link>
      </div>
    </section>
  );
}

export default function TechnologyPage() {
  const { t } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.technology?.title ?? 'Technologia'}
      pageSubtitle={t?.pages?.technology?.subtitle ?? ''}
    >
      <LidarSection />
      <AIEngineSection />
      <TechStackSection />
      <ArchitectureSection />
      <LiveSystemSection />
      <ReformaCallout />
    </PublicLayout>
  );
}
