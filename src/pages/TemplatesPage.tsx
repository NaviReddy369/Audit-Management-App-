export function TemplatesPage() {
  const cards = [
    {
      title: "School / Re-audit after gap",
      note: "Includes opening balance recovery, predecessor workflow, tuition, grants, governance, and payroll logic."
    },
    {
      title: "Church / Continuing",
      note: "Optimized for contributions, donor restrictions, in-kind support, and board governance."
    },
    {
      title: "NFP with program income",
      note: "Adds exchange transaction logic, contract revenue, and deferred revenue considerations."
    },
    {
      title: "AI-generated questionnaire prototype",
      note: "Future feature: parse PDF forms, classify questions, and draft rule candidates for CPA review."
    }
  ];

  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow">Configuration layer</p>
        <h2 className="hero-title">Template Intelligence</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/65 sm:text-base">
          The long-term moat is not only the UI. It is the template, scoping, and request-generation system that can be reused across engagements while preserving audit rigor.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.title} className="panel p-5">
            <p className="eyebrow">Template asset</p>
            <h3 className="font-display text-3xl leading-none">{card.title}</h3>
            <p className="mt-4 text-sm leading-7 text-ink/65">{card.note}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
