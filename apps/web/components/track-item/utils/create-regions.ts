"use client";
import { ControlChanges } from "@tonejs/midi/dist/ControlChanges.js";
import { getMappings } from "components/track-item/utils/get-mappings.js";
import WaveSurfer from "wavesurfer.js";

export const addCcRegions = (controlChanges: ControlChanges, wavesurfer: WaveSurfer) => {
  const mappings = getMappings(1).then((mappings) => {
    for (const ccNumber in controlChanges) {
      console.log(`CC Number: ${ccNumber}`);
      const events = controlChanges[ccNumber];
      if (!events) continue;
      for (const event of events) {
        console.log(`Event: ${JSON.stringify(event)}`);
        const cc = parseInt(ccNumber, 10);
        const value = Math.round(event.value * 127); // Re-normalize
        const time = event.time;
        console.log(`[${time}s] Unknown CC#${cc}: Value ${value}`);

        // Lookup in DB
        // const mapping = await db.query.midiMappings.findFirst({
        //   where: (m) => m.cc === cc && m.messageType === 'cc',
        // });
        const mapping = mappings.find((mapping) => {
          if (mapping.value !== cc) return false;
          if (mapping.messageType !== "cc") return false;
        });

        if (mapping) {
          console.log(`[${time}s] CC#${cc} (${mapping.name}): Value ${value}`);
        } else {
          console.log(`[${time}s] Unknown CC#${cc}: Value ${value}`);
        }
      }
    }
  });

  // const mapControlChanges = createCcMapper(wavesurfer, controlChanges);

  // if (!controlChanges) return;

  // const allControlChanges = Object.entries(controlChanges);

  // const handleEntry = ([controller, changes]: [string, ControlChange[]], i: number) => {
  //   console.log(`Controller: ${controller}`);
  //   console.log(`Control Changes: ${JSON.stringify(changes)}`);

  //   return changes.map(mapControlChanges);
  // };

  // allControlChanges.forEach(handleEntry);
};

// const createCcMapper =
//   (wavesurfer: WaveSurfer, controlChanges: ControlChanges) => (controlChange: ControlChange, ccIndex: number) => {
//     if (!controlChanges) return;
//     if (!wavesurfer) return;

//     let end;
//     if (controlChanges[i + 1] === undefined) {
//       end = wavesurfer.getDuration();
//     } else {
//       end = changes[ccIndex + 1]?.time || wavesurfer.getDuration();
//     }
//     end = end - 5;

//     regions.addRegion({
//       start: controlChange.time,
//       end: end,
//       // color: "rgba(255, 0, 0, 0.5)"
//       color: randomColor(),
//       content: `CC: ${controller}, Value: ${controlChange.value}`,
//       drag: false,
//       resize: false
//     });
//   };
