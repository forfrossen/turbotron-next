"use client";
import "@repo/ui/globals.css";

import { NavProvider } from "@/components/providers/nav/nav-provider";
import { ProjectsProvider } from "@/components/providers/projects/projects-provider";
import { TeamsProvider } from "@/components/providers/teams/teams-provider";
import { UserProvider } from "@/components/providers/user/user-provider";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { ThemeProvider } from "next-themes";

export const Providers = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <UserProvider />
      <TeamsProvider />
      <ProjectsProvider />
      <NavProvider />
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
};
