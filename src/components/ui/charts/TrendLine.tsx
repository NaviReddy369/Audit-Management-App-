import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AXIS_TICK, GRID_STROKE } from "./palette";
import { ChartTooltip } from "./ChartTooltip";

export type TrendDatum = {
  label: string;
  value: number;
};

type TrendLineProps = {
  data: TrendDatum[];
  color?: string;
  height?: number;
};

export function TrendLine({ data, color = "#5B5FE8", height = 220 }: TrendLineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.12} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={GRID_STROKE} />
        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={AXIS_TICK} />
        <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK} width={36} />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill="url(#trendFill)" dot={{ r: 3, fill: color, strokeWidth: 0 }} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
