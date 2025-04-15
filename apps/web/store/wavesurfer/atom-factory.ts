import { atomWithObservable } from 'jotai/utils';
import type { Observable, OperatorFunction } from 'rxjs';


/**
 * Factory class for creating Jōtai atoms from RxJS observables.
 * @class AtomFactory {
 * Creates a new Jōtai atom from an RxJS observable with optional operators.
 * @template T - The type of value emitted by the source observable
 * @template R - The resulting type after operators are applied (defaults to T)
 * @param source$ - The source RxJS observable
 * @param pipedOperators - RxJS operators to transform the source observable gathered in one pipe
 * @returns A Jōtai atom that updates with the observable's values
 */
export class AtomFactory {
  createAtom<T, R = T>(
    source$: Observable<T>,
    pipedOperators?: OperatorFunction<T, unknown>
  ) {
    const observable$ = pipedOperators?.length ? source$.pipe( pipedOperators ) : source$;
    return atomWithObservable( () => observable$ )
  }
}
