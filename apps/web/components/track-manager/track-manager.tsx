"use client";
import { Subscribe } from "@react-rxjs/core";
import { Sidebar, SidebarContent, SidebarFooter } from "@repo/ui/components/sidebar";
import { PluginItem } from "@repo/web/components/track-manager/plugin-item";

type Props = {};

export const TrackManager = (props: Props & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar className="sticky z-100 border-l" {...props}>
      {/* <SidebarHeader></SidebarHeader> */}
      <SidebarContent className="flex flex-col gap-2">
        <Subscribe>
          <PluginItem personName="Master Track" pluginType="Audio" />
          <PluginItem personName="Basti" pluginType="Kemper" />
        </Subscribe>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
