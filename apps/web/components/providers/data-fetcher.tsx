"use server";
import DataProvider from "@/components/providers/data-provider";
import { db } from "@repo/database";
import { navMain, projects, teams, users } from "@repo/database/schema";
import { eq } from "drizzle-orm";

export async function DataFetcher() {
  const getUser = db.select().from(users).where(eq(users.id, 1));
  const getTeams = db.select().from(teams).where(eq(teams.userId, 1));
  const navSections = db.select().from(navMain);
  const allProjects = db.select().from(projects);

  return <DataProvider userPromise={getUser} teamsPromise={getTeams} />;
}
