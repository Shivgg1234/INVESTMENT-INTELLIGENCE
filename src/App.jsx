import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessingState from './components/ProcessingState';
import ErrorState from './components/ErrorState';
import ResultsDashboard from './components/ResultsDashboard';
import Methodology from './components/Methodology';
import Footer from './components/Footer';
import ChatButton from './components/chat/ChatButton';
import ChatWindow from './components/chat/ChatWindow';
import { analyzeStock } from './services/analysisApi';
import { queryChatBot } from './services/chatApi';
import { normalizeAnalysis } from './utils/normalizeAnalysis';
import { ArrowDown, RotateCcw } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  // Track inputs to pre-populate name and email when analyzing a new stock
  const [lastInput, setLastInput] = useState({
    name: '',
    email: '',
    ticker: ''
  });

  // Chatbot State Hooks
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I can help you generate a stock report, understand dashboard metrics, or troubleshoot an issue. What would you like help with?' 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHasNeverOpened, setChatHasNeverOpened] = useState(true);

  // Handle Form Submission
  const handleAnalyzeRequest = async ({ name, ticker, email, useDemo }) => {
    setLoading(true);
    setError('');
    setResult(null);
    
    // Save input details for possible re-runs
    setLastInput({ name, email, ticker });

    try {
      const data = await analyzeStock(name, ticker, email, useDemo);
      console.log("RAW API RESPONSE:", data);
      
      const normalizedResult = normalizeAnalysis(data);

      if (import.meta.env.DEV) {
        console.log("Raw analysis response:", data);
        console.log("Normalized analysis:", normalizedResult);
      }

      if (normalizedResult && (normalizedResult.success || normalizedResult.overall_signal || normalizedResult.ticker)) {
        // Ensure success field is set
        normalizedResult.success = true;
        setResult(normalizedResult);
        
        // Smooth scroll to the results dashboard
        setTimeout(() => {
          const dashboardEl = document.getElementById('dashboard');
          if (dashboardEl) {
            dashboardEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        throw new Error(data?.message || 'Failed to generate report.');
      }
    } catch (err) {
      console.error('App analysis error:', err);
      setError(err.message || 'An error occurred while generating the report.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearError = () => {
    setError('');
  };

  const handleRetry = () => {
    setError('');
  };

  const handleAnalyzeAnother = () => {
    setResult(null);
    setLastInput(prev => ({
      ...prev,
      ticker: '' // Reset ticker
    }));
    
    setTimeout(() => {
      const formEl = document.getElementById('analyze');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollToDashboard = () => {
    const dashboardEl = document.getElementById('dashboard');
    if (dashboardEl) {
      dashboardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoReset = () => {
    setResult(null);
    setLoading(false);
    setError('');
    setLastInput({ name: '', email: '', ticker: '' });
  };

  // Chatbot Send Message Handler
  const handleSendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    // Filter previous history to user/assistant and slice to last 10
    const previousHistory = chatMessages
      .filter((item) => item.role === "user" || item.role === "assistant")
      .slice(-10);

    setChatMessages((current) => [
      ...current,
      userMessage,
    ]);

    setChatInput("");
    setChatLoading(true);

    try {
      const res = await queryChatBot(text, previousHistory);

      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: res.reply || "I’m unable to respond right now.",
        },
      ]);
    } catch (err) {
      console.error('Chat submission error:', err);
      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I’m having trouble responding right now. Please try again. If the issue continues, contact support at rg39405057@gmail.com.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 radial-glow select-none">
      {/* Sticky Header */}
      <Header hasDashboard={!!result} onReset={handleLogoReset} />

      <main>
        {/* If loading, show processing state */}
        {loading && <ProcessingState />}

        {/* If error and not loading, show error card */}
        {error && !loading && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {/* Form area: Shown when not loading and no error, or if results already exist */}
        {!loading && !error && (
          <>
            {/* Render Hero and request form only if no results have been generated yet */}
            {!result ? (
              <Hero 
                onSubmit={handleAnalyzeRequest}
                loading={loading}
                error={error}
                clearError={handleClearError}
                lastInput={lastInput}
              />
            ) : (
              /* Success Banner Experience */
              <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
                <div className="rounded border border-emerald-500/20 bg-emerald-950/20 p-6 sm:p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                  <div className="radial-glow-success absolute inset-0 opacity-40 pointer-events-none" />
                  
                  <span className="font-mono text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
                    COMPUTATION LEDGER RECORDED
                  </span>
                  
                  <h2 className="mt-2 font-mono text-base font-bold text-white tracking-widest uppercase">
                    Ledger Report Generated Successfully
                  </h2>
                  
                  <p className="mt-3 font-mono text-[10px] text-slate-400 tracking-wider max-w-md mx-auto uppercase">
                    The compiled PDF analyst report has been dispatched to{' '}
                    <strong className="text-white font-mono">{result.email}</strong>.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleAnalyzeAnother}
                      className="flex items-center space-x-2 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold text-[10px] tracking-wider uppercase py-2.5 px-5 transition-all cursor-pointer font-mono"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>QUERY NEW SYMBOL</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleScrollToDashboard}
                      className="flex items-center space-x-2 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase py-2.5 px-5 transition-all cursor-pointer font-mono"
                    >
                      <ArrowDown className="h-3.5 w-3.5 stroke-[3px]" />
                      <span>VIEW SYSTEM DASHBOARD</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Interactive analysis dashboard */}
            {result && (
              <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                <ResultsDashboard result={result} />
              </div>
            )}
          </>
        )}

        {/* Methodology breakdown */}
        <Methodology />
      </main>

      {/* Disclaimers & Footer details */}
      <Footer />

      {/* Floating Support Chatbot Elements */}
      <ChatButton
        onClick={() => {
          setChatOpen(true);
          setChatMinimized(false);
          setChatHasNeverOpened(false);
        }}
        visible={!chatOpen}
        hasNeverOpened={chatHasNeverOpened}
      />
      
      <ChatWindow
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        isMinimized={chatMinimized}
        onMinimizeToggle={() => setChatMinimized(prev => !prev)}
        messages={chatMessages}
        input={chatInput}
        onInputChange={setChatInput}
        onSend={handleSendChatMessage}
        loading={chatLoading}
      />
    </div>
  );
}
