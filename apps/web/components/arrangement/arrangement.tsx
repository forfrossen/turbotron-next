"use client";

import {usePermissionRequester} from "@/hooks/usePermissionRequester";
import {useLoadedSong} from "@/store/config-store";
import {isNil} from "lodash";

export const Arrangement = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const loadedSong = useLoadedSong();
  const isLoadedSong = !isNil(loadedSong);
  usePermissionRequester();

  if (!isLoadedSong) {
    return (
      <div className="flex flex-col w-full px-2 gap-2">
        <div className="text-center">Please select a song</div>
      </div>
    );
  }

  return <div className="flex flex-col mx-2 gap-2 flex-grow-1 sticky lg:flex top-0 h-svh">{children}</div>;
};
