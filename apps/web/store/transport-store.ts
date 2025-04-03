import { bind } from "@react-rxjs/core";
import { BehaviorSubject } from "rxjs";

export const isReady$ = new BehaviorSubject<boolean>(false);
export const isReady = bind(isReady$);
export const useIsReady = isReady[0];
export const setIsReady = isReady[1];

export const isPlaying$ = new BehaviorSubject<boolean>(false);
export const isPlaying = bind(isPlaying$);
export const useIsPlaying = isPlaying[0];

export const wavesurfer$ = new BehaviorSubject<any>(null);
export const wavesurfer = bind(wavesurfer$);
export const useWavesurfer = wavesurfer[0];
export const setWavesurfer = wavesurfer[1];

export const currentTime$ = new BehaviorSubject<number>(0);
export const currentTime = bind(currentTime$);
export const useCurrentTime = currentTime[0];
export const setCurrentTime = currentTime[1];

export const duration$ = new BehaviorSubject<number>(0);
export const duration = bind(duration$);
export const useDuration = duration[0];
export const setDuration = duration[1];
