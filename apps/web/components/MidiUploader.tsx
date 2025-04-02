import { setMidiData } from "@repo/web/store/MidiStore";
import { Midi } from "@tonejs/midi";
import React, { useState } from "react";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

const MidiUploader: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    from(file.arrayBuffer())
      .pipe(
        switchMap((arrayBuffer) => {
          try {
            const midi = new Midi(arrayBuffer);
            return of(midi);
          } catch {
            throw new Error("Failed to parse MIDI file.");
          }
        }),
        catchError((err) => {
          setError(err.message);
          return of(null);
        })
      )
      .subscribe((midi) => {
        if (midi) setMidiData(midi);
      });
  };

  return (
    <div>
      <div className="p-4 border rounded"></div>
      <input type="file" accept=".mid" onChange={handleFileUpload} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MidiUploader;
