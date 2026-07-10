export type Template = {
  id: string;
  title: string;
  entityTypes: string;
  clientTypes: string;
  questionCount: number;
  lastEdited: string;
  note: string;
  isSystemSeeded: boolean;
};

export const templates: Template[] = [
  {
    id: "school-reaudit",
    title: "School / Re-audit after gap",
    entityTypes: "School",
    clientTypes: "Re-audit after gap",
    questionCount: 24,
    lastEdited: "2026-05-12",
    note: "Includes opening balance recovery, predecessor workflow, tuition, grants, governance, and payroll logic.",
    isSystemSeeded: true
  },
  {
    id: "church-continuing",
    title: "Church / Continuing",
    entityTypes: "Church",
    clientTypes: "Continuing",
    questionCount: 19,
    lastEdited: "2026-04-30",
    note: "Optimized for contributions, donor restrictions, in-kind support, and board governance.",
    isSystemSeeded: true
  },
  {
    id: "nfp-program-income",
    title: "NFP with program income",
    entityTypes: "General NFP / Program income",
    clientTypes: "Continuing / First-year",
    questionCount: 22,
    lastEdited: "2026-03-18",
    note: "Adds exchange transaction logic, contract revenue, and deferred revenue considerations.",
    isSystemSeeded: true
  },
  {
    id: "nfp-general",
    title: "General NFP / First-year",
    entityTypes: "General NFP",
    clientTypes: "First-year (new)",
    questionCount: 21,
    lastEdited: "2026-02-02",
    note: "Baseline question set for a first-year general nonprofit engagement, no specialized revenue logic.",
    isSystemSeeded: true
  }
];

export const automationRoadmap = [
  {
    title: "Auto-generate questionnaires from audit forms",
    note: "Parse PDF workpapers, detect recurring fields, and classify questions into first-time, annual, confirm, or dynamic."
  },
  {
    title: "Suggested follow-ups",
    note: "When answers or uploads are incomplete, propose context-aware follow-up prompts tied to the exact question."
  },
  {
    title: "Risk detection layer",
    note: "Identify patterns like multi-year gaps, uncertain grant funding, unusual related-party activity, or missing approvals."
  },
  {
    title: "PDF completion score",
    note: "Measure when enough trusted answers and evidence exist for the auditor to complete the final Adobe form."
  }
];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id);
}
