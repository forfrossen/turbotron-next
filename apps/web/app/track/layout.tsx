import {TrackManager} from "@/components/track-manager/track-manager";
import Transport from "@/components/transport/transport";
import {SidebarInset} from "@repo/ui/components/sidebar";

export default function TrackLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sticky flex flex-1 flex-row gap-4">
      <Transport />
      <TrackManager side="left" />
      <SidebarInset>{children}</SidebarInset>
    </div>
  );
}
