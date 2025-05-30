"use client";
import {waveSurferMachineAtom} from "@/store/wavesurfer/wavesurfer.machine";
import {waveSurferUserEvents} from "@/store/wavesurfer/wavesurfer.machine.events";
import {useAtom} from "jotai";

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
