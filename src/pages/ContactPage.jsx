import PublicLayout from '../components/PublicLayout';
import ContactSection from '../components/ContactSection';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <PublicLayout
      pageTitle={t?.pages?.contact?.title ?? 'Kontakt'}
      pageSubtitle={t?.pages?.contact?.subtitle ?? ''}
    >
      <ContactSection />
    </PublicLayout>
  );
}
