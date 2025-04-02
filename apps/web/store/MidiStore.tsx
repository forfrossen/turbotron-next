import { Midi } from "@tonejs/midi";
import { BehaviorSubject } from "rxjs";

const midiSubject = new BehaviorSubject<Midi | null>(null);

export const setMidiData = (data: Midi): void => {
  midiSubject.next(data);
};

export const getMidiData = (): Midi | null => {
  return midiSubject.getValue();
};

export const subscribeToMidiData = (callback: (data: Midi | null) => void): (() => void) => {
  const subscription = midiSubject.subscribe(callback);
  return () => subscription.unsubscribe();
};
