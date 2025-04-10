"use client;";
import { TeamsSelect, UserSelect } from "@/node_modules/@repo/database/src/db/types";
import { emptyTeams, emptyUser } from "@/store/models/auth.models";
import { bind } from "@react-rxjs/core";
import { BehaviorSubject } from "rxjs";

export const user$ = new BehaviorSubject<UserSelect>(emptyUser);
export const userBinder = bind(user$);

export const teams$ = new BehaviorSubject<TeamsSelect[]>(emptyTeams);
export const teamsBinder = bind(teams$);

// user$.pipe(
//   requireUserOperator()
//   // getTeamsForUserOperator()
// );
