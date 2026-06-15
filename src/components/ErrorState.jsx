import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  // Sanitize the message: ensure we don't display sensitive server configs or URLs
  const sanitizeMessage = (msg) => {
    if (!msg) return 'An unexpected error occurred during research generation.';
    
    const containsSensitiveText = 
      msg.includes('http') || 
      msg.includes('N8N_') || 
      msg.includes('Webhook') || 
      msg.includes('stack') || 
      msg.includes('Internal Server Error');
      
    if (containsSensitiveText) {
      return 'The analysis engine could not complete the query. Please verify that the stock ticker is valid and exists on major exchanges.';
    }
    return msg;
  };

  const displayMessage = sanitizeMessage(message);

  return (
    <div className="mx-auto max-w-lg rounded glass-panel border border-red-500/15 p-8 text-center relative overflow-hidden my-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Background glow red */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-red-500/5 blur-3xl" />

      <div className="flex justify-center mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded bg-red-950/20 border border-red-500/30 text-red-400">
          <AlertOctagon className="h-7 w-7" />
        </div>
      </div>

      <h3 className="font-outfit text-sm font-bold text-white tracking-widest uppercase">
        Analysis Execution Failed
      </h3>
      <p className="mt-4 text-xs leading-relaxed text-slate-405 max-w-md mx-auto">
        {displayMessage}
      </p>

      <div className="mt-8 flex flex-col items-center space-y-4 justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center space-x-2 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-white font-bold text-xs py-2.5 px-6 shadow transition-all cursor-pointer font-mono"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>TRY AGAIN</span>
        </button>

        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
          Still having trouble? Email{' '}
          <a href="mailto:rg39405057@gmail.com" className="underline text-cyan-400">
            rg39405057@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
