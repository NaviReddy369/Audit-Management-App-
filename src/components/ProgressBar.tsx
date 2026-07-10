type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="mt-2 h-2.5 w-full rounded-full bg-ink/10">
      <div className="h-full rounded-full bg-gradient-to-r from-pine to-[#3aa487]" style={{ width: `${value}%` }} />
    </div>
  );
}
