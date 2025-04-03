import { Midi } from "@tonejs/midi";
import { map, of, pipe, switchMap, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export const handleError = (error: unknown) => {
  console.error("Failed to load MIDI track:", error);
  return of(null);
};

export const parseMidiFromBuffer = switchMap((arrayBuffer: ArrayBuffer) => {
  const midi = new Midi(arrayBuffer);
  return of(midi);
});

export const getBufferFromRes = switchMap((response: Response) => {
  if (!response.ok) {
    return throwError(() => new Error(`Error ${response.status}`));
  }
  return response.arrayBuffer();
});

export const getMidiUrl = map((songName: string) => `/tracks/${songName}.mid`);
export const getSongUrl = map((songName: string) => `/tracks/${songName}.mp3`);

export const fetchFromUrl = pipe(fromFetch);
