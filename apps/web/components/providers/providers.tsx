"use client";
import "@repo/ui/globals.css";

import {SidebarProvider} from "@repo/ui/components/sidebar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {WritableAtom} from "jotai";
import {createStore, Provider} from "jotai";
import {queryClientAtom} from "jotai-tanstack-query";
import {useHydrateAtoms} from "jotai/react/utils";
import {ThemeProvider} from "next-themes";
import {ReactNode} from "react";

const queryClient = new QueryClient();

function AtomsHydrator({
  atomValues,
  children
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  atomValues: Iterable<readonly [WritableAtom<unknown, [any], unknown>, unknown]>;
  children: ReactNode;
}) {
  useHydrateAtoms(new Map(atomValues));
  return children;
}

export const myStore = createStore();

export const Providers = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={myStore}>
        <AtomsHydrator atomValues={[[queryClientAtom, queryClient]]}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* <UserProvider />
            <TeamsProvider />
            <ProjectsProvider />
            <NavProvider /> */}
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </AtomsHydrator>
      </Provider>
    </QueryClientProvider>
  );
};
