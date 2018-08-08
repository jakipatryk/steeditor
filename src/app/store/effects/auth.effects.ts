import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { always, equals, ifElse } from 'ramda';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';
import * as fromActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: SteemconnectOAuth2Service
  ) {}

  @Effect()
  authenticate$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.AuthActionsTypes.Authenticate),
    switchMap(() =>
      this.authService.authState.pipe(
        map(
          authState =>
            authState
              ? fromActions.authenticationSuccess()
              : fromActions.authenticationFail()
        )
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.AuthActionsTypes.Logout),
    switchMap(() =>
      this.authService
        .logout()
        .pipe(
          map(
            ifElse(
              equals(true),
              always(fromActions.logoutSuccess()),
              always(fromActions.logoutFail())
            )
          )
        )
    )
  );
}
