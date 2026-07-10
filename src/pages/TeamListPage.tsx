import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { Avatar } from "../components/ui/Avatar";
import { DataTable, type Column } from "../components/ui/DataTable";
import { Drawer } from "../components/ui/Drawer";
import { useToast } from "../components/ui/Toast";
import { getEngagementsForOwner, team as seedTeam, type Role, type TeamMember } from "../data";

const roles: Role[] = ["Partner", "Manager", "Senior Associate", "Associate"];
const roleFilters: (Role | "All")[] = ["All", ...roles];

export function TeamListPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [team, setTeam] = useState<TeamMember[]>(seedTeam);
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Associate" as Role });

  const filtered = roleFilter === "All" ? team : team.filter((m) => m.role === roleFilter);

  function inviteMember() {
    if (!form.name.trim() || !form.email.trim()) return;
    const initials = form.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const member: TeamMember = {
      id: form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: form.name.trim(),
      initials,
      role: form.role,
      email: form.email.trim(),
      capacity: 0,
      activeEngagements: 0,
      tone: "info",
      joined: String(new Date().getFullYear())
    };
    setTeam((current) => [member, ...current]);
    setOpen(false);
    setForm({ name: "", email: "", role: "Associate" });
    addToast(`Invite sent to ${member.name}`, "success");
  }

  const columns: Column<TeamMember>[] = [
    {
      key: "name",
      header: "Team member",
      sortValue: (m) => m.name,
      render: (m) => (
        <span className="flex items-center gap-3">
          <Avatar initials={m.initials} tone={m.tone} />
          <span>
            <span className="block font-semibold text-ink-900">{m.name}</span>
            <span className="block text-xs text-ink-400">{m.email}</span>
          </span>
        </span>
      )
    },
    { key: "role", header: "Role", sortValue: (m) => m.role, render: (m) => m.role },
    {
      key: "capacity",
      header: "Capacity",
      sortValue: (m) => m.capacity,
      render: (m) => (
        <div className="min-w-[140px]">
          <div className="mb-1 text-xs text-ink-500">{m.capacity}%</div>
          <ProgressBar value={m.capacity} tone={m.capacity >= 90 ? "danger" : m.capacity >= 75 ? "warning" : "brand"} />
        </div>
      )
    },
    { key: "active", header: "Active engagements", align: "right", sortValue: (m) => getEngagementsForOwner(m.id).length, render: (m) => getEngagementsForOwner(m.id).length },
    { key: "joined", header: "Joined", sortValue: (m) => m.joined, render: (m) => m.joined }
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Firm staffing"
        title="Team"
        description="Every auditor and staff member, their current workload, and what's on their plate right now."
        actions={
          <button className="btn-primary" onClick={() => setOpen(true)}>
            Invite team member
          </button>
        }
      />

      <div className="panel p-5">
        <DataTable
          columns={columns}
          rows={filtered}
          getRowId={(m) => m.id}
          onRowClick={(m) => navigate(`/team/${m.id}`)}
          searchKeys={(m) => `${m.name} ${m.role} ${m.email}`}
          searchPlaceholder="Search team..."
          defaultSortKey="capacity"
          defaultSortDir="desc"
          filters={roleFilters.map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={["rounded-full px-3 py-1.5 text-xs font-semibold transition", roleFilter === role ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-600 hover:bg-ink-200"].join(" ")}
            >
              {role}
            </button>
          ))}
        />
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Invite team member"
        description="Send an invite to join the firm workspace."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={inviteMember}>
              Send invite
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Full name</span>
            <input className="input w-full" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Email</span>
            <input type="email" className="input w-full" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Role</span>
            <select className="input w-full" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Drawer>
    </div>
  );
}
