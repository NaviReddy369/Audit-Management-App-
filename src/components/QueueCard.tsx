import type { QueueItem } from "../data";
import { StatusPill } from "./ui/StatusPill";

export function QueueCard({ title, meta, status, tone }: QueueItem) {
  return (
    <article className="rounded-xl border border-ink-100 bg-surface p-3.5 transition hover:border-ink-200">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-ink-800">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-ink-500">{meta}</p>
        </div>
        <StatusPill tone={tone} label={status} />
      </div>
    </article>
  );
}
