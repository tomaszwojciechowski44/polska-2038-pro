import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Download, Copy, CheckCircle, Newspaper } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PRESS_RELEASES_PL = [
  {
    id: "minister",
    audience: "Ministerstwo Sportu i Turystyki",
    icon: "🏛️",
    color: "red",
    subject: "Propozycja wdrożenia Narodowego Systemu Wykrywania Talentów Sportowych",
    body: `Szanowny Panie Ministrze,
Zwracamy się z propozycją wdrożenia systemu #Polska2038 — infrastruktury technologicznej, która po raz pierwszy w historii umożliwi państwu polskiemu systematyczne wykrywanie talentów sportowych w skali całego kraju.
PROBLEM: Polska traci rocznie setki talentów z powodu braku infrastruktury skautingowej poza dużymi miastami. Dziecko z Orlika w Pcimiu nie ma szans dotrzeć do skauta z Akademii Legii.
ROZWIĄZANIE: Sieć czujników LiDAR na masztach 10 000 Orlików + model AI oceniający 5M zawodników w czasie rzeczywistym.
FINANSOWANIE: Model PPP. Capex 80M PLN rozłożony na 5 lat. ROI 370% w horyzoncie 8-letnim.
PILOTAŻ: Propozycja pilotażu w 50 Orlikach w 3 województwach. Czas wdrożenia: 6 miesięcy.`,
  },
  {
    id: "pzpn",
    audience: "PZPN / Federacje Sportowe",
    icon: "⚽",
    color: "neon",
    subject: "Propozycja integracji #Polska2038 z systemem skautingowym PZPN",
    body: `Szanowni Państwo,
#Polska2038 to infrastruktura danych, która może stać się fundamentem systemu skautingowego PZPN na kolejne 15 lat.
CO OFERUJEMY:
- API integracji z istniejącymi bazami PZPN
- Dashboard dla skautów regionalnych z mapą talentów
- AI Score dla każdego zawodnika (0-100)
- Raport PDF gotowy do użycia przez skauta w terenie
PRZYPADEK UŻYCIA: Skaut PZPN loguje się do systemu, wpisuje "Podkarpacie, 14-16 lat, napastnik" — dostaje listę 25 najlepszych kandydatów z pełnym profilem biomechanicznym, historią AI Score i danymi kontaktowymi.
PILOT: 500 zawodników, 3 akademie regionalne, 3 miesiące.`,
  },
  {
    id: "media",
    audience: "Media / Dziennikarze",
    icon: "📰",
    color: "cyan",
    subject: "PRESS RELEASE: Polacy budują AI, które znajdzie kolejnego Lewandowskiego",
    body: `EMBARGO DO: 12 maja 2026
POLACY BUDUJĄ AI, KTÓRE ZNAJDZIE KOLEJNEGO LEWANDOWSKIEGO
Polska firma technologiczna zaprezentowała #Polska2038 — system sztucznej inteligencji zdolny do oceny potencjału sportowego 5 milionów zawodników jednocześnie, w czasie rzeczywistym.
KLUCZOWE FAKTY:
- LiDAR montowany na masztach 10 000 Orlików
- AI ocenia biomechanikę, prędkość startową i czas reakcji
- Zero nagrań wideo (RODO-Compliant)
- 94% dokładność modelu na zbiorze walidacyjnym
- Wycena systemu: 1,1 MLD PLN
CYTAT: "W 2038 Polska wygra mistrzostwa świata. Nie przez szczęście — przez system."
KONTAKT MEDIALNY: polska2038@proton.me
DEMO LIVE: https://polska-2038.github.io/projekt-polska-2038-pro`,
  },
  {
    id: "investor",
    audience: "Inwestorzy / VC",
    icon: "💰",
    color: "gold",
    subject: "Investment Memo: #Polska2038 — National Sports OS, Poland",
    body: `EXECUTIVE SUMMARY
#Polska2038 is building the national talent detection OS for Polish sport — a distributed LiDAR + AI + PostGIS infrastructure covering 10,000 Orlik sports grounds.
MARKET: 5M athletes, 10K clubs, €2.5B sports tech market in CEE by 2030.
TECHNOLOGY: 
- Level 1: Smartphone LiDAR (iOS/Android ToF sensors)  
- Level 2: Autonomous mast-mounted sensors
- Level 3: Cloud AI (EnsembleScorer, TalentRadar PostGIS)
- Accuracy: 94% | Latency: <50ms | GDPR: Zero video
BUSINESS MODEL: SaaS + Government B2B + API licensing
TRACTION:
- Architecture validated, demo live
- Partnership discussions: Ministry of Sport, PZPN
- Open source core (MIT) drives adoption
ASK: Seed round — 3M PLN for 18-month pilot (500 nodes, 50K athletes, 3 regions)
ROI: 370% projected over 8 years (government model)`,
  },
];
const PRESS_RELEASES_EN = [
  {
    id: "minister",
    audience: "Ministry of Sport",
    icon: "🏛️",
    color: "red",
    subject: "Proposal: national-scale talent detection infrastructure (#Polska2038)",
    body: `Dear Minister,

We would like to propose the deployment of #Polska2038 — a technology infrastructure that enables systematic talent identification at national scale for the first time.

PROBLEM: Poland loses hundreds of talents every year due to the lack of scouting infrastructure outside big cities.
SOLUTION: A network of LiDAR sensors across 10,000 community pitches + an AI model scoring 5M athletes in real time.
FINANCING: PPP model. Capex ~80M PLN over 5 years. Projected ROI 370% over an 8-year horizon.
PILOT: 50 pitches across 3 regions. Deployment time: 6 months.`,
  },
  {
    id: "pzpn",
    audience: "FA / Federations",
    icon: "⚽",
    color: "neon",
    subject: "#Polska2038 integration proposal for the FA scouting system",
    body: `Hello,

#Polska2038 is a data infrastructure that can become the foundation of a modern scouting system for the next 15 years.

WHAT WE OFFER:
- Integration API for existing databases
- Regional scout dashboard with a talent map
- AI Score for every player (0–100)
- Field-ready PDF report export

USE CASE: A scout selects “region, age, position” and receives the top 25 candidates with biomechanical profile and AI history.
PILOT: 500 athletes, 3 regional academies, 3 months.`,
  },
  {
    id: "media",
    audience: "Media / Journalists",
    icon: "📰",
    color: "cyan",
    subject: "PRESS RELEASE: Poland builds AI that can find the next global star",
    body: `EMBARGO UNTIL: May 12, 2026

POLAND BUILDS AI THAT CAN FIND THE NEXT GLOBAL STAR

Polish engineers present #Polska2038 — an AI system capable of assessing athletic potential for 5 million players in real time.

KEY FACTS:
- LiDAR nodes mounted on 10,000 community pitches
- AI evaluates biomechanics, acceleration and reaction time
- Zero video (GDPR by design)
- 94% validation accuracy
- System valuation: 1.1B PLN

QUOTE: “In 2038 Poland will win — not by luck, but by system.”
MEDIA CONTACT: polska2038@proton.me`,
  },
  {
    id: "investor",
    audience: "Investors / VC",
    icon: "💰",
    color: "gold",
    subject: "Investment Memo: #Polska2038 — National Sports OS, Poland",
    body: `EXECUTIVE SUMMARY
#Polska2038 is building the national talent detection OS for Polish sport — a distributed LiDAR + AI + PostGIS infrastructure covering 10,000 community sports grounds.
MARKET: 5M athletes, 10K clubs, €2.5B sports tech market in CEE by 2030.
TECHNOLOGY:
- Level 1: Smartphone LiDAR (iOS/Android ToF sensors)
- Level 2: Autonomous mast-mounted sensors
- Level 3: Cloud AI (EnsembleScorer, TalentRadar PostGIS)
- Accuracy: 94% | Latency: <50ms | GDPR: Zero video
BUSINESS MODEL: SaaS + Government B2B + API licensing
TRACTION:
- Architecture validated, demo live
- Partnership discussions: Ministry of Sport, FA
- Open source core (MIT) drives adoption
ASK: Seed round — 3M PLN for an 18-month pilot (500 nodes, 50K athletes, 3 regions)
ROI: 370% projected over 8 years (government model)`,
  },
];
const KEY_FACTS = [
  { label: "Założone", val: "2025", icon: "📅" },
  { label: "Status", val: "Pilotaż Q4 2025", icon: "🟢" },
  { label: "Team", val: "5 inżynierów", icon: "👥" },
  { label: "GitHub Stars", val: "Open Source", icon: "⭐" },
  { label: "Demo Live", val: "github.io", icon: "🌐" },
  { label: "Licencja (core)", val: "MIT", icon: "📄" },
];
export default function PressSection() {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState("media");
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView(0.06);
  const PRESS_RELEASES = lang === "en" ? PRESS_RELEASES_EN : PRESS_RELEASES_PL;
  const active = PRESS_RELEASES.find((p) => p.id === activeId);
  const handleCopy = () => {
    navigator.clipboard.writeText(active.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const colorMap = {
    neon: "border-brand-neon/40 text-brand-neon bg-brand-neon/5",
    cyan: "border-brand-cyan/40 text-brand-cyan bg-brand-cyan/5",
    gold: "border-brand-gold/40 text-brand-gold bg-brand-gold/5",
    red:  "border-brand-red/40 text-brand-red bg-brand-red/5",
  };
  const tabActive = {
    neon: "border-brand-neon text-brand-neon bg-brand-neon/10",
    cyan: "border-brand-cyan text-brand-cyan bg-brand-cyan/10",
    gold: "border-brand-gold text-brand-gold bg-brand-gold/10",
    red:  "border-brand-red text-brand-red bg-brand-red/10",
  };
  return (
    <section id="media" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm tracking-widest uppercase mb-3">
            <Newspaper size={14} />
            MEDIA KIT
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            {lang === "en" ? (
              <>
                Ready to{" "}
                <span className="text-brand-cyan text-glow-cyan">publish.</span>
              </>
            ) : (
              <>
                Gotowe do{" "}
                <span className="text-brand-cyan text-glow-cyan">Publikacji.</span>
              </>
            )}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            {lang === "en"
              ? "Press releases, investment memos and outreach drafts — ready to send. Pick an audience and copy."
              : "Komunikaty prasowe, mema inwestycyjne i propozycje wspolpracy — gotowe do wysylki. Wybierz odbiorce i skopiuj tresc."}
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.2}} className="space-y-3">
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">
              {lang === "en" ? "// choose_audience" : "// wybierz_odbiorce"}
            </div>
            {PRESS_RELEASES.map((pr) => (
              <button key={pr.id} onClick={() => setActiveId(pr.id)}
                className={"w-full text-left p-4 border transition-all duration-200 "+(activeId===pr.id ? "border-2 "+tabActive[pr.color] : "border-brand-border bg-brand-card hover:border-gray-600")}>
                <div className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{pr.icon}</span>
                  <div>
                    <div className={"font-display font-bold text-sm uppercase tracking-wide "+(activeId===pr.id?"":"text-gray-300")}>{pr.audience}</div>
                    <div className="text-gray-600 text-[10px] font-mono mt-0.5 line-clamp-1">{pr.subject}</div>
                  </div>
                </div>
              </button>
            ))}
            <div className="pt-4 border-t border-brand-border">
              <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-3">Key Facts</div>
              {KEY_FACTS.map((f) => (
                <div key={f.label} className="flex justify-between items-center py-1.5 border-b border-brand-border/30">
                  <span className="text-gray-500 text-xs font-mono flex items-center gap-1">{f.icon} {f.label}</span>
                  <span className="text-white text-xs font-mono font-bold">{f.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.3}} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div key={active.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                  className={"border "+colorMap[active.color]}>
                  <div className={"p-4 border-b flex items-center justify-between gap-3 "+colorMap[active.color]}>
                    <div>
                      <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                        {lang === "en" ? "SUBJECT:" : "TEMAT:"}
                      </div>
                      <div className="text-white font-mono text-sm font-bold mt-0.5 leading-snug">{active.subject}</div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={handleCopy}
                        className={"flex items-center gap-1.5 px-3 py-2 border text-xs font-mono transition-all "+(copied?"border-brand-neon text-brand-neon bg-brand-neon/10":"border-brand-border text-gray-400 hover:border-gray-500")}>
                        {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                        {copied ? (lang === "en" ? "Copied!" : "Skopiowano!") : (lang === "en" ? "Copy" : "Kopiuj")}
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 border border-brand-border text-gray-400 hover:border-gray-500 text-xs font-mono transition-all">
                        <Download size={12} />TXT
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <pre className="text-gray-300 text-xs font-mono leading-relaxed whitespace-pre-wrap">{active.body}</pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
