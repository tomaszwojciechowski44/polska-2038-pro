import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExecutiveSummarySection from './components/ExecutiveSummarySection';
import AudienceSection from './components/AudienceSection';
import StatsSection from './components/StatsSection';
import ProblemSection from './components/ProblemSection';
import ComparisonSection from './components/ComparisonSection';
import LidarSection from './components/LidarSection';
import AIEngineSection from './components/AIEngineSection';
import TechStackSection from './components/TechStackSection';
import GlobalMapSection from './components/GlobalMapSection';
import ScoutDemoSection from './components/ScoutDemoSection';
import ArchitectureSection from './components/ArchitectureSection';
import RoiCalculator from './components/RoiCalculator';
import RoadmapSection from './components/RoadmapSection';
import EndorsementsSection from './components/EndorsementsSection';
import SponsorsSection from './components/SponsorsSection';
import MediaBuzzSection from './components/MediaBuzzSection';
import PressSection from './components/PressSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ScrollProgressBar, FloatingCTA } from './components/UIUtils';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-display">
      <ScrollProgressBar />
      <Navbar />
      {/* 1. WOW moment */}
      <HeroSection />
      {/* 2. Co to jest — dla decydentów */}
      <ExecutiveSummarySection />
      {/* 3. Dla kogo — szybka ścieżka do kontekstu */}
      <AudienceSection />
      {/* 4. Liczby */}
      <StatsSection />
      {/* 5. Problem który rozwiązujemy */}
      <ProblemSection />
      {/* 6. Polska vs świat */}
      <ComparisonSection />
      {/* 7-8. Jak to działa */}
      <LidarSection />
      <AIEngineSection />
      {/* 9. Stack technologiczny — unikalne w skali świata */}
      <TechStackSection />
      {/* 10. Gdzie to działa */}
      <GlobalMapSection />
      {/* 11. Demo */}
      <ScoutDemoSection />
      {/* 12. Architektura */}
      <ArchitectureSection />
      {/* 13. Uzasadnienie finansowe */}
      <RoiCalculator />
      {/* 14. Plan + countdown */}
      <RoadmapSection />
      {/* 15. Kto popiera */}
      <EndorsementsSection />
      {/* 16. Jak zostać partnerem */}
      <SponsorsSection />
      {/* 17. Media */}
      <MediaBuzzSection />
      {/* 18. Press releases */}
      <PressSection />
      {/* 19. O projekcie */}
      <AboutSection />
      {/* 20. Dołącz */}
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
