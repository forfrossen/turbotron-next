import { useMidiData } from "@repo/web/store/MidiStore";
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
    <div className="grid grid-cols-12 gap-2 p-4 border rounded">
      <div key={trackIndex} className="border p-2">
        <h3 className="font-bold">Track {trackIndex + 1}</h3>
        {track.notes.map((note, noteIndex) => (
          <div key={noteIndex} className="text-sm">
            {`Note: ${note.name}, Time: ${note.time.toFixed(2)}, Duration: ${note.duration.toFixed(2)}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MidiGrid;
