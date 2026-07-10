export type Tone = "neutral" | "info" | "success" | "warning" | "danger";

export type EntityType = "church" | "school" | "nfp_program_income" | "nfp_general";

export type ClientTypeHistory = "first_year_new" | "continuing" | "re_audit" | "first_year_predecessor";

export type RiskLevel = "Low" | "Moderate" | "High";

export type EngagementStage = "Draft" | "Sent" | "In Progress" | "Submitted" | "Reviewed";

export type Role = "Partner" | "Manager" | "Senior Associate" | "Associate";

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: Role;
  email: string;
  capacity: number;
  activeEngagements: number;
  tone: "brand" | "success" | "warning" | "info" | "danger";
  joined: string;
};

export type Contact = {
  name: string;
  title: string;
  email: string;
  phone: string;
};

export type Client = {
  id: string;
  name: string;
  entityType: EntityType;
  since: string;
  fiscalYearEnd: string;
  riskRating: RiskLevel;
  contacts: Contact[];
  address: string;
  primaryAuditorId: string;
};

export type QuestionType = "first" | "annual" | "confirm" | "dynamic";

export type QuestionCard = {
  type: QuestionType;
  title: string;
  prompt: string;
  answer: string;
  details: string;
};

export type ScopeCard = {
  form: string;
  title: string;
  status: "In scope" | "Out of scope" | "Needs confirmation";
  effect: string;
  tone: Tone;
  active: boolean;
};

export type RequestStatus = "Requested" | "Uploaded" | "Received" | "Needs Follow-up";

export type RequestItemRow = {
  id: string;
  area: string;
  title: string;
  source: string;
  note: string;
  status: RequestStatus;
};

export type Engagement = {
  id: string;
  clientId: string;
  name: string;
  fiscalYearEnd: string;
  clientTypeHistory: ClientTypeHistory;
  stage: EngagementStage;
  progress: number;
  missingDocs: number;
  risk: RiskLevel;
  ownerId: string;
  dueDate: string;
  questionsAnswered: number;
  questionsTotal: number;
  documentsReceived: number;
  documentsRequested: number;
  questions: QuestionCard[];
  scopeCards: ScopeCard[];
  requests: RequestItemRow[];
};

export type QueueItem = {
  title: string;
  meta: string;
  status: string;
  tone: Tone;
};

export type ActivityEntry = {
  id: string;
  clientId?: string;
  engagementId?: string;
  actor: string;
  action: string;
  timestamp: string;
  tone: Tone;
};

export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  tone: Tone;
  read: boolean;
};

export const entityTypeLabel: Record<EntityType, string> = {
  church: "Church",
  school: "School",
  nfp_program_income: "NFP / Program Income",
  nfp_general: "General NFP"
};

export const clientTypeLabel: Record<ClientTypeHistory, string> = {
  first_year_new: "First-year (new)",
  continuing: "Continuing",
  re_audit: "Re-audit after gap",
  first_year_predecessor: "First-year (predecessor)"
};

export const questionMeta: Record<QuestionType, { label: string; classes: string }> = {
  first: { label: "First-time", classes: "bg-brand-50 text-brand-700" },
  annual: { label: "Mandatory annual", classes: "bg-warning-50 text-warning-700" },
  confirm: { label: "Prior-year confirm", classes: "bg-info-50 text-info-700" },
  dynamic: { label: "Dynamic", classes: "bg-ink-100 text-ink-600" }
};
