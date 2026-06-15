import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ChatButton({ onClick, visible, hasNeverOpened }) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`fixed right-4 bottom-4 z-40 flex items-center space-x-2.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase py-2.5 px-4 shadow-lg shadow-cyan-950/30 transition-all select-none cursor-pointer ${
        hasNeverOpened 
          ? 'before:absolute before:inset-0 before:rounded before:border-2 before:border-cyan-400 before:animate-ping before:opacity-75' 
          : ''
      }`}
      aria-label="Open support chat panel"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      <span>Need help?</span>
    </button>
  );
}
