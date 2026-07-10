import { useState } from "react";
import { Switch } from "@headlessui/react";
import { PageHeader } from "../components/PageHeader";
import { Avatar } from "../components/ui/Avatar";
import { Tabs } from "../components/ui/Tabs";
import { useToast } from "../components/ui/Toast";
import { firm, team, type Role } from "../data";

const tabs = [
  { key: "firm", label: "Firm Profile" },
  { key: "users", label: "Users & Roles" },
  { key: "areas", label: "Audit Areas" },
  { key: "notifications", label: "Notifications" }
];

const roles: Role[] = ["Partner", "Manager", "Senior Associate", "Associate"];

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-ink-100 p-4">
      <div>
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        <p className="mt-0.5 text-xs text-ink-500">{description}</p>
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        className={["group inline-flex h-6 w-11 shrink-0 items-center rounded-full transition", checked ? "bg-brand-500" : "bg-ink-200"].join(" ")}
      >
        <span className={["inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition", checked ? "translate-x-6" : "translate-x-1"].join(" ")} />
      </Switch>
    </div>
  );
}

export function SettingsPage() {
  const { addToast } = useToast();
  const [tab, setTab] = useState("firm");
  const [firmForm, setFirmForm] = useState({ name: firm.name, address: firm.address, founded: firm.founded });
  const [areas, setAreas] = useState(firm.auditAreas);
  const [roleMap, setRoleMap] = useState<Record<string, Role>>(Object.fromEntries(team.map((m) => [m.id, m.role])));
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    overdueAlerts: true,
    clientUploads: true,
    mentions: false
  });

  return (
    <div>
      <PageHeader eyebrow="Configuration" title="Firm Settings" description="Firm profile, staff permissions, standard audit areas, and notification preferences." />

      <div className="panel">
        <div className="px-5 pt-2">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>
        <div className="p-5">
          {tab === "firm" ? (
            <div className="max-w-xl space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Firm name</span>
                <input className="input w-full" value={firmForm.name} onChange={(e) => setFirmForm((f) => ({ ...f, name: e.target.value }))} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Address</span>
                <input className="input w-full" value={firmForm.address} onChange={(e) => setFirmForm((f) => ({ ...f, address: e.target.value }))} />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-ink-100 p-4">
                  <p className="text-xs uppercase tracking-wide text-ink-500">Plan</p>
                  <p className="mt-1.5 text-lg font-semibold text-ink-900">{firm.plan}</p>
                </div>
                <div className="rounded-xl border border-ink-100 p-4">
                  <p className="text-xs uppercase tracking-wide text-ink-500">Seats used</p>
                  <p className="mt-1.5 text-lg font-semibold text-ink-900">
                    {firm.seatsUsed} / {firm.seats}
                  </p>
                </div>
              </div>
              <button className="btn-primary" onClick={() => addToast("Firm profile saved", "success")}>
                Save changes
              </button>
            </div>
          ) : null}

          {tab === "users" ? (
            <div className="space-y-2.5">
              {team.map((member) => (
                <div key={member.id} className="flex flex-col gap-3 rounded-xl border border-ink-100 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-3">
                    <Avatar initials={member.initials} tone={member.tone} />
                    <span>
                      <span className="block text-sm font-semibold text-ink-900">{member.name}</span>
                      <span className="block text-xs text-ink-400">{member.email}</span>
                    </span>
                  </span>
                  <select
                    className="input"
                    value={roleMap[member.id]}
                    onChange={(e) => setRoleMap((current) => ({ ...current, [member.id]: e.target.value as Role }))}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "areas" ? (
            <div>
              <p className="mb-4 text-sm leading-6 text-ink-500">
                Always-in-scope audit areas apply to every engagement regardless of scoping answers. Everything else is only activated when a client's
                scoping response requires it.
              </p>
              <div className="grid gap-2.5 md:grid-cols-2">
                {areas.map((area) => (
                  <ToggleRow
                    key={area.name}
                    label={area.name}
                    description={area.alwaysInScope ? "Always in scope" : "Activated by scoping"}
                    checked={area.alwaysInScope}
                    onChange={(value) => setAreas((current) => current.map((a) => (a.name === area.name ? { ...a, alwaysInScope: value } : a)))}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {tab === "notifications" ? (
            <div className="max-w-xl space-y-2.5">
              <ToggleRow
                label="Weekly firm digest"
                description="A Monday-morning summary of engagement movement across the firm."
                checked={notifications.weeklyDigest}
                onChange={(value) => setNotifications((n) => ({ ...n, weeklyDigest: value }))}
              />
              <ToggleRow
                label="Overdue request alerts"
                description="Notify the engagement owner when a request item goes idle for 3+ days."
                checked={notifications.overdueAlerts}
                onChange={(value) => setNotifications((n) => ({ ...n, overdueAlerts: value }))}
              />
              <ToggleRow
                label="Client uploads"
                description="Notify when a client uploads a document against a request item."
                checked={notifications.clientUploads}
                onChange={(value) => setNotifications((n) => ({ ...n, clientUploads: value }))}
              />
              <ToggleRow
                label="Mentions"
                description="Notify when a teammate mentions you on a note or thread."
                checked={notifications.mentions}
                onChange={(value) => setNotifications((n) => ({ ...n, mentions: value }))}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
