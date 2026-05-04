import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ChevronUp, LogIn } from 'lucide-react';

// Scroll progress bar at top of page
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-brand-border/30">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-neon via-brand-cyan to-brand-gold"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.05 }}
      />
    </div>
  );
}

// Floating action button (Contact + Back to top)
export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrolled > 600);
      setAtBottom(scrolled > total * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          {/* Panel CTA */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-3 bg-brand-cyan text-brand-dark font-display font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-cyan/20 hover:bg-cyan-300 transition-colors"
            >
              <LogIn size={14} />
              <span className="hidden sm:inline">Panel</span>
            </Link>
          </motion.div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 bg-brand-card border border-brand-border text-gray-400 hover:text-brand-neon hover:border-brand-neon/50 transition-colors shadow-lg self-end"
          >
            <ChevronUp size={18} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

