"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  backgroundColor: "#1B1B1B",
  border: "2px solid #1B1B1B",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 10px",
};

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function ChartCard({ title, description, children, className }: ChartCardProps) {
  return (
    <div className={cn("rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]", className)}>
      <div className="border-b-2 border-neo-black px-5 py-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

interface BarChartProps {
  data: { name: string; value: number }[];
  color?: string;
  height?: number;
  horizontal?: boolean;
}

function BarChartComponent({ data, color = "#E56498", height = 250, horizontal = false }: BarChartProps) {
  if (horizontal) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D6D6D6" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9E9E9E" />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9E9E9E" width={60} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} stroke="#1B1B1B" strokeWidth={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ left: -10, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D6D6D6" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9E9E9E" />
        <YAxis tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9E9E9E" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} stroke="#1B1B1B" strokeWidth={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={color} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

interface AreaChartProps {
  data: { name: string; value: number }[];
  color?: string;
  height?: number;
}

function AreaChartComponent({ data, color = "#E56498", height = 250 }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ left: -10, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D6D6D6" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9E9E9E" />
        <YAxis tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9E9E9E" />
        <Tooltip contentStyle={tooltipStyle} />
        <defs>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          fill={`url(#gradient-${color.replace("#", "")})`}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

function DonutChartComponent({ data, height = 250 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          stroke="#1B1B1B"
          strokeWidth={2}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export { ChartCard, BarChartComponent, AreaChartComponent, DonutChartComponent };
