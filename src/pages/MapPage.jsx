import PublicLayout from '../components/PublicLayout';
import StatsSection from '../components/StatsSection';
import PolandMapSection from '../components/PolandMapSection';
import GlobalMapSection from '../components/GlobalMapSection';
import TalentMapSection from '../components/TalentMapSection';
import ScoutDemoSection from '../components/ScoutDemoSection';
import { useLanguage } from '../context/LanguageContext';

export default function MapPage() {
  const { t } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.talentMap?.title ?? 'Mapa Talentów'}
      pageSubtitle={t?.pages?.talentMap?.subtitle ?? ''}
    >
      <StatsSection />
      <PolandMapSection />
      <GlobalMapSection />
      <TalentMapSection />
      <ScoutDemoSection />
    </PublicLayout>
  );
}
