'use client';
import {waveSurferEventsFamilyAtom} from '@/store/wavesurfer/wavesurfer.events';
import {useAtomValue} from 'jotai';
import {WaveSurferEvents} from 'wavesurfer.js';

export function useWaveSurferEvent<T = any>(event: keyof WaveSurferEvents, initialValue: T): T | null {
	return useAtomValue(waveSurferEventsFamilyAtom({event, initialValue})) as T | null;
}
