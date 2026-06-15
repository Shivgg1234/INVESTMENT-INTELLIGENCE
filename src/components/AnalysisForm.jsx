import React, { useState, useEffect } from 'react';
import { User, Tag, Mail, Cpu } from 'lucide-react';

export default function AnalysisForm({ onSubmit, loading, error, clearError, lastInput }) {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [email, setEmail] = useState('');
  const [useDemo, setUseDemo] = useState(false);
  const [localError, setLocalError] = useState('');

  // Hydrate fields if "Analyze Another Stock" is clicked
  useEffect(() => {
    if (lastInput) {
      if (lastInput.name) setName(lastInput.name);
      if (lastInput.email) setEmail(lastInput.email);
    }
  }, [lastInput]);

  const handleTickerChange = (e) => {
    // Convert to uppercase and restrict based on characters and length
    const value = e.target.value.toUpperCase();
    if (value.length <= 10) {
      setTicker(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    const trimmedName = name.trim();
    const trimmedTicker = ticker.trim().toUpperCase();
    const trimmedEmail = email.trim();

    // 1. Validation checks
    if (!trimmedName || trimmedName.length < 2) {
      setLocalError('Name must be at least 2 characters long.');
      return;
    }

    const tickerRegex = /^[A-Z0-9.-]{1,10}$/;
    if (!trimmedTicker || !tickerRegex.test(trimmedTicker)) {
      setLocalError('Ticker must be alphanumeric (1-10 characters, dots/hyphens allowed).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    // Call parent submit
    onSubmit({
      name: trimmedName,
      ticker: trimmedTicker,
      email: trimmedEmail,
      useDemo
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          Requester Identity
        </label>
        <div className="relative rounded shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <User className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="name"
            id="name"
            disabled={loading}
            required
            min={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-glass block w-full rounded py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 transition-colors focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
            placeholder="e.g. John Doe"
          />
        </div>
      </div>

      {/* Ticker Input */}
      <div>
        <label htmlFor="ticker" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          Security Ticker Symbol
        </label>
        <div className="relative rounded shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Tag className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="ticker"
            id="ticker"
            disabled={loading}
            required
            maxLength={10}
            value={ticker}
            onChange={handleTickerChange}
            className="input-glass block w-full rounded py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 transition-colors focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50 uppercase tracking-widest font-mono font-semibold"
            placeholder="AAPL"
          />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          Corporate Email Address
        </label>
        <div className="relative rounded shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            disabled={loading}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-glass block w-full rounded py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 transition-colors focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
            placeholder="analyst@firm.com"
          />
        </div>
      </div>

      {/* Demo Switch Option */}
      <div className="flex items-center space-x-2 pt-2 pb-1">
        <input
          type="checkbox"
          id="demo-data"
          disabled={loading}
          checked={useDemo}
          onChange={(e) => setUseDemo(e.target.checked)}
          className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-cyan-600 focus:ring-cyan-500/30"
        />
        <label htmlFor="demo-data" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 cursor-pointer select-none flex items-center space-x-1.5">
          <Cpu className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span>LOAD PRE-COMPILED LOCAL MODEL</span>
        </label>
      </div>

      {/* Error Message */}
      {(localError || error) && (
        <div className="rounded border border-red-900/60 bg-red-950/20 p-3 text-xs text-red-400 font-medium leading-relaxed">
          {localError || error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase py-3 px-4 shadow transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
      >
        <span>EXECUTE MODEL PROJECTION</span>
      </button>

      <p className="text-[9px] text-center text-slate-500 leading-normal mt-2">
        PDF ledger files will be dispatched to the provided mail drop.
      </p>
    </form>
  );
}
