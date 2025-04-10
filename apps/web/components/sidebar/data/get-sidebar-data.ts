"use server";
import { NavMenuItem } from "@/components/nav/nav-main";
import { requireResult } from "@/utils/require-result";
import { db } from "@repo/database";
import { navItems, navMain, projects, teams, users } from "@repo/database/schema";
import { NavMainSelect, ProjectSelect, TeamsSelect, UserSelect } from "@repo/database/types";
import { eq } from "drizzle-orm";

export const getUserById = async (userId: number): Promise<UserSelect> =>
  requireResult(db.query.users.findFirst({ where: eq(users.id, userId) }));

export const getTeamsOfUser = async (userId: number): Promise<TeamsSelect[]> =>
  requireResult(db.select().from(teams).where(eq(teams.userId, userId)));

export const getNavSections = async (): Promise<NavMainSelect[]> => requireResult(db.select().from(navMain));

export const getProjectsOfUser = async (userId: number): Promise<ProjectSelect[]> =>
  requireResult(db.select().from(projects).where(eq(projects.userId, userId)));

export const getNavSectionsWithItems = async (): Promise<NavMenuItem[]> => {
  const navSections = await getNavSections();

  const navSectionsWithItems = await Promise.all(
    navSections.map(async (section) => {
      const itemsResult = await db.select().from(navItems).where(eq(navItems.navMainId, section.id));
      const items = itemsResult.map((item) => ({
        title: item.title,
        url: item.url
      }));

      return {
        title: section.title,
        url: section.url,
        icon: section.icon,
        isActive: !!section.isActive,
        items
      };
    })
  );

  return navSectionsWithItems;
};
