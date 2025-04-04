import { midiDevices } from "#db/schema";
import { db } from "#index";

export async function seedMidiDevices() {
  console.log("Seeding MidiDevices...");

  await db.insert(midiDevices).values([
    { name: "Kemper", shortName: "KPA", manufacturer: "Kemper", model: "Profiler" },
    { name: "Line6 Helix", shortName: "L6H", manufacturer: "Line6", model: "Helix" },
    { name: "Fractal Audio Axe-Fx III", shortName: "AX3", manufacturer: "Fractal Audio", model: "Axe-Fx III" },
    { name: "BOSS GT-1000", shortName: "GT1K", manufacturer: "BOSS", model: "GT-1000" },
    { name: "Zoom G11", shortName: "G11", manufacturer: "Zoom", model: "G11" },
    { name: "Headrush Gigboard", shortName: "GB", manufacturer: "Headrush", model: "Gigboard" },
    { name: "Neural DSP Quad Cortex", shortName: "QC", manufacturer: "Neural DSP", model: "Quad Cortex" },
    { name: "IK Multimedia Axe I/O", shortName: "AXIO", manufacturer: "IK Multimedia", model: "Axe I/O" },
    { name: "Moog Subsequent 37", shortName: "S37", manufacturer: "Moog", model: "Subsequent 37" }
  ]);

  console.log("✅ Seed MidiDevices complete!");
}
