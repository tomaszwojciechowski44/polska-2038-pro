import PublicLayout from '../components/PublicLayout';
import AudienceSection from '../components/AudienceSection';
import ProblemSection from '../components/ProblemSection';
import ComparisonSection from '../components/ComparisonSection';
import RoiCalculator from '../components/RoiCalculator';
import { useLanguage } from '../context/LanguageContext';

export default function ForWhoPage() {
  const { t, lang } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.forWho?.title ?? 'Dla kogo'}
      pageSubtitle={t?.pages?.forWho?.subtitle ?? ''}
    >
      {lang === 'en' ? (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">English audience view</h2>
            <p className="mt-3 text-gray-400 font-mono text-sm leading-relaxed">
              We’re translating the full stakeholder and ROI content. For now, the English reform overview and partners/contact pages are fully usable.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href="/en"
                className="px-6 py-3 bg-brand-cyan text-brand-dark font-display font-bold text-sm uppercase tracking-wider hover:bg-cyan-300 transition-colors"
              >
                Open English home →
              </a>
              <a
                href="/en/partnerzy"
                className="px-6 py-3 border border-brand-border text-gray-300 font-mono text-sm hover:border-brand-cyan hover:text-brand-cyan transition-colors"
              >
                Partners →
              </a>
              <a
                href="/en/kontakt"
                className="px-6 py-3 border border-brand-border text-gray-300 font-mono text-sm hover:border-brand-cyan hover:text-brand-cyan transition-colors"
              >
                Contact →
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          <AudienceSection />
          <ProblemSection />
          <ComparisonSection />
          <RoiCalculator />
        </>
      )}
    </PublicLayout>
  );
}
