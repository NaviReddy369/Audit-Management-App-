import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ToastProvider } from "./components/ui/Toast";
import { DashboardPage } from "./pages/DashboardPage";
import { ClientsListPage } from "./pages/ClientsListPage";
import { ClientDetailPage } from "./pages/ClientDetailPage";
import { EngagementsListPage } from "./pages/EngagementsListPage";
import { EngagementWorkspacePage } from "./pages/EngagementWorkspacePage";
import { TeamListPage } from "./pages/TeamListPage";
import { AuditorDetailPage } from "./pages/AuditorDetailPage";
import { TemplatesLibraryPage } from "./pages/TemplatesLibraryPage";
import { TemplateDetailPage } from "./pages/TemplateDetailPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ClientPortalPage } from "./pages/ClientPortalPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<ClientPortalPage />} />
        <Route
          path="/*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/clients" element={<ClientsListPage />} />
                <Route path="/clients/:clientId" element={<ClientDetailPage />} />
                <Route path="/engagements" element={<EngagementsListPage />} />
                <Route path="/engagements/:engagementId" element={<EngagementWorkspacePage />} />
                <Route path="/team" element={<TeamListPage />} />
                <Route path="/team/:memberId" element={<AuditorDetailPage />} />
                <Route path="/templates" element={<TemplatesLibraryPage />} />
                <Route path="/templates/:templateId" element={<TemplateDetailPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </ToastProvider>
  );
}
