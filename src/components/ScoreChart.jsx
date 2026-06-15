import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ScoreChart({ data }) {
  const radarData = [
    {
      metric: "Technical",
      value: data.technical_score,
    },
    {
      metric: "Fundamental",
      value: data.fundamental_score,
    },
    {
      metric: "Sentiment",
      value: data.sentiment_score,
    },
    {
      metric: "Weighted",
      value: data.weighted_score,
    },
    {
      metric: "Confidence",
      value: data.confidence_percentage,
    },
    {
      metric: "Risk Safety",
      value:
        data.risk_score === null || data.risk_score === undefined
          ? null
          : Math.max(0, 100 - data.risk_score),
    },
  ].filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      Number.isFinite(Number(item.value)),
  );

  // Custom tooltips matching the dashboard aesthetic
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-2 text-xs shadow-md">
          <p className="font-semibold text-white uppercase tracking-wider">
            {payload[0].payload.metric}
          </p>
          <p className="mt-1 text-cyan-400 font-bold">{payload[0].value}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel border border-slate-900 rounded p-5 flex flex-col justify-between h-96 relative min-w-0">
      <div className="mb-4">
        <h3 className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          EQUITY RATINGS PROFILE
        </h3>
        <p className="font-mono text-[9px] text-slate-600 mt-1 uppercase tracking-wider">
          Correlation of index parameters on a scale of 0 to 100.
        </p>
      </div>

      <div className="flex-1 w-full h-full min-h-0 relative z-10 flex items-center justify-center">
        {radarData.length > 0 && (
          <div className="w-full min-w-0 h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 550 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#475569", fontSize: 9 }}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Radar
                  name="Analysis Score"
                  dataKey="value"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
