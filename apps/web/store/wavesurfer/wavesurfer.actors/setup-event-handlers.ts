import {trackHeight$} from "@/store/config-store";
import {WsMachineContext} from "@/store/wavesurfer/wavesurfer.machine";
import {waveSurferMachineEvents, waveSurferUserEvents} from "@/store/wavesurfer/wavesurfer.machine.events";
import {assertExists} from "@/utils/assert";
import {parseHeight} from "@/utils/parse-height";
import {throttle} from "lodash";
import WaveSurfer, {WaveSurferEvents} from "wavesurfer.js";
import {AnyEventObject, EventObject, fromCallback} from "xstate";

const debugWsEventHandler = (event: string, ...args: any[]) => console.debug(`[WaveSurfer Event] ${event}`, ...args);

const machineEventFnFactory = (wsEvent: keyof WaveSurferEvents) =>
  waveSurferMachineEvents[wsEvent as keyof typeof waveSurferMachineEvents];

export const setupEventListeners = ({
  sendBack,
  receive,
  input
}: {
  sendBack: (event: AnyEventObject) => void;
  receive: unknown;
  input: {context: WsMachineContext};
}) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const ws = input.context.waveSurfer;
  assertExists(ws);

  const cleanup = (wavesurfer: WaveSurfer, eventHandlerMap: Map<keyof WaveSurferEvents, (...args: any) => void>) => {
    if (!wavesurfer) {
      console.debug("[ERROR] WaveSurfer instance is null");
      return;
    }
    console.debug("[INFO] Cleaning up WaveSurfer instance");
    eventHandlerMap.forEach((_, event) => {
      wavesurfer.un(event, eventHandlerMap.get(event)!);
    });

    trackHeight$.unsubscribe();
  };

  console.log(`[initializeWaveSurfer] input:`, input);
  const ctx = input.context;

  try {
    assertExists(ctx);
    assertExists(ctx.container);
    assertExists(ctx.url);
  } catch (error) {
    sendBack(waveSurferMachineEvents.error("Error initializing WaveSurfer: " + error));
    return;
  }

  const timeUpdateRate = input.context.timeUpdateRate;
  const throttleUpdate = Math.round(1000 / timeUpdateRate);

  const handleTimeUpdate = (time: number) => {
    const currentTime = Math.round(time * timeUpdateRate) / timeUpdateRate;
    debugWsEventHandler("timeupdate", currentTime);
    sendBack(waveSurferMachineEvents.timeUpdate(currentTime));
  };

  const handleError = (error: Error) => {
    debugWsEventHandler("error", error);
    sendBack(waveSurferMachineEvents.error(error.message || "An unknown error occurred"));
  };

  const handleTrackHeightChange = (value: string) => {
    const height = parseHeight(value);
    sendBack(waveSurferUserEvents.setTrackHeight(height));
  };

  const eventHandlerMap = new Map<keyof WaveSurferEvents, (...args: any) => void>([
    ["timeupdate", handleTimeUpdate],
    ["destroy", () => console.debug("[INFO] WaveSurfer instance destroyed. Or not...")],
    ["error", handleError]
  ]);

  const genericEventHandlers = Array.from(Object.keys(waveSurferMachineEvents)).filter(
    (event) => !eventHandlerMap.has(event as keyof WaveSurferEvents)
  ) as Array<keyof WaveSurferEvents>;

  const createHandler = (wsEvent: keyof WaveSurferEvents, ...args: any[]) => {
    debugWsEventHandler(wsEvent, ...args);
    sendBack((machineEventFnFactory(wsEvent) as any)(...args));
  };

  const createDynamicHandler = (wsEvent: keyof WaveSurferEvents) =>
    eventHandlerMap.set(wsEvent, (...args: any[]) => createHandler(wsEvent, ...args));

  genericEventHandlers.forEach(createDynamicHandler);

  eventHandlerMap.forEach((handler, event) => {
    ws.on(event, throttle(handler, throttleUpdate));
  });

  trackHeight$.subscribe(handleTrackHeightChange);

  ws.on("destroy", cleanup.bind(null, ws, eventHandlerMap));

  return () => {
    if (ws) {
      cleanup(ws, eventHandlerMap);
    }
  };
};

export const setupEventListenersActor = fromCallback<EventObject, {context: WsMachineContext}>(setupEventListeners);
