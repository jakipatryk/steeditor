import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { State } from '../../store/root-state';
import {
  selectTemplatesLoaded,
  templatesActionCreators
} from '../../store/templates-store';

@Injectable()
export class TemplatesLoadedGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(selectTemplatesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(templatesActionCreators.loadTemplates());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
