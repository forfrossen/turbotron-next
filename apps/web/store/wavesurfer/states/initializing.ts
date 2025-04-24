import {ContextWithEvent} from "@/store/wavesurfer/wavesurfer.actions";
import {createWaveSurferActor} from "@/store/wavesurfer/wavesurfer.actors/create-wavesurfer";
import {setupEventListenersActor} from "@/store/wavesurfer/wavesurfer.actors/setup-event-handlers";
import {assign} from "lodash";
import WaveSurfer from "wavesurfer.js";

export const initializingState = {
  initial: "wsInstanceCreation",
  states: {
    wsInstanceCreation: {
      invoke: {
        src: createWaveSurferActor,
        input: ({context, event}: ContextWithEvent) => ({context, event}),
        onDone: {
          target: "eventListenerCreation",
          actions: assign({
            waveSurfer: ({event}: {event: {output: WaveSurfer}}) => event.output as WaveSurfer
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
        wsEventListenerRef: ({spawn, context}: {spawn: any; context: any}) =>
          spawn(setupEventListenersActor, {
            input: {context}
          })
      })
    }
  }
};
