import { useSetObservable } from "@/hooks/useSetObservable";
import { teams$, teamsBinder } from "@/store/auth-store";
import { userBinder } from "./user/user.hooks";
import { user$ } from "./user/user.state";

export const useSetUser = () => useSetObservable(user$);
export const useSetTeams = () => useSetObservable(teams$);

export const useUser = userBinder[0];
export const useTeams = teamsBinder[0];
