import { avatarClasses } from "../../lib/ui";

type AvatarProps = {
  initials: string;
  tone?: "brand" | "success" | "warning" | "info" | "danger";
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm"
};

export function Avatar({ initials, tone = "brand", size = "md" }: AvatarProps) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        sizeClasses[size],
        avatarClasses(tone)
      ].join(" ")}
    >
      {initials}
    </span>
  );
}

export function AvatarGroup({ items, max = 3 }: { items: { initials: string; tone?: AvatarProps["tone"] }[]; max?: number }) {
  const shown = items.slice(0, max);
  const overflow = items.length - shown.length;
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((item, index) => (
        <span key={index} className="ring-2 ring-surface rounded-full">
          <Avatar initials={item.initials} tone={item.tone} size="sm" />
        </span>
      ))}
      {overflow > 0 ? (
        <span className="ring-2 ring-surface inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-100 text-[10px] font-semibold text-ink-600">
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
