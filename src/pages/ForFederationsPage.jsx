import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy, Shield, GraduationCap, TrendingUp, Download,
  Globe, Users, Target, CheckCircle, Mail, ArrowRight, ExternalLink,
} from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const STATS = [
  { value: '38M',    label: 'Population',          sub: '10× more than Croatia',     color: 'text-white' },
  { value: '1.08B',  label: 'PLN/year budget',      sub: '~€250M annual investment',  color: 'text-brand-neon' },
  { value: '370%',   label: 'Projected ROI',         sub: 'Conservative estimate',     color: 'text-yellow-400' },
  { value: '2038',   label: 'World Cup Final',       sub: 'The ultimate goal',         color: 'text-brand-red' },
];

const PILLARS_EN = [
  {
    icon: Trophy, color: 'text-red-400', border: 'border-red-500/30',
    title: 'PILLAR 1: POLAND 2038', budget: '€235M / year',
    items: [
      'Talenciak+ Program: 1,000 children/year, ages 6–13',
      'Eagle 2038 Project: top 120 players U15–U21',
      'Full-time U21 national team (25 players on PZPN contracts)',
      'Orlik 3.0: 2,477 AI-equipped training grounds nationwide',
      'Central AI database: 10,000+ player profiles tracked in real time',
      'Ekstraklasa Premium: financial incentives for fielding Polish players',
    ],
    goal: 'World Cup Final 2038 · Ekstraklasa in UEFA TOP 5 by 2035',
  },
  {
    icon: Shield, color: 'text-blue-400', border: 'border-blue-500/30',
    title: 'PILLAR 2: SAFE STADIUM', budget: '€11.7M / year',
    items: [
      '200 stadiums with "Family-Friendly" certification',
      'National exclusion database for hooligans',
      'Independent safety audits (2×/year, unannounced)',
      '"Family at the Stadium" national campaign',
      'Zero tolerance: ejection + ban for any misconduct in family zones',
    ],
    goal: 'Attendance +30% · Incidents −80% by 2030',
  },
  {
    icon: GraduationCap, color: 'text-green-400', border: 'border-green-500/30',
    title: 'PILLAR 3: COACH EVALUATION', budget: '€7M / year',
    items: [
      '5,000 coaches audited annually by university sports experts (AWF)',
      'NOT evaluated by PZPN — independent oversight only',
      '50-criteria assessment: child development, technique, ethics, communication',
      'Public ranking platform: parents check coach quality before registration',
      'Underperforming coaches banned from public funding',
      'Training programs for coaches scoring 5–6/10',
    ],
    goal: '100% of publicly-funded coaches evaluated by 2028 · ROI: 2,300%',
  },
];

const COMPARISON = [
  { flag: '🇭🇷', country: 'Croatia',  pop: '4M',  achievement: 'WC Final 2018, 3rd 2022', ratio: '0.25 players/100K',   highlight: false },
  { flag: '🇵🇹', country: 'Portugal', pop: '10M', achievement: 'Euro 2016, Nations League', ratio: '0.35 players/100K',  highlight: false },
  { flag: '🇧🇪', country: 'Belgium',  pop: '11M', achievement: '#1 FIFA ranking for 5 years', ratio: '0.45 players/100K', highlight: false },
  { flag: '🇵🇱', country: 'Poland',   pop: '38M', achievement: '0 major titles since 1982', ratio: '0.08 players/100K',  highlight: true },
  { flag: '🇵🇱', country: 'Poland 2038', pop: '38M', achievement: 'World Cup Final (goal)',  ratio: '0.30+ players/100K', highlight: false, goal: true },
];

const TIMELINE_EN = [
  { year: '2026', phase: 'PILOT', color: 'bg-yellow-500', text: 'text-yellow-400',
    items: ['3 voivodeships', '50 Orlik 3.0 grounds', '500 coaches in evaluation system'] },
  { year: '2027', phase: 'SCALE-UP', color: 'bg-orange-500', text: 'text-orange-400',
    items: ['All 16 voivodeships', 'Ekstraklasa reduced to 14 clubs'] },
  { year: '2028–30', phase: 'FOUNDATIONS', color: 'bg-red-500', text: 'text-red-400',
    items: ['1,000 Orlik 3.0 grounds', 'U21 full-time squad', '100% coaches evaluated'] },
  { year: '2035', phase: 'BREAKTHROUGH', color: 'bg-purple-500', text: 'text-purple-400',
    items: ['Ekstraklasa in UEFA TOP 5', '100+ Poles in TOP 5 leagues'] },
  { year: '2038', phase: '🏆 WC FINAL', color: 'bg-brand-neon', text: 'text-brand-neon',
    items: ['World Cup Final — Poland'] },
];

