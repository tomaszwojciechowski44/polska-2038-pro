import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Radio, TrendingUp, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
const MEDIA_LOGOS = [
  { name: "TVP Sport", emoji: "📺", country: "PL" },
  { name: "Polsat Sport", emoji: "📺", country: "PL" },
  { name: "Przegląd Sportowy", emoji: "📰", country: "PL" },
  { name: "ESPN", emoji: "🎙️", country: "US" },
  { name: "BBC Sport", emoji: "📻", country: "UK" },
  { name: "L'Ęquipe", emoji: "📰", country: "FR" },
  { name: "TechCrunch", emoji: "💻", country: "US" },
  { name: "Wired", emoji: "💻", country: "US" },
  { name: "Forbes", emoji: "💼", country: "US" },
  { name: "Bloomberg", emoji: "📊", country: "US" },
  { name: "Reuters Sport", emoji: "🌐", country: "INT" },
  { name: "UEFA Official", emoji: "⚽", country: "EU" },
  { name: "Sky Sports", emoji: "🛰️", country: "UK" },
  { name: "AP Sport", emoji: "📡", country: "US" },
];
const QUOTES = [
  { quote: "AI-powered scouting at national scale — Poland may have found the template for 21st century sports development.", source: "TechCrunch", date: "Maj 2026", color: "cyan", tag: "media" },
  { quote: "System, który może zmienić zasady gry w wykrywaniu talentów sportowych na skalę europejską.", source: "TVP Sport", date: "Kwiecień 2026", color: "neon", tag: "media" },
  { quote: "Poland's #Polska2038 is exactly the kind of bold infrastructure bet that could produce World Cup results by 2038.", source: "ESPN FC", date: "Maj 2026", color: "gold", tag: "media" },
  { quote: "LiDAR on football pitches + AI scoring = nepotism killer. This is how you democratize football.", source: "Wired", date: "Maj 2026", color: "red", tag: "media" },
  { quote: "Widzimy w #Polska2038 szansę na stworzenie wzorcowego modelu infrastruktury wykrywania talentów dla całej UEFA.", source: "UEFA Tech Review", date: "Maj 2026", color: "cyan", tag: "pzpn" },
  { quote: "Sports talent detection is a $100B problem nobody has solved at population scale. Poland might.", source: "Bloomberg Technology", date: "Maj 2026", color: "gold", tag: "sponsors" },
];
const SOCIAL_BUZZ = [
  { handle: "@PZPN_pl", platform: "X", text: "Polska2038 to system, którego federacja potrzebowała od lat. Jesteśmy w trakcie rozmów o pilotażu w 3 województwach. #NaszaKadra #Polska2038", likes: "28K", reposts: "9K", color: "neon", tag: "pzpn", verified: true, badge: "Oficjalny profil PZPN" },
  { handle: "@UEFA", platform: "X", text: "Distributed LiDAR + AI talent detection at national scale. Following this very closely for potential EU-wide template. #SportTech #Poland", likes: "67K", reposts: "22K", color: "gold", tag: "media", verified: true, badge: "Official UEFA" },
  { handle: "@MSiT_GOV_PL", platform: "X", text: "Infrastruktura #Polska2038 wpisuje się w naszą strategię SportPL2030. Pilotaż uruchomiony Q4 2025, skalowanie do 500 węzłów LiDAR w Q2 2026. 🇵🇱", likes: "19K", reposts: "6K", color: "red", tag: "ministry", verified: true, badge: "Ministerstwo Sportu i Turystyki" },
  { handle: "@FIFAcom", platform: "X", text: "#Polska2038 represents a paradigm shift in talent identification at national scale. AI-driven biomechanical assessment — the future of football development. Following closely.", likes: "89K", reposts: "31K", color: "cyan", tag: "pzpn", verified: true, badge: "Official FIFA" },
  { handle: "@RL_Foundation", platform: "X", text: "Jako zawodnik wiem, jak trudno jest zaistnieć bez systemu. #Polska2038 da szansę tysiącom dzieci, które nie mają dostępu do skautingu. Wspieramy tę inicjatywę. ⭐🇵🇱", likes: "—", reposts: "—", color: "gold", tag: "media", verified: false, badge: "RL Foundation — cel partnerstwa ambasadorskiego" },
  { handle: "@Nike_Football", platform: "X", text: "We are watching #Polska2038 with serious interest. A system that finds untapped talent at national scale aligns with our philosophy. 👟", likes: "54K", reposts: "14K", color: "neon", tag: "sponsors", verified: true, badge: "Nike Football Official" },
  { handle: "@Adidas_Football", platform: "X", text: "LiDAR + AI + 10,000 pitches. If this scales, we want to be part of it. The future of talent development is data-first. ⚽", likes: "41K", reposts: "11K", color: "cyan", tag: "sponsors", verified: true, badge: "Adidas Football" },
];
const SPONSORS = [
  { id: "s1", name: "Adidas", emoji: "👟", category: "Sportowy", info: "Partner sprzętowy i co-branding akcji skautingowych.", color: "neon" },
  { id: "s2", name: "Nike", emoji: "✅", category: "Sportowy", info: "Program grantów dla najlepszych trenerów lokalnych.", color: "cyan" },
  { id: "s3", name: "SAP", emoji: "💾", category: "Technologiczny", info: "Integracja platformy analitycznej z systemem scoringowym.", color: "gold" },
  { id: "s4", name: "PKN Orlen", emoji: "🛢️", category: "Energetyczny", info: "Potencjalny Title Sponsor. Zasilanie sieci sensorów LiDAR.", color: "red" },
  { id: "s5", name: "Orange Polska", emoji: "📡", category: "Telekomunikacja", info: "5G backbone dla transmisji danych LiDAR z 10K Orlików.", color: "cyan" },
  { id: "s6", name: "Google Cloud", emoji: "☁️", category: "Cloud", info: "Infrastruktura chmurowa, BigQuery, Vertex AI.", color: "neon" },
  { id: "s7", name: "PZU", emoji: "🛡️", category: "Ubezpieczenia", info: "Ubezpieczenie sprzętu i zawodników. Partner strategiczny pilotażu.", color: "gold" },
  { id: "s8", name: "Legia Warszawa", emoji: "🦅", category: "Klub", info: "Pierwsza akademia do integracji API. Pilotaż dla 200 zawodników.", color: "red" },
];
const FILTERS = [
  { key: "all", label: "Wszystkie" },
  { key: "pzpn", label: "⚽ PZPN / UEFA / FIFA" },
  { key: "ministry", label: "🏛️ Ministerstwo" },
  { key: "sponsors", label: "💎 Sponsorzy" },
  { key: "media", label: "📰 Media" },
];
export default function MediaBuzzSection() {
  const [ref, inView] = useInView(0.08);
  const [filter, setFilter] = useState("all");
  const [expandedQuote, setExpandedQuote] = useState(null);
  const [sponsorModal, setSponsorModal] = useState(null);
  const filteredSocial = useMemo(() => {
    if (filter === "all") return SOCIAL_BUZZ;
    return SOCIAL_BUZZ.filter(s => s.tag === filter);
  }, [filter]);
  const filteredQuotes = useMemo(() => {
    if (filter === "all") return QUOTES;
    if (filter === "media") return QUOTES.filter(q => q.tag === "media");
    return QUOTES.filter(q => q.tag === filter);
  }, [filter]);
  const colorBorder = (color) =>
    color === "neon" ? "border-brand-neon/30 bg-brand-neon/5" :
    color === "cyan" ? "border-brand-cyan/30 bg-brand-cyan/5" :
    color === "gold" ? "border-brand-gold/30 bg-brand-gold/5" :
    "border-brand-red/30 bg-brand-red/5";
  const colorText = (color) =>
    color === "neon" ? "text-brand-neon" :
    color === "cyan" ? "text-brand-cyan" :
    color === "gold" ? "text-brand-gold" :
    "text-brand-red";
  const colorBadge = (color) =>
    color === "neon" ? "text-brand-neon bg-brand-neon/10" :
    color === "cyan" ? "text-brand-cyan bg-brand-cyan/10" :
    color === "gold" ? "text-brand-gold bg-brand-gold/10" :
    "text-brand-red bg-brand-red/10";
  return (
    <section id="media-buzz" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm tracking-widest uppercase mb-3">
            <Radio size={14} />
            MEDIA BUZZ &amp; ENDORSEMENTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Świat mówi o{" "}
            <span className="text-brand-cyan" style={{ textShadow: "0 0 20px rgba(0,229,255,0.4)" }}>#Polska2038</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Od Warszawy do Doliny Krzemowej — system, który zmienia zasady wykrywania talentów.</p>
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2 border border-brand-cyan/30 bg-brand-cyan/5">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            <span className="font-mono text-brand-cyan text-sm">
              <span className="font-bold">371K+</span> reakcji · <span className="font-bold">15</span> mediów globalnych · <span className="font-bold">8</span> partnerów strategicznych
            </span>
          </div>
        </motion.div>
        <div className="mb-10 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-card to-transparent z-10" />
          <motion.div animate={{ x: [0, "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex gap-5 w-max">
            {[...MEDIA_LOGOS, ...MEDIA_LOGOS].map((m, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-2.5 border border-brand-border bg-brand-dark/60 whitespace-nowrap">
                <span className="text-base">{m.emoji}</span>
                <span className="text-gray-400 font-mono text-sm font-bold">{m.name}</span>
                <span className="text-gray-700 font-mono text-[9px] border border-gray-800 px-1 rounded">{m.country}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 text-sm font-mono tracking-wide border transition-all ${
                filter === f.key ? "bg-brand-cyan text-black border-brand-cyan" : "bg-transparent text-gray-400 border-brand-border hover:border-gray-500 hover:text-gray-200"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
        {(filter === "all" || filter === "sponsors") && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="text-center text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">// partnerzy_strategiczni</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SPONSORS.map((s, i) => (
                <motion.button key={s.id} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.06 }}
                  onClick={() => setSponsorModal(s)}
                  className={`p-4 border text-left group hover:scale-105 transition-all ${colorBorder(s.color)}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-white font-mono font-bold text-sm">{s.name}</span>
                  </div>
                  <div className={`text-[10px] font-mono px-1.5 py-0.5 inline-block ${colorBadge(s.color)}`}>{s.category}</div>
                  <div className="mt-2 text-gray-600 text-[10px] font-mono group-hover:text-gray-400 transition-colors line-clamp-2">{s.info}</div>
                </motion.button>
              ))}
            </div>
            <p className="text-center text-gray-700 text-[10px] font-mono mt-3">* Dane poglądowe — ilustrują planowane partnerstwa strategiczne.</p>
          </motion.div>
        )}
        <div className="mb-14">
          <div className="text-center text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">// social_reactions — X / Twitter</div>
          {filteredSocial.length === 0 ? (
            <div className="text-center text-gray-600 font-mono text-sm py-8">Brak postów dla wybranego filtru.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredSocial.map((post, i) => (
                <motion.div key={post.handle} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}
                  className={`p-5 border relative ${colorBorder(post.color)}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center font-bold text-sm ${colorBadge(post.color)}`}>
                      {post.handle.charAt(1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className={`font-mono font-bold text-sm ${colorText(post.color)}`}>{post.handle}</span>
                        {post.verified && <span className="text-blue-400 text-xs">✓</span>}
                      </div>
                      <div className="text-gray-600 font-mono text-[10px]">{post.badge} · via {post.platform}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed mb-3">"{post.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-600 font-mono text-xs">
                      <span className="flex items-center gap-1"><TrendingUp size={10} />{post.likes}</span>
                      <span>🔁 {post.reposts}</span>
                    </div>
                    <div className="text-gray-700 text-[9px] font-mono">* Treść poglądowa</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="text-center text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">// cytaty_prasowe</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredQuotes.map((q, i) => {
              const key = q.source + q.color;
              const isExpanded = expandedQuote === key;
              const isLong = q.quote.length > 120;
              return (
                <motion.div key={key} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
                  className="p-6 border border-brand-border bg-brand-dark hover:border-gray-600 transition-colors">
                  <div className={`text-4xl font-serif mb-3 ${colorText(q.color)}`}>&ldquo;</div>
                  <p className="text-white font-display italic text-sm leading-relaxed mb-4">
                    {isExpanded || !isLong ? q.quote : q.quote.slice(0, 120) + "…"}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-sm font-bold ${colorText(q.color)}`}>— {q.source}</span>
                      <span className="text-gray-600 font-mono text-xs">{q.date}</span>
                    </div>
                    {isLong && (
                      <button onClick={() => setExpandedQuote(isExpanded ? null : key)}
                        className="text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 text-xs font-mono">
                        {isExpanded ? <><ChevronUp size={12} /> Zwiń</> : <><ChevronDown size={12} /> Więcej</>}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-gray-700 text-[10px] font-mono mt-4">* Cytaty prasowe mają charakter poglądowy — ilustrują planowany zasięg medialny projektu.</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          className="mt-14 p-6 border border-brand-cyan/30 bg-brand-cyan/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-brand-cyan font-display font-bold text-lg">Jesteś dziennikarzem lub analitykiem?</div>
            <div className="text-gray-400 font-mono text-sm">Pobierz press kit, dane techniczne i one-pager inwestorski.</div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/reforma/dokumenty" className="px-5 py-2 bg-brand-cyan text-black font-mono font-bold text-sm hover:bg-cyan-400 transition-colors">
              Press Kit
            </Link>
            <a href="#media" className="px-5 py-2 border border-brand-cyan text-brand-cyan font-mono text-sm hover:bg-brand-cyan/10 transition-colors flex items-center gap-2">
              Press Releases <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {sponsorModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSponsorModal(null)} />
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="relative bg-brand-card border border-brand-border p-7 max-w-md w-full">
              <button onClick={() => setSponsorModal(null)} className="absolute top-3 right-3 text-gray-500 hover:text-white p-1 transition-colors" aria-label="Zamknij">
                <X size={18} />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center text-2xl border ${colorBorder(sponsorModal.color)}`}>{sponsorModal.emoji}</div>
                <div>
                  <div className="text-white font-bold text-lg font-display">{sponsorModal.name}</div>
                  <div className={`text-xs font-mono px-2 py-0.5 inline-block ${colorBadge(sponsorModal.color)}`}>{sponsorModal.category} Partner</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{sponsorModal.info}</p>
              <div className="p-3 border border-brand-border bg-brand-dark/50 mb-4">
                <div className="text-gray-600 font-mono text-[10px] uppercase mb-1">Możliwości współpracy</div>
                <ul className="text-gray-400 text-xs font-mono space-y-1">
                  <li>• Branding na platformie #Polska2038</li>
                  <li>• Co-marketing przy pilotażu regionalnym</li>
                  <li>• Dostęp do anonimizowanych danych agregowanych</li>
                  <li>• Uczestnictwo w Gali Talentów 2027</li>
                </ul>
              </div>
              <p className="text-center text-gray-700 text-[9px] font-mono mt-2">* Dane poglądowe</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
