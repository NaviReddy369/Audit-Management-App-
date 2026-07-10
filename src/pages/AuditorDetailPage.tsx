import { Briefcase, Mail } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { Avatar } from "../components/ui/Avatar";
import { StatusPill } from "../components/ui/StatusPill";
import { DataTable, type Column } from "../components/ui/DataTable";
import { EmptyState } from "../components/ui/EmptyState";
import { BarChart } from "../components/ui/charts/BarChart";
import { STAGE_COLORS } from "../components/ui/charts/palette";
import { getClient, getEngagementsForOwner, getTeamMember, type Engagement, type EngagementStage } from "../data";
import { riskTone, stageTone } from "../lib/ui";

const stages: EngagementStage[] = ["Draft", "Sent", "In Progress", "Submitted", "Reviewed"];

export function AuditorDetailPage() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const member = memberId ? getTeamMember(memberId) : undefined;
  if (!member) return <Navigate to="/team" replace />;

  const assigned = getEngagementsForOwner(member.id);
  const stageBreakdown = stages
    .map((stage) => ({ label: stage, value: assigned.filter((e) => e.stage === stage).length, color: STAGE_COLORS[stage] }))
    .filter((d) => d.value > 0);

  const columns: Column<Engagement>[] = [
    { key: "client", header: "Client", sortValue: (e) => getClient(e.clientId)?.name ?? "", render: (e) => <span className="font-semibold text-ink-900">{getClient(e.clientId)?.name}</span> },
    { key: "name", header: "Engagement", sortValue: (e) => e.name, render: (e) => e.name },
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

  return (
    <div>
      <PageHeader
        eyebrow={member.role}
        title={member.name}
        actions={
          <button className="btn-secondary" onClick={() => navigate("/team")}>
            Back to team
          </button>
        }
      />

      <section className="mb-6 grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="panel p-5">
          <div className="flex items-center gap-4">
            <Avatar initials={member.initials} tone={member.tone} size="lg" />
            <div>
              <p className="text-base font-semibold text-ink-900">{member.name}</p>
              <p className="text-sm text-ink-500">{member.role}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm text-ink-600">
            <p className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-ink-400" /> {member.email}
            </p>
            <p className="text-xs text-ink-400">Joined the firm in {member.joined}</p>
          </div>
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wide text-ink-500">Capacity</span>
              <span className="font-semibold text-ink-800">{member.capacity}%</span>
            </div>
            <ProgressBar value={member.capacity} tone={member.capacity >= 90 ? "danger" : member.capacity >= 75 ? "warning" : "brand"} />
          </div>
        </div>
        <div className="panel p-5">
          <p className="eyebrow mb-1">Current book</p>
          <h3 className="section-title mb-4">Engagements by stage</h3>
          {stageBreakdown.length > 0 ? (
            <BarChart data={stageBreakdown} height={180} />
          ) : (
            <p className="text-sm text-ink-400">No active engagements assigned.</p>
          )}
        </div>
      </section>

      <section className="panel p-5">
        <p className="eyebrow mb-1">Assignments</p>
        <h3 className="section-title mb-4">Assigned engagements</h3>
        {assigned.length > 0 ? (
          <DataTable columns={columns} rows={assigned} getRowId={(e) => e.id} onRowClick={(e) => navigate(`/engagements/${e.id}`)} />
        ) : (
          <EmptyState icon={Briefcase} title="No engagements assigned" description="This team member isn't currently the owner on any active engagement." />
        )}
      </section>
    </div>
  );
}
