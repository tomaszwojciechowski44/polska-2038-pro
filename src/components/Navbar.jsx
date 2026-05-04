import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NAV_HREFS = [
  { href: '#executive',    key: 'about' },
  { href: '#dla-kogo',     key: 'forWho' },
  { href: '#lidar',        key: 'lidar' },
  { href: '#tech-stack',   key: 'techStack' },
  { href: '#scout-demo',   key: 'demo' },
  { href: '#roi',          key: 'roi' },
  { href: '#endorsements', key: 'partners' },
  { href: '#kontakt',      key: 'contact' },
];

const SECTION_IDS = NAV_HREFS.map(l => l.href.replace('#', ''));

const PAGES_DROPDOWN = [
  { to: '/o-programie', label: 'O programie' },
  { to: '/rejestracja', label: 'Rejestracja zawodnika' },
  { to: '/rejestracja/skaut', label: 'Rejestracja skauta' },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [open, setOpen]                 = useState(false);
  const [pagesOpen, setPagesOpen]        = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) { current = id; break; }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = NAV_HREFS.map(l => ({ href: l.href, label: t.nav[l.key] }));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-brand-red rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">PL</span>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-brand-red animate-pulse-slow" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-lg leading-none">#Polska2038</div>
              <div className="text-brand-neon text-xs font-mono tracking-widest">NATIONAL OS v2.0</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {/* Pages dropdown */}
            <div className="relative">
              <button
                onClick={() => setPagesOpen((v) => !v)}
                onBlur={() => setTimeout(() => setPagesOpen(false), 150)}
                className="flex items-center gap-1 font-display font-medium tracking-wide transition-colors text-xs uppercase text-gray-400 hover:text-brand-neon"
              >
                Strony <ChevronDown size={12} className={`transition-transform ${pagesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {pagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-brand-card border border-brand-border rounded shadow-xl z-50"
                  >
                    {PAGES_DROPDOWN.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        onClick={() => setPagesOpen(false)}
                        className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-brand-dark font-mono text-xs transition-colors"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative font-display font-medium tracking-wide transition-colors text-xs uppercase pb-0.5 ${
                    isActive ? 'text-brand-neon' : 'text-gray-400 hover:text-brand-neon'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-neon"
                    />
                  )}
                </a>
              );
            })}

            {/* Language toggle */}
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border text-gray-400 hover:border-brand-cyan/50 hover:text-brand-cyan font-mono text-xs uppercase tracking-widest transition-all duration-200"
              title="Switch language / Zmień język"
            >
              <span>{lang === 'pl' ? '🇬🇧' : '🇵🇱'}</span>
              <span>{lang === 'pl' ? 'EN' : 'PL'}</span>
            </button>

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-cyan text-brand-dark hover:bg-cyan-300 font-display font-bold text-xs uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
            >
              Panel →
            </Link>
            <Link
              to="/rejestracja"
              className="px-4 py-2 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold text-xs uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
            >
              {t.nav.join}
            </Link>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2 py-1 border border-brand-border text-gray-400 hover:text-brand-cyan font-mono text-xs transition-colors"
            >
              <span>{lang === 'pl' ? '🇬🇧' : '🇵🇱'}</span>
              <span>{lang === 'pl' ? 'EN' : 'PL'}</span>
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-white p-2"
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
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
            className="lg:hidden bg-brand-card border-t border-brand-border"
          >
            <div className="px-4 py-4 grid grid-cols-2 gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`p-3 border text-sm font-display font-bold uppercase tracking-wide transition-colors ${
                      isActive
                        ? 'border-brand-neon text-brand-neon bg-brand-neon/10'
                        : 'border-brand-border text-gray-300 hover:text-brand-neon hover:border-brand-neon/40'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="col-span-2 border-t border-brand-border pt-3 mt-1 space-y-2">
                <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Podstrony</p>
                {PAGES_DROPDOWN.map((p) => (
                  <Link key={p.to} to={p.to} onClick={() => setOpen(false)}
                    className="block p-2 border border-brand-border text-gray-300 hover:text-brand-cyan hover:border-brand-cyan/40 font-mono text-xs transition-colors">
                    {p.label}
                  </Link>
                ))}
              </div>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="col-span-2 p-3 bg-brand-cyan text-brand-dark font-display font-bold text-sm uppercase tracking-widest text-center hover:bg-cyan-300 transition-colors"
              >
                Panel →
              </Link>
              <Link
                to="/rejestracja"
                onClick={() => setOpen(false)}
                className="col-span-2 p-3 bg-brand-red text-white font-display font-bold text-sm uppercase tracking-widest text-center hover:bg-red-700 transition-colors"
              >
                {t.nav.join} &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
