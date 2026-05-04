import PublicLayout from '../components/PublicLayout';
import StatsSection from '../components/StatsSection';
import GlobalMapSection from '../components/GlobalMapSection';
import TalentMapSection from '../components/TalentMapSection';
import ScoutDemoSection from '../components/ScoutDemoSection';

export default function MapPage() {
  return (
    <PublicLayout
      pageTitle="Mapa Talentów"
      pageSubtitle="Interaktywna mapa wykrytych talentów w Polsce. Filtruj po województwie, dyscyplinie, wieku i klasie AI. Demo karty skauta z pełnym profilem zawodnika."
    >
      <StatsSection />
      <GlobalMapSection />
      <TalentMapSection />
      <ScoutDemoSection />
    </PublicLayout>
  );
}
