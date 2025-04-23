"use client";

import {trackHeight$} from "@/store/config-store";
import {
  assignContainer,
  assignError,
  assignInstance,
  assignLoadingProgress,
  assignTimeUpdate,
  assignUrl,
  destroyWaveSurfer,
  pausePlayback,
  seekTo,
  setPlaybackRate,
  setTrackHeight,
  setVolume,
  startPlayback
} from "@/store/wavesurfer/wavesurfer.actions";
import {assertExists} from "@/utils/assert";
import {parseHeight} from "@/utils/parse-height";
import {atomWithMachine} from "jotai-xstate";
import {throttle} from "lodash";
import WaveSurfer, {WaveSurferEvents} from "wavesurfer.js";
import {assign, fromCallback, setup, type EventObject} from "xstate";
import {
  InternalEvents,
  systemEvents,
  SystemEvents,
  UserEvent,
  waveSurferMachineEvents,
  waveSurferUserEvents,
  WsEvent
} from "./wavesurfer.machine.events";

export interface wsMachineContext {
  error?: string;
  waveSurfer?: WaveSurfer | null;
  duration?: number;
  currentTime?: number;
  timeUpdateRate: number;
  container?: string | HTMLElement;
  url?: string;
  loadingProgress?: number;
  wsEventListenerRef?: any;
}

const debugWsEventHandler = (event: string, ...args: any[]) => console.debug(`[WaveSurfer Event] ${event}`, ...args);

const machineEventFnFactory = (wsEvent: keyof WaveSurferEvents) =>
  waveSurferMachineEvents[wsEvent as keyof typeof waveSurferMachineEvents];

async function initWaveSurfer(context: wsMachineContext, sendBack: (event: EventObject) => void) {
  try {
    const {default: WaveSurfer} = await import("wavesurfer.js");
    const {options, minimap, topTimeline, bottomTimeline, zoomPlugin, regions} = await import(
      "@/store/wavesurfer/wafesurfer.options"
    );

    const ws = WaveSurfer.create({
      ...options,
      container: context.container!,
      height: parseHeight(trackHeight$.getValue()),
      url: context.url!,
      plugins: [minimap, topTimeline, bottomTimeline, zoomPlugin, regions]
    });

    sendBack(systemEvents.assignInstance(ws));

    return ws;
  } catch (err) {
    sendBack(waveSurferMachineEvents.error((err as Error).message));
    throw err;
  }
}

export const initializeWaveSurfer = fromCallback<EventObject, {context: wsMachineContext}>(
  ({sendBack, receive, input}) => {
    if (typeof window === "undefined") {
      return () => {};
    }
    let ws: WaveSurfer | null = null;

    const cleanup = (wavesurfer: WaveSurfer, eventHandlerMap: Map<keyof WaveSurferEvents, (...args: any) => void>) => {
      if (!wavesurfer) {
        console.debug("[ERROR] WaveSurfer instance is null");
        return;
      }
      console.debug("[INFO] Cleaning up WaveSurfer instance");
      eventHandlerMap.forEach((_, event) => {
        wavesurfer.un(event, eventHandlerMap.get(event)!);
      });

      trackHeight$.unsubscribe();
    };

    console.log(`[initializeWaveSurfer] input:`, input);
    const ctx = input.context;

    try {
      assertExists(ctx);
      assertExists(ctx.container);
      assertExists(ctx.url);
    } catch (error) {
      sendBack(waveSurferMachineEvents.error("Error initializing WaveSurfer: " + error));
      return;
    }

    const timeUpdateRate = input.context.timeUpdateRate;
    const throttleUpdate = Math.round(1000 / timeUpdateRate);

    const handleTimeUpdate = (time: number) => {
      const currentTime = Math.round(time * timeUpdateRate) / timeUpdateRate;
      debugWsEventHandler("timeupdate", currentTime);
      sendBack(waveSurferMachineEvents.timeUpdate(currentTime));
    };

    const handleError = (error: Error) => {
      debugWsEventHandler("error", error);
      sendBack(waveSurferMachineEvents.error(error.message || "An unknown error occurred"));
    };

    const handleTrackHeightChange = (value: string) => {
      const height = parseHeight(value);
      sendBack(waveSurferUserEvents.setTrackHeight(height));
    };

    const eventHandlerMap = new Map<keyof WaveSurferEvents, (...args: any) => void>([
      ["timeupdate", handleTimeUpdate],
      [
        "destroy",
        () => {
          console.debug("[INFO] WaveSurfer instance destroyed. Or not...");
        }
      ],
      ["error", handleError]
    ]);

    const genericEventHandlers = Array.from(Object.keys(waveSurferMachineEvents)).filter(
      (event) => !eventHandlerMap.has(event as keyof WaveSurferEvents)
    ) as Array<keyof WaveSurferEvents>;

    const createHandler = (wsEvent: keyof WaveSurferEvents, ...args: any[]) => {
      debugWsEventHandler(wsEvent, ...args);
      sendBack((machineEventFnFactory(wsEvent) as any)(...args));
    };

    const createDynamicHandler = (wsEvent: keyof WaveSurferEvents) =>
      eventHandlerMap.set(wsEvent, (...args: any[]) => createHandler(wsEvent, ...args));

    genericEventHandlers.forEach(createDynamicHandler);

    const setupEventHandlers = (wavesurfer: WaveSurfer) => {
      ws = wavesurfer;
      eventHandlerMap.forEach((handler, event) => {
        wavesurfer.on(event, throttle(handler, throttleUpdate));
      });

      trackHeight$.subscribe(handleTrackHeightChange);

      wavesurfer.on("destroy", cleanup.bind(null, wavesurfer, eventHandlerMap));
    };

    initWaveSurfer(input.context, sendBack)
      .then(setupEventHandlers)
      .catch((error) => {
        debugWsEventHandler("Error initializing WaveSurfer:", error);
        sendBack(waveSurferMachineEvents.error(error.message || "An unknown error occurred"));
      });

    return () => {
      // TODO: Fix this!! waveSurfer is not defined and not accessible from context
      if (ws) {
        cleanup(ws, eventHandlerMap);
      }
    };
  }
);

