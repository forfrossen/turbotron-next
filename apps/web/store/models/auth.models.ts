import { TeamsSelect } from "@repo/database/types";

export const emptyTeam: TeamsSelect = {
  id: 0,
  name: "",
  logo: "",
  plan: "",
  userId: 0
};

export const emptyTeams: TeamsSelect[] = [emptyTeam];
