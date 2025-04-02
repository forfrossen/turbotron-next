import { subscribeToMidiData } from "@repo/web/store/MidiStore";
import { Midi } from "@tonejs/midi";
import React from "react";
import { BehaviorSubject, interval, of, Subscription } from "rxjs";
import { switchMap, takeWhile } from "rxjs/operators";
import { WebMidi } from "webmidi";

const isPlaying$ = new BehaviorSubject<boolean>(false);

const MidiScheduler: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  React.useEffect(() => {
    isPlaying$.next(isPlaying);

    let subscription: Subscription | null = null;

    WebMidi.enable()
      .then(() => {
        const output = WebMidi.outputs[0];
        if (!output) {
          console.error("No MIDI output device found.");
          return;
        }

        const startTime = performance.now();
        let midiData: Midi | null = null;

        const unsubscribeMidi = subscribeToMidiData((data) => {
          midiData = data;
        });

        subscription = interval(10)
          .pipe(
            switchMap(() => {
              if (!midiData || !isPlaying$.getValue()) return of(null);

              const currentTime = (performance.now() - startTime) / 1000; // Convert to seconds
              return of({ midiData, currentTime });
            }),
            takeWhile((data) => data !== null)
          )
          .subscribe((data) => {
            if (!data) return;

            const { midiData, currentTime } = data;
            midiData.tracks.forEach((track) => {
              track.notes.forEach((note) => {
                if (note.time >= currentTime && note.time < currentTime + 0.01) {
                  output.playNote(note.name, { duration: note.duration * 1000 });
                }
              });
            });
          });
      })
      .catch((err) => {
        console.error("Web MIDI API could not be enabled:", err);
      });

    return () => {
      subscription?.unsubscribe();
      WebMidi.disable();
    };
  }, [isPlaying]);

  return null;
};

export default MidiScheduler;
