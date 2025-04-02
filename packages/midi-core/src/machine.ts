import { createMachine, fromPromise } from "xstate";
import { PluginTemplate } from "./plugin";

export function createPluginMachine(plugin: PluginTemplate) {
  return createMachine({
    id: plugin.id,
    initial: "idle",
    states: {
      idle: {
        on: { INIT: "initializing" },
      },
      initializing: {
        invoke: {
          src: fromPromise(() => plugin.init()),
          onDone: "ready",
          onError: "error",
        },
      },
      ready: {
        on: { EXECUTE: "executing" },
      },
      executing: {
        invoke: {
          src: fromPromise(() => plugin.execute()),
          onDone: "ready",
          onError: "error",
        },
      },
      error: {
        type: "final",
      },
    },
  });
}
