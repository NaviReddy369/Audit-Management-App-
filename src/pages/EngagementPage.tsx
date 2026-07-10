import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { questionMeta, questions, requests, scopeCards } from "../data";
import { toneClass } from "../lib/ui";

const tabs = ["Overview", "Questionnaire", "Scoping Map", "Request List", "Documents", "Communications", "Audit PDF"] as const;

export function EngagementPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div>
      <PageHeader
        eyebrow="Whitfield Preparatory Academy"
        title="Engagement Workspace"
        description="This workspace is the operating surface for auditors. It keeps scoping, questionnaire logic, supporting evidence, approvals, communication, and PDF completion in one chain."
        actions={
          <>
            <button className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink">Share client link</button>
            <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white">Finalize request list</button>
          </>
        }
      />

      <section className="panel mb-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Completion", "68%"],
            ["Questions answered", "18 / 24"],
            ["Documents received", "9 / 14"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-ink/45">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              "rounded-2xl px-4 py-3 text-sm font-semibold transition",
              activeTab === tab ? "bg-ink text-white" : "bg-white/70 text-ink/70"
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" ? (
        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-5">
            <p className="eyebrow">Operational summary</p>
            <h3 className="font-display text-3xl leading-none">Why this engagement needs attention</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["Re-audit after 2-year gap", "Opening balances need substitute evidence for FY2024 and FY2025."],
                ["Grant funding uncertain", "Revenue scoping is still open and blocks final PDF prep."],
                ["Question-linked threads active", "6 conversations are tied directly to source questions."],
                ["PDF prep is partially mapped", "14 fields are already connected to structured answers."]
              ].map(([title, note]) => (
                <article key={title} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                  <h4 className="text-base font-semibold text-ink">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-ink/60">{note}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow">Next steps</p>
            <h3 className="font-display text-3xl leading-none">Critical path</h3>
            <div className="mt-5 space-y-4">
              {[
                "Confirm grant funding so revenue requests and KBA-403 can be finalized.",
                "Obtain prior auditor authorization and preserve the audit trail in-platform.",
                "Collect FY2024 and FY2025 opening balance support for the re-audit gap.",
                "Complete payroll and governance evidence review, then unlock PDF completion."
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-ink/65">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Questionnaire" ? (
        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="panel p-5">
            <p className="eyebrow">Question engine</p>
            <h3 className="font-display text-3xl leading-none">Four question types, one reduced-friction flow</h3>
            <div className="mt-5 space-y-4">
              {questions.map((question) => (
                <article key={question.title} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <span className={["pill", questionMeta[question.type].classes].join(" ")}>{questionMeta[question.type].label}</span>
                      <h4 className="mt-3 text-base font-semibold text-ink">{question.title}</h4>
                    </div>
                    <span className="pill bg-ink/5 text-ink/70">{question.answer.includes("Pending") ? "Needs input" : "Resolved"}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{question.prompt}</p>
                  <div className="mt-4 rounded-3xl border border-dashed border-tide/25 bg-tide/5 p-4 text-sm leading-6 text-ink/70">
                    {question.answer}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink/55">{question.details}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow">Framework logic</p>
            <h3 className="font-display text-3xl leading-none">What makes this valuable</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/65">
              <p>First-time questions become durable profile data, not yearly repetition.</p>
              <p>Mandatory annual questions protect coverage and standardization.</p>
              <p>Prior-year confirmation compresses recurring audit effort into quick validation.</p>
              <p>Dynamic questions reduce clutter and only appear when scoping or answers justify them.</p>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Scoping Map" ? (
        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-5">
            <p className="eyebrow">Hero interaction</p>
            <h3 className="font-display text-3xl leading-none">Scoping Map</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {scopeCards.map((card) => (
                <article key={card.title} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow">{card.form}</p>
                      <h4 className="text-base font-semibold text-ink">{card.title}</h4>
                    </div>
                    <span className={["pill", toneClass(card.tone)].join(" ")}>{card.status}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{card.effect}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow">Why owners care</p>
            <h3 className="font-display text-3xl leading-none">Visible downstream impact</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/65">
              <p>Out-of-scope areas are not merely hidden. Their questions and request items are never generated.</p>
              <p>Needs-confirmation areas stay open in a controlled state so nothing silently disappears.</p>
              <p>This is where the product moves from generic intake software to audit-specific workflow intelligence.</p>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Request List" ? (
        <section className="panel p-5">
          <p className="eyebrow">Auditor output</p>
          <h3 className="font-display text-3xl leading-none">Generated request list with traceability</h3>
          <div className="mt-5 space-y-4">
            {requests.map((request) => (
              <article key={request.title} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="eyebrow">{request.area}</p>
                    <h4 className="text-base font-semibold text-ink">{request.title}</h4>
                  </div>
                  <span className="pill bg-ink/5 text-ink/70">{request.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/65">Triggered by: {request.source}</p>
                <div className="mt-4 rounded-3xl bg-ember/10 p-4 text-sm leading-6 text-[#7a4f20]">{request.note}</div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "Documents" ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <div className="panel p-5">
            <p className="eyebrow">Evidence layer</p>
            <h3 className="font-display text-3xl leading-none">Document collection</h3>
            <div className="mt-5 space-y-4">
              {[
                "Tuition aging uploaded and matched to revenue request with 98% confidence.",
                "Payroll summary uploaded but employee census is still missing.",
                "Grant agreements are still absent and flagged by expected-support logic."
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-ink/65">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow">Future AI layer</p>
            <h3 className="font-display text-3xl leading-none">Classification and gap detection</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/65">
              <p>Auto-classify uploads into request items and rename them consistently.</p>
              <p>Detect expected but missing evidence based on scoping and response patterns.</p>
              <p>Extract dates, amounts, and counterparties with OCR to speed review.</p>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Communications" ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <div className="panel p-5">
            <p className="eyebrow">Question-linked threads</p>
            <h3 className="font-display text-3xl leading-none">Communication center</h3>
            <div className="mt-5 space-y-4">
              {[
                "Grant funding question -> client notes possible special-education support -> auditor requests award notices.",
                "Board meeting cadence updated from quarterly to finance committee monthly review.",
                "Payroll support thread documents what has been uploaded and what is still missing."
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-ink/65">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow">Professional standards workflow</p>
            <h3 className="font-display text-3xl leading-none">Previous auditor requests</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/65">
              <p>Client authorization request generated and tracked inside the engagement.</p>
              <p>Previous auditor contact stays blocked until authorization is signed.</p>
              <p>Every step, timestamp, and response remains preserved as an audit trail.</p>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Audit PDF" ? (
        <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="panel p-5">
            <p className="eyebrow">Adobe workspace</p>
            <h3 className="font-display text-3xl leading-none">PDF companion, not a separate app</h3>
            <div className="mt-5 rounded-[28px] bg-[#d8d0c4] p-5">
              <div className="relative aspect-[3/4] rounded-[22px] border border-ink/10 bg-white shadow-panel">
                <div className="absolute left-5 top-5 rounded-full bg-ink/5 px-3 py-2 text-xs font-semibold text-ink/65">KBA-403 Revenue</div>
                <div className="absolute left-10 top-24 rounded-xl border-2 border-tide/40 bg-tide/10 px-3 py-2 text-xs font-semibold text-tide">Entity name</div>
                <div className="absolute right-10 top-24 rounded-xl border-2 border-tide/40 bg-tide/10 px-3 py-2 text-xs font-semibold text-tide">FY end</div>
                <div className="absolute left-10 top-52 rounded-xl border-2 border-tide/40 bg-tide/10 px-3 py-2 text-xs font-semibold text-tide">Grant funding</div>
                <div className="absolute right-10 top-72 rounded-xl border-2 border-tide/40 bg-tide/10 px-3 py-2 text-xs font-semibold text-tide">Tuition receivable</div>
              </div>
            </div>
          </div>
          <div className="panel p-5">
            <p className="eyebrow">Field mapping</p>
            <h3 className="font-display text-3xl leading-none">Answer sync</h3>
            <div className="mt-5 space-y-4">
              {[
                "Entity name -> PDF header",
                "FY end -> reporting period",
                "Grant funding -> revenue compliance section",
                "Tuition receivable -> revenue testing section"
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-ink/65">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
