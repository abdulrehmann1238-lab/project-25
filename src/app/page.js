"use client";

import React, { useState, useEffect } from "react";
import { mockAthletes } from "@/lib/mockData";
import LandingPage from "@/components/views/LandingPage";
import CoachDashboard from "@/components/views/CoachDashboard";
import AthleteDashboard from "@/components/views/AthleteDashboard";
import ParentDashboard from "@/components/views/ParentDashboard";
import InsightsDashboard from "@/components/views/InsightsDashboard";
import Utilities from "@/components/views/Utilities";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Zap, Shield, Cpu, Activity, LogOut, ChevronRight
} from "lucide-react";

export default function Home() {
  const [viewState, setViewState] = useState("loading");
  const [activeRole, setActiveRole] = useState("Coach");
  const [activeAthleteId, setActiveAthleteId] = useState("marcus-vance");
  const [isWearableSynced, setIsWearableSynced] = useState(false);

  // Cinematic preloader metric states
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMetricHRV, setBootMetricHRV] = useState(0);
  const [bootMetricSpeed, setBootMetricSpeed] = useState(0);

  // Get active athlete data
  const [athletesData, setAthletesData] = useState(mockAthletes);
  const activeAthlete = athletesData.find((a) => a.id === activeAthleteId) || athletesData[0];

  // Cinematic Boot Loader ticks
  useEffect(() => {
    if (viewState !== "loading") return;

    const interval = setInterval(() => {
      setBootProgress((p) => {
        const next = p + 2;
        // Count up stats simultaneously
        setBootMetricHRV(Math.round((next / 100) * 88));
        setBootMetricSpeed(Number(((next / 100) * 34.2).toFixed(1)));

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setViewState("landing");
          }, 600);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [viewState]);

  // Sync complete callback from WearableSync component
  const handleUpdateAthleteStats = (hrv, rhr, sleep) => {
    setIsWearableSynced(true);
    
    // Update active athlete's baseline stats in state to simulate true reactive dashboard
    setAthletesData((prev) =>
      prev.map((a) =>
        a.id === activeAthleteId
          ? {
              ...a,
              hrv,
              rhr,
              sleepScore: sleep,
              readinessScore: 96, // unlock absolute elite readiness!
              trainingLoadStatus: "Optimal",
              hydrationLevel: 98
            }
          : a
      )
    );
  };

  const handleEnterDemo = (role) => {
    setActiveRole(role);
    setViewState("app");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans select-none overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* 1. Cinematic Initialization Loader */}
        {viewState === "loading" && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#111622] flex flex-col items-center justify-center p-6 f1-grid f1-scanner"
          >
            <div className="relative flex flex-col items-center max-w-lg w-full text-center gap-8">
              
              {/* Pulsing Shield Logo */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-champagne/10 rounded-full animate-ping" />
                <div className="absolute inset-2 bg-champagne/20 rounded-full animate-pulse" />
                <div className="relative w-12 h-12 bg-white/5 border border-champagne/40 rounded-xl flex items-center justify-center text-champagne font-outfit font-black tracking-widest text-lg shadow-2xl">
                  A
                </div>
              </div>

              {/* Dynamic Kinetic Typography */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-champagne font-extrabold flex items-center justify-center gap-2">
                  <Activity size={11} className="animate-pulse" /> SYSTEM ACTIVE v2.4
                </span>
                <h2 className="font-outfit font-black text-2xl tracking-widest text-white uppercase mt-1">
                  AURA ATHLETICS
                </h2>
                <div className="h-4 overflow-hidden relative text-center">
                  <div className="text-[9px] font-mono text-slate-400/80 uppercase tracking-widest animate-pulse">
                    {bootProgress < 30 && "INITIALIZING BLE BIOSENSOR SYNCS..."}
                    {bootProgress >= 30 && bootProgress < 65 && "CALIBRATING ACCELERATION EPISODES..."}
                    {bootProgress >= 65 && bootProgress < 90 && "PULLING NEUROMUSCULAR RANGE VECTORS..."}
                    {bootProgress >= 90 && "SENSORS SECURED. SYSTEM LAUNCHING."}
                  </div>
                </div>
              </div>

              {/* Progress counter bars */}
              <div className="w-full flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>TELEMETRY STAGE</span>
                  <span>{bootProgress}%</span>
                </div>
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne transition-all duration-300 ease-out"
                    style={{ width: `${bootProgress}%` }}
                  />
                </div>
              </div>

              {/* Counting telemetry items */}
              <div className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-6 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-outfit uppercase tracking-wider text-slate-400">Neural Sync</span>
                  <span className="text-xl font-outfit font-black text-white mt-1">{bootMetricHRV} ms</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-outfit uppercase tracking-wider text-slate-400">Velocity Clear</span>
                  <span className="text-xl font-outfit font-black text-white mt-1">{bootMetricSpeed} km/h</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* 2. Marketing Luxury Landing Page */}
        {viewState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <LandingPage onEnterDemo={handleEnterDemo} />
          </motion.div>
        )}

        {/* 3. Core Integrated App Shell */}
        {viewState === "app" && (
          <motion.div
            key="app-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen bg-[#FAF7F2] flex flex-col relative overflow-hidden"
          >
            {/* Telemetry background grids */}
            <div className="absolute inset-0 f1-grid pointer-events-none opacity-40" />

            {/* Top Quick-Switch Role switcher (Staggered for presentation) */}
            <div className="relative bg-white border-b border-card-border/80 w-full py-3.5 px-6 z-40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-navy flex items-center justify-center text-white font-outfit font-bold text-xs tracking-widest">
                  A
                </div>
                <span className="font-outfit font-extrabold uppercase text-xs tracking-widest text-graphite">
                  AURA PLATFORM
                </span>
                <div className="h-4 w-[1px] bg-card-border" />
                <span className="text-[10px] text-slate-gray font-mono uppercase">
                  Role view: {activeRole} Mode
                </span>
              </div>

              {/* Role Toggle buttons */}
              <div className="flex items-center gap-1.5 bg-oatmeal/60 border border-card-border p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setActiveRole("Coach")}
                  className={`text-[9px] font-outfit uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    activeRole === "Coach" ? "bg-navy text-white shadow" : "text-slate-gray hover:text-graphite"
                  }`}
                >
                  <Trophy size={10} />
                  <span>Coach</span>
                </button>
                <button
                  onClick={() => setActiveRole("Athlete")}
                  className={`text-[9px] font-outfit uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    activeRole === "Athlete" ? "bg-navy text-white shadow" : "text-slate-gray hover:text-graphite"
                  }`}
                >
                  <Zap size={10} />
                  <span>Athlete</span>
                </button>
                <button
                  onClick={() => setActiveRole("Parent")}
                  className={`text-[9px] font-outfit uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    activeRole === "Parent" ? "bg-navy text-white shadow" : "text-slate-gray hover:text-graphite"
                  }`}
                >
                  <Shield size={10} />
                  <span>Parent</span>
                </button>
                <div className="h-3 w-[1px] bg-card-border mx-0.5" />
                <button
                  onClick={() => setActiveRole("Insights")}
                  className={`text-[9px] font-outfit uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    activeRole === "Insights" ? "bg-navy text-white shadow" : "text-slate-gray hover:text-graphite"
                  }`}
                >
                  <Cpu size={10} />
                  <span>Insights</span>
                </button>
                <button
                  onClick={() => setActiveRole("Settings")}
                  className={`text-[9px] font-outfit uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    activeRole === "Settings" ? "bg-navy text-white shadow" : "text-slate-gray hover:text-graphite"
                  }`}
                >
                  <Cpu size={10} />
                  <span>Settings</span>
                </button>
              </div>

              {/* Exit Demo button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewState("landing")}
                  className="text-[9px] font-outfit uppercase tracking-widest font-bold text-slate-gray hover:text-graphite flex items-center gap-1.5 transition-all"
                >
                  <LogOut size={11} />
                  <span>Exit Demo</span>
                </button>
              </div>
            </div>

            {/* Main Stage Panel Area */}
            <div className="relative flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-6 z-10">
              
              {/* Breadcrumb Navigation & Athlete Selection Header */}
              <div className="flex items-center justify-between border-b border-card-border pb-4">
                <div className="flex items-center gap-2 text-xs font-outfit text-slate-gray">
                  <span>AURA HUB</span>
                  <ChevronRight size={12} />
                  <span className="font-bold text-graphite uppercase">{activeRole} Command</span>
                  <ChevronRight size={12} />
                  <span className="text-champagne font-mono font-bold uppercase">{activeAthlete.name}</span>
                </div>

                {/* Athlete Dropdown profile switches */}
                <div className="flex items-center gap-3 bg-white border border-card-border px-3 py-1.5 rounded-xl shadow-sm">
                  <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Active Profile:</span>
                  <select
                    value={activeAthleteId}
                    onChange={(e) => setActiveAthleteId(e.target.value)}
                    className="text-xs font-outfit font-bold text-graphite bg-transparent focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    {athletesData.map((athlete) => (
                      <option key={athlete.id} value={athlete.id}>
                        {athlete.name} ({athlete.sport})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic rendering of dashboards based on state roles */}
              <div className="w-full flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole + activeAthleteId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {activeRole === "Coach" && (
                      <CoachDashboard
                        onSelectAthlete={setActiveAthleteId}
                        activeAthlete={activeAthlete}
                      />
                    )}
                    
                    {activeRole === "Athlete" && (
                      <AthleteDashboard
                        athlete={activeAthlete}
                        onUpdateAthleteStats={handleUpdateAthleteStats}
                        isWearableSynced={isWearableSynced}
                      />
                    )}

                    {activeRole === "Parent" && (
                      <ParentDashboard athlete={activeAthlete} />
                    )}

                    {activeRole === "Insights" && (
                      <InsightsDashboard athlete={activeAthlete} />
                    )}

                    {activeRole === "Settings" && (
                      <Utilities />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
