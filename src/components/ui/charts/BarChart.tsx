import { Bar, BarChart as RBarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ReactNode } from "react";
import { AXIS_TICK } from "./palette";
import { ChartTooltip } from "./ChartTooltip";

export type BarDatum = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: BarDatum[];
  valueSuffix?: string;
  height?: number;
  defaultColor?: string;
};

export function BarChart({ data, valueSuffix = "", height = 220, defaultColor = "#5B5FE8" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RBarChart data={data} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 4 }} barCategoryGap={10}>
        <XAxis type="number" hide domain={[0, (max: number) => Math.ceil(max * 1.15)]} />
        <YAxis
          type="category"
          dataKey="label"
          width={128}
          tickLine={false}
          axisLine={false}
          tick={{ ...AXIS_TICK, fill: "#3D4356" }}
        />
        <Tooltip cursor={{ fill: "rgba(139,147,167,0.08)" }} content={<ChartTooltip />} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color ?? defaultColor} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(value?: ReactNode) => `${value ?? 0}${valueSuffix}`}
            style={{ fill: "#3D4356", fontSize: 12, fontWeight: 600 }}
          />
        </Bar>
      </RBarChart>
    </ResponsiveContainer>
  );
}
