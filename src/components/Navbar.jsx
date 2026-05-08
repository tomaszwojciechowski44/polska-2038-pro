import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [activeLanding, setActiveLanding] = useState('system');
  const { lang, toggle, t }     = useLanguage();
  const location                = useLocation();
  const onLanding               = location.pathname === '/system';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (to) => location.pathname === to;
  const NAV_LINKS = [
    { to: '/',               label: t?.nav?.reforma ?? 'Reform' },
    { to: '/technologia',    label: t?.nav?.technology ?? 'Technology' },
    { to: '/mapa-talentow',  label: t?.nav?.talentMap ?? 'Talent map' },
    { to: '/dla-kogo',       label: t?.nav?.forWho ?? 'Who it’s for' },
    { to: '/wyniki',         label: t?.nav?.results ?? 'Results' },
    { to: '/partnerzy',      label: t?.nav?.partners ?? 'Partners' },
    { to: '/o-programie',    label: t?.nav?.about ?? 'About' },
    { to: '/kontakt',        label: t?.nav?.contact ?? 'Contact' },
  ];
  const LANDING_MODULES = [
    { id: 'system', targetId: 'modules-start', label: t?.modulesBar?.system ?? 'System' },
    { id: 'ai', targetId: 'scouting-ai', label: t?.modulesBar?.ai ?? 'Scouting AI' },
    { id: 'map', targetId: 'mapa', label: t?.modulesBar?.map ?? 'Map' },
    { id: 'biz', targetId: 'business', label: t?.modulesBar?.business ?? 'Business case' },
    { id: 'tech', targetId: 'tech-stack', label: t?.modulesBar?.tech ?? 'Tech stack' },
    { id: 'roadmap', targetId: 'roadmap', label: t?.modulesBar?.roadmap ?? 'Roadmap' },
  ];

  const scrollTo = (id) => {
    try {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      // ignore
    }
  };

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
          <Link to={lang === 'en' ? '/en' : '/'} className="flex items-center gap-3 flex-shrink-0 group">
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
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  'relative px-3 py-2 rounded-md transition-colors',
                  'text-xs font-mono uppercase tracking-widest',
                  isActive(link.to) ? 'text-white' : 'text-gray-400 hover:text-white',
                ].join(' ')}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-brand-cyan"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2.5 py-1.5 border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 font-mono text-xs uppercase tracking-widest transition-all rounded-md"
              title={lang === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
            >
              <span>{lang === 'pl' ? '🇬🇧' : '🇵🇱'}</span>
              <span>{lang === 'pl' ? 'EN' : 'PL'}</span>
            </button>
            <Link
              to="/login"
              className="px-4 py-2 bg-brand-cyan text-brand-dark font-display font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all whitespace-nowrap rounded-md"
            >
              {t?.nav?.panel ?? 'Panel'} →
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
                  className={[
                    'block px-4 py-3 rounded-md transition-colors',
                    'font-mono text-xs uppercase tracking-widest',
                    isActive(link.to)
                      ? 'text-white bg-white/[0.03] border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.03]',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-brand-border flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-3 bg-brand-cyan text-brand-dark font-display font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all rounded-md"
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
              {t?.modulesBar?.label ?? 'Modules:'}
            </span>
            {LANDING_MODULES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setActiveLanding(m.id);
                  scrollTo(m.targetId);
                }}
                className={[
                  'px-2.5 py-1 border font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors flex-shrink-0',
                  activeLanding === m.id
                    ? 'border-brand-neon/60 bg-brand-neon/10 text-brand-neon'
                    : 'border-brand-border text-gray-400 hover:text-white hover:border-gray-500',
                ].join(' ')}
              >
                {m.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveLanding('system');
                  scrollTo('modules-start');
                }}
                className="px-3 py-1.5 border border-brand-neon/30 bg-brand-neon/5 text-brand-neon hover:border-brand-neon/60 font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors"
              >
                {t?.modulesBar?.start ?? 'Start →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
