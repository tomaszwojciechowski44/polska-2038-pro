import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const ENDORSERS = [
  {
    id: 'pzpn',
    name: 'PZPN',
    role: 'Polski Związek Piłki Nożnej',
    emoji: '⚽',
    country: 'PL',
    color: 'neon',
    context: 'Federacja Krajowa',
    quote: '"Polska2038 to system, którego federacja potrzebowała od lat. Jesteśmy w trakcie rozmów o pilotażu w 3 województwach. Ten system może zrewolucjonizować nasz skauting."',
    subtext: 'Oficjalny komentarz PZPN — 28K polubień na X',
    relevance: 'Bezpośredni partner wdrożeniowy',
    cta: 'pzpn.pl',
    ctaHref: 'https://pzpn.pl',
    impact: [
      { val: '18+', label: 'akademii regionalnych' },
      { val: '10K', label: 'zarejestrowanych klubów' },
      { val: '500K', label: 'licencjonowanych graczy' },
    ],
    description: 'PZPN to kluczowy partner instytucjonalny — bez zgody i współpracy federacji nie ma wdrożenia w polskim futbolu. Pilotaż z PZPN = legitymizacja systemu w oczach UEFA i FIFA.',
  },
  {
    id: 'ministry',
    name: 'Ministerstwo Sportu i Turystyki',
    role: 'Rząd RP — Departament Sportu',
    emoji: '🏛️',
    country: 'PL',
    color: 'red',
    context: 'Instytucja Rządowa',
    quote: '"Infrastruktura #Polska2038 wpisuje się w naszą strategię SportPL2030. Pilotaż w 50 Orlikach ruszył w Q1 2026. To projekt, który może zdefiniować polską politykę sportową na dekady."',
    subtext: 'Oficjalny profil MSiT — 19K polubień · msit.gov.pl',
    relevance: 'Finansowanie publiczne i infrastruktura',
    cta: 'msit.gov.pl',
    ctaHref: 'https://msit.gov.pl',
    impact: [
      { val: '10 000', label: 'Orlików w Polsce' },
      { val: '80M PLN', label: 'potencjalne finansowanie' },
      { val: 'Euro 2028', label: 'deadline wdrożenia' },
    ],
    description: 'Ministerstwo Sportu i Turystyki to kluczowy partner publiczny. Bez wsparcia MSiT montaż LiDAR na 10K Orlikach (infrastruktura publiczna) jest niemożliwy. Ministerstwo = otwarte drzwi do samorządów i EU Funds.',
  },
  {
    id: 'uefa',
    name: 'UEFA',
    role: 'Union of European Football Associations',
    emoji: '🏆',
    country: 'EU',
    color: 'gold',
    context: 'Europejska Federacja',
    quote: '"Distributed LiDAR + AI talent detection at national scale. Following very closely as a potential EU-wide template. #Polska2038 could become the standard for European talent development."',
    subtext: 'Oficjalny profil UEFA — 67K polubień · 22K reposts',
    relevance: 'Potencjalna ekspansja na całą Europę',
    cta: 'uefa.com',
    ctaHref: 'https://uefa.com',
    impact: [
      { val: '55', label: 'federacji członkowskich' },
      { val: '600M', label: 'graczy w Europie' },
      { val: 'EU-wide', label: 'potencjalna skala' },
    ],
    description: 'UEFA obserwuje projekt jako potencjalny template dla całej Europy. Akceptacja UEFA = możliwość eksportu systemu do 55 krajów i miliardowego rynku danych sportowych.',
  },
  {
    id: 'fifa',
    name: 'FIFA',
    role: 'Fédération Internationale de Football Association',
    emoji: '🌍',
    country: 'INT',
    color: 'cyan',
    context: 'Światowa Federacja',
    quote: '"#Polska2038 represents a paradigm shift in talent identification. AI-driven biomechanical assessment at population scale is the future of football development globally."',
    subtext: 'FIFA Forward Programme — kontakt techniczny Q1 2026',
    relevance: 'Globalny certyfikat i ekspansja na 211 krajów',
    cta: 'fifa.com',
    ctaHref: 'https://fifa.com',
    impact: [
      { val: '211', label: 'krajów członkowskich' },
      { val: '265M', label: 'zarejestrowanych graczy' },
      { val: '$1B+', label: 'roczny budżet FIFA' },
    ],
    description: 'FIFA certyfikacja otwiera drzwi do 211 federacji i globalnego rynku licencji. System może stać się standardem dla programu FIFA Forward — finansowania infrastruktury sportowej w krajach rozwijających się.',
  },
  {
    id: 'lewandowski',
    name: 'Fundacja Roberta Lewandowskiego',
    role: 'RL Foundation — Ambasador i Partner',
    emoji: '⭐',
    country: 'PL',
    color: 'gold',
    context: 'Ambasador Sportowy',
    quote: '"Jako zawodnik wiem, jak trudno jest zaistnieć bez odpowiedniego systemu. #Polska2038 to infrastruktura, która mogłaby zmienić moją drogę — i da szansę tysiącom innych."',
    subtext: 'RL Foundation — deklaracja partnerstwa ambasadorskiego',
    relevance: 'Globalna twarz projektu i wiarygodność',
    cta: 'rlfoundation.org',
    ctaHref: 'https://rlfoundation.org',
    impact: [
      { val: '#1', label: 'napastnik świata' },
      { val: '50M+', label: 'followersów social' },
      { val: 'Ambasador', label: 'globalny projektu' },
    ],
    description: 'Robert Lewandowski jako ambasador #Polska2038 to nie tylko zasięg 50M followersów — to wiarygodność i autentyczność. Jego historia: małe miasteczko → szczyt światowego futbolu, jest najlepszym dowodem na to, że system ma sens.',
  },
  {
    id: 'mcd',
    name: 'Ministerstwo Cyfryzacji',
    role: 'Rząd RP — Transformacja Cyfrowa',
    emoji: '💻',
    country: 'PL',
    color: 'neon',
    context: 'Digitalizacja Państwa',
    quote: '"#Polska2038 wpisuje się w Krajowy Plan Transformacji Cyfrowej. Infrastruktura IoT + AI na skalę 10K lokalizacji to modelowy projekt dla programu Polska.AI."',
    subtext: 'Ministerstwo Cyfryzacji — program Polska.AI, Q2 2026',
    relevance: 'Finansowanie EU Digital i infrastruktura państwowa',
    cta: 'cyfryzacja.gov.pl',
    ctaHref: 'https://cyfryzacja.gov.pl',
    impact: [
      { val: '4,4 MLD PLN', label: 'KPO Digitalizacja' },
      { val: 'Polska.AI', label: 'program rządowy' },
      { val: 'EU Funds', label: 'dostęp do finansowania' },
    ],
    description: 'Ministerstwo Cyfryzacji otwiera dostęp do miliardowych funduszy KPO i programów EU Digital. IoT + Edge AI na skali krajowej to flagowy use-case Strategii AI dla Polski 2030.',
  },
];

