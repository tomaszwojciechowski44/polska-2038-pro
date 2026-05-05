import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { MapPin, Star, TrendingUp, ChevronRight, Zap } from "lucide-react";
import { getTalents } from "../api/client";

const TALENTS_FALLBACK = [
  { id:1, initials:"D.M.", age:14, location:"Orlik Rzeszów-Południe", region:"Podkarpacie", sport:"Piłka nożna",
    score:96, tier:"ELITE", tierColor:"neon",
    metrics:[{l:"Start 0-10m",v:98},{l:"Czas reakcji",v:94},{l:"Eksplozywność",v:97},{l:"Balans osi",v:91},{l:"Długość kroku",v:95}],
    history:[72,75,78,80,84,87,91,94,96],
    tags:["Napastnik","Lewonożny","Szybki start"],
    note:"Najszybszy start 0-10m w regionie. Top 2% w Polsce dla rocznika 2011 spośród 100K profili." },
  { id:2, initials:"J.K.", age:16, location:"Orlik Tarnów-Północ", region:"Małopolska", sport:"Piłka nożna",
    score:87, tier:"PROSPECT", tierColor:"cyan",
    metrics:[{l:"Start 0-10m",v:85},{l:"Czas reakcji",v:88},{l:"Eksplozywność",v:84},{l:"Balans osi",v:90},{l:"Długość kroku",v:87}],
    history:[65,68,71,74,77,80,83,85,87],
    tags:["Pomocnik","Dwunożny","Wysokie IQ"],
    note:"Stały wzrost +3 pkt/kwartał. Progresja szybsza niż 89% profili w tej grupie wiekowej." },
  { id:3, initials:"M.W.", age:12, location:"Orlik Kraków-Nowa Huta", region:"Małopolska", sport:"Piłka nożna",
    score:91, tier:"ELITE", tierColor:"neon",
    metrics:[{l:"Start 0-10m",v:92},{l:"Czas reakcji",v:89},{l:"Eksplozywność",v:93},{l:"Balans osi",v:88},{l:"Długość kroku",v:91}],
    history:[70,73,76,80,83,86,88,90,91],
    tags:["Bramkarz","Refleks","Zasięg ramion"],
    note:"Czas reakcji w top 3% dla rocznika 2013. Rekomendacja: natychmiastowy kontakt ze skautem Akademii." },
];

