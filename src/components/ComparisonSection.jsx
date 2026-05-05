import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { AlertTriangle, TrendingUp } from "lucide-react";
// Comparison data: Poland vs top nations
const NATIONS = [
  { flag: "🇩🇪", name: "Niemcy", scouting: 95, digital: 88, orlik: "74K boisk", ai: true,  budget: "280M EUR", rank: 1 },
  { flag: "🇫🇷", name: "Francja", scouting: 92, digital: 85, orlik: "52K boisk", ai: true,  budget: "210M EUR", rank: 2 },
  { flag: "🇪🇸", name: "Hiszpania", scouting: 90, digital: 80, orlik: "68K boisk", ai: true,  budget: "190M EUR", rank: 3 },
  { flag: "🇵🇱", name: "Polska", scouting: 22, digital: 18, orlik: "10K boisk", ai: false, budget: "12M EUR", rank: 4, isUs: true },
  { flag: "🇧🇷", name: "Brazylia", scouting: 88, digital: 72, orlik: "120K boisk", ai: true,  budget: "160M EUR", rank: 5 },
];
const METRICS = [
  { key: "scouting", label: "Infrastruktura scoutingu", suffix: "%" },
  { key: "digital", label: "Cyfryzacja danych", suffix: "%" },
  { key: "budget", label: "Budźet roczny", suffix: "" },
];
// What we lose each year without the system
const LOSSES = [
  { icon: "🧒", val: "~2,400", label: "talentów traci Polska rocznie", desc: "dzieci z małych miast bez dostępu do skauta" },
  { icon: "💸", val: "480M PLN", label: "wartoŚci transferowej / rok", desc: "potencjalnych transferów, które nie dojdą do skutku" },
  { icon: "🏆", val: "0", label: "mistrzostw Świata od 1982", desc: "wynik braku systemu, nie braku talentów" },
  { icon: "📉", val: "62.", label: "miejsce w rankingu FIFA", desc: "mimo 38M mieszkaŃców i 10K boisk Orlik" },
];
export default function ComparisonSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="porownanie" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-brand-red font-mono text-sm tracking-widest uppercase mb-3">
            <AlertTriangle size={14} />
            DIAGNOZA: POLSKA VS ŚWIAT
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Niemcy mają system od{" "}
            <span className="text-brand-red text-glow-red">2014.</span>
            <br className="hidden sm:block" />
            My mamy{" "}
            <span className="text-brand-neon text-glow-neon">#Polska2038.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Kaźdy kraj z Top 10 rankingu FIFA ma narodowy system skautingu cyfrowego.
            Polska jest jedynym wyjątkiem w tej grupie. Do teraz.
          </p>
        </motion.div>
        {/* Comparison table */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.15}}
          className="mb-14 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left py-3 px-4 text-gray-600 text-xs font-mono uppercase tracking-widest">Kraj</th>
                {METRICS.map((m) => (
                  <th key={m.key} className="text-left py-3 px-4 text-gray-600 text-xs font-mono uppercase tracking-widest">{m.label}</th>
                ))}
                <th className="text-left py-3 px-4 text-gray-600 text-xs font-mono uppercase tracking-widest">AI Scouting</th>
              </tr>
            </thead>
            <tbody>
              {NATIONS.map((n, i) => (
                <motion.tr key={n.name} initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{delay:0.2+i*0.08}}
                  className={`border-b transition-colors ${
                    n.isUs
                      ? "border-brand-red/40 bg-brand-red/5 hover:bg-brand-red/10"
                      : "border-brand-border/40 hover:bg-brand-card"
                  }`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{n.flag}</span>
                      <div>
                        <div className={`font-display font-bold text-sm ${n.isUs?"text-brand-red":"text-white"}`}>
                          {n.name} {n.isUs && <span className="text-brand-red text-[10px] ml-1">← MY</span>}
                        </div>
                        <div className="text-gray-600 text-[10px] font-mono">{n.orlik}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-brand-border rounded-full overflow-hidden min-w-[80px]">
                        <motion.div
                          className={`h-full rounded-full ${n.isUs?"bg-brand-red":"bg-brand-neon"}`}
                          initial={{width:0}}
                          animate={inView?{width:`${n.scouting}%`}:{}}
                          transition={{duration:1,delay:0.3+i*0.08}}
                        />
                      </div>
                      <span className={`text-xs font-mono font-bold w-8 ${n.isUs?"text-brand-red":"text-brand-neon"}`}>{n.scouting}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-brand-border rounded-full overflow-hidden min-w-[80px]">
                        <motion.div
                          className={`h-full rounded-full ${n.isUs?"bg-brand-red":"bg-brand-cyan"}`}
                          initial={{width:0}}
                          animate={inView?{width:`${n.digital}%`}:{}}
                          transition={{duration:1,delay:0.35+i*0.08}}
                        />
                      </div>
                      <span className={`text-xs font-mono font-bold w-8 ${n.isUs?"text-brand-red":"text-brand-cyan"}`}>{n.digital}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-mono font-bold ${n.isUs?"text-brand-red":"text-brand-gold"}`}>{n.budget}</span>
                  </td>
                  <td className="py-4 px-4">
                    {n.ai
                      ? <span className="flex items-center gap-1.5 text-brand-neon text-xs font-mono"><span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />TAK</span>
                      : <span className="flex items-center gap-1.5 text-brand-red text-xs font-mono font-bold"><span className="w-1.5 h-1.5 rounded-full bg-brand-red" />NIE — jeszcze</span>
                    }
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        {/* Cost of inaction */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.4}}>
          <div className="text-center text-gray-500 text-xs font-mono uppercase tracking-widest mb-6">
            // koszt_bezczynnoŚci.json — co tracimy KAŻDY DZIEŃ bez systemu
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {LOSSES.map((l, i) => (
              <motion.div key={l.label} initial={{opacity:0,scale:0.9}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{delay:0.5+i*0.1}}
                className="p-5 border border-brand-red/30 bg-brand-red/5 text-center">
                <div className="text-3xl mb-2">{l.icon}</div>
                <div className="text-2xl font-display font-bold text-brand-red mb-1">{l.val}</div>
                <div className="text-white text-xs font-mono font-bold mb-1">{l.label}</div>
                <div className="text-gray-500 text-[10px] font-mono leading-snug">{l.desc}</div>
              </motion.div>
            ))}
          </div>
          {/* Bottom CTA banner */}
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.8}}
            className="mt-8 p-6 border border-brand-neon/30 bg-brand-neon/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-brand-neon font-display font-bold text-lg uppercase tracking-wide">
                Kaźdy dzieŃ zwłoki = utracony talent.
              </div>
              <div className="text-gray-400 text-sm font-mono mt-1">
                Euro 2028 i MŚ 2030 są za 2-4 lata. Czas wdroźenia: 6 miesięcy.
              </div>
            </div>
            <Link to="/kontakt"
              className="flex-shrink-0 px-6 py-3 bg-brand-neon text-brand-dark font-display font-bold text-sm uppercase tracking-widest hover:bg-green-400 transition-colors">
              Zaczynamy teraz &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
