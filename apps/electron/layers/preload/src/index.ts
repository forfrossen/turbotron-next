/**
 * @module preload
 */
// import { electronAPI } from "@electron-toolkit/preload";
// import { contextBridge } from "electron";
// import api from "./api";
// import { sha256sum } from "/@/sha256sum";
import { exposeElectronAPI } from "@electron-toolkit/preload";

exposeElectronAPI();

// // Expose version number to renderer
// contextBridge.exposeInMainWorld("electron", { version: 0.1 });

// /**
//  * The "Main World" is the JavaScript context that your main renderer code runs in.
//  * By default, the page you load in your renderer executes code in this world.
//  *
//  * @see https://www.electronjs.org/docs/api/context-bridge
//  */

// /**
//  * After analyzing the `exposeInMainWorld` calls,
//  * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
//  * It contains all interfaces.
//  * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `renderer`
//  *
//  * @see https://github.com/cawa-93/dts-for-context-bridge
//  */

// /**
//  * Safe expose node.js API
//  * @example
//  * window.nodeCrypto('data')
//  */
// contextBridge.exposeInMainWorld("nodeCrypto", { sha256sum });
// const crypto = require("node:crypto");
// contextBridge.exposeInMainWorld("nodeCrypto", {
//   sha256sum(data) {
//     const hash = crypto.createHash("sha256");
//     hash.update(data);
//     return hash.digest("hex");
//   },
// });

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld("electron", electronAPI);
//     contextBridge.exposeInMainWorld("api", api);
//   } catch (error) {
//     console.error(error);
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI;
//   // @ts-ignore (define in dts)
//   window.api = api;
// }
