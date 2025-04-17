"use client";
import {atom} from 'jotai';
import type WaveSurfer from 'wavesurfer.js';

export const waveSurferAtom = atom<WaveSurfer | null>(null);
export const waveSurferDurationAtom = atom((get) => {
	const instance = get(waveSurferAtom)
	if (!instance) {
		return 0;
	}
	return instance.getDuration() ?? 0;
});

export const waveSurferSetPlayingAtom = atom((get) => get(waveSurferAtom)?.isPlaying() ?? false);
