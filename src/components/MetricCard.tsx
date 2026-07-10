import type { LucideIcon } from "lucide-react";
import type { Metric } from "../data";

type MetricCardProps = Metric & {
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
};

export function MetricCard({ label, value, note, icon: Icon, trend }: MetricCardProps) {
  return (
    <article className="panel panel-hover p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
        {Icon ? (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink-50 text-ink-400">
            <Icon className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </div>
      <p className="mt-2.5 text-[28px] font-semibold leading-none text-ink-900">{value}</p>
      <div className="mt-2.5 flex items-center gap-1.5">
        {trend ? (
          <span className={["text-xs font-semibold", trend.positive ? "text-success-600" : "text-danger-600"].join(" ")}>{trend.value}</span>
        ) : null}
        <p className="text-xs leading-5 text-ink-500">{note}</p>
      </div>
    </article>
  );
}
