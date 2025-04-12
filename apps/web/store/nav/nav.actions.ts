import { navSectionsSignal } from "@/store/nav/nav.state";

export const resetNavSections = () => {
  navSectionsSignal.value = [];
};

export const resetNavItems = () => {
  navSectionsSignal.value = [];
};
