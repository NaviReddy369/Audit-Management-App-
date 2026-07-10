import { useRef, useState } from "react";
import { CheckCircle2, LogOut, ShieldHalf, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusPill } from "../components/ui/StatusPill";
import { useToast } from "../components/ui/Toast";
import { clientMetrics, firm, getClient, getEngagement, questionMeta } from "../data";

export function ClientPortalPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  const engagement = getEngagement("whitfield-fy26")!;
  const client = getClient(engagement.clientId)!;

  function triggerUpload(requestId: string) {
    setActiveRequestId(requestId);
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) addToast(`${file.name} uploaded`, "success");
    setActiveRequestId(null);
    event.target.value = "";
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center justify-between border-b border-ink-100 bg-surface px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 text-white">
            <ShieldHalf className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">{firm.name} Client Portal</p>
            <p className="text-xs text-ink-400">{client.name}</p>
          </div>
        </div>
        <button onClick={() => navigate("/login")} className="btn-ghost">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6">
          <p className="eyebrow mb-1.5">{engagement.name}</p>
          <h1 className="page-title">Complete the audit in one place.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-500">
            Answer what's relevant to you, see exactly why each document is requested, and upload directly against the item it belongs to.
          </p>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {clientMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-5">
            <p className="eyebrow mb-1">Questions needing response</p>
            <h3 className="section-title mb-4">Your questionnaire</h3>
            <div className="space-y-3">
              {engagement.questions.map((question) => (
                <article key={question.title} className="rounded-xl border border-ink-100 p-4">
                  <span className={["pill", questionMeta[question.type].classes].join(" ")}>{questionMeta[question.type].label}</span>
                  <h4 className="mt-2.5 text-sm font-semibold text-ink-900">{question.title}</h4>
                  <p className="mt-1.5 text-sm leading-6 text-ink-500">{question.prompt}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <p className="eyebrow mb-1">Uploads</p>
            <h3 className="section-title mb-4">Requested documents</h3>
            <div className="space-y-3">
              {engagement.requests.map((request) => (
                <article key={request.id} className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow">{request.area}</p>
                      <h4 className="mt-0.5 text-sm font-semibold text-ink-900">{request.title}</h4>
                    </div>
                    <StatusPill tone={request.status === "Received" ? "success" : request.status === "Needs Follow-up" ? "danger" : request.status === "Uploaded" ? "info" : "neutral"} label={request.status} />
                  </div>
                  {request.status === "Received" ? (
                    <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Confirmed received by your auditor
                    </p>
                  ) : (
                    <button onClick={() => triggerUpload(request.id)} className="btn-secondary mt-3 w-full sm:w-auto">
                      <Upload className="h-3.5 w-3.5" />
                      {activeRequestId === request.id ? "Choose a file..." : "Upload file"}
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 panel p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">Overall completion</p>
            <p className="text-sm text-ink-500">{engagement.progress}%</p>
          </div>
          <ProgressBar value={engagement.progress} />
        </div>
      </main>

      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
