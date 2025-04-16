"use client";
import { useLoadedSongUrl, useTrackHeight } from "@/store/config-store";
import { wavesurferAtom } from "@/store/wavesurfer/wavesurfer.state";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom";
import { useIsMounted } from "./useIsMounted";

export const useWavesurferWithRxJS = () => {
  const isMounted = useIsMounted();
  const [ wavesurfer, setWavesurfer ] = useAtom( wavesurferAtom );
  const url = useLoadedSongUrl();
  const trackHeight = useTrackHeight();
  const waveColor = "purple";
  const height = parseInt( trackHeight.replace( /rem/g, "" ) ) * 10;
  const containerRef = useRef<HTMLDivElement | null>( null );

  const minimap = Minimap.create( {
    height: 20,
    waveColor: "#ddd",
    progressColor: "#999"
  } );

  const topTimeline = TimelinePlugin.create( {
    height: 20,
    insertPosition: "beforebegin",
    timeInterval: 10,
    primaryLabelInterval: 5,
    secondaryLabelInterval: 1,
    style: {
      fontSize: "20px",
      color: "#2D5B88"
    }
  } );

  const bottomTimeline = TimelinePlugin.create( {
    height: 10,
    timeInterval: 5,
    primaryLabelInterval: 1,
    style: {
      fontSize: "10px",
      color: "#6A3274"
    }
  } );

  const zoomPlugin = ZoomPlugin.create( {
    scale: 0.5,
    maxZoom: 100
  } );

  const regions = RegionsPlugin.create();

  const waveSurferOptions: Partial<WaveSurferOptions> = useMemo( () => ( {
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
  } ), [ url, waveColor, height ] );


  useEffect( () => {
    if ( !isMounted ) {
      console.debug( "[ERROR] Component is not mounted" );
      return;
    }
    if ( !containerRef.current ) {
      console.debug( "[ERROR] Container reference is null" );
      return;
    }

    if ( !wavesurfer ) {
      setWavesurfer( WaveSurfer.create( { ...waveSurferOptions, container: containerRef.current! } ) );
    }
  }, [ wavesurfer, containerRef, isMounted ] );

  return {
    containerRef,
    wavesurfer,
  };
};
