import './index.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
  const initialLang = location.pathname.startsWith('/en') ? 'en' : 'pl';

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
          <Route path="/technologia"    element={<TechnologyPage />} />
          <Route path="/reforma"              element={<Navigate to="/" replace />} />
          <Route path="/reforma/filar/:id"    element={<FilarDetailPage />} />
          <Route path="/reforma/dokumenty"    element={<DokumentyPage />} />
          <Route path="/reforma/en"            element={<ReformaEnPage />} />
          <Route path="/dla-federacji"         element={<Navigate to="/" replace />} />
          <Route path="/mapa-talentow"  element={<MapPage />} />
          <Route path="/dla-kogo"       element={<ForWhoPage />} />
          <Route path="/wyniki"         element={<ResultsPage />} />
          <Route path="/partnerzy"      element={<PartnersPage />} />
          <Route path="/kontakt"        element={<ContactPage />} />
          <Route path="/o-programie"    element={<AboutPage />} />
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
