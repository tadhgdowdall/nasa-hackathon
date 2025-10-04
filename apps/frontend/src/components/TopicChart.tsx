"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface Topic {
  name: string;
  count: number;
}

interface TopicChartProps {
  topics: Topic[];
}

export default function TopicChart({ topics }: TopicChartProps) {
  // Color palette matching the topic badges
  const COLORS: Record<string, string> = {
    "Human Health": "#ef4444",
    "Microgravity": "#a855f7",
    "Plants": "#22c55e",
    "Cell Biology": "#3b82f6",
    "Radiation": "#eab308",
    "Development": "#ec4899",
    "Metabolism": "#f97316",
    "Other": "#6b7280",
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / 607) * 100).toFixed(1);
      return (
        <div className="bg-space-dark border border-white/20 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-white mb-1">{data.name}</p>
          <p className="text-sm text-gray-300">
            {data.count} publications ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={topics}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          stroke="rgba(255,255,255,0.2)"
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          stroke="rgba(255,255,255,0.2)"
          label={{
            value: "Publications",
            angle: -90,
            position: "insideLeft",
            style: { fill: "#9ca3af", fontSize: 12 },
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99, 102, 241, 0.1)" }} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {topics.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name] || COLORS["Other"]}
              opacity={0.8}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
