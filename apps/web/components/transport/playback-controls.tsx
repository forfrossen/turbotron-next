"use client";
import { waveSurferMachineAtom } from "@/store/wavesurfer/wavesurfer.machine";
import { waveSurferUserEvents } from "@/store/wavesurfer/wavesurfer.machine.events";
import { useAtom } from "jotai";
import { FileQuestionIcon, Loader2, Pause } from "lucide-react";
import { Icons } from "../icons";

export const PlaybackControls = () => {
  const [state, send] = useAtom(waveSurferMachineAtom);
  const setPlaying = () => send(waveSurferUserEvents.play());
  const setPause = () => send(waveSurferUserEvents.pause());

  const isPlaying = state.matches("playing");
  const isPaused = state.matches("paused");
  const isReady = state.matches("ready");
  const isLoading = state.matches("loading");

  const playPauseHandler = () => {
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
