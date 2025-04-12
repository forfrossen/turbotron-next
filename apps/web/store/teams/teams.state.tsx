import { teamsDefault } from "@/store/teams/teams.default";
import { computed, signal } from "@preact/signals-react";

export const teamsSignal = signal(teamsDefault);

export const teamIdsSignal = computed(() => {
  return teamsSignal.value.map((team) => team.id);
});
