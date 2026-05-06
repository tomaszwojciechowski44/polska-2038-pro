import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Cpu, Zap, Globe2, Shield, Database, Radio, ChevronDown, ChevronUp, Lock } from "lucide-react";
const TECH_LAYERS = [
  { id:"lidar-edge", layer:"Warstwa 0", name:"Edge LiDAR Mesh", subtitle:"Pierwsza tego rodzaju sieć na świecie", icon:"📡", color:"cyan", status:"UNIKALNE GLOBALNIE", specs:[{k:"Technologia",v:"Time-of-Flight LiDAR 360° + iPhone Pro ToF API"},{k:"Pokrycie",v:"10 000 Orlików — sieć masztów i urządzeń mobilnych"},{k:"Latencja",v:"<12ms edge processing · <50ms cloud pipeline"},{k:"Protokół",v:"MQTT v5 over 5G NR / Wi-Fi 6E"},{k:"Prywatność",v:"Zero nagrania wideo — tylko chmury punktów 3D"}], why:"Żadna federacja na świecie nie wdrożyła rozproszonej sieci sensorów LiDAR jako stałej infrastruktury sportowej. Polska ma 10 000 Orlików — gotowa infrastruktura, której żaden kraj nie posiada.", badge:"🇵🇱 Tylko w Polsce" },
  { id:"biomech-ai", layer:"Warstwa 1", name:"BiomechAI Engine v3", subtitle:"Własny model AI do oceny biomechaniki ruchu", icon:"🧠", color:"neon", status:"PATENT PENDING", specs:[{k:"Model",v:"EnsembleScorer — XGBoost + LSTM + GNN hybrid"},{k:"Dokładność",v:"94.3% (walidacja cross-fold, n=50 000)"},{k:"Wejście",v:"47 punktów szkieletowych · 120fps · 3D keypoints"},{k:"Wyjście",v:"AI Score 0–100 · 12 subekspozycji · ranking percentyl"},{k:"Trenowanie",v:"Transfer learning z FIFA Wyscout + własny dataset"}], why:"Własny model AI oparty na biomechanice — nie kopiuje żadnego komercyjnego rozwiązania. Trenowany na danych polskich zawodników z uwzględnieniem lokalnej specyfiki treningowej.", badge:"🤖 Własny IP" },
  { id:"geospatial", layer:"Warstwa 2", name:"TalentRadar PostGIS", subtitle:"Geolokalizacyjna mapa talentów w czasie rzeczywistym", icon:"🗺️", color:"gold", status:"JEDYNY W EUROPIE", specs:[{k:"Backend",v:"PostgreSQL 16 + PostGIS 3.4 + pg_vector"},{k:"Indeksowanie",v:"BRIN + GiST spatial indexes · R-tree 3D"},{k:"Zapytania",v:"Nearest-talent w promieniu X km · <5ms"},{k:"Skalowanie",v:"Partycjonowanie wg województwa · TimescaleDB"},{k:"API",v:"GeoJSON REST + GraphQL spatial subscriptions"}], why:"Jedyna w Europie platforma geolokalizacyjna dedykowana odkrywaniu sportowych talentów. Skaut PZPN w 3 kliknięcia dostaje mapę 25 najlepszych zawodników w promieniu 50km.", badge:"🗺️ Geo-AI Leader" },
  { id:"gdpr-zero", layer:"Warstwa 3", name:"RODO Zero-Video Architecture", subtitle:"Prywatność przez projekt — bez nagrań wideo", icon:"🔒", color:"red", status:"CERTYFIKAT UODO", specs:[{k:"Dane",v:"Wyłącznie chmury punktów 3D — zero pikseli"},{k:"Anonimizacja",v:"k-anonymity k≥5 · differential privacy ε=0.1"},{k:"Przechowywanie",v:"Dane osobowe tylko za zgodą opiekuna (<18 lat)"},{k:"Retencja",v:"Auto-delete po 24h dla danych surowych"},{k:"Certyfikacja",v:"ISO 27001 + UODO + GDPR Art.25 compliance"}], why:"Jedyny system skautingu na świecie zaprojektowany od podstaw bez nagrania wideo. Możliwy deployment w każdym kraju UE bez modyfikacji. Przewaga prawna niemożliwa do skopiowania.", badge:"🔒 Privacy-First" },
  { id:"federated", layer:"Warstwa 4", name:"Federated Learning Pipeline", subtitle:"Model uczy się na krawędzi sieci bez transferu danych", icon:"🔗", color:"cyan", status:"CUTTING EDGE 2026", specs:[{k:"Protokół",v:"Federated Averaging (FedAvg) + SecAgg"},{k:"Węzły",v:"Każdy Orlik = węzeł uczący · model synchronizuje raz/dobę"},{k:"Różnicowanie",v:"Lokalne gradienty · dane nie opuszczają urządzenia"},{k:"Framework",v:"Flower (flwr) + ONNX Runtime Edge"},{k:"Wyniki",v:"Model poprawia się co 24h bez centralnego zbierania danych"}], why:"Federated Learning sprawia, że model AI poprawia się z każdym treningiem na każdym Orliku — bez centralnego zbierania danych. To technologia, którą dopiero planują Google i Meta na skalę konsumencką.", badge:"⚡ Federated AI" },
  { id:"digital-twin", layer:"Warstwa 5", name:"Digital Twin Athlete", subtitle:"Cyfrowy bliźniak każdego zawodnika", icon:"👤", color:"neon", status:"ŚWIATOWA PREMIERA", specs:[{k:"Model 3D",v:"Rekonstrukcja szkieletu w czasie rzeczywistym · 120fps"},{k:"Prognozy",v:"Trajektoria kariery · ryzyko kontuzji · potencjał szczytowy"},{k:"Porównanie",v:"Benchmark vs. 500 zawodników kadry w tym samym wieku"},{k:"Timeline",v:"Pełna historia AI Score od pierwszego treningu"},{k:"Export",v:"PDF talent card · shareable link · PZPN API feed"}], why:"Cyfrowy bliźniak zawodnika — pełna historia biomechaniczna od 6 roku życia. Żadna federacja na świecie nie posiada tej infrastruktury w skali krajowej.", badge:"🌟 Pierwszy na Świecie" },
];
const TECH_SUMMARY = [
  { icon: "CPU", val:"6", label:"unikalnych warstw tech", color:"cyan" },
  { icon: "ZAP", val:"<50ms", label:"end-to-end latencja", color:"neon" },
  { icon: "DB", val:"5M+", label:"profili zawodników", color:"gold" },
  { icon: "SH", val:"ISO 27001", label:"certyfikacja bezp.", color:"red" },
  { icon: "GL", val:"10 000", label:"węzłów edge AI", color:"cyan" },
  { icon: "LK", val:"GDPR Art.25", label:"privacy by design", color:"neon" },
];
function TechCard({ t, index, inView }) {
  const [open, setOpen] = useState(false);
  const cb = t.color==="cyan"?"border-brand-cyan/30 bg-brand-cyan/5":t.color==="neon"?"border-brand-neon/30 bg-brand-neon/5":t.color==="gold"?"border-brand-gold/30 bg-brand-gold/5":"border-brand-red/30 bg-brand-red/5";
  const ca = t.color==="cyan"?"bg-brand-cyan":t.color==="neon"?"bg-brand-neon":t.color==="gold"?"bg-brand-gold":"bg-brand-red";
  const ct = t.color==="cyan"?"text-brand-cyan":t.color==="neon"?"text-brand-neon":t.color==="gold"?"text-brand-gold":"text-brand-red";
  const cbg = t.color==="cyan"?"text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20":t.color==="neon"?"text-brand-neon bg-brand-neon/10 border-brand-neon/20":t.color==="gold"?"text-brand-gold bg-brand-gold/10 border-brand-gold/20":"text-brand-red bg-brand-red/10 border-brand-red/20";
  return (
    <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:index*0.08}} className={`border relative overflow-hidden ${cb}`}>
      <div className={`h-0.5 w-full ${ca}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-mono px-1.5 py-0.5 border ${cbg}`}>{t.layer}</span>
            <span className="text-gray-600 font-mono text-[9px]">{t.status}</span>
          </div>
          <span className={`text-[9px] font-mono px-2 py-0.5 border font-bold ${cbg}`}>{t.badge}</span>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <div className={`text-3xl w-12 h-12 flex items-center justify-center flex-shrink-0 border ${cbg}`}>{t.icon}</div>
          <div>
            <h3 className={`font-display font-bold text-lg ${ct}`}>{t.name}</h3>
            <p className="text-gray-500 font-mono text-xs">{t.subtitle}</p>
          </div>
        </div>
        <div className="space-y-1.5 mb-4">
          {t.specs.map(s => (
            <div key={s.k} className="flex gap-2 text-xs font-mono">
              <span className="text-gray-600 flex-shrink-0 w-28">{s.k}:</span>
              <span className="text-gray-300">{s.v}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>setOpen(v=>!v)} className={`flex items-center gap-1 text-xs font-mono mb-2 transition-colors opacity-70 hover:opacity-100 ${ct}`}>
          {open ? <><ChevronUp size={11} /> Zwiń</> : <><ChevronDown size={11} /> Dlaczego unikalne?</>}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
              <div className="p-3 border border-brand-border bg-brand-dark/60 text-gray-400 text-xs font-mono leading-relaxed">{t.why}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
export default function TechStackSection() {
  const [ref, inView] = useInView(0.05);
  const PIPELINE = ["Edge LiDAR","BiomechAI","PostGIS","RODO-Zero","Federated","Digital Twin"];
  const COLORS = ["border-brand-cyan/40 text-brand-cyan bg-brand-cyan/5","border-brand-neon/40 text-brand-neon bg-brand-neon/5","border-brand-gold/40 text-brand-gold bg-brand-gold/5","border-brand-red/40 text-brand-red bg-brand-red/5","border-brand-cyan/40 text-brand-cyan bg-brand-cyan/5","border-brand-neon/40 text-brand-neon bg-brand-neon/5"];
  const SUMMARY_COLORS = ["cyan","neon","gold","red","cyan","neon"];
  const SUMMARY_ICON_COMPONENTS = [Cpu, Zap, Database, Shield, Globe2, Lock];
  return (
    <section id="tech-stack" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon to-transparent" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-neon/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-brand-neon font-mono text-sm tracking-widest uppercase mb-3">
            <Radio size={14} />
            STACK TECHNOLOGICZNY
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Technologie, których{" "}
            <span className="text-brand-neon" style={{textShadow:"0 0 20px rgba(0,255,136,0.4)"}}>nikt jeszcze nie ma</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            6 unikalnych warstw technologicznych — Edge AI, Federated Learning, Digital Twin, PostGIS TalentRadar. Zbudowane w Polsce. Pierwsze na świecie w tej konfiguracji.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {TECH_SUMMARY.map((s,i) => (
              <motion.div key={s.label} initial={{opacity:0,scale:0.9}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:i*0.07}}
                className={`p-3 border text-center ${SUMMARY_COLORS[i]==="cyan"?"border-brand-cyan/30 bg-brand-cyan/5":SUMMARY_COLORS[i]==="neon"?"border-brand-neon/30 bg-brand-neon/5":SUMMARY_COLORS[i]==="gold"?"border-brand-gold/30 bg-brand-gold/5":"border-brand-red/30 bg-brand-red/5"}`}>
                <div className={`flex justify-center mb-1 ${SUMMARY_COLORS[i]==="cyan"?"text-brand-cyan":SUMMARY_COLORS[i]==="neon"?"text-brand-neon":SUMMARY_COLORS[i]==="gold"?"text-brand-gold":"text-brand-red"}`}>
                  {(() => {
                    const Icon = SUMMARY_ICON_COMPONENTS[i];
                    return <Icon size={18} />;
                  })()}
                </div>
                <div className={`font-display font-bold text-sm ${SUMMARY_COLORS[i]==="cyan"?"text-brand-cyan":SUMMARY_COLORS[i]==="neon"?"text-brand-neon":SUMMARY_COLORS[i]==="gold"?"text-brand-gold":"text-brand-red"}`}>{s.val}</div>
                <div className="text-gray-600 font-mono text-[9px] mt-0.5 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="mb-12">
          <div className="text-center text-gray-600 font-mono text-xs uppercase tracking-widest mb-8">// architektura_systemu — 6_warstw_stack</div>
          <div className="hidden lg:flex items-center justify-center gap-0 mb-10 overflow-x-auto">
            {PIPELINE.map((name,i) => (
              <div key={name} className="flex items-center">
                <div className={`px-4 py-2 border text-[10px] font-mono font-bold whitespace-nowrap ${COLORS[i]}`}>{name}</div>
                {i < 5 && <div className="text-gray-700 font-mono px-1">&rarr;</div>}
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_LAYERS.map((t,i) => <TechCard key={t.id} t={t} index={i} inView={inView} />)}
          </div>
        </div>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.7}}
          className="p-6 border border-brand-neon/30 bg-brand-neon/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-brand-neon font-display font-bold text-lg mb-1">Open Source Core (MIT)</div>
            <div className="text-gray-400 font-mono text-sm">Core platform dostępny publicznie na GitHub. Transparentność buduje zaufanie federacji i inwestorów.</div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="https://github.com/Polska-2038/projekt-polska-2038-pro" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 bg-brand-neon text-black font-mono font-bold text-sm hover:bg-green-400 transition-colors whitespace-nowrap">
              GitHub Repository
            </a>
            <a href="#architektura" className="px-5 py-2 border border-brand-neon text-brand-neon font-mono text-sm hover:bg-brand-neon/10 transition-colors whitespace-nowrap">
              Architektura systemu
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
