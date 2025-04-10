"use client";

import { NavMainWithData } from "@/components/nav/nav-main";
import { NavProjectsWithData } from "@/components/nav/nav-projects";
import { NavUserWithData } from "@/components/nav/nav-user";
import { getTeamsOfUser, getUserById } from "@/components/sidebar/data/get-sidebar-data";
import { TeamSwitcherWithData } from "@/components/team-switcher";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useSetTeams, useSetUser } from "@/store/useAuthStore";
import { Subscribe } from "@react-rxjs/core";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import * as React from "react";
import { useEffect } from "react";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const userId = 1;
  const isMounted = useIsMounted();

  const setUser = useSetUser();
  const setTeams = useSetTeams();

  useEffect(() => {
    if (!isMounted) return;
    getUserById(userId).then(setUser);
    getTeamsOfUser(userId).then(setTeams);
  }, [isMounted, setUser, setTeams]);

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
