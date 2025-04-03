"use client";
import { Subscribe } from "@react-rxjs/core";
import { Arrangement } from "@repo/web/components/arrangement/arrangement";
import { TrackItem } from "@repo/web/components/track-item/track-item";
import { TrackItemMaster } from "@repo/web/components/track-item/track-item-master";
import { usePermissionRequester } from "@repo/web/hooks/usePermissionRequester";
import { useLoadedSong } from "@repo/web/store/config-store";
import { isEmpty, isNil } from "lodash";

export default function Page() {
  const loadedSong = useLoadedSong();
  const isLoadedSong = !isNil(loadedSong) && !isEmpty(loadedSong);
  usePermissionRequester();

  if (!isLoadedSong) {
    return (
      <div className="flex flex-col w-full mx-2 gap-2">
        <div className="text-center">Please select a song</div>
      </div>
    );
  }

  return (
    <Arrangement>
      <Subscribe>
        <TrackItemMaster />
        <TrackItem trackId={"Basti"} />
      </Subscribe>
    </Arrangement>
  );
}
