import { user$ } from "@/store/user/user.state";
import { bind } from "@react-rxjs/core";

export const userBinder = bind(user$);
