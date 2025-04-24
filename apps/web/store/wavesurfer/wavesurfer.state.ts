"use client";
import {waveSurferMachineAtom} from "@/store/wavesurfer/wavesurfer.machine";
import {atom} from "jotai";
import type WaveSurfer from "wavesurfer.js";

// export const waveSurferAtom = atom<WaveSurfer | null>(null);
export const waveSurferAtom = atom<WaveSurfer | null>((get) => {
  const instance = get(waveSurferMachineAtom).context.waveSurfer;
  return instance ?? null;
});

export const waveSurferDurationAtom = atom((get) => {
  const instance = get(waveSurferAtom);
  if (!instance) {
    return 0;
  }
  return instance.getDuration() ?? 0;
});

export const waveSurferSetPlayingAtom = atom((get) => get(waveSurferAtom)?.isPlaying() ?? false);
