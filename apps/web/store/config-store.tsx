import { bind } from "@react-rxjs/core";
import { BehaviorSubject } from "rxjs";

export const trackHeight$ = new BehaviorSubject<string>("30rem");
export const trackHeightBinder = bind(trackHeight$, "");
export const useTrackHeight = trackHeightBinder[0];
export const setTrackHeight = (height: string): void => trackHeight$.next(height);

export const loadedSong$ = new BehaviorSubject<string>("Under_The_Weeping_Willow");
export const loadedSongBinder = bind(loadedSong$, "");
export const useLoadedSong = loadedSongBinder[0];
export const setLoadedSong = (song: string): void => loadedSong$.next(song);

export const isPlaying$ = new BehaviorSubject<boolean>(false);
export const isPlayingBinder = bind(isPlaying$, false);
export const useIsPlaying = isPlayingBinder[0];
export const setIsPlaying = (isPlaying: boolean): void => isPlaying$.next(isPlaying);
