import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cpu, MapPin, Users, ArrowRight,
  Trophy, Shield, Zap, BarChart2, Mail, LogIn
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollProgressBar } from '../components/UIUtils';
import CountdownSection from '../components/CountdownSection';
import EndorsementsSection from '../components/EndorsementsSection';
import { getVoivodeships } from '../api/client';
import TabbedExplorerSection from '../components/TabbedExplorerSection';
import TrustBar from '../components/TrustBar';
import PersonaRouting from '../components/PersonaRouting';
import InternationalSection from '../components/InternationalSection';
import { useLanguage } from '../context/LanguageContext';

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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onChange = () => setReduced(Boolean(mq.matches));
      onChange();
      mq.addEventListener?.('change', onChange);
      return () => mq.removeEventListener?.('change', onChange);
    } catch {
      return undefined;
    }
  }, []);
  return reduced;
}

function HeroKpiCard({ idx, metric, visible, reducedMotion }) {
  const duration = 1500;
  const count = useCounter(idx === 3 ? 400 : (idx === 1 ? 370 : idx === 2 ? 2500 : 5200000), duration, visible && !reducedMotion);

  const valueStr =
    idx === 0 ? '5M+' :
    idx === 1 ? `${reducedMotion ? 370 : count}%` :
    idx === 2 ? `${reducedMotion ? 2500 : count}+` :
    `<${((reducedMotion ? 400 : count) / 1000).toFixed(1)}s`;

  return (
    <div className="border border-brand-border bg-brand-card/30 backdrop-blur-sm p-4">
      <div className={`font-display font-bold text-2xl sm:text-3xl leading-none ${metric.c}`}>{valueStr}</div>
      <div className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mt-1">{metric.k}</div>
      <div className="text-gray-500 font-mono text-[11px] mt-1">{metric.sub}</div>
    </div>
  );
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

// NOTE: Feature cards replaced by TabbedExplorerSection on landing.

// Professional hero dashboard card
function HeroDashboard() {
  const { t, lang } = useLanguage();
  const dash = t?.landing?.heroDashboard;
  const perYear = lang === 'en' ? '/yr' : '/rok';
  const metrics = (dash?.metrics && dash.metrics.length === 4)
    ? dash.metrics.map((m, i) => ({
        ...m,
        color: ['text-brand-red', 'text-yellow-400', 'text-brand-neon', 'text-brand-cyan'][i],
        value: m.value,
      }))
    : [];
  const pillars = dash?.pillars && dash.pillars.length === 3 ? dash.pillars : [];
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="bg-black/60 border border-white/8 rounded-xl p-3 backdrop-blur-sm">
            <div className={`text-xl font-black ${m.color} leading-none`}>{m.value}</div>
            <div className="text-gray-500 text-[10px] font-mono mt-1 uppercase tracking-wide leading-tight">{m.label}</div>
            <div className="text-gray-600 text-[10px] font-mono">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {pillars.map((p) => (
          <div key={p.name} className={`flex items-center justify-between bg-black/40 border ${p.color.split(' ')[0]} rounded-lg px-3 py-2 backdrop-blur-sm`}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{p.icon}</span>
              <span className={`text-xs font-bold ${p.color.split(' ')[1]}`}>{p.name}</span>
            </div>
            <span className="text-gray-400 text-[10px] font-mono">{p.budget}{perYear}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-black/40 border border-white/6 rounded-lg px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
          <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest">{dash?.statusActive}</span>
        </div>
        <span className="text-gray-600 font-mono text-[10px]">{dash?.statusSub}</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { t, lang, localePath } = useLanguage();
  const numberLocale = lang === 'en' ? 'en-GB' : 'pl-PL';
  const socialProof = Array.isArray(t?.landing?.socialProof) ? t.landing.socialProof : [];
  const statsBar = t?.landing?.statsBar ?? {};
  const finalCta = t?.landing?.finalCta ?? {};
  const reducedMotion = usePrefersReducedMotion();
  const FALLBACK_LIVE = 5239018;
  const [liveTalents, setLiveTalents] = useState(FALLBACK_LIVE);
  const [liveSource, setLiveSource] = useState('DEMO');

  useEffect(() => {
    // Remove legacy landing hash routes like /#modules (treat as non-existent).
    try {
      if (window.location.hash && window.location.hash.toLowerCase() === '#modules') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    getVoivodeships()
      .then((res) => {
        const sum = (res.data || []).reduce((s, v) => s + (v.talent_count ?? 0), 0);
        if (mounted && sum > 0) {
          setLiveTalents(sum);
          setLiveSource('LIVE');
        }
      })
      .catch(() => {
        // keep fallback
      });
    return () => { mounted = false; };
  }, []);

  const HERO_KPIS = useMemo(() => {
    const k = t?.hero?.kpis;
    if (Array.isArray(k) && k.length === 4) {
      const colors = ['text-brand-neon', 'text-yellow-400', 'text-brand-cyan', 'text-brand-red'];
      return k.map((x, i) => ({ ...x, c: colors[i] }));
    }
    return ([
      { k: 'Players', v: '5M+', sub: 'tracked', c: 'text-brand-neon' },
      { k: 'ROI', v: '370%', sub: 'projection', c: 'text-yellow-400' },
      { k: 'Pitches', v: '2500+', sub: 'LiDAR pilot', c: 'text-brand-cyan' },
      { k: 'Latency', v: '<0.4s', sub: 'scan → alert', c: 'text-brand-red' },
    ]);
  }, [t]);

  const kpiRef = useRef(null);
  const [kpiVisible, setKpiVisible] = useState(false);
  useEffect(() => {
    const el = kpiRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setKpiVisible(true);
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

              {/* ── Left: text ── */}
              <div className="flex-1 min-w-0">
                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-brand-neon/30 bg-brand-neon/5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
                  <span className="text-brand-neon font-mono text-xs tracking-widest uppercase">
                    {t?.landing?.heroTagline}
                  </span>
                </motion.div>

                {/* Live badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 border border-brand-cyan/30 bg-brand-cyan/5"
                >
                  <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
                  <span className="text-brand-cyan font-mono text-[10px] tracking-widest uppercase">
                    {t?.hero?.live ?? 'LIVE'} · {t?.hero?.liveBadge
                      ? t.hero.liveBadge.replace('{count}', liveTalents.toLocaleString(numberLocale))
                      : `${liveTalents.toLocaleString(numberLocale)} talents`}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-display font-bold leading-none mb-6">
                  <span className="block text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                    {t?.hero?.headlineA ?? 'National OS'}
                  </span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl text-gray-200 tracking-tight">
                    {(t?.hero?.headlineB ?? 'of Polish {accent}').replace('{accent}', '')}
                    <span className="text-brand-neon text-glow-neon">
                      {t?.hero?.accent ?? 'football'}
                    </span>
                  </span>
                </motion.h1>

                {/* Hero KPIs instead of long description */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 max-w-xl"
                  ref={kpiRef}
                >
                  {HERO_KPIS.map((m, idx) => (
                    <HeroKpiCard
                      key={m.k}
                      idx={idx}
                      metric={m}
                      visible={kpiVisible}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.38 }}
                  className="text-gray-400 font-mono text-sm max-w-md leading-relaxed mb-10"
                >
                  {t?.hero?.sub ?? 'LiDAR + AI + PostGIS — one unified system for every talent.'}
                </motion.p>

                {/* CTA row */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex flex-wrap gap-3 mb-10">
                  <a
                    href="#modules"
                    className="flex items-center gap-2 px-6 py-3.5 bg-brand-red text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all"
                  >
                    <Trophy size={16} /> {t?.hero?.ctaPrimary ?? 'Explore system →'}
                  </a>
                  <a
                    href="#scouting-ai"
                    className="flex items-center gap-2 px-6 py-3.5 border-2 border-brand-neon text-brand-neon font-display font-bold text-sm uppercase tracking-widest hover:bg-brand-neon hover:text-brand-dark transition-all"
                  >
                    {t?.hero?.ctaGhost ?? 'How does it work?'} <ArrowRight size={16} />
                  </a>
                  <Link to={localePath('/login')}
                    className="flex items-center gap-2 px-6 py-3.5 border border-brand-border text-gray-400 font-mono text-xs uppercase tracking-widest hover:border-brand-cyan hover:text-brand-cyan transition-all">
                    <LogIn size={14} /> {t?.nav?.panel ?? 'Panel'}
                  </Link>
                </motion.div>

                {/* Social proof */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.65 }}
                  className="flex flex-wrap gap-2">
                  {socialProof.map((p) => (
                    <div key={p.badge} className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border/50 bg-brand-card/30 backdrop-blur-sm">
                      <span className={`font-mono font-bold text-xs ${p.color}`}>{p.badge}</span>
                      <span className="text-gray-600 font-mono text-[10px]">— {p.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── Right: dashboard card ── */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
                className="mt-12 lg:mt-0 lg:w-[400px] xl:w-[440px] flex-shrink-0">
                <HeroDashboard />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── COUNTDOWN ─────────────────────────────────────────────────── */}
        <CountdownSection />

        {/* ─── TRUST BAR ─────────────────────────────────────────────────── */}
        <TrustBar />

        {/* ─── PERSONA ROUTING ───────────────────────────────────────────── */}
        <PersonaRouting />

        {/* Anchor targets (scroll only; no hash URLs) */}
        <div id="modules-start" className="scroll-mt-28" />
        <div id="scouting-ai" className="scroll-mt-28" />
        <div id="mapa" className="scroll-mt-28" />
        <div id="business" className="scroll-mt-28" />
        <div id="tech-stack" className="scroll-mt-28" />

        {/* ─── TABBED EXPLORATION (5 modules) ────────────────────────────── */}
        <TabbedExplorerSection />

        {/* ─── STATS BAR ─────────────────────────────────────────────────── */}
        <section className="border-y border-brand-border bg-brand-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <StatNumber value={47388} label={statsBar.scannedProfiles ?? ''} color="text-brand-cyan" />
            <StatNumber value={16}    suffix="" label={statsBar.voivodeships ?? ''} color="text-brand-neon" />
            <StatNumber value={847}   label={statsBar.scouts ?? ''} color="text-brand-gold" />
            <div className="text-center">
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-none text-brand-red">98.7%</div>
              <div className="mt-2 text-gray-500 font-mono text-xs uppercase tracking-widest">{statsBar.aiAccuracy ?? ''}</div>
            </div>
          </div>
        </section>

        {/* ─── ENDORSEMENTS ──────────────────────────────────────────────── */}
        <EndorsementsSection />

        {/* ─── INTERNATIONAL (EN only) ───────────────────────────────────── */}
        <InternationalSection />

        {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 text-center relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">{finalCta.eyebrow}</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                {finalCta.titleLine1}<br />{finalCta.titleLine2}
              </h2>
              <p className="mt-4 text-gray-400 font-mono text-sm leading-relaxed mb-8">
                {finalCta.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={localePath('/kontakt')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-neon text-brand-dark font-display font-bold text-sm uppercase tracking-widest hover:bg-green-300 transition-all">
                  {finalCta.contactBtn} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      <Footer />
    </div>
  );
}
