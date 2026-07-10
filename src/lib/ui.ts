import type { Tone } from "../data";

export function toneClasses(tone: Tone) {
  switch (tone) {
    case "info":
      return "bg-info-50 text-info-700";
    case "success":
      return "bg-success-50 text-success-700";
    case "warning":
      return "bg-warning-50 text-warning-700";
    case "danger":
      return "bg-danger-50 text-danger-700";
    default:
      return "bg-ink-100 text-ink-600";
  }
}

export function toneDot(tone: Tone) {
  switch (tone) {
    case "info":
      return "bg-info-500";
    case "success":
      return "bg-success-500";
    case "warning":
      return "bg-warning-500";
    case "danger":
      return "bg-danger-500";
    default:
      return "bg-ink-400";
  }
}

export function avatarClasses(tone: "brand" | "success" | "warning" | "info" | "danger") {
  switch (tone) {
    case "success":
      return "bg-success-50 text-success-700";
    case "warning":
      return "bg-warning-50 text-warning-700";
    case "info":
      return "bg-info-50 text-info-700";
    case "danger":
      return "bg-danger-50 text-danger-700";
    default:
      return "bg-brand-50 text-brand-700";
  }
}

export function riskTone(risk: "Low" | "Moderate" | "High"): Tone {
  if (risk === "High") return "danger";
  if (risk === "Moderate") return "warning";
  return "success";
}

export function stageTone(stage: string): Tone {
  switch (stage) {
    case "Draft":
      return "neutral";
    case "Sent":
      return "info";
    case "In Progress":
      return "warning";
    case "Submitted":
      return "success";
    case "Reviewed":
      return "success";
    default:
      return "neutral";
  }
}

export function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function timeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
