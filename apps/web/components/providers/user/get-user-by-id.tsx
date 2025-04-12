"use server";
import { defaultUser } from "@/store/user/user.default";
import { requireResult } from "@/utils/require-result";
import { db } from "@repo/database";
import { users } from "@repo/database/schema";
import { UserSelect } from "@repo/database/types";
import { eq } from "drizzle-orm";

export const getUserById = async (userId: UserSelect["id"]): Promise<UserSelect> =>
  requireResult(db.query.users.findFirst({ where: eq(users.id, userId) })).catch((error) => {
    console.error("Error fetching user by ID:", error);
    return defaultUser;
  });
