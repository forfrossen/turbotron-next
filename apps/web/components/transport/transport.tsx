"use client";
import { Card } from "@repo/ui/components/card";
import { useLoadedSong } from "#store/config-store";

export const Transport = () => {
  const loadedSong = useLoadedSong();
  const isLoadedSong = loadedSong !== null && loadedSong !== undefined;

  return (
    <Card className="align-end z-10 self-end w-full">
      <div className="text-center">Please select a song</div>
    </Card>
  );
};
