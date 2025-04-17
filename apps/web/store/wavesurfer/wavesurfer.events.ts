'use client'
import {atomFamily, atomWithObservable} from 'jotai/utils';
import {fromEventPattern, tap} from 'rxjs';
import {WaveSurferEvents} from 'wavesurfer.js';
import {waveSurferAtom} from './wavesurfer.state';

const waveSurferEvents: (keyof WaveSurferEvents)[] = [
  'init',
  "load",
  "loading",
  "decode",
  "ready",
  "redraw",
  "redrawcomplete",
  "play",
  "pause",
  "finish",
  "timeupdate",
  "audioprocess",
  "seeking",
  "interaction",
  "click",
  "dblclick",
  "drag",
  "dragstart",
  "dragend",
  "scroll",
  "zoom",
  "destroy",
  "error"
]

// export type WaveSurferEventAtomMap = {
//   [ K in keyof WaveSurferEvents ]: ReturnType<typeof atomWithObservable<any>>
// }

export const waveSurferEventsFamilyAtom = atomFamily(
  (params: {event: keyof WaveSurferEvents, initialValue: unknown}) => {
    return atomWithObservable((get) => {
      const instance = get(waveSurferAtom)
      // const instance = params.instance
      const event = params.event as keyof WaveSurferEvents;
      if (!instance) {
        console.log("Wavesurfer instance not found while subscribing to event", event);
        return fromEventPattern<number>(() => {})
      }
      console.log("Wavesurfer instance found. returning from eventPattern for event", event);
      return fromEventPattern<number>(
        (handler) => instance.on(event, handler),
        (handler) => instance.un(event, handler),
      ).pipe(
        tap((value) => {
          // console.log("Wavesurfer event", event, "fired with value", value);
        })
      )
    }, {
      initialValue: params.initialValue,
    })
  },
  (a, b) => a.event === b.event
)