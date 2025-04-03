import { useMidiData } from "@repo/web/store/config-store";
import React from "react";

const MidiGrid: React.FC = () => {
  const midiData = useMidiData();
  const trackIndex = 0; // Assuming you want to display the first track
  const track = midiData?.tracks[trackIndex];

  if (!midiData) {
    return <p>No MIDI data loaded.</p>;
  }

  if (!track) {
    return <p>No track data available.</p>;
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
