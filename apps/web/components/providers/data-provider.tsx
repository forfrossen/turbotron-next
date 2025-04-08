"use client";

import { useIsMounted } from "#hooks/useIsMounted";
import { TeamSelect, UserSelect } from "#node_modules/@repo/database/src/db/types";
import { userBinder } from "#store/auth-store";
type DataProviderProps = {
  children: React.ReactNode;
  data: {
    user?: UserSelect;
    teams?: TeamSelect[];
  };
};

export default function DataProvider({ children }: DataProviderProps) {
  const [user, setUser] = userBinder;
  const isMounted = useIsMounted();

  return <>{children}</>;
}