export const createWaveSurferMachine = () =>
  setup({
    types: {
      context: {} as wsMachineContext,
      events: {} as WsEvent
    },
    actions: {
      assignError: assign(assignError),
      clearError: assign({error: undefined}),
      assignLoadingProgress: assign(assignLoadingProgress),
      assignTimeUpdate: assign(assignTimeUpdate),
      setContainer: assign(assignContainer),
      setUrl: assign(assignUrl),
      play: startPlayback,
      pause: pausePlayback,
      assignInstance,
      seekTo,
      setVolume,
      setPlaybackRate,
      destroyWaveSurfer,
      setTrackHeight
    },

    actors: {
      initializeWaveSurfer
    }
  }).createMachine({
    id: "waveSurfer",
    initial: "idle",
    context: {
      error: undefined,
      loadingProgress: undefined,
      waveSurfer: null,
      container: "",
      url: undefined,
      timeUpdateRate: 10
    },

    states: {
      idle: {},
      loading: {},
      ready: {},
      playing: {
        entry: [{type: "play", params: {context: (context: wsMachineContext) => context}}]
      },
      paused: {
        entry: [{type: "pause", params: {context: (context: wsMachineContext) => context}}]
      },
      error: {},

      init: {
        entry: assign({
          wsEventListenerRef: ({spawn, context}) =>
            spawn(initializeWaveSurfer, {
              input: {context}
            })
        })
      }
    },

    on: {
      [UserEvent.INIT]: {
        actions: [assign(assignContainer), assign(assignUrl)],
        target: ".init"
      },

      [SystemEvents.ASSIGN_INSTANCE]: {
        actions: assign(assignInstance)
      },

      [UserEvent.LOAD]: {
        actions: assign(assignUrl)
      },

      [UserEvent.PLAY]: {
        target: ".playing"
      },

      [UserEvent.PAUSE]: {
        target: ".paused"
      },

      [UserEvent.SEEK]: {
        actions: "seekTo"
      },

      [UserEvent.SET_VOLUME]: {
        actions: "setVolume"
      },

      [UserEvent.SET_PLAYBACK_RATE]: {
        actions: "setPlaybackRate"
      },

      [UserEvent.SET_TRACK_HEIGHT]: {
        actions: "setTrackHeight"
      },

      [UserEvent.DESTROY]: {
        target: ".idle",
        actions: "destroyWaveSurfer"
      },

      [InternalEvents.ERROR]: {
        target: ".error",
        actions: "assignError"
      },

      [InternalEvents.LOADING]: {
        actions: "assignLoadingProgress"
      },

      [InternalEvents.READY]: {
        target: ".ready"
      },

      [InternalEvents.FINISH]: {
        target: ".paused"
      },

      [InternalEvents.TIMEUPDATE]: {
        actions: "assignTimeUpdate"
      }
    }
  });

export const waveSurferMachineAtom = atomWithMachine((get) => {
  return createWaveSurferMachine();
});
