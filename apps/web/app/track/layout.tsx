import { SidebarInset } from "@repo/ui/components/sidebar";
import { TrackManager } from "#components/track-manager/track-manager";

export default function TrackLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sticky flex flex-1 flex-row gap-4">
      <TrackManager side="left" />
      <SidebarInset>{children}</SidebarInset>
    </div>
  );
}
