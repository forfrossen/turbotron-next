"use client";
import { useLoadedSongUrl, useTrackHeight } from "@repo/web/store/config-store";
import { useWavesurfer } from "@wavesurfer/react";
import { useEffect, useRef } from "react";
import { currentTime$, isPlaying$, isReady$, wavesurfer$ } from "store/transport-store.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
// import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";

// // Create a timeline plugin instance with custom options
// const topTimeline = TimelinePlugin.create({
//   height: 20,
//   insertPosition: "beforebegin",
//   timeInterval: 10,
//   primaryLabelInterval: 5,
//   secondaryLabelInterval: 1,
//   style: {
//     fontSize: "20px",
//     color: "#2D5B88"
//   }
// });

// // Create a second timeline
// const bottomTimeline = TimelinePlugin.create({
//   height: 10,
//   timeInterval: 5,
//   primaryLabelInterval: 1,
//   style: {
//     fontSize: "10px",
//     color: "#6A3274"
//   }
// });

const minimap = Minimap.create({
  height: 20,
  waveColor: "#ddd",
  progressColor: "#999"
  // the Minimap takes all the same options as the WaveSurfer itself
});

const zoomPlugin = ZoomPlugin.create({
  // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
  scale: 0.5,
  // Optionally, specify the maximum pixels-per-second factor while zooming
  maxZoom: 100
});

export const regions = RegionsPlugin.create();

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
    dragToSeek: true,
    plugins: [
      // Register the plugin
      // minimap,
      // topTimeline,
      // bottomTimeline,
      // zoomPlugin,
      regions
    ]
  });

  useEffect(() => {
    console.log("Wavesurfer instance created", wavesurfer);
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
