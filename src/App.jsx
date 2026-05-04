import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, PrivateRoute } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ScoutPanel from './pages/ScoutPanel';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <ScoutPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
