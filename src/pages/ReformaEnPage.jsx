import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft, Globe } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import RoiCalculatorSection from '../components/RoiCalculatorSection';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function ReformaEnPage() {
  return (
    <PublicLayout pageTitle="" pageSubtitle="">

      {/* Breadcrumb */}
      <div className="bg-gray-950 border-b border-gray-800 py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between text-sm font-mono">
          <Link to="/reforma" className="text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> 🇵🇱 Polish version
          </Link>
          <div className="flex items-center gap-2 text-brand-neon">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-widest">English Version</span>
          </div>
        </div>
      </div>

      {/* HERO — Open Letter */}
      <section className="relative py-20 bg-gradient-to-b from-red-950/30 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,20,60,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/30 rounded-full px-5 py-2 mb-6 text-brand-neon font-mono text-xs uppercase tracking-widest">
              <Globe className="w-4 h-4" /> Open Letter · UEFA · FIFA · Ministry of Sport · PZPN
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              🇵🇱 POLAND CAN WIN<br />
              <span className="text-brand-red">THE WORLD CUP 2038</span>
            </h1>
            <p className="text-xl text-gray-300 mb-3">
              Three Pillars of Polish Football Reform — A Citizen Initiative
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              "We cannot build world champions without: <em className="text-white">a training system, a society willing to support them,
              and coaches who know how to develop children.</em>"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { v: '€250M', l: 'Annual budget', c: 'text-brand-neon' },
                { v: '370%', l: 'Projected ROI', c: 'text-yellow-400' },
                { v: '€6.50', l: 'per Pole / year', c: 'text-white' },
                { v: '2038', l: 'World Cup Final', c: 'text-brand-red' },
              ].map(s => (
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className={`text-2xl font-black ${s.c}`}>{s.v}</div>
                  <div className="text-gray-400 text-xs font-mono mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/reforma/materialy/executive-summary"
                className="flex items-center gap-2 bg-brand-red text-white font-bold px-7 py-3.5 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                <Download className="w-4 h-4" /> Executive Summary
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE CASE */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-black text-white mb-6">The Case for Reform</h2>
            <div className="space-y-5 text-gray-300 text-base leading-relaxed">
              <p>
                Poland is the <strong className="text-white">largest footballing underperformer in Europe</strong>. With 38 million citizens —
                ten times more than Croatia, four times more than Portugal — we have not won a major international trophy since 1982.
                Our national team sits at ~30th in FIFA rankings. We have approximately 30 players in the top 5 European leagues.
                Croatia, at one-tenth our size, has more.
              </p>
              <p>
                This is not a talent problem. <strong className="text-white">It is a system problem.</strong> Poland's youth development
                infrastructure is fragmented, PZPN evaluates its own coaches (a clear conflict of interest),
                stadiums discourage family attendance, and there is no unified national talent identification system.
                We are leaving an entire generation of players undiscovered — many in small towns and villages where no scout ever arrives.
              </p>
              <p>
                The <strong className="text-brand-neon">window is now</strong>. Birth cohorts 2010–2016 are the largest Poland has seen in 30 years —
                400,000 births per year. By 2038, these children will be 22–28 years old: the peak age for a World Cup. If we build the right system
                today, we can have the best-prepared generation in Polish football history on the pitch in 2038.
              </p>
              <p className="text-white font-bold text-lg border-l-4 border-brand-red pl-4">
                If we don't start now, we will waste the best opportunity Polish football has had in a generation.
                And the next window? Another 30 years.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THREE PILLARS — SUMMARY */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">The Three Pillars</h2>
            <p className="text-gray-400 mt-2">They must work together — removing any one makes the whole system fail.</p>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                n:'01', icon:'⚽', title:'POLAND 2038', budget:'€235M/year', roi:'300–500% ROI', color:'text-red-400 border-red-500/30',
                summary: 'A national talent identification and development pipeline: from 1,000 children identified per year at age 6–13, through elite academies, to a full-time U21 national squad. AI-equipped Orlik grounds nationwide ensure zero talent escapes the system regardless of geography or family income.',
              },
              {
                n:'02', icon:'🛡️', title:'SAFE STADIUM', budget:'€11.7M/year', roi:'540% ROI', color:'text-blue-400 border-blue-500/30',
                summary: 'Without families in stadiums, there is no social mandate for €250M/year football spending. This pillar converts Polish stadiums into safe, family-friendly venues through infrastructure investment, a national hooligan exclusion database, and a certification system.',
              },
              {
                n:'03', icon:'🎓', title:'INDEPENDENT COACH EVALUATION', budget:'€7M/year', roi:'2,300% ROI',  color:'text-green-400 border-green-500/30',
                summary: 'If we invest €235M/year in training and the money goes to bad coaches, we get nothing. Independent evaluation of 5,000 coaches annually (by university sports faculties, NOT PZPN) with public rankings and removal of underperformers from publicly-funded positions.',
              },
            ].map((p) => (
              <motion.div key={p.n} {...fadeUp(0.1)}
                className={`bg-gray-900 border ${p.color.split(' ')[1]} rounded-2xl p-6 flex gap-5`}>
                <div className="text-3xl flex-shrink-0 mt-1">{p.icon}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className={`font-black text-lg ${p.color.split(' ')[0]}`}>{p.title}</h3>
                    <span className={`text-xs font-mono ${p.color.split(' ')[0]} bg-current/10 px-2 py-0.5 rounded`}>{p.budget}</span>
                    <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">{p.roi}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.summary}</p>
                  <Link to={`/reforma/filar/${p.n}`}
                    className={`inline-flex items-center gap-1 mt-3 text-xs font-mono ${p.color.split(' ')[0]} hover:opacity-70 transition-opacity`}>
                    Full documentation →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <RoiCalculatorSection />

      {/* THE ASK */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-3xl font-black text-white mb-6">📋 What We Are Asking For</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
              {[
                { title: 'Ministry of Sport', items: ['Include in National Sports Strategy 2026–2038', 'Secure PLN 1.08B/year budget', 'Commission independent feasibility study', 'Launch 3-voivodeship pilot in 2026'] },
                { title: 'PZPN', items: ['Adopt Talenciak+ talent identification', 'Submit to independent coach evaluation', 'Reduce Ekstraklasa to 14 clubs', 'End self-evaluation of own coaches'] },
                { title: 'UEFA / FIFA', items: ['Recognize as model citizen initiative', 'Include in football governance reports', 'Consider financial support for Orlik AI upgrade'] },
                { title: 'Local Governments', items: ['Prepare Orlik 3.0 upgrade plans', 'Join coach evaluation program', 'Allocate budget for family stadium zones'] },
              ].map((g) => (
                <div key={g.title} className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                  <h3 className="text-white font-bold mb-3">{g.title}</h3>
                  <ul className="space-y-1.5">
                    {g.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp(0)}>
            <h3 className="text-xl font-black text-white mb-3">About This Initiative</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              This is a <strong className="text-white">citizen initiative</strong> produced by a group of anonymous Polish football enthusiasts, analysts,
              and parents — entirely <strong className="text-white">pro bono, non-profit, and independent</strong> of PZPN, any political party, or commercial interest.
              All materials may be freely used, modified, and implemented by any institution without crediting us.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['✅ Citizen-led', '✅ Anonymous', '✅ Non-profit', '✅ Pro bono', '✅ Free to use'].map(t => (
                <span key={t} className="bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-gray-300 text-sm">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
