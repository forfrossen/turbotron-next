"use server";
import { db } from "@repo/database";
import { navMain } from "@repo/database/schema";
import { NavMainSelect } from "@repo/database/types";

export const getNavSections = async (): Promise<NavMainSelect[]> =>
  db.select().from( navMain ).all()
