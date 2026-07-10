import { Dialog, DialogPanel } from "@headlessui/react";
import { Building2, Briefcase, FileStack, LayoutDashboard, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clients, engagements, team, templates } from "../../data";

type PaletteItem = {
  id: string;
  label: string;
  sublabel: string;
  to: string;
  icon: typeof Search;
};

const staticItems: PaletteItem[] = [
  { id: "nav-dashboard", label: "Dashboard", sublabel: "Firm command center", to: "/", icon: LayoutDashboard },
  { id: "nav-clients", label: "Clients", sublabel: "Client roster", to: "/clients", icon: Building2 },
  { id: "nav-engagements", label: "Engagements", sublabel: "All active audits", to: "/engagements", icon: Briefcase },
  { id: "nav-team", label: "Team", sublabel: "Auditors & staff", to: "/team", icon: Users },
  { id: "nav-templates", label: "Templates", sublabel: "Question set library", to: "/templates", icon: FileStack }
];

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo<PaletteItem[]>(() => {
    const clientItems: PaletteItem[] = clients.map((client) => ({
      id: `client-${client.id}`,
      label: client.name,
      sublabel: "Client",
      to: `/clients/${client.id}`,
      icon: Building2
    }));
    const engagementItems: PaletteItem[] = engagements.map((engagement) => ({
      id: `engagement-${engagement.id}`,
      label: engagement.name,
      sublabel: clients.find((c) => c.id === engagement.clientId)?.name ?? "Engagement",
      to: `/engagements/${engagement.id}`,
      icon: Briefcase
    }));
    const teamItems: PaletteItem[] = team.map((member) => ({
      id: `team-${member.id}`,
      label: member.name,
      sublabel: member.role,
      to: `/team/${member.id}`,
      icon: Users
    }));
    const templateItems: PaletteItem[] = templates.map((tpl) => ({
      id: `template-${tpl.id}`,
      label: tpl.title,
      sublabel: "Template",
      to: `/templates/${tpl.id}`,
      icon: FileStack
    }));
    return [...staticItems, ...clientItems, ...engagementItems, ...teamItems, ...templateItems];
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return staticItems.concat(items.slice(staticItems.length, staticItems.length + 6));
    const q = query.trim().toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q) || item.sublabel.toLowerCase().includes(q)).slice(0, 8);
  }, [items, query]);

  function go(item: PaletteItem) {
    navigate(item.to);
    onClose();
    setQuery("");
    setActiveIndex(0);
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setQuery("");
      }}
      transition
      className="relative z-[60]"
    >
      <div className="fixed inset-0 bg-ink-900/40 transition duration-150 ease-out data-[closed]:opacity-0" aria-hidden="true" />
      <div className="fixed inset-0 flex items-start justify-center p-4 pt-[14vh]">
        <DialogPanel className="w-full max-w-lg overflow-hidden rounded-2xl bg-surface shadow-popover transition duration-150 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0">
          <div className="flex items-center gap-2.5 border-b border-ink-100 px-4 py-3">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                }
                if (event.key === "Enter" && filtered[activeIndex]) {
                  go(filtered[activeIndex]);
                }
              }}
              placeholder="Search clients, engagements, team, templates..."
              className="w-full bg-transparent text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none"
            />
            <kbd className="rounded-md border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[10px] font-semibold text-ink-400">ESC</kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-ink-400">No matches.</p>
            ) : (
              filtered.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(item)}
                    className={[
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                      index === activeIndex ? "bg-ink-100 text-ink-900" : "text-ink-600 hover:bg-ink-50"
                    ].join(" ")}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface shadow-xs">
                      <Icon className="h-4 w-4 text-ink-500" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{item.label}</span>
                      <span className="block truncate text-xs text-ink-400">{item.sublabel}</span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
