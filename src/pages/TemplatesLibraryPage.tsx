import { useState } from "react";
import { FileStack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Tabs } from "../components/ui/Tabs";
import { automationRoadmap, templates } from "../data";

export function TemplatesLibraryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("library");

  return (
    <div>
      <PageHeader
        eyebrow="Configuration layer"
        title="Templates"
        description="The long-term moat isn't only the UI — it's the template, scoping, and request-generation logic that gets reused across engagements while preserving audit rigor."
        actions={
          <button className="btn-primary" onClick={() => navigate(`/templates/${templates[0].id}`)}>
            New template
          </button>
        }
      />

      <div className="mb-5">
        <Tabs tabs={[{ key: "library", label: "Library" }, { key: "automation", label: "Automation roadmap" }]} active={tab} onChange={setTab} />
      </div>

      {tab === "library" ? (
        <section className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => navigate(`/templates/${template.id}`)}
              className="panel panel-hover p-5 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <FileStack className="h-5 w-5" />
                </span>
                {template.isSystemSeeded ? <span className="pill bg-ink-100 text-ink-600">System</span> : null}
              </div>
              <h3 className="mt-3.5 text-base font-semibold text-ink-900">{template.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{template.note}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
                <span>{template.entityTypes}</span>
                <span>·</span>
                <span>{template.questionCount} questions</span>
                <span>·</span>
                <span>Edited {template.lastEdited}</span>
              </div>
            </button>
          ))}
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {automationRoadmap.map((item) => (
            <article key={item.title} className="panel p-5">
              <h3 className="section-title mb-2.5">{item.title}</h3>
              <p className="text-sm leading-7 text-ink-500">{item.note}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
