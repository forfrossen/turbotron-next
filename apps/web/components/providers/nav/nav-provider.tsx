import { getNavItemsBySection } from "@/components/providers/nav/get-nav-items-by-section";
import { getNavSections } from "@/components/providers/nav/get-nav-sections";
import { navItemsSignal, navSectionsSignal } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { isEqual, isNil } from "lodash";
import { useEffect } from "react";

export const NavProvider = () => {
  useSignals();

  async function getSections() {
    const sections = await getNavSections();
    console.log(`Fetching nav sections data...`);

    if (!navSectionsSignal.value) {
      console.log(`Nav sections signal is empty, resetting nav sections.`);
      navSectionsSignal.value = [];
      return;
    }

    if (!sections || sections.length === 0 || isNil(sections)) {
      console.log(`Nav sections data is null or undefined, not updating, resetting nav sections.`);
      navSectionsSignal.value = [];
      return;
    }

    if (isEqual(navSectionsSignal.value, sections)) {
      console.log(`Nav sections data is equal to the current signal value, not updating.`);
      return;
    }

    console.log(`Nav sections data is different, updating the signal value.`);
    navSectionsSignal.value = sections;
  }

  async function getNavItems() {
    if (!navSectionsSignal.value || isNil(navSectionsSignal.value) || navSectionsSignal.value.length === 0) {
      console.log(`Nav sections signal is empty. No point in fetching nav items.`);
      return;
    }

    navSectionsSignal.value.forEach(async (section) => {
      const sections = await getNavItemsBySection(section.id);
      console.log(`Fetching nav items of section ${section.title}...`);

      if (!sections || sections.length === 0 || isNil(sections)) {
        console.log(`Nav items data is null or undefined`);
        return;
      }

      if (isEqual(navItemsSignal.value, sections)) {
        console.log(`Nav items data is equal to the current signal value, not updating.`);
        return;
      }

      console.log(`Nav items data is different, updating the signal value.`);
      navItemsSignal.value = [...navItemsSignal.value, ...sections];
    });
  }

  useEffect(() => {
    getSections();
  }, []);

  useEffect(() => {
    getNavItems();
  }, [navSectionsSignal.value]);

  return null;
};
