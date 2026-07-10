export function AiLabPage() {
  const items = [
    {
      title: "Auto-generate questionnaires from audit forms",
      note: "Parse PDF workpapers, detect recurring fields, and classify questions into first-time, annual, confirm, or dynamic."
    },
    {
      title: "Suggested follow-ups",
      note: "When answers or uploads are incomplete, propose context-aware follow-up prompts tied to the exact question."
    },
    {
      title: "Risk detection layer",
      note: "Identify patterns like multi-year gaps, uncertain grant funding, unusual related-party activity, or missing approvals."
    },
    {
      title: "PDF completion score",
      note: "Measure when enough trusted answers and evidence exist for the auditor to complete the final Adobe form."
    }
  ];

  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow">Strategic roadmap</p>
        <h2 className="hero-title">AI Control Room</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/65 sm:text-base">
          The right AI layer sits on top of a deterministic audit workflow. First build the system of record. Then add automation where it improves speed without reducing trust.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="panel p-5">
            <h3 className="font-display text-3xl leading-none">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-ink/65">{item.note}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
