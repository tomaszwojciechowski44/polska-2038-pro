import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { TrendingUp, Calculator, DollarSign, Users } from "lucide-react";
const SLIDER_CONFIG = [
  { id:"nodes", label:"Liczba węzłów LiDAR", min:50, max:10000, step:50, default:500, unit:"węzłów", color:"neon", icon:"📡" },
  { id:"players", label:"Zawodników w systemie", min:1000, max:1000000, step:1000, default:50000, unit:"zawodników", color:"cyan", icon:"👥" },
  { id:"years", label:"Horyzont czasowy", min:1, max:12, step:1, default:4, unit:"lat", color:"gold", icon:"📅" },
];
const COST_PER_NODE = 8000;
const ANNUAL_OPEX_PER_NODE = 1200;
const VALUE_PER_TALENT = 22000;
const TALENT_DISCOVERY_RATE = 0.0004;
function formatPLN(val) {
  if (val >= 1000000000) return (val/1000000000).toFixed(2)+" MLD PLN";
  if (val >= 1000000) return (val/1000000).toFixed(1)+" MLN PLN";
  if (val >= 1000) return (val/1000).toFixed(0)+"K PLN";
  return val.toFixed(0)+" PLN";
}
function SliderInput({ config, value, onChange }) {
  const colorMap = {
    neon: { text:"text-brand-neon", border:"border-brand-neon/30", bg:"bg-brand-neon/10" },
    cyan: { text:"text-brand-cyan", border:"border-brand-cyan/30", bg:"bg-brand-cyan/10" },
    gold: { text:"text-brand-gold", border:"border-brand-gold/30", bg:"bg-brand-gold/10" },
  };
  const c = colorMap[config.color];
  const accentColor = config.color==="neon"?"#00FF88":config.color==="cyan"?"#00E5FF":"#FFD700";
  return (
    <div className={`p-5 border ${c.border} ${c.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.icon}</span>
          <span className="font-display font-bold text-white text-sm uppercase tracking-wide">{config.label}</span>
        </div>
        <span className={`font-mono font-bold text-lg ${c.text}`}>{value.toLocaleString("pl-PL")} {config.unit}</span>
      </div>
      <input type="range" min={config.min} max={config.max} step={config.step} value={value}
        onChange={(e)=>onChange(Number(e.target.value))} className="w-full h-2 rounded cursor-pointer" style={{accentColor}} />
      <div className="flex justify-between text-gray-600 text-xs font-mono mt-1">
        <span>{config.min.toLocaleString("pl-PL")}</span>
        <span>{config.max.toLocaleString("pl-PL")}</span>
      </div>
    </div>
  );
}
export default function RoiCalculator() {
  const [ref, inView] = useInView(0.1);
  const [values, setValues] = useState({ nodes:500, players:50000, years:4 });
  const results = useMemo(() => {
    const capex = values.nodes*COST_PER_NODE;
    const opex = values.nodes*ANNUAL_OPEX_PER_NODE*values.years;
    const totalCost = capex+opex;
    const talentsFound = Math.floor(values.players*TALENT_DISCOVERY_RATE*values.years);
    const revenue = talentsFound*VALUE_PER_TALENT;
    const scoutingSavings = values.players*80*values.years;
    const totalBenefit = revenue+scoutingSavings;
    const roi = ((totalBenefit-totalCost)/totalCost)*100;
    const breakEvenMonths = Math.ceil((totalCost/totalBenefit)*values.years*12);
    return { capex, opex, totalCost, talentsFound, revenue, scoutingSavings, totalBenefit, roi, breakEvenMonths };
  }, [values]);
  const handleChange = (id, val) => setValues(prev=>({...prev, [id]:val}));
  return (
    <section id="roi" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Calculator size={14} />
            KALKULATOR INWESTYCJI
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Policz Swój{" "}<span className="text-brand-gold text-glow-gold">ROI</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Dostosuj parametry wdrożenia i zobacz prognozowany zwrot z inwestycji dla Twojego regionu lub federacji.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.2}} className="space-y-4">
            <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp size={12} />Parametry Wdrożenia
            </div>
            {SLIDER_CONFIG.map(config=>(
              <SliderInput key={config.id} config={config} value={values[config.id]} onChange={val=>handleChange(config.id,val)} />
            ))}
            <div className="p-5 border border-brand-border bg-brand-dark/80 space-y-2">
              <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Struktura Kosztów</div>
              <div className="flex justify-between text-sm font-mono">
                <span className="text-gray-400">CAPEX (węzły LiDAR)</span>
                <span className="text-white">{formatPLN(results.capex)}</span>
              </div>
              <div className="flex justify-between text-sm font-mono">
                <span className="text-gray-400">OPEX ({values.years} lat{values.years === 1 ? "" : values.years < 5 ? "a" : ""})</span>
                <span className="text-white">{formatPLN(results.opex)}</span>
              </div>
              <div className="pt-2 border-t border-brand-border flex justify-between text-sm font-mono">
                <span className="text-brand-red font-bold">RAZEM KOSZTY</span>
                <span className="text-brand-red font-bold">{formatPLN(results.totalCost)}</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3}} className="space-y-4">
            <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
              <DollarSign size={12} />Prognozowane Korzyści
            </div>
            <motion.div key={results.roi} className={`p-8 border-2 text-center ${results.roi>200?"border-brand-neon/60 bg-brand-neon/5 border-glow-neon":results.roi>0?"border-brand-gold/60 bg-brand-gold/5":"border-brand-red/60 bg-brand-red/5"}`}>
              <div className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">Projected ROI po {values.years} latach</div>
              <div className={`text-6xl font-display font-bold mb-2 ${results.roi>200?"text-brand-neon text-glow-neon":results.roi>0?"text-brand-gold":"text-brand-red"}`}>
                {results.roi>0?"+":""}{results.roi.toFixed(0)}%
              </div>
              <div className="text-gray-500 text-sm font-mono">Break-even: ~{results.breakEvenMonths} miesięcy</div>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label:"Talenty wykryte", value:results.talentsFound.toLocaleString("pl-PL"), unit:"zawodników", color:"neon", icon:<Users size={16}/> },
                { label:"Wartość z transferów", value:formatPLN(results.revenue), unit:"przychód", color:"cyan", icon:<TrendingUp size={16}/> },
                { label:"Oszczędności scouting", value:formatPLN(results.scoutingSavings), unit:"vs. tradycyjny", color:"gold", icon:<Calculator size={16}/> },
                { label:"Łączna korzyść", value:formatPLN(results.totalBenefit), unit:"total benefit", color:"red", icon:<DollarSign size={16}/> },
              ].map(m=>(
                <div key={m.label} className={`p-4 border ${m.color==="neon"?"border-brand-neon/30 bg-brand-neon/5":m.color==="cyan"?"border-brand-cyan/30 bg-brand-cyan/5":m.color==="gold"?"border-brand-gold/30 bg-brand-gold/5":"border-brand-red/30 bg-brand-red/5"}`}>
                  <div className={`flex items-center gap-1 mb-2 ${m.color==="neon"?"text-brand-neon":m.color==="cyan"?"text-brand-cyan":m.color==="gold"?"text-brand-gold":"text-brand-red"}`}>
                    {m.icon}
                    <span className="text-xs font-mono uppercase tracking-wide">{m.label}</span>
                  </div>
                  <div className={`text-xl font-display font-bold ${m.color==="neon"?"text-brand-neon":m.color==="cyan"?"text-brand-cyan":m.color==="gold"?"text-brand-gold":"text-brand-red"}`}>{m.value}</div>
                  <div className="text-gray-600 text-xs font-mono">{m.unit}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border border-brand-border bg-brand-dark/50">
              <p className="text-gray-500 text-xs font-mono leading-relaxed">
                * Model oparty na danych PZPN, UEFA analytics i własnych założeniach projektu.
                Wartość talentu = łączna oszczędność kosztów scouting + szacunkowa wartość transferowa.
                Modele AI wymagają walidacji na danych produkcyjnych.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
