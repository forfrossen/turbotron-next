"use client";

import {useEffect} from "react";

import {getTeamsByUserId} from "@/data/teams/get-teams-by-user-id";
import {resetTeams, teamsSignal, userIdSignal} from "@/store";
import {useSignals} from "@preact/signals-react/runtime";
import {isEqual, isNil} from "lodash";

export const TeamsProvider = () => {
  useSignals();

  async function getTeams() {
    const teams = await getTeamsByUserId(userIdSignal.value);
    console.log("Fetching teams data...");

    if (!teamsSignal.value) {
      console.log("Teams signal is empty, resetting teams.");
      resetTeams();
      return;
    }

    if (!teams || isNil(teams) || teams.length === 0) {
      console.log("Teams data is null or undefined, not updating, resetting teams.");
      resetTeams();
      return;
    }

    if (isEqual(teamsSignal.value, teams)) {
      console.log("Teams data is equal to the current signal value, not updating.");
      return;
    }

    console.log("Teams data is different, updating the signal value.");
    teamsSignal.value = teams;
  }

  useEffect(() => {
    getTeams();
  }, [userIdSignal.value]);

  return null;
};
