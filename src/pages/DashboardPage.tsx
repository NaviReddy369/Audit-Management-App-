import { MetricCard } from "../components/MetricCard";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { QueueCard } from "../components/QueueCard";
import { actionQueue, approvals, dashboardMetrics, engagements } from "../data";

export function DashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Firm workspace"
        title="Command Center"
        description="Northstar turns questionnaires, evidence, approvals, and PDF completion into one operating system for audit firms. The dashboard is designed to surface movement, blockers, and risk instead of just listing forms."
        actions={
          <>
            <button className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink">Export brief</button>
            <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white">Create engagement</button>
          </>
        }
      />

      <section className="panel mb-6 p-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <p className="eyebrow">Operating view</p>
            <h3 className="font-display text-4xl leading-none">See every audit bottleneck before it turns into email chaos.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65 sm:text-base">
              The product is not a PDF vault. It is a system for moving audits forward through scoping, linked communication, evidence collection, and readiness for form completion.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              ["Ready for PDF prep", "7 / 12"],
              ["Docs collected", "81%"],
              ["At-risk engagements", "2"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-ink/45">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-3">
        <div className="panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="eyebrow">Needs attention</p>
              <h3 className="font-display text-3xl leading-none">Action Queue</h3>
            </div>
          </div>
          <div className="space-y-3">
            {actionQueue.map((item) => (
              <QueueCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-4">
            <p className="eyebrow">External dependencies</p>
            <h3 className="font-display text-3xl leading-none">Approvals</h3>
          </div>
          <div className="space-y-3">
            {approvals.map((item) => (
              <QueueCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-4">
            <p className="eyebrow">Product position</p>
            <h3 className="font-display text-3xl leading-none">What sells this</h3>
          </div>
          <div className="space-y-3 text-sm leading-7 text-ink/65">
            <p>Question-level collaboration replaces fragmented email chains.</p>
            <p>Scoping removes irrelevant sections instead of asking everything every year.</p>
            <p>Previous-year confirmation cuts repetitive effort for recurring clients.</p>
            <p>Document collection stays attached to the exact question and request item forever.</p>
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Engagement portfolio</p>
            <h3 className="font-display text-3xl leading-none">Live Engagements</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {["All", "Submitted", "Needs review", "Waiting on client"].map((chip, index) => (
              <span key={chip} className={["rounded-full px-3 py-2", index === 0 ? "bg-ink text-white" : "bg-ink/5 text-ink/65"].join(" ")}>
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-[0.15em] text-ink/40">
                <th className="pb-3">Client</th>
                <th className="pb-3">Stage</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3">Missing docs</th>
                <th className="pb-3">Risk</th>
                <th className="pb-3">Owner</th>
              </tr>
            </thead>
            <tbody>
              {engagements.map((engagement) => (
                <tr key={engagement.client} className="border-b border-ink/5 align-top">
                  <td className="py-4 pr-4 font-semibold text-ink">{engagement.client}</td>
                  <td className="py-4 pr-4 text-sm text-ink/65">{engagement.stage}</td>
                  <td className="py-4 pr-4 text-sm text-ink/65">
                    <div className="min-w-[180px]">
                      <div>{engagement.progress}% complete</div>
                      <ProgressBar value={engagement.progress} />
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-sm text-ink/65">{engagement.missingDocs}</td>
                  <td className="py-4 pr-4 text-sm text-ink/65">{engagement.risk}</td>
                  <td className="py-4 text-sm text-ink/65">{engagement.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
