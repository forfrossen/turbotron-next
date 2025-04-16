"use client";

import {ThemeChanger} from "@/components/theme-changer/theme-changer";
import {useHumanReadableSongName} from "@/store/config-store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@repo/ui/components/breadcrumb";
import {Card} from "@repo/ui/components/card";
import {Separator} from "@repo/ui/components/separator";
import {SidebarTrigger} from "@repo/ui/components/sidebar";

export const AppHeader = () => {
  const loadedSong = useHumanReadableSongName();
  return (
    <header className="fixed z-40 top-0 flex h-16 shrink-0 w-full items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 height-[var(--header-height)]">
      <Card className="flex flex-row items-center gap-2 px-4 w-full rounded-none">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb className="grow">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Track Editing</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{loadedSong}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ThemeChanger />
      </Card>
    </header>
  );
};
