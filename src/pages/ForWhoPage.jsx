import PublicLayout from '../components/PublicLayout';
import AudienceSection from '../components/AudienceSection';
import ProblemSection from '../components/ProblemSection';
import ComparisonSection from '../components/ComparisonSection';
import RoiCalculator from '../components/RoiCalculator';

export default function ForWhoPage() {
  return (
    <PublicLayout
      pageTitle="Dla kogo"
      pageSubtitle="System #Polska2038 służy każdemu interesariuszowi polskiego sportu — od rodziców i dzieci po Ministerstwo, federacje i akademie. Sprawdź swój przypadek użycia."
    >
      <AudienceSection />
      <ProblemSection />
      <ComparisonSection />
      <RoiCalculator />
    </PublicLayout>
  );
}
