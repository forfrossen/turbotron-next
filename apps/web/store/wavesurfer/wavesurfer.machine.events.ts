"use client";
import WaveSurfer from "wavesurfer.js";

export const InternalEvents = {
  LOAD: "LOAD",
  LOADING: "LOADING",
  DECODE: "DECODE",
  READY: "READY",
  REDRAW: "REDRAW",
  REDRAW_COMPLETE: "REDRAW_COMPLETE",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  FINISH: "FINISH",
  TIMEUPDATE: "TIMEUPDATE",
  SEEKING: "SEEKING",
  INTERACTION: "INTERACTION",
  CLICK: "CLICK",
  DRAG: "DRAG",
  SCROLL: "SCROLL",
  ZOOM: "ZOOM",
  DESTROY: "DESTROY",
  ERROR: "ERROR"
} as const;

export const SystemEvents = {
  ASSIGN_INSTANCE: "ASSIGN_INSTANCE"
} as const;

export const UserEvent = {
  INIT: "INIT",
  LOAD: "LOAD",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  SEEK: "SEEK",
  ZOOM: "ZOOM",
  DESTROY: "DESTROY",
  SET_VOLUME: "SET_VOLUME",
  SET_PLAYBACK_RATE: "SET_PLAYBACK_RATE",
  SET_TRACK_HEIGHT: "SET_TRACK_HEIGHT",
  SET_CONTAINER: "SET_CONTAINER",
  SET_URL: "SET_URL"
} as const;

// Define event payload types for each event
export interface WaveSurferEventPayloads {
  [InternalEvents.LOAD]: {url: string};
  [InternalEvents.LOADING]: {progress: number};
  [InternalEvents.DECODE]: {duration: number};
  [InternalEvents.READY]: {duration: number};
  [InternalEvents.REDRAW]: {};
  [InternalEvents.REDRAW_COMPLETE]: {};
  [InternalEvents.PLAY]: {};
  [InternalEvents.PAUSE]: {};
  [InternalEvents.FINISH]: {};
  [InternalEvents.TIMEUPDATE]: {currentTime: number};
  [InternalEvents.SEEKING]: {currentTime: number};
  [InternalEvents.INTERACTION]: {newTime: number};
  [InternalEvents.CLICK]: {relativeX: number};
  [InternalEvents.DRAG]: {relativeX: number};
  [InternalEvents.SCROLL]: {visibleStartTime: number; visibleEndTime: number};
  [InternalEvents.ZOOM]: {minPxPerSec: number};
  [InternalEvents.DESTROY]: {};
  [InternalEvents.ERROR]: {error: string};

  [UserEvent.INIT]: {container: HTMLElement | string; url: string};
  [UserEvent.LOAD]: {url: string};
  [UserEvent.PLAY]: {};
  [UserEvent.PAUSE]: {};
  [UserEvent.SEEK]: {time: number};
  [UserEvent.ZOOM]: {minPxPerSec: number};
  [UserEvent.DESTROY]: {};
  [UserEvent.SET_VOLUME]: {volume: number};
  [UserEvent.SET_PLAYBACK_RATE]: {rate: number};
  [UserEvent.SET_TRACK_HEIGHT]: {height: number};
  [UserEvent.SET_CONTAINER]: {container: HTMLElement | string};
  [UserEvent.SET_URL]: {url: string};

  [SystemEvents.ASSIGN_INSTANCE]: {waveSurfer: WaveSurfer};
}

export type WsEvent = {
  [K in keyof WaveSurferEventPayloads]: {type: K} & WaveSurferEventPayloads[K];
}[keyof WaveSurferEventPayloads];

export type GenericWaveSurferEvent<K extends keyof WaveSurferEventPayloads> = (
  type: K,
  payload: WaveSurferEventPayloads[K]
) => WsEvent;

// Convert Map to regular object for easier use with xstate
export const waveSurferMachineEvents = {
  // Internal events
  load: (url: string): WsEvent => ({type: InternalEvents.LOAD, url}),
  loading: (progress: number): WsEvent => ({type: InternalEvents.LOADING, progress}),
  decode: (duration: number): WsEvent => ({type: InternalEvents.DECODE, duration}),
  ready: (duration: number): WsEvent => ({type: InternalEvents.READY, duration}),
  redraw: (): WsEvent => ({type: InternalEvents.REDRAW}),
  redrawComplete: (): WsEvent => ({type: InternalEvents.REDRAW_COMPLETE}),
  play: (): WsEvent => ({type: InternalEvents.PLAY}),
  pause: (): WsEvent => ({type: InternalEvents.PAUSE}),
  finish: (): WsEvent => ({type: InternalEvents.FINISH}),
  timeUpdate: (currentTime: number): WsEvent => ({type: InternalEvents.TIMEUPDATE, currentTime}),
  seeking: (currentTime: number): WsEvent => ({type: InternalEvents.SEEKING, currentTime}),
  interaction: (newTime: number): WsEvent => ({type: InternalEvents.INTERACTION, newTime}),
  click: (relativeX: number): WsEvent => ({type: InternalEvents.CLICK, relativeX}),
  drag: (relativeX: number): WsEvent => ({type: InternalEvents.DRAG, relativeX}),
  scroll: (visibleStartTime: number, visibleEndTime: number): WsEvent => ({
    type: InternalEvents.SCROLL,
    visibleStartTime,
    visibleEndTime
  }),
  zoom: (minPxPerSec: number): WsEvent => ({type: InternalEvents.ZOOM, minPxPerSec}),
  destroy: (): WsEvent => ({type: InternalEvents.DESTROY}),
  error: (error: string): WsEvent => ({type: InternalEvents.ERROR, error})
};

export const systemEvents = {
  assignInstance: (waveSurfer: WaveSurfer): WsEvent => ({type: SystemEvents.ASSIGN_INSTANCE, waveSurfer})
} as const;

// User-initiated events
export const waveSurferUserEvents = {
  init: (container: HTMLElement | string, url: string): WsEvent => ({
    type: UserEvent.INIT,
    container,
    url
  }),

  load: (url: string): WsEvent => ({
    type: UserEvent.LOAD,
    url
  }),

  play: (): WsEvent => ({
    type: UserEvent.PLAY
  }),

  pause: (): WsEvent => ({
    type: UserEvent.PAUSE
  }),

  seek: (time: number): WsEvent => ({
    type: UserEvent.SEEK,
    time
  }),

  zoom: (minPxPerSec: number): WsEvent => ({
    type: UserEvent.ZOOM,
    minPxPerSec
  }),

  destroy: (): WsEvent => ({
    type: UserEvent.DESTROY
  }),

  setVolume: (volume: number): WsEvent => ({
    type: UserEvent.SET_VOLUME,
    volume
  }),

  setPlaybackRate: (rate: number): WsEvent => ({
    type: UserEvent.SET_PLAYBACK_RATE,
    rate
  }),

  setTrackHeight: (height: number): WsEvent => ({
    type: UserEvent.SET_TRACK_HEIGHT,
    height
  }),

  setContainer: (container: HTMLElement | string): WsEvent => ({
    type: UserEvent.SET_CONTAINER,
    container
  }),

  setUrl: (url: string): WsEvent => ({
    type: UserEvent.SET_URL,
    url
  })
};
