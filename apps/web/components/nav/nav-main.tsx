"use client";

import {ChevronRight} from "lucide-react";

import {navSectionsWithItemsAtom} from "@/store/nav/nav.atoms";
import {RenderIcon} from "@/utils/get-icon-by-name";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@repo/ui/components/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@repo/ui/components/sidebar";
import {useAtomValue} from "jotai";
import Link from "next/link";
import {withErrorBoundaryAndSuspense} from "../ErrorBoundary";

export interface NavMenuItem {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

function NavMain() {
  const menuItemsQuery = useAtomValue(navSectionsWithItemsAtom);
  const items = menuItemsQuery.data;
  if (menuItemsQuery.isLoading) return null;
  if (menuItemsQuery.isError) return null;
  if (menuItemsQuery.isSuccess && !items) return null;
  if (!items) return null;
  return (
    <>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <RenderIcon icon={item.icon} />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </>
  );
}

export default withErrorBoundaryAndSuspense(NavMain);
