"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsCharts() {
  const data = [
    { name: "Image", value: 6 },
    { name: "Video", value: 3 },
    { name: "Web", value: 3 },
  ];

  const colors = ["#6366f1", "#22c55e", "#f59e0b"];

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Prompts by Category
      </h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
