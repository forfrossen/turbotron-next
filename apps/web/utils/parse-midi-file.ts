import { Midi } from "@tonejs/midi";
import { of } from "rxjs";

export const parseMidiFile = (loadedMidi: ArrayBuffer) => {
  const midi = new Midi(loadedMidi);
  return of(midi);
};
