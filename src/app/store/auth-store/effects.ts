import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { always, equals, ifElse } from 'ramda';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';
import { authActionCreators, AuthActionsTypes } from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: SteemconnectOAuth2Service
  ) {}

  @Effect()
  authState$: Observable<Action> = this.authService.authState.pipe(
    map(user => (user ? user.uid : null)),
    map(authActionCreators.setCurrentUser)
  );

  @Effect({ dispatch: false })
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionsTypes.Login),
    tap(() => {
      this.authService.login();
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionsTypes.Logout),
    switchMap(() =>
      this.authService
        .logout()
        .pipe(
          map(
            ifElse(
              equals(true),
              always(authActionCreators.logoutSuccess()),
              always(authActionCreators.logoutFail())
            )
          )
        )
    )
  );
}
