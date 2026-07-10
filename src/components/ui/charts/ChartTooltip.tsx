type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: { color?: string; name?: string | number; value?: string | number }[];
};

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-ink-100 bg-ink-900 px-3 py-2 text-xs text-white shadow-popover">
      {label !== undefined ? <p className="mb-1 font-semibold text-white/70">{label}</p> : null}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-white/70">{entry.name}</span>
            <span className="ml-auto font-semibold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
