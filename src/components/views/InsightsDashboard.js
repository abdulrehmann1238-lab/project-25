"use client";

import React, { useState, useEffect } from "react";
import BiomechanicalScanner from "@/components/BiomechanicalScanner";
import { Cpu, Send, Sparkles, Download, RefreshCw, Compass, ShieldCheck } from "lucide-react";

export default function InsightsDashboard({ athlete }) {
  const [activeTab, setActiveTab] = useState("video");
  
  // AI Advisor States
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      content: `Welcome, Coach. I am ready to analyze physiological and structural trends for ${athlete.name}. Ask me about training adaptation, load balance, or injury prevention.`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const seededQueries = [
    `Analyze ${athlete.name}'s stride mechanical asymmetry.`,
    `Optimize weekly training workload for ${athlete.name}.`,
    `Propose hamstring recovery active steps.`
  ];

  const handleQuery = (query) => {
    // Add user message
    setMessages((m) => [...m, { sender: "user", content: query }]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let response = "";
      if (query.includes("asymmetry")) {
        response = `${athlete.name}'s asymmetry index sits at ${athlete.injuryRisk === "High" ? "8.2% L" : "1.2% R"}. Ground contact times (${athlete.groundContactTime}ms) indicate standard thrust clearance in accelerating segments. Ensure left eccentric joint stabilizers are activated during dynamic warmups to maintain this baseline.`;
      } else if (query.includes("workload")) {
        response = `Current weekly training load is ${athlete.weeklyWorkload} units (${athlete.trainingLoadStatus} adaptation state). Sleep consistency (${athlete.sleepEfficiency}%) indicates optimal growth factor release. Recommend maintaining present volume, with speed sets restricted to 95% intensity maximum until active rest.`;
      } else {
        response = `To mitigate distal hamstring tensions, implement 3 sets of low-velocity hamstring eccentric iso-holds (45s duration) immediately post pitch. Extend dynamic warmups by 8 mins, focusing on psoas dynamic release and eccentric knee range exercises.`;
      }

      setMessages((m) => [...m, { sender: "ai", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  // Report States
  const [reportProgress, setReportProgress] = useState(0);
  const [reportState, setReportState] = useState("idle");

  const generateReport = () => {
    setReportState("generating");
    setReportProgress(0);

    const interval = setInterval(() => {
      setReportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setReportState("done");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // GPS Route Simulator States
  const [gpsFrame, setGpsFrame] = useState(0);
  const gpsPath = [
    { x: 150, y: 150 },
    { x: 160, y: 140 },
    { x: 180, y: 120 },
    { x: 210, y: 100 },
    { x: 250, y: 90 },
    { x: 290, y: 100 },
    { x: 320, y: 130 },
    { x: 330, y: 170 },
    { x: 310, y: 210 },
    { x: 280, y: 240 },
    { x: 230, y: 250 },
    { x: 180, y: 230 },
    { x: 150, y: 190 },
    { x: 140, y: 160 }
  ];

  useEffect(() => {
    let interval;
    if (activeTab === "gps") {
      interval = setInterval(() => {
        setGpsFrame((f) => (f + 1) % gpsPath.length);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Sports Science Center</span>
          <h2 className="text-2xl font-outfit font-extrabold text-graphite tracking-tight flex items-center gap-2">
            Performance Insights & Biomechanics
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-oatmeal/60 border border-card-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("video")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "video" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Biomechanics Video Analysis
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "ai" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            <Cpu size={12} />
            AI Sports Scientist
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "reports" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Smart Dossier Reports
          </button>
          <button
            onClick={() => setActiveTab("gps")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "gps" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            GPS Route Telemetry
          </button>
        </div>
      </div>

      {activeTab === "video" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Vector Skeletal Scan</span>
            <h3 className="text-base font-outfit font-extrabold text-graphite">AI Skeletal Node Reconstruction</h3>
          </div>
          <BiomechanicalScanner athlete={athlete} />
        </div>
      )}

      {activeTab === "ai" && (
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Chat Window */}
          <div className="md:col-span-2 bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col justify-between aspect-[4/3]">
            <div className="flex items-center gap-2 border-b border-card-border pb-3 mb-4">
              <Sparkles size={14} className="text-champagne animate-pulse" />
              <span className="text-xs font-outfit font-bold text-graphite uppercase tracking-wider">
                AURA AI Coach Intelligence Terminal
              </span>
            </div>

            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-outfit font-black text-[10px] shrink-0 ${
                    m.sender === "user" ? "bg-champagne text-white" : "bg-navy text-white"
                  }`}>
                    {m.sender === "user" ? "CO" : "AI"}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                    m.sender === "user"
                      ? "bg-navy text-white rounded-tr-none"
                      : "bg-oatmeal/30 border border-card-border text-graphite rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 mr-auto items-center">
                  <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center font-outfit font-black text-[10px]">
                    AI
                  </div>
                  <div className="bg-oatmeal/30 border border-card-border px-4 py-2.5 rounded-2xl text-xs text-slate-gray">
                    Analyzing biomechanical files...
                  </div>
                </div>
              )}
            </div>

            {/* Input field */}
            <div className="flex gap-2 border-t border-card-border pt-4 mt-4">
              <input
                type="text"
                placeholder="Ask about active physical strain, deceleration patterns..."
                disabled
                className="flex-1 text-xs px-4 py-3 bg-oatmeal/20 rounded-xl border border-card-border focus:ring-0 focus:outline-none"
              />
              <button className="bg-navy text-white p-3 rounded-xl hover:bg-navy/95 cursor-not-allowed">
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Seeded Quick Queries suggestions */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">
              Suggested Investigations
            </span>
            <div className="flex flex-col gap-2.5">
              {seededQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuery(query)}
                  className="w-full text-left luxury-card rounded-xl p-4 bg-white border border-card-border hover:border-champagne hover:bg-oatmeal/10 transition-all text-xs font-outfit font-semibold text-graphite leading-normal flex items-start gap-2.5"
                >
                  <Sparkles size={13} className="text-champagne shrink-0 mt-0.5" />
                  <span>{query}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === "reports" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Executive Reporting</span>
              <h3 className="text-sm font-outfit font-bold text-graphite">Athlete Performance dossier Generator</h3>
            </div>
            
            {reportState === "idle" && (
              <button
                onClick={generateReport}
                className="flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-widest bg-navy hover:bg-navy/90 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <Download size={12} />
                Generate dossier Report
              </button>
            )}

            {reportState === "generating" && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-gray">
                <RefreshCw size={12} className="animate-spin" />
                Compiling metadata {reportProgress}%
              </div>
            )}

            {reportState === "done" && (
              <span className="bg-sage/10 text-sage text-[10px] font-outfit font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-sage/10">
                <ShieldCheck size={13} />
                DOSSIER REPORT COMPILED
              </span>
            )}
          </div>

          {/* Dossier Report card visual preview */}
          <div className="bg-oatmeal/10 border border-card-border rounded-2xl p-8 max-w-2xl mx-auto w-full relative flex flex-col gap-8 shadow-inner font-sans">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-gray">REF: AURA-DOSS-901B</div>
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-card-border pb-5">
              <div className="flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-champagne font-extrabold">AURA ATHLETICS</span>
                <span className="text-xl font-outfit font-extrabold text-graphite mt-1">{athlete.name} Performance Dossier</span>
                <span className="text-[9px] text-slate-gray mt-1">Sport: {athlete.sport} • Cohort: {athlete.squad}</span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Ready Score</span>
                <span className="text-xl font-outfit font-black text-navy mt-1">{athlete.readinessScore}%</span>
              </div>
            </div>

            {/* Split metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Sprint clearance speed</span>
                <span className="text-sm font-outfit font-bold text-graphite mt-1">{athlete.topSpeed} km/h</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Reactive Agility</span>
                <span className="text-sm font-outfit font-bold text-graphite mt-1">{athlete.reactiveAgility} ms</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Ground Contact</span>
                <span className="text-sm font-outfit font-bold text-graphite mt-1">{athlete.groundContactTime} ms</span>
              </div>
            </div>

            {/* Diagnostic advice preview */}
            <div className="bg-white border border-card-border p-4 rounded-xl flex flex-col gap-2">
              <span className="text-[9px] font-outfit uppercase tracking-widest text-champagne font-bold">Predictive Sports Science Advice</span>
              <p className="text-[10px] text-slate-gray leading-relaxed">
                {athlete.aiAdvice}
              </p>
            </div>
            
            {/* Download simulation state */}
            {reportState === "done" && (
              <button
                onClick={() => setReportState("idle")}
                className="w-full text-center text-[10px] font-outfit font-bold uppercase tracking-widest bg-navy text-white hover:bg-navy/95 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 mt-4"
              >
                <Download size={13} />
                Download PDF dossier dossier
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "gps" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">GPS Coordinate Trajectory Map</span>
            <h3 className="text-base font-outfit font-extrabold text-graphite">Real-time Acceleration Path Simulation</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Run pathway map */}
            <div className="md:col-span-2 relative aspect-[4/3] bg-oatmeal/20 rounded-2xl overflow-hidden border border-card-border flex items-center justify-center f1-grid">
              
              {/* Pitch representation */}
              <div className="relative w-[360px] h-[260px] bg-sage/5 rounded-xl border border-sage/20 flex items-center justify-center">
                
                {/* Center circle */}
                <div className="absolute w-[80px] h-[80px] border border-sage/20 rounded-full" />
                <div className="absolute w-[1px] h-full bg-sage/20 left-1/2" />
                
                {/* Drawing dynamic dot coordinates */}
                <div
                  className="absolute w-4 h-4 bg-navy rounded-full border-2 border-white shadow flex items-center justify-center text-[8px] font-bold text-white transition-all duration-300"
                  style={{
                    left: `${(gpsPath[gpsFrame].x / 500) * 100}%`,
                    top: `${(gpsPath[gpsFrame].y / 380) * 100}%`
                  }}
                >
                  {athlete.avatar}
                </div>

              </div>

            </div>

            {/* GPS Metrics list */}
            <div className="flex flex-col justify-between bg-oatmeal/10 border border-card-border p-5 rounded-2xl">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Live Coordinate Sync</span>
                <span className="text-sm font-outfit font-bold text-graphite">GPS Epoch Frame: {gpsFrame + 1} / {gpsPath.length}</span>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-card-border/80">
                  <span className="text-xs font-sans text-slate-gray">Pitch X Node</span>
                  <span className="text-xs font-mono font-bold text-graphite">{gpsPath[gpsFrame].x}m</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-card-border/80">
                  <span className="text-xs font-sans text-slate-gray">Pitch Y Node</span>
                  <span className="text-xs font-mono font-bold text-graphite">{gpsPath[gpsFrame].y}m</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-card-border/80">
                  <span className="text-xs font-sans text-slate-gray">Active Heart Rate</span>
                  <span className="text-xs font-mono font-bold text-sage">{(128 + Math.sin(gpsFrame) * 12).toFixed(0)} bpm</span>
                </div>
              </div>

              <div className="mt-8 flex gap-2 text-[10px] font-sans text-slate-gray">
                <Compass size={14} className="text-champagne shrink-0 mt-0.5" />
                <p>GPS tracking correlates dynamic velocity changes with heart rate strain overlays. Verification rate 10Hz.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
