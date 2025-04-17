"use client";
import {transportMachineAtom} from "@/store/wavesurfer/transport.machine";
import {wavesurferSetPauseAtom, wavesurferSetPlayAtom} from "@/store/wavesurfer/wavesurfer.actions";
import {useAtomValue} from "jotai";
import {FileQuestionIcon, Loader2, Pause} from "lucide-react";
import {Icons} from "../icons";

export const PlaybackControls = () => {
  const setPlaying = useAtomValue(wavesurferSetPlayAtom);
  const setPause = useAtomValue(wavesurferSetPauseAtom);
  const transportMachine = useAtomValue(transportMachineAtom);
  const transportState = transportMachine.value;
  const isPlaying = transportMachine.matches("playing");
  const isPaused = transportMachine.matches("paused");
  const isReady = transportMachine.matches("ready");
  const isLoading = transportMachine.matches("loading");

  const playPauseHandler = () => {
    console.log("Play/Pause button clicked. TransportMachine has state:", transportState);
    console.log("isPlaying:", isPlaying, "isPaused:", isPaused, "isLoading:", isLoading, "isReady:", isReady);
    if (isPlaying) {
      console.log("Pausing audio");
      setPause();
      return;
    }
    console.log("Playing audio");
    setPlaying();
  };

  return (
    <div className="flex justify-center lg:w-1/2 lg:justify-evenly">
      <button aria-label="Previous" onClick={() => {}} className="hidden lg:block">
        <Icons.SkipBack className="size-10" />
      </button>
      <button aria-label={isPlaying ? "Pause" : "Play"} onClick={playPauseHandler}>
        {isLoading ?
          <Loader2 className="animate-spin" />
        : isPlaying ?
          <Pause className="size-10" />
        : isPaused ?
          <Icons.Play className="size-10" />
        : isReady ?
          <Icons.Play className="size-10" />
        : <FileQuestionIcon className="size-10" />}
      </button>
      <button aria-label="Next" onClick={() => {}} className="hidden lg:block">
        <Icons.SkipForward className="size-10" />
      </button>
    </div>
  );
};
