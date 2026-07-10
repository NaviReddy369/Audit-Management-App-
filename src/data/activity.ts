import type { ActivityEntry, NotificationItem } from "./types";

export const activity: ActivityEntry[] = [
  { id: "a1", clientId: "whitfield-prep", engagementId: "whitfield-fy26", actor: "Maya Sorensen", action: "Requested prior auditor authorization from Dana Whitfield", timestamp: "2026-07-08T14:20:00", tone: "info" },
  { id: "a2", clientId: "whitfield-prep", engagementId: "whitfield-fy26", actor: "Dana Whitfield", action: "Uploaded tuition receivable aging schedule", timestamp: "2026-07-07T09:05:00", tone: "success" },
  { id: "a3", clientId: "whitfield-prep", engagementId: "whitfield-fy26", actor: "System", action: "Flagged grant funding question as needing follow-up", timestamp: "2026-07-05T11:40:00", tone: "warning" },
  { id: "a4", clientId: "grace-community", engagementId: "grace-fy26", actor: "Noah Tran", action: "Marked in-kind contribution listing as Received", timestamp: "2026-07-06T16:10:00", tone: "success" },
  { id: "a5", clientId: "grace-community", engagementId: "grace-fy26", actor: "Rev. Samuel Okafor", action: "Left a note on the board minutes request", timestamp: "2026-07-04T13:30:00", tone: "neutral" },
  { id: "a6", clientId: "hope-family", engagementId: "hope-fy26", actor: "Maya Sorensen", action: "Finalized request list and marked engagement Submitted", timestamp: "2026-07-01T10:00:00", tone: "success" },
  { id: "a7", clientId: "willow-creek", engagementId: "willow-fy26", actor: "Aiden Reyes", action: "Sent intake questionnaire to Tasha Reyes", timestamp: "2026-06-29T15:45:00", tone: "info" },
  { id: "a8", clientId: "riverside-youth", engagementId: "riverside-fy26", actor: "Priya Kapoor", action: "Created FY2026 engagement", timestamp: "2026-06-20T08:15:00", tone: "neutral" }
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Grant funding follow-up overdue", detail: "Whitfield Preparatory Academy — 4 days idle", timestamp: "2026-07-09T08:00:00", tone: "danger", read: false },
  { id: "n2", title: "Document uploaded", detail: "Grace Community Church uploaded in-kind contribution listing", timestamp: "2026-07-08T17:30:00", tone: "success", read: false },
  { id: "n3", title: "Predecessor authorization pending", detail: "Willow Creek Fellowship — awaiting client signature", timestamp: "2026-07-07T12:00:00", tone: "warning", read: false },
  { id: "n4", title: "Engagement reviewed", detail: "Lakeside Montessori School FY2026 marked Reviewed", timestamp: "2026-07-03T09:20:00", tone: "info", read: true }
];

export function getActivityForClient(clientId: string) {
  return activity.filter((entry) => entry.clientId === clientId).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function getActivityForEngagement(engagementId: string) {
  return activity.filter((entry) => entry.engagementId === engagementId).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}
