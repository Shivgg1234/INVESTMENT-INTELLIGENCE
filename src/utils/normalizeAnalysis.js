export function normalizeAnalysis(raw = {}) {
  const numberOrNull = (...values) => {
    for (const value of values) {
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        Number.isFinite(Number(value))
      ) {
        return Number(value);
      }
    }

    return null;
  };

  const stringOrNull = (...values) => {
    for (const value of values) {
      if (
        typeof value === "string" &&
        value.trim() !== ""
      ) {
        return value.trim();
      }
    }

    return null;
  };

  const arrayOrEmpty = (...values) => {
    for (const value of values) {
      if (Array.isArray(value)) {
        return value.filter(Boolean);
      }
    }

    return [];
  };

  return {
    success: Boolean(raw.success),
    message: stringOrNull(raw.message),

    name: stringOrNull(raw.name),
    ticker: stringOrNull(raw.ticker),
    email: stringOrNull(raw.email),

    overall_signal: stringOrNull(
      raw.overall_signal,
      raw.overallSignal
    ),

    recommendation: stringOrNull(raw.recommendation),

    confidence_percentage: numberOrNull(
      raw.confidence_percentage,
      raw.confidence,
      raw.confidencePercentage
    ),

    currentPrice: numberOrNull(
      raw.currentPrice,
      raw.current_price,
      raw.price
    ),

    target_price: numberOrNull(
      raw.target_price,
      raw.targetPrice
    ),

    fair_value: numberOrNull(
      raw.fair_value,
      raw.fairValue
    ),

    support_level: numberOrNull(
      raw.support_level,
      raw.supportLevel
    ),

    resistance_level: numberOrNull(
      raw.resistance_level,
      raw.resistanceLevel
    ),

    upside_potential: numberOrNull(
      raw.upside_potential,
      raw.upsidePotential
    ),

    downside_risk: numberOrNull(
      raw.downside_risk,
      raw.downsideRisk
    ),

    valuation_label: stringOrNull(
      raw.valuation_label,
      raw.valuationLabel
    ),

    weighted_score: numberOrNull(
      raw.weighted_score,
      raw.weightedScore
    ),

    technical_score: numberOrNull(
      raw.technical_score,
      raw.technicalScore
    ),

    fundamental_score: numberOrNull(
      raw.fundamental_score,
      raw.fundamentalScore
    ),

    sentiment_score: numberOrNull(
      raw.sentiment_score,
      raw.sentimentScore
    ),

    risk_score: numberOrNull(
      raw.risk_score,
      raw.riskScore
    ),

    risk_level: stringOrNull(
      raw.risk_level,
      raw.riskLevel
    ),

    risk_reward_ratio: numberOrNull(
      raw.risk_reward_ratio,
      raw.riskRewardRatio
    ),

    investment_thesis: stringOrNull(
      raw.investment_thesis,
      raw.investmentThesis
    ),

    bull_case: arrayOrEmpty(
      raw.bull_case,
      raw.bullCase
    ),

    bear_case: arrayOrEmpty(
      raw.bear_case,
      raw.bearCase
    ),

    key_risks: arrayOrEmpty(
      raw.key_risks,
      raw.keyRisks
    ),

    key_opportunities: arrayOrEmpty(
      raw.key_opportunities,
      raw.keyOpportunities
    )
  };
}
