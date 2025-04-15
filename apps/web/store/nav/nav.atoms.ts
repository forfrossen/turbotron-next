import { getNavSectionsWithItems } from "@/data/nav/get-nav-sections-with-items";
import { atomWithQuery } from "jotai-tanstack-query";

export const navSectionsWithItemsAtom = atomWithQuery( () => ( {
	queryKey: [ "navSectionsWithItems" ],
	queryFn: async () => {
		return await getNavSectionsWithItems();
	},
} ) );