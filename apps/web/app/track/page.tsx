"use client";
import { Subscribe } from "@react-rxjs/core";
import { Arrangement } from "#components/arrangement/arrangement";
import { TrackItem } from "#components/track-item/track-item";
import { TrackItemMaster } from "#components/track-item/track-item-master";

export default function Page() {
  return (
    <Subscribe>
      <Arrangement>
        <TrackItemMaster />
        <TrackItem trackId={"Basti"} />
      </Arrangement>

      {/* <Transport /> */}
    </Subscribe>
  );
}
