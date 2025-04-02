"use client";
import { Card, CardContent } from "@repo/ui/components/card";
import MidiGrid from "@repo/web/components/MidiGrid";
import MidiScheduler from "@repo/web/components/MidiScheduler";
import MidiUploader from "@repo/web/components/MidiUploader";
import { useIsMounted } from "@repo/web/hooks/useIsMounted";
import { getMidiData, setMidiData, subscribeToMidiData } from "@repo/web/store/MidiStore";
import { Midi } from "@tonejs/midi";
import { useWavesurferWithRxJS } from "hooks/useWavesurferWithRxJS.js";
import { useEffect, useState } from "react";

const track = "/Sampler.mp3";
const Page = () => {
  const isMounted = useIsMounted();
  const [midiData, setLocalMidiData] = useState<Midi | null>(getMidiData());

  useEffect(() => {
    const unsubscribe = subscribeToMidiData(setLocalMidiData);
    return () => unsubscribe();
  }, []);

  const handleMidiParsed = (parsedData: Midi) => {
    setMidiData(parsedData);
  };

  const { containerRef, isPlaying, onPlayPause } = useWavesurferWithRxJS({
    url: track,
    waveColor: "purple",
    height: 100
  });

  return (
    <Card className="m-4">
      <CardContent className="m-2">
        <div ref={containerRef} />
        <div className="container mx-auto p-4">
          <MidiUploader />
          <MidiGrid />
          <MidiScheduler isPlaying={isPlaying} />
          <button onClick={() => onPlayPause()}>{isPlaying ? "Stop" : "Play"}</button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
