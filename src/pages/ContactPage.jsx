import PublicLayout from '../components/PublicLayout';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <PublicLayout
      pageTitle="Kontakt"
      pageSubtitle="Skontaktuj się z zespołem architektonicznym programu #Polska2038. Rozmowy o partnerstwie strategicznym, pilotażu i wdrożeniu ogólnopolskim."
    >
      <ContactSection />
    </PublicLayout>
  );
}
