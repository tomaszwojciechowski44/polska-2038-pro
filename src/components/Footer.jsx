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
            <p className="text-gray-600 text-sm font-mono leading-relaxed">
              Narodowy System Operacyjny Polskiego Sportu.<br />
              LiDAR + AI + PostGIS.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'FastAPI', 'PostgreSQL+PostGIS', 'scikit-learn', 'Celery', 'Redis', 'Docker', 'Kubernetes'].map((t) => (
                <span key={t} className="px-2 py-1 border border-brand-border text-gray-500 text-xs font-mono rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">Linki</div>
            <div className="space-y-2">
              {[
                { label: 'GitHub Repository', href: 'https://github.com/projek-polska-2038/polska-2038-pro' },
                { label: 'Demo v1', href: 'https://projek-polska-2038.github.io/polska-2038-pro/' },
                { label: 'Kontakt z Architektem', href: '#kontakt' },
                { label: 'Zgłoś klub do testów', href: '#kontakt' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-500 hover:text-brand-neon text-sm font-mono transition-colors"
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-700 text-xs font-mono">
            © 2025–2038 #Polska2038 v2.0. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-xs font-mono">
            <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
            System aktywny — dane demo
          </div>
          <div className="text-gray-700 text-xs font-mono">
            Zbudowany z ❤️ dla polskiego sportu
          </div>
        </div>
      </div>
    </footer>
  );
}

