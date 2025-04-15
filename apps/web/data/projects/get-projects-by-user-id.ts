"use server";
import { db } from "@repo/database";
import { projects } from "@repo/database/schema";
import { ProjectSelect, TeamsSelect, UserSelect } from "@repo/database/types";
import { and, eq, inArray } from "drizzle-orm";

export const getProjectsByUserAndTeams = async (
  userId: UserSelect[ "id" ],
  teamIds: TeamsSelect[ "id" ][]
): Promise<ProjectSelect[]> =>

  db
    .select()
    .from( projects )
    .where( and( eq( projects.userId, userId ), inArray( projects.teamId, teamIds ) ) )
    .all()