function apiTalentToCard(t) {
  const tierColor = t.ai_tier === "ELITE" ? "neon" : "cyan";
  return {
    id: t.id,
    initials: `${t.first_name?.[0] || "?"}${t.last_name_initial || ""}`,
    age: t.age,
    location: t.lidar_node || t.voivodeship_code,
    region: t.voivodeship_code,
    sport: t.sport,
    score: t.ai_score,
    tier: t.ai_tier,
    tierColor,
    metrics: [
      { l: "Start 0-10m",   v: Math.round((t.sprint_0_10m || 7) * 10) },
      { l: "Czas reakcji",  v: Math.round((t.reaction_time || 7) * 10) },
      { l: "Eksplozywność", v: Math.round((t.explosiveness || 7) * 10) },
      { l: "Balans osi",    v: Math.round((t.balance_score || 7) * 10) },
      { l: "Technika",      v: Math.round((t.technique_score || 7) * 10) },
    ],
    history: t.score_history?.map((h) => h.score) || [t.ai_score],
    tags: [t.sport, t.ai_tier, `${t.age} lat`],
    note: t.ai_note || "Profil wygenerowany przez system Polska2038.",
  };
}
function Sparkline({ data, color }) {
  const max = Math.max(...data); const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120; const h = 32;
  if (data.length < 2) return null;
  const pts = data.map((v,i) => {
    const x = (i/(data.length-1))*w;
    const y = h - ((v-min)/range)*(h-4) - 2;
    return x+","+y;
  });
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={Number(pts[pts.length-1].split(",")[0])} cy={Number(pts[pts.length-1].split(",")[1])} r="3" fill={color} />
    </svg>
  );
}
function TalentCard({ talent, active, onClick }) {
  const C = {
    neon: { border: active ? "border-brand-neon border-glow-neon" : "border-brand-neon/30 hover:border-brand-neon/60", bg: active ? "bg-brand-neon/5" : "bg-brand-card", text:"text-brand-neon", badge:"bg-brand-neon/20 text-brand-neon border-brand-neon/40", hex:"#00FF88" },
    cyan: { border: active ? "border-brand-cyan border-glow-cyan" : "border-brand-cyan/30 hover:border-brand-cyan/60", bg: active ? "bg-brand-cyan/5" : "bg-brand-card", text:"text-brand-cyan", badge:"bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40", hex:"#00E5FF" },
  };
  const c = C[talent.tierColor];
  return (
    <motion.div layout onClick={onClick} className={"cursor-pointer border transition-all duration-300 "+c.border+" "+c.bg}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={"w-12 h-12 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm flex-shrink-0 "+c.border+" "+c.text}>
            {talent.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={"px-2 py-0.5 text-[10px] font-mono font-bold border rounded "+c.badge}>{talent.tier}</span>
              <span className="text-gray-500 text-xs font-mono">{talent.sport}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs font-mono">
              <MapPin size={10} />{talent.location}
            </div>
            <div className="text-gray-600 text-[10px] font-mono">{talent.region} &bull; {talent.age} lat</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={"text-3xl font-display font-bold "+c.text}>{talent.score}</div>
            <div className="text-gray-600 text-[10px] font-mono">AI Score</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {talent.tags.map((t) => <span key={t} className="px-2 py-0.5 bg-brand-dark border border-brand-border text-gray-400 text-[10px] font-mono rounded">{t}</span>)}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-[10px] font-mono mb-1">Progresja AI Score</div>
            <Sparkline data={talent.history} color={c.hex} />
          </div>
          <ChevronRight size={16} className={"transition-transform "+(active ? "rotate-90 "+c.text : "text-gray-600")} />
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
            className="border-t border-brand-border/50 p-5 space-y-4">
            <div className="space-y-2">
              <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-2">Biomechanika — Profil Centylowy</div>
              {talent.metrics.map((m,i) => (
                <div key={m.l}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-gray-400 text-xs font-mono">{m.l}</span>
                    <span className={"text-xs font-mono font-bold "+c.text}>{m.v} centyl</span>
                  </div>
                  <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{backgroundColor:c.hex}}
                      initial={{width:0}} animate={{width:m.v+"%"}} transition={{duration:0.8,delay:i*0.08}} />
                  </div>
                </div>
              ))}
            </div>
            <div className={"p-3 border "+(talent.tierColor==="neon"?"border-brand-neon/20 bg-brand-neon/5":"border-brand-cyan/20 bg-brand-cyan/5")}>
              <div className="flex items-center gap-1 mb-1">
                <Star size={10} className={c.text} />
                <span className={"text-[10px] font-mono uppercase tracking-widest "+c.text}>AI Raport Skautingowy</span>
              </div>
              <p className="text-gray-300 text-xs font-mono leading-relaxed">{talent.note}</p>
            </div>
            <div className="flex gap-2 pt-1">
              <button className={"flex-1 py-2 border text-xs font-mono font-bold uppercase tracking-wide transition-all "+(talent.tierColor==="neon"?"border-brand-neon/40 text-brand-neon hover:bg-brand-neon hover:text-brand-dark":"border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark")}>
                Kontakt ze skautem &rarr;
              </button>
              <button className="px-3 py-2 border border-brand-border text-gray-500 hover:text-white text-xs font-mono transition-colors">PDF</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export default function ScoutDemoSection() {
  const [activeId, setActiveId] = useState(null);
  const [ref, inView] = useInView(0.05);
  const [TALENTS, setTALENTS] = useState(TALENTS_FALLBACK);

  useEffect(() => {
    getTalents({ demo: true, limit: 3 })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const cards = res.data.map(apiTalentToCard);
          setTALENTS(cards);
          setActiveId(cards[0]?.id ?? null);
        }
      })
      .catch(() => {
        setActiveId(TALENTS_FALLBACK[0].id);
      });
  }, []);

  return (
    <section id="scout-demo" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon/60 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-brand-neon font-mono text-sm tracking-widest uppercase mb-3">
            <Zap size={14} />LIVE DEMO — TALENT DASHBOARD
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            To Właśnie <span className="text-brand-neon text-glow-neon">Widzi Skaut.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Obiektywne profile zawodników generowane przez AI w czasie rzeczywistym.
            Kliknij kartę, aby zobaczyć pełny raport skautingowy.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{opacity:0,y:10}} animate={inView?{opacity:1,y:0}:{}}
              className="flex flex-wrap items-center gap-2 p-3 border border-brand-border bg-brand-card">
              <span className="text-gray-600 text-xs font-mono">FILTR:</span>
              {["Wszyscy","ELITE (85+)","PROSPECT (70-85)"].map((f,i) => (
                <button key={f} className={"px-3 py-1 text-xs font-mono border transition-colors "+(i===0?"border-brand-neon/50 text-brand-neon bg-brand-neon/10":"border-brand-border text-gray-500 hover:border-gray-600")}>
                  {f}
                </button>
              ))}
              <span className="ml-auto text-gray-600 text-xs font-mono">3 wyniki</span>
            </motion.div>
            {TALENTS.map((t,i) => (
              <motion.div key={t.id} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.15+i*0.1}}>
                <TalentCard talent={t} active={activeId===t.id} onClick={() => setActiveId(activeId===t.id?null:t.id)} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3}} className="space-y-4">
            <div className="p-5 border border-brand-neon/20 bg-brand-neon/5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={14} className="text-brand-neon" />
                <span className="text-brand-neon text-xs font-mono uppercase tracking-widest">TalentRadar</span>
              </div>
              <div className="relative h-36 border border-brand-border bg-brand-dark overflow-hidden mb-3">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:"repeating-linear-gradient(0deg,#1A2540 0,#1A2540 1px,transparent 1px,transparent 30px),repeating-linear-gradient(90deg,#1A2540 0,#1A2540 1px,transparent 1px,transparent 30px)"}} />
                {[{x:50,y:50,r:10,c:"#00FF88"},{x:30,y:35,r:6,c:"#00E5FF"},{x:70,y:65,r:8,c:"#00FF88"},{x:20,y:70,r:4,c:"#FFD700"},{x:80,y:25,r:5,c:"#00E5FF"}].map((d,i)=>(
                  <motion.div key={i} className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{left:d.x+"%",top:d.y+"%",width:d.r*2,height:d.r*2,backgroundColor:d.c,boxShadow:"0 0 "+d.r+"px "+d.c}}
                    animate={{opacity:[0.6,1,0.6]}} transition={{duration:2,delay:i*0.4,repeat:Infinity}} />
                ))}
                <motion.div className="absolute rounded-full border border-brand-neon/40"
                  style={{left:"50%",top:"50%",width:80,height:80,marginLeft:-40,marginTop:-40}}
                  animate={{scale:[1,1.5,1],opacity:[0.6,0,0.6]}} transition={{duration:3,repeat:Infinity}} />
                <div className="absolute top-1 left-2 text-brand-neon/60 text-[9px] font-mono">MAPA TALENTÓW</div>
                <div className="absolute bottom-1 right-2 text-gray-600 text-[9px] font-mono">50km radius</div>
              </div>
              <div className="text-gray-400 text-xs font-mono leading-relaxed">
                Skaut wpisuje lokalizacje &rarr; system zwraca{" "}
                <span className="text-brand-neon">TOP talenty w promieniu X km</span> wg AI Score.
              </div>
            </div>
            <div className="p-5 border border-brand-border bg-brand-card space-y-3">
              <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-3">System Stats &bull; LIVE</div>
              {[
                {label:"Aktywnych skanerow",val:"2,847",color:"text-brand-neon"},
                {label:"Profili wygenerowanych",val:"1.2M",color:"text-brand-cyan"},
                {label:"Raportów AI dziś",val:"48,291",color:"text-brand-gold"},
                {label:"Skautów online",val:"341",color:"text-brand-red"},
              ].map((s)=>(
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs font-mono">{s.label}</span>
                  <span className={"font-mono font-bold text-sm "+s.color}>{s.val}</span>
                </div>
              ))}
            </div>
            <div className="p-5 border border-brand-red/30 bg-brand-red/5 text-center">
              <TrendingUp size={24} className="text-brand-red mx-auto mb-3" />
              <div className="text-white font-display font-bold text-sm uppercase tracking-wide mb-2">Twój klub następny?</div>
              <p className="text-gray-400 text-xs font-mono mb-4 leading-relaxed">Program pilotażowy: 5 Orlików, 500 zawodników, 6 miesięcy.</p>
              <a href="#kontakt" className="block py-2.5 bg-brand-red text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors">
                Zgłoś klub &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
