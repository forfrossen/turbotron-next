"use client";

import { NavMain } from "#components/nav/nav-main";
import { NavProjects } from "#components/nav/nav-projects";
import { NavUser, NavMenuUser } from "#components/nav/nav-user";
import { SidebarData } from "#components/sidebar/sidebar-data-provider";
import { TeamSwitcher } from "#components/team-switcher";
import { Subscribe } from "@react-rxjs/core";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import * as React from "react";
import { useUser } from "store/auth-store.js";

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

export default WithSubscribe(AppSidebar);

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg"
//   },
// teams: [
//   {
//     name: "Acme Inc",
//     logo: GalleryVerticalEnd,
//     plan: "Enterprise"
//   },
//   {
//     name: "Acme Corp.",
//     logo: AudioWaveform,
//     plan: "Startup"
//   },
//   {
//     name: "Evil Corp.",
//     logo: Command,
//     plan: "Free"
//   }
// ],
//   navMain: [
//     {
//       title: "Scraper",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "Home",
//           url: "/"
//         },
//         {
//           title: "Player",
//           url: "/track"
//         },
//         {
//           title: "Status",
//           url: "status"
//         },
//         {
//           title: "BullBoard",
//           url: "/api/queues"
//         },
//         {
//           title: "Config",
//           url: "config"
//         }
//       ]
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#"
//         },
//         {
//           title: "Explorer",
//           url: "#"
//         },
//         {
//           title: "Quantum",
//           url: "#"
//         }
//       ]
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#"
//         },
//         {
//           title: "Get Started",
//           url: "#"
//         },
//         {
//           title: "Tutorials",
//           url: "#"
//         },
//         {
//           title: "Changelog",
//           url: "#"
//         }
//       ]
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#"
//         },
//         {
//           title: "Team",
//           url: "#"
//         },
//         {
//           title: "Billing",
//           url: "#"
//         },
//         {
//           title: "Limits",
//           url: "#"
//         }
//       ]
//     }
//   ],
//   projects: [
//     {
//       name: "Storybook",
//       url: "http://localhost:6006",
//       icon: Frame
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map
//     }
//   ]
// };
