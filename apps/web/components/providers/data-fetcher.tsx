"use server";
import { NavMenuItem } from "#components/nav/nav-main";
import { NavMenuUser } from "#components/nav/nav-user";
import DataProvider from "#components/providers/data-provider";
import { db } from "@repo/database";
import { navItems, navMain, projects, teams, users } from "@repo/database/schema";
import { eq } from "drizzle-orm";

export async function DataFetcher() {
  const allUsers = await db.select().from(users);
  const allTeams = await db.select().from(teams);
  const navSections = await db.select().from(navMain);
  const allProjects = await db.select().from(projects);

  const navMainWithItems = await Promise.all(
    navSections.map(async (section) => {
      const items = await db.select().from(navItems).where(eq(navItems.navMainId, section.id));

      return {
        title: section.title,
        url: section.url,
        icon: section.icon,
        isActive: !!section.isActive,
        items: items.map((item) => ({
          title: item.title,
          url: item.url
        }))
      } as NavMenuItem;
    })
  );

  const result: SidebarData = {
    user: allUsers[0] as NavMenuUser,
    teams: allTeams.map((team) => ({
      name: team.name,
      logo: team.logo,
      plan: team.plan
    })),
    navMain: navMainWithItems,
    projects: allProjects.map((project) => ({
      name: project.name,
      logo: project.logo,
      plan: project.plan
    }))
  };

  return <DataProvider data={result} />;
}
