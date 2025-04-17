import {atomWithMachine} from 'jotai-xstate';
import {setup} from 'xstate';

export interface TransportContext {
	error?: string;
}

export type TransportEvent =
	| {type: 'LOADING'}
	| {type: 'READY'}
	| {type: 'PLAY'}
	| {type: 'PAUSE'}
	| {type: 'FINISH'}
	| {type: 'ERROR'; error: string};

export const createTransportMachine = () => setup({
	types: {
		context: {} as TransportContext,
		events: {} as TransportEvent,
	},
	actions: {
		assignError: ({context, event}) => {
			context.error = event.type === 'ERROR' ? event.error : undefined;
		},
		clearError: ({context}) => {
			context.error = undefined;
		},
		play: ({context}) => {
			// Handle play action here
			console.log('Playing...');
		},
		pause: ({context}) => {
			// Handle pause action here
			console.log('Paused...');
		},
	},
}).createMachine({
	id: 'transport',
	initial: 'loading',
	context: {
		error: undefined,
	},
	states: {
		loading: {
			on: {
				READY: 'ready',
				ERROR: {
					target: 'error',
					actions: 'assignError',
				},
			},
		},
		ready: {
			on: {
				PLAY: 'playing',
				LOADING: 'loading',
				ERROR: {
					target: 'error',
					actions: 'assignError',
				},
			},
		},
		playing: {
			on: {
				PAUSE: 'paused',
				STOP: 'ready',
				FINISH: 'ready',
				ERROR: {
					target: 'error',
					actions: 'assignError',
				},
			},
		},
		paused: {
			on: {
				PLAY: 'playing',
				STOP: 'ready',
				ERROR: {
					target: 'error',
					actions: 'assignError',
				},
			},
		},
		error: {
			on: {
				LOADING: {
					target: 'loading',
					actions: 'clearError',
				},
			},
		},
	},
});

export const transportMachineAtom = atomWithMachine((get) => {
	return createTransportMachine()
});