type RiskHeatmapProps = {
  columns: string[];
  rows: { label: string; color: string; values: number[] }[];
};

export function RiskHeatmap({ columns, rows }: RiskHeatmapProps) {
  const max = Math.max(1, ...rows.flatMap((row) => row.values));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate" style={{ borderSpacing: "6px" }}>
        <thead>
          <tr>
            <th className="w-28 text-left text-xs font-semibold uppercase tracking-wide text-ink-500" />
            {columns.map((col) => (
              <th key={col} className="px-1 pb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-500">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="pr-3 text-sm font-medium text-ink-700">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                  {row.label}
                </span>
              </td>
              {row.values.map((value, index) => {
                const opacity = value === 0 ? 0.05 : 0.18 + 0.62 * (value / max);
                return (
                  <td key={index}>
                    <div
                      className="grid h-12 place-items-center rounded-lg text-sm font-semibold transition"
                      style={{
                        color: value === 0 ? "transparent" : opacity > 0.45 ? "#fff" : "#171A24",
                        background: `color-mix(in srgb, ${row.color} ${Math.round(opacity * 100)}%, white)`
                      }}
                    >
                      {value === 0 ? "" : value}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
