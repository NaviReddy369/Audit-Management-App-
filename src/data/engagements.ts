import type { Engagement, QuestionCard, RequestItemRow, ScopeCard } from "./types";

const whitfieldQuestions: QuestionCard[] = [
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

const whitfieldScope: ScopeCard[] = [
  { form: "KBA-403", title: "Tuition and receivables", status: "In scope", effect: "4 questions and 3 request items are active.", tone: "success", active: true },
  { form: "KBA-409", title: "Investments and endowment", status: "Out of scope", effect: "Treasury questions and request items are removed entirely.", tone: "neutral", active: false },
  { form: "KBA-403", title: "Federal and state grants", status: "Needs confirmation", effect: "Revenue testing is held open until confirmed.", tone: "warning", active: true },
  { form: "KBA-410", title: "Debt and facilities", status: "Needs confirmation", effect: "2 lease-related requests are pending a client reply.", tone: "warning", active: true }
];

const whitfieldRequests: RequestItemRow[] = [
  {
    id: "wf-1",
    area: "Revenue and Contributions",
    title: "Detailed tuition receivable aging as of 06/30/2026",
    source: "Mandatory annual revenue question",
    note: "Used for allowance testing and reconciliation to the general ledger.",
    status: "Received"
  },
  {
    id: "wf-2",
    area: "Revenue and Contributions",
    title: "Listing of all federal and state grants received or receivable",
    source: "Grant funding scoping question marked not sure",
    note: "Requested early so the auditor can verify independently rather than wait for the client's self-assessment.",
    status: "Needs Follow-up"
  },
  {
    id: "wf-3",
    area: "Opening Balances",
    title: "FY2024 and FY2025 trial balances with adjusting entries",
    source: "Re-audit after 2-year gap",
    note: "Substitute evidence for years without audit coverage.",
    status: "Needs Follow-up"
  },
  {
    id: "wf-4",
    area: "Payroll",
    title: "Payroll register and employee census for FY2026",
    source: "Always-in-scope payroll cycle",
    note: "Ties to headcount and benefits testing.",
    status: "Uploaded"
  }
];

const graceQuestions: QuestionCard[] = [
  {
    type: "annual",
    title: "Contribution restrictions",
    prompt: "Identify any donor-restricted gifts, pledges, or endowment activity for the year.",
    answer: "Two restricted building-fund gifts confirmed; no new endowment activity.",
    details: "Drives net-asset classification testing."
  },
  {
    type: "confirm",
    title: "In-kind contributions",
    prompt: "Same in-kind policy as last year, or has recognition changed?",
    answer: "Same policy as FY2025.",
    details: "Prior-year confirmation reduces repetitive documentation."
  },
  {
    type: "dynamic",
    title: "Board governance cadence",
    prompt: "Confirm board and finance committee meeting frequency for FY2026.",
    answer: "Monthly finance committee, quarterly full board.",
    details: "Feeds governance controls testing."
  }
];

const graceScope: ScopeCard[] = [
  { form: "KBA-403", title: "Contributions and pledges", status: "In scope", effect: "5 questions and 4 request items are active.", tone: "success", active: true },
  { form: "KBA-409", title: "Investments and endowment", status: "Out of scope", effect: "No endowment activity reported; treasury forms removed.", tone: "neutral", active: false },
  { form: "KBA-406", title: "In-kind contributions", status: "In scope", effect: "Donated goods and services tracked separately.", tone: "success", active: true }
];

const graceRequests: RequestItemRow[] = [
  {
    id: "gc-1",
    area: "Revenue and Contributions",
    title: "Listing of in-kind contributions and donated services",
    source: "In-kind contributions question",
    note: "Include donated goods, services, and use of facilities recognized in net assets.",
    status: "Uploaded"
  },
  {
    id: "gc-2",
    area: "Revenue and Contributions",
    title: "Restricted fund and pledge listing",
    source: "Contribution restrictions question",
    note: "Ties to net asset classification and release-from-restriction testing.",
    status: "Received"
  },
  {
    id: "gc-3",
    area: "Governance",
    title: "Board and finance committee minutes for FY2026",
    source: "Board governance cadence question",
    note: "Confirms oversight cadence and approval of major transactions.",
    status: "Needs Follow-up"
  }
];

const hopeQuestions: QuestionCard[] = [
  {
    type: "annual",
    title: "Program service contracts",
    prompt: "List all government and foundation program service contracts active in FY2026.",
    answer: "3 county contracts and 1 foundation grant confirmed.",
    details: "Drives exchange-transaction revenue recognition testing."
  },
  {
    type: "confirm",
    title: "Cost allocation methodology",
    prompt: "Same cost allocation plan as FY2025?",
    answer: "Same methodology, updated indirect rate.",
    details: "Prior-year confirmation with a noted rate change."
  }
];

const hopeScope: ScopeCard[] = [
  { form: "KBA-404", title: "Program service / exchange revenue", status: "In scope", effect: "Contract revenue recognition testing is active.", tone: "success", active: true },
  { form: "KBA-409", title: "Investments and endowment", status: "Out of scope", effect: "No investment activity this year.", tone: "neutral", active: false }
];

const hopeRequests: RequestItemRow[] = [
  {
    id: "hf-1",
    area: "Program Revenue",
    title: "Listing of program service contracts with performance obligations",
    source: "Program service contracts question",
    note: "Supports exchange-transaction vs. contribution revenue recognition testing.",
    status: "Received"
  },
  {
    id: "hf-2",
    area: "Program Revenue",
    title: "FY2026 indirect cost rate agreement",
    source: "Cost allocation methodology question",
    note: "Confirms allowable cost recovery under updated rate.",
    status: "Received"
  }
];

function genericQuestions(label: string): QuestionCard[] {
  return [
    {
      type: "annual",
      title: "Revenue streams for the fiscal year",
      prompt: `Identify all revenue sources for ${label} during the current fiscal year.`,
      answer: "Confirmed by client finance contact.",
      details: "Asked every year to keep revenue testing scoped correctly."
    },
    {
      type: "confirm",
      title: "Banking and signatories",
      prompt: "Same banking relationships and authorized signers as last year?",
      answer: "Same as prior year.",
      details: "Reduces repetitive data entry for recurring audits."
    }
  ];
}

function genericScope(): ScopeCard[] {
  return [
    { form: "KBA-403", title: "Revenue and receivables", status: "In scope", effect: "Standard revenue testing questions are active.", tone: "success", active: true },
    { form: "KBA-409", title: "Investments and endowment", status: "Out of scope", effect: "No investment activity reported.", tone: "neutral", active: false }
  ];
}

function genericRequests(area: string): RequestItemRow[] {
  return [
    {
      id: `${area}-1`,
      area: "Revenue and Contributions",
      title: "Revenue detail and supporting schedules for the fiscal year",
      source: "Annual revenue question",
      note: "Used for revenue testing and reconciliation to the general ledger.",
      status: "Requested"
    },
    {
      id: `${area}-2`,
      area: "Governance",
      title: "Board or finance committee minutes for the fiscal year",
      source: "Standard governance procedure",
      note: "Confirms oversight of major financial decisions.",
      status: "Requested"
    }
  ];
}

export const engagements: Engagement[] = [
  {
    id: "whitfield-fy26",
    clientId: "whitfield-prep",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-06-30",
    clientTypeHistory: "re_audit",
    stage: "In Progress",
    progress: 68,
    missingDocs: 5,
    risk: "High",
    ownerId: "maya-s",
    dueDate: "2026-08-15",
    questionsAnswered: 18,
    questionsTotal: 24,
    documentsReceived: 9,
    documentsRequested: 14,
    questions: whitfieldQuestions,
    scopeCards: whitfieldScope,
    requests: whitfieldRequests
  },
  {
    id: "grace-fy26",
    clientId: "grace-community",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-12-31",
    clientTypeHistory: "continuing",
    stage: "In Progress",
    progress: 74,
    missingDocs: 3,
    risk: "Moderate",
    ownerId: "noah-t",
    dueDate: "2027-02-28",
    questionsAnswered: 15,
    questionsTotal: 19,
    documentsReceived: 11,
    documentsRequested: 15,
    questions: graceQuestions,
    scopeCards: graceScope,
    requests: graceRequests
  },
  {
    id: "hope-fy26",
    clientId: "hope-family",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-09-30",
    clientTypeHistory: "continuing",
    stage: "Submitted",
    progress: 92,
    missingDocs: 1,
    risk: "Low",
    ownerId: "maya-s",
    dueDate: "2026-11-30",
    questionsAnswered: 21,
    questionsTotal: 22,
    documentsReceived: 13,
    documentsRequested: 14,
    questions: hopeQuestions,
    scopeCards: hopeScope,
    requests: hopeRequests
  },
  {
    id: "willow-fy26",
    clientId: "willow-creek",
    name: "FY2026 First-Year Audit",
    fiscalYearEnd: "2026-12-31",
    clientTypeHistory: "first_year_predecessor",
    stage: "Draft",
    progress: 38,
    missingDocs: 7,
    risk: "High",
    ownerId: "aiden-r",
    dueDate: "2027-03-01",
    questionsAnswered: 8,
    questionsTotal: 21,
    documentsReceived: 3,
    documentsRequested: 12,
    questions: genericQuestions("Willow Creek Fellowship"),
    scopeCards: genericScope(),
    requests: genericRequests("wc")
  },
  {
    id: "riverside-fy26",
    clientId: "riverside-youth",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-06-30",
    clientTypeHistory: "continuing",
    stage: "Sent",
    progress: 22,
    missingDocs: 9,
    risk: "Moderate",
    ownerId: "priya-k",
    dueDate: "2026-09-15",
    questionsAnswered: 5,
    questionsTotal: 20,
    documentsReceived: 2,
    documentsRequested: 13,
    questions: genericQuestions("Riverside Youth Alliance"),
    scopeCards: genericScope(),
    requests: genericRequests("ry")
  },
  {
    id: "lakeside-fy26",
    clientId: "lakeside-montessori",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-06-30",
    clientTypeHistory: "continuing",
    stage: "Reviewed",
    progress: 100,
    missingDocs: 0,
    risk: "Low",
    ownerId: "priya-k",
    dueDate: "2026-08-30",
    questionsAnswered: 18,
    questionsTotal: 18,
    documentsReceived: 12,
    documentsRequested: 12,
    questions: genericQuestions("Lakeside Montessori School"),
    scopeCards: genericScope(),
    requests: genericRequests("lm")
  },
  {
    id: "harborview-fy26",
    clientId: "harborview-shelter",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-12-31",
    clientTypeHistory: "continuing",
    stage: "In Progress",
    progress: 55,
    missingDocs: 4,
    risk: "Moderate",
    ownerId: "sam-w",
    dueDate: "2027-02-15",
    questionsAnswered: 12,
    questionsTotal: 20,
    documentsReceived: 7,
    documentsRequested: 14,
    questions: genericQuestions("Harborview Family Shelter"),
    scopeCards: genericScope(),
    requests: genericRequests("hv")
  },
  {
    id: "standrews-fy26",
    clientId: "st-andrews",
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-06-30",
    clientTypeHistory: "continuing",
    stage: "Submitted",
    progress: 88,
    missingDocs: 2,
    risk: "Low",
    ownerId: "noah-t",
    dueDate: "2026-09-01",
    questionsAnswered: 17,
    questionsTotal: 19,
    documentsReceived: 10,
    documentsRequested: 12,
    questions: genericQuestions("St. Andrew's Parish"),
    scopeCards: genericScope(),
    requests: genericRequests("sa")
  },
  {
    id: "whitfield-fy25",
    clientId: "whitfield-prep",
    name: "FY2025 Financial Statement Audit",
    fiscalYearEnd: "2025-06-30",
    clientTypeHistory: "re_audit",
    stage: "Reviewed",
    progress: 100,
    missingDocs: 0,
    risk: "Moderate",
    ownerId: "maya-s",
    dueDate: "2025-08-20",
    questionsAnswered: 22,
    questionsTotal: 22,
    documentsReceived: 13,
    documentsRequested: 13,
    questions: genericQuestions("Whitfield Preparatory Academy"),
    scopeCards: genericScope(),
    requests: genericRequests("wf25")
  }
];

export function getEngagement(id: string) {
  return engagements.find((engagement) => engagement.id === id);
}

export function getEngagementsForClient(clientId: string) {
  return engagements.filter((engagement) => engagement.clientId === clientId);
}

export function getEngagementsForOwner(ownerId: string) {
  return engagements.filter((engagement) => engagement.ownerId === ownerId);
}
