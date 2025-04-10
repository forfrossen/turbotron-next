import { BehaviorSubject } from "rxjs";

export const useSetObservable = <Type extends unknown>(observable: BehaviorSubject<Type>) => {
  return (value: Type) => observable.next(value);
};
