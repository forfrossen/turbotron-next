"use client";

import { ChevronRight } from "lucide-react";

import { navSectionsWithItems } from "@/store";
import { RenderIcon } from "@/utils/get-icon-by-name";
import { useSignals } from "@preact/signals-react/runtime";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@repo/ui/components/sidebar";
import Link from "next/link";
import { Component, ErrorInfo, ReactNode, Suspense } from "react";

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

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

const NavMainWithData = () => {
  // useAsyncActionToObservable(getNavSectionsWithItems, navItems$);
  // const menuItems = useNavItems();
  useSignals();

  const menuItems = navSectionsWithItems.value;

  return (
    <ErrorBoundary fallback={<div>Error loading menu</div>}>
      <NavMain items={menuItems} />
      <Suspense fallback={<div>Loading...</div>}>
        <NavMain items={menuItems} />;
      </Suspense>
    </ErrorBoundary>
  );
};

function NavMain({ items }: { items: NavMenuItem[] }) {
  if (!items?.length) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
    </SidebarGroup>
  );
}

export default NavMainWithData;
