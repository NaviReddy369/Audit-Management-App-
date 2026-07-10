export function toneClass(tone: "neutral" | "info" | "success" | "warning" | "danger") {
  switch (tone) {
    case "info":
      return "bg-tide/10 text-tide";
    case "success":
      return "bg-pine/10 text-pine";
    case "warning":
      return "bg-ember/10 text-ember";
    case "danger":
      return "bg-clay/10 text-clay";
    default:
      return "bg-ink/10 text-ink/70";
  }
}
