"use client";

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
import {createWaveSurferActor} from "@/store/wavesurfer/wavesurfer.actors/create-wavesurfer";
import {setupEventListenersActor} from "@/store/wavesurfer/wavesurfer.actors/setup-event-handlers";
import {atomWithMachine} from "jotai-xstate";
import WaveSurfer from "wavesurfer.js";
import {assign, setup} from "xstate";
import {InternalEvents, SystemEvents, UserEvent, WsEvent} from "./wavesurfer.machine.events";

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
      createWaveSurferActor: createWaveSurferActor,
      setupEventHandlersActor: setupEventListenersActor
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
      initializing: {
        initial: "wsInstanceCreation",
        states: {
          wsInstanceCreation: {
            invoke: {
              src: createWaveSurferActor,
              input: ({context, event}) => ({context, event}),
              onDone: {
                target: "eventListenerCreation",
                actions: assign({
                  waveSurfer: ({event}) => event.output as WaveSurfer
                })
              },
              onError: {
                target: "#waveSurfer.error",
                actions: "assignError"
              }
            }
          },
          eventListenerCreation: {
            entry: assign({
              wsEventListenerRef: ({spawn, context}) =>
                spawn(setupEventListenersActor, {
                  input: {context}
                })
            })
          }
        }
      },
      loading: {},
      ready: {},
      playing: {
        entry: [{type: "play", params: {context: (context: wsMachineContext) => context}}]
      },
      paused: {
        entry: [{type: "pause", params: {context: (context: wsMachineContext) => context}}]
      },
      error: {}
    },

    on: {
      [UserEvent.INIT]: {
        actions: [assign(assignContainer), assign(assignUrl)],
        target: ".initializing.wsInstanceCreation"
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
