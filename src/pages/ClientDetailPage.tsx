import { useState } from "react";
import { Building2, Mail, Phone, User } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { Avatar } from "../components/ui/Avatar";
import { StatusPill } from "../components/ui/StatusPill";
import { Tabs } from "../components/ui/Tabs";
import { DataTable, type Column } from "../components/ui/DataTable";
import { EmptyState } from "../components/ui/EmptyState";
import {
  entityTypeLabel,
  getActivityForClient,
  getClient,
  getEngagementsForClient,
  getTeamMember,
  type Engagement
} from "../data";
import { riskTone, stageTone, timeAgo, toneDot } from "../lib/ui";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "engagements", label: "Engagements" },
  { key: "contacts", label: "Contacts" },
  { key: "documents", label: "Documents" },
  { key: "activity", label: "Activity" }
];

export function ClientDetailPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  const client = clientId ? getClient(clientId) : undefined;
  if (!client) return <Navigate to="/clients" replace />;

  const clientEngagements = getEngagementsForClient(client.id);
  const activeCount = clientEngagements.filter((e) => e.stage !== "Reviewed").length;
  const owner = getTeamMember(client.primaryAuditorId);
  const activity = getActivityForClient(client.id);

  const engagementColumns: Column<Engagement>[] = [
    { key: "name", header: "Engagement", sortValue: (e) => e.name, render: (e) => <span className="font-semibold text-ink-900">{e.name}</span> },
    { key: "stage", header: "Stage", sortValue: (e) => e.stage, render: (e) => <StatusPill tone={stageTone(e.stage)} label={e.stage} /> },
    {
      key: "progress",
      header: "Progress",
      sortValue: (e) => e.progress,
      render: (e) => (
        <div className="min-w-[140px]">
          <ProgressBar value={e.progress} />
        </div>
      )
    },
    { key: "risk", header: "Risk", sortValue: (e) => e.risk, render: (e) => <StatusPill tone={riskTone(e.risk)} label={e.risk} /> },
    { key: "due", header: "Due", sortValue: (e) => e.dueDate, render: (e) => e.dueDate }
  ];

  const allRequests = clientEngagements.flatMap((e) => e.requests.map((r) => ({ ...r, engagementName: e.name })));

  return (
    <div>
      <PageHeader
        eyebrow={entityTypeLabel[client.entityType]}
        title={client.name}
        description={client.address || undefined}
        actions={
          <>
            <button className="btn-secondary">Archive client</button>
            <button className="btn-primary" onClick={() => navigate("/engagements", { state: { openCreate: true, clientId: client.id } })}>
              New engagement
            </button>
          </>
        }
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="panel p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Client since</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900">{client.since}</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Fiscal year end</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900">{client.fiscalYearEnd}</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Active engagements</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900">{activeCount}</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Risk rating</p>
          <div className="mt-2.5">
            <StatusPill tone={riskTone(client.riskRating)} label={client.riskRating} />
          </div>
        </div>
      </section>

      <div className="panel">
        <div className="px-5 pt-2">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>
        <div className="p-5">
          {tab === "overview" ? (
            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="section-title mb-3">Recent activity</h3>
                <div className="space-y-3">
                  {activity.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 rounded-xl border border-ink-100 p-3.5">
                      <span className={["mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", toneDot(entry.tone)].join(" ")} />
                      <div className="min-w-0">
                        <p className="text-sm text-ink-700">
                          <span className="font-semibold text-ink-900">{entry.actor}</span> {entry.action}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-400">{timeAgo(entry.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                  {activity.length === 0 ? <p className="text-sm text-ink-400">No activity recorded yet.</p> : null}
                </div>
              </div>
              <div>
                <h3 className="section-title mb-3">Relationship owner</h3>
                {owner ? (
                  <button onClick={() => navigate(`/team/${owner.id}`)} className="flex w-full items-center gap-3 rounded-xl border border-ink-100 p-4 text-left transition hover:border-ink-200 hover:bg-ink-50/60">
                    <Avatar initials={owner.initials} tone={owner.tone} size="lg" />
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{owner.name}</p>
                      <p className="text-xs text-ink-500">{owner.role}</p>
                    </div>
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          {tab === "engagements" ? (
            clientEngagements.length > 0 ? (
              <DataTable
                columns={engagementColumns}
                rows={clientEngagements}
                getRowId={(e) => e.id}
                onRowClick={(e) => navigate(`/engagements/${e.id}`)}
              />
            ) : (
              <EmptyState icon={Building2} title="No engagements yet" description="Create the first engagement for this client to start scoping and intake." />
            )
          ) : null}

          {tab === "contacts" ? (
            <div className="grid gap-3 md:grid-cols-2">
              {client.contacts.map((contact) => (
                <div key={contact.email} className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={contact.name.split(" ").map((n) => n[0]).slice(0, 2).join("")} tone="info" size="md" />
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{contact.name}</p>
                      <p className="text-xs text-ink-500">{contact.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm text-ink-600">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-ink-400" /> {contact.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-ink-400" /> {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
              {client.contacts.length === 0 ? <EmptyState icon={User} title="No contacts on file" description="Add a client contact to keep intake communication tied to a name." /> : null}
            </div>
          ) : null}

          {tab === "documents" ? (
            <div className="space-y-2.5">
              {allRequests.map((request) => (
                <div key={request.id} className="flex flex-col gap-2 rounded-xl border border-ink-100 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink-800">{request.title}</p>
                    <p className="mt-0.5 text-xs text-ink-400">{request.engagementName} · {request.area}</p>
                  </div>
                  <StatusPill
                    tone={request.status === "Received" ? "success" : request.status === "Needs Follow-up" ? "danger" : request.status === "Uploaded" ? "info" : "neutral"}
                    label={request.status}
                  />
                </div>
              ))}
              {allRequests.length === 0 ? <EmptyState icon={Building2} title="No requests yet" description="Requests will appear once an engagement's scoping is finalized." /> : null}
            </div>
          ) : null}

          {tab === "activity" ? (
            <div className="space-y-3">
              {activity.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 rounded-xl border border-ink-100 p-3.5">
                  <span className={["mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", toneDot(entry.tone)].join(" ")} />
                  <div className="min-w-0">
                    <p className="text-sm text-ink-700">
                      <span className="font-semibold text-ink-900">{entry.actor}</span> {entry.action}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-400">{timeAgo(entry.timestamp)}</p>
                  </div>
                </div>
              ))}
              {activity.length === 0 ? <EmptyState icon={Building2} title="No activity recorded" description="Client activity will appear here as the engagement progresses." /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
