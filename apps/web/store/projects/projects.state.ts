import { projectsDefault } from "@/store/projects";
import { Signal, signal } from "@preact/signals-react";
import { ProjectSelect } from "@repo/database/types";

export const projectsSignal: Signal<ProjectSelect[]> = signal(projectsDefault);
