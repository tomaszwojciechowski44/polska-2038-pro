import PublicLayout from '../components/PublicLayout';
import LidarSection from '../components/LidarSection';
import AIEngineSection from '../components/AIEngineSection';
import TechStackSection from '../components/TechStackSection';
import ArchitectureSection from '../components/ArchitectureSection';
import LiveSystemSection from '../components/LiveSystemSection';

export default function TechnologyPage() {
  return (
    <PublicLayout
      pageTitle="Technologia"
      pageSubtitle="LiDAR, biomechanika, uczenie maszynowe i architektura systemu — pełna dokumentacja techniczna platformy #Polska2038."
    >
      <LidarSection />
      <AIEngineSection />
      <TechStackSection />
      <ArchitectureSection />
      <LiveSystemSection />
    </PublicLayout>
  );
}
