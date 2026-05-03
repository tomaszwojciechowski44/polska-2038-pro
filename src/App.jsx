import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ProblemSection from './components/ProblemSection';
import LidarSection from './components/LidarSection';
import ArchitectureSection from './components/ArchitectureSection';
import RoadmapSection from './components/RoadmapSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-display">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <LidarSection />
      <ArchitectureSection />
      <RoadmapSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

