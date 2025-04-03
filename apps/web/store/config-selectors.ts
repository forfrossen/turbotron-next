import { bind } from "@react-rxjs/core";
import { loadedSong$ } from "@repo/web/store/config-store";
import { map } from "rxjs";

const humanReadableSongName$ = loadedSong$.pipe(
  map((song) => {
    const songName = song.split("/").pop() || "";
    return songName.replace(/_/g, " ").replace(/\.[^/.]+$/, "");
  })
);
const humanReadableSongNameBinder = bind(humanReadableSongName$, "");
export const useHumanReadableSongName = humanReadableSongNameBinder[0];
