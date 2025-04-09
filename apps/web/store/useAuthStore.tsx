import { teams$, teamsBinder, user$, userBinder } from "@/store/auth-store";
import { BehaviorSubject } from "rxjs";

export const useSetUser = () => useSetObservable(user$);
export const useSetTeams = () => useSetObservable(teams$);

export const useUser = userBinder[0];
export const useTeams = teamsBinder[0];

export const useSetObservable = <Type extends unknown>(observable: BehaviorSubject<Type>) => {
  return (value: Type) => observable.next(value);
};
