type Tab = {
  key: string;
  label: string;
  count?: number;
};

type TabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
};

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="scrollbar-thin flex gap-1 overflow-x-auto border-b border-ink-100">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={[
              "relative flex shrink-0 items-center gap-2 px-3.5 py-3 text-sm font-medium transition",
              isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-800"
            ].join(" ")}
          >
            {tab.label}
            {tab.count !== undefined ? (
              <span className={["rounded-md px-1.5 py-0.5 text-[11px] font-semibold", isActive ? "bg-brand-50 text-brand-700" : "bg-ink-100 text-ink-500"].join(" ")}>
                {tab.count}
              </span>
            ) : null}
            {isActive ? <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-ink-900" /> : null}
          </button>
        );
      })}
    </div>
  );
}
