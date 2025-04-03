"use client";
import { Subscribe } from "@react-rxjs/core";
import { Card, CardContent } from "@repo/ui/components/card";
import MidiGrid from "@repo/web/components/MidiGrid";
import MidiScheduler from "@repo/web/components/MidiScheduler";
import { useIsMounted } from "@repo/web/hooks/useIsMounted";
import { setMidiData, useMidiData } from "@repo/web/store/MidiStore";
import { Midi } from "@tonejs/midi";
import { useWavesurferWithRxJS } from "hooks/useWavesurferWithRxJS.js";
import { useEffect } from "react";

const track = "/tracks/Under_The_Weeping_Willow.mp3";
const midiTrack = "/tracks/Under_The_Weeping_Willow.mid";

const usePermissionRequester = () => {
  useEffect(() => {
    navigator.permissions
      .query({ name: "midi" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          console.log("MIDI permission granted");
        } else if (permissionStatus.state === "prompt") {
          console.log("MIDI permission prompt");
        } else {
          console.error("MIDI permission denied");
        }
      })
      .catch((error) => {
        console.error("Failed to query MIDI permission:", error);
      });
  }, []);
};

const useLoadMidiFile = () => {
  useEffect(() => {
    fetch(midiTrack)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const midi = new Midi(arrayBuffer);
        setMidiData(midi);
      })
      .catch((error) => {
        console.error("Failed to load MIDI track:", error);
      });
  }, []);
};

export default function Page() {
  const isMounted = useIsMounted();
  const midiData = useMidiData();
  usePermissionRequester();
  useLoadMidiFile();

  const handleMidiParsed = (parsedData: Midi) => {
    setMidiData(parsedData);
  };

  const { containerRef, isPlaying, onPlayPause } = useWavesurferWithRxJS({
    url: track,
    waveColor: "purple",
    height: 100
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 m-4">
      <Card className="m-4">
        <CardContent className="m-2">
          <div ref={containerRef} />
          <div className="container mx-auto p-4">
            <Subscribe>
              <MidiGrid />
              <MidiScheduler isPlaying={isPlaying} />
              <button onClick={() => onPlayPause()}>{isPlaying ? "Stop" : "Play"}</button>
            </Subscribe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
