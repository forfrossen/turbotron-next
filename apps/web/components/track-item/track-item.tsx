import {useTrackHeight} from "@/store/config-store";
import {Subscribe} from "@react-rxjs/core";
import {Card, CardContent} from "@repo/ui/components/card";

type Props = {
  trackId: string;
} & React.ComponentProps<typeof Card>;

export const TrackItem = ({trackId, ...restProps}: Props) => {
  const trackHeight = useTrackHeight();

  return (
    <Card className={"m-2 overflow-hidden"} style={{height: trackHeight}} {...restProps}>
      <CardContent className="m-2">
        <div className="container mx-auto p-4 overflow-hidden">
          <Subscribe>
            {/* <MidiGrid />
            <MidiScheduler /> */}
          </Subscribe>
        </div>
      </CardContent>
    </Card>
  );
};
