import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ScoutPortalSection from '../components/ScoutPortalSection';
import ExecutiveSummarySection from '../components/ExecutiveSummarySection';
import AudienceSection from '../components/AudienceSection';
import StatsSection from '../components/StatsSection';
import LiveSystemSection from '../components/LiveSystemSection';
import ProblemSection from '../components/ProblemSection';
import ComparisonSection from '../components/ComparisonSection';
import LidarSection from '../components/LidarSection';
import AIEngineSection from '../components/AIEngineSection';
import TechStackSection from '../components/TechStackSection';
import GlobalMapSection from '../components/GlobalMapSection';
import TalentMapSection from '../components/TalentMapSection';
import ScoutDemoSection from '../components/ScoutDemoSection';
import ArchitectureSection from '../components/ArchitectureSection';
import RoiCalculator from '../components/RoiCalculator';
import RoadmapSection from '../components/RoadmapSection';
import EndorsementsSection from '../components/EndorsementsSection';
import SponsorsSection from '../components/SponsorsSection';
import MediaBuzzSection from '../components/MediaBuzzSection';
import PressSection from '../components/PressSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ScrollProgressBar, FloatingCTA } from '../components/UIUtils';

export default function LandingPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-dark text-white font-display">
        <ScrollProgressBar />
        <Navbar />
        <HeroSection />
        <ScoutPortalSection />
        <ExecutiveSummarySection />
        <AudienceSection />
        <StatsSection />
        <LiveSystemSection />
        <ProblemSection />
        <ComparisonSection />
        <LidarSection />
        <AIEngineSection />
        <TechStackSection />
        <GlobalMapSection />
        <TalentMapSection />
        <ScoutDemoSection />
        <ArchitectureSection />
        <RoiCalculator />
        <RoadmapSection />
        <EndorsementsSection />
        <SponsorsSection />
        <MediaBuzzSection />
        <PressSection />
        <AboutSection />
        <ContactSection />
        <Footer />
        <FloatingCTA />
      </div>
    </LanguageProvider>
  );
}
