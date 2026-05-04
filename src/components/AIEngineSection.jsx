import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useCountUp";
import { Brain, Activity, Zap, CheckCircle } from "lucide-react";

// ─── Canvas: renders ONLY connections + nodes (no text labels) ──────────────
function NeuralCanvas({ layerXRatios }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const stateRef  = useRef({ t: 0, pulses: [] });

  const LAYER_COLORS = ["#00FF88", "#00E5FF", "#00E5FF", "#FFD700", "#DC143C"];
  const LAYER_N      = [6, 8, 8, 6, 3];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function getNodes(W, H) {
      return layerXRatios.map((xr, li) => {
        const n   = LAYER_N[li];
        const gap = H / (n + 1);
        return Array.from({ length: n }, (_, i) => ({
          x: xr * W, y: gap * (i + 1),
          color: LAYER_COLORS[li], layerIdx: li, nodeIdx: i,
        }));
      });
    }

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.offsetWidth;
      const H   = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const nodes = getNodes(W, H);
      const { t, pulses } = stateRef.current;

      // Connections
      for (let li = 0; li < nodes.length - 1; li++) {
        for (const a of nodes[li]) {
          for (const b of nodes[li + 1]) {
            const alpha = 0.04 + 0.05 * Math.sin(t * 0.7 + a.nodeIdx + b.nodeIdx);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Animate pulses
      const alive = [];
      for (const p of pulses) {
        p.progress += 0.016;
        if (p.progress > 1) continue;
        alive.push(p);
        const a  = nodes[p.fl][p.fn % nodes[p.fl].length];
        const b  = nodes[p.tl][p.tn % nodes[p.tl].length];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      stateRef.current.pulses = alive;
      if (Math.random() < 0.13) {
        const li = Math.floor(Math.random() * (nodes.length - 1));
        stateRef.current.pulses.push({
          fl: li, tl: li + 1,
          fn: Math.floor(Math.random() * nodes[li].length),
          tn: Math.floor(Math.random() * nodes[li + 1].length),
          progress: 0, color: LAYER_COLORS[li],
        });
      }

      // Nodes
      for (const layer of nodes) {
        for (const n of layer) {
          const pulse = 1 + 0.14 * Math.sin(t * 1.5 + n.nodeIdx * 0.8 + n.layerIdx);
          // Outer glow
          ctx.beginPath();
          ctx.arc(n.x, n.y, 14 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = n.color + "0D";
          ctx.fill();
          // Fill
          ctx.beginPath();
          ctx.arc(n.x, n.y, 7 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = n.color + "33";
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      stateRef.current.t += 0.025;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [layerXRatios]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-hidden="true"
    />
  );
}

// ─── HTML label column aligned to canvas rows ──────────────────────────────
const INPUT_LABELS = [
  { text: "Sprint 0–10m", color: "#00FF88" },
  { text: "Reakcja",      color: "#00FF88" },
  { text: "Balans",       color: "#00FF88" },
  { text: "Eksplozywność",color: "#00FF88" },
  { text: "Technika",     color: "#00FF88" },
  { text: "Historia",     color: "#00FF88" },
];
const OUTPUT_LABELS = [
  { text: "ELITE",    color: "#00FF88", bg: "bg-brand-neon/10 border-brand-neon/40" },
  { text: "PROSPECT", color: "#00E5FF", bg: "bg-brand-cyan/10 border-brand-cyan/40" },
  { text: "MONITOR",  color: "#FFD700", bg: "bg-brand-gold/10 border-brand-gold/40" },
];

const AI_FEATURES = [
  {
    icon: "🧬", label: "EnsembleScorer v3",
    desc: "RandomForest + XGBoost + MLP Neural Net. Głosowanie większościowe eliminuje bias pojedynczego modelu. Skuteczność: 94%.",
    color: "text-brand-neon", border: "border-brand-neon/40",
  },
  {
    icon: "🗺️", label: "TalentRadar PostGIS",
    desc: "Geospatial query ST_DWithin. Skaut wpisuje lokalizację — system zwraca TOP talenty w promieniu 50 km w czasie <200 ms.",
    color: "text-brand-cyan", border: "border-brand-cyan/40",
  },
  {
    icon: "🔍", label: "AnomalyDetector",
    desc: "IsolationForest flaguje dane niemożliwe fizycznie (np. 12-latek z wynikami Usaina Bolta). Zero fałszywych wyników w produkcji.",
    color: "text-brand-gold", border: "border-brand-gold/40",
  },
  {
    icon: "📝", label: "LLM NarrativeEngine",
    desc: "GPT-4o generuje czytelny raport skautingowy w języku polskim. \"Jan K., 14 lat — najszybszy start w regionie. Rekomendacja: kontakt z akademią.\"",
    color: "text-brand-red", border: "border-brand-red/40",
  },
  {
    icon: "🔄", label: "Federated Learning",
    desc: "Model trenuje się lokalnie — dane zawodnika nigdy nie opuszczają Orlika. Każdy klub zachowuje pełne privacy i własność danych.",
    color: "text-brand-neon", border: "border-brand-neon/40",
  },
  {
    icon: "⚡", label: "Real-Time Scoring",
    desc: "Worker Celery oblicza AI Score w tle. Wynik trafia do skauta przez WebSocket w czasie <2 s od wykonania skanu LiDAR.",
    color: "text-brand-cyan", border: "border-brand-cyan/40",
  },
];

// x ratios for canvas — only the network area (no labels inside canvas)
const LAYER_X = [0.12, 0.31, 0.50, 0.69, 0.88];

export default function AIEngineSection() {
  const [ref, inView] = useInView(0.08);
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="ai-engine" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-brand-gold font-mono text-sm tracking-widest uppercase mb-3">
            <Brain size={14} />
            AI Intelligence Engine — Live
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

          {/* ── Neural network panel ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-3 border border-brand-gold/25 bg-[#0a0f0a] rounded-sm overflow-hidden flex flex-col"
          >
            {/* Panel header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-brand-gold/15 bg-brand-gold/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-brand-gold" />
                <span className="text-brand-gold font-mono text-[10px] uppercase tracking-widest">
                  EnsembleScorer v3 — Live Propagation
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                <span className="text-brand-neon font-mono text-[10px] uppercase">Active</span>
              </div>
            </div>

            {/* Canvas area with HTML labels on both sides */}
            <div className="flex flex-1 min-h-0" style={{ height: "340px" }}>

              {/* INPUT labels — HTML, always crisp, never clipped */}
              <div className="flex flex-col justify-around py-3 px-3 w-[120px] sm:w-[136px] flex-shrink-0">
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1">Input</p>
                {INPUT_LABELS.map((l) => (
                  <div key={l.text} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: l.color }} />
                    <span className="text-[10px] sm:text-[11px] font-mono leading-tight" style={{ color: l.color }}>
                      {l.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Canvas — pure animation, no text */}
              <div className="flex-1 min-w-0 relative">
                <NeuralCanvas layerXRatios={LAYER_X} />
              </div>

              {/* OUTPUT labels — HTML, always crisp */}
              <div className="flex flex-col justify-around py-3 px-3 w-[90px] sm:w-[100px] flex-shrink-0">
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1">Output</p>
                {OUTPUT_LABELS.map((l) => (
                  <div
                    key={l.text}
                    className={`px-2 py-1 border rounded-sm text-center ${l.bg}`}
                  >
                    <span
                      className="text-[10px] sm:text-xs font-mono font-bold"
                      style={{ color: l.color }}
                    >
                      {l.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats bar — OUTSIDE canvas, no overlap */}
            <div className="border-t border-brand-gold/15 bg-brand-dark/60 px-4 py-3 flex-shrink-0">
              <div className="grid grid-cols-4 divide-x divide-brand-gold/15">
                {[
                  { v: "847 K",  l: "Parametry" },
                  { v: "5",      l: "Warstwy" },
                  { v: "94%",    l: "Accuracy" },
                  { v: "<2 s",   l: "Latencja" },
                ].map((s) => (
                  <div key={s.l} className="text-center px-2">
                    <div className="text-brand-gold font-mono font-bold text-sm sm:text-base">{s.v}</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wide mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Module list ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-2"
          >
            <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-1">
              // moduly_ai.json
            </div>

            {AI_FEATURES.map((f, i) => (
              <motion.button
                key={f.label}
                onClick={() => setActiveFeature(i)}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={[
                  "w-full text-left px-4 py-3 border transition-all duration-200 rounded-sm",
                  activeFeature === i
                    ? `${f.border} bg-brand-dark/80`
                    : "border-brand-border bg-brand-card hover:border-white/20",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold text-xs uppercase tracking-wide ${
                          activeFeature === i ? f.color : "text-gray-300"
                        }`}
                      >
                        {f.label}
                      </span>
                      {activeFeature === i && (
                        <CheckCircle size={11} className={f.color} />
                      )}
                    </div>
                    {activeFeature === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-gray-400 text-xs font-mono mt-1.5 leading-relaxed"
                      >
                        {f.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Accuracy badge */}
            <div className="mt-2 border border-brand-neon/20 bg-brand-neon/5 px-4 py-3 rounded-sm">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={12} className="text-brand-neon" />
                <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest">
                  Benchmark niezależny
                </span>
              </div>
              <p className="text-gray-400 text-xs font-mono leading-relaxed">
                Walidacja krzyżowa 5-fold na zbiorze{" "}
                <span className="text-white">12 400 zawodników</span> z 6 województw.
                Precision: <span className="text-brand-neon font-bold">0.94</span> ·
                Recall: <span className="text-brand-neon font-bold">0.91</span> ·
                F1: <span className="text-brand-neon font-bold">0.925</span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
