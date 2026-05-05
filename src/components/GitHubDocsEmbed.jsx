import { useState } from 'react';
import { ExternalLink, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const GITHUB_PAGES_URL = 'https://polska-2038.github.io/projekt-polska-2038-pro/';

export default function GitHubDocsEmbed() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nagłówek */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-semibold tracking-wide uppercase">
              Dokumentacja Projektu
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Pełna Prezentacja Programu
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Interaktywna dokumentacja projektu #Polska2038 — trzy filary reformy,
            budżet, ROI i harmonogram drogi do finału Mistrzostw Świata 2038.
          </p>
        </div>

        {/* Karta z przyciskami */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">

          {/* Pasek tytułu jak przeglądarka */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-4 bg-gray-700 rounded-md px-3 py-1 text-gray-400 text-xs font-mono truncate text-center">
              {GITHUB_PAGES_URL}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 rounded px-3 py-1"
              >
                {expanded ? (
                  <><ChevronUp className="w-3 h-3" /> Zwiń</>
                ) : (
                  <><ChevronDown className="w-3 h-3" /> Rozwiń</>
                )}
              </button>
              <a
                href={GITHUB_PAGES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded px-3 py-1"
              >
                <ExternalLink className="w-3 h-3" />
                Otwórz
              </a>
            </div>
          </div>

          {/* Iframe */}
          {expanded ? (
            <iframe
              src={GITHUB_PAGES_URL}
              title="Dokumentacja Polska 2038"
              className="w-full border-0"
              style={{ height: '80vh', minHeight: '600px' }}
              loading="lazy"
              allow="fullscreen"
            />
          ) : (
            /* Podgląd z CTA gdy zwinięty */
            <div className="relative overflow-hidden" style={{ height: '320px' }}>
              <iframe
                src={GITHUB_PAGES_URL}
                title="Dokumentacja Polska 2038 — podgląd"
                className="w-full border-0 pointer-events-none"
                style={{ height: '80vh', transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.7%' }}
                loading="lazy"
                tabIndex={-1}
                aria-hidden="true"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900" />
              <div className="absolute bottom-6 inset-x-0 flex justify-center gap-4">
                <button
                  onClick={() => setExpanded(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <ChevronDown className="w-4 h-4" />
                  Zobacz pełną dokumentację
                </button>
                <a
                  href={GITHUB_PAGES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/20 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Nowa karta
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Linki do sekcji */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Trzy Filary', hash: '#filary' },
            { label: 'Komunikat Publiczny', hash: '#komunikat' },
            { label: 'Dokumentacja', hash: '#dokumentacja' },
            { label: 'Ściąga', hash: '#sciaga' },
          ].map(({ label, hash }) => (
            <a
              key={hash}
              href={`${GITHUB_PAGES_URL}${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-500/50 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white transition-all group"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-400 group-hover:text-red-300 flex-shrink-0" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
