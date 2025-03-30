"use client";
import { Card, CardContent, CardTitle } from "@repo/ui/components/card";
// import { WebMidi } from "webmidi";

export default function Page() {
  return (
    <Card>
      <CardTitle className="m-2">Test</CardTitle>
      <CardContent className="m-2">
        <div id="zoomview-container"></div>
        <div id="overview-container"></div>
        <audio id="audio">
          <source src="/Sampler.mp3" type="audio/mp3" />
        </audio>
      </CardContent>
    </Card>
  );
}
