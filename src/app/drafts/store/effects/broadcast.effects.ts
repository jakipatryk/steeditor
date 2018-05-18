import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { steemizeDraft } from '../../../shared/utils';
import * as fromActions from '../actions/broadcast.actions';

@Injectable()
export class BroadcastEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  @Effect()
  broadcast$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.BroadcastActionsTypes.Broadcast),
    exhaustMap(action =>
      this.http
        .post(
          'https://steemconnect.com/api/broadcast',
          {
            operations: steemizeDraft(
              (action as fromActions.Broadcast).payload,
              this.authService.getCookie()
            )
          },
          {
            headers: new HttpHeaders({
              Authorization: this.authService.getCookie().access_token,
              'Content-Type': 'application/json',
              Accept: 'application/json'
            })
          }
        )
        .pipe(
          map(response => fromActions.broadcastSuccess(response)),
          catchError(err => of(fromActions.broadcastFail(err)))
        )
    )
  );
}