export default function ForFederationsPage() {
  return (
    <PublicLayout pageTitle="" pageSubtitle="">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-red-950/30 via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,20,60,0.12),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/30 rounded-full px-5 py-2 mb-6 text-brand-neon font-mono text-xs uppercase tracking-widest">
              <Globe className="w-4 h-4" /> For UEFA · FIFA · CONMEBOL · Continental Federations
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">🇵🇱</span>
              <h1 className="text-5xl md:text-7xl font-black text-white">POLAND 2038</h1>
              <span className="text-5xl">🏆</span>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-bold mb-4">
              A National Football Reform Initiative
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
              Poland has <span className="text-white font-bold">38 million people</span> and has not won a major international trophy since 1982.
              This citizen-led initiative proposes a <span className="text-brand-neon font-bold">three-pillar systemic reform</span> that can
              make Poland a football powerhouse by 2038 — the year it could host or play in the World Cup Final.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-gray-300 text-xs font-bold mt-1">{s.label}</div>
                <div className="text-gray-600 text-xs font-mono mt-0.5">{s.sub}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4">
            <a href="https://polska-2038.github.io/projekt-polska-2038-pro/PDF-GOTOWE/01-EXECUTIVE-SUMMARY.html"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-600/30">
              <Download className="w-5 h-5" /> Download Executive Summary
            </a>
            <Link to="/reforma/en"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all border border-white/20">
              Read Full Reform Plan <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-16 bg-black border-y border-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">⚠️ The Problem — A Generational Opportunity Wasted</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📉', title: 'Under-Achievement', desc: '38 million people, ~30 players in TOP 5 leagues. Croatia (4M pop.) produces 3× more per capita. Poland is Europe\'s biggest football underperformer.' },
              { icon: '⏰', title: 'The Window is Now', desc: 'Birth cohorts 2010–2016 are the largest in 30 years (400K/year). These children turn 28 in 2038 — peak performance age for a World Cup Final.' },
              { icon: '🔧', title: 'Fixable With System', desc: 'The problem isn\'t talent — it\'s no system to find it. AI + LiDAR on existing Orlik grounds can identify every gifted child in Poland, from any village.' },
            ].map((p) => (
              <motion.div key={p.title} {...fadeUp(0.1)}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="text-white font-bold mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white">🏗️ Three Pillars of Reform</h2>
            <p className="text-gray-400 mt-3">A systemic approach — all three pillars must work together.</p>
          </motion.div>
          <div className="space-y-6">
            {PILLARS_EN.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fadeUp(i * 0.1)}
                  className={`bg-gray-900 border ${p.border} rounded-2xl p-7`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl border ${p.border} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${p.color}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className={`text-xl font-black ${p.color}`}>{p.title}</h3>
                        <span className={`text-xs font-mono font-bold ${p.color} bg-current/10 px-3 py-1 rounded-full`}>{p.budget}</span>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                        {p.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle className={`w-4 h-4 ${p.color} flex-shrink-0 mt-0.5`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className={`text-xs font-mono ${p.color} bg-white/3 border border-current/20 rounded-lg px-3 py-2 inline-block`}>
                        🎯 Goal: {p.goal}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">🌍 Poland vs The World — The Gap That Must Close</h2>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Country', 'Population', 'Best Achievement', 'Top-5 League Players / 100K citizens', ''].map(h => (
                    <th key={h} className="text-left text-gray-500 font-mono text-xs uppercase py-3 pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r, i) => (
                  <tr key={i} className={`border-b ${r.highlight ? 'bg-red-950/20 border-red-900/30' : r.goal ? 'bg-green-950/10 border-green-900/20' : 'border-gray-900'}`}>
                    <td className="py-4 pr-6">
                      <span className="text-2xl mr-2">{r.flag}</span>
                      <span className={`font-bold ${r.highlight ? 'text-red-400' : r.goal ? 'text-brand-neon' : 'text-white'}`}>{r.country}</span>
                    </td>
                    <td className="py-4 pr-6 text-gray-400 text-sm">{r.pop}</td>
                    <td className="py-4 pr-6 text-gray-300 text-sm">{r.achievement}</td>
                    <td className="py-4 pr-6">
                      <span className={`font-black ${r.highlight ? 'text-red-400' : r.goal ? 'text-brand-neon' : 'text-white'}`}>{r.ratio}</span>
                    </td>
                    <td className="py-4">
                      {r.highlight && <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded font-mono">Current</span>}
                      {r.goal && <span className="text-xs bg-brand-neon/20 text-brand-neon px-2 py-1 rounded font-mono">Target 2038</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">⏰ Implementation Timeline</h2>
          </motion.div>
          <div className="space-y-3">
            {TIMELINE_EN.map((t, i) => (
              <motion.div key={t.year} {...fadeUp(i * 0.07)}
                className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className={`text-lg font-black ${t.text} w-20 flex-shrink-0 font-mono`}>{t.year}</div>
                <div className={`w-2 h-2 rounded-full ${t.color} flex-shrink-0`} />
                <div className="flex-1">
                  <span className={`text-xs font-mono font-bold ${t.text} mr-2`}>{t.phase}</span>
                  <span className="text-gray-300 text-sm">{t.items.join(' · ')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="py-16 bg-gradient-to-r from-red-950/50 via-black to-red-950/50 border-y border-red-900/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-3xl font-black text-white mb-6">⚡ Why This Window Won't Come Again</h2>
            <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
              {[
                { n: '400,000', label: 'births/year', desc: 'Cohorts 2010–2016 — largest in 30 years', color: 'text-brand-neon' },
                { n: '28', label: 'years old', desc: 'What rocznik 2010 will be in 2038 — peak form', color: 'text-yellow-400' },
                { n: '12', label: 'years left', desc: 'The window to build champions closes 2030', color: 'text-brand-red' },
              ].map(p => (
                <div key={p.n} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className={`text-3xl font-black ${p.color}`}>{p.n}</div>
                  <div className="text-white font-bold text-sm">{p.label}</div>
                  <div className="text-gray-400 text-xs mt-1">{p.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-xl font-black text-red-300">IF WE DON'T START NOW, WE LOSE AN ENTIRE GENERATION.</p>
          </motion.div>
        </div>
      </section>

      {/* WHAT FEDERATIONS CAN DO */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">🤝 What Federations Can Do</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { org: '🏛️ UEFA', color: 'border-brand-neon/30 text-brand-neon',
                items: ['Recognize as model reform', 'Share methodology with member nations', 'Consider co-funding Orlik 3.0 AI upgrade'] },
              { org: '🌍 FIFA', color: 'border-yellow-500/30 text-yellow-400',
                items: ['Reference in World Football Report', 'Forward Agenda 2030 alignment', 'Endorse citizen-led governance model'] },
              { org: '🇵🇱 PZPN', color: 'border-red-500/30 text-red-400',
                items: ['Launch Talenciak+ pilot 2026', 'Adopt independent coach evaluation', 'Reduce Ekstraklasa to 14 clubs'] },
              { org: '🏙️ Ministry of Sport', color: 'border-blue-500/30 text-blue-400',
                items: ['Secure 1.08B PLN/year budget', 'Commission independent feasibility study', 'Start 3-voivodeship pilot in 2026'] },
            ].map((f) => (
              <motion.div key={f.org} {...fadeUp(0.1)}
                className={`bg-gray-900 border ${f.color.split(' ')[0]} rounded-2xl p-5`}>
                <h3 className={`font-black mb-3 ${f.color.split(' ')[1]}`}>{f.org}</h3>
                <ul className="space-y-2">
                  {f.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle className={`w-3.5 h-3.5 ${f.color.split(' ')[1]} flex-shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD & CONTACT */}
      <section className="py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl font-black text-white mb-4">📥 Download the Full Proposal</h2>
            <p className="text-gray-400 mb-8">
              All materials are free to use, modify and implement — no attribution required.<br />
              <span className="text-gray-500 text-sm">Project: Citizen Initiative Poland 2038 · Anonymous · Non-profit · Pro bono</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { label: 'Executive Summary (HTML→PDF)', href: 'https://polska-2038.github.io/projekt-polska-2038-pro/PDF-GOTOWE/01-EXECUTIVE-SUMMARY.html' },
                { label: 'Media Briefing', href: 'https://polska-2038.github.io/projekt-polska-2038-pro/PDF-GOTOWE/02-BRIEFING-DLA-MEDIOW.html' },
                { label: 'Detailed Roadmap', href: 'https://polska-2038.github.io/projekt-polska-2038-pro/PDF-GOTOWE/PELNE/01-MAPA-DROGOWA-PELNA-SUPER-WYGLAD.html' },
                { label: 'Full Budget 2026–2035', href: 'https://polska-2038.github.io/projekt-polska-2038-pro/PDF-GOTOWE/PELNE/02-BUDZET-PELNY-SUPER-WYGLAD.html' },
              ].map(d => (
                <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 hover:text-white font-mono text-sm px-5 py-3 rounded-xl transition-all">
                  <Download className="w-4 h-4 text-brand-neon" /> {d.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/reforma/en"
                className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all">
                <Trophy className="w-5 h-5" /> Read Full Reform (English)
              </Link>
              <Link to="/reforma"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 transition-all">
                🇵🇱 Wersja Polska <ExternalLink className="w-4 h-4" />
              </Link>
              <Link to="/kontakt"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-sm px-8 py-4 rounded-xl border border-gray-600 transition-all">
                <Mail className="w-4 h-4" /> Contact the Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
