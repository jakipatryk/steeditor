import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';
import * as fromActions from '../actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: SteemconnectOAuth2Service
  ) {}

  @Effect({ dispatch: false })
  login$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LoginActionsTypes.Login),
    tap(() => {
      this.authService.login();
    })
  );
}
