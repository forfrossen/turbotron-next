"use client";

import NavMainWithData from "@/components/nav/nav-main";
import NavProjectsWithData from "@/components/nav/nav-projects";
import NavUserWithData from "@/components/nav/nav-user";
import { TeamSwitcherWithData } from "@/components/team-switcher";
import { Subscribe } from "@react-rxjs/core";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import * as React from "react";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Subscribe>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcherWithData />
        </SidebarHeader>
        <SidebarContent>
          <NavMainWithData />
          <NavProjectsWithData />
        </SidebarContent>
        <SidebarFooter>
          <NavUserWithData />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Subscribe>
  );
}
