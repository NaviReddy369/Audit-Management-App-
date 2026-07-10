import { useMemo, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Switch } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { StatusPill } from "../components/ui/StatusPill";
import { Tabs } from "../components/ui/Tabs";
import { useToast } from "../components/ui/Toast";
import {
  clientTypeLabel,
  getActivityForEngagement,
  getClient,
  getEngagement,
  getTeamMember,
  questionMeta,
  type RequestStatus,
  type ScopeCard
} from "../data";
import { riskTone, stageTone, timeAgo } from "../lib/ui";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "questionnaire", label: "Questionnaire" },
  { key: "scoping", label: "Scoping" },
  { key: "requests", label: "Requests" },
  { key: "documents", label: "Documents" },
  { key: "communications", label: "Communications" },
  { key: "report", label: "Report" }
];

const allStatuses: RequestStatus[] = ["Requested", "Uploaded", "Received", "Needs Follow-up"];

function requestTone(status: RequestStatus) {
  if (status === "Received") return "success" as const;
  if (status === "Needs Follow-up") return "danger" as const;
  if (status === "Uploaded") return "info" as const;
  return "neutral" as const;
}

export function EngagementWorkspacePage() {
  const { engagementId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [tab, setTab] = useState("overview");

  const engagement = engagementId ? getEngagement(engagementId) : undefined;

  const [scopeCards, setScopeCards] = useState<ScopeCard[]>(engagement?.scopeCards ?? []);
  const [requests, setRequests] = useState(engagement?.requests ?? []);

  if (!engagement) return <Navigate to="/engagements" replace />;

  const client = getClient(engagement.clientId);
  const owner = getTeamMember(engagement.ownerId);
  const activity = getActivityForEngagement(engagement.id);

  function toggleScope(form: string, title: string) {
    setScopeCards((current) =>
      current.map((card) => {
        if (card.form !== form || card.title !== title) return card;
        const nextActive = !card.active;
        return {
          ...card,
          active: nextActive,
          status: nextActive ? "In scope" : "Out of scope",
          tone: nextActive ? "success" : "neutral",
          effect: nextActive ? card.effect : "No request items are generated for this area — not hidden, never created."
        };
      })
    );
  }

  function setRequestStatus(id: string, status: RequestStatus) {
    setRequests((current) => current.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  const documentStats = useMemo(() => {
    const counts: Record<RequestStatus, number> = { Requested: 0, Uploaded: 0, Received: 0, "Needs Follow-up": 0 };
    requests.forEach((r) => counts[r.status]++);
    return counts;
  }, [requests]);

  return (
    <div>
      <PageHeader
        eyebrow={client?.name}
        title={engagement.name}
        description="The operating surface for this engagement — scoping, questionnaire logic, evidence, approvals, communication, and report completion in one chain."
        actions={
          <>
            <button className="btn-secondary" onClick={() => addToast("Client portal link copied", "info")}>
              Share client link
            </button>
            <button className="btn-primary" onClick={() => addToast("Request list finalized", "success")}>
              Finalize request list
            </button>
          </>
        }
      />

      <section className="panel mb-6 p-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <StatusPill tone={stageTone(engagement.stage)} label={engagement.stage} />
          <StatusPill tone={riskTone(engagement.risk)} label={`${engagement.risk} risk`} />
          <span className="text-xs text-ink-400">{clientTypeLabel[engagement.clientTypeHistory]}</span>
          <span className="text-xs text-ink-400">· Due {engagement.dueDate}</span>
          {owner ? (
            <button onClick={() => navigate(`/team/${owner.id}`)} className="ml-auto text-xs font-semibold text-ink-500 hover:text-ink-800">
              Owner: {owner.name}
            </button>
          ) : null}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-ink-100 p-4">
            <p className="text-xs uppercase tracking-wide text-ink-500">Completion</p>
            <p className="mt-1.5 text-2xl font-semibold text-ink-900">{engagement.progress}%</p>
            <div className="mt-2">
              <ProgressBar value={engagement.progress} />
            </div>
          </div>
          <div className="rounded-xl border border-ink-100 p-4">
            <p className="text-xs uppercase tracking-wide text-ink-500">Questions answered</p>
            <p className="mt-1.5 text-2xl font-semibold text-ink-900">
              {engagement.questionsAnswered} / {engagement.questionsTotal}
            </p>
          </div>
          <div className="rounded-xl border border-ink-100 p-4">
            <p className="text-xs uppercase tracking-wide text-ink-500">Documents received</p>
            <p className="mt-1.5 text-2xl font-semibold text-ink-900">
              {engagement.documentsReceived} / {engagement.documentsRequested}
            </p>
          </div>
        </div>
      </section>

      <div className="panel">
        <div className="px-5 pt-2">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>
        <div className="p-5">
          {tab === "overview" ? (
            <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="eyebrow">Operational summary</p>
                <h3 className="section-title mb-4">Why this engagement needs attention</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <article className="rounded-xl border border-ink-100 p-4">
                    <h4 className="text-sm font-semibold text-ink-900">{clientTypeLabel[engagement.clientTypeHistory]}</h4>
                    <p className="mt-1.5 text-sm leading-6 text-ink-500">
                      {engagement.clientTypeHistory === "re_audit"
                        ? "Opening balances need substitute evidence since the prior period wasn't audited."
                        : engagement.clientTypeHistory === "first_year_predecessor"
                          ? "Predecessor auditor authorization and communication must clear before fieldwork begins."
                          : "Standard recurring-audit procedures apply based on last year's file."}
                    </p>
                  </article>
                  <article className="rounded-xl border border-ink-100 p-4">
                    <h4 className="text-sm font-semibold text-ink-900">{engagement.missingDocs} documents outstanding</h4>
                    <p className="mt-1.5 text-sm leading-6 text-ink-500">Missing evidence is blocking final review and report drafting.</p>
                  </article>
                  <article className="rounded-xl border border-ink-100 p-4">
                    <h4 className="text-sm font-semibold text-ink-900">{engagement.risk} risk rating</h4>
                    <p className="mt-1.5 text-sm leading-6 text-ink-500">
                      {engagement.risk === "High"
                        ? "Elevated risk factors mean extra manager review before sign-off."
                        : "Risk factors are within normal range for this engagement type."}
                    </p>
                  </article>
                  <article className="rounded-xl border border-ink-100 p-4">
                    <h4 className="text-sm font-semibold text-ink-900">{requests.length} request items generated</h4>
                    <p className="mt-1.5 text-sm leading-6 text-ink-500">Tied directly to scoping answers, not a generic checklist.</p>
                  </article>
                </div>
              </div>
              <div>
                <p className="eyebrow">Next steps</p>
                <h3 className="section-title mb-4">Critical path</h3>
                <div className="space-y-3">
                  {requests
                    .filter((r) => r.status === "Needs Follow-up")
                    .map((r) => (
                      <div key={r.id} className="rounded-xl border border-ink-100 p-3.5 text-sm leading-6 text-ink-600">
                        {r.title}
                      </div>
                    ))}
                  {requests.filter((r) => r.status === "Needs Follow-up").length === 0 ? (
                    <div className="rounded-xl border border-ink-100 p-3.5 text-sm leading-6 text-ink-500">Nothing is currently blocked — all requests are in a normal state.</div>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          {tab === "questionnaire" ? (
            <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
              <div>
                <p className="eyebrow">Question engine</p>
                <h3 className="section-title mb-4">Four question types, one reduced-friction flow</h3>
                <div className="space-y-3">
                  {engagement.questions.map((question) => (
                    <article key={question.title} className="rounded-xl border border-ink-100 p-4">
                      <div className="flex flex-col gap-2.5 md:flex-row md:items-start md:justify-between">
                        <div>
                          <span className={["pill", questionMeta[question.type].classes].join(" ")}>{questionMeta[question.type].label}</span>
                          <h4 className="mt-2.5 text-sm font-semibold text-ink-900">{question.title}</h4>
                        </div>
                        <StatusPill tone={question.answer.toLowerCase().includes("pending") ? "warning" : "success"} label={question.answer.toLowerCase().includes("pending") ? "Needs input" : "Resolved"} />
                      </div>
                      <p className="mt-2.5 text-sm leading-6 text-ink-500">{question.prompt}</p>
                      <div className="mt-3 rounded-lg border border-dashed border-brand-200 bg-brand-50/50 p-3.5 text-sm leading-6 text-ink-700">{question.answer}</div>
                      <p className="mt-2.5 text-xs leading-5 text-ink-400">{question.details}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Framework logic</p>
                <h3 className="section-title mb-4">What makes this valuable</h3>
                <div className="space-y-3 text-sm leading-7 text-ink-500">
                  <p>First-time questions become durable profile data, not yearly repetition.</p>
                  <p>Mandatory annual questions protect coverage and standardization.</p>
                  <p>Prior-year confirmation compresses recurring audit effort into quick validation.</p>
                  <p>Dynamic questions reduce clutter and only appear when scoping or answers justify them.</p>
                </div>
              </div>
            </section>
          ) : null}

          {tab === "scoping" ? (
            <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="eyebrow">Live interaction</p>
                <h3 className="section-title mb-4">Toggle an audit area in or out of scope</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {scopeCards.map((card) => (
                    <article key={`${card.form}-${card.title}`} className="rounded-xl border border-ink-100 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="eyebrow">{card.form}</p>
                          <h4 className="mt-0.5 text-sm font-semibold text-ink-900">{card.title}</h4>
                        </div>
                        <Switch
                          checked={card.active}
                          onChange={() => toggleScope(card.form, card.title)}
                          className={["group inline-flex h-6 w-11 shrink-0 items-center rounded-full transition", card.active ? "bg-brand-500" : "bg-ink-200"].join(" ")}
                        >
                          <span className={["inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition", card.active ? "translate-x-6" : "translate-x-1"].join(" ")} />
                        </Switch>
                      </div>
                      <div className="mt-3">
                        <StatusPill tone={card.tone} label={card.status} />
                      </div>
                      <p className="mt-2.5 text-sm leading-6 text-ink-500">{card.effect}</p>
                    </article>
                  ))}
                  {scopeCards.length === 0 ? <p className="text-sm text-ink-400">No scoping data recorded for this engagement yet.</p> : null}
                </div>
              </div>
              <div>
                <p className="eyebrow">Why owners care</p>
                <h3 className="section-title mb-4">Visible downstream impact</h3>
                <div className="space-y-3 text-sm leading-7 text-ink-500">
                  <p>Out-of-scope areas are not merely hidden. Their questions and request items are never generated.</p>
                  <p>Needs-confirmation areas stay open in a controlled state so nothing silently disappears.</p>
                  <p>This is where the product moves from generic intake software to audit-specific workflow intelligence.</p>
                </div>
              </div>
            </section>
          ) : null}

          {tab === "requests" ? (
            <section>
              <p className="eyebrow">Auditor output</p>
              <h3 className="section-title mb-4">Generated request list with traceability</h3>
              <div className="space-y-3">
                {requests.map((request) => (
                  <article key={request.id} className="rounded-xl border border-ink-100 p-4">
                    <div className="flex flex-col gap-2.5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="eyebrow">{request.area}</p>
                        <h4 className="mt-0.5 text-sm font-semibold text-ink-900">{request.title}</h4>
                      </div>
                      <Menu as="div" className="relative shrink-0">
                        <MenuButton className="flex items-center gap-1.5">
                          <StatusPill tone={requestTone(request.status)} label={request.status} />
                          <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
                        </MenuButton>
                        <MenuItems anchor="bottom end" className="mt-1.5 w-44 rounded-xl border border-ink-100 bg-surface p-1.5 shadow-popover focus:outline-none">
                          {allStatuses.map((status) => (
                            <MenuItem key={status}>
                              <button
                                onClick={() => setRequestStatus(request.id, status)}
                                className="flex w-full items-center rounded-lg px-2.5 py-2 text-left text-sm text-ink-700 data-[focus]:bg-ink-50"
                              >
                                {status}
                              </button>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    </div>
                    <p className="mt-2.5 text-sm leading-6 text-ink-500">Triggered by: {request.source}</p>
                    <div className="mt-3 rounded-lg bg-warning-50 p-3.5 text-sm leading-6 text-warning-700">{request.note}</div>
                  </article>
                ))}
                {requests.length === 0 ? <p className="text-sm text-ink-400">No request items generated yet.</p> : null}
              </div>
            </section>
          ) : null}

          {tab === "documents" ? (
            <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow">Evidence layer</p>
                <h3 className="section-title mb-4">Collection status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {allStatuses.map((status) => (
                    <div key={status} className="rounded-xl border border-ink-100 p-4">
                      <p className="text-xs uppercase tracking-wide text-ink-500">{status}</p>
                      <p className="mt-1.5 text-2xl font-semibold text-ink-900">{documentStats[status]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Future AI layer</p>
                <h3 className="section-title mb-4">Classification and gap detection</h3>
                <div className="space-y-3 text-sm leading-7 text-ink-500">
                  <p>Auto-classify uploads into request items and rename them consistently.</p>
                  <p>Detect expected but missing evidence based on scoping and response patterns.</p>
                  <p>Extract dates, amounts, and counterparties with OCR to speed review.</p>
                </div>
              </div>
            </section>
          ) : null}

          {tab === "communications" ? (
            <section className="grid gap-4 xl:grid-cols-2">
              <div>
                <p className="eyebrow">Question-linked activity</p>
                <h3 className="section-title mb-4">Communication timeline</h3>
                <div className="space-y-3">
                  {activity.map((entry) => (
                    <div key={entry.id} className="rounded-xl border border-ink-100 p-3.5 text-sm leading-6 text-ink-600">
                      <span className="font-semibold text-ink-900">{entry.actor}</span> {entry.action}
                      <p className="mt-1 text-xs text-ink-400">{timeAgo(entry.timestamp)}</p>
                    </div>
                  ))}
                  {activity.length === 0 ? <p className="text-sm text-ink-400">No communication activity recorded yet.</p> : null}
                </div>
              </div>
              <div>
                <p className="eyebrow">Professional standards workflow</p>
                <h3 className="section-title mb-4">Previous auditor requests</h3>
                <div className="space-y-3 text-sm leading-7 text-ink-500">
                  <p>Client authorization request generated and tracked inside the engagement.</p>
                  <p>Previous auditor contact stays blocked until authorization is signed.</p>
                  <p>Every step, timestamp, and response remains preserved as an audit trail.</p>
                </div>
              </div>
            </section>
          ) : null}

          {tab === "report" ? (
            <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="eyebrow">Adobe workspace</p>
                <h3 className="section-title mb-4">Report companion, not a separate app</h3>
                <div className="rounded-2xl bg-ink-100 p-5">
                  <div className="relative aspect-[3/4] rounded-xl border border-ink-200 bg-surface shadow-card">
                    <div className="absolute left-5 top-5 rounded-full bg-ink-100 px-3 py-2 text-xs font-semibold text-ink-600">KBA-403 Revenue</div>
                    <div className="absolute left-10 top-24 rounded-lg border-2 border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">Entity name</div>
                    <div className="absolute right-10 top-24 rounded-lg border-2 border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">FY end</div>
                    <div className="absolute left-10 top-52 rounded-lg border-2 border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">Grant funding</div>
                    <div className="absolute right-10 top-72 rounded-lg border-2 border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">Tuition receivable</div>
                  </div>
                </div>
              </div>
              <div>
                <p className="eyebrow">Field mapping</p>
                <h3 className="section-title mb-4">Answer sync</h3>
                <div className="space-y-3">
                  {["Entity name -> report header", "FY end -> reporting period", "Grant funding -> revenue compliance section", "Tuition receivable -> revenue testing section"].map((item) => (
                    <div key={item} className="rounded-xl border border-ink-100 p-3.5 text-sm leading-6 text-ink-600">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
