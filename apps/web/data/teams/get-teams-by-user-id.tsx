"use server";
import {db} from "@repo/database";
import {teams} from "@repo/database/schema";
import {TeamsSelect, UserSelect} from "@repo/database/types";
import {eq} from "drizzle-orm";

export const getTeamsByUserId = async (userId: UserSelect["id"]): Promise<TeamsSelect[]> =>
  db.select().from(teams).where(eq(teams.userId, userId)).all();
