"use client";

import React, { useState } from "react";
import { Athlete } from "@/lib/mockData";
import WearableSync from "@/components/WearableSync";
import { Sparkles, Trophy, Zap, Flame, Droplet, Moon, Heart, LineChart, Target, Compass } from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AthleteDashboardProps {
  athlete: Athlete;
  onUpdateAthleteStats: (hrv: number, rhr: number, sleep: number) => void;
  isWearableSynced: boolean;
}

export default function AthleteDashboard({ athlete, onUpdateAthleteStats, isWearableSynced }: AthleteDashboardProps) {
  const [activeTab, setActiveTab] = useState<"readiness" | "speed" | "agility" | "endurance">("readiness");

  // Format historical chart data
  const chartData = athlete.history.weeks.map((week, idx) => ({
    name: week,
    Readiness: athlete.history.readiness[idx],
    Workload: athlete.history.workload[idx],
    Speed: athlete.history.speed[idx]
  }));

  // Daily checkboxes/goals
  const [goals, setGoals] = useState([
    { id: "g1", label: "Complete 15-min joint mobility mobility flow", done: true },
    { id: "g2", label: "Achieve hydration target (4.0 Liters)", done: false },
    { id: "g3", label: "Perform night sleep wearable sync", done: isWearableSynced },
    { id: "g4", label: "Lactate threshold tempo intervals", done: false }
  ]);

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
  };

  // Readiness styling
  let readinessColor = "text-sage bg-sage/5";
  let ringStroke = "stroke-sage";
  if (athlete.readinessScore < 50) {
    readinessColor = "text-crimson bg-crimson/5";
    ringStroke = "stroke-crimson";
  } else if (athlete.readinessScore < 80) {
    readinessColor = "text-amber bg-amber/5";
    ringStroke = "stroke-amber";
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Performance Terminal</span>
          <h2 className="text-2xl font-outfit font-extrabold text-graphite tracking-tight flex items-center gap-2">
            Athlete Dashboard
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-oatmeal/60 border border-card-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("readiness")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "readiness" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Readiness & Recovery
          </button>
          <button
            onClick={() => setActiveTab("speed")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "speed" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Speed Acceleration
          </button>
          <button
            onClick={() => setActiveTab("agility")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "agility" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Agility Shuttle
          </button>
          <button
            onClick={() => setActiveTab("endurance")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === "endurance" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            Endurance Threshold
          </button>
        </div>
      </div>

      {activeTab === "readiness" && (
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Physiological Metrics Ring Grid */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Primary indicators */}
            <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm grid sm:grid-cols-3 gap-6 items-center">
              
              {/* Radial Progress Ring */}
              <div className="flex flex-col items-center justify-center relative aspect-square max-w-[140px] mx-auto sm:col-span-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Outer circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    className="stroke-oatmeal"
                    strokeWidth="8"
                  />
                  {/* Dynamic value circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    className={ringStroke}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - athlete.readinessScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-outfit font-black text-graphite">{athlete.readinessScore}%</span>
                  <span className="text-[8px] font-outfit uppercase tracking-widest text-slate-gray">Readiness</span>
                </div>
              </div>

              {/* HRV & RHR blocks */}
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div className="flex flex-col bg-oatmeal/20 border border-card-border p-4 rounded-xl">
                  <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray flex items-center gap-1.5">
                    <Heart size={12} className="text-crimson" /> Heart Rate Var. (HRV)
                  </span>
                  <span className="text-3xl font-outfit font-bold text-graphite mt-2">{athlete.hrv} ms</span>
                  <span className="text-[10px] text-sage font-medium mt-1">High parasympathetic response</span>
                </div>

                <div className="flex flex-col bg-oatmeal/20 border border-card-border p-4 rounded-xl">
                  <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Resting HR (RHR)</span>
                  <span className="text-3xl font-outfit font-bold text-graphite mt-2">{athlete.rhr} bpm</span>
                  <span className="text-[10px] text-slate-gray font-medium mt-1">7-day baseline stable</span>
                </div>
              </div>

            </div>

            {/* Physiological details list */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-card-border p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center">
                  <Moon size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Sleep Quality</span>
                  <span className="text-base font-outfit font-extrabold text-graphite mt-0.5">{athlete.sleepScore}%</span>
                  <span className="text-[9px] text-slate-gray">{athlete.sleepHours} hrs total depth</span>
                </div>
              </div>

              <div className="bg-white border border-card-border p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center">
                  <Droplet size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Hydration Level</span>
                  <span className="text-base font-outfit font-extrabold text-graphite mt-0.5">{athlete.hydrationLevel}%</span>
                  <span className="text-[9px] text-slate-gray">{athlete.nutritionMacros.waterIntake}L of {athlete.nutritionMacros.waterTarget}L</span>
                </div>
              </div>

              <div className="bg-white border border-card-border p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber/10 text-amber flex items-center justify-center">
                  <Flame size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">Muscle Fatigue</span>
                  <span className="text-base font-outfit font-extrabold text-graphite mt-0.5">{athlete.muscleFatigue}%</span>
                  <span className="text-[9px] text-slate-gray">Joint soreness: {athlete.jointSoreness}%</span>
                </div>
              </div>
            </div>

            {/* Historical charts line plot */}
            <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray flex items-center gap-1">
                    <LineChart size={13} className="text-champagne" /> Baseline Metrics Analysis
                  </span>
                  <h3 className="text-sm font-outfit font-bold text-graphite">Weekly Physiological Sync</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-gray">6-WEEK RETROSPECTIVE</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ECE6DC" />
                    <XAxis dataKey="name" stroke="#4A5260" style={{ fontSize: "10px", fontFamily: "var(--font-outfit)" }} />
                    <YAxis yAxisId="left" stroke="#16243A" style={{ fontSize: "10px", fontFamily: "var(--font-outfit)" }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#C5A880" style={{ fontSize: "10px", fontFamily: "var(--font-outfit)" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#EFECE6", fontSize: "11px", fontFamily: "var(--font-plus-jakarta)" }} />
                    <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-outfit)", textTransform: "uppercase" }} />
                    <Line yAxisId="left" type="monotone" dataKey="Readiness" stroke="#5A7E64" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Workload" stroke="#C5A880" strokeWidth={2} strokeDasharray="5 5" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Sidebar Wearable Sync & Goals */}
          <div className="flex flex-col gap-6">
            
            {/* Interactive BLE Sync module */}
            <WearableSync onSyncComplete={onUpdateAthleteStats} isSynced={isWearableSynced} />

            {/* Daily dynamic goals checklist */}
            <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray mb-4 flex items-center gap-2">
                <Target size={13} className="text-champagne" />
                Daily Checklist Milestones
              </h3>

              <div className="flex flex-col gap-3">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className="flex items-center justify-between p-3 bg-oatmeal/20 hover:bg-oatmeal/40 border border-card-border rounded-xl cursor-pointer transition-all"
                  >
                    <span className={`text-xs font-sans leading-relaxed ${
                      g.done ? "line-through text-slate-gray/70 opacity-60" : "text-graphite font-medium"
                    }`}>
                      {g.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={g.done}
                      onChange={() => {}} // handled by click
                      className="w-4 h-4 rounded text-champagne border-card-border focus:ring-0 cursor-pointer pointer-events-none accent-champagne"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements milestone tracker */}
            <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray flex items-center gap-2">
                <Trophy size={13} className="text-gold" />
                Academy Achievements
              </h3>
              
              <div className="flex items-center gap-3 bg-oatmeal/10 p-3 rounded-xl border border-card-border">
                <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-outfit font-bold text-graphite">Speed Acceleration Champion</span>
                  <span className="text-[10px] text-slate-gray">U-18 Elite Squad record holder: 34.2 km/h</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Speed acceleration subview */}
      {activeTab === "speed" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Absolute Acceleration Telemetry</span>
            <h3 className="text-lg font-outfit font-extrabold text-graphite">Speed Segment Metrics</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Top Speed</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.topSpeed} km/h</span>
              <span className="text-[10px] text-sage font-medium mt-2">Peak acceleration segment cleared</span>
            </div>

            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">10m Split Acceleration</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.sprintSplit10m} s</span>
              <span className="text-[10px] text-slate-gray font-medium mt-2">Block clearance segment target: 1.6s</span>
            </div>

            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Ground Contact Asymmetry</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.groundContactTime} ms</span>
              <span className="text-[10px] text-sage font-medium mt-2">Optimal force sync matching</span>
            </div>
          </div>
        </div>
      )}

      {/* Agility subview */}
      {activeTab === "agility" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Directional Deceleration telemetry</span>
            <h3 className="text-lg font-outfit font-extrabold text-graphite">Agility Shuttle Metrics</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Reactive Agility Delay</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.reactiveAgility} ms</span>
              <span className="text-[10px] text-sage font-medium mt-2">Average response delay threshold: 200ms</span>
            </div>

            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">T-Test shuttle clearance</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.agilityTTest} s</span>
              <span className="text-[10px] text-slate-gray font-medium mt-2">Directional structural acceleration bounds</span>
            </div>
          </div>
        </div>
      )}

      {/* Endurance subview */}
      {activeTab === "endurance" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Aerobic Efficiency bounds</span>
            <h3 className="text-lg font-outfit font-extrabold text-graphite">Endurance Threshold Metrics</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">VO2 Max Capacity</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.vo2Max} ml/kg/min</span>
              <span className="text-[10px] text-sage font-medium mt-2">Excellent junior athletic baseline</span>
            </div>

            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Lactate Threshold HR</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">{athlete.anaerobicThreshold} bpm</span>
              <span className="text-[10px] text-slate-gray font-medium mt-2">Maximum stable aerobic rate</span>
            </div>

            <div className="bg-oatmeal/20 border border-card-border p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Endurance Beep Test</span>
              <span className="text-4xl font-outfit font-black text-navy mt-4">Level {athlete.enduranceBeepTest}</span>
              <span className="text-[10px] text-sage font-medium mt-2">Clears cohort qualification guidelines</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggested Workouts advice strip */}
      <div className="bg-navy text-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
        {/* Visual elements */}
        <div className="absolute top-0 right-0 w-[40%] aspect-square bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.2),transparent_70%)] rounded-full pointer-events-none animate-pulse" />
        
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 z-10">
          <Sparkles size={15} className="text-champagne animate-pulse" />
          <span className="text-xs font-outfit font-bold uppercase tracking-wider text-champagne">
            Predictive AI Insights & Advisor
          </span>
        </div>

        <p className="text-xs sm:text-sm font-sans font-light leading-relaxed opacity-90 z-10 max-w-4xl">
          {athlete.aiAdvice}
        </p>

        <div className="mt-4 flex flex-col gap-2 z-10">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-champagne font-semibold">Suggested Workout Adjustments</span>
          <div className="grid sm:grid-cols-3 gap-3">
            {athlete.aiSuggestedWorkouts.map((workout, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-champagne">{idx + 1}</span>
                <span className="text-[11px] font-sans font-medium text-white/90">{workout}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