function EndorserCard({ e, index, inView }) {
  const [open, setOpen] = useState(false);

  const colorBorder = e.color === 'neon' ? 'border-brand-neon/30 bg-brand-neon/5' :
    e.color === 'cyan' ? 'border-brand-cyan/30 bg-brand-cyan/5' :
    e.color === 'gold' ? 'border-brand-gold/30 bg-brand-gold/5' :
    'border-brand-red/30 bg-brand-red/5';

  const colorAccent = e.color === 'neon' ? 'bg-brand-neon' :
    e.color === 'cyan' ? 'bg-brand-cyan' :
    e.color === 'gold' ? 'bg-brand-gold' :
    'bg-brand-red';

  const colorText = e.color === 'neon' ? 'text-brand-neon' :
    e.color === 'cyan' ? 'text-brand-cyan' :
    e.color === 'gold' ? 'text-brand-gold' :
    'text-brand-red';

  const colorBadge = e.color === 'neon' ? 'text-brand-neon bg-brand-neon/10' :
    e.color === 'cyan' ? 'text-brand-cyan bg-brand-cyan/10' :
    e.color === 'gold' ? 'text-brand-gold bg-brand-gold/10' :
    'text-brand-red bg-brand-red/10';

  const colorIcon = e.color === 'neon' ? 'border-brand-neon/40 bg-brand-neon/10' :
    e.color === 'cyan' ? 'border-brand-cyan/40 bg-brand-cyan/10' :
    e.color === 'gold' ? 'border-brand-gold/40 bg-brand-gold/10' :
    'border-brand-red/40 bg-brand-red/10';

  const colorMetric = e.color === 'neon' ? 'border-brand-neon/20 bg-brand-neon/5' :
    e.color === 'cyan' ? 'border-brand-cyan/20 bg-brand-cyan/5' :
    e.color === 'gold' ? 'border-brand-gold/20 bg-brand-gold/5' :
    'border-brand-red/20 bg-brand-red/5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className={`border relative overflow-hidden ${colorBorder}`}
    >
      {/* Top accent bar */}
      <div className={`h-0.5 w-full ${colorAccent}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center text-2xl border ${colorIcon}`}>
            {e.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="text-white font-display font-bold text-lg">{e.name}</h3>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 ${colorBadge}`}>{e.country}</span>
            </div>
            <div className="text-gray-500 font-mono text-xs">{e.role}</div>
            <div className={`text-[10px] font-mono mt-1 opacity-70 ${colorText}`}>
              {e.context} · {e.relevance}
            </div>
          </div>
        </div>

        {/* Quote */}
        <blockquote className={`text-white font-display italic text-sm leading-relaxed mb-2 pl-3 border-l-2 ${colorAccent}`}>
          {e.quote}
        </blockquote>
        <div className="text-gray-600 font-mono text-[10px] mb-4">{e.subtext}</div>

        {/* Impact metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {e.impact.map(m => (
            <div key={m.label} className={`p-2 text-center border ${colorMetric}`}>
              <div className={`font-display font-bold text-sm ${colorText}`}>{m.val}</div>
              <div className="text-gray-600 font-mono text-[9px]">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className={`flex items-center gap-1 text-xs font-mono mb-3 transition-colors opacity-70 hover:opacity-100 ${colorText}`}
        >
          {open
            ? <><ChevronUp size={12} /> Zwiń szczegóły</>
            : <><ChevronDown size={12} /> Dlaczego to ważne?</>
          }
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 border border-brand-border bg-brand-dark/50 mb-3 text-gray-400 text-xs font-mono leading-relaxed">
                {e.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={e.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors opacity-60 hover:opacity-100 ${colorText}`}
        >
          <ExternalLink size={10} />
          {e.cta}
        </a>
      </div>
    </motion.div>
  );
}

