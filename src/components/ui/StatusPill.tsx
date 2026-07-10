import type { Tone } from "../../data";
import { toneClasses, toneDot } from "../../lib/ui";

type StatusPillProps = {
  tone: Tone;
  label: string;
  dot?: boolean;
};

export function StatusPill({ tone, label, dot = true }: StatusPillProps) {
  return (
    <span className={["pill", toneClasses(tone)].join(" ")}>
      {dot ? <span className={["h-1.5 w-1.5 rounded-full", toneDot(tone)].join(" ")} /> : null}
      {label}
    </span>
  );
}
