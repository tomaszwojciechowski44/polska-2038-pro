import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import LidarSection from '../components/LidarSection';
import AIEngineSection from '../components/AIEngineSection';
import TechStackSection from '../components/TechStackSection';
import ArchitectureSection from '../components/ArchitectureSection';
import LiveSystemSection from '../components/LiveSystemSection';

function ReformaCallout() {
  return (
    <section className="py-14 bg-gradient-to-r from-red-950/50 via-black to-red-950/50 border-y border-red-800/30">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Trophy className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          Chcesz zobaczyć plan reformy?
        </h2>
        <p className="text-gray-400 mb-6">
          Trzy filary reformy piłki nożnej, budżet 1,08 mld zł/rok, timeline 2026–2038 i komunikat dla Ministerstwa Sportu.
        </p>
        <Link
          to="/reforma"
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-600/30"
        >
          <Trophy className="w-5 h-5" /> Zobacz Plan Reformy →
        </Link>
      </div>
    </section>
  );
}

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
      <ReformaCallout />
    </PublicLayout>
  );
}
