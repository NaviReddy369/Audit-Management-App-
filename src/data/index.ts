export * from "./types";
export * from "./firm";
export * from "./team";
export * from "./clients";
export * from "./engagements";
export * from "./templates";
export * from "./activity";
export * from "./dashboard";

import { engagements } from "./engagements";
import { clients } from "./clients";

export type Metric = { label: string; value: string; note: string };

export function firmMetrics(): Metric[] {
  const active = engagements.filter((e) => e.stage !== "Reviewed").length;
  const waiting = engagements.filter((e) => e.stage === "Sent" || e.stage === "In Progress").length;
  const missingDocs = engagements.reduce((sum, e) => sum + e.missingDocs, 0);
  const pendingApprovals = 3;
  return [
    { label: "Active engagements", value: String(active), note: `${clients.length} clients in the book` },
    { label: "Waiting on client", value: String(waiting), note: "Across in-progress engagements" },
    { label: "Missing evidence", value: String(missingDocs), note: "Documents still outstanding" },
    { label: "Pending approvals", value: String(pendingApprovals), note: "External sign-offs needed" }
  ];
}

export const clientMetrics: Metric[] = [
  { label: "Questions remaining", value: "6", note: "Only unresolved items are shown" },
  { label: "Documents requested", value: "14", note: "9 uploaded so far" },
  { label: "Messages needing reply", value: "2", note: "Linked to exact questions" },
  { label: "Approvals to sign", value: "1", note: "Previous auditor authorization pending" }
];
