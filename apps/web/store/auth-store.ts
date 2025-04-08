"use client;";

import { requireUserOperator } from "#store/auth-operators";
import { bind } from "@react-rxjs/core";
import type { UserSelect } from "@repo/database/types";

import { BehaviorSubject } from "rxjs";

export const user$ = new BehaviorSubject<UserSelect | null>(null);

export const userBinder = bind(user$);
export const useUser = userBinder[0];
export const useSetUser = (user: UserSelect): void => user$.next(user);

export const team$ = user$.pipe(
  requireUserOperator()
  // getTeamsForUserOperator()
);

export const teamBinder = bind(team$);
export const useTeam = teamBinder[0];
