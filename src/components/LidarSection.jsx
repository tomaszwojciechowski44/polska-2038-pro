import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Shield, ChevronDown, Zap, Activity } from "lucide-react";
import { LIDAR_LEVELS } from "../data/systemData";
function LidarRadar() {
  const players = [
    { angle: 25, dist: 68, score: 94 }, { angle: 75, dist: 52, score: 87 },
    { angle: 130, dist: 72, score: 91 }, { angle: 195, dist: 58, score: 78 },
    { angle: 255, dist: 68, score: 85 }, { angle: 305, dist: 48, score: 72 },
    { angle: 345, dist: 62, score: 96 }, { angle: 165, dist: 44, score: 83 },
  ];
  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto select-none">
      {[1,2,3,4].map((i) => (
        <motion.div key={i} className="absolute rounded-full border border-brand-neon/15"
          style={{ inset: `${i*10}%` }} animate={{ opacity: [0.15,0.5,0.15] }}
          transition={{ duration:3, delay:i*0.5, repeat:Infinity }} />
      ))}
      <motion.div className="absolute inset-0" style={{borderRadius:"50%",overflow:"hidden"}}
        animate={{rotate:360}} transition={{duration:4,repeat:Infinity,ease:"linear"}}>
        <div className="absolute top-0 left-0 w-full h-full"
          style={{background:"conic-gradient(from 0deg, transparent 0deg, rgba(0,255,136,0.18) 40deg, transparent 40deg)"}} />
      </motion.div>
      <motion.div className="absolute top-1/2 left-1/2 origin-left"
        style={{width:"46%",height:"2px",marginTop:"-1px"}}
        animate={{rotate:360}} transition={{duration:4,repeat:Infinity,ease:"linear"}}>
        <div className="w-full h-full bg-gradient-to-r from-brand-neon to-transparent" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div className="w-5 h-5 bg-brand-neon rounded-full"
          animate={{boxShadow:["0 0 8px #00FF88","0 0 24px #00FF88","0 0 8px #00FF88"]}}
          transition={{duration:2,repeat:Infinity}} />
      </div>
      {players.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = 50 + (p.dist/2) * Math.cos(rad);
        const y = 50 + (p.dist/2) * Math.sin(rad);
        const color = p.score >= 90 ? "#00FF88" : p.score >= 80 ? "#00E5FF" : "#FFD700";
        return (
          <motion.div key={i} className="absolute z-10" style={{left:`${x}%`,top:`${y}%`}}
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5+i*0.15}}>
            <motion.div className="w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{backgroundColor:color,boxShadow:`0 0 6px ${color}`}}
              animate={{scale:[1,1.4,1]}} transition={{duration:2,delay:i*0.3,repeat:Infinity}} />
          </motion.div>
        );
      })}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-brand-neon/50 text-[9px] font-mono">LIVE</div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-brand-cyan/50 text-[9px] font-mono">22 zawodników</div>
    </div>
  );
}
function BiomechanicsPanel({ inView }) {
  const metrics = [
    {label:"Start 0-10m",val:94},{label:"Czas reakcji",val:87},
    {label:"Eksplozywność",val:96},{label:"Balans osi",val:78},{label:"Długość kroku",val:91},
  ];
  return (
    <div className="p-5 border border-brand-cyan/30 bg-brand-cyan/5 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-brand-cyan" />
          <span className="text-brand-cyan text-xs font-mono uppercase tracking-widest">Biomechanika live</span>
        </div>
        <span className="flex items-center gap-1 text-brand-neon text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />LIVE
        </span>
      </div>
      {metrics.map((m,i) => (
        <div key={m.label}>
          <div className="flex justify-between mb-1">
            <span className="text-gray-400 text-xs font-mono">{m.label}</span>
            <span className="text-brand-cyan font-mono text-xs font-bold">{m.val} centyl</span>
          </div>
          <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full bg-brand-cyan" initial={{width:0}}
              animate={inView ? {width:`${m.val}%`} : {}} transition={{duration:1,delay:i*0.12}} />
          </div>
        </div>
      ))}
      <div className="pt-2 border-t border-brand-border text-gray-600 text-[10px] font-mono">
        Dokładność: 1mm | latencja: &lt;50ms | zero wideo
      </div>
    </div>
  );
}
function LidarNode({ level, index, active, onClick }) {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{delay:index*0.15}} onClick={onClick}
      className={`relative cursor-pointer p-5 border transition-all duration-300 ${
        active ? "border-brand-neon bg-brand-neon/5 border-glow-neon" : "border-brand-border bg-brand-card hover:border-brand-neon/40"
      }`}>
      <div className={`absolute top-2 right-3 text-[10px] font-mono ${active ? "text-brand-neon" : "text-gray-700"}`}>
        POZIOM {index + 1}
      </div>
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 flex items-center justify-center text-xl rounded border flex-shrink-0 ${
          active ? "border-brand-neon/50 bg-brand-neon/10" : "border-brand-border"
        }`}>{level.icon}</div>
        <div className="flex-1 min-w-0">
          <div className={`font-display font-bold text-base mb-0.5 ${active ? "text-brand-neon" : "text-white"}`}>{level.title}</div>
          <div className="text-gray-400 text-sm leading-relaxed">{level.desc}</div>
        </div>
        <ChevronDown size={16} className={`flex-shrink-0 mt-1 transition-transform ${active ? "rotate-180 text-brand-neon" : "text-gray-600"}`} />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}}
            exit={{opacity:0,height:0}} className="mt-4 pt-4 border-t border-brand-neon/20">
            <p className="text-brand-cyan text-sm font-mono leading-relaxed">{level.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export default function LidarSection() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [ref, inView] = useInView(0.08);
  const FLOW = [
    { num:"01", title:"Zbieranie Danych", colorClass:"text-brand-neon", borderClass:"border-brand-neon/30 bg-brand-neon/5",
      desc:"Smartfon rodzica lub wezel na maszcie Orlika. Biomechanika w milisekundach. Zero wideo.", delay:0.2 },
    { num:"02", title:"Algorytmiczny Filtr", colorClass:"text-brand-gold", borderClass:"border-brand-gold/30 bg-brand-gold/5",
      desc:"AI odcina błąd ludzki. Trener dostaje obiektywny profil — nie da się sfałszować na oko.", delay:0.3 },
    { num:"03", title:"Skalowanie i ROI", colorClass:"text-brand-cyan", borderClass:"border-brand-cyan/30 bg-brand-cyan/5",
      desc:"5M talentów w RT. Realizacja wyceny 1,1 MLD PLN przez eliminację pustych przebiegów skautów.", delay:0.4 },
  ];
  return (
    <section id="lidar" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView ? {opacity:1,y:0} : {}} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-brand-neon font-mono text-sm tracking-widest uppercase mb-3">
            <Shield size={14} />
            CASE STUDY: INFRASTRUKTURA W KAŻDEJ KIESZENI
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            LiDAR: <span className="text-brand-neon text-glow-neon">Dane, nie opinia.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Tradycyjny scouting opiera się na subiektywnym oku trenera i drogich, stacjonarnych systemach.
            Zbudowaliśmy rozproszoną sieć czujników LiDAR — narodową mapę talentów.
          </p>
        </motion.div>
        <div className="mb-14">
          <div className="text-center text-gray-600 text-xs font-mono uppercase tracking-widest mb-5">// pipeline_flow.json</div>
          <div className="flex flex-col sm:flex-row gap-3">
            {FLOW.map((step) => (
              <motion.div key={step.num} initial={{opacity:0,y:24}} animate={inView ? {opacity:1,y:0} : {}}
                transition={{delay:step.delay,duration:0.5}}
                className={`relative flex-1 p-5 border ${step.borderClass} text-center`}>
                <div className={`w-8 h-8 rounded-full border ${step.borderClass} flex items-center justify-center mx-auto mb-3 text-sm font-mono font-bold ${step.colorClass}`}>
                  {step.num}
                </div>
                <div className={`font-display font-bold text-sm uppercase tracking-wide mb-2 ${step.colorClass}`}>{step.title}</div>
                <p className="text-gray-400 text-xs font-mono leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{opacity:0,x:-24}} animate={inView ? {opacity:1,x:0} : {}}
            transition={{delay:0.25,duration:0.7}} className="space-y-5">
            <div className="relative p-6 border border-brand-neon/20 bg-brand-dark/60">
              <div className="flex items-center justify-between mb-4 text-xs font-mono">
                <span className="text-brand-neon/70">LIDAR SCAN | Orlik Rzeszów-Południe • 50.0°N 22.0°E</span>
                <span className="flex items-center gap-1 text-brand-neon">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />LIVE
                </span>
              </div>
              <LidarRadar />
              <div className="grid grid-cols-3 gap-2 mt-5">
                {[{val:"<50ms",label:"Latencja"},{val:"1mm",label:"Dokładność"},{val:"0%",label:"Wideo"}].map((s) => (
                  <div key={s.label} className="p-2 border border-brand-border bg-brand-dark/40 text-center">
                    <div className="text-brand-neon font-mono font-bold text-sm">{s.val}</div>
                    <div className="text-gray-600 text-[10px] font-mono mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <motion.div animate={{y:[0,-4,0]}} transition={{duration:3,repeat:Infinity}}
                className="absolute -top-3 -right-3 px-3 py-1.5 bg-brand-card border border-brand-gold/50 text-brand-gold text-[10px] font-mono leading-snug">
                RODO-Compliant<br /><span className="text-gray-500">Zero wideo</span>
              </motion.div>
            </div>
            <BiomechanicsPanel inView={inView} />
          </motion.div>
          <motion.div initial={{opacity:0,x:24}} animate={inView ? {opacity:1,x:0} : {}}
            transition={{delay:0.3,duration:0.7}} className="space-y-3">
            <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">
              // lidar_levels - kliknij aby rozwinac
            </div>
            {LIDAR_LEVELS.map((level,i) => (
              <LidarNode key={level.id} level={level} index={i}
                active={activeLevel === i}
                onClick={() => setActiveLevel(activeLevel === i ? null : i)} />
            ))}
            <motion.div initial={{opacity:0,y:16}} animate={inView ? {opacity:1,y:0} : {}}
              transition={{delay:0.7}} className="p-5 border border-brand-gold/30 bg-brand-gold/5">
              <div className="flex items-center gap-3 mb-3">
                <Zap size={18} className="text-brand-gold flex-shrink-0" />
                <div className="font-display font-bold text-brand-gold uppercase tracking-wide text-sm">
                  Algorytmiczny Filtr - Eliminacja Subiektywizmu
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-mono">
                Dane z obu poziomów trafiają do chmury #Polska2038, gdzie{" "}
                <strong className="text-white">AI odcina błąd ludzki</strong>.
                Trener dostaje obiektywny profil zawodnika, którego{" "}
                <span className="text-brand-gold">nie da się sfałszować na oko</span>.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  {label:"Accuracy AI",val:"94%",color:"text-brand-neon"},
                  {label:"Czas scoringu",val:"<2s",color:"text-brand-cyan"},
                  {label:"Profili w bazie",val:"100K+",color:"text-brand-gold"},
                  {label:"Eliminacja nepotyzmu",val:"100%",color:"text-brand-red"},
                ].map((m) => (
                  <div key={m.label} className="p-2 border border-brand-border bg-brand-dark/40 text-center">
                    <div className={`font-mono font-bold text-sm ${m.color}`}>{m.val}</div>
                    <div className="text-gray-600 text-[10px] font-mono mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
