import type { Metric } from "../data";

export function MetricCard({ label, value, note }: Metric) {
  return (
    <article className="panel p-5">
      <p className="text-sm text-ink/55">{label}</p>
      <p className="mt-2 text-4xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-ink/60">{note}</p>
    </article>
  );
}
