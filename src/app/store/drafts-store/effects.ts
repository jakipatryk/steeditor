import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { steemizePost } from '../../../core';
import { IndexedDBService } from '../../core/services/indexeddb.service';
import * as fromTemplates from '../../drafts/templates';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SteemconnectBroadcastService } from '../../steemconnect/services/steemconnect-broadcast.service';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';
import { routerActionCreators } from './../router-store/actions';
import {
  BroadcastDraft,
  CreateDraft,
  CreateDraftSuccess,
  draftsActionCreators,
  DraftsActionsTypes,
  RemoveDraft,
  UpdateDraft
} from './actions';
import { CreateDraftDialogComponent } from './create-draft-dialog.component';
import { Draft } from './models';

@Injectable()
export class DraftsEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private indexedDBService: IndexedDBService,
    private broadcastService: SteemconnectBroadcastService,
    private authService: SteemconnectOAuth2Service,
    private snackBar: MatSnackBar
  ) {
    this.indexedDBService.useStore('drafts');
  }

  @Effect()
  loadDrafts$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.LoadDrafts),
    exhaustMap(() =>
      this.indexedDBService.getAll<Draft>().pipe(
        map(drafts => draftsActionCreators.loadDraftsSuccess(drafts)),
        catchError(() => of(draftsActionCreators.loadDraftsFail()))
      )
    )
  );

  @Effect()
  createDraft$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.CreateDraft),
    concatMap((action: CreateDraft) =>
      this.dialog
        .open(CreateDraftDialogComponent, {
          data: {
            all: [...fromTemplates.all],
            entities: { ...fromTemplates.entities }
          },
          width: '400px'
        })
        .afterClosed()
        .pipe(
          concatMap(
            (name: string | undefined) =>
              name
                ? this.indexedDBService
                    .add({
                      title: '',
                      body: '',
                      tags: [],
                      community: '',
                      thumbnailUrl: '',
                      beneficiaries: [],
                      allowVotes: true,
                      allowCurationRewards: true,
                      percentSteemDollars: 50,
                      maxAcceptedPayout: 100000,
                      jsonMetadata: '',
                      ...fromTemplates.entities[name].changeInPost
                    })
                    .pipe(
                      concatMap(draftId =>
                        this.indexedDBService.getOne<Draft>(draftId).pipe(
                          map(draft =>
                            draftsActionCreators.createDraftSuccess(draft)
                          ),
                          catchError(() =>
                            of(draftsActionCreators.createDraftFail())
                          )
                        )
                      ),
                      catchError(() =>
                        of(draftsActionCreators.createDraftFail())
                      )
                    )
                : of(draftsActionCreators.createDraftFail())
          )
        )
    )
  );

  @Effect()
  createDraftSuccess$ = this.actions$.pipe(
    ofType(DraftsActionsTypes.CreateDraftSuccess),
    map((action: CreateDraftSuccess) =>
      routerActionCreators.go({
        path: ['/drafts', action.payload.draft.id]
      })
    )
  );

  @Effect()
  updateDraft$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.UpdateDraft),
    concatMap((action: UpdateDraft) =>
      this.indexedDBService.put(action.payload.draft).pipe(
        map(() =>
          draftsActionCreators.updateDraftSuccess(action.payload.draft)
        ),
        catchError(() => of(draftsActionCreators.updateDraftFail()))
      )
    )
  );

  @Effect()
  removeDraft$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.RemoveDraft),
    map((action: RemoveDraft) => action.payload),
    concatMap(({ id }) =>
      this.dialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .pipe(
          concatMap(
            shouldRemove =>
              shouldRemove
                ? this.indexedDBService.delete(id).pipe(
                    map(() => draftsActionCreators.removeDraftSuccess(id)),
                    catchError(() => of(draftsActionCreators.removeDraftFail()))
                  )
                : of(draftsActionCreators.removeDraftFail())
          )
        )
    )
  );

  @Effect()
  broadcastDraft$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.BroadcastDraft),
    withLatestFrom(this.authService.authState),
    exhaustMap(([action, user]) =>
      this.broadcastService
        .broadcastOperations(
          steemizePost((action as BroadcastDraft).payload.draft, user.uid)
        )
        .pipe(
          map(response => draftsActionCreators.broadcastDraftSuccess(response)),
          catchError(err =>
            of(draftsActionCreators.broadcastDraftFail(err.error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  broadcastDraftSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.BroadcastDraftSuccess),
    tap(() => {
      this.snackBar.open('Successfully broadcasted post!', 'Dismiss', {
        duration: 7000
      });
    })
  );

  @Effect({ dispatch: false })
  broadcastDraftFail$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.BroadcastDraftFail),
    tap(action => {
      this.snackBar.open('Error broadcasting post...', 'Dismiss', {
        duration: 7000
      });
    })
  );
}
