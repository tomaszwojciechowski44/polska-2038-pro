import './index.css';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, PrivateRoute } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Public pages
import LandingPage        from './pages/LandingPage';
import TechnologyPage     from './pages/TechnologyPage';
import ReformaPage        from './pages/ReformaPage';
import FilarDetailPage    from './pages/FilarDetailPage';
import DokumentyPage      from './pages/DokumentyPage';
import ReformaEnPage      from './pages/ReformaEnPage';
import MapPage            from './pages/MapPage';
import ForWhoPage         from './pages/ForWhoPage';
import ResultsPage        from './pages/ResultsPage';
import PartnersPage       from './pages/PartnersPage';
import ContactPage        from './pages/ContactPage';
import AboutPage          from './pages/AboutPage';
import MaterialDetailPage from './pages/MaterialDetailPage';
import LoginPage          from './pages/LoginPage';
import NotFoundPage       from './pages/NotFoundPage';

// Protected pages
import ScoutPanel from './pages/ScoutPanel';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialLang = location.pathname.startsWith('/en') ? 'en' : 'pl';

  useEffect(() => {
    // Client-only: redirect to /en based on browser language (unless user explicitly chose).
    try {
      const pref = window.localStorage?.getItem('preferredLang');
      if (pref) return;
      const browserLang = (navigator.language || 'pl').slice(0, 2).toLowerCase();
      if (browserLang === 'pl') return;
      if (location.pathname === '/en' || location.pathname.startsWith('/en/')) return;
      const target = location.pathname === '/' ? '/en' : `/en${location.pathname}`;
      navigate(`${target}${location.search}${location.hash}`, { replace: true });
    } catch {
      // ignore
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return (
    <LanguageProvider initialLang={initialLang}>
      <AuthProvider>
        <Routes>
          {/* ── Public ───────────────────────────────── */}
          {/* Homepage = Reform */}
          <Route path="/"               element={<ReformaPage />} />
          <Route path="/en"             element={<ReformaEnPage />} />
          {/* Keep old landing available */}
          <Route path="/system"         element={<LandingPage />} />
          <Route path="/en/system"      element={<LandingPage />} />
          <Route path="/technologia"    element={<TechnologyPage />} />
          <Route path="/en/technologia" element={<TechnologyPage />} />
          <Route path="/reforma"              element={<Navigate to="/" replace />} />
          <Route path="/reforma/filar/:id"    element={<FilarDetailPage />} />
          <Route path="/reforma/dokumenty"    element={<DokumentyPage />} />
          <Route path="/reforma/en"            element={<ReformaEnPage />} />
          <Route path="/dla-federacji"         element={<Navigate to="/" replace />} />
          <Route path="/mapa-talentow"  element={<MapPage />} />
          <Route path="/en/mapa-talentow" element={<MapPage />} />
          <Route path="/dla-kogo"       element={<ForWhoPage />} />
          <Route path="/en/dla-kogo"    element={<ForWhoPage />} />
          <Route path="/wyniki"         element={<ResultsPage />} />
          <Route path="/en/wyniki"      element={<ResultsPage />} />
          <Route path="/partnerzy"      element={<PartnersPage />} />
          <Route path="/en/partnerzy"   element={<PartnersPage />} />
          <Route path="/kontakt"        element={<ContactPage />} />
          <Route path="/en/kontakt"     element={<ContactPage />} />
          <Route path="/o-programie"    element={<AboutPage />} />
          <Route path="/en/o-programie" element={<AboutPage />} />
          <Route path="/reforma/materialy/:slug" element={<MaterialDetailPage />} />
          <Route path="/login"          element={<LoginPage />} />

          {/* ── Protected — scouts ───────────────────── */}
          <Route path="/panel" element={<PrivateRoute><ScoutPanel /></PrivateRoute>} />

          {/* ── 404 ──────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
}
