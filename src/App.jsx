import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExecutiveSummarySection from './components/ExecutiveSummarySection';
import AudienceSection from './components/AudienceSection';
import StatsSection from './components/StatsSection';
import LiveSystemSection from './components/LiveSystemSection';
import ProblemSection from './components/ProblemSection';
import ComparisonSection from './components/ComparisonSection';
import LidarSection from './components/LidarSection';
import AIEngineSection from './components/AIEngineSection';
import TechStackSection from './components/TechStackSection';
import GlobalMapSection from './components/GlobalMapSection';
import TalentMapSection from './components/TalentMapSection';
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
    <LanguageProvider>
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

        {/* 5. System live — mission control */}
        <LiveSystemSection />

        {/* 6. Problem który rozwiązujemy */}
        <ProblemSection />

        {/* 7. Polska vs świat */}
        <ComparisonSection />

        {/* 8–9. Jak to działa */}
        <LidarSection />
        <AIEngineSection />

        {/* 10. Stack technologiczny */}
        <TechStackSection />

        {/* 11. Gdzie to działa — globalna mapa */}
        <GlobalMapSection />

        {/* 12. Mapa talentów Polski — unikalna na świecie */}
        <TalentMapSection />

        {/* 13. Demo skauta */}
        <ScoutDemoSection />

        {/* 14. Architektura */}
        <ArchitectureSection />

        {/* 15. Uzasadnienie finansowe */}
        <RoiCalculator />

        {/* 16. Plan + countdown */}
        <RoadmapSection />

        {/* 17. Kto popiera */}
        <EndorsementsSection />

        {/* 18. Jak zostać partnerem */}
        <SponsorsSection />

        {/* 19. Media */}
        <MediaBuzzSection />

        {/* 20. Press releases */}
        <PressSection />

        {/* 21. O projekcie */}
        <AboutSection />

        {/* 22. Dołącz */}
        <ContactSection />

        <Footer />
        <FloatingCTA />
      </div>
    </LanguageProvider>
  );
}
