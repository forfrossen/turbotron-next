import { TrackManager } from "@repo/web/components/track-manager/track-manager";

export default function TrackLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TrackManager side="left" />
      {children}
    </>
  );
}
