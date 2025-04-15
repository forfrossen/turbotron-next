import { myStore } from '@/components/providers/providers';
import { Atom } from 'jotai';
import { Observable } from 'rxjs';
import { AtomFactory } from './atom-factory';
import { WaveSurferObservableFactory } from './wavesurfer.rxjs-faccory';
import { wavesurferAtom } from './wavesurfer.state';

export const allWaveSurferEvents = [
  'play',
  'pause',
  'ready',
  'region-created',
  'region-updated',
  'audioprocess',
  'interaction',
  'loading',
  'finish',
] as const

export const createWaveSurferEvent$ = ( event: string ) => new Observable<any>()

export const waveSurferEvents$ = Object.fromEntries(
  allWaveSurferEvents.map( ( event ) => [ event, createWaveSurferEvent$( event ) ] )
) as Record<typeof allWaveSurferEvents[ number ], Observable<any> | Atom<unknown>>

const wavesurfer = myStore.get( wavesurferAtom );
const atomFactory = new AtomFactory();
const wsFactory = new WaveSurferObservableFactory();
waveSurferEvents$.play = atomFactory.createAtom( wsFactory.getEventObservable( "play", () => wavesurfer ) );
const onReadyAtom = atomFactory.createAtom( wsFactory.getEventObservable( "ready", () => wavesurfer ) );
