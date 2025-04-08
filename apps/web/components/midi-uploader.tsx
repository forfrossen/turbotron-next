import { setMidiData } from "#store/midi-store";
import { Midi } from "@tonejs/midi";
import React, { useState } from "react";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

const MidiUploader: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<string[]>(["Under_The_Weeping_Willow.mid"]);
  const getTracks = () =>
    fetch("/tracks")
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((err) => setError("Failed to load tracks."));

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

  const handleTrackSelect = (track: string) => {
    if (!track) return;
    fetch(`/tracks/${track}`)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        try {
          const midi = new Midi(arrayBuffer);
          setMidiData(midi);
        } catch {
          setError("Failed to parse selected track.");
        }
      })
      .catch(() => setError("Failed to load selected track."));
  };

  return (
    <div>
      <div className="p-4 border rounded"></div>
      <input type="file" accept=".mid" onChange={handleFileUpload} />
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <h3>Select a track:</h3>
        <ul>
          {tracks.map((track) => (
            <li key={track}>
              <button className="text-blue-500 underline" onClick={() => handleTrackSelect(track)}>
                {track}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MidiUploader;
