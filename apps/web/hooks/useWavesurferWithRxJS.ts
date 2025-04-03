import { useLoadedSongUrl, useTrackHeight } from "@repo/web/store/config-store";
import { useWavesurfer } from "@wavesurfer/react";
import { useEffect, useRef } from "react";
import { currentTime$, isPlaying$, isReady$, wavesurfer$ } from "store/transport-store.js";

export const useWavesurferWithRxJS = () => {
  const url = useLoadedSongUrl();
  const trackHeight = useTrackHeight();
  const waveColor = "purple";
  const height = parseInt(trackHeight.replace(/rem/g, "")) * 12;
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
    wavesurfer$.next(wavesurfer);
  }, [wavesurfer]);

  useEffect(() => {
    isReady$.next(isReady);
  }, [isReady]);

  useEffect(() => {
    currentTime$.next(currentTime);
  }, [currentTime]);

  useEffect(() => {
    isPlaying$.next(isPlaying);
  }, [isPlaying]);

  return {
    containerRef
  };
};
