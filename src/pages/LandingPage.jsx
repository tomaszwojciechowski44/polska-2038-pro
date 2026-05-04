import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cpu, MapPin, Users, TrendingUp, ArrowRight,
  Trophy, Shield, Zap, BarChart2, Mail, LogIn
} from 'lucide-react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollProgressBar } from '../components/UIUtils';

// Animated counter hook
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatNumber({ value, suffix = '', label, color }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCounter(value, 1800, visible);
  const display = value >= 1000 ? (count / 1000).toFixed(1).replace('.0', '') + 'K' : count;
  return (
    <div ref={ref} className="text-center">
      <div className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-none ${color}`}>
        {display}{suffix}
      </div>
      <div className="mt-2 text-gray-500 font-mono text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

const FEATURE_CARDS = [
  {
    to: '/technologia',
    icon: Cpu,
    color: 'text-brand-cyan',
    borderColor: 'hover:border-brand-cyan/40',
    glowColor: 'group-hover:bg-brand-cyan/5',
    tag: 'LiDAR · AI · PostGIS',
    title: 'Technologia',
    desc: 'Skanowanie biomechaniczne w czasie rzeczywistym. 127 parametrów, analiza ML, architektura mikrousług.',
  },
  {
    to: '/mapa-talentow',
    icon: MapPin,
    color: 'text-brand-neon',
    borderColor: 'hover:border-brand-neon/40',
    glowColor: 'group-hover:bg-brand-neon/5',
    tag: '16 województw · 47K profili',
    title: 'Mapa Talentów',
    desc: 'Interaktywna mapa wykrytych talentów. Filtruj po regionie, dyscyplinie, wieku i klasie AI.',
  },
  {
    to: '/dla-kogo',
    icon: Users,
    color: 'text-brand-gold',
    borderColor: 'hover:border-brand-gold/40',
    glowColor: 'group-hover:bg-brand-gold/5',
    tag: 'Zawodnicy · Skauci · Kluby',
    title: 'Dla kogo',
    desc: 'Od rodziców i dzieci po Ministerstwo Sportu. Każdy interesariusz ma swoje miejsce w systemie.',
  },
  {
    to: '/wyniki',
    icon: BarChart2,
    color: 'text-brand-red',
    borderColor: 'hover:border-brand-red/40',
    glowColor: 'group-hover:bg-brand-red/5',
    tag: 'ROI · Roadmapa · KPI',
    title: 'Wyniki i Roadmapa',
    desc: 'Kalkulator zwrotu z inwestycji, harmonogram wdrożenia i kamienie milowe programu do 2038.',
  },
  {
    to: '/partnerzy',
    icon: Trophy,
    color: 'text-purple-400',
    borderColor: 'hover:border-purple-400/40',
    glowColor: 'group-hover:bg-purple-400/5',
    tag: 'PZPN · UEFA · MSiT',
    title: 'Partnerzy',
    desc: 'Wsparcie federacji, sponsorów i mediów. Endorsementy od kluczowych graczy polskiego i europejskiego sportu.',
  },
  {
    to: '/kontakt',
    icon: Mail,
    color: 'text-gray-300',
    borderColor: 'hover:border-gray-400/40',
    glowColor: 'group-hover:bg-gray-400/5',
    tag: 'Ministerstwo · Inwestorzy',
    title: 'Kontakt',
    desc: 'Skontaktuj się z zespołem architektonicznym. Rozmowy o partnerstwie, pilotażu i wdrożeniu.',
  },
];

const SOCIAL_PROOF = [
  { badge: 'PZPN', label: 'rozmowy o pilotażu', color: 'text-brand-neon' },
  { badge: 'MSiT', label: 'pilotaż 50 Orlików', color: 'text-brand-red' },
  { badge: 'UEFA', label: 'obserwuje projekt', color: 'text-brand-gold' },
  { badge: 'FIFA', label: 'kontakt nawiązany', color: 'text-brand-cyan' },
  { badge: 'Lewandowski', label: 'ambasador projektu', color: 'text-brand-gold' },
];

// Animated LiDAR field — hero visual
function LidarField() {
  const dots = [
    { cx: '20%', cy: '42%', color: '#00FF88', score: 94 },
    { cx: '35%', cy: '68%', color: '#00E5FF', score: 87 },
    { cx: '50%', cy: '28%', color: '#FFD700', score: 91 },
    { cx: '65%', cy: '55%', color: '#00FF88', score: 78 },
    { cx: '80%', cy: '38%', color: '#DC143C', score: 72 },
    { cx: '45%', cy: '72%', color: '#00E5FF', score: 83 },
    { cx: '25%', cy: '78%', color: '#FFD700', score: 89 },
    { cx: '73%', cy: '22%', color: '#00FF88', score: 95 },
  ];
  return (
    <div className="relative w-full h-full border border-brand-neon/20 rounded-lg overflow-hidden bg-brand-card/30 backdrop-blur-sm">
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 800 260" preserveAspectRatio="none">
        <rect x="40" y="15" width="720" height="230" fill="none" stroke="#00FF88" strokeWidth="1.5" />
        <line x1="400" y1="15" x2="400" y2="245" stroke="#00FF88" strokeWidth="0.8" />
        <circle cx="400" cy="130" r="55" fill="none" stroke="#00FF88" strokeWidth="0.8" />
        <rect x="40" y="90" width="75" height="90" fill="none" stroke="#00FF88" strokeWidth="0.8" />
        <rect x="685" y="90" width="75" height="90" fill="none" stroke="#00FF88" strokeWidth="0.8" />
      </svg>
      {dots.map((d, i) => (
        <motion.div key={i} className="absolute" style={{ left: d.cx, top: d.cy }}
          animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, delay: i * 0.28, repeat: Infinity }}>
          <div className="w-5 h-5 rounded-full -translate-x-2.5 -translate-y-2.5 flex items-center justify-center text-[8px] font-bold font-mono text-black"
            style={{ backgroundColor: d.color, boxShadow: `0 0 10px ${d.color}80` }}>
            {d.score}
          </div>
        </motion.div>
      ))}
      <div className="absolute top-2 left-3 font-mono text-[10px] text-brand-neon/70">LIDAR SCAN · LIVE</div>
      <div className="absolute top-2 right-3 font-mono text-[10px] text-brand-neon/70">8 ZAWODNIKÓW</div>
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-brand-cyan/60">Orlik Rzeszów-Południe · 50.0°N 22.0°E</div>
      <div className="absolute bottom-2 right-3">
        <span className="px-2 py-0.5 bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-[10px] font-mono rounded">● LIVE</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-dark text-white font-display overflow-x-hidden">
        <ScrollProgressBar />
        <Navbar />

        {/* ─── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-red/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-cyan/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/80 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-4xl">
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-brand-neon/30 bg-brand-neon/5 rounded-full">
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
                <span className="text-brand-neon font-mono text-xs tracking-widest uppercase">
                  Narodowy OS Sportu · LiDAR + AI + PostGIS · v2.0
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-bold leading-none mb-6">
                <span className="block text-6xl sm:text-8xl lg:text-[110px] text-white tracking-tight">#POLSKA</span>
                <span className="block text-6xl sm:text-8xl lg:text-[110px] text-brand-red leading-none" style={{ textShadow: '0 0 60px rgba(220,20,60,0.35)' }}>2038</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
                className="text-xl sm:text-2xl font-display font-medium text-gray-300 mb-4 max-w-2xl leading-snug">
                Dane.{' '}
                <span className="text-brand-neon" style={{ textShadow: '0 0 20px rgba(0,255,136,0.4)' }}>Sztuczna Inteligencja.</span>{' '}
                Równe Szanse.
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
                className="text-gray-400 font-mono text-sm sm:text-base max-w-xl leading-relaxed mb-10">
                Narodowy system wykrywania talentów — od 6-latka na Orliku po kadrę narodową.
                LiDAR + AI = żaden talent z małej wsi nie umknie systemowi.
              </motion.p>

              {/* CTA row */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-3 mb-12">
                <Link to="/technologia"
                  className="flex items-center gap-2 px-6 py-3.5 bg-brand-red text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all">
                  Zobacz Architekturę <ArrowRight size={16} />
                </Link>
                <Link to="/mapa-talentow"
                  className="flex items-center gap-2 px-6 py-3.5 border-2 border-brand-neon text-brand-neon font-display font-bold text-sm uppercase tracking-widest hover:bg-brand-neon hover:text-brand-dark transition-all">
                  Mapa Talentów <MapPin size={16} />
                </Link>
                <Link to="/login"
                  className="flex items-center gap-2 px-6 py-3.5 border-2 border-brand-cyan text-brand-cyan font-display font-bold text-sm uppercase tracking-widest hover:bg-brand-cyan hover:text-brand-dark transition-all">
                  <LogIn size={16} /> Panel Skautingowy
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.65 }}
                className="flex flex-wrap gap-2">
                {SOCIAL_PROOF.map((p) => (
                  <div key={p.badge} className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border/50 bg-brand-card/30 backdrop-blur-sm">
                    <span className={`font-mono font-bold text-xs ${p.color}`}>{p.badge}</span>
                    <span className="text-gray-600 font-mono text-[10px]">— {p.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* LiDAR visual — floats right on large screens */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="mt-12 lg:mt-0 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] h-52 sm:h-64 lg:h-72 xl:h-80">
              <LidarField />
            </motion.div>
          </div>
        </section>

        {/* ─── STATS BAR ─────────────────────────────────────────────────── */}
        <section className="border-y border-brand-border bg-brand-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <StatNumber value={47388} label="Przeskanowanych profili" color="text-brand-cyan" />
            <StatNumber value={16}    suffix="" label="Województw aktywnych" color="text-brand-neon" />
            <StatNumber value={847}   label="Certyfikowanych skautów" color="text-brand-gold" />
            <div className="text-center">
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-none text-brand-red">98.7%</div>
              <div className="mt-2 text-gray-500 font-mono text-xs uppercase tracking-widest">Trafność predykcji AI</div>
            </div>
          </div>
        </section>

        {/* ─── FEATURE CARDS ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-12">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-brand-cyan" />
                <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">Explore</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Odkryj system</h2>
              <p className="mt-2 text-gray-500 font-mono text-sm max-w-lg">
                Każda sekcja to oddzielna podstrona. Wejdź w obszar, który Cię interesuje.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURE_CARDS.map(({ to, icon: Icon, color, borderColor, glowColor, tag, title, desc }, i) => (
                <motion.div key={to}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={to}
                    className={`group block p-6 border border-brand-border bg-brand-card rounded-lg transition-all duration-200 ${borderColor} ${glowColor} hover:translate-y-[-2px] h-full`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-brand-dark border border-brand-border group-hover:border-current transition-colors ${color}`}>
                        <Icon size={18} />
                      </div>
                      <ArrowRight size={16} className="text-gray-700 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${color} opacity-70`}>{tag}</div>
                    <h3 className="text-white font-display font-bold text-lg mb-2">{title}</h3>
                    <p className="text-gray-500 font-mono text-xs leading-relaxed">{desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-brand-card/20 border-y border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-12 text-center">
              <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Jak to działa</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white">Od skanowania do akademii</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
              {/* Connector line */}
              <div className="hidden sm:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-brand-neon/20 via-brand-cyan/40 to-brand-neon/20" />
              {[
                { step: '01', icon: Zap, color: 'text-brand-neon', border: 'border-brand-neon/30', title: 'Skan LiDAR na Orliku', desc: '8 kamer 3D skanuje zawodników w czasie rzeczywistym podczas standardowego treningu.' },
                { step: '02', icon: Cpu, color: 'text-brand-cyan', border: 'border-brand-cyan/30', title: 'Analiza AI (127 param.)', desc: 'Model ML porównuje biomechanikę z bazą 2,3M pomiarów olimpijskich. Wynik w <2s.' },
                { step: '03', icon: Shield, color: 'text-brand-gold', border: 'border-brand-gold/30', title: 'Alert do skauta', desc: 'Certyfikowany skaut otrzymuje powiadomienie z profilem talentu i rekomendacją działania.' },
              ].map(({ step, icon: Icon, color, border, title, desc }, i) => (
                <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative text-center">
                  <div className={`w-16 h-16 rounded-full border-2 ${border} bg-brand-dark flex items-center justify-center mx-auto mb-4 relative z-10`}>
                    <Icon size={24} className={color} />
                  </div>
                  <div className="text-gray-700 font-mono text-xs mb-1">{step}</div>
                  <h3 className="text-white font-display font-bold text-sm mb-2">{title}</h3>
                  <p className="text-gray-500 font-mono text-xs leading-relaxed max-w-xs mx-auto">{desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/technologia"
                className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm hover:text-white transition-colors">
                Pełna dokumentacja technologiczna <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 text-center relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">Dołącz do programu</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                Razem budujemy<br />przyszłość polskiego sportu
              </h2>
              <p className="mt-4 text-gray-400 font-mono text-sm leading-relaxed mb-8">
                Zarejestruj zawodnika, zostań skautem lub skontaktuj się z zespołem programu
                w sprawie partnerstwa i pilotażu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/rejestracja"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-neon text-brand-dark font-display font-bold text-sm uppercase tracking-widest hover:bg-green-300 transition-all">
                  Rejestracja zawodnika <ArrowRight size={16} />
                </Link>
                <Link to="/rejestracja/skaut"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-gold text-brand-gold font-display font-bold text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all">
                  Zostań skautem <Shield size={16} />
                </Link>
                <Link to="/kontakt"
                  className="flex items-center justify-center gap-2 px-8 py-4 border border-brand-border text-gray-400 font-mono text-xs uppercase tracking-widest hover:border-gray-500 hover:text-white transition-all">
                  Kontakt <Mail size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
