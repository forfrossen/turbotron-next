import { isPlaying$ } from "@/store/transport-store";
import { useSetObservable } from "@/store/useAuthStore";

export const useSetIsPlaying = useSetObservable(isPlaying$);
