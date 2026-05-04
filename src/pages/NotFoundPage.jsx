import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <div className="font-display font-bold text-[120px] sm:text-[180px] leading-none bg-gradient-to-b from-cyan-400/30 to-transparent bg-clip-text text-transparent select-none">
          404
        </div>
        <div className="mt-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-gray-600">
            Strona nie istnieje
          </span>
        </div>
        <h1 className="text-white font-display font-bold text-2xl sm:text-3xl mb-3">
          Nie znaleziono strony
        </h1>
        <p className="text-gray-500 font-mono text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
          Sprawdź adres URL lub wróć do strony głównej.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#1e2d4a] text-gray-400
              hover:text-white font-mono text-xs rounded transition-colors"
          >
            <ArrowLeft size={14} /> Wróć
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-[#080d1a]
              font-display font-bold text-xs uppercase tracking-widest rounded
              hover:bg-cyan-300 transition-colors"
          >
            <Home size={14} /> Strona główna
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-700">
          <Link to="/o-programie" className="hover:text-gray-400 transition-colors">O programie</Link>
          <Link to="/rejestracja" className="hover:text-gray-400 transition-colors">Rejestracja zawodnika</Link>
          <Link to="/rejestracja/skaut" className="hover:text-gray-400 transition-colors">Rejestracja skauta</Link>
          <Link to="/login" className="hover:text-gray-400 transition-colors">Logowanie</Link>
        </div>
      </motion.div>
    </div>
  );
}
