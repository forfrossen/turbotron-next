import { Observable } from "rxjs";

export const fetchAsBufferedObservable = (url: string, options?: RequestInit): Observable<ArrayBuffer> => {
  return new Observable<ArrayBuffer>((subscriber) => {
    const controller: AbortController = new AbortController();
    interface ExtendedRequestInit extends RequestInit {
      signal: AbortSignal;
    }
    const optionsWithAbort: ExtendedRequestInit = {
      ...options,
      signal: controller.signal
    };

    fetch(url, optionsWithAbort)
      .then((response: Response) => response.arrayBuffer())
      .then((buffer: ArrayBuffer) => {
        subscriber.next(buffer);
        subscriber.complete();
      })
      .catch((error: Error) => {
        subscriber.error(error);
      });

    return () => {
      controller.abort();
    };
  });
};
