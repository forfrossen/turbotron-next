// atoms.ts
import { atom } from 'jotai';
import type WaveSurfer from 'wavesurfer.js';

export const wavesurferAtom = atom<WaveSurfer | null>(null);
