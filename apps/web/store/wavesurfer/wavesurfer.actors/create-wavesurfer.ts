import {trackHeight$} from "@/store/config-store";
import {assignError, ContextWithEvent, debugAction} from "@/store/wavesurfer/wavesurfer.actions";
import {InternalEvents, UserEvent} from "@/store/wavesurfer/wavesurfer.machine.events";
import {parseHeight} from "@/utils/parse-height";
import WaveSurfer from "wavesurfer.js";
import {assertEvent, fromPromise} from "xstate";

const createWaveSurfer = async ({input}: {input: ContextWithEvent}): Promise<WaveSurfer> => {
  const {context, event} = input;
  const debugLog = debugAction("createWaveSurfer");
  debugLog({context, event});
  assertEvent(event, UserEvent.INIT);

  try {
    const {default: WaveSurfer} = await import("wavesurfer.js");
    const {options, minimap, topTimeline, bottomTimeline, zoomPlugin, regions} = await import(
      "@/store/wavesurfer/wavesurfer.options"
    );

    const ws = WaveSurfer.create({
      ...options,
      container: context.container!,
      height: parseHeight(trackHeight$.getValue()),
      url: context.url!,
      plugins: [minimap, topTimeline, bottomTimeline, zoomPlugin, regions]
    });

    return ws;
  } catch (err) {
    console.error("[ERROR] Failed to create WaveSurfer instance", err);
    assignError({context, event: {type: InternalEvents.ERROR, error: (err as Error).message}});
    return Promise.reject(new Error((err as Error).message));
  }
};

export const createWaveSurferActor = fromPromise(createWaveSurfer);
