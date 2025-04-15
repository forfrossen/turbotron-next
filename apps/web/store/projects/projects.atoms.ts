import { getProjectsByUserAndTeams } from "@/data/projects/get-projects-by-user-id";
import { atomWithQuery } from "jotai-tanstack-query";
import { teamIdsByUserAtom } from "../teams/teams.atoms";
import { userIdAtom } from "../user/user.atoms";

export const projectsByUserAndTeamsAtom = atomWithQuery( ( get ) => ( {
	queryKey: [ "projectsByUserAndTeams" ],
	queryFn: async () => {
		const userId = get( userIdAtom );
		if ( !userId ) return [];
		const teamIds = get( teamIdsByUserAtom );
		if ( teamIds.length === 0 ) return [];

		return await getProjectsByUserAndTeams( userId, teamIds );
	},
} ) );