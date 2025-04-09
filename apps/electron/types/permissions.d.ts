export type ElectronPermission = | "clipboard-read"
| "media"
| "display-capture"
| "mediaKeySystem"
| "geolocation"
| "notifications"
| "midi"
| "midiSysex"
| "pointerLock"
| "fullscreen"
| "openExternal"
| "unknown"

export type ElectronPermissionSet = Set<ElectronPermission>;
export type ElectronPermissionMap = Map<string, ElectronPermissionSet>;