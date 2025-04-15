"use server";
import {db} from "@repo/database";
import {users} from "@repo/database/schema";
import {UserSelect} from "@repo/database/types";
import {eq} from "drizzle-orm";

export const getUserById = async (userId: UserSelect["id"]): Promise<UserSelect> => {
  const user = await db.query.users.findFirst({where: eq(users.id, userId)});
  if (!user) throw new Error(`User with id ${userId} not found`);
  return user;
};
