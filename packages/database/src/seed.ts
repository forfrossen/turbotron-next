import { seedMidiDevices } from "#seed/midiDevices";
import { seedMidiGroups } from "#seed/midiGroups";
import { seedMidiMappingsForKemper } from "#seed/midiMappingsKemper";
import { seedNavMenu } from "#seed/navMenu";

export async function main() {
  await seedNavMenu();
  await seedMidiMappingsForKemper();
  await seedMidiDevices();
  await seedMidiGroups();
  console.log("✅ Seed complete!");
  console.log("✅ All data seeded successfully!");
}

main();
