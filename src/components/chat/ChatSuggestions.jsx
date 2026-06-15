import React from 'react';

export default function ChatSuggestions({ onSelect, disabled }) {
  const suggestions = [
    "How does this platform work?",
    "Explain risk score",
    "Where is my PDF?",
    "What is a ticker?"
  ];

  return (
    <div className="flex flex-wrap gap-1.5 px-3.5 py-2.5 bg-slate-950/40 border-t border-slate-900/60 shrink-0">
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900 hover:text-white rounded px-2.5 py-1 text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
