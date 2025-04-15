"use server";
import { db } from "@repo/database";
import { navItems } from "@repo/database/schema";
import { NavItemsSelect, NavMainSelect } from "@repo/database/types";
import { eq } from "drizzle-orm";

export const getNavItemsBySection = async ( sectionId: NavMainSelect[ "id" ] ): Promise<NavItemsSelect[]> =>
  db.select().from( navItems ).where( eq( navItems.navMainId, sectionId ) ).all()
