"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Activity, Cpu, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { Athlete } from "@/lib/mockData";

interface ScannerProps {
  athlete: Athlete;
}

export default function BiomechanicalScanner({ athlete }: ScannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(0.5); // 0.5x default slow-mo
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showVectorForce, setShowVectorForce] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  // Running animation loop variables
  const frameRef = useRef<number>(0);
  const animationTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw background telemetry lines
      ctx.strokeStyle = "rgba(197, 168, 128, 0.08)";
      ctx.lineWidth = 1;
      
      // Grid
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw running platform line
      ctx.strokeStyle = "rgba(74, 82, 96, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, h - 80);
      ctx.lineTo(w - 30, h - 80);
      ctx.stroke();

      // Cycle calculation
      if (isPlaying) {
        animationTimeRef.current += speed * 0.05;
      }
      const t = animationTimeRef.current;

      // Center running coordinate
      const cx = w / 2;
      const cy = h / 2 - 20;

      // Generate elliptical coordinates for joints to simulate running cycle
      // Hip moves slightly up and down
      const hipX = cx;
      const hipY = cy + Math.sin(t * 2) * 5;

      // Torso leans forward slightly
      const shoulderX = cx + 8;
      const shoulderY = cy - 65 + Math.sin(t * 2) * 3;

      const headX = shoulderX + 4;
      const headY = shoulderY - 25;

      // Front Leg (Leg A)
      // Thigh swing
      const hipAngleA = Math.sin(t) * 0.6 + 0.3; // Swing forward & backward
      const kneeAngleA = Math.sin(t - 1.2) * 0.7 + 0.9; // Knee bend lag

      const kneeXA = hipX + Math.sin(hipAngleA) * 55;
      const kneeYA = hipY + Math.cos(hipAngleA) * 55;

      const ankleXA = kneeXA + Math.sin(hipAngleA - kneeAngleA) * 50;
      const ankleYA = kneeYA + Math.cos(hipAngleA - kneeAngleA) * 50;

      const footXA = ankleXA + 14;
      const footYA = ankleYA + 4;

      // Back Leg (Leg B) - Offset by Math.PI
      const hipAngleB = Math.sin(t + Math.PI) * 0.6 + 0.3;
      const kneeAngleB = Math.sin(t + Math.PI - 1.2) * 0.7 + 0.9;

      const kneeXB = hipX + Math.sin(hipAngleB) * 55;
      const kneeYB = hipY + Math.cos(hipAngleB) * 55;

      const ankleXB = kneeXB + Math.sin(hipAngleB - kneeAngleB) * 50;
      const ankleYB = kneeYB + Math.cos(hipAngleB - kneeAngleB) * 50;

      const footXB = ankleXB + 14;
      const footYB = ankleYB + 4;

      // Arms swing opposite to legs
      // Arm A (Front)
      const shoulderAngleA = Math.sin(t + Math.PI) * 0.5 - 0.2;
      const elbowAngleA = 1.4 + Math.sin(t + Math.PI) * 0.3;

      const elbowXA = shoulderX + Math.sin(shoulderAngleA) * 35;
      const elbowYA = shoulderY + Math.cos(shoulderAngleA) * 35;

      const handXA = elbowXA + Math.sin(shoulderAngleA + elbowAngleA) * 30;
      const handYA = elbowYA + Math.cos(shoulderAngleA + elbowAngleA) * 30;

      // Arm B (Back)
      const shoulderAngleB = Math.sin(t) * 0.5 - 0.2;
      const elbowAngleB = 1.4 + Math.sin(t) * 0.3;

      const elbowXB = shoulderX + Math.sin(shoulderAngleB) * 35;
      const elbowYB = shoulderY + Math.cos(shoulderAngleB) * 35;

      const handXB = elbowXB + Math.sin(shoulderAngleB + elbowAngleB) * 30;
      const handYB = elbowYB + Math.cos(shoulderAngleB + elbowAngleB) * 30;

      // Draw silhouette runner shadow
      if (!showSkeleton) {
        ctx.fillStyle = "rgba(30, 34, 41, 0.05)";
        ctx.beginPath();
        ctx.arc(headX, headY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = "rgba(30, 34, 41, 0.8)";
        ctx.lineWidth = 18;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw body core
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.lineTo(hipX, hipY);
        ctx.stroke();
      }

      if (showSkeleton) {
        // Draw bones back layer (Leg B / Arm B)
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgba(197, 168, 128, 0.4)"; // Soft Champagne color for back leg

        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.lineTo(elbowXB, elbowYB);
        ctx.lineTo(handXB, handYB);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(hipX, hipY);
        ctx.lineTo(kneeXB, kneeYB);
        ctx.lineTo(ankleXB, ankleYB);
        ctx.lineTo(footXB, footYB);
        ctx.stroke();

        // Draw bones front layer (Body / Leg A / Arm A)
        ctx.lineWidth = 6;
        ctx.strokeStyle = "rgba(30, 34, 41, 0.8)"; // Premium Graphite for front body

        // Spine
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.lineTo(hipX, hipY);
        ctx.stroke();

        // Arm A
        ctx.strokeStyle = "rgba(30, 34, 41, 0.8)";
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.lineTo(elbowXA, elbowYA);
        ctx.lineTo(handXA, handYA);
        ctx.stroke();

        // Leg A
        ctx.beginPath();
        ctx.moveTo(hipX, hipY);
        ctx.lineTo(kneeXA, kneeYA);
        ctx.lineTo(ankleXA, ankleYA);
        ctx.lineTo(footXA, footYA);
        ctx.stroke();

        // Draw Joint nodes
        ctx.fillStyle = "var(--color-navy)";
        const drawJoint = (x: number, y: number, r = 6) => {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 2;
          ctx.stroke();
        };

        drawJoint(headX, headY, 10);
        drawJoint(shoulderX, shoulderY);
        drawJoint(hipX, hipY);
        
        // Front joints
        drawJoint(elbowXA, elbowYA);
        drawJoint(handXA, handYA, 4);
        drawJoint(kneeXA, kneeYA);
        drawJoint(ankleXA, ankleYA);

        // Back joints (dimmed)
        ctx.fillStyle = "var(--color-champagne)";
        drawJoint(elbowXB, elbowYB);
        drawJoint(handXB, handYB, 4);
        drawJoint(kneeXB, kneeYB);
        drawJoint(ankleXB, ankleYB);
      }

      // Draw Vector Ground Forces
      if (showVectorForce) {
        const isLegAContact = ankleYA > h - 90;
        const isLegBContact = ankleYB > h - 90;

        ctx.lineWidth = 3;
        
        if (isLegAContact) {
          ctx.strokeStyle = "var(--color-sage)";
          ctx.fillStyle = "var(--color-sage)";
          // Force Vector line pointing UP from ground
          ctx.beginPath();
          ctx.moveTo(ankleXA, ankleYA);
          ctx.lineTo(ankleXA - 15, ankleYA - 50);
          ctx.stroke();
          // Draw arrowhead
          ctx.beginPath();
          ctx.arc(ankleXA - 15, ankleYA - 50, 4, 0, Math.PI * 2);
          ctx.fill();

          // Text overlay near ankle
          ctx.font = "10px var(--font-plus-jakarta)";
          ctx.fillStyle = "var(--color-graphite)";
          ctx.fillText(`GRF: ${(2.4 * 9.8).toFixed(1)} N/kg`, ankleXA - 70, ankleYA - 30);
        }

        if (isLegBContact) {
          ctx.strokeStyle = athlete.injuryRisk === "High" ? "var(--color-crimson)" : "var(--color-sage)";
          ctx.fillStyle = athlete.injuryRisk === "High" ? "var(--color-crimson)" : "var(--color-sage)";
          ctx.beginPath();
          ctx.moveTo(ankleXB, ankleYB);
          ctx.lineTo(ankleXB - 10, ankleYB - 40);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(ankleXB - 10, ankleYB - 40, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "10px var(--font-plus-jakarta)";
          ctx.fillStyle = "var(--color-graphite)";
          ctx.fillText(`GRF: ${((athlete.injuryRisk === "High" ? 2.1 : 2.3) * 9.8).toFixed(1)} N/kg`, ankleXB + 15, ankleYB - 20);
        }
      }

      // Dynamic text/telemetry labels on top of canvas
      ctx.font = "11px var(--font-outfit)";
      ctx.fillStyle = "rgba(30, 34, 41, 0.4)";
      ctx.fillText("AI SKELETAL RECONSTRUCTION NODE v2.4", 20, 25);
      ctx.fillText(`STRIDE SYNC RATE: ${(4.2 * speed).toFixed(1)} HZ`, 20, 42);

      // Angle indicator lines for Knee Flexion
      if (showSkeleton) {
        ctx.strokeStyle = "var(--color-gold)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        
        // Front knee angle indicator
        ctx.beginPath();
        ctx.moveTo(hipX, hipY);
        ctx.lineTo(kneeXA, kneeYA);
        ctx.lineTo(ankleXA, ankleYA);
        ctx.stroke();
        ctx.setLineDash([]); // clear

        // Text
        ctx.font = "12px var(--font-outfit)";
        ctx.fillStyle = "var(--color-graphite)";
        ctx.fillText(`KNEE: ${athlete.kneeExtensionAngle}°`, kneeXA + 12, kneeYA);
        ctx.fillText(`HIP: ${athlete.hipFlexionAngle}°`, hipX - 55, hipY - 5);
      }

      // Draw running scanning line if diagnostic scanning is active
      if (isScanning) {
        const scanY = (scanProgress / 100) * h;
        ctx.strokeStyle = "var(--color-champagne)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.stroke();

        ctx.fillStyle = "rgba(197, 168, 128, 0.15)";
        ctx.fillRect(0, 0, w, scanY);
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, speed, showSkeleton, showVectorForce, isScanning, scanProgress, athlete]);

  // Handle Scanning Progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            clearInterval(interval);
            // Trigger diagnostic output
            if (athlete.injuryRisk === "High") {
              setDiagnosticResult(
                "CRITICAL WARNING: Mechanical asymmetry of +8% ground contact detected. Left knee peak extension is constrained by 16 degrees, suggesting severe distal hamstring tension. Overreaching risk matches RHR increase."
              );
            } else if (athlete.injuryRisk === "Medium") {
              setDiagnosticResult(
                "MODERATE CAUTION: Mild pelvic tilt deflection (2.3°) observed during hip extension phases. Recommend secondary psoas dynamic screening and deceleration drills."
              );
            } else {
              setDiagnosticResult(
                "SKELETAL INTEGRITY OPTIMAL: Ground forces balanced at 49.8% L / 50.2% R. Hip flexion ranges show peak symmetry at 112 degrees. Recommended to maintain present loading."
              );
            }
            return 0;
          }
          return prev + 4;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScanning, athlete]);

  const triggerScan = () => {
    setDiagnosticResult(null);
    setScanProgress(0);
    setIsScanning(true);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Simulation Stage */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-oatmeal/40 border border-card-border flex items-center justify-center f1-grid">
        <canvas
          ref={canvasRef}
          width={700}
          height={380}
          className="w-full h-full max-w-full max-h-full block"
        />

        {/* Speed & Layer Controls overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-card-border shadow-sm">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 hover:bg-oatmeal rounded-lg transition-colors text-graphite"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <div className="h-4 w-[1px] bg-card-border mx-1" />
          <button
            onClick={() => setSpeed(0.25)}
            className={`text-[10px] font-outfit px-2 py-1 rounded ${
              speed === 0.25 ? "bg-graphite text-white" : "hover:bg-oatmeal text-slate-gray"
            }`}
          >
            0.25x
          </button>
          <button
            onClick={() => setSpeed(0.5)}
            className={`text-[10px] font-outfit px-2 py-1 rounded ${
              speed === 0.5 ? "bg-graphite text-white" : "hover:bg-oatmeal text-slate-gray"
            }`}
          >
            0.50x
          </button>
          <button
            onClick={() => setSpeed(1.0)}
            className={`text-[10px] font-outfit px-2 py-1 rounded ${
              speed === 1.0 ? "bg-graphite text-white" : "hover:bg-oatmeal text-slate-gray"
            }`}
          >
            1.0x
          </button>
        </div>

        {/* Visibility Toggles overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5">
          <button
            onClick={() => setShowSkeleton(!showSkeleton)}
            className={`flex items-center gap-2 text-[10px] font-outfit px-3 py-1.5 rounded-xl border transition-all ${
              showSkeleton
                ? "bg-navy text-white border-navy"
                : "bg-white/90 backdrop-blur text-graphite border-card-border hover:bg-white"
            }`}
          >
            <Cpu size={12} />
            {showSkeleton ? "SKELETON ON" : "SKELETON OFF"}
          </button>
          <button
            onClick={() => setShowVectorForce(!showVectorForce)}
            className={`flex items-center gap-2 text-[10px] font-outfit px-3 py-1.5 rounded-xl border transition-all ${
              showVectorForce
                ? "bg-sage text-white border-sage"
                : "bg-white/90 backdrop-blur text-graphite border-card-border hover:bg-white"
            }`}
          >
            <Activity size={12} />
            {showVectorForce ? "FORCES ON" : "FORCES OFF"}
          </button>
        </div>

        {/* Telemetry Panel Overlay - TOP LEFT */}
        <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-0.5 bg-white/70 backdrop-blur px-3 py-2 rounded-xl border border-card-border/40">
          <div className="text-[10px] font-outfit text-slate-gray uppercase tracking-widest">Live Dynamic</div>
          <div className="text-lg font-outfit font-semibold text-graphite flex items-center gap-2">
            {athlete.name}
          </div>
          <div className="text-[10px] font-mono text-sage flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
            TELEMETRY LINK SECURED
          </div>
        </div>

        {/* Diagnostic Scanning Button Overlay - BOTTOM RIGHT */}
        <button
          onClick={triggerScan}
          disabled={isScanning}
          className="absolute bottom-4 right-4 flex items-center gap-2 text-[11px] font-outfit font-semibold bg-white hover:bg-oatmeal active:scale-95 disabled:opacity-50 text-graphite border border-card-border px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <RotateCcw size={13} className={isScanning ? "animate-spin" : ""} />
          {isScanning ? `SCANNING ${Math.round(scanProgress)}%` : "INITIATE ASYMMETRY SCAN"}
        </button>
      </div>

      {/* Metric telemetry board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-card-border p-4 rounded-xl flex flex-col">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Stride Frequency</span>
          <span className="text-2xl font-outfit font-bold text-graphite mt-1">{athlete.strideFrequency} Hz</span>
          <span className="text-[10px] text-sage font-medium mt-1">Optimal Range: 4.1 - 4.5</span>
        </div>
        <div className="bg-white border border-card-border p-4 rounded-xl flex flex-col">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Stride Length</span>
          <span className="text-2xl font-outfit font-bold text-graphite mt-1">{athlete.strideLength} m</span>
          <span className="text-[10px] text-slate-gray font-medium mt-1">Target Pace Segment: 2.2</span>
        </div>
        <div className="bg-white border border-card-border p-4 rounded-xl flex flex-col">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Ground Contact</span>
          <span className="text-2xl font-outfit font-bold text-graphite mt-1">{athlete.groundContactTime} ms</span>
          <span className="text-[10px] text-sage font-medium mt-1">Symmetrical Limit &lt; 100ms</span>
        </div>
        <div className="bg-white border border-card-border p-4 rounded-xl flex flex-col">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Knee Flexion angle</span>
          <span className="text-2xl font-outfit font-bold text-graphite mt-1">{athlete.kneeExtensionAngle}°</span>
          <span className="text-[10px] text-slate-gray font-medium mt-1">Maximum extension phase</span>
        </div>
      </div>

      {/* Diagnostic Scan Output */}
      {diagnosticResult && (
        <div
          className={`flex gap-4 p-4 rounded-2xl border transition-all ${
            athlete.injuryRisk === "High"
              ? "bg-crimson/5 border-crimson/20 text-crimson"
              : athlete.injuryRisk === "Medium"
              ? "bg-amber/5 border-amber/20 text-amber"
              : "bg-sage/5 border-sage/20 text-sage"
          }`}
        >
          <div className="mt-0.5">
            {athlete.injuryRisk === "High" ? (
              <AlertTriangle size={18} />
            ) : athlete.injuryRisk === "Medium" ? (
              <AlertTriangle size={18} />
            ) : (
              <ShieldCheck size={18} />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-outfit font-bold uppercase tracking-wider">
              {athlete.injuryRisk === "High"
                ? "Asymmetry Asymmetry Detected - Action Required"
                : athlete.injuryRisk === "Medium"
                ? "Biomechanical Asymmetry Warning - Under Watch"
                : "Kinetic Integrity Diagnostics - Success"}
            </span>
            <p className="text-xs leading-relaxed font-sans opacity-90">{diagnosticResult}</p>
          </div>
        </div>
      )}
    </div>
  );
}
