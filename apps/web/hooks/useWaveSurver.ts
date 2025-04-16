"use client";
import {waveSurferAtom} from "@/store/wavesurfer/wavesurfer.state";
import {useAtomValue} from "jotai";

export const useWaveSurfer = () => {
	const waveSurfer = useAtomValue(waveSurferAtom);
	return waveSurfer;
}

