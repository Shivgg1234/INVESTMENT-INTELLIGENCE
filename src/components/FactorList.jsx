import React from 'react';
import { CheckCircle2, AlertOctagon, Lightbulb, AlertTriangle } from 'lucide-react';

export default function FactorList({ 
  bullCase = [], 
  bearCase = [], 
  opportunities = [], 
  risks = [] 
}) {
  const hasBull = Array.isArray(bullCase) && bullCase.length > 0;
  const hasBear = Array.isArray(bearCase) && bearCase.length > 0;
  const hasOpportunities = Array.isArray(opportunities) && opportunities.length > 0;
  const hasRisks = Array.isArray(risks) && risks.length > 0;

  return (
    <div className="space-y-8">
      {/* Panel 1: Bull Case vs Bear Case */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bull Case */}
        <div className="glass-panel border border-emerald-500/10 rounded p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/2 rounded-full blur-xl" />
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
              STRATEGIC ACCUMULATION DRIVERS (BULL CASE)
            </h3>
          </div>
          
          {hasBull ? (
            <ul className="space-y-3">
              {bullCase.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-350 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No factors were returned for this section.</p>
          )}
        </div>

        {/* Bear Case */}
        <div className="glass-panel border border-red-500/10 rounded p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-red-500/2 rounded-full blur-xl" />
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="p-1.5 rounded bg-red-950/60 border border-red-800/40 text-red-400">
              <AlertOctagon className="h-4 w-4" />
            </div>
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-red-400 uppercase">
              STRATEGIC DEPRECIATION VECTORS (BEAR CASE)
            </h3>
          </div>

          {hasBear ? (
            <ul className="space-y-3">
              {bearCase.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-350 leading-relaxed">
                  <AlertOctagon className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No factors were returned for this section.</p>
          )}
        </div>
      </div>

      {/* Panel 2: Key Opportunities vs Key Risks */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Key Opportunities */}
        <div className="glass-panel border border-cyan-500/10 rounded p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-cyan-500/2 rounded-full blur-xl" />
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="p-1.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
              GROWTH CATALYSTS (OPPORTUNITIES)
            </h3>
          </div>

          {hasOpportunities ? (
            <ul className="space-y-3">
              {opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-350 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No factors were returned for this section.</p>
          )}
        </div>

        {/* Key Risks */}
        <div className="glass-panel border border-amber-500/10 rounded p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-amber-500/2 rounded-full blur-xl" />
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="p-1.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-amber-400 uppercase">
              EXPOSURE RISK THRESHOLDS (RISKS)
            </h3>
          </div>

          {hasRisks ? (
            <ul className="space-y-3">
              {risks.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-355 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No factors were returned for this section.</p>
          )}
        </div>
      </div>
    </div>
  );
}
