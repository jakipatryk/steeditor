import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { draftsActionCreators, selectLoaded } from '../../store/drafts-store';
import { State } from '../../store/root-state';

@Injectable()
export class DraftsLoadedGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(selectLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(draftsActionCreators.loadDrafts());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
