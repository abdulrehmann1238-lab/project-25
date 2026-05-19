"use client";

import React, { useState } from "react";
import { mockMessages } from "@/lib/mockData";
import { MessageSquare, Bell, Settings, Send, User, CheckCircle2, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";

export default function Utilities() {
  const [activeTab, setActiveTab] = useState("messages");
  const [inboxMessages, setInboxMessages] = useState(mockMessages);
  const [activeMessage, setActiveMessage] = useState(mockMessages[0]);
  const [replyText, setReplyText] = useState("");

  const handleSelectMessage = (msg) => {
    setActiveMessage(msg);
    setInboxMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
    );
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    // Add reply message mock
    const newMsg = {
      id: `msg-reply-${Date.now()}`,
      sender: "You (Admin)",
      role: "Coach",
      avatar: "AD",
      content: replyText,
      timestamp: "Just Now",
      read: true
    };
    
    setReplyText("");
    alert("Reply dispatched securely to recipient.");
  };

  // Mock Notifications list
  const notifications = [
    {
      id: "n-1",
      title: "Biological baseline sync complete",
      desc: "WHOOP Strap 4.0 successfully transferred sleep, HRV, and strain epochs.",
      time: "10 mins ago",
      type: "success"
    },
    {
      id: "n-2",
      title: "Overload alert restriction triggered",
      desc: "Distal hamstring asymmetry of +8% ground contact forces registered for Elena Rostova.",
      time: "2 hours ago",
      type: "warning"
    },
    {
      id: "n-3",
      title: "Hydration target corrected",
      desc: "Dr. Clara Mercer updated daily water targets to 4.2 Liters for elite sprinters.",
      time: "Yesterday",
      type: "info"
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">System Utilities</span>
          <h2 className="text-2xl font-outfit font-extrabold text-graphite tracking-tight flex items-center gap-2">
            Messaging & Configuration
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-oatmeal/60 border border-card-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("messages")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "messages" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            <MessageSquare size={12} />
            Messages Inbox
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "notifications" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            <Bell size={12} />
            System Notifications
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-[10px] font-outfit uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "settings" ? "bg-white text-graphite shadow-sm" : "text-slate-gray hover:text-graphite"
            }`}
          >
            <Settings size={12} />
            Academy Settings
          </button>
        </div>
      </div>

      {activeTab === "messages" && (
        <div className="grid md:grid-cols-3 gap-6 bg-white border border-card-border rounded-2xl p-6 shadow-sm aspect-[4/3] max-h-[500px]">
          
          {/* Inbox list */}
          <div className="md:col-span-1 border-r border-card-border pr-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">Active Chats</span>
            
            <div className="flex flex-col gap-2">
              {inboxMessages.map((msg) => {
                const isActive = msg.id === activeMessage.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all ${
                      isActive
                        ? "bg-oatmeal/40 border-champagne"
                        : "bg-white border-card-border hover:bg-oatmeal/20"
                    } flex items-start gap-3 relative`}
                  >
                    {!msg.read && (
                      <span className="absolute top-3 right-3 w-2 h-2 bg-champagne rounded-full" />
                    )}
                    <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-outfit font-black text-xs shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-outfit font-bold text-graphite truncate">{msg.sender}</span>
                      <span className="text-[9px] text-slate-gray uppercase font-mono mt-0.5">{msg.role}</span>
                      <p className="text-[10px] text-slate-gray truncate mt-1 leading-normal font-sans">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Reader Stage */}
          <div className="md:col-span-2 pl-2 flex flex-col justify-between h-full overflow-hidden">
            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar flex-1 pb-4">
              <div className="flex justify-between items-center border-b border-card-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-outfit font-black text-sm">
                    {activeMessage.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-outfit font-bold text-graphite">{activeMessage.sender}</span>
                    <span className="text-[9px] text-slate-gray font-mono">{activeMessage.role} Link Secured</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-gray">{activeMessage.timestamp}</span>
              </div>

              <div className="bg-oatmeal/20 border border-card-border p-4 rounded-xl text-xs leading-relaxed text-graphite font-sans">
                {activeMessage.content}
              </div>
            </div>

            {/* Reply input */}
            <div className="flex gap-2 border-t border-card-border pt-4 mt-auto">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Secure reply to ${activeMessage.sender}...`}
                className="flex-1 text-xs px-4 py-3 bg-oatmeal/20 rounded-xl border border-card-border focus:ring-0 focus:outline-none"
              />
              <button
                onClick={handleSendReply}
                className="bg-navy hover:bg-navy/95 text-white p-3 rounded-xl active:scale-95 transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col gap-1 border-b border-card-border pb-4 mb-2">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">System Logger</span>
            <h3 className="text-sm font-outfit font-bold text-graphite">Real-time Warning logs</h3>
          </div>

          <div className="flex flex-col gap-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                  notif.type === "warning"
                    ? "bg-crimson/5 border-crimson/10 text-crimson"
                    : notif.type === "success"
                    ? "bg-sage/5 border-sage/10 text-sage"
                    : "bg-oatmeal/30 border-card-border text-graphite"
                }`}
              >
                <div className="mt-0.5">
                  <Bell size={15} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-outfit font-bold uppercase tracking-wider">{notif.title}</span>
                  <p className="text-[11px] text-slate-gray font-sans leading-relaxed">{notif.desc}</p>
                  <span className="text-[9px] text-slate-gray/80 font-mono mt-1">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-card-border pb-4">
            <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Global Configurations</span>
            <h3 className="text-sm font-outfit font-bold text-graphite">Academy Settings</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">
                Integration Options
              </span>
              
              <div className="flex justify-between items-center p-4 bg-oatmeal/20 border border-card-border rounded-xl">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-outfit font-bold text-graphite">BLE Secure Key Syncing</span>
                  <span className="text-[10px] text-slate-gray">Restrict wearable search protocols to secured local networks.</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-champagne border-card-border focus:ring-0 cursor-pointer accent-champagne"
                />
              </div>

              <div className="flex justify-between items-center p-4 bg-oatmeal/20 border border-card-border rounded-xl">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-outfit font-bold text-graphite">Asymmetry Automatic Warning</span>
                  <span className="text-[10px] text-slate-gray">Trigger high-risk alerts if vector displacement exceeds 5%.</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-champagne border-card-border focus:ring-0 cursor-pointer accent-champagne"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray font-bold">
                Academy Admin Details
              </span>

              <div className="flex flex-col bg-oatmeal/10 border border-card-border p-4 rounded-xl gap-2">
                <div className="flex items-center gap-2 text-xs font-outfit font-bold text-graphite">
                  <User size={13} className="text-champagne" />
                  <span>Academy Profile: West Coast Sports Academy</span>
                </div>
                <span className="text-[10px] text-slate-gray">License Type: Pro Development Tier</span>
                <span className="text-[10px] text-slate-gray">Connected Cohorts: 4 Squads (38 Athletes)</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
