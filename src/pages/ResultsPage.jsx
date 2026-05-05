import PublicLayout from '../components/PublicLayout';
import ExecutiveSummarySection from '../components/ExecutiveSummarySection';
import RoadmapSection from '../components/RoadmapSection';
import KpiChartsSection from '../components/KpiChartsSection';
import RoiCalculatorSection from '../components/RoiCalculatorSection';

export default function ResultsPage() {
  return (
    <PublicLayout
      pageTitle="Wyniki i Roadmapa"
      pageSubtitle="Wskaźniki KPI, prognozy do 2038, benchmark Polska vs Europa, lejek talentów i interaktywny kalkulator ROI."
    >
      <ExecutiveSummarySection />
      <KpiChartsSection />
      <RoiCalculatorSection />
      <RoadmapSection />
    </PublicLayout>
  );
}
