import React from 'react';
import { 
  LineChart, 
  Database, 
  Layers, 
  ShieldAlert, 
  Mail, 
  FileSpreadsheet 
} from 'lucide-react';
import AnalysisForm from './AnalysisForm';

export default function Hero({ onSubmit, loading, error, clearError, lastInput }) {
  const badges = [
    { icon: LineChart, label: "Technical indicator aggregation" },
    { icon: Database, label: "Balance sheet ratio analysis" },
    { icon: Layers, label: "Statistical sentiment index" },
    { icon: ShieldAlert, label: "Quantitative valuation models" },
    { icon: Mail, label: "Automated report delivery" },
    { icon: FileSpreadsheet, label: "Systematic database history" }
  ];

  return (
    <section id="analyze" className="relative py-20 lg:py-24 radial-glow overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Badges */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/30">
                SYSTEM OPERATIONAL
              </span>
              <h1 className="mt-4 font-outfit text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                Systematic equity research <br />
                <span className="text-cyan-400">
                  compiled in real-time.
                </span>
              </h1>
              <p className="mt-6 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                Aggregate technical indicators, historical balance sheets, news sentiment volumes, and mathematical valuation models into unified analytical memos.
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center space-x-2.5 rounded border border-slate-900 bg-slate-950/50 p-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-950/50 border border-cyan-800/40 text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-5">
            <div className="glass-panel border border-slate-800/60 rounded-xl p-6 sm:p-8 relative">
              {/* Card outline subtle highlight */}
              <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              
              <h2 className="font-outfit text-sm font-bold tracking-widest text-white uppercase border-b border-slate-800/60 pb-3 mb-6">
                Query Security Database
              </h2>
              
              <AnalysisForm 
                onSubmit={onSubmit} 
                loading={loading} 
                error={error}
                clearError={clearError}
                lastInput={lastInput}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
