"use client";
import { useMidiData } from "#store/config-store";
import { addCcRegions } from "components/track-item/utils/create-regions.js";
import { isNil } from "lodash";
import React, { useEffect } from "react";
import { useWavesurfer } from "store/transport-store.js";

const MidiGrid: React.FC = () => {
  const midiData = useMidiData();

  const trackIndex = 0; // Assuming you want to display the first track
  const track = midiData?.tracks[trackIndex];
  const controlChanges = track?.controlChanges;
  const wavesurfer = useWavesurfer();

  useEffect(() => {
    if (!wavesurfer) return;
    if (!track) return;
    console.log("track", track);

    wavesurfer.on("decode", () => {
      if (isNil(controlChanges)) return;

      addCcRegions(controlChanges, wavesurfer);
    });
  }, [controlChanges, track, wavesurfer]);

  if (!midiData) {
    return <p>No MIDI data loaded.</p>;
  }

  if (!track) {
    return <p>No track data available.</p>;
  }

  if (!wavesurfer) {
    return <p>Wavesurfer not initialized.</p>;
  }

  return (
    <div key={trackIndex} className="border p-2">
      {track.notes.map((note, noteIndex) => (
        <div key={noteIndex} className="text-sm">
          {`Note: ${note.name}, Time: ${note.time.toFixed(2)}, Duration: ${note.duration.toFixed(2)}`}
        </div>
      ))}
      {track.controlChanges &&
        Object.entries(track.controlChanges).map(([controller, changes]) =>
          changes.map((controlChange, ccIndex) => (
            <div key={`${controller}-${ccIndex}`} className="text-sm">
              {`Control Change: ${controller}, Value: ${controlChange.value}, Time: ${controlChange.time.toFixed(2)}`}
            </div>
          ))
        )}
    </div>
  );
};

export default MidiGrid;
