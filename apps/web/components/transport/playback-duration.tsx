"use client";
import {waveSurferMachineAtom} from "@/store/wavesurfer/wavesurfer.machine";
import {waveSurferAtom} from "@/store/wavesurfer/wavesurfer.state";
import {useAtomValue} from "jotai";

export const PlaybackDuration = () => {
  const duration = useAtomValue(waveSurferAtom)?.getDuration() ?? 0;
  const waveSurferMachine = useAtomValue(waveSurferMachineAtom);
  const isPlaying = waveSurferMachine?.matches("playing");
  const isReady = waveSurferMachine?.matches("ready");
  const time = waveSurferMachine?.context?.currentTime ?? 0;

  // const isPlaying = useWaveSurferEvent<boolean>("play", false);
  // const isReady = useWaveSurferEvent<boolean>("ready", false);
  // const time = useWaveSurferEvent<number>("audioprocess", 0);

  function formatTime(time: number): import("react").ReactNode {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
      <span>{formatTime(time ?? 0)}</span>
      <span>/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
};
