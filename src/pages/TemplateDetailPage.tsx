import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { getTemplate } from "../data";

const phaseDistribution: { phase: string; share: number; description: string }[] = [
  { phase: "Preliminary Engagement", share: 0.14, description: "Client acceptance, engagement letter terms, opening-balance triggers." },
  { phase: "Entity Understanding", share: 0.22, description: "Legal structure, governance, related parties, fraud risk inquiry." },
  { phase: "Scoping", share: 0.18, description: "One question per audit area — the gate that activates or removes an entire section." },
  { phase: "Entity-Level & IT Controls", share: 0.16, description: "Board oversight, accounting system, access controls, and change management." },
  { phase: "Transaction Controls", share: 0.3, description: "Cycle-by-cycle detail questions, only rendered for audit areas that scoped in." }
];

const ruleExamples = [
  { trigger: "Client type = first-year with predecessor auditor", action: "Adds predecessor communication question block + opening balance request items + a flag to obtain predecessor authorization." },
  { trigger: "Entity type = church", action: "Adds in-kind contribution, pledge record, and restricted fund request items not present on other templates." },
  { trigger: "Any \"not sure\" answer", action: "Always fires a missing_info flag rather than a silent skip, so nothing falls through branching unnoticed." }
];

export function TemplateDetailPage() {
  const { templateId } = useParams();
  const [preview, setPreview] = useState(false);
  const template = templateId ? getTemplate(templateId) : undefined;
  if (!template) return <Navigate to="/templates" replace />;

  return (
    <div>
      <PageHeader
        eyebrow={template.entityTypes}
        title={template.title}
        description={template.note}
        actions={
          <>
            <button className="btn-secondary">Clone template</button>
            <button className={preview ? "btn-primary" : "btn-secondary"} onClick={() => setPreview((v) => !v)}>
              {preview ? "Exit preview" : "Preview as respondent"}
            </button>
          </>
        }
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Questions</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink-900">{template.questionCount}</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Applies to</p>
          <p className="mt-1.5 text-sm font-semibold text-ink-900">{template.clientTypes}</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Last edited</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink-900">{template.lastEdited}</p>
        </div>
      </section>

      {preview ? (
        <section className="flex justify-center">
          <div className="w-full max-w-sm rounded-[32px] border border-ink-200 bg-ink-900 p-3 shadow-raised">
            <div className="rounded-[24px] bg-surface p-5">
              <p className="eyebrow mb-1">Question 4 of {template.questionCount}</p>
              <div className="mb-4 h-1.5 w-full rounded-full bg-ink-100">
                <div className="h-full w-2/5 rounded-full bg-brand-500" />
              </div>
              <h3 className="text-base font-semibold text-ink-900">Does the organization hold investments or an endowment?</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">This determines whether treasury and investment procedures apply this year.</p>
              <div className="mt-4 space-y-2">
                {["Yes", "No", "Not sure"].map((option) => (
                  <button key={option} className="w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-left text-sm text-ink-700 transition hover:border-brand-300 hover:bg-brand-50">
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex justify-between text-xs font-semibold text-ink-400">
                <span>Back</span>
                <span className="text-brand-600">Save and continue later</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-5">
            <p className="eyebrow mb-1">Structure</p>
            <h3 className="section-title mb-4">Question set by phase</h3>
            <div className="space-y-3">
              {phaseDistribution.map((row) => (
                <div key={row.phase} className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-ink-900">{row.phase}</h4>
                    <span className="pill bg-ink-100 text-ink-600">{Math.max(1, Math.round(template.questionCount * row.share))} questions</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-ink-500">{row.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow mb-1">Rules engine</p>
            <h3 className="section-title mb-4">Example rule mappings</h3>
            <div className="space-y-3">
              {ruleExamples.map((rule) => (
                <div key={rule.trigger} className="rounded-xl border border-ink-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">If: {rule.trigger}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-600">{rule.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
