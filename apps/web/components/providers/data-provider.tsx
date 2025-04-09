"use client";
import { useIsMounted } from "@/hooks/useIsMounted.tsx";
import { useSetTeams, useSetUser } from "@/store/useAuthStore";
import { TeamsSelect, UserSelect } from "@repo/database/";
import { use, useEffect } from "react";

type DataProviderProps = {
  children: React.ReactNode;
  teamsPromise: Promise<TeamsSelect[]>;
  userPromise: Promise<UserSelect>;
  navSectionsPromise: Promise<NavSectionsSelect>;
  projectsPromise: Promise<ProjectsSelect>;
  // data: {
  //   user?: UserSelect;
  //   teams?: TeamSelect[];
  // };
};

export default function DataProvider({ children, teamsPromise, userPromise }: DataProviderProps) {
  const isMounted = useIsMounted();
  const userData = use(userPromise);
  const teamsData = use(teamsPromise);
  const setUser = useSetUser();
  const setTeams = useSetTeams();

  useEffect(() => {
    if (userData) {
      console.log("userData", userData);
      setUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (teamsData) {
      console.log("teamsData", teamsData);
      setTeams(teamsData);
    }
  }, [teamsData]);

  return <>{children}</>;
}
