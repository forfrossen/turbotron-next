import {ActionFunction, MachineContext} from 'xstate';
import {InternalEvents, WaveSurferEvent, WaveSurferEventPayloads} from './wavesurfer.machine.events';

type InternalEventHandlers<TContext extends MachineContext> = {
	[ K in keyof WaveSurferEventPayloads as K extends keyof typeof InternalEvents ? K : never ]?: ActionFunction<TContext, Extract<WaveSurferEvent, {type: K}>, any, any, any, any, any, any, any>;
};

export const createInternalHandlers = <TContext extends MachineContext>(
	handlers: InternalEventHandlers<TContext>
) => {
	return Object.entries(handlers).reduce((acc, [ key, fn ]) => {
		acc[ key ] = {actions: fn!};
		return acc;
	}, {} as Record<string, {actions: ActionFunction<TContext, any, any, any, any, any, any, any, any>}>);
};