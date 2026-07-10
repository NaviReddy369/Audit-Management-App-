import { AlertTriangle, ArrowUpRight, ClipboardList, FileWarning, Users2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { QueueCard } from "../components/QueueCard";
import { Avatar } from "../components/ui/Avatar";
import { StatusPill } from "../components/ui/StatusPill";
import { DataTable, type Column } from "../components/ui/DataTable";
import { DonutChart } from "../components/ui/charts/DonutChart";
import { BarChart } from "../components/ui/charts/BarChart";
import { RiskHeatmap } from "../components/ui/charts/RiskHeatmap";
import { STAGE_COLORS, RISK_COLORS } from "../components/ui/charts/palette";
import { actionQueue, approvals, engagements, firmMetrics, getClient, getTeamMember, team, type Engagement, type EngagementStage, type RiskLevel } from "../data";
import { riskTone, stageTone } from "../lib/ui";

const stages: EngagementStage[] = ["Draft", "Sent", "In Progress", "Submitted", "Reviewed"];
const riskLevels: RiskLevel[] = ["High", "Moderate", "Low"];

export function DashboardPage() {
  const navigate = useNavigate();
  const metrics = firmMetrics();

  const stageData = stages
    .map((stage) => ({ label: stage, value: engagements.filter((e) => e.stage === stage).length, color: STAGE_COLORS[stage] }))
    .filter((d) => d.value > 0);

  const workloadData = [...team]
    .sort((a, b) => b.capacity - a.capacity)
    .map((member) => ({
      label: member.name.split(" ")[0] + " " + member.name.split(" ")[1]?.[0] + ".",
      value: member.capacity,
      color: member.capacity >= 90 ? "#F43F5E" : member.capacity >= 75 ? "#F59E0B" : "#5B5FE8"
    }));

  const riskMatrix = riskLevels.map((risk) => ({
    label: risk,
    color: RISK_COLORS[risk],
    values: stages.map((stage) => engagements.filter((e) => e.risk === risk && e.stage === stage).length)
  }));

  const columns: Column<Engagement>[] = [
    {
      key: "client",
      header: "Client",
      sortValue: (e) => getClient(e.clientId)?.name ?? "",
      render: (e) => <span className="font-semibold text-ink-900">{getClient(e.clientId)?.name}</span>
    },
    {
      key: "stage",
      header: "Stage",
      sortValue: (e) => e.stage,
      render: (e) => <StatusPill tone={stageTone(e.stage)} label={e.stage} />
    },
    {
      key: "progress",
      header: "Progress",
      sortValue: (e) => e.progress,
      render: (e) => (
        <div className="min-w-[160px]">
          <div className="mb-1 flex justify-between text-xs text-ink-500">
            <span>{e.progress}%</span>
          </div>
          <ProgressBar value={e.progress} />
        </div>
      )
    },
    { key: "missingDocs", header: "Missing docs", align: "right", sortValue: (e) => e.missingDocs, render: (e) => e.missingDocs },
    { key: "risk", header: "Risk", sortValue: (e) => e.risk, render: (e) => <StatusPill tone={riskTone(e.risk)} label={e.risk} /> },
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
        eyebrow="Firm workspace"
        title="Command Center"
        description="See every audit bottleneck before it turns into email chaos — scoping, evidence, approvals, and reporting status across the whole book of business."
        actions={
          <>
            <button className="btn-secondary">Export brief</button>
            <button className="btn-primary" onClick={() => navigate("/engagements", { state: { openCreate: true } })}>
              Create engagement
            </button>
          </>
        }
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard {...metrics[0]} icon={ClipboardList} />
        <MetricCard {...metrics[1]} icon={Users2} trend={{ value: "-18%", positive: true }} />
        <MetricCard {...metrics[2]} icon={FileWarning} />
        <MetricCard {...metrics[3]} icon={AlertTriangle} />
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-2">
        <div className="panel p-5">
          <p className="eyebrow mb-1">Portfolio mix</p>
          <h3 className="section-title mb-4">Engagements by stage</h3>
          <DonutChart data={stageData} centerLabel="Total" />
        </div>
        <div className="panel p-5">
          <p className="eyebrow mb-1">Staffing</p>
          <h3 className="section-title mb-4">Team capacity</h3>
          <BarChart data={workloadData} valueSuffix="%" height={200} />
        </div>
      </section>

      <section className="mb-6 panel p-5">
        <p className="eyebrow mb-1">Coverage</p>
        <h3 className="section-title mb-4">Risk by stage</h3>
        <RiskHeatmap columns={stages} rows={riskMatrix} />
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-2">
        <div className="panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="eyebrow">Needs attention</p>
              <h3 className="section-title">Action Queue</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {actionQueue.map((item) => (
              <QueueCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-4">
            <p className="eyebrow">External dependencies</p>
            <h3 className="section-title">Approvals</h3>
          </div>
          <div className="space-y-2.5">
            {approvals.map((item) => (
              <QueueCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Engagement portfolio</p>
            <h3 className="section-title">Live Engagements</h3>
          </div>
          <button onClick={() => navigate("/engagements")} className="btn-ghost">
            View all
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <DataTable
          columns={columns}
          rows={engagements}
          getRowId={(e) => e.id}
          onRowClick={(e) => navigate(`/engagements/${e.id}`)}
          searchKeys={(e) => `${getClient(e.clientId)?.name ?? ""} ${e.stage} ${e.risk}`}
          searchPlaceholder="Search engagements..."
        />
      </section>
    </div>
  );
}
