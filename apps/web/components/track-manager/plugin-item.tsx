import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { PlusIcon } from "lucide-react";

type Props = {
  personName: string;
  pluginType: string;
} & React.ComponentProps<typeof Card>;

export const PluginItem = ({ personName, pluginType, ...restProps }: Props) => {
  return (
    <Card className="m-2" {...restProps}>
      <CardHeader>
        <CardTitle>{personName}</CardTitle>
        <CardDescription>{pluginType}</CardDescription>
      </CardHeader>
      <CardContent>
        <PlusIcon />
        <div>Channel: Omni</div>
      </CardContent>
    </Card>
  );
};
