import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Avatar } from "../components/ui/Avatar";
import { StatusPill } from "../components/ui/StatusPill";
import { DataTable, type Column } from "../components/ui/DataTable";
import { Drawer } from "../components/ui/Drawer";
import { useToast } from "../components/ui/Toast";
import {
  clients as seedClients,
  entityTypeLabel,
  getEngagementsForClient,
  getTeamMember,
  team,
  type Client,
  type EntityType,
  type RiskLevel
} from "../data";
import { riskTone } from "../lib/ui";

const riskFilters: (RiskLevel | "All")[] = ["All", "Low", "Moderate", "High"];

export function ClientsListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [clients, setClients] = useState<Client[]>(seedClients);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All");
  const [open, setOpen] = useState(Boolean((location.state as { openCreate?: boolean } | null)?.openCreate));

  const [form, setForm] = useState({
    name: "",
    entityType: "nfp_general" as EntityType,
    fiscalYearEnd: "June 30",
    primaryAuditorId: team[0].id
  });

  const filtered = riskFilter === "All" ? clients : clients.filter((c) => c.riskRating === riskFilter);

  function createClient() {
    if (!form.name.trim()) return;
    const client: Client = {
      id: form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: form.name.trim(),
      entityType: form.entityType,
      since: String(new Date().getFullYear()),
      fiscalYearEnd: form.fiscalYearEnd,
      riskRating: "Moderate",
      primaryAuditorId: form.primaryAuditorId,
      address: "",
      contacts: []
    };
    setClients((current) => [client, ...current]);
    setOpen(false);
    setForm({ name: "", entityType: "nfp_general", fiscalYearEnd: "June 30", primaryAuditorId: team[0].id });
    addToast(`${client.name} added to the client roster`, "success");
  }

  const columns: Column<Client>[] = [
    {
      key: "name",
      header: "Client",
      sortValue: (c) => c.name,
      render: (c) => (
        <div>
          <p className="font-semibold text-ink-900">{c.name}</p>
          <p className="text-xs text-ink-400">{entityTypeLabel[c.entityType]}</p>
        </div>
      )
    },
    { key: "since", header: "Client since", sortValue: (c) => c.since, render: (c) => c.since },
    { key: "fye", header: "Fiscal year end", sortValue: (c) => c.fiscalYearEnd, render: (c) => c.fiscalYearEnd },
    {
      key: "engagements",
      header: "Engagements",
      align: "right",
      sortValue: (c) => getEngagementsForClient(c.id).length,
      render: (c) => getEngagementsForClient(c.id).length
    },
    { key: "risk", header: "Risk", sortValue: (c) => c.riskRating, render: (c) => <StatusPill tone={riskTone(c.riskRating)} label={c.riskRating} /> },
    {
      key: "owner",
      header: "Primary auditor",
      sortValue: (c) => getTeamMember(c.primaryAuditorId)?.name ?? "",
      render: (c) => {
        const owner = getTeamMember(c.primaryAuditorId);
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
        eyebrow="Client management"
        title="Clients"
        description="The firm's book of business — every nonprofit client, their entity type, risk profile, and who owns the relationship."
        actions={
          <button className="btn-primary" onClick={() => setOpen(true)}>
            New client
          </button>
        }
      />

      <div className="panel p-5">
        <DataTable
          columns={columns}
          rows={filtered}
          getRowId={(c) => c.id}
          onRowClick={(c) => navigate(`/clients/${c.id}`)}
          searchKeys={(c) => `${c.name} ${entityTypeLabel[c.entityType]}`}
          searchPlaceholder="Search clients..."
          defaultSortKey="name"
          filters={riskFilters.map((risk) => (
            <button
              key={risk}
              onClick={() => setRiskFilter(risk)}
              className={["rounded-full px-3 py-1.5 text-xs font-semibold transition", riskFilter === risk ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-600 hover:bg-ink-200"].join(" ")}
            >
              {risk}
            </button>
          ))}
        />
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="New client"
        description="Add a client to the roster. You can fill in contacts and full profile details later."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={createClient}>
              Create client
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Client name</span>
            <input
              className="input w-full"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Fairview Community Foundation"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Entity type</span>
            <select
              className="input w-full"
              value={form.entityType}
              onChange={(e) => setForm((f) => ({ ...f, entityType: e.target.value as EntityType }))}
            >
              {Object.entries(entityTypeLabel).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Fiscal year end</span>
            <input
              className="input w-full"
              value={form.fiscalYearEnd}
              onChange={(e) => setForm((f) => ({ ...f, fiscalYearEnd: e.target.value }))}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Primary auditor</span>
            <select
              className="input w-full"
              value={form.primaryAuditorId}
              onChange={(e) => setForm((f) => ({ ...f, primaryAuditorId: e.target.value }))}
            >
              {team.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} — {member.role}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Drawer>
    </div>
  );
}
