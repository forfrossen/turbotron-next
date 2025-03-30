// Main process ipc events
type IpcEvents =
  | {
      ping: [string]; // listener event map
    }
  | {
      "say-hello": () => string; // handler event map
    };

//Renderer ipc events
type IpcRendererEvent = {
  ready: [boolean];
};
