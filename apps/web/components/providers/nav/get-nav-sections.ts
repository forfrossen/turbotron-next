"use server";
import { errorHandler } from "@/utils/error-handlers";
import { requireResult } from "@/utils/require-result";
import { db } from "@repo/database";
import { navMain } from "@repo/database/schema";
import { NavMainSelect } from "@repo/database/types";

export const getNavSections = async (): Promise<NavMainSelect[]> =>
  requireResult(db.select().from(navMain).all()).catch(errorHandler);
