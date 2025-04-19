import {atomWithMachine} from 'jotai-xstate';
import WaveSurfer, {WaveSurferEvents} from 'wavesurfer.js';
import {assign, fromCallback, setup, type EventObject} from 'xstate';
import {
	InternalEvents,
	UserEvent,
	WaveSurferEvent,
	WaveSurferMachineEvents
} from './wavesurfer.machine.events';

export interface WaveSurferContext {
	error?: string;
	waveSurfer?: WaveSurfer | null;
	container?: string | HTMLElement;
	url?: string;
	loadingProgress?: number;
}

export const initializeWaveSurfer = fromCallback<EventObject, {context: WaveSurferContext}>(
	({sendBack, receive, input}) => {

		const ctx = input.context as WaveSurferContext;
		if (!ctx) {
			sendBack(WaveSurferMachineEvents.error("Context is not defined"));
			return;
		}

		try {
			if (ctx.container === undefined) {
				throw new Error('Container is not defined');
			}
			if (ctx.url === undefined) {
				throw new Error('URL is not defined');
			}
			if (ctx.container === null) {
				throw new Error('Container is null');
			}

			const wavesurfer = WaveSurfer.create({
				container: ctx.container!,
				url: ctx.url,
			});


			const handleError = (error: Error) => {
				sendBack(WaveSurferMachineEvents.error(error.message || "An unknown error occurred"));
			};

			const handleLoad = (url: string) => {
				sendBack(WaveSurferMachineEvents.load(url));
			};

			const handleLoading = (progress: number) => {
				sendBack(WaveSurferMachineEvents.loading(progress));
			};

			const handleDecode = (duration: number) => {
				sendBack(WaveSurferMachineEvents.decode(duration));
			};

			const handleReady = (duration: number) => {
				sendBack(WaveSurferMachineEvents.ready(duration));
			};

			const handleRedraw = () => {
				sendBack(WaveSurferMachineEvents.redraw());
			};

			const handleRedrawComplete = () => {
				sendBack(WaveSurferMachineEvents.redrawComplete());
			};

			const handlePlay = () => {
				sendBack(WaveSurferMachineEvents.play());
			};

			const handlePause = () => {
				sendBack(WaveSurferMachineEvents.pause());
			};

			const handleStop = () => {
				sendBack(WaveSurferMachineEvents.stop());
			};

			const handleFinish = () => {
				sendBack(WaveSurferMachineEvents.finish());
			};

			const handleTimeUpdate = (currentTime: number) => {
				sendBack(WaveSurferMachineEvents.timeUpdate(currentTime));
			};

			const handleSeeking = (currentTime: number) => {
				sendBack(WaveSurferMachineEvents.seeking(currentTime));
			};

			const handleInteraction = (newTime: number) => {
				sendBack(WaveSurferMachineEvents.interaction(newTime));
			};

			const handleClick = (relativeX: number) => {
				sendBack(WaveSurferMachineEvents.click(relativeX));
			};

			const handleDrag = (relativeX: number) => {
				sendBack(WaveSurferMachineEvents.drag(relativeX));
			};

			const handleScroll = (visibleStartTime: number, visibleEndTime: number) => {
				sendBack(WaveSurferMachineEvents.scroll(visibleStartTime, visibleEndTime));
			};

			const handleZoom = (minPxPerSec: number) => {
				sendBack(WaveSurferMachineEvents.zoom(minPxPerSec));
			};

			const handleDestroy = () => {
				sendBack(WaveSurferMachineEvents.destroy());
			};

			const eventHandlerMap: Map<keyof WaveSurferEvents, (...args: any) => void> = new Map([
				[ "error", handleError ],
				[ "load", handleLoad ],
				[ "loading", handleLoading ],
				[ "decode", handleDecode ],
				[ "ready", handleReady ],
				[ "redraw", handleRedraw ],
				[ "redrawcomplete", handleRedrawComplete ],
				[ "play", handlePlay ],
				[ "pause", handlePause ],
				[ "stop", handleStop ],
				[ "finish", handleFinish ],
				[ "timeupdate", handleTimeUpdate ],
				[ "seeking", handleSeeking ],
				[ "interaction", handleInteraction ],
				[ "click", handleClick ],
				[ "drag", handleDrag ],
				[ "scroll", handleScroll ],
				[ "zoom", handleZoom ],
				[ "destroy", handleDestroy ]
			] as [ keyof WaveSurferEvents, (...args: any) => void ][]);

			eventHandlerMap.forEach((handler, event) => {
				wavesurfer.on(event, handler);
			});

			wavesurfer.on('destroy', () => {
				eventHandlerMap.forEach((_, event) => {
					wavesurfer.un(event, eventHandlerMap.get(event)!);
				});
			});


			return () => {
				eventHandlerMap.forEach((_, event) => {
					wavesurfer.un(event, eventHandlerMap.get(event)!);
				});
			};

		} catch (err) {
			sendBack(WaveSurferMachineEvents.error(String(err)));
			return () => {};
		}

	}
);


