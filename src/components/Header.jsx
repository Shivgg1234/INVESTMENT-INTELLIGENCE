import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function Header({ hasDashboard, onReset }) {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-outfit text-base font-bold tracking-wider text-white sm:text-lg">
                INVESTMENT INTELLIGENCE
              </span>
              <span className="hidden rounded bg-slate-900 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-cyan-400 border border-slate-800/60 uppercase sm:inline-block">
                QUANTITATIVE RESEARCH PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <a
            href="#analyze"
            onClick={(e) => handleNavClick(e, 'analyze')}
            className="text-xs font-semibold tracking-wider uppercase text-slate-400 transition-colors hover:text-white"
          >
            Analyze
          </a>
          
          {hasDashboard && (
            <a
              href="#dashboard"
              onClick={(e) => handleNavClick(e, 'dashboard')}
              className="text-xs font-semibold tracking-wider uppercase text-slate-400 transition-colors hover:text-white"
            >
              Dashboard
            </a>
          )}

          <a
            href="#methodology"
            onClick={(e) => handleNavClick(e, 'methodology')}
            className="text-xs font-semibold tracking-wider uppercase text-slate-400 transition-colors hover:text-white"
          >
            Methodology
          </a>

          {/* Engine Status Indicator */}
          <div className="hidden items-center space-x-2 rounded border border-slate-800/80 bg-slate-900/50 px-2.5 py-1 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-widest text-slate-400 uppercase">
              ENGINE STATUS: OPERATIONAL
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
