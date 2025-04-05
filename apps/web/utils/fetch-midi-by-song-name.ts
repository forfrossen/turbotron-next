import { Midi } from "@tonejs/midi";
import { map, Observable, of, pipe, switchMap, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export const handleError = (error: unknown): Observable<null> => {
  console.error("Failed to load MIDI track:", error);
  return of(null);
};

export const parseMidiFromBuffer = switchMap((arrayBuffer: ArrayBuffer): Observable<Midi> => {
  const midi = new Midi(arrayBuffer);
  return of(midi);
});

export const toArrayBuffer = switchMap((response: Response) => {
  if (!response.ok) {
    return throwError(() => new Error(`Error ${response.status}`));
  }
  return response.arrayBuffer();
});

export const stringToMidiUrl = map((songName: string) => `/tracks/${songName}.mid`);
export const stringToSongUrl = map((songName: string) => `/tracks/${songName}.mp3`);

export const fetchFromUrl = switchMap(pipe(fromFetch));
