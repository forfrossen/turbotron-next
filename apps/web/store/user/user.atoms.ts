import { getUserById } from "@/data/user/get-user-by-id";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

export const userIdAtom = atom<number>( 1 );

export const userAtom = atomWithQuery( ( get ) => ( {
	queryKey: [ "user" ],
	queryFn: async () => {
		const userId = get( userIdAtom );
		return await getUserById( userId );
	},
} ) );