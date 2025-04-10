import { useIsMounted } from "@/hooks/useIsMounted";
import { useSetObservable } from "@/hooks/useSetObservable";
import { useEffect } from "react";
import { BehaviorSubject } from "rxjs";

/**
 * A reusable React hook that executes a Next.js async server action and pushes the result into the next value of a provided observable.
 * @param asyncAction - The async server action to execute.
 * @param observable$ - The observable to push the result into.
 */
export function useAsyncActionToObservable<T>(asyncAction: () => Promise<T>, observable$: BehaviorSubject<T>) {
  const isMounted = useIsMounted();
  const setData = useSetObservable(observable$);

  useEffect(() => {
    if (!isMounted) return;

    asyncAction().then((result) => {
      setData(result);
    });
  }, [isMounted]);
}
