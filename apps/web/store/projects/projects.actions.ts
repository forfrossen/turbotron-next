import { projectsDefault } from "@/store/projects/projects.default";
import { projectsSignal } from "@/store/projects/projects.state";

export const resetProjects = () => {
  projectsSignal.value = projectsDefault;
};
