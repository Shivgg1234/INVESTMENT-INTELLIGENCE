import React from 'react';

export default function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  variant = 'cyan', // 'emerald' | 'amber' | 'red' | 'cyan'
  className = ''
}) {
  // Border and glow colors based on variant
  const borderColors = {
    emerald: 'border-emerald-500/10 shadow-emerald-500/2 hover:border-emerald-500/25',
    amber: 'border-amber-500/10 shadow-amber-500/2 hover:border-amber-500/25',
    red: 'border-red-500/10 shadow-red-500/2 hover:border-red-500/25',
    cyan: 'border-cyan-500/10 shadow-cyan-500/2 hover:border-cyan-500/25'
  };

  const textColors = {
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
    cyan: 'text-cyan-400'
  };

  const glowColors = {
    emerald: 'bg-emerald-500/5',
    amber: 'bg-amber-500/5',
    red: 'bg-red-500/5',
    cyan: 'bg-cyan-500/5'
  };

  return (
    <div className={`glass-panel glass-panel-hover rounded p-4.5 border ${borderColors[variant]} flex flex-col justify-between relative overflow-hidden ${className}`}>
      {/* Subtle background glow */}
      <div className={`absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full blur-xl ${glowColors[variant]}`} />

      <div className="flex items-start justify-between">
        <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded border border-slate-800 bg-slate-900/60 ${textColors[variant]}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className={`font-mono text-xl font-bold tracking-tight text-white block ${textColors[variant]}`}>
          {value}
        </span>
        {subtext && (
          <span className="mt-1 block text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
