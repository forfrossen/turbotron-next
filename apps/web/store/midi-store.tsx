import { bind } from "@react-rxjs/core";
import { Midi } from "@tonejs/midi";
import { BehaviorSubject } from "rxjs";

export const midiSubject$ = new BehaviorSubject<Midi | null>(null);

export const midiDataBinder = bind(midiSubject$, null);
export const useMidiData = midiDataBinder[0];

export const setMidiData = (data: Midi): void => {
  if (!data) {
    console.error("Invalid MIDI data:", data);
    return;
  }
  console.log("Setting MIDI data:", data);
  midiSubject$.next(data);
};

export const subscribeToMidiData = (callback: (data: Midi | null) => void): (() => void) => {
  const subscription = midiSubject$.subscribe(callback);
  return () => subscription.unsubscribe();
};
