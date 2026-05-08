import PublicLayout from '../components/PublicLayout';
import StatsSection from '../components/StatsSection';
import PolandMapSection from '../components/PolandMapSection';
import GlobalMapSection from '../components/GlobalMapSection';
import TalentMapSection from '../components/TalentMapSection';
import ScoutDemoSection from '../components/ScoutDemoSection';
import { useLanguage } from '../context/LanguageContext';

export default function MapPage() {
  const { t, lang } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.talentMap?.title ?? 'Mapa Talentów'}
      pageSubtitle={t?.pages?.talentMap?.subtitle ?? ''}
    >
      <StatsSection />
      {lang === 'en' ? (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">English map demo</h2>
            <p className="mt-3 text-gray-400 font-mono text-sm leading-relaxed">
              We’re translating the full interactive map experience. The KPI tiles above are already localized.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href="/en/kontakt"
                className="px-6 py-3 bg-brand-cyan text-brand-dark font-display font-bold text-sm uppercase tracking-wider hover:bg-cyan-300 transition-colors"
              >
                Request a demo →
              </a>
              <a
                href="/en"
                className="px-6 py-3 border border-brand-border text-gray-300 font-mono text-sm hover:border-brand-cyan hover:text-brand-cyan transition-colors"
              >
                Back to home →
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          <PolandMapSection />
          <GlobalMapSection />
          <TalentMapSection />
          <ScoutDemoSection />
        </>
      )}
    </PublicLayout>
  );
}
