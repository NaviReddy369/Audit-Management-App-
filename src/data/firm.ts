export const firm = {
  name: "Meridian & Cole CPAs",
  plan: "Growth",
  seats: 12,
  seatsUsed: 6,
  address: "400 Lakeshore Drive, Suite 800, Chicago, IL 60601",
  founded: 2011,
  fiscalYearStart: "January",
  auditAreas: [
    { name: "Cash", alwaysInScope: true },
    { name: "Revenue & Contributions", alwaysInScope: true },
    { name: "Payroll", alwaysInScope: true },
    { name: "Net Assets", alwaysInScope: true },
    { name: "Financial Reporting / Closing", alwaysInScope: true },
    { name: "Investments", alwaysInScope: false },
    { name: "PP&E", alwaysInScope: false },
    { name: "AP & Disbursements", alwaysInScope: false },
    { name: "Debt & Leases", alwaysInScope: false },
    { name: "IT General Controls", alwaysInScope: false },
    { name: "Related-Party", alwaysInScope: false },
    { name: "UBI / Tax", alwaysInScope: false }
  ]
};
