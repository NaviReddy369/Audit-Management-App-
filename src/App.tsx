import { NavLink, Route, Routes } from "react-router-dom";
import { AppWindow, Bot, BriefcaseBusiness, Files, LayoutDashboard, MessagesSquare, ShieldCheck } from "lucide-react";
import { DashboardPage } from "./pages/DashboardPage";
import { EngagementPage } from "./pages/EngagementPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { AiLabPage } from "./pages/AiLabPage";
import { ClientPortalPage } from "./pages/ClientPortalPage";

const navItems = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/engagement", label: "Engagement Workspace", icon: BriefcaseBusiness },
  { to: "/templates", label: "Template Intelligence", icon: Files },
  { to: "/ai-lab", label: "AI Control Room", icon: Bot },
  { to: "/client-portal", label: "Client Portal", icon: MessagesSquare }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(30,106,90,0.11),transparent_20%),radial-gradient(circle_at_top_right,rgba(181,110,42,0.12),transparent_18%),linear-gradient(180deg,#f7f1e8_0%,#efe6da_100%)] text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="border-r border-white/10 bg-ink px-5 py-6 text-white">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pine to-[#18352e] text-xl font-bold">
              N
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">Audit Operating System</p>
              <h1 className="font-display text-3xl leading-none">Northstar</h1>
            </div>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/45">
              <ShieldCheck className="h-4 w-4" />
              Firm Status
            </div>
            <p className="text-sm leading-6 text-white/80">
              3 engagements are waiting on client evidence. 2 external approvals are open. 1 intake needs manager review.
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  ].join(" ")
                }
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <AppWindow className="h-4 w-4 text-white/30" />
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/engagement" element={<EngagementPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/ai-lab" element={<AiLabPage />} />
            <Route path="/client-portal" element={<ClientPortalPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
