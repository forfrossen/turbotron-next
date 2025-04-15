import {getProjectsByUserAndTeams} from "@/data/projects/get-projects-by-user-id";
import {projectsSignal, resetProjects, teamIdsSignal, userIdSignal} from "@/store";
import {useSignals} from "@preact/signals-react/runtime";
import {isEqual, isNil} from "lodash";
import {useEffect} from "react";

export const ProjectsProvider = () => {
  useSignals();

  async function getProjects() {
    const projects = await getProjectsByUserAndTeams(userIdSignal.value, teamIdsSignal.value);
    console.log("Fetching projects data...");

    if (!projectsSignal.value) {
      console.log("Projects signal is empty, resetting projects.");
      resetProjects();
      return;
    }

    if (!projects || isNil(projects) || projects.length === 0) {
      console.log("Projects data is null or undefined, not updating, resetting projects.");
      resetProjects();
      return;
    }

    if (isEqual(projectsSignal.value, projects)) {
      console.log("Projects data is equal to the current signal value, not updating.");
      return;
    }

    console.log("Projects data is different, updating the signal value.");
    projectsSignal.value = projects;
  }

  useEffect(() => {
    getProjects();
  }, [userIdSignal.value, teamIdsSignal.value]);

  return null;
};
