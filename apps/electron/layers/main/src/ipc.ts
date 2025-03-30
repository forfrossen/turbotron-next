import { IpcEmitter, IpcListener } from "@electron-toolkit/typed-ipc/main";

const ipc = new IpcListener<IpcEvents>();

const emitter = new IpcEmitter<IpcRendererEvent>();

ipc.on("ping", (e, arg) => {
  console.log(arg);
  emitter.send(e.sender, "ready", true);
});

ipc.handle("say-hello", () => {
  return "hello";
});
