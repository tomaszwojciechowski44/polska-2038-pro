import PublicLayout from '../components/PublicLayout';
import AudienceSection from '../components/AudienceSection';
import ProblemSection from '../components/ProblemSection';
import ComparisonSection from '../components/ComparisonSection';
import RoiCalculator from '../components/RoiCalculator';
import { useLanguage } from '../context/LanguageContext';

export default function ForWhoPage() {
  const { t } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.forWho?.title ?? 'Dla kogo'}
      pageSubtitle={t?.pages?.forWho?.subtitle ?? ''}
    >
      <AudienceSection />
      <ProblemSection />
      <ComparisonSection />
      <RoiCalculator />
    </PublicLayout>
  );
}
