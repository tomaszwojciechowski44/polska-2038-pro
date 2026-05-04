import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, PrivateRoute, AdminRoute } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ScoutPanel from './pages/ScoutPanel';
import RegisterPage from './pages/RegisterPage';
import RegisterScoutPage from './pages/RegisterScoutPage';
import AdminPanel from './pages/AdminPanel';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/o-programie" element={<AboutPage />} />
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/rejestracja/skaut" element={<RegisterScoutPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected — scouts */}
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <ScoutPanel />
            </PrivateRoute>
          }
        />

        {/* Protected — admin only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
