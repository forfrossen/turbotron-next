"use client";

import { WaveSurferOptions } from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom";

export const minimap = Minimap.create({
  height: 20,
  waveColor: "#ddd",
  progressColor: "#999"
});

export const topTimeline = TimelinePlugin.create({
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

export const bottomTimeline = TimelinePlugin.create({
  height: 10,
  timeInterval: 5,
  primaryLabelInterval: 1,
  style: {
    fontSize: "10px",
    color: "#6A3274"
  }
});

export const zoomPlugin = ZoomPlugin.create({
  scale: 0.5,
  maxZoom: 100
});

export const regions = RegionsPlugin.create();

export const options: Partial<WaveSurferOptions> = {
  autoCenter: true,
  barGap: 2,
  interact: true,
  dragToSeek: true
};
