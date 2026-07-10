import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bell, ChevronRight, Plus, Search } from "lucide-react";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getClient, getEngagement, getTeamMember, getTemplate, notifications } from "../../data";
import { toneDot } from "../../lib/ui";
import { CommandPalette, useCommandPalette } from "../ui/CommandPalette";

type Crumb = { label: string; to?: string };

function useBreadcrumbs(): Crumb[] {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return [{ label: "Dashboard" }];

  const [section, id] = segments;

  const sectionMap: Record<string, string> = {
    clients: "Clients",
    engagements: "Engagements",
    team: "Team",
    templates: "Templates",
    reports: "Reports",
    settings: "Settings",
    portal: "Client Portal",
    login: "Sign in"
  };

  const sectionLabel = sectionMap[section] ?? section;
  const crumbs: Crumb[] = [{ label: sectionLabel, to: id ? `/${section}` : undefined }];

  if (id) {
    let detailLabel = id;
    if (section === "clients") detailLabel = getClient(id)?.name ?? id;
    if (section === "engagements") detailLabel = getEngagement(id)?.name ?? id;
    if (section === "team") detailLabel = getTeamMember(id)?.name ?? id;
    if (section === "templates") detailLabel = getTemplate(id)?.title ?? id;
    crumbs.push({ label: detailLabel });
  }

  return crumbs;
}

export function Topbar() {
  const crumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const palette = useCommandPalette();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-ink-100 bg-surface/90 px-6 py-3.5 backdrop-blur">
      <div className="flex min-w-0 items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-300" /> : null}
            {crumb.to ? (
              <Link to={crumb.to} className="truncate font-medium text-ink-500 transition hover:text-ink-800">
                {crumb.label}
              </Link>
            ) : (
              <span className="truncate font-semibold text-ink-900">{crumb.label}</span>
            )}
          </Fragment>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => palette.setOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2 text-sm text-ink-400 transition hover:border-ink-300 hover:text-ink-600"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden rounded-md border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[10px] font-semibold text-ink-400 sm:inline">Ctrl K</kbd>
        </button>

        <Menu as="div" className="relative">
          <MenuButton className="relative rounded-lg p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-800">
            <Bell className="h-4.5 w-4.5" />
            {unread > 0 ? <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-surface" /> : null}
          </MenuButton>
          <MenuItems anchor="bottom end" className="mt-2 w-80 rounded-xl border border-ink-100 bg-surface p-1.5 shadow-popover focus:outline-none">
            <div className="px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Notifications</div>
            {notifications.map((notification) => (
              <MenuItem key={notification.id}>
                <div className="flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 data-[focus]:bg-ink-50">
                  <span className={["mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", toneDot(notification.tone)].join(" ")} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800">{notification.title}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-500">{notification.detail}</p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative">
          <MenuButton className="btn-primary">
            <Plus className="h-4 w-4" />
            New
          </MenuButton>
          <MenuItems anchor="bottom end" className="mt-2 w-52 rounded-xl border border-ink-100 bg-surface p-1.5 shadow-popover focus:outline-none">
            <MenuItem>
              <button
                onClick={() => navigate("/clients", { state: { openCreate: true } })}
                className="flex w-full items-center rounded-lg px-2.5 py-2 text-sm text-ink-700 data-[focus]:bg-ink-50"
              >
                New client
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => navigate("/engagements", { state: { openCreate: true } })}
                className="flex w-full items-center rounded-lg px-2.5 py-2 text-sm text-ink-700 data-[focus]:bg-ink-50"
              >
                New engagement
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <CommandPalette open={palette.open} onClose={() => palette.setOpen(false)} />
    </header>
  );
}
