import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy, Shield, GraduationCap, TrendingUp,
  Users, Target, AlertTriangle, CheckCircle, Download,
  BarChart3, Globe, ChevronDown, ChevronUp, FileText,
} from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import RoiCalculatorSection from '../components/RoiCalculatorSection';
import EndorsementsSection from '../components/EndorsementsSection';

/* ─── helpers ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const STATS = [
  { value: '1,08 mld', unit: 'zł/rok budżet',    accent: 'text-brand-red' },
  { value: '370%',     unit: 'ROI — zwrot',       accent: 'text-yellow-400' },
  { value: '28,50 zł', unit: 'na Polaka/rok',     accent: 'text-brand-neon' },
  { value: '2038',     unit: 'Finał MŚ',          accent: 'text-brand-cyan' },
];

const PILLARS = [
  {
    icon: Trophy,
    number: '01',
    title: 'POLSKA 2038',
    subtitle: 'Budowanie mistrzów',
    budget: '1 000 000 000 zł/rok',
    color: 'from-red-600/20 to-red-900/5',
    border: 'border-red-500/30 hover:border-red-500/60',
    iconColor: 'text-red-400',
    numColor: 'text-red-600',
    items: [
      'Program Talenciak+ (1 000 dzieci/rocznik, 6–13 lat)',
      'Projekt Orzeł 2038 (60+60 najlepszych, U15–U21)',
      'Kadra U21 pełnoetatowa (25 zawodników)',
      'Orlik 3.0 (2 477 boisk w całej Polsce)',
      'Centralna baza AI (10 000+ zawodników)',
      'Ekstraklasa Premium (14 klubów, bonusy za Polaków)',
    ],
    goal: 'Finał Mistrzostw Świata 2038, TOP 5 UEFA do 2035',
  },
  {
    icon: Shield,
    number: '02',
    title: 'BEZPIECZNY STADION',
    subtitle: 'Budowanie kibiców',
    budget: '50 000 000 zł/rok',
    color: 'from-blue-600/20 to-blue-900/5',
    border: 'border-blue-500/30 hover:border-blue-500/60',
    iconColor: 'text-blue-400',
    numColor: 'text-blue-600',
    items: [
      'Strefy rodzinne (chronione, oddzielone, zero tolerancji)',
      'Ogólnopolska czarna lista wykluczeń',
      'Pieniądz za kulturę, nie za krzyk',
      'Odpowiedzialność organizatora',
      'Standard bezpieczeństwa jako warunek dotacji',
    ],
    goal: 'Frekwencja +30%, incydenty −80% do 2035',
  },
  {
    icon: GraduationCap,
    number: '03',
    title: 'OCENA TRENERÓW',
    subtitle: 'Budowanie jakości',
    budget: '30 000 000 zł/rok',
    color: 'from-green-600/20 to-green-900/5',
    border: 'border-green-500/30 hover:border-green-500/60',
    iconColor: 'text-green-400',
    numColor: 'text-green-600',
    items: [
      'Audyty zewnętrzne (AWF-y, Instytut Sportu — NIE PZPN)',
      'Ocena rozwoju dzieci, nie wyników meczów',
      'Zakaz pracy dla słabych trenerów w systemie publicznym',
      'Jawne raporty dla JST i rodziców',
      'Standard jako warunek finansowania',
    ],
    goal: '100% trenerów objętych oceną do 2028',
  },
];

const TIMELINE = [
  {
    year: '2026', phase: 'PILOTAŻ', color: 'bg-yellow-500', textColor: 'text-yellow-400',
    items: ['3 województwa', '50 boisk Orlik 3.0', '500 trenerów w systemie ocen'],
  },
  {
    year: '2027', phase: 'WDROŻENIE', color: 'bg-orange-500', textColor: 'text-orange-400',
    items: ['Wszystkie województwa', 'Redukcja Ekstraklasy do 14 klubów'],
  },
  {
    year: '2028–30', phase: 'FUNDAMENTY', color: 'bg-red-500', textColor: 'text-red-400',
    items: ['1 000 boisk Orlik 3.0', 'U21 pełnoetatowa', '100% trenerów w systemie'],
  },
  {
    year: '2035', phase: 'PRZEŁOM', color: 'bg-purple-500', textColor: 'text-purple-400',
    items: ['TOP 5 UEFA', '100+ Polaków w TOP 5 ligach'],
  },
  {
    year: '2038', phase: '🏆 FINAŁ MŚ', color: 'bg-brand-neon', textColor: 'text-brand-neon',
    items: ['Mistrzostwo Świata'],
  },
];

const GOALS = [
  { label: '100+ Polaków w TOP 5 ligach', now: '~30 obecnie' },
  { label: 'Ekstraklasa w TOP 5 UEFA',    now: 'obecnie 24. miejsce' },
  { label: 'Kadra w TOP 10 FIFA',          now: 'obecnie ~30. miejsce' },
  { label: 'Eksport piłkarzy 500+ mln EUR/rok', now: 'obecnie ~100 mln EUR' },
  { label: 'Frekwencja stadionowa +30%',   now: 'z 8 000 → 10 500/mecz' },
  { label: 'Incydenty chuligańskie −80%',  now: 'z ~100 → ~20/sezon' },
];

const COUNTRIES = [
  { flag: '🇭🇷', name: 'Chorwacja', pop: '4 mln', achievements: 'Finał MŚ 2018, 3. MŚ 2022', note: '10× mniej ludzi' },
  { flag: '🇵🇹', name: 'Portugalia', pop: '10 mln', achievements: 'ME 2016, Liga Narodów 2019', note: '4× mniej ludzi' },
  { flag: '🇵🇱', name: 'Polska', pop: '38 mln', achievements: '0 sukcesów od 1982', note: 'Największy underachiever!', highlight: true },
];

/* ─── Section: Hero ────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeUp(0)} className="mb-6">
          <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-5 py-2 text-red-400 font-mono text-xs uppercase tracking-widest">
            🇵🇱 Projekt Obywatelski · Pro bono · Bezinteresowny
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
          <span className="text-brand-red">POLSKA</span> 2038
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-xl md:text-2xl text-gray-300 font-bold mb-3 tracking-wide">
          TRZY FILARY REFORMY PIŁKI NOŻNEJ
        </motion.p>
        <motion.p {...fadeUp(0.3)} className="text-gray-400 max-w-2xl mx-auto text-lg mb-12 italic">
          "Nie zbudujemy mistrzów świata bez: systemu szkolenia, społeczeństwa które będzie chciało ich wspierać, i trenerów którzy umieją rozwijać dzieci."
        </motion.p>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {STATS.map((s) => (
            <div key={s.unit} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className={`text-2xl md:text-3xl font-black ${s.accent}`}>{s.value}</div>
              <div className="text-gray-400 text-xs mt-1 font-mono uppercase tracking-wide">{s.unit}</div>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.5)} className="flex flex-wrap justify-center gap-3">
          <a
            href="#filary"
            className="bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Trophy className="w-5 h-5" /> Trzy Filary Reformy
          </a>
          <a
            href="#sciaga"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-white/20 flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" /> Ściąga Liczb
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Ostatnia Szansa ─────────────────────── */
function LastChanceSection() {
  return (
    <section className="py-14 bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60 border-y border-red-500/30">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div {...fadeUp(0)}>
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">⚡ OSTATNIA SZANSA</h2>
          <p className="text-xl text-yellow-300 font-bold mb-2">
            Roczniki 2010–2016: Najwięcej dzieci od 30 lat (400 tys./rok)
          </p>
          <p className="text-gray-300 text-lg mb-4">Okno możliwości: <span className="text-brand-neon font-bold">2026–2030</span></p>
          <div className="inline-block bg-red-600/30 border border-red-500 rounded-2xl px-8 py-4">
            <p className="text-2xl font-black text-red-300">MAMY 12 LAT. POTEM ZA PÓŹNO.</p>
            <p className="text-gray-400 mt-2">Jeśli nie zaczniemy TERAZ, stracimy całe pokolenie.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Trzy Filary ─────────────────────────── */
function TrzyFilarySection() {
  return (
    <section id="filary" className="py-20 bg-gradient-to-b from-black to-gray-950 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Kompleksowy system</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">🏗️ TRZY FILARY REFORMY</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">To nie są trzy osobne projekty. To jeden organizm.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.number} {...fadeUp(i * 0.15)}
                className={`relative bg-gradient-to-b ${p.color} border ${p.border} rounded-2xl p-6 transition-all duration-300`}
              >
                <div className={`text-5xl font-black ${p.numColor} opacity-20 absolute top-4 right-4`}>{p.number}</div>
                <Icon className={`w-8 h-8 ${p.iconColor} mb-4`} />
                <h3 className="text-xl font-black text-white mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{p.subtitle}</p>
                <div className={`text-sm font-bold ${p.iconColor} font-mono mb-4`}>{p.budget}</div>
                <ul className="space-y-2 mb-6">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className={`w-4 h-4 ${p.iconColor} flex-shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`text-xs font-mono ${p.iconColor} bg-white/5 rounded-lg px-3 py-2 border border-current/20 mb-4`}>
                  🎯 Cel: {p.goal}
                </div>
                <Link
                  to={`/reforma/filar/${p.number.replace('0', '')}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${p.iconColor} hover:opacity-80 transition-opacity`}
                >
                  Pełna dokumentacja →
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Synergies */}
        <motion.div {...fadeUp(0.4)} className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">🎯 Dlaczego te 3 filary muszą iść razem?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Bez Filaru 1', desc: 'Brak systemowego szkolenia, brak talentów — nigdy nie będziemy mistrzami' },
              { label: 'Bez Filaru 2', desc: 'Rodziny nie przyjdą na stadiony, brak społecznego wsparcia, budżet nie przejdzie' },
              { label: 'Bez Filaru 3', desc: 'Pieniądze trafią do złych trenerów, dzieci będą źle szkolone, zmarnujemy cały budżet' },
            ].map((s) => (
              <div key={s.label} className="flex items-start gap-3 bg-red-950/30 border border-red-900/40 rounded-xl p-4">
                <span className="text-red-500 text-xl flex-shrink-0">✗</span>
                <div>
                  <p className="text-red-400 font-bold text-sm mb-1">{s.label}:</p>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Komunikat ───────────────────────────── */
function KomunikatSection() {
  const [open, setOpen] = useState(false);
  return (
    <section id="komunikat" className="py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Dla Ministerstwa Sportu · PZPN · Samorządów</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">📋 Komunikat Publiczny</h2>
        </motion.div>

        {/* Budget */}
        <motion.div {...fadeUp(0.1)} className="bg-gradient-to-r from-yellow-900/20 to-orange-900/10 border border-yellow-700/30 rounded-2xl p-8 mb-8 text-center">
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">Budżet łączny</p>
          <p className="text-5xl font-black text-yellow-400 mb-2">1,08 miliarda zł rocznie</p>
          <p className="text-2xl font-bold text-white mb-1">= 28,50 zł / Polaka / rok</p>
          <p className="text-gray-400">Mniej niż 3 bilety do kina</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {['Budżet państwa', 'Środki UE', 'Samorządy', 'PPP + PZPN'].map((s) => (
              <div key={s} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 font-mono">• {s}</div>
            ))}
          </div>
        </motion.div>

        {/* Expand/collapse full kommunikat */}
        <motion.div {...fadeUp(0.2)}>
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-neon/40 rounded-xl px-6 py-4 transition-all text-white font-bold"
          >
            <span className="flex items-center gap-2"><Target className="w-5 h-5 text-brand-neon" /> Co możecie zrobić?</span>
            {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-900 border border-t-0 border-gray-700 rounded-b-xl overflow-hidden"
            >
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {[
                  {
                    who: '🏛️ Ministerstwo Sportu',
                    actions: ['Włączyć do strategii narodowej', 'Zabezpieczyć budżet 2026–2038', 'Rozpocząć pilotaż w 2026'],
                  },
                  {
                    who: '⚽ PZPN',
                    actions: ['Pobrać dokumentację', 'Powołać zespół ewaluacyjny', 'Uruchomić pilotaż Talenciak+'],
                  },
                  {
                    who: '🏙️ Samorządy',
                    actions: ['Przygotować Orlik 3.0', 'Włączyć się w oceny trenerów', 'Zabezpieczyć środki na strefy'],
                  },
                  {
                    who: '📰 Media',
                    actions: ['Nagłośnić projekt', 'Rozpocząć debatę publiczną', 'Monitorować reakcje'],
                  },
                ].map((g) => (
                  <div key={g.who} className="bg-white/3 rounded-xl p-4 border border-white/10">
                    <p className="font-bold text-white mb-3">{g.who}</p>
                    <ul className="space-y-2">
                      {g.actions.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0" /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Timeline ────────────────────────────── */
function TimelineSection() {
  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Droga do finału</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">⏰ TIMELINE 2026–2038</h2>
        </motion.div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500 via-red-500 to-brand-neon" />
          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year} {...fadeUp(i * 0.1)}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              >
                {/* Dot */}
                <div className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full ${t.color} -translate-x-1.5 mt-1.5 ring-4 ring-black`} />
                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[45%] bg-gray-900 border border-gray-700 rounded-2xl p-5 ${i % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-2xl font-black ${t.textColor}`}>{t.year}</span>
                    <span className={`text-xs font-mono uppercase tracking-widest ${t.textColor} bg-current/10 px-2 py-0.5 rounded`}>
                      {t.phase}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {t.items.map((item) => (
                      <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${t.color} flex-shrink-0`} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Ściąga Liczb ────────────────────────── */
function SciadaSection() {
  return (
    <section id="sciaga" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Wszystkie kluczowe dane</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">🔢 Ściąga Liczb</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* ROI */}
          <motion.div {...fadeUp(0.1)} className="bg-gray-900 border border-yellow-700/30 rounded-2xl p-6">
            <TrendingUp className="w-7 h-7 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white mb-4">Zwrot z inwestycji (ROI)</h3>
            <div className="space-y-3">
              {[
                { label: 'Łączny zwrot', val: '4+ mld zł/rok', color: 'text-yellow-400' },
                { label: 'ROI', val: '370%', color: 'text-yellow-400' },
                { label: 'Zwrot w 12 lat', val: '50+ mld zł', color: 'text-yellow-400' },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-400 text-sm">{r.label}</span>
                  <span className={`font-black text-lg ${r.color}`}>{r.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Demography */}
          <motion.div {...fadeUp(0.2)} className="bg-gray-900 border border-green-700/30 rounded-2xl p-6">
            <Users className="w-7 h-7 text-green-400 mb-3" />
            <h3 className="font-bold text-white mb-4">Demografia — Dlaczego TERAZ?</h3>
            <div className="space-y-3">
              <div className="bg-green-900/20 border border-green-700/40 rounded-xl p-3 text-center">
                <p className="text-3xl font-black text-green-400">400 000</p>
                <p className="text-xs text-gray-400 mt-1">urodzeń/rok (roczniki 2010–2016)</p>
                <p className="text-green-300 text-xs font-bold">REKORD od 30 lat!</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-gray-300">320 000</p>
                <p className="text-xs text-gray-400 mt-1">urodzeń/rok (roczniki 2017–2025)</p>
                <p className="text-red-400 text-xs">Spadek −20%</p>
              </div>
              <p className="text-xs text-gray-500 text-center">Rocznik 2010 będzie miał <span className="text-brand-neon font-bold">28 lat</span> w 2038 — idealny szczyt formy</p>
            </div>
          </motion.div>

          {/* Goals */}
          <motion.div {...fadeUp(0.3)} className="bg-gray-900 border border-brand-cyan/30 rounded-2xl p-6 md:col-span-2 lg:col-span-1">
            <Target className="w-7 h-7 text-brand-cyan mb-3" />
            <h3 className="font-bold text-white mb-4">Cele do 2035</h3>
            <ul className="space-y-3">
              {GOALS.map((g) => (
                <li key={g.label} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">{g.label}</p>
                    <p className="text-gray-500 text-xs">{g.now}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Countries comparison */}
        <motion.div {...fadeUp(0.4)}>
          <h3 className="text-xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <Globe className="w-5 h-5 text-brand-cyan" /> Porównanie z innymi krajami
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {COUNTRIES.map((c) => (
              <div key={c.name} className={`rounded-2xl p-6 border text-center ${
                c.highlight
                  ? 'bg-red-950/40 border-red-500/50'
                  : 'bg-gray-900 border-gray-700'
              }`}>
                <div className="text-5xl mb-3">{c.flag}</div>
                <h4 className={`text-xl font-black mb-1 ${c.highlight ? 'text-red-400' : 'text-white'}`}>{c.name}</h4>
                <p className="text-gray-400 text-sm mb-2">Populacja: {c.pop}</p>
                <p className={`text-sm font-semibold mb-2 ${c.highlight ? 'text-red-300' : 'text-brand-neon'}`}>{c.achievements}</p>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  c.highlight ? 'bg-red-600/20 text-red-400' : 'bg-green-600/20 text-green-400'
                }`}>{c.note}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Kim jesteśmy ────────────────────────── */
function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div {...fadeUp(0)}>
          <h2 className="text-2xl font-black text-white mb-4">🤝 Kim jesteśmy?</h2>
          <p className="text-gray-300 text-lg mb-6">
            <strong className="text-white">Zespół Obywatelski POLSKA 2038</strong> — grupa obywateli i miłośników piłki nożnej.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['✅ Obywatelski', '✅ Anonimowy', '✅ Bezinteresowny', '✅ Pro bono'].map((t) => (
              <span key={t} className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-300 text-sm">{t}</span>
            ))}
          </div>
          <blockquote className="text-xl italic text-gray-300 border-l-4 border-brand-red pl-6 text-left max-w-2xl mx-auto">
            "Nie zbudujemy mistrzów świata bez: systemu szkolenia, społeczeństwa które będzie chciało ich wspierać, i trenerów którzy umieją rozwijać dzieci."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Dokumenty CTA ───────────────────────── */
function DokumentyCTA() {
  return (
    <section className="py-14 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-y border-gray-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div {...fadeUp(0)}>
          <FileText className="w-10 h-10 text-brand-neon mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-3">Pełna Dokumentacja do Pobrania</h2>
          <p className="text-gray-400 mb-6">
            Executive Summary, Briefing dla Mediów, Mapa Drogowa, Budżet Szczegółowy i więcej.
          </p>
          <Link
            to="/reforma/dokumenty"
            className="inline-flex items-center gap-2 bg-brand-neon hover:bg-cyan-300 text-brand-dark font-black px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-neon/20"
          >
            <FileText className="w-5 h-5" /> Wszystkie Dokumenty →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function ReformaPage() {
  return (
    <PublicLayout
      pageTitle="Reforma Piłki Nożnej"
      pageSubtitle="Trzy Filary Reformy Polskiej Piłki Nożnej — systemowy plan budowania mistrzów świata do 2038."
    >
      <HeroSection />
      <LastChanceSection />
      <TrzyFilarySection />
      <KomunikatSection />
      <TimelineSection />
      <SciadaSection />
      <RoiCalculatorSection />
      <EndorsementsSection />
      <DokumentyCTA />
      <TeamSection />
    </PublicLayout>
  );
}
