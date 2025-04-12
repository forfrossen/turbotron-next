import { teamsDefault } from "@/store/teams/teams.default";
import { teamsSignal } from "@/store/teams/teams.state";

export const resetTeams = () => {
  teamsSignal.value = teamsDefault;
};
