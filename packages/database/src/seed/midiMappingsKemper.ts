import { midiMappings } from "#db/schema";
import { db } from "#index";
import { getKemperDeviceId } from "#utils/queries";

export async function seedMidiMappingsForKemper() {
  const deviceId = await getKemperDeviceId();
  console.log("Device ID for Kemper:", deviceId);

  console.log("Seeding MidiMappings for Kemper...");
  const messageType = "cc";

  console.log("🎚️ CC Messages – Continuous");
  await db.insert(midiMappings).values([
    { deviceId, messageType, value: 1, name: "wahPedal", description: "Wah Pedal", type: "continuous" },
    { deviceId, messageType, value: 4, name: "pitchPedal", description: "Pitch Pedal", type: "continuous" },
    { deviceId, messageType, value: 7, name: "volumePedal", description: "Volume Pedal", type: "continuous" },
    { deviceId, messageType, value: 10, name: "panorama", description: "Panorama", type: "continuous" },
    { deviceId, messageType, value: 11, name: "morphPedal", description: "Morph Pedal", type: "continuous" },
    { deviceId, messageType, value: 68, name: "delayMix", description: "Delay Mix", type: "continuous" },
    { deviceId, messageType, value: 69, name: "delayFeedback", description: "Delay Feedback", type: "continuous" },
    { deviceId, messageType, value: 70, name: "reverbMix", description: "Reverb Mix", type: "continuous" },
    { deviceId, messageType, value: 71, name: "reverbTime", description: "Reverb Time", type: "continuous" },
    { deviceId, messageType, value: 72, name: "gain", description: "Gain", type: "continuous" },
    { deviceId, messageType, value: 73, name: "monitorVolume", description: "Monitor Output Volume", type: "continuous" }
  ]);

  console.log("🧲 CC Messages – Switches");
  await db.insert(midiMappings).values([
    { deviceId, messageType, value: 16, name: "toggleAllEffects", description: "Toggle all effect modules A to REV", type: "switch" },
    { deviceId, messageType, value: 17, name: "moduleA", description: "Effect Module A On/Off", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 18, name: "moduleB", description: "Effect Module B On/Off", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 19, name: "moduleC", description: "Effect Module C On/Off", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 20, name: "moduleD", description: "Effect Module D On/Off", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 22, name: "moduleX", description: "Effect Module X On/Off", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 24, name: "moduleMOD", description: "Effect Module MOD On/Off", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 26, name: "moduleDLY", description: "Delay On/Off (no spillover)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 27, name: "moduleDLYSpill", description: "Delay On/Off (with spillover)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 28, name: "moduleREV", description: "Reverb On/Off (no spillover)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 29, name: "moduleREVSpill", description: "Reverb On/Off (with spillover)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 30, name: "tapTempo", description: "Tap Tempo / Beat Scanner", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 31, name: "tuner", description: "Tuner Mode On/Off", type: "switch", valueOn: 1, valueOff: 0 }
  ]);

  console.log(" ⏸️ Freeze FX");
  await db.insert(midiMappings).values([{ deviceId, messageType, value: 35, name: "freezeFX", description: "Freeze Delay and Reverb FX", type: "switch", valueOn: 1, valueOff: 0 }]);

  console.log("🎚️ Performance Slots mit Morph-Support");
  await db.insert(midiMappings).values([
    { deviceId, messageType, value: 51, name: "loadSlot2", description: "Load Slot 2 in Performance (Morph with alternating 1/0)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 52, name: "loadSlot3", description: "Load Slot 3 in Performance (Morph with alternating 1/0)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 53, name: "loadSlot4", description: "Load Slot 4 in Performance (Morph with alternating 1/0)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 54, name: "loadSlot5", description: "Load Slot 5 in Performance (Morph with alternating 1/0)", type: "switch", valueOn: 1, valueOff: 0 }
  ]);

  console.log(" 🎙️ Looper Steuerung");
  await db.insert(midiMappings).values([
    { deviceId, messageType, value: 81, name: "looperStart", description: "Looper Start (1 on press, 0 on release)", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 82, name: "looperStop", description: "Looper Stop (1 on press, 0 on release)", type: "switch", valueOn: 1, valueOff: 0 }
  ]);

  console.log(" 🎭 Performance Navigation via CC");
  await db.insert(midiMappings).values([
    { deviceId, messageType, value: 47, name: "selectPerformance", description: "Select Performance Index (0-124)", type: "continuous" },
    { deviceId, messageType, value: 48, name: "nextPerformance", description: "Next Performance / Scroll Up", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 49, name: "previousPerformance", description: "Previous Performance / Scroll Down", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 50, name: "loadSlot1", description: "Load Slot 1 in Performance", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 51, name: "loadSlot2", description: "Load Slot 2 in Performance", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 52, name: "loadSlot3", description: "Load Slot 3 in Performance", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 53, name: "loadSlot4", description: "Load Slot 4 in Performance", type: "switch", valueOn: 1, valueOff: 0 },
    { deviceId, messageType, value: 54, name: "loadSlot5", description: "Load Slot 5 in Performance", type: "switch", valueOn: 1, valueOff: 0 }
  ]);

  console.log("✅ Seed MidiMappings for Kemper complete!");
  await db.insert(midiMappings).values([
    { deviceId, messageType: "pc", value: 0, name: "program0", description: "Load Program #0 (Rig/Slot)", type: "program" },
    { deviceId, messageType: "pc", value: 1, name: "program1", description: "Load Program #1 (Rig/Slot)", type: "program" },
    { deviceId, messageType: "pc", value: 2, name: "program2", description: "Load Program #2 (Rig/Slot)", type: "program" },
    { deviceId, messageType: "pc", value: 3, name: "program3", description: "Load Program #3 (Rig/Slot)", type: "program" },
    { deviceId, messageType: "pc", value: 4, name: "program4", description: "Load Program #4 (Rig/Slot)", type: "program" },
    { deviceId, messageType: "pc", value: 5, name: "program5", description: "Load Program #5 (Rig/Slot)", type: "program" }
  ]);

  console.log("✅ Seed MidiMappings for Kemper complete!");
}
