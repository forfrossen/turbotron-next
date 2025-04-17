import {transportMachineAtom} from "@/store/wavesurfer/transport.machine";
import {waveSurferAtom} from "@/store/wavesurfer/wavesurfer.state";
import {useAtom, useAtomValue} from "jotai";
import {useEffect} from "react";
import {WaveSurferEvents} from "wavesurfer.js";

export const useTransportMachine = () => {
  const [state, send] = useAtom(transportMachineAtom);
  const waveSurfer = useAtomValue(waveSurferAtom);

  const handleError = (error: Error) => {
    send({type: "ERROR", error: error.message || "An unknown error occurred"});
  };

  const handleReady = () => {
    send({type: "READY"});
  };

  const handlePlay = () => {
    send({type: "PLAY"});
  };

  const handlePause = () => {
    send({type: "PAUSE"});
  };

  const handleFinish = () => {
    send({type: "FINISH"});
  };

  const handleLoading = () => {
    send({type: "LOADING"});
  };

  if (!waveSurfer) {
    console.warn("WaveSurfer instance is not available.");
    return;
  }

  const eventHandlerMap: Map<keyof WaveSurferEvents, (...args: any) => void> = new Map([
    ["error", handleError],
    ["ready", handleReady],
    ["play", handlePlay],
    ["pause", handlePause],
    ["finish", handleFinish],
    ["loading", handleLoading]
  ]);

  useEffect(() => {
    eventHandlerMap.forEach((handler, event) => {
      waveSurfer.on(event, handler);
    });

    return () => {
      eventHandlerMap.forEach((handler, event) => {
        waveSurfer.un(event, handler);
      });
    };
  }, [waveSurfer]);
};
