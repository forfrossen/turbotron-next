import {atomWithMachine} from 'jotai-xstate';
import {isNil} from 'lodash';
import WaveSurfer, {WaveSurferEvents} from 'wavesurfer.js';
import {assign, fromCallback, setup, type EventObject} from 'xstate';
import {
	InternalEvents,
	UserEvent,
	WaveSurferEvent,
	WaveSurferMachineEvents
} from './wavesurfer.machine.events';

export interface WaveSurferMachineContext {
	error?: string;
	waveSurfer?: WaveSurfer | null;
	duration?: number;
	currentTime?: number;
	container?: string | HTMLElement;
	url?: string;
	loadingProgress?: number;
	wsEventListenerRef?: any;
}

const debugWsEventHandler = (event: string, ...args: any[]) => {
	console.debug(`[WaveSurfer Event] ${ event }`, ...args);
}

export const initializeWaveSurfer = fromCallback<EventObject, {context: WaveSurferMachineContext}>(
	({sendBack, receive, input}) => {
		console.log(`[initializeWaveSurfer] input:`, input);

		const ctx = input.context as WaveSurferMachineContext;
		if (!ctx) {
			sendBack(WaveSurferMachineEvents.error("[initializeWaveSurfer] Context is not defined"));
			return;
		}

		try {
			if (ctx.container === undefined) {
				throw new Error('[initializeWaveSurfer] Container is not defined');
			}
			if (ctx.url === undefined) {
				throw new Error('[initializeWaveSurfer] URL is not defined');
			}
			if (ctx.container === null) {
				throw new Error('[initializeWaveSurfer] Container is null');
			}

			const wavesurfer = WaveSurfer.create({
				container: ctx.container!,
				url: ctx.url,
			});

			if (!wavesurfer) {
				sendBack(WaveSurferMachineEvents.error("[initializeWaveSurfer] WaveSurfer instance is not created"));
				return;
			}

			sendBack(WaveSurferMachineEvents.assignInstance(wavesurfer));


			const handleError = (error: Error) => {
				debugWsEventHandler("error", error);
				sendBack(WaveSurferMachineEvents.error(error.message || "An unknown error occurred"));
			};

			const handleLoad = (url: string) => {
				debugWsEventHandler("load", url);
				sendBack(WaveSurferMachineEvents.load(url));
			};

			const handleLoading = (progress: number) => {
				debugWsEventHandler("loading", progress);
				sendBack(WaveSurferMachineEvents.loading(progress));
			};

			const handleDecode = (duration: number) => {
				debugWsEventHandler("decode", duration);
				sendBack(WaveSurferMachineEvents.decode(duration));
			};

			const handleReady = (duration: number) => {
				debugWsEventHandler("ready", duration);
				sendBack(WaveSurferMachineEvents.ready(duration));
			};

			const handleRedraw = () => {
				debugWsEventHandler("redraw");
				sendBack(WaveSurferMachineEvents.redraw());
			};

			const handleRedrawComplete = () => {
				debugWsEventHandler("redrawcomplete");
				sendBack(WaveSurferMachineEvents.redrawComplete());
			};

			const handlePlay = () => {
				debugWsEventHandler("play");
				sendBack(WaveSurferMachineEvents.play());
			};

			const handlePause = () => {
				debugWsEventHandler("pause");
				sendBack(WaveSurferMachineEvents.pause());
			};

			const handleStop = () => {
				debugWsEventHandler("stop");
				sendBack(WaveSurferMachineEvents.stop());
			};

			const handleFinish = () => {
				debugWsEventHandler("finish");
				sendBack(WaveSurferMachineEvents.finish());
			};

			const handleTimeUpdate = (currentTime: number) => {
				debugWsEventHandler("timeupdate", currentTime);
				sendBack(WaveSurferMachineEvents.timeUpdate(currentTime));
			};

			const handleSeeking = (currentTime: number) => {
				debugWsEventHandler("seeking", currentTime);
				sendBack(WaveSurferMachineEvents.seeking(currentTime));
			};

			const handleInteraction = (newTime: number) => {
				debugWsEventHandler("interaction", newTime);
				sendBack(WaveSurferMachineEvents.interaction(newTime));
			};

			const handleClick = (relativeX: number) => {
				debugWsEventHandler("click", relativeX);
				sendBack(WaveSurferMachineEvents.click(relativeX));
			};

			const handleDrag = (relativeX: number) => {
				debugWsEventHandler("drag", relativeX);
				sendBack(WaveSurferMachineEvents.drag(relativeX));
			};

			const handleScroll = (visibleStartTime: number, visibleEndTime: number) => {
				debugWsEventHandler("scroll", visibleStartTime, visibleEndTime);
				sendBack(WaveSurferMachineEvents.scroll(visibleStartTime, visibleEndTime));
			};

			const handleZoom = (minPxPerSec: number) => {
				debugWsEventHandler("zoom", minPxPerSec);
				sendBack(WaveSurferMachineEvents.zoom(minPxPerSec));
			};

			const handleDestroy = () => {
				debugWsEventHandler("destroy");
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

const debugAction = (action: string) => ({context, event}: {context: WaveSurferMachineContext, event?: EventObject}) => {
	if (!isNil(event)) {
		console.debug(`[${ action }] event:`, event);
	}
	if (!isNil(context)) {
		console.debug(`[${ action }] context:`, context);
	}
}

export const createWaveSurferMachine = () => setup({
	types: {
		context: {} as WaveSurferMachineContext,
		events: {} as WaveSurferEvent
	},
	actions: {
		assignError: assign(({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
			const debugLog = debugAction('assignError');
			debugLog({context, event});
			if (event.type === InternalEvents.ERROR) {
				return {error: event.error};
			}
			return {};
		}),

		clearError: assign({
			error: undefined,
		}),

		assignLoadingProgress: assign(({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
			const debugLog = debugAction('assignLoadingProgress');
			debugLog({context, event});
			if (event.type === InternalEvents.LOADING) {
				return {loadingProgress: event.progress};
			}
			return {};
		}),

		play: ({context}: {context: WaveSurferMachineContext}) => {
			const debugLog = debugAction('play');
			debugLog({context});
			if (context.waveSurfer) {
				console.debug("[INFO] Playing audio");
				context.waveSurfer.play();
			} else {
				console.debug("[ERROR] WaveSurfer instance is not defined");
			}
		},

		pause: ({context}: {context: WaveSurferMachineContext}) => {
			const debugLog = debugAction('pause');
			debugLog({context});
			if (context.waveSurfer) {
				console.debug("[INFO] Pausing audio");
				context.waveSurfer.pause();
			} else {
				console.debug("[ERROR] WaveSurfer instance is not defined");
			}

		},

		seekTo: ({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
			const debugLog = debugAction('seekTo');
			debugLog({context, event});
			if (context.waveSurfer && event.type === UserEvent.SEEK) {
				context.waveSurfer.seekTo(event.time);
			}
		},

		setVolume: ({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
			const debugLog = debugAction('setVolume');
			debugLog({context, event});
			if (context.waveSurfer && event.type === UserEvent.SET_VOLUME) {
				context.waveSurfer.setVolume(event.volume);
			}
		},

		setPlaybackRate: ({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
			const debugLog = debugAction('setPlaybackRate');
			debugLog({context, event});
			if (context.waveSurfer && event.type === UserEvent.SET_PLAYBACK_RATE) {
				context.waveSurfer.setPlaybackRate(event.rate);
			}
		},

		destroyWaveSurfer: ({context}: {context: WaveSurferMachineContext}) => {
			const debugLog = debugAction('destroyWaveSurfer');
			debugLog({context});
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
		playing: {
			entry: [
				{type: 'play', params: {context: (context: WaveSurferMachineContext) => context}}
			]
		},
		paused: {
			entry: [
				{type: 'pause', params: {context: (context: WaveSurferMachineContext) => context}}
			]
		},
		error: {},

		init: {
			entry: [
				assign({
					wsEventListenerRef: ({spawn, context}) => spawn(initializeWaveSurfer, {
						input: {context},
					}),
				})
			],
			// spawnChild(initializeWaveSurfer, {id: 'initializeWaveSurfer'}),
			// 	{input: (context: WaveSurferMachineContext) => context,
			// params: {context: (context: WaveSurferMachineContext) => context}})

			// {
			// 	src: initializeWaveSurfer,
			// 	input: (context: WaveSurferMachineContext) => (context),
			// },
		},
	},

	on: {
		[ UserEvent.INIT ]: {
			actions: assign(({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
				console.log(`[UserEvent.INIT] event:`, event);
				console.log(`[UserEvent.INIT] context:`, context);
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
					url: event.url,
				};
			}),
			target: '.init',
		},

		[ InternalEvents.ASSIGN_INSTANCE ]: {
			actions: assign(({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
				if (event.type === InternalEvents.ASSIGN_INSTANCE) {
					return {
						waveSurfer: event.waveSurfer
					};
				}
				return {};
			}),
		},

		[ UserEvent.LOAD ]: {
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
			target: '.playing',
		},

		[ UserEvent.PAUSE ]: {
			target: '.paused',
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
			target: '.idle',
			actions: 'destroyWaveSurfer'
		},

		[ InternalEvents.ERROR ]: {
			target: '.error',
			actions: 'assignError'
		},

		[ InternalEvents.LOADING ]: {
			actions: 'assignLoadingProgress'
		},

		[ InternalEvents.READY ]: {
			target: '.ready'
		},

		[ InternalEvents.FINISH ]: {
			target: '.paused'
		},

		[ InternalEvents.STOP ]: {
			target: '.paused'
		},

		[ InternalEvents.TIMEUPDATE ]: {
			actions: assign(({context, event}: {context: WaveSurferMachineContext, event: WaveSurferEvent}) => {
				if (event.type === InternalEvents.TIMEUPDATE) {
					return {currentTime: event.currentTime};
				}
				return {};
			})
		},

	}
});


export const waveSurferMachineAtom = atomWithMachine((get) => {
	return createWaveSurferMachine();
});