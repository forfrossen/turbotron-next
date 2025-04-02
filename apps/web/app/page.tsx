"use client";
import { Card, CardContent, CardTitle } from "@repo/ui/components/card";
import { useIsMounted } from "@repo/web/hooks/useIsMounted";

export default function Page() {
  const isMounted = useIsMounted();

  return (
    <Card className="m-4">
      <CardTitle className="m-2">Main Page</CardTitle>
      <CardContent className="m-2"></CardContent>
    </Card>
  );
}
