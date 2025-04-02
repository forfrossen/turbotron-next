"use server";
import { db } from "@repo/database/db";
import { navItems, navMain, projects, teams, users } from "@repo/database/db/schema";
import { Sidebar } from "@repo/ui/components/sidebar";
import { NavMenuItem } from "@repo/web/components/nav/nav-main";
import { NavMenuProjects } from "@repo/web/components/nav/nav-projects";
import { NavMenuUser } from "@repo/web/components/nav/nav-user";
import { AppSidebar } from "@repo/web/components/sidebar/app-sidebar";
import { NavMenuTeams } from "@repo/web/components/team-switcher";
import { eq } from "drizzle-orm";
import * as LucideIcons from "lucide-react";

export type SidebarData = {
  user: NavMenuUser;
  teams: NavMenuTeams;
  navMain: NavMenuItem[];
  projects: NavMenuProjects;
};

function getIconByName(name: string) {
  return (LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon) || null;
}

export async function AppSidebarWithData({
  props
}: Readonly<{
  props?: React.ComponentProps<typeof Sidebar>;
}>) {
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
        icon: getIconByName(section.icon),
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
      logo: getIconByName(team.logo),
      plan: team.plan
    })),
    navMain: navMainWithItems,
    projects: allProjects.map((project) => ({
      name: project.name,
      url: project.url,
      icon: getIconByName(project.icon)
    }))
  };

  return <AppSidebar data={result} {...props} />;
}
