import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

const stages = [
  "Initializing API server handshake",
  "Aggregating historical ticker price candles",
  "Computing moving averages and technical indicators",
  "Parsing fundamental balance sheet ratios",
  "Compiling relative valuation multiple models",
  "Synthesizing quantitative ledger matrices",
  "Dispatching research report to mail drop"
];

export default function ProcessingState() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    // Cycle through stages progressively.
    // Total duration is expected to be around 5 - 45s depending on server.
    // We increment the stage index every 4.5 seconds up to index 6.
    const interval = setInterval(() => {
      setCurrentStageIdx((prevIdx) => {
        if (prevIdx < stages.length - 1) {
          return prevIdx + 1;
        }
        return prevIdx;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-lg rounded glass-panel border border-cyan-500/15 p-8 text-center relative overflow-hidden my-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Dynamic radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Main loading animated indicator */}
      <div className="flex justify-center mb-6">
        <div className="relative flex h-14 w-14 items-center justify-center rounded bg-cyan-950/20 border border-cyan-500/30">
          <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
        </div>
      </div>

      <h3 className="font-outfit text-sm font-bold text-white tracking-widest uppercase">
        COMPILING QUANTITATIVE DATA LEDGER
      </h3>
      <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-wider">
        System projection runtime &lt; 60 seconds. Do not interrupt thread.
      </p>

      {/* Stage Progression Checklist */}
      <div className="mt-8 space-y-3.5 text-left max-w-sm mx-auto">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIdx;
          const isActive = idx === currentStageIdx;
          
          return (
            <div 
              key={idx} 
              className={`flex items-center space-x-3.5 transition-all duration-300 ${
                isCompleted 
                  ? 'opacity-60 text-slate-400' 
                  : isActive 
                    ? 'opacity-100 text-cyan-400 font-medium scale-[1.01]' 
                    : 'opacity-25 text-slate-600'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
              ) : isActive ? (
                <div className="relative flex h-4.5 w-4.5 items-center justify-center shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-30"></span>
                  <Loader2 className="h-4.5 w-4.5 animate-spin text-cyan-400" />
                </div>
              ) : (
                <Circle className="h-4.5 w-4.5 text-slate-700 shrink-0" />
              )}
              <span className="text-xs uppercase tracking-wider font-semibold">
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
