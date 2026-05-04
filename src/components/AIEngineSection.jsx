import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Brain, Cpu, Activity } from "lucide-react";
// Live Neural Network canvas visualization
function NeuralCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ t: 0, pulses: [] });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const LAYERS = [
      { n: 6,  label: "INPUT",   color: "#00FF88", x: 0.10 },
      { n: 8,  label: "HIDDEN1", color: "#00E5FF", x: 0.30 },
      { n: 8,  label: "HIDDEN2", color: "#00E5FF", x: 0.50 },
      { n: 6,  label: "HIDDEN3", color: "#FFD700", x: 0.70 },
      { n: 3,  label: "OUTPUT",  color: "#DC143C", x: 0.90 },
    ];
    const INPUT_LABELS  = ["Sprint 0-10m","Reakcja","Balans","Eksplozyw.","Technika","Historia"];
    const OUTPUT_LABELS = ["ELITE","PROSPECT","MONITOR"];
    function getNodes(W, H) {
      return LAYERS.map((l) => {
        const gap = H / (l.n + 1);
        return Array.from({ length: l.n }, (_, i) => ({
          x: l.x * W, y: gap * (i + 1),
          color: l.color, layerIdx: LAYERS.indexOf(l), nodeIdx: i,
        }));
      });
    }
    function draw() {
      const W = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      const H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(1, 1);
      ctx.clearRect(0, 0, W, H);
      const nodes = getNodes(W, H);
      const { t, pulses } = stateRef.current;
      // Draw connections
      for (let li = 0; li < nodes.length - 1; li++) {
        for (const a of nodes[li]) {
          for (const b of nodes[li + 1]) {
            const alpha = 0.04 + 0.04 * Math.sin(t * 0.7 + a.nodeIdx + b.nodeIdx);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      // Draw pulses (traveling dots on connections)
      const alivePulses = [];
      for (const p of pulses) {
        p.progress += 0.018;
        if (p.progress > 1) continue;
        alivePulses.push(p);
        const a = nodes[p.fromLayer][p.fromNode % nodes[p.fromLayer].length];
        const b = nodes[p.toLayer][p.toNode % nodes[p.toLayer].length];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      stateRef.current.pulses = alivePulses;
      // Spawn new pulses
      if (Math.random() < 0.12) {
        const li = Math.floor(Math.random() * (nodes.length - 1));
        const fn = Math.floor(Math.random() * nodes[li].length);
        const tn = Math.floor(Math.random() * nodes[li + 1].length);
        stateRef.current.pulses.push({
          fromLayer: li, toLayer: li + 1,
          fromNode: fn, toNode: tn,
          progress: 0, color: LAYERS[li].color,
        });
      }
      // Draw nodes
      for (const layer of nodes) {
        for (const n of layer) {
          const pulse = 1 + 0.15 * Math.sin(t * 1.5 + n.nodeIdx * 0.8 + n.layerIdx);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 7 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = n.color + "33";
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
          // glow
          ctx.beginPath();
          ctx.arc(n.x, n.y, 12 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = n.color + "11";
          ctx.fill();
        }
      }
      // Input labels
      const fs = Math.max(9, W * 0.012);
      ctx.font = `${fs}px JetBrains Mono, monospace`;
      ctx.fillStyle = "#00FF8899";
      ctx.textAlign = "right";
      nodes[0].forEach((n, i) => {
        ctx.fillText(INPUT_LABELS[i] || "", n.x - 14, n.y + 4);
      });
      // Output labels
      ctx.textAlign = "left";
      nodes[nodes.length - 1].forEach((n, i) => {
        const colors = ["#00FF88","#00E5FF","#FFD700"];
        ctx.fillStyle = colors[i] || "#fff";
        ctx.fillText(OUTPUT_LABELS[i] || "", n.x + 14, n.y + 4);
      });
      // Layer labels
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff22";
      const labelFs = Math.max(8, W * 0.009);
      ctx.font = `${labelFs}px JetBrains Mono, monospace`;
      LAYERS.forEach((l) => {
        ctx.fillText(l.label, l.x * W, H - 8);
      });
      stateRef.current.t += 0.025;
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
const AI_FEATURES = [
  { icon: "🧬", label: "EnsembleScorer v3", desc: "RandomForest + XGBoost + MLP Neural Net. Głosowanie większościowe eliminuje bias pojedynczego modelu. 94% accuracy.", color: "text-brand-neon" },
  { icon: "🗺️", label: "TalentRadar PostGIS", desc: "ST_DWithin geospatial query. Skaut wpisuje lokalizacje — system zwraca TOP talenty w promieniu 50km w <200ms.", color: "text-brand-cyan" },
  { icon: "🔍", label: "AnomalyDetector", desc: "IsolationForest flaguje dane niemożliwe (12-latek, sprint Usaina Bolta). Zero false positives w bazie produkcyjnej.", color: "text-brand-gold" },
  { icon: "📝", label: "LLM NarrativeEngine", desc: "GPT-4o generuje czytelny raport: 'Jan K., 14 lat — najszybszy start w regionie. Rekomendacja: kontakt z akademia.'", color: "text-brand-red" },
  { icon: "🔄", label: "Federated Learning", desc: "Model trenuje się na danych bez ich centralizacji. Każdy klub zachowuje privacy — innowacja bez precedensu w sporcie.", color: "text-brand-neon" },
  { icon: "⚡", label: "Real-Time Scoring", desc: "Celery worker oblicza AI Score w tle — wynik dostarczany skautowi przez WebSocket w <2 sekundy od skanu.", color: "text-brand-cyan" },
];
export default function AIEngineSection() {
  const [ref, inView] = useInView(0.08);
  const [activeFeature, setActiveFeature] = useState(0);
  return (
    <section id="ai-engine" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Brain size={14} />
            AI INTELLIGENCE ENGINE — LIVE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Sieć Neuronowa{" "}
            <span className="text-brand-gold text-glow-gold">Która Nie Śpi.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Podgląd na żywo propagacji sygnału przez model EnsembleScorer v3.
            Każda kulka to dane biomechaniczne zawodnika przemieszczające się przez warstwy AI.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Neural network canvas - 3 cols */}
          <motion.div initial={{opacity:0,scale:0.95}} animate={inView?{opacity:1,scale:1}:{}}
            transition={{delay:0.2, duration:0.8}}
            className="lg:col-span-3 relative border border-brand-gold/20 bg-brand-dark/80 overflow-hidden"
            style={{height: "420px"}}>
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <Activity size={12} className="text-brand-gold" />
              <span className="text-brand-gold/70 text-[10px] font-mono uppercase tracking-widest">ENSEMBLESCORER v3 — LIVE PROPAGATION</span>
              <span className="flex items-center gap-1 ml-2 text-brand-neon text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse"/>ACTIVE
              </span>
            </div>
            <NeuralCanvas />
            {/* HUD bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-brand-dark/80 to-transparent flex justify-between">
              {[{l:"Parametry",v:"847K"},{l:"Warstwy",v:"5"},{l:"Accuracy",v:"94%"},{l:"Latencja",v:"<2s"}].map((s)=>(
                <div key={s.l} className="text-center">
                  <div className="text-brand-gold font-mono font-bold text-sm">{s.v}</div>
                  <div className="text-gray-600 text-[9px] font-mono">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Feature list - 2 cols */}
          <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}}
            transition={{delay:0.3}} className="lg:col-span-2 space-y-2">
            <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-4">
              // moduly_ai.json
            </div>
            {AI_FEATURES.map((f, i) => (
              <motion.button key={f.label} onClick={() => setActiveFeature(i)}
                initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}}
                transition={{delay:0.3+i*0.07}}
                className={"w-full text-left p-4 border transition-all duration-200 "+(activeFeature===i?"border-brand-gold/60 bg-brand-gold/5":"border-brand-border bg-brand-card hover:border-brand-border/80")}>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className={`font-mono font-bold text-xs uppercase tracking-wide ${activeFeature===i?f.color:"text-gray-300"}`}>{f.label}</div>
                    {activeFeature===i && (
                      <motion.p initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}}
                        className="text-gray-400 text-xs font-mono mt-1.5 leading-relaxed">
                        {f.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
