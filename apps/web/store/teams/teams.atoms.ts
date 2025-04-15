import { getTeamsByUserId } from "@/data/teams/get-teams-by-user-id";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { userIdAtom } from "../user/user.atoms";

export const teamByUserAtom = atomWithQuery( ( get ) => ( {
	queryKey: [ "teamsByUser" ],
	queryFn: async () => {
		const userId = get( userIdAtom );
		if ( !userId ) return [];
		return await getTeamsByUserId( userId );
	},
} ) );

export const teamIdsByUserAtom = atom( ( get ) => {
	const teams = get( teamByUserAtom );
	if ( teams.isLoading ) return [];
	if ( teams.isError ) return [];
	return teams.data?.map( ( team ) => team.id ) ?? [];
} )