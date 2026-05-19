"use client";

import React, { useState } from "react";
import { ShieldCheck, BookOpen, Coffee, CreditCard, ChevronRight, Apple, Activity } from "lucide-react";

export default function ParentDashboard({ athlete }) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: "inv-204", date: "May 10, 2026", desc: "Q2 Elite Cohort Training Fee", amount: 1200, status: "Paid" },
    { id: "inv-198", date: "April 02, 2026", desc: "Wearable Sync Subscription & BLE Lease", amount: 85, status: "Paid" },
    { id: "inv-182", date: "Jan 12, 2026", desc: "F1 Biomechanical Scan & Skeletal Analysis", amount: 250, status: "Paid" }
  ];

  const triggerInvoiceModal = (inv) => {
    setSelectedInvoice(inv);
    setShowInvoiceModal(true);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Guardian Portal</span>
          <h2 className="text-2xl font-outfit font-extrabold text-graphite tracking-tight flex items-center gap-2">
            Parent Progress Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-outfit text-slate-gray bg-white border border-card-border px-3.5 py-2 rounded-xl shadow-sm">
          <ShieldCheck size={14} className="text-sage" />
          <span>Parent Identity Verified: Sarah Vance</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Academic Balance & Nutritional Intake */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Academic-Athletic Balance Block */}
          <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray flex items-center gap-1">
                  <BookOpen size={13} className="text-champagne" /> Academic Co-Curricular Balance
                </span>
                <h3 className="text-sm font-outfit font-bold text-graphite">Weekly Educational Integration</h3>
              </div>
              <span className="text-xs font-mono font-bold text-sage bg-sage/5 px-2 py-0.5 rounded border border-sage/10">
                GPALIMITS CLEAR
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col bg-oatmeal/20 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Academic Score</span>
                <span className="text-3xl font-outfit font-bold text-graphite mt-2">{athlete.academicScore}%</span>
                <span className="text-[10px] text-sage font-medium mt-1">GPA equivalent: 3.84 / 4.0</span>
              </div>

              <div className="flex flex-col bg-oatmeal/20 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Study Hours depth</span>
                <span className="text-3xl font-outfit font-bold text-graphite mt-2">{athlete.studyHours} hrs/wk</span>
                <span className="text-[10px] text-slate-gray font-medium mt-1">Meets target study hours</span>
              </div>

              <div className="flex flex-col bg-oatmeal/20 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Mental Balance index</span>
                <span className="text-3xl font-outfit font-bold text-graphite mt-2">{athlete.socialScore}%</span>
                <span className="text-[10px] text-sage font-medium mt-1">Excellent mood baseline</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-gray font-sans leading-relaxed">
              Academic load metrics are combined with daily training strain inputs to maintain athletic balance. If sleep levels fall or workload spikes, educational study plans automatically scale down impact guidelines.
            </p>
          </div>

          {/* Macro Nutrition board */}
          <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray flex items-center gap-1">
                  <Apple size={13} className="text-champagne" /> Macro Nutrition Intake
                </span>
                <h3 className="text-sm font-outfit font-bold text-graphite">Daily Fuel Targets</h3>
              </div>
              <span className="text-xs font-mono font-bold text-graphite bg-oatmeal px-2 py-0.5 rounded border border-card-border">
                {athlete.nutritionMacros.calories} KCAL
              </span>
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              <div className="flex flex-col bg-oatmeal/10 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Protein</span>
                <span className="text-xl font-outfit font-bold text-graphite mt-1">{athlete.nutritionMacros.protein} g</span>
                <div className="w-full bg-oatmeal h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-navy h-full" style={{ width: "85%" }} />
                </div>
              </div>

              <div className="flex flex-col bg-oatmeal/10 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Carbs</span>
                <span className="text-xl font-outfit font-bold text-graphite mt-1">{athlete.nutritionMacros.carbs} g</span>
                <div className="w-full bg-oatmeal h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-navy h-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="flex flex-col bg-oatmeal/10 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Fats</span>
                <span className="text-xl font-outfit font-bold text-graphite mt-1">{athlete.nutritionMacros.fats} g</span>
                <div className="w-full bg-oatmeal h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-navy h-full" style={{ width: "75%" }} />
                </div>
              </div>

              <div className="flex flex-col bg-oatmeal/10 border border-card-border p-4 rounded-xl">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Water Intake</span>
                <span className="text-xl font-outfit font-bold text-graphite mt-1">{athlete.nutritionMacros.waterIntake} L</span>
                <div className="w-full bg-oatmeal h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-sage h-full" style={{ width: `${(athlete.nutritionMacros.waterIntake / athlete.nutritionMacros.waterTarget) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Billing & Subscriptions */}
        <div className="flex flex-col gap-6">
          
          {/* Subscriptions Status */}
          <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray flex items-center gap-2">
              <CreditCard size={14} className="text-champagne" />
              Active Academy Plans
            </h3>

            <div className="bg-oatmeal/20 p-4 rounded-xl border border-card-border flex flex-col gap-2">
              <span className="text-[9px] font-outfit uppercase tracking-widest text-slate-gray">PLAN LEVEL</span>
              <span className="text-sm font-outfit font-bold text-graphite">U-18 Elite Scouting Premium Package</span>
              <span className="text-lg font-outfit font-bold text-navy mt-1">$1,200 <span className="text-xs text-slate-gray font-normal">/ Quarter</span></span>
              
              <div className="border-t border-card-border/60 mt-3 pt-3 flex justify-between items-center text-[10px] text-slate-gray font-mono">
                <span>Renew Date: June 15, 2026</span>
                <span className="text-sage font-bold font-outfit uppercase tracking-widest">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Invoicing Logs */}
          <div className="bg-white border border-card-border rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-slate-gray mb-4 flex items-center gap-2">
              Invoicing & Transactions
            </h3>

            <div className="flex flex-col gap-2">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => triggerInvoiceModal(inv)}
                  className="flex items-center justify-between p-3 bg-white hover:bg-oatmeal/20 border border-card-border rounded-xl cursor-pointer transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-slate-gray">{inv.date}</span>
                    <span className="text-xs font-outfit font-bold text-graphite mt-0.5">{inv.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-outfit font-bold text-graphite">${inv.amount}</span>
                    <ChevronRight size={12} className="text-slate-gray group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Invoice receipt Modal overlay */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-graphite/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-card-border shadow-xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-start border-b border-card-border pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Transaction Invoice</span>
                <h3 className="text-lg font-outfit font-bold text-graphite mt-1">{selectedInvoice.id}</h3>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-xs text-slate-gray hover:text-graphite font-outfit font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-slate-gray">Date Issued:</span>
                <span className="text-graphite font-bold">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-gray">Description:</span>
                <span className="text-graphite font-bold text-right">{selectedInvoice.desc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-gray">Billing Entity:</span>
                <span className="text-graphite font-bold">AURA Athletics Inc.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-gray">Payment Method:</span>
                <span className="text-graphite font-bold">Visa ending in 4242</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-card-border pt-3 mt-1">
                <span className="text-graphite font-bold">Amount Paid:</span>
                <span className="text-base font-outfit font-extrabold text-navy">${selectedInvoice.amount}.00</span>
              </div>
            </div>

            <button
              onClick={() => setShowInvoiceModal(false)}
              className="w-full text-center bg-navy hover:bg-navy/90 text-white font-outfit font-bold uppercase tracking-wider text-xs py-3 rounded-xl transition-all"
            >
              Print Receipt Log
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
