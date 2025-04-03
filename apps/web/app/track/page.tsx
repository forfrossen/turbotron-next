"use client";
import { Arrangement } from "@repo/web/components/arrangement/arrangement";
import { TrackItem } from "@repo/web/components/track-item/track-item";
import { TrackItemMaster } from "@repo/web/components/track-item/track-item-master";
import { useLoadedSong } from "@repo/web/store/config-store";
import { setMidiData } from "@repo/web/store/midi-store";
import { Midi } from "@tonejs/midi";
import { isEmpty, isNil } from "lodash";
import { useEffect } from "react";

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
  const loadedSong = useLoadedSong();

  useEffect(() => {
    if (!loadedSong) {
      return;
    }

    fetch(`${`/tracks/${loadedSong}.mid`}`)
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
  const loadedSong = useLoadedSong();
  const isLoadedSong = !isNil(loadedSong) && !isEmpty(loadedSong);
  usePermissionRequester();
  useLoadMidiFile();

  if (!isLoadedSong) {
    return (
      <div className="flex flex-col w-full mx-2 gap-2">
        <div className="text-center">Please select a song</div>
      </div>
    );
  }

  return (
    <Arrangement>
      <TrackItemMaster />
      <TrackItem trackId={"Basti"} />
    </Arrangement>
  );
}
