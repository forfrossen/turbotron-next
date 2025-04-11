"use client;";
import { TeamsSelect } from "@/node_modules/@repo/database/src/db/types";
import { emptyTeams } from "@/store/models/auth.models";
import { bind } from "@react-rxjs/core";
import { BehaviorSubject } from "rxjs";

export const teams$ = new BehaviorSubject<TeamsSelect[]>(emptyTeams);
export const teamsBinder = bind(teams$);

// user$.pipe(
//   requireUserOperator()
//   // getTeamsForUserOperator()
// );
