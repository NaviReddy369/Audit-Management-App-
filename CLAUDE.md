# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then produce a production build in `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no test runner, linter, or formatter configured. `npm run build` is the only correctness gate — run it after non-trivial changes; a TypeScript error fails the build (`strict` is on).

## What this is

**Northstar Audit OS** — a frontend-only prototype of an audit operating system for CPA firms doing not-for-profit audits (churches, schools, program-income nonprofits). React 18 + Vite + TypeScript + Tailwind, deployed to Cloudflare Pages. There is **no backend**: every screen renders from hardcoded mock data in `src/data`, and mutations live only in local component state (`useState`).

`Audit-Intake-MVP-Spec.md` is the authoritative product spec. Read its **Section 1.5 (Audit Methodology Primer)** before touching domain logic — the data model is a direct translation of the KBA (Knowledge-Based Audit) methodology. The single most important domain concept is **scoping**: form KBA-400 decides which audit areas are significant for a client; areas that are out of scope have their entire workpaper and every associated document request *skipped, not deprioritized*. `audit-portal-prototype.html` is an earlier standalone clickable mockup of the same worked example (Whitfield Preparatory Academy).

## Architecture

**Routing** (`src/App.tsx`): `/login` and `/portal` (the client-facing portal) render standalone. Everything else nests inside `<AppShell>` (Sidebar + Topbar + centered `max-w-[1400px]` main). List/detail pairs follow `/clients` → `/clients/:clientId`, same for `engagements`, `team`, `templates`. `main.tsx` wraps the app in `BrowserRouter`; `App` wraps routes in `ToastProvider`.

**Data layer** (`src/data`): the substitute for an API.
- `types.ts` — all domain types (`Client`, `Engagement`, `TeamMember`, `ScopeCard`, `RequestItemRow`, etc.) plus label maps (`entityTypeLabel`, `clientTypeLabel`, `questionMeta`).
- One file per entity (`clients.ts`, `engagements.ts`, `team.ts`, `templates.ts`, `activity.ts`, `firm.ts`, `dashboard.ts`) holds the seed array **and** its lookup helpers (`getClient(id)`, `getEngagement(id)`, `getEngagementsForClient(id)`, `getActivityForEngagement(id)`, ...). Entities reference each other by id string (e.g. `Engagement.clientId`, `Engagement.ownerId`).
- `index.ts` re-exports everything and adds derived aggregates like `firmMetrics()`. **Import domain data and helpers from `../data`, not from individual files.**

Detail pages resolve `useParams()` → `getX(id)` and `<Navigate>` away if the entity is missing (see `EngagementWorkspacePage.tsx`). Editable screens seed `useState` from the mock record, so edits are ephemeral and reset on navigation — this is expected for the prototype.

**Components**: `src/components/ui/*` are the reusable primitives (`DataTable`, `Drawer`, `Modal`, `Tabs`, `StatusPill`, `KanbanBoard`, `CommandPalette`, `Toast`, charts under `ui/charts/`). `src/components/layout/*` is the shell. Top-level `src/components/*` (`MetricCard`, `PageHeader`, `ProgressBar`, `QueueCard`) are app-specific building blocks. Toasts are consumed via the `useToast()` hook from `components/ui/Toast`.

**Styling**: Tailwind only. The design system lives in `tailwind.config.js` — use the semantic color scales (`ink`, `brand`, `success`, `warning`, `danger`, `info`, plus `canvas`/`surface`) and named shadows (`card`, `raised`, `popover`), not raw hex. `src/lib/ui.ts` centralizes the mapping from domain values to Tailwind classes: **`toneClasses`/`toneDot` for `Tone`, `riskTone`, `stageTone`, `avatarClasses`, plus `formatDate`/`timeAgo`**. Reuse these instead of writing new color-switch logic. Reusable class combos (e.g. `.panel`) are defined in `src/styles.css` under `@layer components`.

Charts use `recharts`; Headless UI (`@headlessui/react`) powers menus/switches/dialogs; icons come from `lucide-react`.

## Deployment

Cloudflare Pages, SPA mode. `public/_redirects` (`/* /index.html 200`) routes all paths to the client-side router — keep it when adding routes.
