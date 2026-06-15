import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatCurrency } from "../utils/formatters";

export default function PriceChart({ data }) {
  const result = data;
  const valuationData = [
    { name: "Current", value: result.currentPrice },
    { name: "Support", value: result.support_level },
    { name: "Resistance", value: result.resistance_level },
    { name: "Target", value: result.target_price },
    { name: "Fair Value", value: result.fair_value },
  ].filter((item) => Number.isFinite(Number(item.value)));

  const colors = {
    Current: "#38bdf8",
    Support: "#64748b",
    Resistance: "#475569",
    Target: "#f59e0b",
    "Fair Value": "#10b981",
  };

  // Tooltip formatter in USD
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-2 text-xs shadow-md">
          <p className="font-semibold text-slate-400">{item.name}</p>
          <p className="mt-1 font-bold text-white text-sm">
            {formatCurrency(item.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel border border-slate-900 rounded p-5 flex flex-col justify-between h-96 relative min-w-0">
      <div className="mb-4">
        <h3 className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          VALUATION & PRICE LEDGER (USD)
        </h3>
        <p className="font-mono text-[9px] text-slate-600 mt-1 uppercase tracking-wider">
          Variance comparison: Spot price, technical anchors, and fair value.
        </p>
      </div>

      <div className="flex-1 w-full h-full min-h-0 relative z-10">
        {valuationData.length <= 1 ? (
          <div className="flex h-full flex-col items-center justify-center text-center p-4">
            <p className="font-mono text-xs text-slate-500 uppercase">
              Additional valuation fields were not returned by the analysis API.
            </p>
          </div>
        ) : (
          <div className="w-full min-w-0 h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={valuationData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  stroke="#1e293b"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={45}>
                  {valuationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[entry.name] || "#38bdf8"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
