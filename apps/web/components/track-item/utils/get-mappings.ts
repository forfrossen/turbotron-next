"use server";

import { db } from "@repo/database";
import { midiMappings } from "@repo/database/db/schema";
import { eq } from "drizzle-orm";
export async function getMappings(deviceId: number) {
  const mapping = await db.query.midiMappings.findMany({
    where: eq(midiMappings.deviceId, deviceId)
  });
  return mapping;
}
