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
      zoomFactor: 2,
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
      console.log("Permission check:", permission);

      if (permission === "midi" || permission === "midiSysex") {
        return true;
      }

      return false;
    },
  );

  browserWindow.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback, details) => {
      console.log("Permission request:", permission);

      if (permission === "midi" || permission === "midiSysex") {
        callback(true);
      } else {
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
