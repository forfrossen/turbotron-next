import { Observable, Subject, filter } from "rxjs";

type PluginEvent = { type: string; payload?: unknown };

export class PluginEventBus {
  private subject = new Subject<PluginEvent>();

  emit(event: PluginEvent) {
    this.subject.next(event);
  }

  on$(type: string): Observable<PluginEvent> {
    return this.subject
      .asObservable()
      .pipe(filter((event) => event.type === type));
  }
}
