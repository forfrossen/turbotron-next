// core/types.ts
export interface PluginContext {
  config: Record<string, unknown>;
  logger: { log: (msg: string) => void };
  // add other shared services here
}

export interface Plugin {
  id: string;
  init(ctx: PluginContext): Promise<void> | void;
  execute(...args: unknown[]): unknown;
  dispose?(): void;
}
