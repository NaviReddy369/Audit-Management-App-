import type { Client } from "./types";

export const clients: Client[] = [
  {
    id: "whitfield-prep",
    name: "Whitfield Preparatory Academy",
    entityType: "school",
    since: "2019",
    fiscalYearEnd: "June 30",
    riskRating: "High",
    primaryAuditorId: "maya-s",
    address: "220 Academy Row, Evanston, IL",
    contacts: [
      { name: "Dana Whitfield", title: "CFO", email: "dana.w@whitfieldprep.edu", phone: "(312) 555-0148" },
      { name: "Marcus Ohl", title: "Business Manager", email: "marcus.o@whitfieldprep.edu", phone: "(312) 555-0149" }
    ]
  },
  {
    id: "grace-community",
    name: "Grace Community Church",
    entityType: "church",
    since: "2015",
    fiscalYearEnd: "December 31",
    riskRating: "Moderate",
    primaryAuditorId: "noah-t",
    address: "88 Grace Ave, Oak Park, IL",
    contacts: [{ name: "Rev. Samuel Okafor", title: "Executive Pastor", email: "samuel@gracecommunity.org", phone: "(708) 555-0122" }]
  },
  {
    id: "hope-family",
    name: "Hope Family Services",
    entityType: "nfp_program_income",
    since: "2021",
    fiscalYearEnd: "September 30",
    riskRating: "Low",
    primaryAuditorId: "maya-s",
    address: "1450 Wellness Blvd, Chicago, IL",
    contacts: [{ name: "Renee Aldous", title: "Director of Finance", email: "renee@hopefamilyservices.org", phone: "(773) 555-0176" }]
  },
  {
    id: "willow-creek",
    name: "Willow Creek Fellowship",
    entityType: "church",
    since: "2024",
    fiscalYearEnd: "December 31",
    riskRating: "High",
    primaryAuditorId: "aiden-r",
    address: "9 Willow Creek Dr, Naperville, IL",
    contacts: [{ name: "Tasha Reyes", title: "Operations Director", email: "tasha@willowcreek.org", phone: "(630) 555-0110" }]
  },
  {
    id: "riverside-youth",
    name: "Riverside Youth Alliance",
    entityType: "nfp_general",
    since: "2018",
    fiscalYearEnd: "June 30",
    riskRating: "Moderate",
    primaryAuditorId: "priya-k",
    address: "300 Riverside Pkwy, Chicago, IL",
    contacts: [{ name: "Ben Castillo", title: "Executive Director", email: "ben@riversideyouth.org", phone: "(312) 555-0199" }]
  },
  {
    id: "lakeside-montessori",
    name: "Lakeside Montessori School",
    entityType: "school",
    since: "2022",
    fiscalYearEnd: "June 30",
    riskRating: "Low",
    primaryAuditorId: "priya-k",
    address: "77 Lakeside Ln, Winnetka, IL",
    contacts: [{ name: "Elise Vaughn", title: "Head of School", email: "elise@lakesidemontessori.edu", phone: "(847) 555-0133" }]
  },
  {
    id: "harborview-shelter",
    name: "Harborview Family Shelter",
    entityType: "nfp_program_income",
    since: "2020",
    fiscalYearEnd: "December 31",
    riskRating: "Moderate",
    primaryAuditorId: "sam-w",
    address: "512 Harbor St, Chicago, IL",
    contacts: [{ name: "Nina Prescott", title: "Finance Manager", email: "nina@harborviewshelter.org", phone: "(773) 555-0187" }]
  },
  {
    id: "st-andrews",
    name: "St. Andrew's Parish",
    entityType: "church",
    since: "2012",
    fiscalYearEnd: "June 30",
    riskRating: "Low",
    primaryAuditorId: "noah-t",
    address: "14 Cathedral Way, Chicago, IL",
    contacts: [{ name: "Msgr. Peter Doyle", title: "Parish Administrator", email: "peter@standrewsparish.org", phone: "(312) 555-0155" }]
  }
];

export function getClient(id: string) {
  return clients.find((client) => client.id === id);
}
