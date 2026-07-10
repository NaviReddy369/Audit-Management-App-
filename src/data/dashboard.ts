import type { QueueItem } from "./types";

export const actionQueue: QueueItem[] = [
  {
    title: "Whitfield Prep needs grant funding confirmation",
    meta: "Scoping answer is blocking the revenue request list.",
    status: "Needs manager review",
    tone: "warning"
  },
  {
    title: "Grace Community Church uploaded incomplete contribution listing",
    meta: "2 supporting files are still missing.",
    status: "Needs follow-up",
    tone: "danger"
  },
  {
    title: "Willow Creek predecessor authorization not signed",
    meta: "Client approval request has been idle for 4 days.",
    status: "External blocker",
    tone: "info"
  }
];

export const approvals: QueueItem[] = [
  {
    title: "Previous auditor contact request",
    meta: "Client authorization sent Jul 7. Awaiting signature.",
    status: "Awaiting client",
    tone: "info"
  },
  {
    title: "Board minutes approval note",
    meta: "Manager asked the client to confirm draft minutes are final.",
    status: "Awaiting client",
    tone: "warning"
  },
  {
    title: "Lease amendment confirmation",
    meta: "Facilities approval packet not yet uploaded.",
    status: "Awaiting document",
    tone: "danger"
  }
];
