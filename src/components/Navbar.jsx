import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NAV_LINKS = [
  { to: '/reforma',        label: '🏆 Reforma',      highlight: true },
  { to: '/dla-federacji',  label: '🌍 For Federations', highlight: true, en: true },
  { to: '/technologia',    label: 'Technologia' },
  { to: '/mapa-talentow',  label: 'Mapa Talentów' },
  { to: '/dla-kogo',       label: 'Dla kogo' },
  { to: '/wyniki',         label: 'Wyniki' },
  { to: '/kontakt',        label: 'Kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { lang, toggle }        = useLanguage();
  const location                = useLocation();
  const onLanding               = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (to) => location.pathname === to;
  const activeHash = (location.hash || '#modules').toLowerCase();
  const LANDING_MODULES = [
    { href: '#modules', label: 'System' },
    { href: '#scouting-ai', label: 'Scouting AI' },
    { href: '#mapa', label: 'Mapa' },
    { href: '#business', label: 'Business case' },
    { href: '#tech-stack', label: 'Tech stack' },
    { href: '#roadmap', label: 'Roadmap' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`transition-all duration-300 ${
          scrolled || open
            ? 'bg-brand-dark/98 backdrop-blur-md border-b border-brand-border'
            : 'bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-brand-red rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">PL</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-brand-red/60 group-hover:border-brand-red transition-colors" />
            </div>
            <div>
              <div className="text-white font-display font-bold text-base leading-none">#Polska2038</div>
              <div className="text-brand-neon text-[10px] font-mono tracking-widest leading-none mt-0.5">NATIONAL OS v2.0</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors rounded ${
                  isActive(link.to)
                    ? 'text-brand-neon'
                    : link.en
                      ? 'text-brand-cyan hover:text-cyan-300 border border-brand-cyan/30 hover:border-brand-cyan/60'
                      : link.highlight
                        ? 'text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/60'
                        : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-brand-neon/8 rounded border border-brand-neon/20"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2.5 py-1.5 border border-brand-border text-gray-500 hover:border-brand-cyan/50 hover:text-brand-cyan font-mono text-xs transition-all"
              title="Switch language"
            >
              <span>{lang === 'pl' ? '🇬🇧' : '🇵🇱'}</span>
              <span>{lang === 'pl' ? 'EN' : 'PL'}</span>
            </button>
            <Link
              to="/login"
              className="px-4 py-2 bg-brand-cyan text-brand-dark font-display font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all whitespace-nowrap"
            >
              Panel →
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2 py-1 border border-brand-border text-gray-500 hover:text-brand-cyan font-mono text-xs transition-colors"
            >
              <span>{lang === 'pl' ? '🇬🇧' : '🇵🇱'}</span>
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-white p-2"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-dark border-t border-brand-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors rounded ${
                    isActive(link.to)
                      ? 'text-brand-neon bg-brand-neon/5 border border-brand-neon/20'
                      : 'text-gray-400 hover:text-white hover:bg-brand-card'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-brand-border flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-3 bg-brand-cyan text-brand-dark font-display font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all rounded"
                >
                  Panel →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>

      {/* Landing: contextual sticky module bar */}
      {onLanding && !open && (
        <div className={`hidden md:block border-b border-brand-border/70 ${
          scrolled ? 'bg-brand-dark/98 backdrop-blur-md' : 'bg-brand-dark/60 backdrop-blur-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center gap-2 overflow-x-auto">
            <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest flex-shrink-0">
              Moduły:
            </span>
            {LANDING_MODULES.map((m) => (
              <a
                key={m.href}
                href={m.href}
                className={[
                  'px-2.5 py-1 border font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors flex-shrink-0',
                  activeHash === m.href
                    ? 'border-brand-neon/60 bg-brand-neon/10 text-brand-neon'
                    : 'border-brand-border text-gray-400 hover:text-white hover:border-gray-500',
                ].join(' ')}
              >
                {m.label}
              </a>
            ))}
            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              <a
                href="#modules"
                className="px-3 py-1.5 border border-brand-neon/30 bg-brand-neon/5 text-brand-neon hover:border-brand-neon/60 font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors"
              >
                Start →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
