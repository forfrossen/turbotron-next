import { midiGroups } from "@/db/schema";
import { db } from "@/index";

export async function seedMidiGroups() {
  console.log("Seeding MidiGroups...");

  console.log("🎚️ CC Messages – Continuous");
  await db
    .insert(midiGroups)
    .values([
      { name: "CC Messages - Continuous", description: "Continuous Control Change Messages", sortOrder: 1 },
      { name: "CC Messages - Switches", description: "Switch Control Change Messages", sortOrder: 2 },
      { name: "Freeze FX", description: "Freeze Delay and Reverb FX", sortOrder: 3 },
      { name: "Performance Slots mit Morph-Support", description: "Performance Slots with Morph Support", sortOrder: 4 },
      { name: "Looper Steuerung", description: "Looper Control", sortOrder: 5 },
      { name: "Performance Navigation via CC", description: "Performance Navigation via CC", sortOrder: 6 },
      { name: "Program Change", description: "Program Change Messages", sortOrder: 7 },
      { name: "PC Messages", description: "Program Change Messages", sortOrder: 8 },
      { name: "PC Messages - Switches", description: "Switch Program Change Messages", sortOrder: 9 },
      { name: "PC Messages - Continuous", description: "Continuous Program Change Messages", sortOrder: 10 }
    ])
    .onConflictDoNothing();
  console.log("✅ Seed MidiGroups complete!");
}
