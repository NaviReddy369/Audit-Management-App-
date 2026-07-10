export type Metric = {
  label: string;
  value: string;
  note: string;
};

export type QueueItem = {
  title: string;
  meta: string;
  status: string;
  tone: "neutral" | "info" | "success" | "warning" | "danger";
};

export type EngagementRow = {
  client: string;
  stage: string;
  progress: number;
  missingDocs: number;
  risk: string;
  owner: string;
};

export type QuestionType = "first" | "annual" | "confirm" | "dynamic";

export type QuestionCard = {
  type: QuestionType;
  title: string;
  prompt: string;
  answer: string;
  details: string;
};

export const dashboardMetrics: Metric[] = [
  { label: "Active engagements", value: "12", note: "4 submitted this week" },
  { label: "Waiting on client", value: "37", note: "Down 18% from last week" },
  { label: "Missing evidence", value: "21", note: "9 tied to revenue cycles" },
  { label: "Pending approvals", value: "3", note: "1 predecessor request overdue" }
];

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

export const engagements: EngagementRow[] = [
  {
    client: "Whitfield Preparatory Academy",
    stage: "Submitted / Review",
    progress: 68,
    missingDocs: 5,
    risk: "High",
    owner: "Maya S."
  },
  {
    client: "Grace Community Church",
    stage: "Document follow-up",
    progress: 74,
    missingDocs: 3,
    risk: "Moderate",
    owner: "Noah T."
  },
  {
    client: "Hope Family Services",
    stage: "Ready for PDF prep",
    progress: 92,
    missingDocs: 1,
    risk: "Low",
    owner: "Maya S."
  },
  {
    client: "Willow Creek Fellowship",
    stage: "Waiting on authorization",
    progress: 38,
    missingDocs: 7,
    risk: "High",
    owner: "Aiden R."
  }
];

export const questionMeta: Record<QuestionType, { label: string; classes: string }> = {
  first: { label: "First-time", classes: "bg-pine/10 text-pine" },
  annual: { label: "Mandatory annual", classes: "bg-ember/10 text-ember" },
  confirm: { label: "Prior-year confirm", classes: "bg-tide/10 text-tide" },
  dynamic: { label: "Dynamic", classes: "bg-clay/10 text-clay" }
};

export const questions: QuestionCard[] = [
  {
    type: "first",
    title: "Entity legal structure",
    prompt: "Confirm the legal entity name, incorporation state, and tax-exempt status.",
    answer: "Whitfield Preparatory Academy, Illinois nonprofit corporation, 501(c)(3).",
    details: "Collected once and carried forward until changed."
  },
  {
    type: "annual",
    title: "Revenue streams for FY2026",
    prompt: "Identify tuition, donations, grants, and any auxiliary income for the year.",
    answer: "Tuition and annual giving confirmed. Grant funding still marked not sure.",
    details: "Asked every year because scoping and revenue testing depend on it."
  },
  {
    type: "confirm",
    title: "Bank accounts",
    prompt: "Same as FY2025 or update banking information?",
    answer: "Same as last year.",
    details: "Reduces repetitive data entry for recurring audits."
  },
  {
    type: "dynamic",
    title: "Grant program detail",
    prompt: "Because grant funding may exist, list any Title I, IDEA, or state-supported programs.",
    answer: "Pending client clarification.",
    details: "Generated from prior revenue responses."
  }
];

export const scopeCards = [
  {
    form: "KBA-403",
    title: "Tuition and receivables",
    status: "In scope",
    effect: "4 questions and 3 request items are active.",
    tone: "success"
  },
  {
    form: "KBA-409",
    title: "Investments and endowment",
    status: "Out of scope",
    effect: "Treasury questions and request items are removed entirely.",
    tone: "neutral"
  },
  {
    form: "KBA-403",
    title: "Federal and state grants",
    status: "Needs confirmation",
    effect: "Revenue testing is held open until confirmed.",
    tone: "warning"
  },
  {
    form: "KBA-410",
    title: "Debt and facilities",
    status: "Needs confirmation",
    effect: "2 lease-related requests are pending a client reply.",
    tone: "warning"
  }
] as const;

export const requests = [
  {
    area: "Revenue and Contributions",
    title: "Detailed tuition receivable aging as of 06/30/2026",
    source: "Mandatory annual revenue question",
    note: "Used for allowance testing and reconciliation to the general ledger.",
    status: "Received"
  },
  {
    area: "Revenue and Contributions",
    title: "Listing of all federal and state grants received or receivable",
    source: "Grant funding scoping question marked not sure",
    note: "Requested early so the auditor can verify independently rather than wait for the client's self-assessment.",
    status: "Needs follow-up"
  },
  {
    area: "Opening Balances",
    title: "FY2024 and FY2025 trial balances with adjusting entries",
    source: "Re-audit after 2-year gap",
    note: "Substitute evidence for years without audit coverage.",
    status: "Needs follow-up"
  }
];

export const clientMetrics: Metric[] = [
  { label: "Questions remaining", value: "6", note: "Only unresolved items are shown" },
  { label: "Documents requested", value: "14", note: "9 uploaded so far" },
  { label: "Messages needing reply", value: "2", note: "Linked to exact questions" },
  { label: "Approvals to sign", value: "1", note: "Previous auditor authorization pending" }
];
