"use client;";
import { TeamsSelect, UserSelect } from "@/node_modules/@repo/database/src/db/types";
import { bind } from "@react-rxjs/core";
import { BehaviorSubject } from "rxjs";

export const user$ = new BehaviorSubject<UserSelect | null>(null);
export const userBinder = bind(user$);

export const teams$ = new BehaviorSubject<TeamsSelect | null>(null);
export const teamsBinder = bind(teams$);

// user$.pipe(
//   requireUserOperator()
//   // getTeamsForUserOperator()
// );
