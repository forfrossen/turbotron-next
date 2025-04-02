import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import { PluginItem } from "@repo/web/components/track-manager/plugin-item";

type Props = {};

export const TrackManager = (props: Props & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar className="sticky hidden lg:flex top-0 h-svh border-l" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <PluginItem personName="Master Track" pluginType="Audio" />
        <PluginItem personName="Basti" pluginType="Kemper" />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
