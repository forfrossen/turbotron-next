"use client";
import "@repo/ui/globals.css";

import { SidebarProvider } from "@repo/ui/components/sidebar";
import { JotaiStoreProvider } from "@repo/web/components/providers/jotai-store-provider";
import { ThemeProvider } from "next-themes";

export const Providers = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <JotaiStoreProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </JotaiStoreProvider>
    </ThemeProvider>
  );
};
