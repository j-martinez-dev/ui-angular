import { Subject } from 'rxjs';

export class UiModalRef<R = unknown> {
  private readonly _closed$ = new Subject<R | undefined>();

  readonly closed$ = this._closed$.asObservable();

  close(result?: R): void {
    this._closed$.next(result);
    this._closed$.complete();
  }
}
