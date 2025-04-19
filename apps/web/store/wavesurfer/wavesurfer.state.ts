"use client";
import {atom} from 'jotai';
import type WaveSurfer from 'wavesurfer.js';
import {waveSurferMachineAtom} from './wavesurfer.machine';

// export const waveSurferAtom = atom<WaveSurfer | null>(null);
export const waveSurferAtom = atom<WaveSurfer | null>((get) => {
	const instance = get(waveSurferMachineAtom).context.waveSurfer;
	return instance ?? null;
});

export const waveSurferDurationAtom = atom((get) => {
	const instance = get(waveSurferAtom)
	if (!instance) {
		return 0;
	}
	return instance.getDuration() ?? 0;
});

export const waveSurferSetPlayingAtom = atom((get) => get(waveSurferAtom)?.isPlaying() ?? false);
