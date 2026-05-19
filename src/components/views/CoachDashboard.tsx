"use client";

import React, { useState, useRef, useEffect } from "react";
import { Athlete, mockAthletes, mockSessions, TrainingSession } from "@/lib/mockData";
import { Users, AlertTriangle, CheckCircle, ShieldAlert, Award, Calendar, Play, Radio, Map, Heart, Edit } from "lucide-react";

interface CoachDashboardProps {
  onSelectAthlete: (athleteId: string) => void;
  activeAthlete: Athlete;
}

export default function CoachDashboard({ onSelectAthlete, activeAthlete }: CoachDashboardProps) {
  const [selectedSquad, setSelectedSquad] = useState<string>("All Squads");
  const [activeTab, setActiveTab] = useState<"roster" | "live" | "playbook">("roster");
  
  // Tactical Board States
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("var(--color-navy)");

  const squads = ["All Squads", "U-18 Elite Sprinters", "U-18 Endurance Elite", "Academy U-17 A"];

  const filteredAthletes = selectedSquad === "All Squads"
    ? mockAthletes
    : mockAthletes.filter(a => a.squad === selectedSquad);

  // Load tactical soccer/athletics board image background on Canvas
  useEffect(() => {
    if (activeTab !== "playbook") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Field background (Luxurious off-white board with tactical sage lines)
    ctx.fillStyle = "#F3EFE9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(74, 82, 96, 0.2)";
    ctx.lineWidth = 2;
    
    // Draw running track lanes on tactical board
    const laneHeight = canvas.height / 5;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * laneHeight);
      ctx.lineTo(canvas.width, i * laneHeight);
      ctx.stroke();
    }

    // Draw starting lines
    ctx.strokeStyle = "var(--color-champagne)";
    ctx.beginPath();
    ctx.moveTo(60, 0);
    ctx.lineTo(60, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 60, 0);
    ctx.lineTo(canvas.width - 60, canvas.height);
    ctx.stroke();

    // Draw some mock tactical drawings (X's and O's)
    ctx.fillStyle = "var(--color-navy)";
    ctx.font = "bold 14px var(--font-outfit)";
    ctx.fillText("X1 (Start)", 80, laneHeight * 1.5);
    ctx.fillText("X2 (Accelerate)", 220, laneHeight * 2.5);
    ctx.fillText("X3 (Max Velocity)", 420, laneHeight * 3.5);

    ctx.strokeStyle = "var(--color-champagne)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(100, laneHeight * 1.5 + 5);
    ctx.lineTo(210, laneHeight * 2.5 - 5);
    ctx.lineTo(410, laneHeight * 3.5 - 5);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [activeTab]);

  // Drawing handlers on tactical playbook
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw base track lines
    ctx.fillStyle = "#F3EFE9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(74, 82, 96, 0.2)";
    ctx.lineWidth = 2;
    const laneHeight = canvas.height / 5;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * laneHeight);
      ctx.lineTo(canvas.width, i * laneHeight);
      ctx.stroke();
    }
  };

  // Mock telemetry streams
  const [pulseHeartRate, setPulseHeartRate] = useState(132);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseHeartRate((h) => h + (Math.random() > 0.5 ? 1 : -1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Operations Center</span>
          <h2 className="text-2xl font-outfit font-extrabold text-graphite tracking-tight flex items-center gap-2">
            Coach Command Center
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-oatmeal/60 border border-card-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("roster")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "roster" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Squad Roster
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "live" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            <Radio size={11} className={activeTab === "live" ? "animate-pulse text-sage" : ""} />
            Live Session Telemetry
          </button>
          <button
            onClick={() => setActiveTab("playbook")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "playbook" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Tactical Playbook
          </button>
        </div>
      </div>

      {activeTab === "roster" && (
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Squad Roster List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* Squad filtering pill box */}
            <div className="flex items-center justify-between bg-white border border-card-border p-3 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-slate-gray" />
                <span className="text-xs font-outfit font-bold text-graphite">Filter Cohort</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {squads.map((squad) => (
                  <button
                    key={squad}
                    onClick={() => setSelectedSquad(squad)}
                    className={`text-[10px] font-outfit px-3 py-1.5 rounded-xl border transition-all ${
                      selectedSquad === squad
                        ? "bg-navy border-navy text-white"
                        : "bg-oatmeal/20 border-card-border text-slate-gray hover:bg-white"
                    }`}
                  >
                    {squad}
                  </button>
                ))}
              </div>
            </div>

            {/* Athlete list cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredAthletes.map((athlete) => {
                const isSelected = athlete.id === activeAthlete.id;
                
                // Color mapping for physiological status
                let stateColor = "border-sage bg-sage/5 text-sage";
                if (athlete.injuryRisk === "High") stateColor = "border-crimson bg-crimson/5 text-crimson";
                else if (athlete.injuryRisk === "Medium") stateColor = "border-amber bg-amber/5 text-amber";

                return (
                  <div
                    key={athlete.id}
                    onClick={() => onSelectAthlete(athlete.id)}
                    className={`luxury-card rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all border ${
                      isSelected ? "ring-2 ring-champagne border-champagne" : "border-card-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-outfit font-black text-sm shadow-inner">
                          {athlete.avatar}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-outfit font-bold text-graphite">{athlete.name}</span>
                          <span className="text-[10px] text-slate-gray font-sans">{athlete.sport}</span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-outfit font-bold px-2 py-0.5 rounded-full border ${stateColor}`}>
                        {athlete.injuryRisk === "High" ? "HIGH RISK" : athlete.injuryRisk === "Medium" ? "WARN" : "OPTIMAL"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-6 border-t border-dashed border-card-border pt-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Readiness</span>
                        <span className="text-sm font-outfit font-bold text-graphite">{athlete.readinessScore}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">HRV</span>
                        <span className="text-sm font-outfit font-bold text-graphite">{athlete.hrv} ms</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Resting HR</span>
                        <span className="text-sm font-outfit font-bold text-graphite">{athlete.rhr} bpm</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Notifications & Coach Assist Panel */}
          <div className="flex flex-col gap-6">
            
            {/* Quick overview widget */}
            <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray mb-4 flex items-center gap-2">
                <Calendar size={13} className="text-champagne" />
                Active Session Docket
              </h3>
              
              <div className="flex flex-col gap-3">
                {mockSessions.map((sess) => (
                  <div key={sess.id} className="flex gap-3 bg-oatmeal/20 p-3 rounded-xl border border-card-border">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                      sess.type === "Speed" ? "bg-navy" : sess.type === "Screening" ? "bg-champagne" : "bg-sage"
                    }`} />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-slate-gray">{sess.time}</span>
                      <span className="text-xs font-outfit font-bold text-graphite mt-0.5">{sess.title}</span>
                      <span className="text-[9px] text-slate-gray mt-1">Duration: {sess.duration} • ({sess.attendees} Athletes)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Risk Indicators */}
            <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray flex items-center gap-2">
                <ShieldAlert size={14} className="text-crimson" />
                Physiological Alerts
              </h3>
              
              {/* Overreaching alert - Elena */}
              <div className="bg-crimson/5 border border-crimson/20 p-4 rounded-xl flex gap-3 text-crimson">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-outfit font-bold uppercase tracking-wider">RESTRICTION ACTIVE</span>
                  <span className="text-xs font-outfit font-bold text-graphite">Elena Rostova</span>
                  <p className="text-[10px] text-slate-gray font-sans leading-relaxed">
                    Hamstring structural asymmetry of +8% ground forces. Low sleep cycles (6.2h) triggered stress baseline. Action requested.
                  </p>
                </div>
              </div>

              {/* Moderate alert - Leo */}
              <div className="bg-amber/5 border border-amber/20 p-4 rounded-xl flex gap-3 text-amber">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-outfit font-bold uppercase tracking-wider">LOAD CAUTION</span>
                  <span className="text-xs font-outfit font-bold text-graphite">Leo Santos</span>
                  <p className="text-[10px] text-slate-gray font-sans leading-relaxed">
                    Transitioning to Recovery load state. Pelvic tilt anomaly detected under load velocity scans. Calibrate sprint splits.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === "live" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-card-border pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
              <span className="text-xs font-outfit font-bold uppercase tracking-widest text-slate-gray">
                LIVE TELEMETRY STREAM ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-gray">
              <span>Lane: 4 (Sprint Segment)</span>
              <span>Sync Rate: 100 Hz</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Live Athlete Card */}
            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-outfit font-black text-sm">
                    {activeAthlete.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-outfit font-extrabold text-graphite">{activeAthlete.name}</span>
                    <span className="text-[10px] text-slate-gray uppercase font-mono">{activeAthlete.sport}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-outfit text-sage bg-sage/5 px-2 py-0.5 rounded border border-sage/10 font-bold">
                    CONNECTED
                  </span>
                </div>
              </div>

              {/* Live metrics widgets */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col bg-white p-3 rounded-xl border border-card-border/80">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray flex items-center gap-1">
                    <Heart size={10} className="text-crimson animate-pulse" /> Live Pulse
                  </span>
                  <span className="text-xl font-outfit font-bold text-graphite mt-1">{pulseHeartRate} bpm</span>
                </div>
                <div className="flex flex-col bg-white p-3 rounded-xl border border-card-border/80">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Acceleration</span>
                  <span className="text-xl font-outfit font-bold text-graphite mt-1">{(activeAthlete.acceleration * 0.95).toFixed(2)} m/s²</span>
                </div>
                <div className="flex flex-col bg-white p-3 rounded-xl border border-card-border/80 col-span-2">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Real-time Velocity</span>
                  <span className="text-xl font-outfit font-bold text-graphite mt-1">{(activeAthlete.topSpeed * 0.92).toFixed(1)} km/h</span>
                </div>
              </div>
            </div>

            {/* Live session parameters list */}
            <div className="md:col-span-2 flex flex-col justify-between bg-white border border-card-border p-5 rounded-2xl">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Session parameters</span>
                <h4 className="text-base font-outfit font-bold text-graphite">High-Velocity Start Acceleration</h4>
                <p className="text-xs text-slate-gray font-sans leading-relaxed">
                  Focusing on low joint angles, block clearance rates, and 10m split speeds. Ensure mechanical symmetry holds above 95% threshold under high load segments.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-card-border pt-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">10m Split Target</span>
                  <span className="text-sm font-outfit font-bold text-graphite">{activeAthlete.sprintSplit10m}s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">30m Split Target</span>
                  <span className="text-sm font-outfit font-bold text-graphite">{activeAthlete.sprintSplit30m}s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Contact Threshold</span>
                  <span className="text-sm font-outfit font-bold text-graphite">95 ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "playbook" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Tactical drawing board</span>
              <h3 className="text-sm font-outfit font-bold text-graphite">Active Playbook / Runway Strategy</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setColor("var(--color-navy)")}
                  className={`w-5 h-5 rounded-full border-2 ${
                    color === "var(--color-navy)" ? "border-champagne" : "border-transparent"
                  }`}
                  style={{ backgroundColor: "var(--color-navy)" }}
                />
                <button
                  onClick={() => setColor("var(--color-sage)")}
                  className={`w-5 h-5 rounded-full border-2 ${
                    color === "var(--color-sage)" ? "border-champagne" : "border-transparent"
                  }`}
                  style={{ backgroundColor: "var(--color-sage)" }}
                />
                <button
                  onClick={() => setColor("var(--color-crimson)")}
                  className={`w-5 h-5 rounded-full border-2 ${
                    color === "var(--color-crimson)" ? "border-champagne" : "border-transparent"
                  }`}
                  style={{ backgroundColor: "var(--color-crimson)" }}
                />
              </div>
              <div className="h-4 w-[1px] bg-card-border mx-1" />
              <button
                onClick={clearBoard}
                className="text-[10px] font-outfit uppercase tracking-widest font-bold border border-card-border hover:bg-oatmeal text-graphite px-3 py-1.5 rounded-lg transition-all"
              >
                Clear Board
              </button>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-card-border shadow-inner">
            <canvas
              ref={canvasRef}
              width={700}
              height={380}
              className="w-full h-full max-w-full max-h-full block cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          
          <div className="flex gap-3 text-xs text-slate-gray font-sans">
            <Edit size={14} className="text-champagne mt-0.5 shrink-0" />
            <p>
              Use the tactical strategy board to model deceleration lines, dynamic hip pivot regions, or sprints clearance angles directly on the track field diagram. Select colors for custom vector annotations.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
