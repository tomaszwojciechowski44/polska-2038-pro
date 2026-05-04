import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { LogIn, Shield, Users, TrendingUp, Activity, CheckCircle, Circle, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Shield,     label: 'JWT Autoryzacja',       desc: 'Bezpieczny login + tokeny dostępu' },
  { icon: Users,      label: '112 Talentów w API',     desc: '16 województw · dane biomechaniczne' },
  { icon: TrendingUp, label: 'AI Score Tracking',      desc: 'Progresja ocen w czasie · wykresy' },
  { icon: Activity,   label: 'Filtry i sortowanie',    desc: 'Woj., tier ELITE/PROSPECT, wiek, score' },
];

const ENDPOINTS = [
  { method: 'POST', path: '/api/auth/login',     desc: 'Generuje JWT token' },
  { method: 'GET',  path: '/api/talents',         desc: '112 talentów z filtrami' },
  { method: 'GET',  path: '/api/voivodeships',    desc: '16 województw + statystyki' },
  { method: 'GET',  path: '/api/scouts/stats',    desc: 'Statystyki panelu (auth)' },
];

export default function ScoutPortalSection() {
  const [ref, inView] = useInView(0.1);
  const [apiStatus, setApiStatus] = useState('checking');
  const [talentCount, setTalentCount] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => {
        if (d.status === 'ok') setApiStatus('online');
        else setApiStatus('offline');
      })
      .catch(() => setApiStatus('offline'));

    fetch('/api/talents?limit=1')
      .then(r => r.json())
      .then(() => setTalentCount(112))
      .catch(() => {});
  }, []);

  return (
    <section id="portal-skautingowy" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan font-mono text-xs uppercase tracking-widest mb-4 rounded-sm">
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-brand-neon animate-pulse' : apiStatus === 'checking' ? 'bg-brand-gold animate-pulse' : 'bg-red-500'}`} />
            API Status: {apiStatus === 'online' ? 'ONLINE' : apiStatus === 'checking' ? 'SPRAWDZAM...' : 'OFFLINE'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Portal <span className="text-brand-cyan">Skautingowy</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto leading-relaxed">
            Zaloguj się do systemu Polska2038 i uzyskaj dostęp do pełnej bazy talentów z AI Score,
            biomechaniką i historią progresji. Backend zbudowany w&nbsp;
            <span className="text-brand-neon">Python FastAPI</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT — Login card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="border border-brand-cyan/30 bg-brand-dark rounded-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-brand-cyan/40 bg-brand-cyan/10 flex items-center justify-center rounded-sm">
                  <LogIn size={18} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="text-white font-display font-bold text-lg">Dostęp do Panelu</div>
                  <div className="text-gray-500 font-mono text-xs">JWT · Autoryzacja Bearer Token</div>
                </div>
              </div>

              {/* Demo credentials */}
              <div className="space-y-3 mb-6">
                {[
                  { role: 'SKAUT', email: 'skaut@polska2038.pl', pw: 'haslo123', color: 'text-brand-neon', border: 'border-brand-neon/20 bg-brand-neon/5' },
                  { role: 'ADMIN', email: 'admin@polska2038.pl', pw: 'admin123', color: 'text-brand-gold', border: 'border-brand-gold/20 bg-brand-gold/5' },
                ].map(u => (
                  <div key={u.role} className={`flex items-center justify-between p-3 border rounded-sm ${u.border}`}>
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${u.color}`}>{u.role}</span>
                      <div className="text-white font-mono text-xs mt-0.5">{u.email}</div>
                    </div>
                    <div className="text-gray-500 font-mono text-xs">{u.pw}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/login"
                className="flex items-center justify-center gap-3 w-full py-4 bg-brand-cyan text-brand-dark font-display font-bold text-sm uppercase tracking-widest hover:bg-cyan-300 transition-all duration-200 rounded-sm"
              >
                <LogIn size={16} />
                Zaloguj się do Panelu
              </Link>

              <div className="mt-4 flex items-center gap-2 text-gray-600 font-mono text-[10px]">
                <Shield size={10} />
                <span>Sesja wygasa po 8 godzinach · dane tylko demo</span>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="mt-4 border border-brand-border bg-brand-dark rounded-sm p-4">
              <div className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mb-3">Python FastAPI — Endpointy</div>
              <div className="space-y-2">
                {ENDPOINTS.map(e => (
                  <div key={e.path} className="flex items-center gap-3">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${
                      e.method === 'POST'
                        ? 'text-brand-gold border-brand-gold/30 bg-brand-gold/10'
                        : 'text-brand-neon border-brand-neon/30 bg-brand-neon/10'
                    }`}>{e.method}</span>
                    <span className="text-brand-cyan font-mono text-xs flex-shrink-0">{e.path}</span>
                    <span className="text-gray-600 font-mono text-[10px] truncate">{e.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Features */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-2">Co znajdziesz w panelu</div>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-4 p-4 border border-brand-border bg-brand-dark hover:border-brand-cyan/30 transition-colors rounded-sm"
              >
                <div className="w-9 h-9 border border-brand-cyan/30 bg-brand-cyan/10 flex items-center justify-center rounded-sm flex-shrink-0">
                  <f.icon size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="text-white font-display font-bold text-sm">{f.label}</div>
                  <div className="text-gray-500 font-mono text-xs mt-0.5">{f.desc}</div>
                </div>
                <CheckCircle size={14} className="text-brand-neon ml-auto flex-shrink-0 mt-0.5" />
              </motion.div>
            ))}

            {/* Live stats */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { val: talentCount ?? '112', label: 'Talentów', color: 'text-brand-cyan' },
                { val: '16', label: 'Województw', color: 'text-brand-neon' },
                { val: '5', label: 'API Routes', color: 'text-brand-gold' },
              ].map(s => (
                <div key={s.label} className="text-center p-3 border border-brand-border bg-brand-dark rounded-sm">
                  <div className={`font-display font-bold text-xl ${s.color}`}>{s.val}</div>
                  <div className="text-gray-600 font-mono text-[10px] uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech badge */}
            <div className="flex items-center gap-2 p-3 border border-brand-border bg-brand-dark rounded-sm">
              <Zap size={12} className="text-brand-gold flex-shrink-0" />
              <span className="text-gray-500 font-mono text-[10px]">
                Backend: <span className="text-brand-neon">Python 3.12 + FastAPI</span> ·
                Auth: <span className="text-brand-cyan">JWT HS256</span> ·
                Deploy: <span className="text-brand-gold">Vercel Serverless</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
