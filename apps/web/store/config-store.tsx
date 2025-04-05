import { bind } from "@react-rxjs/core";
import { BehaviorSubject, catchError } from "rxjs";
import {
  fetchFromUrl,
  handleError,
  parseMidiFromBuffer,
  stringToMidiUrl,
  stringToSongUrl,
  toArrayBuffer
} from "utils/fetch-midi-by-song-name.js";

export const trackHeight$ = new BehaviorSubject<string>("30rem");
export const trackHeightBinder = bind(trackHeight$);
export const useTrackHeight = trackHeightBinder[0];
export const setTrackHeight = (height: string): void => trackHeight$.next(height);

export const loadedSong$ = new BehaviorSubject<string>("Under_The_Weeping_Willow");
export const loadedSongBinder = bind(loadedSong$);
export const useLoadedSong = loadedSongBinder[0];
export const setLoadedSong = (song: string): void => loadedSong$.next(song);

export const loadedSongUrl$ = loadedSong$.pipe(stringToSongUrl);
export const loadedSongUrlBinder = bind(loadedSongUrl$);
export const useLoadedSongUrl = loadedSongUrlBinder[0];

export const isPlaying$ = new BehaviorSubject<boolean>(false);
export const isPlayingBinder = bind(isPlaying$, false);
export const useIsPlaying = isPlayingBinder[0];
export const setIsPlaying = (isPlaying: boolean): void => isPlaying$.next(isPlaying);

export const loadedMidi$ = loadedSong$.pipe(
  stringToMidiUrl,
  fetchFromUrl,
  toArrayBuffer,
  parseMidiFromBuffer,
  catchError(handleError)
);
export const midiDataBinder = bind(loadedMidi$, null);
export const useMidiData = midiDataBinder[0];

//
//             .then((arrayBuffer) => {
//               const midi = new Midi(arrayBuffer);
//               midiData$.next(midi);
//             })
//             .catch((error) => {
//               console.error("Failed to load MIDI track:", error);
//             })
