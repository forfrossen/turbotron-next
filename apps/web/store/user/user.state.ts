import { Signal, signal } from "@preact/signals-react";
import { UserSelect } from "@repo/database/types";
import { defaultUser } from "./user.default";

// export const user$ = new BehaviorSubject<UserSelect>(emptyUser);
export const userIdSignal: Signal<UserSelect["id"]> = signal(1);
export const userSignal: Signal<UserSelect> = signal(defaultUser);
