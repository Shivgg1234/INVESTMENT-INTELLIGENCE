import React from "react";
import {
  TrendingUp,
  Target,
  Scale,
  Award,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Info,
  Layers,
  FileCheck,
} from "lucide-react";
import MetricCard from "./MetricCard";
import ScoreChart from "./ScoreChart";
import PriceChart from "./PriceChart";
import PotentialChart from "./PotentialChart";
import FactorList from "./FactorList";
import {
  formatCurrency,
  formatPercent,
  formatScore,
  formatNumber,
} from "../utils/formatters";

export default function ResultsDashboard({ result }) {
  if (!result) return null;

  // Destructure parameters safely
  const {
    ticker = "N/A",
    overall_signal = "HOLD",
    recommendation = "",
    name = "",
    email = "",
    currentPrice,
    target_price,
    fair_value,
    upside_potential,
    downside_risk,
    confidence_percentage,
    risk_level,
    risk_score,
    risk_reward_ratio,
    valuation_label,
    technical_score,
    fundamental_score,
    sentiment_score,
    weighted_score,
    support_level,
    resistance_level,
    investment_thesis = "",
    bull_case = [],
    bear_case = [],
    key_opportunities = [],
    key_risks = [],
  } = result;

  const displayedRiskLevel = result.risk_level ?? "N/A";
  const displayedValuationLabel = result.valuation_label ?? "N/A";

  const clampScore = (value) => {
    if (!Number.isFinite(Number(value))) return null;
    return Math.max(0, Math.min(100, Number(value)));
  };

  const clampedTechnical = clampScore(technical_score);
  const clampedFundamental = clampScore(fundamental_score);
  const clampedSentiment = clampScore(sentiment_score);
  const clampedWeighted = clampScore(weighted_score);
  const clampedRisk = clampScore(risk_score);

  // Signal & Risk colors lookup
  const signalColors = {
    BUY: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    HOLD: "bg-amber-950/60 text-amber-400 border-amber-800/40",
    SELL: "bg-red-950/60 text-red-400 border-red-800/40",
  };

  const riskColors = {
    LOW: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    MEDIUM: "bg-amber-950/60 text-amber-400 border-amber-800/40",
    HIGH: "bg-red-950/60 text-red-400 border-red-800/40",
  };

  const valColors = {
    Undervalued: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    "Fairly Valued": "bg-amber-950/60 text-amber-400 border-amber-800/40",
    Overvalued: "bg-red-950/60 text-red-400 border-red-800/40",
  };

  const valuationVariants = {
    Undervalued: "emerald",
    "Fairly Valued": "amber",
    Overvalued: "red",
  };

  const riskVariants = {
    LOW: "emerald",
    MEDIUM: "amber",
    HIGH: "red",
  };

  // Helper for progress bar color classes
  const getProgressColor = (score) => {
    if (score >= 70) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div id="dashboard" className="scroll-mt-20 space-y-8 pb-24">
      {/* Dashboard Section Header */}
      <div className="glass-panel border-slate-900 rounded p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <h1 className="font-mono text-3xl font-extrabold tracking-widest text-white uppercase">
                {ticker}
              </h1>
              <span
                className={`rounded px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest border ${signalColors[overall_signal] || "bg-slate-900 text-slate-400"}`}
              >
                {overall_signal}
              </span>
            </div>

            {recommendation && (
              <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider leading-relaxed max-w-3xl">
                {recommendation}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-slate-500">
              <span>
                LEDGER ACCOUNT:{" "}
                <strong className="text-slate-300 font-mono uppercase">
                  {name}
                </strong>
              </span>
              <span className="hidden sm:inline text-slate-800">•</span>
              <span className="flex items-center space-x-1">
                <FileCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>
                  PDF REPORT RECORD DISPATCHED TO{" "}
                  <strong className="text-slate-300 font-mono uppercase">
                    {email}
                  </strong>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key KPI Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <MetricCard
          title="Current Price"
          value={formatCurrency(currentPrice ?? null)}
          icon={TrendingUp}
          variant="cyan"
        />
        <MetricCard
          title="Consensus Target"
          value={formatCurrency(target_price)}
          icon={Target}
          variant="amber"
        />
        <MetricCard
          title="Fair Value"
          value={formatCurrency(fair_value ?? null)}
          icon={Scale}
          variant={valuationVariants[displayedValuationLabel] || "cyan"}
          subtext={displayedValuationLabel}
        />
        <MetricCard
          title="Upside Potential"
          value={formatPercent(upside_potential)}
          icon={ArrowUpRight}
          variant={upside_potential >= 0 ? "emerald" : "red"}
        />
        <MetricCard
          title="Model Confidence Factor"
          value={formatPercent(confidence_percentage ?? null)}
          icon={Award}
          variant="cyan"
        />
        <MetricCard
          title="Risk Level"
          value={result.risk_level ?? "N/A"}
          icon={ShieldAlert}
          variant={riskVariants[result.risk_level] || "cyan"}
          subtext={`Score: ${formatScore(result.risk_score ?? null)}`}
        />
      </div>

      {/* Visual Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ScoreChart data={result} />
        <PriceChart data={result} />
        <PotentialChart data={result} />
      </div>

      {/* Visual Scores Progress Section */}
      <div className="grid gap-6 md:grid-cols-5 glass-panel border-slate-900 rounded p-6">
        <div className="md:col-span-5 mb-2 border-b border-slate-900 pb-3">
          <h3 className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            QUANTITATIVE RISK & FACTOR BREAKDOWN
          </h3>
        </div>
        {/* Technical Score */}
        <div>
          <div className="flex justify-between font-mono text-[10px] font-bold mb-2">
            <span className="text-slate-500 uppercase">
              TECHNICAL COMPONENT INDEX
            </span>
            <span className="text-white">{formatScore(technical_score)}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-slate-800/60">
            {clampedTechnical !== null && (
              <div
                className={`h-full transition-all duration-500 ${getProgressColor(clampedTechnical)}`}
                style={{ width: `${clampedTechnical}%` }}
              />
            )}
          </div>
        </div>

        {/* Fundamental Score */}
        <div>
          <div className="flex justify-between font-mono text-[10px] font-bold mb-2">
            <span className="text-slate-500 uppercase">
              FUNDAMENTAL BALANCE INDEX
            </span>
            <span className="text-white">{formatScore(fundamental_score)}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-slate-800/60">
            {clampedFundamental !== null && (
              <div
                className={`h-full transition-all duration-500 ${getProgressColor(clampedFundamental)}`}
                style={{ width: `${clampedFundamental}%` }}
              />
            )}
          </div>
        </div>

        {/* Sentiment Score */}
        <div>
          <div className="flex justify-between font-mono text-[10px] font-bold mb-2">
            <span className="text-slate-500 uppercase">
              SENTIMENT INTENSITY INDEX
            </span>
            <span className="text-white">{formatScore(sentiment_score)}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-slate-800/60">
            {clampedSentiment !== null && (
              <div
                className={`h-full transition-all duration-500 ${getProgressColor(clampedSentiment)}`}
                style={{ width: `${clampedSentiment}%` }}
              />
            )}
          </div>
        </div>

        {/* Weighted Score */}
        <div>
          <div className="flex justify-between font-mono text-[10px] font-bold mb-2">
            <span className="text-slate-500 uppercase">
              COMPOSITE MODEL INDEX
            </span>
            <span className="text-white">
              {formatScore(result.weighted_score ?? null)}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-slate-800/60">
            {clampedWeighted !== null && (
              <div
                className={`h-full transition-all duration-500 ${getProgressColor(clampedWeighted)}`}
                style={{ width: `${clampedWeighted}%` }}
              />
            )}
          </div>
        </div>

        {/* Risk Score */}
        <div>
          <div className="flex justify-between font-mono text-[10px] font-bold mb-2">
            <span className="text-slate-500 uppercase">
              PROBABILITY OF RISK INDEX
            </span>
            <span className="text-white">{formatScore(risk_score)}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-slate-800/60">
            {clampedRisk !== null && (
              <div
                className={`h-full transition-all duration-500 ${clampedRisk > 50 ? "bg-red-500" : clampedRisk > 25 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${clampedRisk}%` }}
              />
            )}
          </div>
          <span className="font-mono text-[8px] text-slate-650 block mt-1.5 leading-normal uppercase">
            Lower score indicates a lower measured risk profile.
          </span>
        </div>
      </div>

      {/* Investment Thesis Section */}
      <div className="glass-panel border border-slate-900 rounded p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-500/2 rounded-full blur-2xl" />
        <div className="flex items-center space-x-2.5 mb-5 border-b border-slate-900 pb-3">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          <h2 className="font-mono text-[10px] font-bold tracking-widest text-white uppercase">
            VALUATION MODEL THESIS
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-normal">
          {investment_thesis ||
            "No quantitative synthesis memo returned for this security."}
        </p>
      </div>

      {/* Strategic Factors: Bull/Bear and Opportunities/Risks */}
      <FactorList
        bullCase={bull_case}
        bearCase={bear_case}
        opportunities={key_opportunities}
        risks={key_risks}
      />

      {/* Valuation and Risk Panel */}
      <div className="glass-panel border border-slate-900 rounded p-6 sm:p-8">
        <div className="flex items-center space-x-2.5 mb-6 border-b border-slate-900 pb-3">
          <Layers className="h-4 w-4 text-cyan-400" />
          <h3 className="font-mono text-[10px] font-bold tracking-widest text-white uppercase">
            Valuation & Technical Support Ledger
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Row 1 */}
          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Valuation Class
            </span>
            <span
              className={`mt-1.5 inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold border uppercase tracking-wider ${valColors[displayedValuationLabel] || "bg-slate-900 text-slate-400"}`}
            >
              {displayedValuationLabel}
            </span>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Classified based on variance between market price and estimated
              fair value.
            </span>
          </div>

          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Risk Level & Score
            </span>
            <div className="mt-1.5 flex items-center space-x-2">
              <span
                className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold border uppercase tracking-wider ${riskColors[displayedRiskLevel] || "bg-slate-900 text-slate-400"}`}
              >
                {displayedRiskLevel}
              </span>
              <span className="font-mono text-xs font-bold text-white">
                Score:{" "}
                {result.risk_score !== null && result.risk_score !== undefined
                  ? `${result.risk_score}/100`
                  : "N/A"}
              </span>
            </div>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Calculated overall risk categorization based on volatility, beta,
              and financial metrics.
            </span>
          </div>

          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Risk/Reward Ratio
            </span>
            <span className="mt-1.5 font-mono text-sm font-bold text-white block">
              {formatNumber(result.risk_reward_ratio ?? null, 2)}
            </span>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Ratio of potential upside gains relative to model downside
              parameters. Higher is preferred.
            </span>
          </div>

          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Upside / Downside
            </span>
            <div className="mt-1.5 flex items-center space-x-2 font-mono text-xs font-bold">
              <span className="text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5 mr-0.5 shrink-0" />
                {formatPercent(result.upside_potential ?? null)}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-red-400 flex items-center">
                <ArrowDownRight className="h-3.5 w-3.5 mr-0.5 shrink-0" />
                {formatPercent(result.downside_risk ?? null)}
              </span>
            </div>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Percentage potential targets based on historical technical support
              and resistance levels.
            </span>
          </div>

          {/* Row 2 */}
          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Support Level
            </span>
            <span className="mt-1.5 font-mono text-sm font-bold text-white block">
              {formatCurrency(result.support_level ?? null)}
            </span>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Calculated technical support boundary where buy volume is expected
              to consolidate.
            </span>
          </div>

          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Resistance Level
            </span>
            <span className="mt-1.5 font-mono text-sm font-bold text-white block">
              {formatCurrency(result.resistance_level ?? null)}
            </span>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Key technical ceiling indicating where sellers are historically
              likely to emerge.
            </span>
          </div>

          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Target Price
            </span>
            <span className="mt-1.5 font-mono text-sm font-bold text-amber-400 block">
              {formatCurrency(result.target_price ?? null)}
            </span>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              Forecast 12-month median valuation consensus target.
            </span>
          </div>

          <div className="rounded-none border border-slate-900 bg-slate-950/40 p-4">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Estimated Fair Value
            </span>
            <span className="mt-1.5 font-mono text-sm font-bold text-emerald-400 block">
              {formatCurrency(result.fair_value ?? null)}
            </span>
            <span className="mt-2 font-mono text-[8px] text-slate-650 block leading-normal uppercase">
              DCF and quantitative metrics valuation calculation.
            </span>
          </div>
        </div>

        {/* Small non-financial advice indicator */}
        <div className="mt-5 flex items-center space-x-2 font-mono text-[8px] text-slate-600 uppercase">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>
            The values above represent output calculations from an automated
            analysis model and do not constitute absolute investment triggers.
          </span>
        </div>
      </div>
    </div>
  );
}
