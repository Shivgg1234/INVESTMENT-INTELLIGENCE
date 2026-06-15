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
import { formatPercent } from "../utils/formatters";

export default function PotentialChart({ data }) {
  const chartData = [
    {
      name: "Upside Potential",
      value: data.upside_potential,
      color: "#10b981",
    }, // Emerald
    { name: "Downside Risk", value: data.downside_risk, color: "#ef4444" }, // Red
  ].filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      Number.isFinite(Number(item.value)),
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-2 text-xs shadow-md">
          <p className="font-semibold text-slate-400">{item.name}</p>
          <p className="mt-1 font-bold text-white text-sm">
            {formatPercent(item.value)}
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
          GAIN VS. LOSS VARIANCE BAND
        </h3>
        <p className="font-mono text-[9px] text-slate-600 mt-1 uppercase tracking-wider">
          Spread calculation: Forecast gains relative to technical support
          thresholds.
        </p>
      </div>

      <div className="flex-1 w-full h-full min-h-0 relative z-10">
        {chartData.length > 0 && (
          <div className="w-full min-w-0 h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={chartData}
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
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
