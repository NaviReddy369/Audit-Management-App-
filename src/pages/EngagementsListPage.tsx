import { useState } from "react";
import { LayoutGrid, Table2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { Avatar } from "../components/ui/Avatar";
import { StatusPill } from "../components/ui/StatusPill";
import { DataTable, type Column } from "../components/ui/DataTable";
import { Drawer } from "../components/ui/Drawer";
import { KanbanBoard, type KanbanColumnDef } from "../components/ui/KanbanBoard";
import { useToast } from "../components/ui/Toast";
import {
  clients,
  engagements as seedEngagements,
  getClient,
  getTeamMember,
  team,
  type Engagement,
  type EngagementStage
} from "../data";
import { riskTone, stageTone } from "../lib/ui";

const stageColumns: KanbanColumnDef[] = [
  { key: "Draft", label: "Draft", tone: "neutral" },
  { key: "Sent", label: "Sent", tone: "info" },
  { key: "In Progress", label: "In Progress", tone: "warning" },
  { key: "Submitted", label: "Submitted", tone: "success" },
  { key: "Reviewed", label: "Reviewed", tone: "success" }
];

export function EngagementsListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const locationState = location.state as { openCreate?: boolean; clientId?: string } | null;

  const [engagements, setEngagements] = useState<Engagement[]>(seedEngagements);
  const [view, setView] = useState<"table" | "board">("table");
  const [open, setOpen] = useState(Boolean(locationState?.openCreate));

  const [form, setForm] = useState({
    clientId: locationState?.clientId ?? clients[0].id,
    name: "FY2026 Financial Statement Audit",
    fiscalYearEnd: "2026-12-31",
    ownerId: team[0].id
  });

  function createEngagement() {
    const client = getClient(form.clientId);
    if (!client) return;
    const engagement: Engagement = {
      id: `${form.clientId}-${Date.now()}`,
      clientId: form.clientId,
      name: form.name,
      fiscalYearEnd: form.fiscalYearEnd,
      clientTypeHistory: "continuing",
      stage: "Draft",
      progress: 0,
      missingDocs: 0,
      risk: "Moderate",
      ownerId: form.ownerId,
      dueDate: form.fiscalYearEnd,
      questionsAnswered: 0,
      questionsTotal: 0,
      documentsReceived: 0,
      documentsRequested: 0,
      questions: [],
      scopeCards: [],
      requests: []
    };
    setEngagements((current) => [engagement, ...current]);
    setOpen(false);
    addToast(`${engagement.name} created for ${client.name}`, "success");
  }

  function handleStageChange(id: string, stage: string) {
    setEngagements((current) => current.map((e) => (e.id === id ? { ...e, stage: stage as EngagementStage } : e)));
  }

  const columns: Column<Engagement>[] = [
    {
      key: "name",
      header: "Engagement",
      sortValue: (e) => e.name,
      render: (e) => (
        <div>
          <p className="font-semibold text-ink-900">{getClient(e.clientId)?.name}</p>
          <p className="text-xs text-ink-400">{e.name}</p>
        </div>
      )
    },
    { key: "stage", header: "Stage", sortValue: (e) => e.stage, render: (e) => <StatusPill tone={stageTone(e.stage)} label={e.stage} /> },
    {
      key: "progress",
      header: "Progress",
      sortValue: (e) => e.progress,
      render: (e) => (
        <div className="min-w-[150px]">
          <div className="mb-1 text-xs text-ink-500">{e.progress}%</div>
          <ProgressBar value={e.progress} />
        </div>
      )
    },
    { key: "risk", header: "Risk", sortValue: (e) => e.risk, render: (e) => <StatusPill tone={riskTone(e.risk)} label={e.risk} /> },
    { key: "due", header: "Due", sortValue: (e) => e.dueDate, render: (e) => e.dueDate },
    {
      key: "owner",
      header: "Owner",
      sortValue: (e) => getTeamMember(e.ownerId)?.name ?? "",
      render: (e) => {
        const owner = getTeamMember(e.ownerId);
        return owner ? (
          <span className="flex items-center gap-2">
            <Avatar initials={owner.initials} tone={owner.tone} size="sm" />
            <span className="text-sm text-ink-600">{owner.name}</span>
          </span>
        ) : null;
      }
    }
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Portfolio"
        title="Engagements"
        description="Every audit currently in flight, across every client. Drag a card to update its stage or switch to the table for sorting and search."
        actions={
          <>
            <div className="flex items-center rounded-lg border border-ink-200 p-0.5">
              <button
                onClick={() => setView("table")}
                className={["flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition", view === "table" ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-800"].join(" ")}
              >
                <Table2 className="h-3.5 w-3.5" /> Table
              </button>
              <button
                onClick={() => setView("board")}
                className={["flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition", view === "board" ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-800"].join(" ")}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Board
              </button>
            </div>
            <button className="btn-primary" onClick={() => setOpen(true)}>
              New engagement
            </button>
          </>
        }
      />

      {view === "table" ? (
        <div className="panel p-5">
          <DataTable
            columns={columns}
            rows={engagements}
            getRowId={(e) => e.id}
            onRowClick={(e) => navigate(`/engagements/${e.id}`)}
            searchKeys={(e) => `${getClient(e.clientId)?.name ?? ""} ${e.name} ${e.stage}`}
            searchPlaceholder="Search engagements..."
          />
        </div>
      ) : (
        <KanbanBoard
          columns={stageColumns}
          items={engagements}
          getId={(e) => e.id}
          getStage={(e) => e.stage}
          onStageChange={handleStageChange}
          renderCard={(e) => (
            <button className="w-full text-left" onClick={() => navigate(`/engagements/${e.id}`)}>
              <p className="text-sm font-semibold text-ink-900">{getClient(e.clientId)?.name}</p>
              <p className="mt-0.5 text-xs text-ink-400">{e.name}</p>
              <div className="mt-2.5">
                <ProgressBar value={e.progress} />
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <StatusPill tone={riskTone(e.risk)} label={e.risk} />
                {(() => {
                  const owner = getTeamMember(e.ownerId);
                  return owner ? <Avatar initials={owner.initials} tone={owner.tone} size="sm" /> : null;
                })()}
              </div>
            </button>
          )}
        />
      )}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="New engagement"
        description="Start a new audit engagement. Scoping and the questionnaire can be configured after creation."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={createEngagement}>
              Create engagement
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Client</span>
            <select className="input w-full" value={form.clientId} onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Engagement name</span>
            <input className="input w-full" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Fiscal year end</span>
            <input type="date" className="input w-full" value={form.fiscalYearEnd} onChange={(e) => setForm((f) => ({ ...f, fiscalYearEnd: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Engagement owner</span>
            <select className="input w-full" value={form.ownerId} onChange={(e) => setForm((f) => ({ ...f, ownerId: e.target.value }))}>
              {team.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} — {member.role}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Drawer>
    </div>
  );
}
