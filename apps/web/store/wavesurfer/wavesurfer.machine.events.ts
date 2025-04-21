// Transport events creator functions

import WaveSurfer from "wavesurfer.js";

// Event type constants
export const InternalEvents = {
	LOAD: 'LOAD',
	LOADING: 'LOADING',
	DECODE: 'DECODE',
	READY: 'READY',
	REDRAW: 'REDRAW',
	REDRAWCOMPLETE: 'REDRAWCOMPLETE',
	PLAY: 'PLAY',
	PAUSE: 'PAUSE',
	STOP: 'STOP',
	FINISH: 'FINISH',
	TIMEUPDATE: 'TIMEUPDATE',
	SEEKING: 'SEEKING',
	INTERACTION: 'INTERACTION',
	CLICK: 'CLICK',
	DRAG: 'DRAG',
	SCROLL: 'SCROLL',
	ZOOM: 'ZOOM',
	DESTROY: 'DESTROY',
	ERROR: 'ERROR',
	ASSIGN_INSTANCE: 'ASSIGN_INSTANCE',
} as const;

export const UserEvent = {
	INIT: 'INIT',
	LOAD: 'LOAD',
	PLAY: 'PLAY',
	PAUSE: 'PAUSE',
	SEEK: 'SEEK',
	ZOOM: 'ZOOM',
	DESTROY: 'DESTROY',
	SET_VOLUME: 'SET_VOLUME',
	SET_PLAYBACK_RATE: 'SET_PLAYBACK_RATE',
} as const;

// Define event payload types for each event
export interface WaveSurferEventPayloads {
	[ InternalEvents.LOAD ]: {url: string};
	[ InternalEvents.LOADING ]: {progress: number};
	[ InternalEvents.DECODE ]: {duration: number};
	[ InternalEvents.READY ]: {duration: number};
	[ InternalEvents.REDRAW ]: {};
	[ InternalEvents.REDRAWCOMPLETE ]: {};
	[ InternalEvents.PLAY ]: {};
	[ InternalEvents.PAUSE ]: {};
	[ InternalEvents.STOP ]: {};
	[ InternalEvents.FINISH ]: {};
	[ InternalEvents.TIMEUPDATE ]: {currentTime: number};
	[ InternalEvents.SEEKING ]: {currentTime: number};
	[ InternalEvents.INTERACTION ]: {newTime: number};
	[ InternalEvents.CLICK ]: {relativeX: number};
	[ InternalEvents.DRAG ]: {relativeX: number};
	[ InternalEvents.SCROLL ]: {visibleStartTime: number; visibleEndTime: number};
	[ InternalEvents.ZOOM ]: {minPxPerSec: number};
	[ InternalEvents.DESTROY ]: {};
	[ InternalEvents.ERROR ]: {error: string};
	[ InternalEvents.ASSIGN_INSTANCE ]: {waveSurfer: WaveSurfer};
	[ UserEvent.INIT ]: {container: HTMLElement | string; url: string};
	[ UserEvent.LOAD ]: {url: string};
	[ UserEvent.PLAY ]: {};
	[ UserEvent.PAUSE ]: {};
	[ UserEvent.SEEK ]: {time: number};
	[ UserEvent.ZOOM ]: {minPxPerSec: number};
	[ UserEvent.DESTROY ]: {};
	[ UserEvent.SET_VOLUME ]: {volume: number};
	[ UserEvent.SET_PLAYBACK_RATE ]: {rate: number};
}

export type WaveSurferEvent = {
	[ K in keyof WaveSurferEventPayloads ]: {type: K} & WaveSurferEventPayloads[ K ]
}[ keyof WaveSurferEventPayloads ];

export type GenericWaveSurferEvent<K extends keyof WaveSurferEventPayloads> = (
	type: K, payload: WaveSurferEventPayloads[ K ]) => WaveSurferEvent;


// Convert Map to regular object for easier use with xstate
export const WaveSurferMachineEvents = {
	// Internal events
	load: (url: string): WaveSurferEvent => ({type: InternalEvents.LOAD, url}),
	loading: (progress: number): WaveSurferEvent => ({type: InternalEvents.LOADING, progress}),
	decode: (duration: number): WaveSurferEvent => ({type: InternalEvents.DECODE, duration}),
	ready: (duration: number): WaveSurferEvent => ({type: InternalEvents.READY, duration}),
	redraw: (): WaveSurferEvent => ({type: InternalEvents.REDRAW}),
	redrawComplete: (): WaveSurferEvent => ({type: InternalEvents.REDRAWCOMPLETE}),
	play: (): WaveSurferEvent => ({type: InternalEvents.PLAY}),
	pause: (): WaveSurferEvent => ({type: InternalEvents.PAUSE}),
	stop: (): WaveSurferEvent => ({type: InternalEvents.STOP}),
	finish: (): WaveSurferEvent => ({type: InternalEvents.FINISH}),
	timeUpdate: (currentTime: number): WaveSurferEvent => ({type: InternalEvents.TIMEUPDATE, currentTime}),
	seeking: (currentTime: number): WaveSurferEvent => ({type: InternalEvents.SEEKING, currentTime}),
	interaction: (newTime: number): WaveSurferEvent => ({type: InternalEvents.INTERACTION, newTime}),
	click: (relativeX: number): WaveSurferEvent => ({type: InternalEvents.CLICK, relativeX}),
	drag: (relativeX: number): WaveSurferEvent => ({type: InternalEvents.DRAG, relativeX}),
	scroll: (visibleStartTime: number, visibleEndTime: number): WaveSurferEvent =>
		({type: InternalEvents.SCROLL, visibleStartTime, visibleEndTime}),
	zoom: (minPxPerSec: number): WaveSurferEvent => ({type: InternalEvents.ZOOM, minPxPerSec}),
	destroy: (): WaveSurferEvent => ({type: InternalEvents.DESTROY}),
	error: (error: string): WaveSurferEvent => ({type: InternalEvents.ERROR, error}),
	assignInstance: (waveSurfer: WaveSurfer): WaveSurferEvent =>
		({type: InternalEvents.ASSIGN_INSTANCE, waveSurfer}),
};

// User-initiated events
export const WaveSurferUserEvents = {
	init: (container: HTMLElement | string, url: string): WaveSurferEvent => ({
		type: UserEvent.INIT, container, url
	}),

	load: (url: string): WaveSurferEvent => ({
		type: UserEvent.LOAD, url
	}),

	play: (): WaveSurferEvent => ({
		type: UserEvent.PLAY
	}),

	pause: (): WaveSurferEvent => ({
		type: UserEvent.PAUSE
	}),

	seek: (time: number): WaveSurferEvent => ({
		type: UserEvent.SEEK, time
	}),

	zoom: (minPxPerSec: number): WaveSurferEvent => ({
		type: UserEvent.ZOOM, minPxPerSec
	}),

	destroy: (): WaveSurferEvent => ({
		type: UserEvent.DESTROY
	}),

	setVolume: (volume: number): WaveSurferEvent => ({
		type: UserEvent.SET_VOLUME, volume
	}),

	setPlaybackRate: (rate: number): WaveSurferEvent => ({
		type: UserEvent.SET_PLAYBACK_RATE, rate
	}),
};

