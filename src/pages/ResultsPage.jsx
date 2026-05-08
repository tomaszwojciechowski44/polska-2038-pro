import PublicLayout from '../components/PublicLayout';
import ExecutiveSummarySection from '../components/ExecutiveSummarySection';
import KpiChartsSection from '../components/KpiChartsSection';
import RoiCalculatorSection from '../components/RoiCalculatorSection';
import { useLanguage } from '../context/LanguageContext';

export default function ResultsPage() {
  const { t } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.results?.title ?? 'Wyniki'}
      pageSubtitle={t?.pages?.results?.subtitle ?? ''}
    >
      <ExecutiveSummarySection />
      <KpiChartsSection />
      <RoiCalculatorSection />
    </PublicLayout>
  );
}
