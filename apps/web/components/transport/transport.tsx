"use client";
import { useLoadedSong } from "@/store/config-store";
import { Card } from "@repo/ui/components/card";

export const Transport = () => {
  const loadedSong = useLoadedSong();
  const isLoadedSong = loadedSong !== null && loadedSong !== undefined;

  return (
    <Card className="align-end z-10 self-end w-full">
      <div className="text-center">Please select a song</div>
    </Card>
  );
};
