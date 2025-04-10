import { midiDevices } from "#db/schema";
import { db } from "#index";
import { eq } from "drizzle-orm";


export const getKemperDeviceId = async () => {
  console.log("Fetching Device ID for Kemper...");
  // Fetch the device ID for Kemper

  const result = await db.select({ id: midiDevices.id }).from(midiDevices).where(eq(midiDevices.shortName, "KPA"));
  const deviceId = result[0]?.id;

  if (!deviceId) {
    throw new Error("Device ID not found for Kemper");
  }
  console.log("Device ID for Kemper:", deviceId);
  return deviceId;
};
