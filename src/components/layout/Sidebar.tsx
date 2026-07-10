import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronsLeft,
  ChevronsRight,
  FileStack,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldHalf,
  User,
  Users
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { firm } from "../../data";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/reports", label: "Reports", icon: BarChart3 }
    ]
  },
  {
    label: "Operations",
    items: [
      { to: "/clients", label: "Clients", icon: Building2 },
      { to: "/engagements", label: "Engagements", icon: Briefcase },
      { to: "/team", label: "Team", icon: Users }
    ]
  },
  {
    label: "Configuration",
    items: [
      { to: "/templates", label: "Templates", icon: FileStack },
      { to: "/settings", label: "Settings", icon: Settings }
    ]
  }
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const navigate = useNavigate();

  return (
    <aside
      className={[
        "sticky top-0 flex h-screen shrink-0 flex-col border-r border-ink-800/60 bg-ink-900 text-white transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-64"
      ].join(" ")}
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500 text-sm font-bold">
          <ShieldHalf className="h-5 w-5" />
        </div>
        {!collapsed ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-none text-white">{firm.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">Audit Operating System</p>
          </div>
        ) : null}
      </div>

      <nav className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed ? <p className="mb-1.5 px-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/30">{group.label}</p> : null}
            <div className="space-y-0.5">
              {group.items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition",
                      collapsed ? "justify-center" : "",
                      isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed ? <span className="truncate">{label}</span> : null}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Menu as="div" className="relative">
          <MenuButton
            className={["flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition hover:bg-white/5", collapsed ? "justify-center" : ""].join(" ")}
          >
            <Avatar initials="MS" tone="brand" size="sm" />
            {!collapsed ? (
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-white">Maya Sorensen</span>
                <span className="block truncate text-xs text-white/40">Partner</span>
              </span>
            ) : null}
          </MenuButton>
          <MenuItems
            anchor="top start"
            className="w-52 rounded-xl border border-ink-100 bg-surface p-1.5 shadow-popover focus:outline-none"
          >
            <MenuItem>
              <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-700 data-[focus]:bg-ink-50">
                <User className="h-4 w-4 text-ink-400" /> Your profile
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => navigate("/login")}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-danger-600 data-[focus]:bg-danger-50"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-center gap-2 border-t border-white/10 py-2.5 text-xs font-medium text-white/40 transition hover:bg-white/5 hover:text-white"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : (
          <>
            <ChevronsLeft className="h-4 w-4" /> Collapse
          </>
        )}
      </button>
    </aside>
  );
}
