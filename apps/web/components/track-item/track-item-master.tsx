"use client";
import {useWavesurferWithRxJS} from "@/hooks/useWavesurferWithRxJS";
import {useTrackHeight} from "@/store/config-store";
import {Card, CardContent} from "@repo/ui/components/card";

type Props = {} & React.ComponentProps<typeof Card>;

export const TrackItemMaster = ({...restProps}: Props) => {
  const trackHeight = useTrackHeight();
  const {containerRef} = useWavesurferWithRxJS();

  return (
    <Card className={"m-2"} style={{height: trackHeight}} {...restProps}>
      <CardContent className="m-2 h-full flex flex-col align-center justify-center">
        <div ref={containerRef} className="" />
      </CardContent>
    </Card>
  );
};
