export interface Initializable {
  init(): Promise<void> | void;
}

export interface Executable {
  execute(...args: unknown[]): unknown;
}

export interface Disposable {
  dispose(): void;
}

export interface Startable {
  start(): void;
}

export interface Stoppable {
  stop(): void;
}
