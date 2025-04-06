import { seedMidiDevices } from "#seed/midiDevices";
import { seedMidiGroups } from "#seed/midiGroups";
import { seedMidiMappingsForKemper } from "#seed/midiMappingsKemper";
import { seedNavMenu } from "#seed/navMenu";

export async function seed() {
  await seedNavMenu();
  await seedMidiDevices();
  await seedMidiMappingsForKemper();
  await seedMidiGroups();
  console.log("✅ Seed complete!");
  console.log("✅ All data seeded successfully!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
