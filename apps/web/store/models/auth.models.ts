import { TeamsSelect, UserSelect } from "@repo/database/types";

export const emptyUser: UserSelect = {
  id: 0,
  name: "",
  email: "",
  avatar: ""
};

export const emptyTeam: TeamsSelect = {
  id: 0,
  name: "",
  logo: "",
  plan: "",
  userId: 0
};

export const emptyTeams: TeamsSelect[] = [emptyTeam];
