import { atom } from "jotai";

export const visibilityAtom = atom<boolean>(false);
visibilityAtom.debugLabel = "Visibility";
