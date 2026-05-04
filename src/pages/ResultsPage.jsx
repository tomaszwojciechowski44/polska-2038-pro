import PublicLayout from '../components/PublicLayout';
import ExecutiveSummarySection from '../components/ExecutiveSummarySection';
import RoadmapSection from '../components/RoadmapSection';

export default function ResultsPage() {
  return (
    <PublicLayout
      pageTitle="Wyniki i Roadmapa"
      pageSubtitle="Podsumowanie wykonawcze programu, harmonogram wdrożenia 2024–2038, kalkulator ROI i kluczowe wskaźniki efektywności systemu."
    >
      <ExecutiveSummarySection />
      <RoadmapSection />
    </PublicLayout>
  );
}