export const createWaveSurferMachine = () => setup({
	types: {
		context: {} as WaveSurferContext,
		events: {} as WaveSurferEvent
	},
	actions: {

		assignError: assign(({context, event}: {context: WaveSurferContext, event: WaveSurferEvent}) => {
			if (event.type === InternalEvents.ERROR) {
				return {error: event.error};
			}
			return {};
		}),

		clearError: assign({
			error: undefined,
		}),

		assignLoadingProgress: assign(({context, event}: {context: WaveSurferContext, event: WaveSurferEvent}) => {
			if (event.type === InternalEvents.LOADING) {
				return {loadingProgress: event.progress};
			}
			return {};
		}),

		play: ({context}: {context: WaveSurferContext}) => {
			// Handle play action here
			if (context.waveSurfer) {
				context.waveSurfer.play();
			}
			console.log('Playing...');
		},

		pause: ({context}: {context: WaveSurferContext}) => {
			// Handle pause action here
			if (context.waveSurfer) {
				context.waveSurfer.pause();
			}
			console.log('Paused...');
		},

		seekTo: ({context, event}: {context: WaveSurferContext, event: WaveSurferEvent}) => {
			if (context.waveSurfer && event.type === UserEvent.SEEK) {
				context.waveSurfer.seekTo(event.time);
			}
		},

		setVolume: ({context, event}: {context: WaveSurferContext, event: WaveSurferEvent}) => {
			if (context.waveSurfer && event.type === UserEvent.SET_VOLUME) {
				context.waveSurfer.setVolume(event.volume);
			}
		},

		setPlaybackRate: ({context, event}: {context: WaveSurferContext, event: WaveSurferEvent}) => {
			if (context.waveSurfer && event.type === UserEvent.SET_PLAYBACK_RATE) {
				context.waveSurfer.setPlaybackRate(event.rate);
			}
		},

		destroyWaveSurfer: ({context}: {context: WaveSurferContext}) => {
			if (context.waveSurfer) {
				context.waveSurfer.destroy();
			}
		}
	},
	actors: {
		initializeWaveSurfer
	}
}).createMachine({
	id: 'waveSurfer',
	initial: 'idle',
	context: {
		error: undefined,
		loadingProgress: undefined,
		waveSurfer: null,
		container: "",
		url: undefined,
	},

	states: {
		idle: {},
		loading: {},
		ready: {},
		playing: {},
		paused: {},
		error: {},

		init: {
			invoke: {
				src: initializeWaveSurfer,
			},
		},
	},

	on: {
		[ UserEvent.INIT ]: {
			target: 'init',
			actions: assign(({context, event}: {context: WaveSurferContext, event: WaveSurferEvent}) => {
				if (event.type !== UserEvent.INIT) {
					return {};
				}
				if (!event.container) {
					throw new Error('Container is not defined');
				}
				if (!event.url) {
					throw new Error('URL is not defined');
				}
				return {
					container: event.container,
					url: event.url
				};

			})
		},

		[ UserEvent.LOAD ]: {
			target: 'loading',
			actions: assign(({event}: {event: WaveSurferEvent}) => {
				if (event.type === UserEvent.LOAD) {
					return {
						url: event.url
					};
				}
				return {};
			})
		},

		[ UserEvent.PLAY ]: {
			target: 'playing',
			actions: 'play'
		},

		[ UserEvent.PAUSE ]: {
			target: 'paused',
			actions: 'pause'
		},

		[ UserEvent.SEEK ]: {
			actions: 'seekTo'
		},

		[ UserEvent.SET_VOLUME ]: {
			actions: 'setVolume'
		},

		[ UserEvent.SET_PLAYBACK_RATE ]: {
			actions: 'setPlaybackRate'
		},

		[ UserEvent.DESTROY ]: {
			target: 'idle',
			actions: 'destroyWaveSurfer'
		},

		[ InternalEvents.ERROR ]: {
			target: 'error',
			actions: 'assignError'
		},

		[ InternalEvents.LOADING ]: {
			actions: 'assignLoadingProgress'
		},

		[ InternalEvents.READY ]: {
			target: 'ready'
		},

		[ InternalEvents.FINISH ]: {
			target: 'paused'
		},

		[ InternalEvents.STOP ]: {
			target: 'paused'
		}
	}
});


export const waveSurferMachineAtom = atomWithMachine((get) => {
	return createWaveSurferMachine();
});