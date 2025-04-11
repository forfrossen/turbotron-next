import { UserSelect } from "@repo/database/types";
import { BehaviorSubject } from "rxjs";
import { emptyUser } from "./user.default";

export const user$ = new BehaviorSubject<UserSelect>(emptyUser);
