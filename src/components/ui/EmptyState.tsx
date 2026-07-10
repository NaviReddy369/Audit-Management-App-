import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-14 text-center">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-surface shadow-xs">
        <Icon className="h-5 w-5 text-ink-400" />
      </div>
      <p className="text-sm font-semibold text-ink-800">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm leading-6 text-ink-500">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
