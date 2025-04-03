import { BrowserWindow } from "electron";
import { join } from "path";

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    backgroundColor: "#000",
    titleBarStyle: "default",
    title: "Electron React App",
    frame: true,
    fullscreen: true,
    webPreferences: {
      enableBlinkFeatures: "Midi, MidiSysex", // Enable Web MIDI API
      contextIsolation: true,
      nodeIntegration: true,
      zoomFactor: 0,
      webviewTag: false,
      preload: join(__dirname, "../../preload/dist/index.cjs"),
    },
  });

  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : "https://yerba.ping.gg";

      browserWindow.webContents.session.setPermissionCheckHandler(
        (webContents, permission, requestingOrigin) => {
          console.log(`Permission check for: ${permission}, Origin: ${requestingOrigin}`);

          if (permission === "midi" || permission === "midiSysex") {
            console.log("Permission granted for MIDI access.");
            return true;
          }
          console.log("Permission denied for:", permission);
          return false;
        },
      );

      browserWindow.webContents.session.setPermissionRequestHandler(
        (webContents, permission, callback, details) => {
          console.log(`Permission request for: ${permission}, Details:`, details);

          if (permission === "midi" || permission === "midiSysex") {
            console.log("Permission granted for MIDI access.");
            callback(true);
          } else {
            console.log("Permission denied for:", permission);
            callback(false);
          }
        },
      );

  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
