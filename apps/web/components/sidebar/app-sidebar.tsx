"use client";

import { NavMain } from "@/components/nav/nav-main";
import { NavProjects } from "@/components/nav/nav-projects";
import { NavMenuUser, NavUser } from "@/components/nav/nav-user";
import { getTeamsOfUser } from "@/components/sidebar/data/get-sidebar-data";
import { SidebarData } from "@/components/sidebar/sidebar-data-provider";
import { TeamSwitcher } from "@/components/team-switcher";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useSetTeams, useSetUser } from "@/store/useAuthStore";
import { Subscribe } from "@react-rxjs/core";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import * as React from "react";
import { useEffect } from "react";

export function WithSubscribe<T extends React.ComponentType<any>>(Component: T): React.FC<React.ComponentProps<T>> {
  return function WrappedComponent(props: any) {
    return (
      <Subscribe>
        <Component {...props} />
      </Subscribe>
    );
  };
}

function AppSidebar({ data, ...props }: { data: SidebarData } & React.ComponentProps<typeof Sidebar>) {
  const { teams, navMain, projects, user } = data;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{teams.length && <TeamSwitcher teams={teams} />}</SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as NavMenuUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function AppSidebar2({ props }: React.ComponentProps<typeof Sidebar>) {
  const userId = 1;
  // const userData = use(getUserById(userId));
  const isMounted = useIsMounted();
  const setUser = useSetUser();
  const setTeams = useSetTeams();

  useEffect(() => {
    if (!isMounted) return;
    getUserById(userId).then(setUser);
    getTeamsOfUser(userId).then(setTeams);
  }, [isMounted, setUser, setTeams]);

  // useEffect(() => {
  //   if (userData) {
  //     console.log("userData", userData);
  //     setUser(userData);
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   if (teamsData) {
  //     console.log("teamsData", teamsData);
  //     setTeams(teamsData);
  //   }
  // }, [teamsData]);

  return (
    <Subscribe>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>{teams.length && <TeamSwitcher teams={teams} />}</SidebarHeader>
        <SidebarContent>
          <NavMain items={navMain} />
          <NavProjects projects={projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user as NavMenuUser} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Subscribe>
  );
}

export default WithSubscribe(AppSidebar);
