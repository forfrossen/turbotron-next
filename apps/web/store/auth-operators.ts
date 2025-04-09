// export const getTeamsForUserOperator = <T extends UserSelect>() =>
//   switchMap((user: T) => from(getTeamsForUser(user.id)));

import { UserSelect } from "@/node_modules/@repo/database/src/db/types";
import { of, switchMap, throwError } from "rxjs";

export const requireUserOperator = <T extends UserSelect | null>() =>
  switchMap((user: T) => (user ? of(user) : throwError(() => new Error("No user"))));