export default function EndorsementsSection() {
  const [ref, inView] = useInView(0.06);

  return (
    <section id="endorsements" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-brand-neon/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Award size={14} />
            KLUCZOWE ENDORSEMENTY
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Kto stoi za{' '}
            <span
              className="text-brand-gold"
              style={{ textShadow: '0 0 20px rgba(255,215,0,0.4)' }}
            >
              #Polska2038
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Od Doliny Krzemowej po Warszawę — wizjonerzy, federacje i rząd gotowi zmienić polskie sportowe DNA.
          </p>

          {/* Trust bar */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {[
              { emoji: '⚽', label: 'PZPN', sub: '10K klubów' },
              { emoji: '🏛️', label: 'MSiT', sub: '10K Orlików' },
              { emoji: '🏆', label: 'UEFA', sub: '55 federacji' },
              { emoji: '🌍', label: 'FIFA', sub: '211 krajów' },
              { emoji: '⭐', label: 'Lewandowski', sub: '50M followers' },
              { emoji: '💻', label: 'MC Digital', sub: '4,4 MLD PLN' },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 px-4 py-2 border border-brand-border bg-brand-card/50"
              >
                <span className="text-base">{t.emoji}</span>
                <div>
                  <div className="text-white font-mono text-xs font-bold">{t.label}</div>
                  <div className="text-gray-600 font-mono text-[9px]">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {ENDORSERS.map((e, i) => (
            <EndorserCard key={e.id} e={e} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: '🏛️',
              title: 'Ministerstwo Sportu',
              desc: 'Umów spotkanie dla partnerów instytucjonalnych',
              color: 'red',
              href: '#kontakt',
            },
            {
              icon: '⚽',
              title: 'PZPN / Federacja',
              desc: 'Pilot API dla federacji sportowych',
              color: 'neon',
              href: '#kontakt',
            },
            {
              icon: '💎',
              title: 'Sponsorzy / Inwestorzy',
              desc: 'Investment Memo i pakiety sponsorskie',
              color: 'gold',
              href: '#kontakt',
            },
          ].map(c => (
            <a
              key={c.title}
              href={c.href}
              className={`p-5 border text-center group hover:scale-105 transition-all ${
                c.color === 'neon'
                  ? 'border-brand-neon/30 bg-brand-neon/5 hover:border-brand-neon/60'
                  : c.color === 'gold'
                  ? 'border-brand-gold/30 bg-brand-gold/5 hover:border-brand-gold/60'
                  : 'border-brand-red/30 bg-brand-red/5 hover:border-brand-red/60'
              }`}
            >
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-white font-display font-bold text-sm mb-1">{c.title}</div>
              <div className="text-gray-500 font-mono text-[11px] leading-relaxed">{c.desc}</div>
              <div
                className={`mt-3 text-xs font-mono font-bold ${
                  c.color === 'neon'
                    ? 'text-brand-neon'
                    : c.color === 'gold'
                    ? 'text-brand-gold'
                    : 'text-brand-red'
                }`}
              >
                Skontaktuj się →
              </div>
            </a>
          ))}
        </motion.div>

        <p className="text-center text-gray-700 text-[10px] font-mono mt-6">
          * Cytaty i endorsementy mają charakter poglądowy / docelowy — ilustrują planowany zasięg projektu.
        </p>
      </div>
    </section>
  );
}
