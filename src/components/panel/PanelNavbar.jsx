import { Link } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function PanelNavbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-brand-border bg-brand-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-brand-red font-display font-bold text-lg tracking-widest">#POLSKA</span>
            <span className="text-brand-gold font-display font-bold text-lg tracking-widest">2038</span>
            <span className="hidden sm:block text-brand-cyan/60 font-mono text-[10px] uppercase tracking-widest ml-2">
              Panel Skautingowy
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/panel"
              className="text-gray-400 hover:text-brand-cyan font-mono text-xs uppercase tracking-widest transition-colors"
            >
              Dashboard
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-400 hover:text-brand-red font-mono text-xs uppercase tracking-widest transition-colors"
              >
                Admin
              </Link>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 border border-brand-border rounded-sm">
              <User size={12} className="text-brand-cyan" />
              <span className="text-gray-300 font-mono text-xs">
                {user?.sub || user?.email || 'Skaut'}
              </span>
              {user?.role && (
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 rounded-sm">
                  {user.role}
                </span>
              )}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-gray-500 hover:text-brand-red font-mono text-xs transition-colors"
            >
              <LogOut size={13} />
              Wyloguj
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-brand-border bg-brand-card px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-300 font-mono text-sm">
            <User size={13} className="text-brand-cyan" />
            {user?.sub || user?.email || 'Skaut'}
            {user?.role && (
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 rounded-sm">
                {user.role}
              </span>
            )}
          </div>
          <Link
            to="/panel"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-400 hover:text-brand-cyan font-mono text-xs uppercase tracking-widest"
          >
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-gray-500 hover:text-brand-red font-mono text-xs"
          >
            <LogOut size={13} />
            Wyloguj
          </button>
        </div>
      )}
    </nav>
  );
}
