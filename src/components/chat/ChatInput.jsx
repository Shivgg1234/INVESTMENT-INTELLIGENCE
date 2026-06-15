import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSend, loading, placeholder = "Type your message..." }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea to fit text rows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading) {
      onSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2 border-t border-slate-900 bg-slate-950 p-3">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder={loading ? "Waiting for system thread..." : placeholder}
          className="w-full bg-slate-900/60 border border-slate-900 text-slate-100 rounded py-2 pl-3 pr-3 text-xs focus:ring-1 focus:ring-cyan-500/30 transition-colors placeholder-slate-600 outline-none resize-none min-h-[36px] overflow-y-auto"
          aria-label="Chat input message"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="flex h-9 w-9 items-center justify-center rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
