import { myStore } from '@/components/providers/providers';
import { fromEventPattern, Observable } from 'rxjs';
import type WaveSurfer from 'wavesurfer.js';
import { WaveSurferEvents } from 'wavesurfer.js';
import { wavesurferAtom } from './wavesurfer.state';

export class WaveSurferObservableFactory {
  private cache = new Map<string, Observable<any>>();
  private wavesurfer: WaveSurfer | null = null;
  constructor() {
    this.wavesurfer = myStore.get( wavesurferAtom )
  }

  getEventObservable<T>( event: keyof WaveSurferEvents, extractor: ( ...args: any[] ) => T ): Observable<T> {
    const key = event;
    if ( !this.cache.has( key ) ) {
      const obs = fromEventPattern<T>(
        ( handler ) => this.wavesurfer?.on( event, handler ),
        ( handler ) => this.wavesurfer?.un( event, handler ),
        ( ...args: any[] ) => extractor( ...args ),
      );
      this.cache.set( key, obs );
    }
    return this.cache.get( key )!;
  }
}
