import React from 'react';
import { BarChart3, Database, ShieldAlert, LineChart, Cpu, FileCheck } from 'lucide-react';

export default function Methodology() {
  const steps = [
    {
      icon: LineChart,
      title: "TECHNICAL INDICATOR AGGREGATION",
      description: "Aggregates multi-timeframe simple and exponential moving averages, RSI divergence parameters, technical support boundaries, and MACD indicators to establish trend coordinates."
    },
    {
      icon: Database,
      title: "BALANCE SHEET RATIO ANALYSIS",
      description: "Extracts statement of operations, balance sheet, and cash flow items to calculate leverage ratios, margin expansion rates, and earnings quality factors."
    },
    {
      icon: BarChart3,
      title: "STATISTICAL SENTIMENT INDEX",
      description: "Processes public regulatory filings, analyst consensus changes, and financial news volumes to calculate statistical sentiment volatility."
    },
    {
      icon: Cpu,
      title: "QUANTITATIVE VALUATION MODEL",
      description: "Calculates mathematical fair value projections and target prices utilizing discounted cash flow (DCF) models and sector-adjusted enterprise multiples."
    },
    {
      icon: ShieldAlert,
      title: "PROBABILITY RISK MATRIX",
      description: "Evaluates historical portfolio volatility coefficient (beta), financial leverage ratios, and market capitalisation index structures."
    },
    {
      icon: FileCheck,
      title: "REPORT MEMO SYNTHESIS",
      description: "Collates technical parameters, fundamental calculations, and valuation bands into a structured, human-readable analyst memo."
    }
  ];

  return (
    <section id="methodology" className="border-t border-slate-900 bg-slate-950/20 py-20 radial-glow scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[9px] font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
            METRIC ENGINE DESCRIPTION
          </span>
          <h2 className="mt-4 font-outfit text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
            Model Valuation Framework
          </h2>
          <p className="mt-3 text-xs text-slate-500 uppercase tracking-wider max-w-2xl mx-auto">
            A systematic analysis platform structuring market indicators, accounting ledgers, and consensus forecasts into standardized formats.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel rounded p-6 border border-slate-900 hover:border-slate-800 transition-colors flex space-x-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-slate-900 border border-slate-800 text-cyan-450">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] font-bold tracking-wider text-white uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Callouts */}
        <div className="mx-auto mt-12 max-w-4xl rounded glass-panel border border-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-25" />
          <h3 className="font-mono text-[10px] font-bold text-white uppercase relative z-10 tracking-widest">
            ENDPOINT TRANSIT & SECURE PIPELINES
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-[11px] text-slate-500 uppercase tracking-wide leading-relaxed relative z-10">
            Query requests execute an isolated proxy routine: querying local Node.js serverless runtimes, compiling PDF memos, logging entries to Airtable databases, and dispatching report documents.
          </p>
        </div>

      </div>
    </section>
  );
}
