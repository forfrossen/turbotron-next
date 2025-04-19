// import {waveSurferMachineAtom} from "@/store/wavesurfer/wavesurfer.machine";
// import {WaveSurferMachineEvents} from "@/store/wavesurfer/wavesurfer.machine.events";
// import {waveSurferAtom} from "@/store/wavesurfer/wavesurfer.state";
// import {useAtom, useAtomValue} from "jotai";
// import {useEffect} from "react";
// import {WaveSurferEvents} from "wavesurfer.js";

// export const useWaveSurferMachine = () => {
//   const [state, send] = useAtom(waveSurferMachineAtom);
//   const waveSurfer = useAtomValue(waveSurferAtom);

//   const handleError = (error: Error) => {
//     send(WaveSurferMachineEvents.error(error.message || "An unknown error occurred"));
//   };

//   const handleLoad = (url: string) => {
//     send(WaveSurferMachineEvents.load(url));
//   };

//   const handleLoading = (progress: number) => {
//     send(WaveSurferMachineEvents.loading(progress));
//   };

//   const handleDecode = (duration: number) => {
//     send(WaveSurferMachineEvents.decode(duration));
//   };

//   const handleReady = (duration: number) => {
//     send(WaveSurferMachineEvents.ready(duration));
//   };

//   const handleRedraw = () => {
//     send(WaveSurferMachineEvents.redraw());
//   };

//   const handleRedrawComplete = () => {
//     send(WaveSurferMachineEvents.redrawComplete());
//   };

//   const handlePlay = () => {
//     send(WaveSurferMachineEvents.play());
//   };

//   const handlePause = () => {
//     send(WaveSurferMachineEvents.pause());
//   };

//   const handleStop = () => {
//     send(WaveSurferMachineEvents.stop());
//   };

//   const handleFinish = () => {
//     send(WaveSurferMachineEvents.finish());
//   };

//   const handleTimeUpdate = (currentTime: number) => {
//     send(WaveSurferMachineEvents.timeUpdate(currentTime));
//   };

//   const handleSeeking = (currentTime: number) => {
//     send(WaveSurferMachineEvents.seeking(currentTime));
//   };

//   const handleInteraction = (newTime: number) => {
//     send(WaveSurferMachineEvents.interaction(newTime));
//   };

//   const handleClick = (relativeX: number) => {
//     send(WaveSurferMachineEvents.click(relativeX));
//   };

//   const handleDrag = (relativeX: number) => {
//     send(WaveSurferMachineEvents.drag(relativeX));
//   };

//   const handleScroll = (visibleStartTime: number, visibleEndTime: number) => {
//     send(WaveSurferMachineEvents.scroll(visibleStartTime, visibleEndTime));
//   };

//   const handleZoom = (minPxPerSec: number) => {
//     send(WaveSurferMachineEvents.zoom(minPxPerSec));
//   };

//   const handleDestroy = () => {
//     send(WaveSurferMachineEvents.destroy());
//   };

//   if (!waveSurfer) {
//     console.warn("WaveSurfer instance is not available.");
//     return;
//   }

//   const eventHandlerMap: Map<keyof WaveSurferEvents, (...args: any) => void> = new Map([
//     ["error", handleError],
//     ["load", handleLoad],
//     ["loading", handleLoading],
//     ["decode", handleDecode],
//     ["ready", handleReady],
//     ["redraw", handleRedraw],
//     ["redrawcomplete", handleRedrawComplete],
//     ["play", handlePlay],
//     ["pause", handlePause],
//     ["stop", handleStop],
//     ["finish", handleFinish],
//     ["timeupdate", handleTimeUpdate],
//     ["seeking", handleSeeking],
//     ["interaction", handleInteraction],
//     ["click", handleClick],
//     ["drag", handleDrag],
//     ["scroll", handleScroll],
//     ["zoom", handleZoom],
//     ["destroy", handleDestroy]
//   ] as [keyof WaveSurferEvents, (...args: any) => void][]);

//   useEffect(() => {
//     eventHandlerMap.forEach((handler, event) => {
//       waveSurfer.on(event, handler);
//     });

//     return () => {
//       eventHandlerMap.forEach((handler, event) => {
//         waveSurfer.un(event, handler);
//       });
//     };
//   }, [waveSurfer]);
// };
