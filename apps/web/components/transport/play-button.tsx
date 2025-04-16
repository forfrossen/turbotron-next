"use client";

import {useIsWaveSurferReady} from "@/hooks/useWaveSurferEvent";
import {useWaveSurfer} from "@/hooks/useWaveSurver";
import React from "react";

type PlayButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement>;

export function PlayButton(props: PlayButtonProps) {
  const {children, ...restProps} = props;
  const isReady = useIsWaveSurferReady();
  const wavesurfer = useWaveSurfer();

  async function playHandler() {
    if (!wavesurfer) return;
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  }

  return (
    <button aria-label="Play" onClick={playHandler} {...restProps}>
      {children}
    </button>
  );
}
