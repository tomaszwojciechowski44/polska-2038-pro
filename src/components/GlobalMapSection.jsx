import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Globe, MapPin, Zap } from "lucide-react";
// Poland voivodeships approximate centers
const VOIVODESHIPS = [
  { name: "Mazowieckie",    x: 0.57, y: 0.38, talents: 842, clubs: 1240 },
  { name: "Malopolskie",    x: 0.55, y: 0.72, talents: 634, clubs: 890 },
  { name: "Slaskie",        x: 0.45, y: 0.68, talents: 721, clubs: 1050 },
  { name: "Wielkopolskie",  x: 0.34, y: 0.38, talents: 510, clubs: 780 },
  { name: "Dolnoslaskie",   x: 0.22, y: 0.56, talents: 488, clubs: 710 },
  { name: "Lodzkie",        x: 0.48, y: 0.48, talents: 396, clubs: 620 },
  { name: "Lubelskie",      x: 0.70, y: 0.55, talents: 312, clubs: 490 },
  { name: "Podkarpackie",   x: 0.68, y: 0.76, talents: 298, clubs: 440 },
  { name: "Pomorskie",      x: 0.38, y: 0.12, talents: 445, clubs: 680 },
  { name: "Kujawsko-Pom",   x: 0.40, y: 0.25, talents: 287, clubs: 430 },
  { name: "Zachodniopom",   x: 0.18, y: 0.15, talents: 231, clubs: 380 },
  { name: "Lubuskie",       x: 0.18, y: 0.38, talents: 178, clubs: 290 },
  { name: "Warminsko-Maz",  x: 0.62, y: 0.16, talents: 194, clubs: 320 },
  { name: "Podlaskie",      x: 0.75, y: 0.22, talents: 168, clubs: 270 },
  { name: "Swietokrzyskie", x: 0.58, y: 0.60, talents: 201, clubs: 340 },
  { name: "Opolskie",       x: 0.34, y: 0.60, talents: 156, clubs: 250 },
];
function PolandCanvas({ selectedVoiv, onSelect }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ t: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    function draw() {
      const W = canvas.width = canvas.offsetWidth * devicePixelRatio;
      const H = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.clearRect(0, 0, W, H);
      const { t } = stateRef.current;
      // Draw a simplified Poland outline with bezier curves
      ctx.save();
      ctx.strokeStyle = "#00FF8830";
      ctx.lineWidth = 1;
      // Poland bounding box approx
      const PX = W * 0.08, PY = H * 0.05, PW = W * 0.84, PH = H * 0.90;
      // Background glow
      const grad = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.4);
      grad.addColorStop(0, "rgba(0,255,136,0.04)");
      grad.addColorStop(1, "rgba(0,255,136,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      // Grid
      ctx.strokeStyle = "rgba(0,255,136,0.06)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += W/10) {
        ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += H/10) {
        ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke();
      }
      // Draw voivodeships as pulsing dots
      VOIVODESHIPS.forEach((v, i) => {
        const x = PX + v.x * PW;
        const y = PY + v.y * PH;
        const isSelected = selectedVoiv === i;
        const baseR = 4 + (v.talents / 200);
        const r = baseR * (1 + 0.12 * Math.sin(t * 1.2 + i * 0.7));
        // Connection lines to center
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(W/2, H/2);
        ctx.strokeStyle = `rgba(0,229,255,${0.02 + 0.02 * Math.sin(t + i)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        // Outer ring
        ctx.beginPath();
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "rgba(0,255,136,0.08)" : "rgba(0,229,255,0.03)";
        ctx.fill();
        // Main dot
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#00FF88" : (v.talents > 500 ? "#00FF88" : v.talents > 300 ? "#00E5FF" : "#FFD700");
        ctx.shadowColor = isSelected ? "#00FF88" : "#00E5FF";
        ctx.shadowBlur = isSelected ? 20 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Ping animation for high-talent regions
        if (v.talents > 500 || isSelected) {
          const pingR = r + (r * 1.5 * ((t * 0.8 + i) % 1));
          ctx.beginPath();
          ctx.arc(x, y, pingR, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? `rgba(0,255,136,${0.4 - 0.4*((t*0.8+i)%1)})` : `rgba(0,229,255,${0.3 - 0.3*((t*0.8+i)%1)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Label for selected
        if (isSelected) {
          ctx.fillStyle = "#fff";
          ctx.font = `bold ${Math.max(10, W*0.014)}px JetBrains Mono, monospace`;
          ctx.textAlign = "center";
          ctx.fillText(v.name, x, y - r - 8);
          ctx.fillStyle = "#00FF88";
          ctx.font = `${Math.max(9,W*0.012)}px JetBrains Mono, monospace`;
          ctx.fillText(v.talents + " talentow", x, y + r + 14);
        }
      });
      // Center point — "HQ"
      ctx.beginPath();
      ctx.arc(W/2, H/2, 4, 0, Math.PI*2);
      ctx.fillStyle = "#DC143C";
      ctx.shadowColor = "#DC143C";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff44";
      ctx.font = `${Math.max(8,W*0.010)}px JetBrains Mono, monospace`;
      ctx.textAlign = "center";
      ctx.fillText("HQ", W/2, H/2 - 8);
      stateRef.current.t += 0.02;
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [selectedVoiv]);
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    const PX = 0.08, PY = 0.05, PW = 0.84, PH = 0.90;
    let best = -1, bestDist = 0.08;
    VOIVODESHIPS.forEach((v, i) => {
      const dx = mx - (PX + v.x * PW);
      const dy = my - (PY + v.y * PH);
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best >= 0) onSelect(best === selectedVoiv ? null : best);
  };
  return (
    <canvas ref={canvasRef} className="w-full h-full cursor-pointer"
      onClick={handleClick} style={{display:"block"}} />
  );
}
const WORLD_INTEREST = [
  { country: "Niemcy", flag: "🇩🇪", status: "Obserwuje", note: "DFB zainteresowany wspolpraca tech" },
  { country: "Francja", flag: "🇫🇷", status: "Obserwuje", note: "FFF analizuje model LiDAR" },
  { country: "Japonia", flag: "🇯🇵", status: "Kontakt", note: "JFA prosilo o demo systemu" },
  { country: "USA", flag: "🇺🇸", status: "Kontakt", note: "US Soccer Foundation — rozmowy" },
  { country: "Brazylia", flag: "🇧🇷", status: "Zainteresowany", note: "CBF — baza 120K boisk" },
  { country: "Korea Pd.", flag: "🇰🇷", status: "Demo", note: "KFA wysyla delegacje Q3 2026" },
];
export default function GlobalMapSection() {
  const [ref, inView] = useInView(0.08);
  const [selectedVoiv, setSelectedVoiv] = useState(0);
  const v = VOIVODESHIPS[selectedVoiv] || VOIVODESHIPS[0];
  const totalTalents = VOIVODESHIPS.reduce((s, x) => s + x.talents, 0);
  return (
    <section id="mapa" className="py-24 bg-brand-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm tracking-widest uppercase mb-3">
            <Globe size={14} />
            TALENTRADA LIVE — POLSKA I SWIAT
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            {totalTalents.toLocaleString("pl-PL")} Talentow.{" "}
            <span className="text-brand-cyan text-glow-cyan">Zaden Nie Umknie.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Interaktywna mapa sieci LiDAR. Kliknij wojewodztwo aby zobaczyc dane.
            System dziala na calej Polsce — 24/7.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
            transition={{delay:0.2}} className="lg:col-span-2">
            <div className="relative border border-brand-cyan/20 bg-brand-dark/60 overflow-hidden" style={{height:"460px"}}>
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <MapPin size={12} className="text-brand-cyan" />
                <span className="text-brand-cyan/70 text-[10px] font-mono uppercase tracking-widest">TALENTRADA — POLSKA — LIVE</span>
                <span className="flex items-center gap-1 ml-2 text-brand-neon text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse"/>LIVE
                </span>
              </div>
              <div className="absolute top-3 right-3 text-gray-600 text-[9px] font-mono">kliknij wojewodztwo</div>
              <PolandCanvas selectedVoiv={selectedVoiv} onSelect={setSelectedVoiv} />
              {/* Legend */}
              <div className="absolute bottom-3 left-3 flex items-center gap-4">
                {[{c:"#00FF88",l:"800+ talentow"},{c:"#00E5FF",l:"300-800"},{c:"#FFD700",l:"<300"}].map((lg)=>(
                  <div key={lg.l} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{backgroundColor:lg.c,boxShadow:`0 0 4px ${lg.c}`}} />
                    <span className="text-[9px] font-mono text-gray-600">{lg.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Right panel */}
          <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}}
            transition={{delay:0.3}} className="space-y-4">
            {/* Selected voiv card */}
            <div className="p-5 border border-brand-cyan/40 bg-brand-cyan/5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={12} className="text-brand-cyan" />
                <span className="text-brand-cyan text-[10px] font-mono uppercase tracking-widest">Wybrane Wojewodztwo</span>
              </div>
              <div className="text-white font-display font-bold text-xl mb-3">{v.name}</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {l:"Talentow",val:v.talents,c:"text-brand-neon"},
                  {l:"Klubow",val:v.clubs,c:"text-brand-cyan"},
                  {l:"AI Score avg",val:"78.4",c:"text-brand-gold"},
                  {l:"Wezlow LiDAR",val:Math.round(v.clubs/3),c:"text-brand-red"},
                ].map((s)=>(
                  <div key={s.l} className="p-2 border border-brand-border bg-brand-dark/40 text-center">
                    <div className={`font-mono font-bold text-sm ${s.c}`}>{typeof s.val === "number" ? s.val.toLocaleString("pl-PL") : s.val}</div>
                    <div className="text-gray-600 text-[10px] font-mono">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Voivodeships list */}
            <div className="p-4 border border-brand-border bg-brand-card">
              <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-3">Top 5 Regionow</div>
              <div className="space-y-1.5">
                {[...VOIVODESHIPS].sort((a,b)=>b.talents-a.talents).slice(0,5).map((vo,i)=>(
                  <button key={vo.name} onClick={()=>setSelectedVoiv(VOIVODESHIPS.indexOf(vo))}
                    className={"w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-all "+(selectedVoiv===VOIVODESHIPS.indexOf(vo)?"bg-brand-neon/10 text-brand-neon border-l-2 border-brand-neon":"text-gray-500 hover:text-gray-300")}>
                    <span>{i+1}. {vo.name}</span>
                    <span className="font-bold">{vo.talents}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* World interest */}
            <div className="p-4 border border-brand-border bg-brand-card">
              <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-3">Zainteresowanie Swiatowe</div>
              <div className="space-y-2">
                {WORLD_INTEREST.slice(0,4).map((w)=>(
                  <div key={w.country} className="flex items-center gap-2">
                    <span className="text-base flex-shrink-0">{w.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-mono font-bold">{w.country}</div>
                      <div className="text-gray-600 text-[9px] font-mono truncate">{w.note}</div>
                    </div>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 border flex-shrink-0 ${w.status==="Demo"?"border-brand-neon text-brand-neon":w.status==="Kontakt"?"border-brand-cyan text-brand-cyan":"border-brand-border text-gray-600"}`}>
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
