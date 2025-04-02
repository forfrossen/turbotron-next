import { useWavesurfer } from "@wavesurfer/react";
import { useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";

interface UseWavesurferWithRxJSProps {
  url: string;
  waveColor: string;
  height: number;
}

export const useWavesurferWithRxJS = ({ url, waveColor, height }: UseWavesurferWithRxJSProps) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const eventSubject = new Subject<string>();

  const { wavesurfer, isReady } = useWavesurfer({
    container: containerRef,
    url,
    waveColor,
    height
  });

  useEffect(() => {
    if (!wavesurfer) return;

    const subscription = eventSubject.subscribe((event) => {
      if (event === "playPause") {
        wavesurfer.playPause();
        setIsPlaying(wavesurfer.isPlaying());
      }
    });

    return () => subscription.unsubscribe();
  }, [wavesurfer]);

  const onPlayPause = () => {
    eventSubject.next("playPause");
  };

  return {
    containerRef,
    isPlaying,
    onPlayPause
  };
};
