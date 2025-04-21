"use client";
import {useLoadedSongUrl, useTrackHeight} from "@/store/config-store";
import {waveSurferMachineAtom} from "@/store/wavesurfer/wavesurfer.machine";
import {WaveSurferUserEvents} from "@/store/wavesurfer/wavesurfer.machine.events";
import {useAtom} from "jotai";
import {useEffect, useMemo, useRef} from "react";
import {WaveSurferOptions} from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom";
import {useIsMounted} from "./useIsMounted";

export const useWavesurferWithRxJS = () => {
  // const [ wavesurfer, setWavesurfer ] = useAtom( waveSurferAtom );
  const [ state, send ] = useAtom(waveSurferMachineAtom);
  const wavesurfer = state?.context?.waveSurfer || null;

  const isMounted = useIsMounted();
  const url = useLoadedSongUrl();
  const trackHeight = useTrackHeight();
  const waveColor = "purple";
  const height = parseInt(trackHeight.replace(/rem/g, "")) * 10;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const minimap = Minimap.create({
    height: 20,
    waveColor: "#ddd",
    progressColor: "#999"
  });

  const topTimeline = TimelinePlugin.create({
    height: 20,
    insertPosition: "beforebegin",
    timeInterval: 10,
    primaryLabelInterval: 5,
    secondaryLabelInterval: 1,
    style: {
      fontSize: "20px",
      color: "#2D5B88"
    }
  });

  const bottomTimeline = TimelinePlugin.create({
    height: 10,
    timeInterval: 5,
    primaryLabelInterval: 1,
    style: {
      fontSize: "10px",
      color: "#6A3274"
    }
  });

  const zoomPlugin = ZoomPlugin.create({
    scale: 0.5,
    maxZoom: 100
  });

  const regions = RegionsPlugin.create();

  const waveSurferOptions: Partial<WaveSurferOptions> = useMemo(() => ({
    url,
    waveColor,
    height,
    autoCenter: true,
    barGap: 2,
    interact: true,
    dragToSeek: true,
    plugins: [
      minimap,
      topTimeline,
      bottomTimeline,
      // zoomPlugin,
      regions
    ]
  }), [ url, waveColor, height ]);


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
      console.debug("[INFO] Creating WaveSurfer instance");
      send(WaveSurferUserEvents.init(containerRef.current, url));
      // setWavesurfer(WaveSurfer.create({...waveSurferOptions, container: containerRef.current!}));
    }

    return () => {
      console.debug("[INFO] Cleaning up WaveSurfer instance");
      if (!wavesurfer) {
        console.debug("[ERROR] WaveSurfer instance is null");
        return;
      }
      // wavesurfer.destroy()
      // setWavesurfer(null)
      send(WaveSurferUserEvents.destroy());
    }

  }, [ wavesurfer, containerRef, isMounted ]);

  return {
    containerRef,
    wavesurfer,
  };
};
