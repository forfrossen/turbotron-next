import { useWavesurfer } from "@wavesurfer/react";
import { useEffect, useRef } from "react";
import { currentTimeSubject$, isPlayingSubject$, isReadySubject$, wavesurferSubject$ } from "store/transport-store.js";

interface UseWavesurferWithRxJSProps {
  url: string;
  waveColor: string;
  height: number;
}

export const useWavesurferWithRxJS = ({ url, waveColor, height }: UseWavesurferWithRxJSProps) => {
  const containerRef = useRef(null);

  const { wavesurfer, isReady, currentTime, isPlaying } = useWavesurfer({
    container: containerRef,
    url,
    waveColor,
    height,
    autoCenter: true,
    barGap: 2,
    interact: true,
    dragToSeek: true
  });

  useEffect(() => {
    wavesurferSubject$.next(wavesurfer);
  }, [wavesurfer]);

  useEffect(() => {
    isReadySubject$.next(isReady);
  }, [isReady]);

  useEffect(() => {
    currentTimeSubject$.next(currentTime);
  }, [currentTime]);

  useEffect(() => {
    isPlayingSubject$.next(isPlaying);
  }, [isPlaying]);

  return {
    containerRef
  };
};
