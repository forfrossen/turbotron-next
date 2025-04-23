"use client";

import {assertExists} from "@/utils/assert";
import {produce} from "immer";
import {useAtom} from "jotai";
import {isNil} from "lodash";
import {assertEvent, EventObject} from "xstate";
import {waveSurferMachineAtom, wsMachineContext} from "./wavesurfer.machine";
import {InternalEvents, SystemEvents, UserEvent, waveSurferUserEvents, WsEvent} from "./wavesurfer.machine.events";
export const useWaveSurferActions = () => {
  const [_, send] = useAtom(waveSurferMachineAtom);

  return {
    init: (container: HTMLElement | string, url: string) => send(waveSurferUserEvents.init(container, url)),
    load: (url: string) => send(waveSurferUserEvents.load(url)),
    play: () => send(waveSurferUserEvents.play()),
    pause: () => send(waveSurferUserEvents.pause()),
    seek: (time: number) => send(waveSurferUserEvents.seek(time)),
    zoom: (minPxPerSec: number) => send(waveSurferUserEvents.zoom(minPxPerSec)),
    destroy: () => send(waveSurferUserEvents.destroy()),
    setVolume: (volume: number) => send(waveSurferUserEvents.setVolume(volume)),
    setPlaybackRate: (rate: number) => send(waveSurferUserEvents.setPlaybackRate(rate)),
    setTrackHeight: (height: number) => send(waveSurferUserEvents.setTrackHeight(height)),
    setContainer: (container: HTMLElement | string) => send(waveSurferUserEvents.setContainer(container)),
    setUrl: (url: string) => send(waveSurferUserEvents.setUrl(url))
  };
};

type ContextWithEvent = {
  context: wsMachineContext;
  event: WsEvent;
};

export const debugAction =
  (action: string) =>
  ({context, event}: {context: wsMachineContext; event?: EventObject}) => {
    if (!isNil(event)) {
      console.debug(`[${action}] event:`, event);
    }
    if (!isNil(context)) {
      console.debug(`[${action}] context:`, context);
    }
  };

export const assignError = ({context, event}: ContextWithEvent) =>
  produce(context, (draft) => {
    assertEvent(event, InternalEvents.ERROR);
    const debugLog = debugAction("assignError");
    debugLog({context, event});
    draft.error = event.error;
  });

export const assignLoadingProgress = ({context, event}: ContextWithEvent) =>
  produce(context, (draft) => {
    const debugLog = debugAction("assignLoadingProgress");
    debugLog({context, event});
    assertEvent(event, InternalEvents.LOADING);
    draft.loadingProgress = event.progress;
  });

export const assignInstance = ({context, event}: ContextWithEvent) =>
  produce(context, (draft) => {
    const debugLog = debugAction("assignInstance");
    debugLog({context, event});
    assertEvent(event, SystemEvents.ASSIGN_INSTANCE);
    Object.assign(draft, {
      waveSurfer: event.waveSurfer
    });
  });

export const assignUrl = ({context, event}: ContextWithEvent) =>
  produce(context, (draft) => {
    const debugLog = debugAction("assignUrl");
    debugLog({context, event});
    assertEvent(event, [UserEvent.SET_URL, UserEvent.INIT]);
    draft.url = event.url;
  });

export const assignContainer = ({context, event}: ContextWithEvent) =>
  produce(context, (draft) => {
    const debugLog = debugAction("assignContainer");
    debugLog({context, event});
    assertEvent(event, [UserEvent.SET_CONTAINER, UserEvent.INIT]);
    Object.assign(draft, {
      container: event.container
    });
  });

export const startPlayback = ({context, event}: ContextWithEvent) => {
  const debugLog = debugAction("play");
  debugLog({context, event});
  assertEvent(event, UserEvent.PLAY);
  try {
    assertExists(context.waveSurfer);
    console.debug("[INFO] Playing audio");
    context.waveSurfer.play();
  } catch (error) {
    console.debug("[ERROR] WaveSurfer instance is not defined", error);
    assignError({context, event: {type: InternalEvents.ERROR, error: "WaveSurfer instance is not defined"}});
  }
};

export const pausePlayback = ({context, event}: ContextWithEvent) => {
  const debugLog = debugAction("pause");
  debugLog({context, event});
  assertExists(context.waveSurfer);
  assertEvent(event, UserEvent.PAUSE);
  console.debug("[INFO] Pausing audio");
  context.waveSurfer.pause();
};

export const seekTo = ({context, event}: ContextWithEvent) => {
  const debugLog = debugAction("seekTo");
  debugLog({context, event});
  assertEvent(event, UserEvent.SEEK);
  assertExists(context.waveSurfer);
  console.debug("[INFO] Seeking to", event.time);
  context.waveSurfer.seekTo(event.time);
};

export const setVolume = ({context, event}: ContextWithEvent) => {
  const debugLog = debugAction("setVolume");
  debugLog({context, event});
  assertEvent(event, UserEvent.SET_VOLUME);
  assertExists(context.waveSurfer);
  console.debug("[INFO] Setting volume to", event.volume);
  context.waveSurfer.setVolume(event.volume);
};

export const setPlaybackRate = ({context, event}: ContextWithEvent) => {
  const debugLog = debugAction("setPlaybackRate");
  debugLog({context, event});
  if (context.waveSurfer && event.type === UserEvent.SET_PLAYBACK_RATE) {
    context.waveSurfer.setPlaybackRate(event.rate);
  }
};

export const destroyWaveSurfer = ({context}: {context: wsMachineContext}) => {
  const debugLog = debugAction("destroyWaveSurfer");
  debugLog({context});
  if (context.waveSurfer) {
    context.waveSurfer.destroy();
  }
};

export const setTrackHeight = ({context, event}: ContextWithEvent) => {
  const debugLog = debugAction("setTrackHeight");
  assertEvent(event, UserEvent.SET_TRACK_HEIGHT);
  debugLog({context, event});
  const waveSurfer = context.waveSurfer;
  assertExists(waveSurfer);
  const options = waveSurfer.options;
  waveSurfer.setOptions({...options, height: event.height});
  console.debug("[INFO] Setting track height to", event.height);
};

export const assignTimeUpdate = ({context, event}: ContextWithEvent) =>
  produce(context, (draft) => {
    const debugLog = debugAction("assignTimeUpdate");
    debugLog({context, event});
    assertEvent(event, InternalEvents.TIMEUPDATE);
    draft.currentTime = event.currentTime;
  });
