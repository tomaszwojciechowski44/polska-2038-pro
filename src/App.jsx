import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ProblemSection from './components/ProblemSection';
import ComparisonSection from './components/ComparisonSection';
import LidarSection from './components/LidarSection';
import AIEngineSection from './components/AIEngineSection';
import GlobalMapSection from './components/GlobalMapSection';
import ScoutDemoSection from './components/ScoutDemoSection';
import ArchitectureSection from './components/ArchitectureSection';
import TechStackSection from './components/TechStackSection';
import RoiCalculator from './components/RoiCalculator';
import RoadmapSection from './components/RoadmapSection';
import SponsorsSection from './components/SponsorsSection';
import PressSection from './components/PressSection';
import EndorsementsSection from './components/EndorsementsSection';
import MediaBuzzSection from './components/MediaBuzzSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ScrollProgressBar, FloatingCTA } from './components/UIUtils';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-display">
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <ComparisonSection />
      <LidarSection />
      <AIEngineSection />
      <GlobalMapSection />
      <ScoutDemoSection />
      <ArchitectureSection />
      <TechStackSection />
      <RoiCalculator />
      <RoadmapSection />
      <SponsorsSection />
      <EndorsementsSection />
      <MediaBuzzSection />
      <PressSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
