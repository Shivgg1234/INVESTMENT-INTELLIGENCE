import React from 'react';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Legal Disclaimer Block */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/80 p-6 sm:p-8">
          <h4 className="text-xs font-bold tracking-wider text-slate-300 uppercase">
            Regulatory & Risk Disclaimer
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            This analysis is generated for informational and educational purposes only and does not constitute financial, investment, legal or tax advice. Market data and AI-generated analysis may contain errors or become outdated. Users should conduct independent research and consult a qualified financial professional before making investment decisions. Past performance is not indicative of future results. No guaranteed returns are implied or promised.
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-900/60 pt-8 sm:flex-row">
          <div className="flex items-center space-x-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="font-outfit text-sm font-semibold tracking-tight text-white">
              INVESTMENT INTELLIGENCE
            </span>
          </div>
          <div className="mt-4 flex flex-col items-center sm:items-end space-y-1.5 sm:mt-0 text-[11px] font-medium tracking-wide text-slate-600">
            <p>&copy; {new Date().getFullYear()} Investment Intelligence UI. All rights reserved. Built for institutional simulation.</p>
            <p className="font-mono text-[10px]">
              Support:{' '}
              <a href="mailto:rg39405057@gmail.com" className="underline text-slate-450 hover:text-white transition-colors">
                rg39405057@gmail.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
