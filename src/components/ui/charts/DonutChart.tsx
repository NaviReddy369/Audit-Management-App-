import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export type DonutDatum = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  data: DonutDatum[];
  centerLabel?: string;
  size?: number;
};

export function DonutChart({ data, centerLabel, size = 168 }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={size * 0.32}
              outerRadius={size * 0.48}
              paddingAngle={2}
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-ink-900">{total}</span>
          {centerLabel ? <span className="text-[11px] text-ink-400">{centerLabel}</span> : null}
        </div>
      </div>
      <div className="w-full space-y-2">
        {data.map((entry) => (
          <div key={entry.label} className="flex items-center gap-2.5 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="min-w-0 flex-1 truncate text-ink-600">{entry.label}</span>
            <span className="font-semibold text-ink-900">{entry.value}</span>
            <span className="w-10 text-right text-xs text-ink-400">{total > 0 ? Math.round((entry.value / total) * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
