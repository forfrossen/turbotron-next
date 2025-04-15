"use client";

import {Folder, Forward, MoreHorizontal, Trash2} from "lucide-react";

import {projectsByUserAndTeamsAtom} from "@/store/projects/projects.atoms";
import {RenderIcon} from "@/utils/get-icon-by-name";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@repo/ui/components/sidebar";
import {useAtomValue} from "jotai";
import Link from "next/link";
import {Suspense} from "react";
import {ErrorBoundary, withErrorBoundaryAndSuspense} from "../ErrorBoundary";

export type NavMenuProjects = {
  name: string;
  url: string;
  icon: string;
}[];

const NavProjectsWithData = () => {
  return (
    <ErrorBoundary fallback={<div>Error loading menu</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <NavProjects />
      </Suspense>
    </ErrorBoundary>
  );
};

function NavProjects() {
  const {isMobile} = useSidebar();
  const projectsQuery = useAtomValue(projectsByUserAndTeamsAtom);
  const projects = projectsQuery.data as NavMenuProjects;
  if (!projects) return null;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <RenderIcon icon={item.icon} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default withErrorBoundaryAndSuspense(NavProjects);
