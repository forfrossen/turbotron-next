import { subscribeToMidiData } from "@repo/web/store/MidiStore";
import { Midi } from "@tonejs/midi";
import React, { useEffect, useState } from "react";

const MidiGrid: React.FC = () => {
  const [midiData, setMidiData] = useState<Midi | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMidiData(setMidiData);
    return () => unsubscribe();
  }, []);

  if (!midiData) {
    return <p>No MIDI data loaded.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-2 p-4 border rounded">
      {midiData.tracks.map((track, trackIndex) => (
        <div key={trackIndex} className="border p-2">
          <h3 className="font-bold">Track {trackIndex + 1}</h3>
          {track.notes.map((note, noteIndex) => (
            <div key={noteIndex} className="text-sm">
              {`Note: ${note.name}, Time: ${note.time.toFixed(2)}, Duration: ${note.duration.toFixed(2)}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MidiGrid;
