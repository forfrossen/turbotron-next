import { NavMenuItem } from "@/components/nav/nav-main";
import { computed, signal } from "@preact/signals-react";
import { NavItemsSelect, NavMainSelect } from "@repo/database/types";

export const navSectionsSignal = signal<NavMainSelect[]>([]);
export const navItemsSignal = signal<NavItemsSelect[]>([]);

export const navSectionsWithItems = computed(() => {
  return navSectionsSignal.value.map((section) => {
    const items = navItemsSignal.value.filter((item) => item.navMainId === section.id);
    return { ...section, items } as NavMenuItem;
  });
});
