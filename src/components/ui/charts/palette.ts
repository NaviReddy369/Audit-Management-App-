import type { EngagementStage, EntityType, RiskLevel } from "../../../data";

export const STAGE_COLORS: Record<EngagementStage, string> = {
  Draft: "#8B93A7",
  Sent: "#3B82F6",
  "In Progress": "#F59E0B",
  Submitted: "#10B981",
  Reviewed: "#14B8A6"
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  Low: "#10B981",
  Moderate: "#F59E0B",
  High: "#F43F5E"
};

export const ENTITY_COLORS: Record<EntityType, string> = {
  school: "#2a78d6",
  church: "#4a3aa7",
  nfp_program_income: "#1baf7a",
  nfp_general: "#eb6834"
};

export const BRAND_SEQUENTIAL = ["#EEF0FF", "#C3C8FF", "#9CA3F7", "#7A80EF", "#5B5FE8", "#4740D9"];

export const GRID_STROKE = "#EBEDF1";
export const AXIS_TICK = { fill: "#8B93A7", fontSize: 11 };
