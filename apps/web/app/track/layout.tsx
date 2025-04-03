import { TrackManager } from "@repo/web/components/track-manager/track-manager";

export default function TrackLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-row gap-4">
      <TrackManager side="left" />
      {children}
      {/* <Transport /> */}
    </div>
  );
}
