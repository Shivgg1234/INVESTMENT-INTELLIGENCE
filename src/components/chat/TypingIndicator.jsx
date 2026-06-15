import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3.5">
      <div className="rounded bg-slate-950 border border-slate-900/60 px-3.5 py-3 text-xs text-slate-400 rounded-tl-none flex items-center space-x-1">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
      </div>
    </div>
  );
}
