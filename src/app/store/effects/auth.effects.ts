import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromActions from '../actions/auth.actions';
import { AuthService } from './../../auth/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  authenticate$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.AuthActionsTypes.Authenticate),
    map(
      () =>
        this.authService.isAuthenticated()
          ? fromActions.authenticationSuccess()
          : fromActions.authenticationFail()
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.AuthActionsTypes.Logout),
    map(() => {
      this.authService.deleteCookie();
      return this.authService.getCookie()
        ? fromActions.logoutFail()
        : fromActions.logoutSuccess();
    })
  );
}
