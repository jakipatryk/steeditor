import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { IndexedDBService } from '../../../core/services/indexeddb.service';
import * as fromRoot from '../../../store';
import { ConfirmDeleteDialogComponent } from '../../components/confirm-delete-dialog/confirm-delete-dialog.component';
import { Draft } from '../../models/draft.model';
import * as fromTemplates from '../../templates';
import { makeEntities } from './../../../shared/utils';
import * as fromActions from './../actions/drafts.actions';

@Injectable()
export class DraftsEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private indexedDBService: IndexedDBService
  ) {
    this.indexedDBService.useStore('drafts');
  }

  @Effect()
  loadDrafts$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.LoadDrafts),
    exhaustMap(() =>
      this.indexedDBService.getAll<Draft>().pipe(
        map(drafts =>
          fromActions.loadDraftsSuccess(makeEntities(drafts, 'id'))
        ),
        catchError(() => of(fromActions.loadDraftsFail()))
      )
    )
  );

  @Effect()
  createDraft$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.CreateDraft),
    concatMap((action: fromActions.CreateDraft) =>
      this.indexedDBService
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
          ...fromTemplates.entities[action.payload].changeInPost
        })
        .pipe(
          concatMap(draftId =>
            this.indexedDBService.getOne<Draft>(draftId).pipe(
              map(draft => fromActions.createDraftSuccess(draft)),
              catchError(() => of(fromActions.createDraftFail()))
            )
          ),
          catchError(() => of(fromActions.createDraftFail()))
        )
    )
  );

  @Effect()
  createDraftSuccess$ = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.CreateDraftSuccess),
    map(
      (action: fromActions.CreateDraftSuccess) =>
        new fromRoot.Go({
          path: ['/drafts', action.payload.id]
        })
    )
  );

  @Effect()
  updateDraft$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.UpdateDraft),
    concatMap((action: fromActions.UpdateDraft) =>
      this.indexedDBService.put(action.payload).pipe(
        map(() => fromActions.updateDraftSuccess(action.payload)),
        catchError(() => of(fromActions.updateDraftFail()))
      )
    )
  );

  @Effect()
  removeDraft$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.RemoveDraft),
    map((action: fromActions.RemoveDraft) => action.payload),
    concatMap(id =>
      this.dialog
        .open(ConfirmDeleteDialogComponent)
        .afterClosed()
        .pipe(
          concatMap(
            shouldRemove =>
              shouldRemove
                ? this.indexedDBService.delete(id).pipe(
                    map(() => fromActions.removeDraftSuccess(id)),
                    catchError(() => of(fromActions.removeDraftFail()))
                  )
                : of(fromActions.removeDraftFail())
          )
        )
    )
  );
}
