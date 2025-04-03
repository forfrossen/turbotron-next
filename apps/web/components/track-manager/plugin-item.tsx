"use client";
import { Subscribe } from "@react-rxjs/core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { useTrackHeight } from "@repo/web/store/config-store";
import { PlusIcon } from "lucide-react";

type Props = {
  personName: string;
  pluginType: string;
} & React.ComponentProps<typeof Card>;

export const PluginItem = ({ personName, pluginType, ...restProps }: Props) => {
  const trackHeight = useTrackHeight();

  return (
    <Subscribe>
      <Card className="m-2" {...restProps} style={{ height: trackHeight }}>
        <CardHeader>
          <CardTitle>{personName}</CardTitle>
          <CardDescription>{pluginType}</CardDescription>
        </CardHeader>
        <CardContent>
          <PlusIcon />
          <div>Channel: Omni</div>
        </CardContent>
      </Card>
    </Subscribe>
  );
};
