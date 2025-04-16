"use client";
import {atom} from 'jotai';
import {waveSurferAtom} from './wavesurfer.state';


export const wavesurferSetPlayAtom = atom((get) => () => get(waveSurferAtom)?.play() ?? null);
export const wavesurferSetPauseAtom = atom((get) => () => get(waveSurferAtom)?.pause() ?? null);
export const wavesurferSetStopAtom = atom((get) => () => get(waveSurferAtom)?.stop() ?? null);
