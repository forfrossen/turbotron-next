"use client";
import {useIsMounted} from "@/hooks/useIsMounted";
import {useWavesurferWithRxJS} from "@/hooks/useWavesurferWithRxJS";
import {useTrackHeight} from "@/store/config-store";
import {Card, CardContent} from "@repo/ui/components/card";
import {useEffect} from "react";

type Props = {} & React.ComponentProps<typeof Card>;

export const TrackItemMaster = ({...restProps}: Props) => {
  const trackHeight = useTrackHeight();
  const isMounted = useIsMounted();
  const {containerRef} = useWavesurferWithRxJS();
  useEffect(() => {
    if (!isMounted) return;
  }, [isMounted, containerRef]);

  return (
    <Card className={"m-2"} style={{height: trackHeight}} {...restProps}>
      <CardContent className="m-2 h-full flex flex-col align-center justify-center">
        <div ref={containerRef} className="" />
      </CardContent>
    </Card>
  );
};
