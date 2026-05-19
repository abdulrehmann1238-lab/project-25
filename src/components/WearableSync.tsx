"use client";

import React, { useState, useEffect } from "react";
import { Bluetooth, RefreshCw, CheckCircle2, AlertCircle, Watch, Smartphone } from "lucide-react";
import canvasConfetti from "canvas-confetti";

interface WearableSyncProps {
  onSyncComplete: (hrv: number, rhr: number, sleep: number) => void;
  isSynced: boolean;
}

interface Device {
  id: string;
  name: string;
  type: "watch" | "strap" | "band";
  signalStrength: number;
}

export default function WearableSync({ onSyncComplete, isSynced }: WearableSyncProps) {
  const [status, setStatus] = useState<"idle" | "searching" | "connecting" | "syncing" | "completed">("idle");
  const [foundDevices, setFoundDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  // Simulate device searching
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (status === "searching") {
      timeout = setTimeout(() => {
        setFoundDevices([
          { id: "wp-4", name: "WHOOP Strap 4.0", type: "band", signalStrength: 98 },
          { id: "aw-u", name: "Apple Watch Ultra 2", type: "watch", signalStrength: 84 },
          { id: "gm-f", name: "Garmin Forerunner 965", type: "watch", signalStrength: 72 }
        ]);
        setStatus("idle");
        // Open device selection
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  // Simulate syncing process
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "syncing") {
      setSyncProgress(0);
      setSyncLogs(["[03:15:20] Initializing BLE secured handshake...", "[03:15:21] Querying local epoch data indexes..."]);

      const logTemplates = [
        "[03:15:22] Pulling HRV night sample intervals...",
        "[03:15:23] Parsing Slow Wave sleep delta sequences...",
        "[03:15:24] Calibrating 7-day baseline deviations...",
        "[03:15:25] Extracting active workout strain values...",
        "[03:15:26] Data integrity verification: SUCCESS."
      ];

      interval = setInterval(() => {
        setSyncProgress((prev) => {
          const next = prev + 20;

          // Add staggered logs based on progress
          const logIdx = Math.floor(next / 20) - 1;
          if (logTemplates[logIdx]) {
            setSyncLogs((l) => [...l, logTemplates[logIdx]]);
          }

          if (next >= 100) {
            clearInterval(interval);
            setStatus("completed");
            
            // Fire premium confetti celebration!
            canvasConfetti({
              particleCount: 100,
              spread: 60,
              origin: { y: 0.8 },
              colors: ["#C5A880", "#16243A", "#5A7E64", "#D4AF37"]
            });

            // Trigger parent event to update global metrics
            // Confers optimal values
            setTimeout(() => {
              onSyncComplete(94, 44, 95);
            }, 1000);
            return 100;
          }
          return next;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [status, onSyncComplete]);

  const startSearch = () => {
    setStatus("searching");
    setSelectedDevice(null);
    setFoundDevices([]);
    setSyncLogs([]);
  };

  const connectAndSync = (device: Device) => {
    setSelectedDevice(device);
    setStatus("syncing");
  };

  return (
    <div className="w-full bg-white border border-card-border rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Wearable Sync Controller</span>
          <h3 className="text-lg font-outfit font-bold text-graphite flex items-center gap-2">
            Sensor Integration Suite
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isSynced || status === "completed" ? (
            <span className="bg-sage/10 text-sage text-[10px] font-outfit font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
              INTEGRATION COMPLETED
            </span>
          ) : (
            <span className="bg-amber/10 text-amber text-[10px] font-outfit font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-amber rounded-full" />
              PENDING TELEMETRY SYNC
            </span>
          )}
        </div>
      </div>

      {status === "idle" && foundDevices.length === 0 && !isSynced && (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-4 bg-oatmeal/20 rounded-xl border border-dashed border-card-border">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-card-border shadow-sm text-champagne">
            <Bluetooth size={20} />
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <h4 className="text-sm font-outfit font-bold text-graphite">No active sensor link</h4>
            <p className="text-xs text-slate-gray font-sans leading-relaxed">
              Scan for nearby low-energy Bluetooth sensors (WHOOP 4.0, Apple Watch, Garmin) to sync physiological trends and readiness indices.
            </p>
          </div>
          <button
            onClick={startSearch}
            className="flex items-center gap-2 text-xs font-outfit font-bold uppercase tracking-wider bg-navy hover:bg-navy/90 text-white px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm"
          >
            <Bluetooth size={14} />
            Search for BLE Sensors
          </button>
        </div>
      )}

      {status === "searching" && (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-5 bg-oatmeal/20 rounded-xl border border-card-border">
          {/* Pulsing Bluetooth Scanner */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-champagne/10 rounded-full animate-ping" />
            <div className="absolute inset-2 bg-champagne/20 rounded-full animate-pulse" />
            <div className="relative w-10 h-10 bg-white rounded-full border border-card-border flex items-center justify-center text-champagne shadow-sm">
              <Bluetooth size={18} className="animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-outfit font-bold text-graphite">Scanning BLE Frequencies...</h4>
            <p className="text-xs text-slate-gray font-sans">Locating active biosensors in close proximity.</p>
          </div>
        </div>
      )}

      {status === "idle" && foundDevices.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-slate-gray">Found Devices</span>
          <div className="grid gap-2">
            {foundDevices.map((device) => (
              <div
                key={device.id}
                onClick={() => connectAndSync(device)}
                className="flex items-center justify-between p-4 bg-white border border-card-border rounded-xl hover:border-champagne hover:bg-oatmeal/10 cursor-pointer transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-oatmeal flex items-center justify-center text-slate-gray group-hover:bg-champagne group-hover:text-white transition-all">
                    {device.type === "watch" ? <Watch size={16} /> : <Smartphone size={16} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-outfit font-bold text-graphite">{device.name}</span>
                    <span className="text-[10px] text-slate-gray font-mono">ID: {device.id.toUpperCase()}-SECURE</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-outfit text-sage bg-sage/5 px-2 py-0.5 rounded border border-sage/10">
                    Signal: {device.signalStrength}%
                  </span>
                  <button className="text-[10px] font-outfit font-bold uppercase tracking-wider text-champagne group-hover:text-graphite transition-all">
                    Connect & Sync
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "syncing" && selectedDevice && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center bg-oatmeal/30 p-3 rounded-xl border border-card-border">
            <div className="flex items-center gap-2">
              <Watch size={15} className="text-slate-gray" />
              <span className="text-xs font-outfit font-bold text-graphite">{selectedDevice.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-gray">
              <RefreshCw size={12} className="animate-spin" />
              Syncing {syncProgress}%
            </div>
          </div>

          {/* Sync Progress Bar */}
          <div className="w-full h-2 bg-oatmeal rounded-full overflow-hidden">
            <div
              className="h-full bg-champagne transition-all duration-700 ease-out"
              style={{ width: `${syncProgress}%` }}
            />
          </div>

          {/* Staggered Sync Terminal Logs */}
          <div className="bg-graphite text-white font-mono text-[10px] p-4 rounded-xl max-h-36 overflow-y-auto flex flex-col gap-1.5 border border-slate-700 shadow-inner">
            {syncLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-1">
                <span className="text-champagne font-bold">&gt;</span>
                <span className="leading-relaxed opacity-95">{log}</span>
              </div>
            ))}
            <div className="w-1.5 h-3 bg-white/70 animate-pulse mt-0.5" />
          </div>
        </div>
      )}

      {(status === "completed" || isSynced) && (
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center gap-4 bg-sage/5 rounded-xl border border-sage/10">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-sage/10 shadow-sm text-sage">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <h4 className="text-sm font-outfit font-bold text-graphite">Telemetry Synchronized Successfully</h4>
            <p className="text-xs text-slate-gray font-sans">
              All biological metrics (HRV: 94ms, RHR: 44bpm, Sleep: 95%) have updated from {selectedDevice?.name || "WHOOP Strap 4.0"}. Active athlete baseline updated.
            </p>
          </div>
          <button
            onClick={startSearch}
            className="flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-wider border border-card-border bg-white hover:bg-oatmeal text-graphite px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <RefreshCw size={11} />
            Re-sync Device
          </button>
        </div>
      )}
    </div>
  );
}
