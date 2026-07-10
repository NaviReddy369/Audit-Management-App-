type ProgressBarProps = {
  value: number;
  tone?: "brand" | "success" | "warning" | "danger";
};

const toneClasses = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500"
};

export function ProgressBar({ value, tone = "brand" }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full rounded-full bg-ink-100">
      <div className={["h-full rounded-full transition-all", toneClasses[tone]].join(" ")} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
