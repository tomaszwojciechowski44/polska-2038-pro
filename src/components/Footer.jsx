export default function Footer() {
  return (
    <footer className="bg-black border-t border-brand-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-brand-red rounded-full opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-display font-bold text-sm">PL</span>
                </div>
              </div>
              <div>
                <div className="text-white font-display font-bold text-lg leading-none">#Polska2038</div>
                <div className="text-brand-neon text-xs font-mono tracking-widest">NATIONAL OS v2.0</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-mono leading-relaxed mb-4">
              Narodowy System Operacyjny Polskiego Sportu.<br />
              LiDAR + AI + PostGIS. Żaden talent nie umknie.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/Polska-2038/projekt-polska-2038-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-brand-border text-gray-500 hover:border-brand-neon hover:text-brand-neon text-xs font-mono transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://x.com/polska2038"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-brand-border text-gray-500 hover:border-brand-cyan hover:text-brand-cyan text-xs font-mono transition-colors"
              >
                X / Twitter
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18',
                'Vite',
                'React Router',
                'Tailwind CSS',
                'Framer Motion',
                'FastAPI',
                'SQLAlchemy',
                'PostgreSQL + PostGIS',
              ].map((t) => (
                <span key={t} className="px-2 py-1 border border-brand-border text-gray-500 text-xs font-mono rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">Nawigacja</div>
            <div className="space-y-2">
              {[
                { label: 'Technologia', to: '/technologia' },
                { label: 'Mapa Talentów', to: '/mapa-talentow' },
                { label: 'Dla kogo', to: '/dla-kogo' },
                { label: 'Wyniki i Roadmapa', to: '/wyniki' },
                { label: 'Partnerzy', to: '/partnerzy' },
                { label: 'O programie', to: '/o-programie' },
                { label: 'Kontakt', to: '/kontakt' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  className="block text-gray-500 hover:text-brand-neon text-sm font-mono transition-colors"
                >
                  &rarr; {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-2">
          <div className="text-gray-500 text-[11px] sm:text-xs font-mono tracking-wide whitespace-nowrap">
            &copy; 2025&ndash;2026 #Polska2038 v2.0. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-[11px] sm:text-xs font-mono tracking-wide whitespace-nowrap">
            <a href="/kontakt" className="hover:text-gray-200 transition-colors">Kontakt z zespołem</a>
            <a href="https://github.com/Polska-2038/projekt-polska-2038-pro" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">MIT License</a>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[11px] sm:text-xs font-mono tracking-wide whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
            System aktywny &mdash; dane demo
          </div>
          <div className="text-gray-500 text-[11px] sm:text-xs font-mono tracking-wide whitespace-nowrap">
            Zbudowany z &hearts; dla polskiego sportu
          </div>
        </div>
      </div>
    </footer>
  );
}
