"use server";
import { db } from "@repo/database";
import { users } from "@repo/database/schema";
import { UserSelect } from "@repo/database/types";

/**
 * Fetches user data from the database based on the provided user ID.
 *
 * @param {UserSelect["id"]} userId - The ID of the user to fetch.
 * @returns {Promise<UserSelect | null>} - A promise that resolves to the user data or null if not found.
 */
export const getUserData = async (userId: UserSelect["id"]): Promise<UserSelect | null> => {
  const user = await db
    .select()
    .from(users)
    // .where(eq(users.id, userId))
    .limit(1)
    .get();

  return user ?? null;
};

export const getDefaultUser = async (): Promise<UserSelect> => {
  const user = await db
    .select()
    .from(users)
    // .where(eq(users.id, 1))
    .limit(1)
    .get();
  if (!user) {
    throw new Error("No default user found");
  }

  return user;
};
