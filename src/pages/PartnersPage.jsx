import PublicLayout from '../components/PublicLayout';
import EndorsementsSection from '../components/EndorsementsSection';
import SponsorsSection from '../components/SponsorsSection';
import MediaBuzzSection from '../components/MediaBuzzSection';
import PressSection from '../components/PressSection';
import AboutSection from '../components/AboutSection';

export default function PartnersPage() {
  return (
    <PublicLayout
      pageTitle="Partnerzy"
      pageSubtitle="Federacje, sponsorzy, media i ambasadorzy programu #Polska2038. Wśród nich PZPN, UEFA, MSiT i wiodące polskie media sportowe."
    >
      <EndorsementsSection />
      <SponsorsSection />
      <MediaBuzzSection />
      <PressSection />
      <AboutSection />
    </PublicLayout>
  );
}
