"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Trophy, Zap, Shield, Sparkles, TrendingUp, Heart, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface LandingPageProps {
  onEnterDemo: (role: "Coach" | "Athlete" | "Parent") => void;
}

export default function LandingPage({ onEnterDemo }: LandingPageProps) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    {
      quote: "AURA has transformed how we manage our junior Olympic cohorts. By tracking sleep syncs and skeletal mechanical asymmetries in real time, our hamstrings strain rates dropped by 72% in a single season.",
      author: "Coach Patrick Henderson",
      title: "High Performance Director, West Coast Athletics",
      logo: "WCA"
    },
    {
      quote: "Before AURA, parents were in the dark, and athletes felt overreached. Now, the parent dashboard aligns nutrition with workload, and the academic balance tracker ensures they thrive off the field too.",
      author: "Clara Vance",
      title: "Parent of Marcus Vance (Track Champion)",
      logo: "V"
    },
    {
      quote: "F1-style telemetry for high-school players. The tactical strategy board and scouting showcase helped 14 of our graduates secure full NCAA Division I athletic scholarships this year.",
      author: "Director Jean-Luc Rossi",
      title: "Academy Director, Rossi Elite FC",
      logo: "RFC"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen relative overflow-hidden flex flex-col font-sans">
      
      {/* Background grids */}
      <div className="absolute inset-0 f1-grid pointer-events-none opacity-60" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.1),transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square bg-[radial-gradient(ellipse_at_center,rgba(22,36,58,0.03),transparent_70%)] rounded-full pointer-events-none" />

      {/* Luxury Navigation Header */}
      <header className="relative w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between z-40 border-b border-card-border/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-white font-outfit font-extrabold tracking-widest text-sm shadow-md">
            A
          </div>
          <span className="font-outfit font-black uppercase text-base tracking-widest text-graphite flex items-center gap-1.5">
            AURA <span className="text-[10px] font-bold text-champagne bg-navy/5 px-2 py-0.5 rounded border border-card-border">ACADEMY</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-outfit uppercase tracking-widest font-semibold text-slate-gray">
          <a href="#vision" className="hover:text-graphite transition-colors">The Vision</a>
          <a href="#portals" className="hover:text-graphite transition-colors">The Portals</a>
          <a href="#insights" className="hover:text-graphite transition-colors">Biometrics</a>
          <a href="#testimonials" className="hover:text-graphite transition-colors">Success Stories</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onEnterDemo("Coach")}
            className="text-[10px] font-outfit uppercase tracking-widest font-bold border border-card-border hover:bg-white text-graphite px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 bg-white/70 backdrop-blur"
          >
            Coach Access
          </button>
          <button
            onClick={() => onEnterDemo("Athlete")}
            className="text-[10px] font-outfit uppercase tracking-widest font-bold bg-navy hover:bg-navy/90 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            Launch System Demo
          </button>
        </div>
      </header>

      {/* Cinematic Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 z-10 flex flex-col items-center text-center flex-1 justify-center">
        
        {/* Elite telemetry pill */}
        <div className="inline-flex items-center gap-2 bg-white border border-card-border px-3 py-1.5 rounded-full mb-6 shadow-sm">
          <Sparkles size={11} className="text-champagne animate-pulse" />
          <span className="text-[10px] font-outfit uppercase tracking-widest font-bold text-slate-gray">
            FORMULA 1 TELEMETRY FOR ATHLETES
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="font-outfit font-extrabold text-4xl sm:text-6xl md:text-7xl text-graphite tracking-tight leading-[0.95] max-w-5xl">
          REDEFINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-graphite to-navy">ATHLETIC</span> EXCELLENCE.
        </h1>
        
        <p className="mt-8 text-sm sm:text-base text-slate-gray max-w-2xl leading-relaxed font-sans font-light">
          AURA is the ultimate, high-performance monitoring ecosystem built for elite youth sports academies. Seamlessly combining wearable biosensors, active biomechanical motion tracking, and predictive AI injury indicators.
        </p>

        {/* Hero Interactive CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onEnterDemo("Coach")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 text-xs font-outfit uppercase tracking-widest font-bold bg-navy hover:bg-navy/95 text-white px-8 py-4 rounded-xl transition-all shadow-md active:scale-95"
          >
            <span>Launch Coach Command</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => onEnterDemo("Athlete")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 text-xs font-outfit uppercase tracking-widest font-bold bg-white hover:bg-oatmeal/20 text-graphite border border-card-border px-8 py-4 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <span>Athlete Dashboard</span>
          </button>
          <button
            onClick={() => onEnterDemo("Parent")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 text-xs font-outfit uppercase tracking-widest font-bold bg-white hover:bg-oatmeal/20 text-slate-gray border border-card-border px-6 py-4 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <span>Parent Portal</span>
          </button>
        </div>

        {/* F1 Stats Telemetry Row */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mt-20 border-t border-card-border/80 pt-10">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-outfit font-black text-navy">92%</span>
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray mt-2">Target Readiness Sync</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-outfit font-black text-sage">72%</span>
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray mt-2">Strain Mitigation Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-outfit font-black text-champagne">&lt; 90ms</span>
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray mt-2">Contact Time Asymmetry</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-outfit font-black text-amber">14+</span>
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray mt-2">NCAA D1 Signings</span>
          </div>
        </div>
      </section>

      {/* Feature Pillar Showcase */}
      <section id="portals" className="relative max-w-7xl mx-auto px-6 py-20 z-10 border-t border-card-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-champagne font-bold">The Core Ecosystem</span>
            <h2 className="text-3xl font-outfit font-extrabold text-graphite tracking-tight">Three Integrated Portals. One Platform.</h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs text-slate-gray max-w-md leading-relaxed font-sans">
            Fully synchronized data connects coaches on the pitch, athletes on the track, and parents at home. No broken links. Seamless performance transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Coach Command Card */}
          <div className="luxury-card rounded-2xl p-8 flex flex-col justify-between aspect-[3/4] group">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all">
                <Trophy size={16} />
              </div>
              <h3 className="text-xl font-outfit font-extrabold text-graphite mt-4">Coach Command Center</h3>
              <p className="text-xs leading-relaxed text-slate-gray font-sans mt-2">
                A Formula 1 race-engineer style console. Monitor live telemetry feeds, attendance logs, structural workloads, tactical strategy boards, and predictive AI injury alerts.
              </p>
            </div>
            <button
              onClick={() => onEnterDemo("Coach")}
              className="mt-8 flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-widest text-navy group-hover:text-champagne transition-all"
            >
              <span>Explore Coach Portal</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Athlete Hub Card */}
          <div className="luxury-card rounded-2xl p-8 flex flex-col justify-between aspect-[3/4] group">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-white transition-all">
                <Zap size={16} />
              </div>
              <h3 className="text-xl font-outfit font-extrabold text-graphite mt-4">Athlete Telemetry</h3>
              <p className="text-xs leading-relaxed text-slate-gray font-sans mt-2">
                Personal biological tracking dashboard. Combines HRV sleep synchronization, recovery markers, sprint splits, reactive agility metrics, and dynamic goal checklists.
              </p>
            </div>
            <button
              onClick={() => onEnterDemo("Athlete")}
              className="mt-8 flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-widest text-champagne group-hover:text-graphite transition-all"
            >
              <span>Explore Athlete Hub</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Parent Portal Card */}
          <div className="luxury-card rounded-2xl p-8 flex flex-col justify-between aspect-[3/4] group">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all">
                <Shield size={16} />
              </div>
              <h3 className="text-xl font-outfit font-extrabold text-graphite mt-4">Parent Progress</h3>
              <p className="text-xs leading-relaxed text-slate-gray font-sans mt-2">
                A warm, trustworthy portal prioritizing complete physical integrity. Monitor school-sport study hours, nutritional guidelines, daily hydration targets, and custom billing controls.
              </p>
            </div>
            <button
              onClick={() => onEnterDemo("Parent")}
              className="mt-8 flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-widest text-sage group-hover:text-champagne transition-all"
            >
              <span>Explore Parent Portal</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="relative w-full max-w-7xl mx-auto px-6 py-20 z-10 border-t border-card-border bg-[#F3EFE9]/40 rounded-3xl mb-16 overflow-hidden">
        <div className="absolute inset-0 f1-grid pointer-events-none opacity-40" />
        
        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto gap-6 z-10">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-champagne font-bold">Trusted Globally</span>
          
          <div className="relative min-h-[160px] flex items-center justify-center">
            <p className="text-sm sm:text-base text-graphite italic font-light leading-relaxed font-sans">
              "{testimonials[testimonialIdx].quote}"
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-outfit font-bold text-graphite">{testimonials[testimonialIdx].author}</span>
            <span className="text-[10px] text-slate-gray font-sans uppercase mt-0.5">{testimonials[testimonialIdx].title}</span>
          </div>

          {/* Testimonial Nav buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-8 h-8 rounded-full border border-card-border bg-white flex items-center justify-center hover:bg-oatmeal text-graphite transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
              className="w-8 h-8 rounded-full border border-card-border bg-white flex items-center justify-center hover:bg-oatmeal text-graphite transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="w-full border-t border-card-border bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-navy flex items-center justify-center text-white font-outfit font-black text-xs">
              A
            </div>
            <span className="text-xs font-outfit font-extrabold uppercase tracking-wider text-graphite">AURA Athletics Inc.</span>
          </div>

          <span className="text-[10px] font-sans text-slate-gray">
            © 2026 AURA Athletics. Developed for premium Academy demonstrations. All rights reserved.
          </span>

          <div className="flex items-center gap-4 text-[10px] font-sans text-slate-gray">
            <a href="#" className="hover:text-graphite transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-graphite transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
