import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
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
import * as fromUtopianTemplates from '../../drafts/templates';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SteemconnectBroadcastService } from '../../steemconnect/services/steemconnect-broadcast.service';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';
import { State } from '../root-state';
import { selectTemplatesEntities } from '../templates-store';
import { routerActionCreators } from './../router-store/actions';
import {
  BroadcastDraft,
  BroadcastDraftFail,
  BroadcastDraftSuccess,
  CreateDraftSuccess,
  draftsActionCreators,
  DraftsActionsTypes,
  RemoveDraft,
  UpdateDraft
} from './actions';
import { BroadcastResultSheetComponent } from './broadcast-result-sheet.component';
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
    private snackBar: MatSnackBar,
    private store: Store<State>,
    private bottomSheet: MatBottomSheet
  ) {}

  @Effect()
  loadDrafts$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.LoadDrafts),
    exhaustMap(() =>
      this.indexedDBService.getAll<Draft>('drafts').pipe(
        map(drafts => draftsActionCreators.loadDraftsSuccess(drafts)),
        catchError(() => of(draftsActionCreators.loadDraftsFail()))
      )
    )
  );

  @Effect()
  createDraft$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.CreateDraft),
    concatMap(() =>
      this.dialog
        .open(CreateDraftDialogComponent, {
          width: '400px'
        })
        .afterClosed()
        .pipe(
          withLatestFrom(this.store.select(selectTemplatesEntities)),
          map(
            ([result, ownEntities]) =>
              typeof result === 'string'
                ? result === 'NO_TEMPLATE'
                  ? {}
                  : fromUtopianTemplates.entities[result].changeInPost
                : typeof result === 'number'
                  ? ownEntities[result].initWith
                  : result
          ),
          concatMap(changes => {
            if (changes) {
              return this.indexedDBService
                .add('drafts', {
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
                  ...changes
                })
                .pipe(
                  concatMap(draftId =>
                    this.indexedDBService.getOne<Draft>('drafts', draftId).pipe(
                      map(draft =>
                        draftsActionCreators.createDraftSuccess(draft)
                      ),
                      catchError(() =>
                        of(draftsActionCreators.createDraftFail())
                      )
                    )
                  ),
                  catchError(() => of(draftsActionCreators.createDraftFail()))
                );
            } else {
              return of(draftsActionCreators.createDraftFail());
            }
          })
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
      this.indexedDBService.put('drafts', action.payload.draft).pipe(
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
                ? this.indexedDBService.delete('drafts', id).pipe(
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
          catchError(response =>
            of(draftsActionCreators.broadcastDraftFail(response.error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  broadcastDraftSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(DraftsActionsTypes.BroadcastDraftSuccess),
    tap((action: BroadcastDraftSuccess) => {
      this.bottomSheet.open(BroadcastResultSheetComponent, {
        data: {
          result: action.payload.response
        }
      });
    })
  );

  @Effect({ dispatch: false })
  broadcastDraftFail$ = this.actions$.pipe(
    ofType(DraftsActionsTypes.BroadcastDraftFail),
    map((action: BroadcastDraftFail) => action.payload),
    tap(res => {
      this.snackBar.open(`ERROR: ${res.error.error_description}`, 'Dismiss', {
        duration: 15000
      });
    })
  );
}
