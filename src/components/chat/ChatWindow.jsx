import React, { useRef, useEffect } from 'react';
import { Minus, X, Minimize2, Maximize2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatSuggestions from './ChatSuggestions';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({
  isOpen,
  onClose,
  isMinimized,
  onMinimizeToggle,
  messages,
  input,
  onInputChange,
  onSend,
  loading,
  error
}) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed right-4 bottom-4 z-50 flex flex-col glass-panel border border-slate-900 shadow-2xl transition-all duration-300 w-[calc(100vw-32px)] sm:w-[380px] rounded-t overflow-hidden ${
        isMinimized 
          ? 'h-[50px] rounded-b' 
          : 'h-[calc(100vh-100px)] max-h-[550px] rounded-b'
      }`}
      aria-label="Investment Assistant Chat Window"
    >
      {/* Header Panel */}
      <div 
        onClick={isMinimized ? onMinimizeToggle : undefined}
        className={`flex items-center justify-between bg-slate-950 border-b border-slate-900 px-4 py-2.5 shrink-0 select-none ${isMinimized ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center space-x-2.5">
          {/* Status Dot */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <div>
            <h3 className="font-outfit text-xs font-bold tracking-widest text-white uppercase">
              INVESTMENT ASSISTANT
            </h3>
            {!isMinimized && (
              <span className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase block">
                Platform support & guidance
              </span>
            )}
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-1.5">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimizeToggle();
            }}
            className="p-1 text-slate-500 hover:text-white rounded hover:bg-slate-900 transition-colors"
            aria-label={isMinimized ? "Maximize chat panel" : "Minimize chat panel"}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minus className="h-3.5 w-3.5" />}
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 text-slate-500 hover:text-white rounded hover:bg-slate-900 transition-colors"
            aria-label="Close chat panel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Panel content - only if not minimized */}
      {!isMinimized && (
        <>
          {/* Scrollable Message Thread list */}
          <div className="flex-1 overflow-y-auto bg-slate-950/20 p-4 space-y-1">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            
            {loading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Chips - Only visible before first user message */}
          {messages.length <= 1 && (
            <ChatSuggestions 
              onSelect={(question) => {
                onInputChange(question);
                // Auto trigger send by appending query parameter next tick
                setTimeout(onSend, 50);
              }} 
              disabled={loading} 
            />
          )}

          {/* Chat Panel Footer */}
          <div className="px-4 py-2 border-t border-slate-900 bg-slate-950 text-[10px] text-slate-500 font-mono tracking-wider uppercase shrink-0">
            <span>Need human help? Contact </span>
            <a href="mailto:rg39405057@gmail.com" className="underline text-cyan-400">
              rg39405057@gmail.com
            </a>
          </div>

          {/* Sticky Input area */}
          <ChatInput 
            value={input} 
            onChange={onInputChange} 
            onSend={onSend} 
            loading={loading} 
            placeholder="Ask anything about the platform or your report..."
          />
        </>
      )}
    </div>
  );
}
