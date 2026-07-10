import { Activity, Building2, ClipboardCheck, TriangleAlert } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { PageHeader } from "../components/PageHeader";
import { BarChart } from "../components/ui/charts/BarChart";
import { DonutChart } from "../components/ui/charts/DonutChart";
import { RiskHeatmap } from "../components/ui/charts/RiskHeatmap";
import { TrendLine } from "../components/ui/charts/TrendLine";
import { ENTITY_COLORS, RISK_COLORS } from "../components/ui/charts/palette";
import { clients, engagements, entityTypeLabel, getClient, team, type EntityType, type RiskLevel } from "../data";

const entityTypes: EntityType[] = ["school", "church", "nfp_program_income", "nfp_general"];
const riskLevels: RiskLevel[] = ["High", "Moderate", "Low"];

const documentsTrend = [
  { label: "Feb", value: 24 },
  { label: "Mar", value: 31 },
  { label: "Apr", value: 28 },
  { label: "May", value: 39 },
  { label: "Jun", value: 45 },
  { label: "Jul", value: 52 }
];

export function ReportsPage() {
  const avgCompletionByEntity = entityTypes
    .map((entityType) => {
      const rows = engagements.filter((e) => getClient(e.clientId)?.entityType === entityType);
      const avg = rows.length ? Math.round(rows.reduce((sum, e) => sum + e.progress, 0) / rows.length) : 0;
      return { label: entityTypeLabel[entityType], value: avg, color: ENTITY_COLORS[entityType] };
    })
    .filter((row) => row.value > 0);

  const riskCounts = riskLevels.map((risk) => ({ label: risk, value: engagements.filter((e) => e.risk === risk).length, color: RISK_COLORS[risk] }));

  const activeByMember = [...team]
    .map((member) => ({ label: member.name, value: engagements.filter((e) => e.ownerId === member.id).length, color: "#5B5FE8" }))
    .sort((a, b) => b.value - a.value);

  const riskByEntityMatrix = riskLevels.map((risk) => ({
    label: risk,
    color: RISK_COLORS[risk],
    values: entityTypes.map((entityType) => engagements.filter((e) => e.risk === risk && getClient(e.clientId)?.entityType === entityType).length)
  }));

  const highRiskCount = engagements.filter((e) => e.risk === "High").length;
  const avgCompletion = Math.round(engagements.reduce((sum, e) => sum + e.progress, 0) / engagements.length);

  return (
    <div>
      <PageHeader
        eyebrow="Firm analytics"
        title="Reports"
        description="Portfolio-level view of workload, risk, and completion — the numbers a managing partner checks weekly."
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Clients in the book" value={String(clients.length)} note="Across 4 entity types" icon={Building2} />
        <MetricCard label="Active engagements" value={String(engagements.length)} note="Firm-wide" icon={ClipboardCheck} />
        <MetricCard label="Average completion" value={`${avgCompletion}%`} note="Across all open engagements" icon={Activity} />
        <MetricCard label="High-risk engagements" value={String(highRiskCount)} note="Flagged for elevated manager review" icon={TriangleAlert} />
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-2">
        <div className="panel p-5">
          <p className="eyebrow mb-1">Throughput</p>
          <h3 className="section-title mb-4">Documents received, last 6 months</h3>
          <TrendLine data={documentsTrend} />
        </div>
        <div className="panel p-5">
          <p className="eyebrow mb-1">Coverage</p>
          <h3 className="section-title mb-4">Average completion by entity type</h3>
          <BarChart data={avgCompletionByEntity} valueSuffix="%" />
        </div>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="panel p-5">
          <p className="eyebrow mb-1">Portfolio health</p>
          <h3 className="section-title mb-4">Risk distribution</h3>
          <DonutChart data={riskCounts} centerLabel="Engagements" />
        </div>
        <div className="panel p-5">
          <p className="eyebrow mb-1">Staffing</p>
          <h3 className="section-title mb-4">Active engagements per team member</h3>
          <BarChart data={activeByMember} height={200} />
        </div>
      </section>

      <section className="panel p-5">
        <p className="eyebrow mb-1">Risk concentration</p>
        <h3 className="section-title mb-4">Risk by entity type</h3>
        <RiskHeatmap columns={entityTypes.map((t) => entityTypeLabel[t])} rows={riskByEntityMatrix} />
      </section>
    </div>
  );
}
