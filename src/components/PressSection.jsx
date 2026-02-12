import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { FileText, Download, Copy, CheckCircle, Newspaper } from "lucide-react";
const PRESS_RELEASES = [
  {
    id: "minister",
    audience: "Ministerstwo Sportu i Turystyki",
    icon: "🏛️",
    color: "red",
    subject: "Propozycja wdrozenia Narodowego Systemu Wykrywania Talentow Sportowych",
    body: `Szanowny Panie Ministrze,
Zwracamy sie z propozycja wdrozenia systemu #Polska2038 — infrastruktury technologicznej, ktora po raz pierwszy w historii umozliwi panstwu polskiemu systematyczne wykrywanie talentow sportowych w skali calego kraju.
PROBLEM: Polska traci rocznie setki talentow z powodu braku infrastruktury skautingowej poza duzymi miastami. Dziecko z Orlika w Pcimiu nie ma szans dotrzec do skauta z Akademii Legii.
ROZWIAZANIE: Siec czujnikow LiDAR na masztach 10,000 Orlikow + model AI oceniajacy 5M zawodnikow w czasie rzeczywistym.
FINANSOWANIE: Model PPP. Capex 80M PLN rozlozony na 5 lat. ROI 370% w horyzoncie 8-letnim.
PILOTAZ: Propozycja pilotazu w 50 Orlikach w 3 wojewodztwach. Czas wdrozenia: 6 miesiecy.`,
  },
  {
    id: "pzpn",
    audience: "PZPN / Federacje Sportowe",
    icon: "⚽",
    color: "neon",
    subject: "Propozycja integracji #Polska2038 z systemem skautingowym PZPN",
    body: `Szanowni Panstwo,
#Polska2038 to infrastruktura danych, ktora moze stac sie fundamentem systemu skautingowego PZPN na kolejne 15 lat.
CO OFERUJEMY:
- API integracji z istniejacymi bazami PZPN
- Dashboard dla skautow regionalnych z mapa talentow
- AI Score dla kazdego zawodnika (0-100)
- Raport PDF gotowy do uzycia przez skauta w terenie
PRZYPADEK UZYCIA: Skaut PZPN loguje sie do systemu, wpisuje "Podkarpacie, 14-16 lat, napastnik" — dostaje liste 25 najlepszych kandydatow z pelnym profilem biomechanicznym, historia AI Score i danymi kontaktowymi.
PILOT: 500 zawodnikow, 3 akademie regionalne, 3 miesiace.`,
  },
  {
    id: "media",
    audience: "Media / Dziennikarze",
    icon: "📰",
    color: "cyan",
    subject: "PRESS RELEASE: Polacy buduja AI, ktore znajdzie kolejnego Lewandowskiego",
    body: `EMBARGO DO: [data publikacji]
POLACY BUDUJA AI, KTORE ZNAJDZIE KOLEJNEGO LEWANDOWSKIEGO
Polska firma technologiczna zaprezentowala #Polska2038 — system sztucznej inteligencji zdolny do oceny potencjalu sportowego 5 milionow zawodnikow jednoczesnie, w czasie rzeczywistym.
KLUCZOWE FAKTY:
- LiDAR montowany na masztach 10,000 Orlikow
- AI ocenia biomechanike, predkosc startowa i czas reakcji
- Zero nagrania wideo (RODO-Compliant)
- 94% dokladnosc modelu na zbiorze walidacyjnym
- Wycena systemu: 1,1 MLD PLN
CYTAT: "W 2038 Polska wygra mistrzostwa swiata. Nie przez szczescie — przez system."
KONTAKT MEDIALNY: kontakt@polska2038.pl
DEMO LIVE: https://projek-polska-2038.github.io/polska-2038-pro/`,
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
const KEY_FACTS = [
  { label: "Zalozone", val: "2025", icon: "📅" },
  { label: "Status", val: "Pilotaz Q4 2025", icon: "🟢" },
  { label: "Team", val: "5 inzynierow", icon: "👥" },
  { label: "GitHub Stars", val: "Open Source", icon: "⭐" },
  { label: "Demo Live", val: "github.io", icon: "🌐" },
  { label: "Licencja (core)", val: "MIT", icon: "📄" },
];
export default function PressSection() {
  const [activeId, setActiveId] = useState("media");
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView(0.06);
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
            Gotowe do{" "}
            <span className="text-brand-cyan text-glow-cyan">Publikacji.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Komunikaty prasowe, mema inwestycyjne i propozycje wspolpracy — gotowe do wysylki.
            Wybierz odbiorce i skopiuj tresc.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.2}} className="space-y-3">
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">// wybierz_odbiorce</div>
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
                      <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">TEMAT:</div>
                      <div className="text-white font-mono text-sm font-bold mt-0.5 leading-snug">{active.subject}</div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={handleCopy}
                        className={"flex items-center gap-1.5 px-3 py-2 border text-xs font-mono transition-all "+(copied?"border-brand-neon text-brand-neon bg-brand-neon/10":"border-brand-border text-gray-400 hover:border-gray-500")}>
                        {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                        {copied ? "Skopiowano!" : "Kopiuj"}
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
