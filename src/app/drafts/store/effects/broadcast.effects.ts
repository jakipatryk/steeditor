import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { steemizePost } from '../../../../core';
import { SteemconnectBroadcastService } from '../../../steemconnect/services/steemconnect-broadcast.service';
import { SteemconnectOAuth2Service } from '../../../steemconnect/services/steemconnect-oauth2.service';
import * as fromActions from '../actions/broadcast.actions';

@Injectable()
export class BroadcastEffects {
  constructor(
    private actions$: Actions,
    private broadcastService: SteemconnectBroadcastService,
    private authService: SteemconnectOAuth2Service,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  broadcast$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.BroadcastActionsTypes.Broadcast),
    withLatestFrom(this.authService.authState),
    exhaustMap(([action, user]) =>
      this.broadcastService
        .broadcastOperations(
          steemizePost((action as fromActions.Broadcast).payload, user.uid)
        )
        .pipe(
          map(response => fromActions.broadcastSuccess(response)),
          catchError(err => of(fromActions.broadcastFail(err.error)))
        )
    )
  );

  @Effect({ dispatch: false })
  broadcastSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.BroadcastActionsTypes.BroadcastSuccess),
    tap(() => {
      this.snackBar.open('Successfully broadcasted post!', 'Dismiss', {
        duration: 7000
      });
    })
  );

  @Effect({ dispatch: false })
  broadcastFail$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.BroadcastActionsTypes.BroadcastFail),
    tap(action => {
      this.snackBar.open('Error broadcasting post...', 'Dismiss', {
        duration: 7000
      });
    })
  );
}
