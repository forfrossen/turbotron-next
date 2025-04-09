"use server";
import { NavMenuItem } from "@/components/nav/nav-main";
import { NavMenuProjects } from "@/components/nav/nav-projects";
import { NavMenuUser } from "@/components/nav/nav-user";
import AppSidebar from "@/components/sidebar/app-sidebar";
import {
    getNavSections,
    getProjectsOfUser,
    getTeamsOfUser,
    getUserById
} from "@/components/sidebar/data/get-sidebar-data";
import { NavMenuTeams } from "@/components/team-switcher";
import { db } from "@repo/database";
import { navItems } from "@repo/database/schema";
import { Sidebar } from "@repo/ui/components/sidebar";

export type SidebarData = {
  user: NavMenuUser;
  teams: NavMenuTeams;
  navMain: NavMenuItem[];
  projects: NavMenuProjects;
  user: NavMenuUser;
};

export async function AppSidebarWithData({
  props
}: Readonly<{
  props?: React.ComponentProps<typeof Sidebar>;
}>) {
  const userId = 1;
  const allUsers = await getUserById(userId);
  const allTeams = await getTeamsOfUser(userId);
  const navSections = await getNavSections();
  const allProjects = await getProjectsOfUser(userId);

  const navMainWithItems = await Promise.all(
    navSections.map(async (section) => {
      const items = await db.select().from(navItems);
      // .where(eq(navItems.navMainId, section.id));

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
      url: project.url,
      icon: project.icon
    }))
  };

  return <AppSidebar data={result} {...props} />;
}
