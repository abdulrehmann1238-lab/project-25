"use client";

import React, { useState } from "react";
import { Athlete } from "@/lib/mockData";
import { ShieldCheck, GraduationCap, Clock, MessageSquare, Plus, CheckCircle, CreditCard, ChevronRight, Apple } from "lucide-react";

interface ParentDashboardProps {
  athlete: Athlete;
}

export default function ParentDashboard({ athlete }: ParentDashboardProps) {
  const [activePlan, setActivePlan] = useState<"standard" | "elite">("elite");
  const [showInvoiceAlert, setShowInvoiceAlert] = useState(false);

  // Mock coach comments
  const coachComments = [
    {
      date: "May 18, 2026",
      coach: "Coach Henderson",
      subject: "Weekly Sprint Velocity Progress",
      content: `${athlete.name} has shown phenomenal mechanical diligence. The 10m starting split cleared at ${athlete.sprintSplit10m}s. Muscle fatigue remains low, so we are keeping workloads optimal. Highly recommend maintaining present 8.5+ hour sleep cycles.`
    },
    {
      date: "May 12, 2026",
      coach: "Dr. Clara Mercer (Academy Nutritionist)",
      subject: "Macros Intake Correction",
      content: `Observed a 15% reduction in hydration targets during middle-week sessions. Adjusted hydration thresholds to ${athlete.nutritionMacros.waterTarget} Liters. Please ensure water compliance before pitch arrival.`
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Trust & Integration Portal</span>
          <h2 className="text-2xl font-outfit font-extrabold text-graphite tracking-tight flex items-center gap-2">
            Parent Portal
          </h2>
        </div>
        
        <div className="flex items-center gap-2 bg-sage/5 border border-sage/10 text-sage px-3 py-1.5 rounded-xl text-xs font-outfit font-bold">
          <ShieldCheck size={14} />
          <span>Active Guardian Link: Sarah Vance</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Academic-Athletic Balance Tracker */}
          <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray flex items-center gap-1">
                  <GraduationCap size={13} className="text-champagne" /> Synergy Metrics
                </span>
                <h3 className="text-sm font-outfit font-bold text-graphite">Academic-Athletic Synergy Balance</h3>
              </div>
              <span className="text-xs font-outfit font-bold text-sage bg-sage/5 px-2.5 py-1 rounded-full border border-sage/10">
                SOCIALLY BALANCED: OPTIMAL
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-oatmeal/20 border border-card-border p-4 rounded-xl flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Academic Performance GPA</span>
                <span className="text-2xl font-outfit font-bold text-graphite mt-2">{(athlete.academicScore / 25).toFixed(2)} / 4.00</span>
                <span className="text-[10px] text-sage font-medium mt-1">GPA tier: Top 10% in Academy</span>
              </div>

              <div className="bg-oatmeal/20 border border-card-border p-4 rounded-xl flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Weekly Dedicated Study</span>
                <span className="text-2xl font-outfit font-bold text-graphite mt-2">{athlete.studyHours} Hours</span>
                <span className="text-[10px] text-slate-gray font-medium mt-1">Study-to-sport balance verified</span>
              </div>

              <div className="bg-oatmeal/20 border border-card-border p-4 rounded-xl flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Sleep Consistency Sync</span>
                <span className="text-2xl font-outfit font-bold text-graphite mt-2">{athlete.sleepEfficiency}%</span>
                <span className="text-[10px] text-sage font-medium mt-1">Excellent neuro-cognitive recovery</span>
              </div>
            </div>
          </div>

          {/* Coach Comments & Communications Feed */}
          <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-outfit font-bold text-graphite flex items-center gap-2 border-b border-card-border pb-4">
              <MessageSquare size={15} className="text-champagne" />
              Coach Communications & Progress Feedback
            </h3>

            <div className="flex flex-col gap-4">
              {coachComments.map((comment, idx) => (
                <div key={idx} className="bg-oatmeal/10 border border-card-border p-4 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-outfit font-bold text-navy">{comment.coach}</span>
                    <span className="text-[10px] font-mono text-slate-gray">{comment.date}</span>
                  </div>
                  <span className="text-xs font-outfit font-bold text-graphite uppercase tracking-wider">{comment.subject}</span>
                  <p className="text-xs text-slate-gray font-sans leading-relaxed mt-1">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Nutrition & Billing */}
        <div className="flex flex-col gap-6">
          
          {/* Nutrition monitoring dashboard */}
          <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray flex items-center gap-2">
              <Apple size={14} className="text-champagne" />
              Daily Dietary Profiles
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 bg-oatmeal/20 rounded-xl border border-card-border">
                <span className="text-xs font-sans text-graphite font-medium">Protein Allocation</span>
                <span className="text-xs font-mono font-bold text-graphite">{athlete.nutritionMacros.protein}g</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-oatmeal/20 rounded-xl border border-card-border">
                <span className="text-xs font-sans text-graphite font-medium">Carbohydrates Allocation</span>
                <span className="text-xs font-mono font-bold text-graphite">{athlete.nutritionMacros.carbs}g</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-oatmeal/20 rounded-xl border border-card-border">
                <span className="text-xs font-sans text-graphite font-medium">Fats Allocation</span>
                <span className="text-xs font-mono font-bold text-graphite">{athlete.nutritionMacros.fats}g</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-oatmeal/20 rounded-xl border border-card-border">
                <span className="text-xs font-sans text-graphite font-medium">Total Calories limit</span>
                <span className="text-xs font-mono font-bold text-navy">{athlete.nutritionMacros.calories} kcal</span>
              </div>
            </div>
          </div>

          {/* Billing & subscriptions controller */}
          <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray flex items-center gap-2">
              <CreditCard size={14} className="text-champagne" />
              Academy Invoicing & Subscriptions
            </h3>

            <div className="flex flex-col gap-3">
              {/* Premium Plan toggle selection */}
              <div className="flex border border-card-border p-1 rounded-xl bg-oatmeal/40">
                <button
                  onClick={() => setActivePlan("standard")}
                  className={`flex-1 text-[9px] font-outfit uppercase tracking-widest font-bold py-1.5 rounded-lg transition-all ${
                    activePlan === "standard" ? "bg-white text-graphite shadow-sm" : "text-slate-gray"
                  }`}
                >
                  Pro $180/mo
                </button>
                <button
                  onClick={() => setActivePlan("elite")}
                  className={`flex-1 text-[9px] font-outfit uppercase tracking-widest font-bold py-1.5 rounded-lg transition-all ${
                    activePlan === "elite" ? "bg-white text-graphite shadow-sm" : "text-slate-gray"
                  }`}
                >
                  Elite $290/mo
                </button>
              </div>

              <div className="bg-oatmeal/20 border border-card-border p-3.5 rounded-xl flex flex-col gap-1.5">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Next Billing Cycle</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-outfit font-bold text-graphite">June 01, 2026</span>
                  <span className="text-sm font-outfit font-bold text-navy">
                    {activePlan === "elite" ? "$290.00" : "$180.00"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowInvoiceAlert(true)}
                className="w-full text-center text-[10px] font-outfit font-bold uppercase tracking-widest border border-card-border hover:bg-oatmeal/20 bg-white text-graphite py-3 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>View Recent Invoices</span>
                <ChevronRight size={11} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Invoice alert modal overlay mock */}
      {showInvoiceAlert && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-card-border max-w-md w-full rounded-2xl p-6 flex flex-col gap-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <span className="text-sm font-outfit font-bold text-graphite uppercase tracking-wide">
                Invoice History
              </span>
              <button
                onClick={() => setShowInvoiceAlert(false)}
                className="text-xs text-slate-gray hover:text-graphite font-outfit font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3.5 bg-oatmeal/20 border border-card-border rounded-xl">
                <div className="flex flex-col">
                  <span className="text-xs font-outfit font-bold text-graphite">May 01, 2026</span>
                  <span className="text-[10px] text-slate-gray">Invoice: #INV-48201</span>
                </div>
                <span className="text-xs font-outfit font-bold text-sage bg-sage/5 px-2.5 py-0.5 rounded border border-sage/10">
                  PAID ($290)
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-oatmeal/20 border border-card-border rounded-xl">
                <div className="flex flex-col">
                  <span className="text-xs font-outfit font-bold text-graphite">April 01, 2026</span>
                  <span className="text-[10px] text-slate-gray">Invoice: #INV-47109</span>
                </div>
                <span className="text-xs font-outfit font-bold text-sage bg-sage/5 px-2.5 py-0.5 rounded border border-sage/10">
                  PAID ($290)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
