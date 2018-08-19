import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {
  postsActionCreators,
  selectCurrentPost
} from '../../store/posts-store';
import { State } from '../../store/root-state';
import { selectRouterState } from '../../store/router-store';

@Injectable({
  providedIn: 'root'
})
export class PostLoadedGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(selectCurrentPost).pipe(
      withLatestFrom(this.store.select(selectRouterState)),
      tap(([post, router]) => {
        if (!post) {
          this.store.dispatch(
            postsActionCreators.syncPost(router.state.params.postId)
          );
        }
      }),
      map(([post, router]) => !!post),
      filter(post => post),
      first()
    );
  }
}
