import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login as apiLogin } from '../api/client';

const AuthContext = createContext(null);

function safeStorageGet(key) {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeStorageSet(key, value) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}
function safeStorageRemove(key) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => safeStorageGet('access_token'));
  const [user, setUser] = useState(() => {
    const t = safeStorageGet('access_token');
    return t ? parseJwt(t) : null;
  });
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    const res = await apiLogin(email, password);
    const { access_token } = res.data;
    safeStorageSet('access_token', access_token);
    setToken(access_token);
    setUser(parseJwt(access_token));
    navigate('/panel');
  }, [navigate]);

  const logout = useCallback(() => {
    safeStorageRemove('access_token');
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
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
