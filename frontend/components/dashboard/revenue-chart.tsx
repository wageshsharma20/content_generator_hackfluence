"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 25000 },
  { month: "Apr", revenue: 31000 },
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 48800 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Revenue Growth
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ea580c"
              fill="#fed7aa"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}