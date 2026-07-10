import { MetricCard } from "../components/MetricCard";
import { clientMetrics, questionMeta, questions, requests } from "../data";

export function ClientPortalPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow">Client portal</p>
        <h2 className="hero-title">Complete the audit in one place.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/65 sm:text-base">
          The client experience should feel calm and guided. Show only what needs action, tie every message to context, and remove unnecessary repetition.
        </p>
      </header>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {clientMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-5">
          <p className="eyebrow">Questions needing response</p>
          <h3 className="font-display text-3xl leading-none">Focused questionnaire flow</h3>
          <div className="mt-5 space-y-4">
            {questions.map((question) => (
              <article key={question.title} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                <span className={["pill", questionMeta[question.type].classes].join(" ")}>{questionMeta[question.type].label}</span>
                <h4 className="mt-3 text-base font-semibold text-ink">{question.title}</h4>
                <p className="mt-2 text-sm leading-6 text-ink/65">{question.prompt}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <p className="eyebrow">Uploads</p>
          <h3 className="font-display text-3xl leading-none">Requested documents</h3>
          <div className="mt-5 space-y-4">
            {requests.map((request) => (
              <article key={request.title} className="rounded-3xl border border-ink/10 bg-white/70 p-4">
                <p className="eyebrow">{request.area}</p>
                <h4 className="text-base font-semibold text-ink">{request.title}</h4>
                <p className="mt-2 text-sm leading-6 text-ink/65">{request.status}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
