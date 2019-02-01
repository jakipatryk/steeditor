import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { always, equals, ifElse } from 'ramda';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {
  assetToNumber,
  extractMetadataFromUserProfile,
  toCurrentVotingPower,
  toTotal
} from '../../steem-rpc/formatters';
import { SteemRPCService } from '../../steem-rpc/services/steem-rpc.service';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';
import { toHumanReadableReputation } from './../../steem-rpc/formatters';
import { authActionCreators, AuthActionsTypes } from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: SteemconnectOAuth2Service,
    private steemRPCService: SteemRPCService
  ) {}

  @Effect()
  authState$: Observable<Action> = this.authService.authState.pipe(
    map(user => (user ? user.uid : null)),
    map(authActionCreators.setCurrentUser)
  );

  @Effect()
  loadCurrentUserData$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionsTypes.LoadCurrentUserData),
    withLatestFrom(this.authService.authState),
    concatMap(([action, user]) =>
      user
        ? this.steemRPCService.getUserData(user.uid).pipe(
            map(response => ({
              username: response.name,
              createdAt: response.created,
              recoveryPartner: response.recovery_account,
              witnessesVotedFor: response.witness_votes,
              reputation: toHumanReadableReputation(response.reputation),
              VESTS: assetToNumber(response.vesting_shares),
              SBD: toTotal(response.sbd_balance, response.savings_sbd_balance),
              STEEM: toTotal(response.balance, response.savings_balance),
              votingPower: toCurrentVotingPower(
                response.voting_power,
                response.last_vote_time
              ),
              ...extractMetadataFromUserProfile(
                { prop: 'name', useName: 'fullName' },
                { prop: 'about', useName: 'about' },
                { prop: 'location', useName: 'location' },
                { prop: 'website', useName: 'website' },
                { prop: 'profile_image', useName: 'avatar' },
                { prop: 'cover_image', useName: 'coverImage' },
                { prop: 'github', useName: 'github' }
              )(response.json_metadata)
            })),
            map(data => authActionCreators.loadCurrentUserDataSuccess(data)),
            catchError(err =>
              of(authActionCreators.loadCurrentUserDataFail(err))
            )
          )
        : of(
            authActionCreators.loadCurrentUserDataFail('User is not logged in!')
          )
    )
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
  ) as Observable<Action>;
}
