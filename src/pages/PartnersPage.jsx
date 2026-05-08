import PublicLayout from '../components/PublicLayout';
import EndorsementsSection from '../components/EndorsementsSection';
import SponsorsSection from '../components/SponsorsSection';
import PressSection from '../components/PressSection';
import AboutSection from '../components/AboutSection';
import { useLanguage } from '../context/LanguageContext';

export default function PartnersPage() {
  const { t } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.partners?.title ?? 'Partnerzy'}
      pageSubtitle={t?.pages?.partners?.subtitle ?? ''}
    >
      <EndorsementsSection />
      <SponsorsSection />
      <PressSection />
      <AboutSection />
    </PublicLayout>
  );
}
