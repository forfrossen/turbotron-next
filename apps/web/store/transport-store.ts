import { bind } from "@react-rxjs/core";
import { BehaviorSubject } from "rxjs";

export const eventSubject$ = new BehaviorSubject<string>("");
export const eventSubject = bind(eventSubject$);
export const useEventSubject = eventSubject[0];
export const setEventSubject = eventSubject[1];

export const isReadySubject$ = new BehaviorSubject<boolean>(false);
export const isReadySubject = bind(isReadySubject$);
export const useIsReadySubject = isReadySubject[0];
export const setIsReadySubject = isReadySubject[1];

export const isPlayingSubject$ = new BehaviorSubject<boolean>(false);
export const isPlayingSubject = bind(isPlayingSubject$);
export const useIsPlayingSubject = isPlayingSubject[0];

export const wavesurferSubject$ = new BehaviorSubject<any>(null);
export const wavesurferSubject = bind(wavesurferSubject$);
export const useWavesurferSubject = wavesurferSubject[0];
export const setWavesurferSubject = wavesurferSubject[1];

export const currentTimeSubject$ = new BehaviorSubject<number>(0);
export const currentTimeSubject = bind(currentTimeSubject$);
export const useCurrentTimeSubject = currentTimeSubject[0];
export const setCurrentTimeSubject = currentTimeSubject[1];

export const durationSubject$ = new BehaviorSubject<number>(0);
export const durationSubject = bind(durationSubject$);
export const useDurationSubject = durationSubject[0];
export const setDurationSubject = durationSubject[1];
