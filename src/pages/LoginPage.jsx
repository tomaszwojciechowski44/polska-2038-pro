import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Nieprawidłowy e-mail lub hasło.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      {/* Cyan glow top-left */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      {/* Neon glow bottom-right */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="border border-brand-cyan/30 bg-brand-card p-8 sm:p-10 rounded-sm">

          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="text-brand-red font-display font-bold text-2xl tracking-widest">#POLSKA</span>
              <span className="text-brand-gold font-display font-bold text-2xl tracking-widest">2038</span>
            </Link>
            <div className="mt-1 text-brand-cyan font-mono text-xs tracking-widest uppercase opacity-70">
              Portal Skautingowy
            </div>
            <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent mx-auto" />
          </div>

          <h1 className="text-white font-display font-bold text-xl text-center mb-6">
            Zaloguj się do panelu
          </h1>

          {/* Error alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-5 border border-brand-red/40 bg-brand-red/10 text-brand-red text-sm font-mono rounded-sm"
            >
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-400 font-mono text-xs uppercase tracking-widest mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="skaut@polska2038.pl"
                className="w-full bg-brand-dark border border-brand-border text-white font-mono text-sm px-4 py-3 rounded-sm
                  placeholder-gray-700 focus:outline-none focus:border-brand-cyan/60 focus:ring-1 focus:ring-brand-cyan/30
                  transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 font-mono text-xs uppercase tracking-widest mb-1.5">
                Hasło
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-brand-dark border border-brand-border text-white font-mono text-sm px-4 py-3 pr-11 rounded-sm
                    placeholder-gray-700 focus:outline-none focus:border-brand-cyan/60 focus:ring-1 focus:ring-brand-cyan/30
                    transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-cyan text-brand-dark
                font-display font-bold text-sm uppercase tracking-widest
                hover:bg-cyan-300 active:scale-95 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-brand-dark/40 border-t-brand-dark rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? 'Logowanie…' : 'Zaloguj się'}
            </button>
          </form>

          {/* Registration links */}
          <div className="mt-6 border-t border-brand-border pt-5 space-y-2 text-center">
            <p className="text-gray-600 font-mono text-xs">
              Nie masz konta?{' '}
              <Link to="/rejestracja" className="text-brand-cyan hover:text-cyan-300 transition-colors">
                Zarejestruj zawodnika
              </Link>
              {' '}lub{' '}
              <Link to="/rejestracja/skaut" className="text-brand-gold hover:text-yellow-300 transition-colors">
                zostań skautem
              </Link>
            </p>
          </div>

          {/* Back to landing */}
          <div className="mt-3 text-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-brand-cyan font-mono text-xs transition-colors"
            >
              ← Powrót do strony głównej
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
