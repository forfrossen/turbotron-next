import { NavMenuItem } from "@/components/nav/nav-main";
import { getNavSections } from "@/components/providers/nav/get-nav-sections";
import { db } from "@repo/database";
import { navItems } from "@repo/database/schema";
import { eq } from "drizzle-orm";

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
