import { NavMenuItem } from "@/components/nav/nav-main";
import { bind } from "@react-rxjs/core";
import { ProjectSelect } from "@repo/database/types";

import { BehaviorSubject } from "rxjs";

export const navItems$ = new BehaviorSubject<NavMenuItem[]>([]);
export const navItemsBinder = bind(navItems$);
export const useNavItems = navItemsBinder[0];

export const projects$ = new BehaviorSubject<ProjectSelect[]>([]);
export const projectsBinder = bind(projects$);
export const useProjects = projectsBinder[0];
export const useSetProjects = () => projectsBinder[1];
