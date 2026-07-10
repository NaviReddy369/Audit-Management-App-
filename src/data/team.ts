import type { TeamMember } from "./types";

export const team: TeamMember[] = [
  {
    id: "maya-s",
    name: "Maya Sorensen",
    initials: "MS",
    role: "Partner",
    email: "maya.sorensen@meridiancole.com",
    capacity: 82,
    activeEngagements: 4,
    tone: "brand",
    joined: "2013"
  },
  {
    id: "noah-t",
    name: "Noah Tran",
    initials: "NT",
    role: "Manager",
    email: "noah.tran@meridiancole.com",
    capacity: 91,
    activeEngagements: 5,
    tone: "warning",
    joined: "2017"
  },
  {
    id: "aiden-r",
    name: "Aiden Reyes",
    initials: "AR",
    role: "Senior Associate",
    email: "aiden.reyes@meridiancole.com",
    capacity: 64,
    activeEngagements: 3,
    tone: "info",
    joined: "2020"
  },
  {
    id: "priya-k",
    name: "Priya Kapoor",
    initials: "PK",
    role: "Manager",
    email: "priya.kapoor@meridiancole.com",
    capacity: 58,
    activeEngagements: 3,
    tone: "success",
    joined: "2016"
  },
  {
    id: "jordan-l",
    name: "Jordan Lee",
    initials: "JL",
    role: "Associate",
    email: "jordan.lee@meridiancole.com",
    capacity: 45,
    activeEngagements: 2,
    tone: "info",
    joined: "2023"
  },
  {
    id: "sam-w",
    name: "Sam Whitfield",
    initials: "SW",
    role: "Senior Associate",
    email: "sam.whitfield@meridiancole.com",
    capacity: 73,
    activeEngagements: 3,
    tone: "danger",
    joined: "2019"
  }
];

export function getTeamMember(id: string) {
  return team.find((member) => member.id === id);
}
