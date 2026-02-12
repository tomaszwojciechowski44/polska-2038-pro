import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Star, Building2, Globe, Zap } from "lucide-react";
const TIERS = [
  {
    id: "title",
    name: "TITLE SPONSOR",
    subtitle: "Jedno miejsce. Jedna marka. Historia.",
    price: "5 MLN PLN / rok",
    color: "gold",
    borderClass: "border-brand-gold",
    bgClass: "bg-brand-gold/5",
    textClass: "text-brand-gold",
    glowClass: "border-glow-gold",
    slots: 1,
    benefits: [
      "Nazwa sponsora w logotypie #Polska2038",
      "Ekskluzywne prawa do nazewnictwa systemu",
      "Logo na wszystkich materialach medialnych",
      "Dedykowany dashboard danych dla sponsora",
      "Prezentacja na ceremonii inauguracji ogolnopolskiej",
      "Pierwsze prawo do przedluzenia umowy",
      "Bezposredni dostep do danych agregowanych",
    ],
  },
  {
    id: "gold",
    name: "GOLD PARTNER",
    subtitle: "Wspoltworzysz przyszlosc polskiego sportu.",
    price: "1 MLN PLN / rok",
    color: "neon",
    borderClass: "border-brand-neon",
    bgClass: "bg-brand-neon/5",
    textClass: "text-brand-neon",
    glowClass: "border-glow-neon",
    slots: 4,
    benefits: [
      "Logo na platformie i materiałach prasowych",
      "Dostep do API danych (anonimizowanych)",
      "Uczestnictwo w pilotazu regionalnym",
      "Raport kwartalny z wynikow systemu",
      "Mozliwosc wspol-brandingu akcji skautingowych",
      "2 miejsca na dorocznym gali talentow",
    ],
  },
  {
    id: "tech",
    name: "TECH PARTNER",
    subtitle: "Twoja technologia napedza system.",
    price: "Barter technologiczny",
    color: "cyan",
    borderClass: "border-brand-cyan",
    bgClass: "bg-brand-cyan/5",
    textClass: "text-brand-cyan",
    glowClass: "border-glow-cyan",
    slots: 6,
    benefits: [
      "Logo w sekcji Tech Stack na platformie",
      "Case study i wzmianka w dokumentacji",
      "Priorytet w przetargach technologicznych",
      "Wspolpraca R&D przy skalowaniu systemu",
      "Dostep do team developerskiego",
    ],
  },
  {
    id: "institutional",
    name: "PARTNER INSTYTUCJONALNY",
    subtitle: "Ministerstwo, Federacja, Samorzad.",
    price: "Program pilotazowy",
    color: "red",
    borderClass: "border-brand-red",
    bgClass: "bg-brand-red/5",
    textClass: "text-brand-red",
    glowClass: "border-glow-red",
    slots: 16,
    benefits: [
      "Wdrozenie pilotazu w 5 Orlikach",
      "500 zawodnikow w systemie przez 6 miesiecy",
      "Pelna dokumentacja techniczna i SIWZ",
      "Raportowanie danych do instytucji",
      "Wsparcie wdrozeniowe i szkolenia",
    ],
  },
];
const INTERESTED = [
  { name: "Ministerstwo Sportu", icon: "🏛️" },
  { name: "PZPN", icon: "⚽" },
  { name: "PKOl", icon: "🏅" },
  { name: "Akademia Legii", icon: "🦅" },
  { name: "Lotto", icon: "🎯" },
  { name: "Nike Central Europe", icon: "✔️" },
  { name: "Orange Polska", icon: "📡" },
  { name: "Politechnika Rzeszowska", icon: "🎓" },
];
export default function SponsorsSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="partnerzy" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Star size={14} />
            PARTNERSTWO STRATEGICZNE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Zostań Czescią{" "}
            <span className="text-brand-gold text-glow-gold">Historii.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            W 2038 Polska bedzie mistrzem swiata. Twoja marka moze byc przy tym od samego poczatku.
            Wybierz poziom partnerstwa.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.id} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:i*0.1}}
              className={"relative flex flex-col border-2 "+tier.borderClass+" "+tier.bgClass+" "+tier.glowClass}>
              {tier.id === "title" && (
                <div className={"absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-mono font-bold uppercase tracking-widest "+tier.textClass+" bg-brand-card border "+tier.borderClass}>
                  TYLKO 1 MIEJSCE
                </div>
              )}
              <div className="p-6 flex-1">
                <div className={"text-xs font-mono tracking-widest uppercase mb-2 "+tier.textClass}>{tier.name}</div>
                <p className="text-white font-display font-bold text-sm leading-snug mb-3">{tier.subtitle}</p>
                <div className={"text-xl font-display font-bold "+tier.textClass+" mb-1"}>{tier.price}</div>
                <div className="text-gray-600 text-[10px] font-mono mb-5">Dostepnych miejsc: {tier.slots}</div>
                <ul className="space-y-2">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-xs font-mono text-gray-400">
                      <span className={"flex-shrink-0 mt-0.5 "+tier.textClass}>&rsaquo;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 pt-0">
                <a href="#kontakt"
                  className={"block text-center py-2.5 border font-display font-bold text-xs uppercase tracking-widest transition-all "+tier.borderClass+" "+tier.textClass+" hover:bg-brand-gold/10"}>
                  Skontaktuj sie &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5}}>
          <div className="text-center text-gray-600 text-xs font-mono uppercase tracking-widest mb-6">
            // instytucje_zainteresowane — rozmowy w toku
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {INTERESTED.map((org, i) => (
              <motion.div key={org.name} initial={{opacity:0,scale:0.8}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{delay:0.6+i*0.06}}
                className="flex flex-col items-center gap-2 p-3 border border-brand-border bg-brand-dark hover:border-brand-gold/40 transition-all cursor-default">
                <span className="text-2xl">{org.icon}</span>
                <span className="text-gray-500 text-[10px] font-mono text-center leading-tight">{org.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-700 text-[10px] font-mono mt-4">
            * Logotypy sa przykladowe. Wspolpraca w fazie rozmow i negocjacji.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
