import {createWaveSurferActor} from "@/store/wavesurfer/wavesurfer.actors/create-wavesurfer";
import {setupEventListenersActor} from "@/store/wavesurfer/wavesurfer.actors/setup-event-handlers";
import {ProvidedActor} from "xstate";

export const createWaveSurferActorConfig: ProvidedActor = {
  id: "createWaveSurfer",
  logic: createWaveSurferActor,
  src: "createWaveSurferActor"
};

export const createWaveSurferActors: ProvidedActor[] = [
  {
    id: "createWaveSurfer",
    logic: createWaveSurferActor,
    src: "createWaveSurferActor"
  }
];

export const setupEventListenersActorConfig: ProvidedActor = {
  id: "setupEventListeners",
  logic: setupEventListenersActor,
  src: "setupEventListenersActor"
};

export const WsMachineActors: ProvidedActor[] = [createWaveSurferActorConfig, setupEventListenersActorConfig];

export const waveSurferMachineActorsMap = {
  createWaveSurfer: createWaveSurferActor,
  setupEventListeners: setupEventListenersActor
};

export type WsMachineActor = {
  [key in keyof typeof WsMachineActors]: (typeof WsMachineActors)[key];
};
