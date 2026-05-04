import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/client';

const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('access_token');
    return t ? parseJwt(t) : null;
  });
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    const res = await apiLogin(email, password);
    const { access_token } = res.data;
    localStorage.setItem('access_token', access_token);
    setToken(access_token);
    setUser(parseJwt(access_token));
    navigate('/panel');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }

  return children;
}
