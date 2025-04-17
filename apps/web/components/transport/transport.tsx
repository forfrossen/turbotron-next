"use client";
import {useTransportMachine} from "@/hooks/useTransportMachine";
import {Skeleton} from "@repo/ui/components/skeleton";
import {FileWarningIcon} from "lucide-react";
import {Suspense} from "react";
import ErrorBoundary from "../ErrorBoundary";
import {PlaybackControls} from "./playback-controls";
import {PlaybackDuration} from "./playback-duration";

const Transport = () => {
  useTransportMachine();

  return (
    <>
      <PlaybackControls />
      <PlaybackDuration />
    </>
  );
};

const TransportSuspense = () => {
  return <Skeleton className="h-16 w-full" />;
};

const TransportErrorFallback = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <FileWarningIcon className="size-10" />
      <p className="text-sm">Something went wrong</p>
    </div>
  );
};

const TransportWrapper = () => {
  return (
    <div className="align-end z-200 self-end w-full fixed flex bottom-10 h-20 bg-background animate-in slide-in-from-bottom-full [animation-duration:500ms] lg:bottom-0 rounded-none">
      <ErrorBoundary fallback={<TransportErrorFallback />}>
        <Suspense fallback={<TransportSuspense />}>
          <Transport />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TransportWrapper;
