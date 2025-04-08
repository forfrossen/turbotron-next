import { db } from "@repo/database";
import { navMain, projects, teams, users } from "@repo/database/schema";
import { NavMainSelect, ProjectSelect, TeamSelect, UserSelect } from "@repo/database/types";

const getAllUsers = async (): Promise<UserSelect[] | null> => await db.select().from(users);
const allTeams = async (): Promise<TeamSelect[] | null> => await db.select().from(teams);
const navSections = async (): Promise<NavMainSelect[] | null> => await db.select().from(navMain);
const allProjects = async (): Promise<ProjectSelect[] | null> => await db.select().from(projects);
