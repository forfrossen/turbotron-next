"use client";
import {useWaveSurferEvent} from "@/hooks/useWaveSurferEvent";
import {wavesurferSetPauseAtom, wavesurferSetPlayAtom} from "@/store/wavesurfer/wavesurfer.actions";
import {useAtomValue} from "jotai";
import {Loader2, Pause} from "lucide-react";
import {Icons} from "../icons";

export const PlaybackControls = () => {
  const setPlaying = useAtomValue(wavesurferSetPlayAtom);
  const setPause = useAtomValue(wavesurferSetPauseAtom);
  const isReady = useWaveSurferEvent<boolean>("ready", false);
  const isPlaying = useWaveSurferEvent<boolean>("play", false);

  const playPauseHandler = () => {
    if (isPlaying) {
      console.log("Pausing audio");
      setPause();
    } else {
      console.log("Playing audio");
      setPlaying();
    }
  };

  return (
    <div className="flex justify-center lg:w-1/2 lg:justify-evenly">
      <button aria-label="Previous" onClick={() => {}} className="hidden lg:block">
        <Icons.SkipBack className="size-10" />
      </button>
      <button aria-label={isPlaying ? "Pause" : "Play"} onClick={playPauseHandler}>
        {!isReady ?
          <Loader2 className="animate-spin" />
        : isPlaying ?
          <Pause className="size-10" />
        : <Icons.Play className="size-10" />}
      </button>
      <button aria-label="Next" onClick={() => {}} className="hidden lg:block">
        <Icons.SkipForward className="size-10" />
      </button>
    </div>
  );
};
