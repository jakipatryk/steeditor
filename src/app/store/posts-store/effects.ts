import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Buffer } from 'buffer';
import DiffMatchPatch from 'diff-match-patch';
import { head, map as Rmap } from 'ramda';
import { Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  first,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { steemizePost } from '../../../core';
import { SteemRPCService } from './../../steem-rpc/services/steem-rpc.service';
import { SteemconnectBroadcastService } from './../../steemconnect/services/steemconnect-broadcast.service';
import { SteemconnectOAuth2Service } from './../../steemconnect/services/steemconnect-oauth2.service';
import {
  BroadcastPost,
  BroadcastPostSuccess,
  LoadPosts,
  postsActionCreators,
  PostsActionsTypes,
  SyncPost
} from './actions';
import { BroadcastResultSheetComponent } from './broadcast-result-sheet.component';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private steemRPCService: SteemRPCService,
    private authService: SteemconnectOAuth2Service,
    private broadcastService: SteemconnectBroadcastService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  loadPosts$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionsTypes.LoadPosts),
    map((action: LoadPosts) => action.payload),
    withLatestFrom(this.authService.authState),
    exhaustMap(([payload, user]) =>
      this.steemRPCService
        .getUserPosts(user.uid, payload.limit, payload.startWithId)
        .pipe(
          map(response =>
            postsActionCreators.loadPostsSuccess(
              Rmap(
                resPost => ({ id: resPost.entry_id, entry: resPost.comment }),
                response.posts
              ),
              response.lastCheckedId
            )
          ),
          catchError(err => of(postsActionCreators.loadPostsFail(err)))
        )
    )
  );

  @Effect()
  syncPost$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionsTypes.SyncPost),
    map((action: SyncPost) => action.payload),
    withLatestFrom(this.authService.authState),
    exhaustMap(([payload, user]) =>
      this.steemRPCService.getUserPosts(user.uid, 1, payload.id).pipe(
        map(response =>
          postsActionCreators.syncPostSuccess(
            head(
              Rmap(
                resPost => ({ id: resPost.entry_id, entry: resPost.comment }),
                response.posts
              )
            )
          )
        ),
        catchError(err => of(postsActionCreators.syncPostFail(err)))
      )
    )
  );

  @Effect()
  broadcastPost$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionsTypes.BroadcastPost),
    map((action: BroadcastPost) => action.payload),
    map(payload => {
      const diff = new DiffMatchPatch();
      const patch = diff.patch_toText(
        diff.patch_make(
          payload.originalPost.entry.body,
          payload.updatedPost.body
        )
      );
      const newBodyBuffer = Buffer.from(payload.updatedPost.body);
      const body =
        patch && patch.length < newBodyBuffer.length
          ? patch
          : payload.updatedPost.body;
      return {
        id: payload.originalPost.id,
        updatedPost: {
          ...payload.updatedPost,
          body,
          permlink: payload.originalPost.entry.permlink,
          // While editing an existing post, extensions property has to be empty,
          // (beneficiaries can be set only on post creation)
          // empty beneficiaries do the job either,
          // because `steemizePost` function converts empty beneficiaries into empty expensions
          beneficiaries: []
        }
      };
    }),
    withLatestFrom(this.authService.authState),
    exhaustMap(([data, user]) =>
      this.broadcastService
        .broadcastOperations(steemizePost(data.updatedPost, user.uid))
        .pipe(
          first(),
          switchMap(response => [
            postsActionCreators.broadcastPostSuccess(response),
            postsActionCreators.syncPost(data.id)
          ]),
          catchError(err =>
            of(postsActionCreators.broadcastPostFail(err.error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  broadcastPostSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionsTypes.BroadcastPostSuccess),
    tap((action: BroadcastPostSuccess) => {
      this.bottomSheet.open(BroadcastResultSheetComponent, {
        data: {
          result: action.payload.response
        }
      });
    })
  );

  @Effect({ dispatch: false })
  broadcastPostFail$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionsTypes.BroadcastPostFail),
    tap(() =>
      this.snackBar.open('Error broadcasting post...', 'Dismiss', {
        duration: 7000
      })
    )
  );
}
