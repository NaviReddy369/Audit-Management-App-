import type { QueueItem } from "../data";
import { toneClass } from "../lib/ui";

export function QueueCard({ title, meta, status, tone }: QueueItem) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white/70 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">{meta}</p>
        </div>
        <span className={["pill", toneClass(tone)].join(" ")}>{status}</span>
      </div>
    </article>
  );
}
