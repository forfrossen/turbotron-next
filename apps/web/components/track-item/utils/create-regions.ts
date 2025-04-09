"use client";
import { getMappings } from "@/components/track-item/utils/get-mappings";
import { ControlChanges } from "@tonejs/midi/dist/ControlChanges";
import WaveSurfer from "wavesurfer.js";

export const addCcRegions = (controlChanges: ControlChanges, wavesurfer: WaveSurfer) => {
  getMappings(1).then((mappings) => {
    console.log("Mappings:", mappings);

    for (const ccString in controlChanges) {
      const ccNumber = parseInt(ccString);
      const ccName = getCcNameForValue(ccNumber, mappings);
      console.log(`CC Number: ${ccNumber}`);
      console.log(`CC Name for ${ccNumber}: ${ccName}`);

      if (isNaN(ccNumber)) continue;

      console.log(`Mapping for CC#${ccNumber}:`, mappings);
      const events = controlChanges[ccNumber];

      if (!events) continue;

      for (const event of events) {
        console.log(`Event: ${JSON.stringify(event)}`);
        const cc = ccNumber;
        const value = event.value;
        const time = event.time;
        console.log(`[${time}s] Unknown CC#${cc}: Value ${value}`);
        const mapping = mappings.find((mapping) => mapping.messageType === "cc" && mapping.value === cc);

        if (mapping) {
          console.log(`[${time}s] CC#${cc} (${mapping.name}): Value ${value}`);
        } else {
          console.log(`[${time}s] Unknown CC#${cc}: Value ${value}`);
        }
      }
    }
  });
};

const getCcNameForValue = (
  ccNumber: number,
  mappings: {
    id: number;
    name: string;
    deviceId: number;
    messageType: "cc" | "pc";
    value: number | null;
    description: string;
    type: "continuous" | "switch" | "program";
    valueOn: number | null;
    valueOff: number | null;
  }[]
) => {
  console.log("Searching for name for CC number:", ccNumber);
  const mapping = mappings.find((mapping) => mapping.messageType === "cc" && mapping.value === ccNumber);

  if (mapping) {
    console.log(`Found mapping for CC#${ccNumber}:`, mapping);
  } else {
    console.log(`No mapping found for CC#${ccNumber}`);
  }
  return mapping ? mapping.name : `Unknown CC#${ccNumber}`;
};
