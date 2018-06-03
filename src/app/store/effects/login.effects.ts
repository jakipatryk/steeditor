import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromReducers.State>
  ) {}

  @Effect({ dispatch: false })
  login$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LoginActionsTypes.Login),
    tap(() => {
      window.location.href = this.authService.getAuthorizationUrl();
    })
  );

  @Effect()
  loginCallback$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LoginActionsTypes.LoginCallback),
    withLatestFrom(this.store.select(fromReducers.getRouterState)),
    tap(([action, router]) => {
      const token = {
        access_token: router.state.queryParams.access_token,
        username: router.state.queryParams.username,
        expires_in: router.state.queryParams.expires_in
      };
      if (token.access_token) {
        this.authService.setCookie(token);
      } else {
        throw new Error();
      }
    }),
    map(() => fromActions.loginSuccess()),
    catchError(() => of(fromActions.loginFail()))
  );

  @Effect()
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LoginActionsTypes.LoginSuccess),
    map(() => fromActions.authenticationSuccess())
  );

  @Effect()
  loginFail$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LoginActionsTypes.LoginFail),
    map(() => fromActions.authenticationFail())
  );
}
