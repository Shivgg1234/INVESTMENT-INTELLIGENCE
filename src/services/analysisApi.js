/**
 * Client service to call the serverless analysis function.
 */
export async function analyzeStock(name, ticker, email, useDemoData = false) {
  if (useDemoData) {
    // Simulate real network delay for stages visualization
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    return {
      success: true,
      message: "Analysis generated from demo research engine.",
      name: name,
      ticker: ticker.toUpperCase(),
      email: email,
      overall_signal: "BUY",
      recommendation: "Strong institutional purchase profile. Consolidating near multi-month support level with high valuation margin of safety.",
      confidence_percentage: 82.50,
      currentPrice: 291.09,
      target_price: 330.25,
      fair_value: 349.31,
      support_level: 290.55,
      resistance_level: 300.23,
      upside_potential: 13.45,
      downside_risk: 0.19,
      valuation_label: "Undervalued",
      weighted_score: 78,
      technical_score: 68,
      fundamental_score: 89,
      sentiment_score: 75,
      risk_score: 12,
      risk_level: "LOW",
      risk_reward_ratio: 6.81,
      investment_thesis: "The asset demonstrates robust structural fundamentals with consistent margin expansion in high-margin enterprise segments. Immediate technical setups indicate a solid accumulation range between support at $290.55 and the current price of $291.09. A confidence score of 82.5% is supported by strong institutional sentiment and positive macroeconomic tailwinds. Valuation modelling shows a 13.45% upside to the target price of $330.25, with downside risks strictly capped at 0.19%, representing an exceptional risk-reward ratio.",
      bull_case: [
        "Consistent growth in enterprise subscription revenue with 94% gross margins.",
        "Successful product launch unlocking a secondary Addressable Market.",
        "Aggressive share buyback program returning $10B+ annually to shareholders."
      ],
      bear_case: [
        "Antitrust regulatory filings in EU markets could impact long-term pricing power.",
        "Minor hardware margin contraction due to temporary logistics increases.",
        "Slight beta expansion during high volatility index rebalancings."
      ],
      key_opportunities: [
        "Generative AI service layer integration with premium tier pricing.",
        "Strategic market expansion in Southeast Asia."
      ],
      key_risks: [
        "Increased regional regulatory inspection.",
        "Short-term supply constraints on high-end chipsets."
      ]
    };
  }

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, ticker, email }),
  });

  const contentType = response.headers.get('content-type') || '';
  if (!response.ok) {
    let errorMsg = 'Failed to generate investment report.';
    if (contentType.includes('application/json')) {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } else {
      const text = await response.text();
      console.error('Non-JSON error from serverless function:', text);
    }
    throw new Error(errorMsg);
  }

  if (!contentType.includes('application/json')) {
    throw new Error('Received an invalid response format from the server.');
  }

  return response.json();
}
