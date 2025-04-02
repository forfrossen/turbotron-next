import { PluginContext } from "../types/types";

export abstract class PluginFunction {
  abstract readonly id: string;

  init?(ctx: PluginContext): Promise<void> | void;
  execute?(...args: unknown[]): unknown;
  dispose?(): void;
}
