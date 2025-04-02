// pluginFactory.ts
import { createActor } from "xstate";
import { PluginFunction } from "./function";
import { createPluginMachine } from "./machine";
import { PluginTemplate } from "./plugin";
import { PluginContext } from "./types/types";

type PluginFactoryParams<T extends PluginTemplate> = {
  context: PluginContext;
  functions: PluginFunction[];
  PluginClass: new (ctx: PluginContext, actor: any) => T;
};

export function createPlugin<T extends PluginTemplate>({
  context,
  functions,
  PluginClass,
}: PluginFactoryParams<T>): T {
  const plugin = new PluginClass(context, null as any);
  const machine = createPluginMachine(plugin);
  const actor = createActor(machine);
  const fullPlugin = new PluginClass(context, actor);
  functions.forEach((fn) => fullPlugin.addFunction(fn));

  return fullPlugin;
}
