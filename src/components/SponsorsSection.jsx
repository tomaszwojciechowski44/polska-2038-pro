import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const TIERS_PL = [
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
      "Logo na wszystkich materiałach medialnych",
      "Dedykowany dashboard danych dla sponsora",
      "Prezentacja na ceremonii inauguracji ogólnopolskiej",
      "Pierwsze prawo do przedłużenia umowy",
      "Bezpośredni dostęp do danych agregowanych",
    ],
  },
  {
    id: "gold",
    name: "GOLD PARTNER",
    subtitle: "Współtworzysz przyszłość polskiego sportu.",
    price: "1 MLN PLN / rok",
    color: "neon",
    borderClass: "border-brand-neon",
    bgClass: "bg-brand-neon/5",
    textClass: "text-brand-neon",
    glowClass: "border-glow-neon",
    slots: 4,
    benefits: [
      "Logo na platformie i materiałach prasowych",
      "Dostęp do API danych (anonimizowanych)",
      "Uczestnictwo w pilotażu regionalnym",
      "Raport kwartalny z wyników systemu",
      "Możliwość współ-brandingu akcji skautingowych",
      "2 miejsca na dorocznej gali talentów",
    ],
  },
  {
    id: "tech",
    name: "TECH PARTNER",
    subtitle: "Twoja technologia napędza system.",
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
      "Współpraca R&D przy skalowaniu systemu",
      "Dostęp do team developerskiego",
    ],
  },
  {
    id: "institutional",
    name: "PARTNER INSTYTUCJONALNY",
    subtitle: "Ministerstwo, Federacja, Samorząd.",
    price: "Program pilotażowy",
    color: "red",
    borderClass: "border-brand-red",
    bgClass: "bg-brand-red/5",
    textClass: "text-brand-red",
    glowClass: "border-glow-red",
    slots: 16,
    benefits: [
      "Wdrożenie pilotażu w 5 Orlikach",
      "500 zawodników w systemie przez 6 miesięcy",
      "Pełna dokumentacja techniczna i SIWZ",
      "Raportowanie danych do instytucji",
      "Wsparcie wdrozeniowe i szkolenia",
    ],
  },
];

const TIERS_EN = [
  {
    id: "title",
    name: "TITLE SPONSOR",
    subtitle: "One slot. One brand. A legacy.",
    price: "5M PLN / year",
    color: "gold",
    borderClass: "border-brand-gold",
    bgClass: "bg-brand-gold/5",
    textClass: "text-brand-gold",
    glowClass: "border-glow-gold",
    slots: 1,
    benefits: [
      "Sponsor name in the #Polska2038 logo",
      "Exclusive naming rights for the system",
      "Logo across all media materials",
      "Dedicated data dashboard",
      "Presentation at the national launch ceremony",
      "First right of renewal",
      "Access to aggregated analytics",
    ],
  },
  {
    id: "gold",
    name: "GOLD PARTNER",
    subtitle: "Co-build the future of Polish sport.",
    price: "1M PLN / year",
    color: "neon",
    borderClass: "border-brand-neon",
    bgClass: "bg-brand-neon/5",
    textClass: "text-brand-neon",
    glowClass: "border-glow-neon",
    slots: 4,
    benefits: [
      "Logo on the platform and in press materials",
      "Access to (anonymized) data API",
      "Participation in the regional pilot",
      "Quarterly performance report",
      "Co-branding of scouting initiatives",
      "2 seats at the annual talent gala",
    ],
  },
  {
    id: "tech",
    name: "TECH PARTNER",
    subtitle: "Your tech powers the system.",
    price: "Technology barter",
    color: "cyan",
    borderClass: "border-brand-cyan",
    bgClass: "bg-brand-cyan/5",
    textClass: "text-brand-cyan",
    glowClass: "border-glow-cyan",
    slots: 6,
    benefits: [
      "Logo in the Tech Stack section",
      "Case study + documentation mention",
      "Priority in technology procurement",
      "R&D cooperation for scaling",
      "Access to the core dev team",
    ],
  },
  {
    id: "institutional",
    name: "INSTITUTIONAL PARTNER",
    subtitle: "Ministry, Federation, Local government.",
    price: "Pilot program",
    color: "red",
    borderClass: "border-brand-red",
    bgClass: "bg-brand-red/5",
    textClass: "text-brand-red",
    glowClass: "border-glow-red",
    slots: 16,
    benefits: [
      "Pilot deployment on 5 pitches",
      "500 players for 6 months",
      "Full technical docs and procurement-ready spec",
      "Institutional reporting",
      "Implementation support & training",
    ],
  },
];
export default function SponsorsSection() {
  const { lang } = useLanguage();
  const [ref, inView] = useInView(0.08);
  const TIERS = lang === "en" ? TIERS_EN : TIERS_PL;
  return (
    <section id="partnerzy" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Star size={14} />
            {lang === "en" ? "STRATEGIC PARTNERSHIPS" : "PARTNERSTWO STRATEGICZNE"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            {lang === "en" ? (
              <>
                Become part of{" "}
                <span className="text-brand-gold text-glow-gold">history.</span>
              </>
            ) : (
              <>
                Zostań Częścią{" "}
                <span className="text-brand-gold text-glow-gold">Historii.</span>
              </>
            )}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            {lang === "en"
              ? "In 2038 Poland can win the World Cup. Your brand can be there from day one. Choose a partnership tier."
              : "W 2038 Polska będzie mistrzem świata. Twoja marka może być przy tym od samego początku. Wybierz poziom partnerstwa."}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.id} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:i*0.1}}
              className={"relative flex flex-col border-2 "+tier.borderClass+" "+tier.bgClass+" "+tier.glowClass}>
              {tier.id === "title" && (
                <div className={"absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-mono font-bold uppercase tracking-widest "+tier.textClass+" bg-brand-card border "+tier.borderClass}>
                  {lang === "en" ? "ONLY 1 SLOT" : "TYLKO 1 MIEJSCE"}
                </div>
              )}
              <div className="p-6 flex-1">
                <div className={"text-xs font-mono tracking-widest uppercase mb-2 "+tier.textClass}>{tier.name}</div>
                <p className="text-white font-display font-bold text-sm leading-snug mb-3">{tier.subtitle}</p>
                <div className={"text-xl font-display font-bold "+tier.textClass+" mb-1"}>{tier.price}</div>
                <div className="text-gray-600 text-[10px] font-mono mb-5">
                  {lang === "en" ? "Slots:" : "Dostępnych miejsc:"} {tier.slots}
                </div>
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
                <Link to={lang === "en" ? "/en/kontakt" : "/kontakt"}
                  className={"block text-center py-2.5 border font-display font-bold text-xs uppercase tracking-widest transition-all "+tier.borderClass+" "+tier.textClass+" hover:bg-brand-gold/10"}>
                  {lang === "en" ? "Contact us →" : "Skontaktuj się →"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
