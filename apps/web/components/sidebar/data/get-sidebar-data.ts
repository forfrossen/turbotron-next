"use server";
import { db } from "@repo/database";
import { navMain, projects, teams, users } from "@repo/database/schema";
import { NavMainSelect, ProjectSelect, TeamsSelect, UserSelect } from "@repo/database/types";
import { eq } from "drizzle-orm";

export const getUserById = async (userId: number): Promise<UserSelect[] | null> =>
  await db.select().from(users).where(eq(users.id, userId));
export const getTeamsOfUser = async (userId: number): Promise<TeamsSelect[] | null> =>
  await db.select().from(teams).where(eq(teams.userId, userId));
export const getNavSections = async (): Promise<NavMainSelect[] | null> => await db.select().from(navMain);
export const getProjectsOfUser = async (userId: number): Promise<ProjectSelect[] | null> =>
  await db.select().from(projects).where(eq(projects.userId, userId));
