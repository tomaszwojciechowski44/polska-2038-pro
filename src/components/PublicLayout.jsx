import Navbar from './Navbar';
import Footer from './Footer';
import { ScrollProgressBar, FloatingCTA } from './UIUtils';

export default function PublicLayout({ children, pageTitle, pageSubtitle }) {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-display">
      <ScrollProgressBar />
      <Navbar />
      {pageTitle && (
        <div className="pt-28 pb-12 px-4 border-b border-brand-border bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">{pageTitle}</h1>
            {pageSubtitle && (
              <p className="mt-3 text-gray-400 font-mono text-sm max-w-xl leading-relaxed">
                {pageSubtitle}
              </p>
            )}
          </div>
        </div>
      )}
      {children}
      <FloatingCTA />
      <Footer />
    </div>
  );
}
