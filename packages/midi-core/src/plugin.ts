import { Observable, Subject } from "rxjs";
import { assign, createActor, setup } from "xstate";
import { PluginFunction } from "./function";

type EventPayload = { type: string; payload?: unknown };
export class Plugin {
  public readonly id: string;
  private functions: PluginFunction[] = [];
  private eventBus = new Subject<{ type: string; payload?: unknown }>();
  public state$: Observable<string>;

  private actor;

  constructor(id: string) {
    this.id = id;

    const machine = setup({
      types: {
        context: {} as { count: number },
        events: {} as { type: "inc" } | { type: "dec" },
      },
      actions: {
        increment: assign({
          count: ({ context }) => context.count + 1,
        }),

        decrement: assign({
          count: ({ context }) => context.count - 1,
        }),
      },
    }).createMachine({
      context: { count: 0 },
      id: this.id,
      on: {
        inc: { actions: "increment" },
        dec: { actions: "decrement" },
      },
    });

    this.actor = createActor(machine).start();

    this.actor.subscribe((state) => {
      console.log(state.context.count);
    });

    // XState-State in einen RxJS-Observable mappen
    // this.state$ = new Observable<string>((observer) => {
    //   observer.next(this.actor.state.value.toString());
    //   const sub = this.actor.subscribe((state) =>
    //     observer.next(state.value.toString())
    //   );
    //   return () => sub.unsubscribe();
    // });
    this.state$ = fromActor(this.actor);

    this.state$.subscribe((state) => {
      console.log("context.count:", state);
    });
  }
}
