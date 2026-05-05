import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, PrivateRoute, AdminRoute } from './context/AuthContext';

// Public pages
import LandingPage        from './pages/LandingPage';
import TechnologyPage     from './pages/TechnologyPage';
import ReformaPage        from './pages/ReformaPage';
import FilarDetailPage    from './pages/FilarDetailPage';
import DokumentyPage      from './pages/DokumentyPage';
import MapPage            from './pages/MapPage';
import ForWhoPage         from './pages/ForWhoPage';
import ResultsPage        from './pages/ResultsPage';
import PartnersPage       from './pages/PartnersPage';
import ContactPage        from './pages/ContactPage';
import AboutPage          from './pages/AboutPage';
import RegisterPage       from './pages/RegisterPage';
import RegisterScoutPage  from './pages/RegisterScoutPage';
import LoginPage          from './pages/LoginPage';
import NotFoundPage       from './pages/NotFoundPage';

// Protected pages
import ScoutPanel from './pages/ScoutPanel';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Public ───────────────────────────────── */}
        <Route path="/"               element={<LandingPage />} />
        <Route path="/technologia"    element={<TechnologyPage />} />
        <Route path="/reforma"              element={<ReformaPage />} />
        <Route path="/reforma/filar/:id"    element={<FilarDetailPage />} />
        <Route path="/reforma/dokumenty"    element={<DokumentyPage />} />
        <Route path="/mapa-talentow"  element={<MapPage />} />
        <Route path="/dla-kogo"       element={<ForWhoPage />} />
        <Route path="/wyniki"         element={<ResultsPage />} />
        <Route path="/partnerzy"      element={<PartnersPage />} />
        <Route path="/kontakt"        element={<ContactPage />} />
        <Route path="/o-programie"    element={<AboutPage />} />
        <Route path="/rejestracja"        element={<RegisterPage />} />
        <Route path="/rejestracja/skaut"  element={<RegisterScoutPage />} />
        <Route path="/login"          element={<LoginPage />} />

        {/* ── Protected — scouts ───────────────────── */}
        <Route path="/panel" element={<PrivateRoute><ScoutPanel /></PrivateRoute>} />

        {/* ── Protected — admin only ───────────────── */}
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />

        {/* ── 404 ──────────────────────────────────── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
