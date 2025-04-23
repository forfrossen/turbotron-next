"use client";
import {useLoadedSongUrl} from "@/store/config-store";
import {waveSurferMachineAtom} from "@/store/wavesurfer/wavesurfer.machine";
import {waveSurferUserEvents} from "@/store/wavesurfer/wavesurfer.machine.events";
import {useAtom} from "jotai";
import {useEffect, useRef} from "react";
import {useIsMounted} from "./useIsMounted";

export const useWavesurferWithRxJS = () => {
  // const [ wavesurfer, setWavesurfer ] = useAtom( waveSurferAtom );
  const [state, send] = useAtom(waveSurferMachineAtom);
  const wavesurfer = state?.context?.waveSurfer || null;

  const isMounted = useIsMounted();
  const url = useLoadedSongUrl();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMounted) {
      console.debug("[ERROR] Component is not mounted");
      return;
    }

    if (!containerRef.current) {
      console.debug("[ERROR] Container reference is null");
      return;
    }

    if (!wavesurfer) {
      console.debug("[INFO] Creating WaveSurfer instance with container:", containerRef.current, "and url:", url);
      send(waveSurferUserEvents.init(containerRef.current, url));
      // setWavesurfer(WaveSurfer.create({...waveSurferOptions, container: containerRef.current!}));
    }

    return () => {
      console.debug("[INFO] Cleaning up WaveSurfer instance");

      if (!wavesurfer) {
        console.debug("[ERROR] WaveSurfer instance is null");
        return;
      }

      send(waveSurferUserEvents.destroy());
    };
  }, [wavesurfer, containerRef, isMounted]);

  return {
    containerRef,
    wavesurfer
  };
};
