"use server";

import { db } from "@repo/database";
import { teams } from "@repo/database/schema";
import { eq } from "drizzle-orm";

export async function getDefaultUser() {
  return (await db.query.users.findFirst()) ?? null;
  // return (await db.select().from(users).limit(1)) ?? null;
  // return (await db.select().from(users).where(eq(users.id, 1)).limit(1)) ?? null;
}

export async function getTeamsForUser(userid: number) {
  return await db.select().from(teams).where(eq(teams.userId, userid));
}
