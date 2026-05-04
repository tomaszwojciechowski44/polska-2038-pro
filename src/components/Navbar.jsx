import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#problem',      label: 'Problem' },
  { href: '#porownanie',   label: 'PL vs Świat' },
  { href: '#lidar',        label: 'LiDAR' },
  { href: '#ai-engine',    label: 'AI Engine' },
  { href: '#mapa',         label: 'Mapa' },
  { href: '#scout-demo',   label: 'Demo' },
  { href: '#architektura',   label: 'Architektura' },
  { href: '#tech-stack',     label: 'Tech Stack' },
  { href: '#roi',            label: 'ROI' },
  { href: '#roadmap',      label: 'Roadmap' },
  { href: '#partnerzy',    label: 'Partnerzy' },
  { href: '#endorsements', label: 'Endorsementy' },
  { href: '#media-buzz',   label: 'Media' },
  { href: '#kontakt',      label: 'Kontakt' },
];

// Sections to track for active highlight
const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Find which section is in view
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
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative font-display font-medium tracking-wide transition-colors text-xs xl:text-sm uppercase pb-0.5 ${
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
            <a
              href="#kontakt"
              className="px-4 py-2 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold text-xs uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
            >
              Dolacz
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              {NAV_LINKS.map((link) => {
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
              <a href="#kontakt" onClick={() => setOpen(false)}
                className="col-span-2 p-3 bg-brand-red text-white font-display font-bold text-sm uppercase tracking-widest text-center hover:bg-red-700 transition-colors">
                Dolacz do projektu &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
