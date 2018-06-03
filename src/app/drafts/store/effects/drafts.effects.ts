import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import idb from 'idb';
import { Observable, from as fromPromise, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromRoot from '../../../store';
import * as fromTemplates from '../../templates';
import { makeEntities } from './../../../shared/utils';
import * as fromActions from './../actions/drafts.actions';

@Injectable()
export class DraftsEffects {
  dbPromise: Promise<any> = idb.open('steeditor-db', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('drafts')) {
      upgradeDb.createObjectStore('drafts', {
        keyPath: 'id',
        autoIncrement: true
      });
    }
  });

  constructor(private actions$: Actions) {}

  @Effect()
  loadDrafts$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.LoadDrafts),
    mergeMap(action =>
      fromPromise(
        this.dbPromise.then(db =>
          db
            .transaction('drafts', 'readonly')
            .objectStore('drafts')
            .getAll()
        )
      ).pipe(
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
    mergeMap(action =>
      fromPromise(
        this.dbPromise.then(db =>
          db
            .transaction('drafts', 'readwrite')
            .objectStore('drafts')
            .add(
              fromTemplates.entities[
                (action as fromActions.CreateDraft).payload
              ].initialDraft
            )
        )
      ).pipe(
        mergeMap(draftId =>
          fromPromise(
            this.dbPromise.then(db =>
              db
                .transaction('drafts', 'readonly')
                .objectStore('drafts')
                .get(draftId)
            )
          ).pipe(
            map(draft => fromActions.createDraftSuccess(draft)),
            catchError(() => of(fromActions.createDraftFail()))
          )
        ),
        catchError(() => of(fromActions.createDraftFail()))
      )
    )
  );

  @Effect()
  updateDraft$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.UpdateDraft),
    mergeMap(action =>
      fromPromise(
        this.dbPromise.then(db =>
          db
            .transaction('drafts', 'readwrite')
            .objectStore('drafts')
            .put((action as fromActions.UpdateDraft).payload)
        )
      ).pipe(
        mergeMap(draftId =>
          fromPromise(
            this.dbPromise.then(db =>
              db
                .transaction('drafts', 'readonly')
                .objectStore('drafts')
                .get(draftId)
            )
          ).pipe(
            map(draft => fromActions.updateDraftSuccess(draft)),
            catchError(() => of(fromActions.updateDraftFail()))
          )
        ),
        catchError(() => of(fromActions.updateDraftFail()))
      )
    )
  );

  @Effect()
  createDraftSuccess$ = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.CreateDraftSuccess),
    map(
      action =>
        new fromRoot.Go({
          path: [
            '/drafts',
            (action as fromActions.CreateDraftSuccess).payload.id
          ]
        })
    )
  );

  @Effect()
  removeDraft$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.DraftsActionsTypes.RemoveDraft),
    mergeMap(action =>
      fromPromise(
        this.dbPromise.then(db => {
          db
            .transaction('drafts', 'readwrite')
            .objectStore('drafts')
            .delete((action as fromActions.RemoveDraft).payload);
          return (action as fromActions.RemoveDraft).payload;
        })
      ).pipe(
        map(id => fromActions.removeDraftSuccess(id)),
        catchError(() => of(fromActions.removeDraftFail()))
      )
    )
  );
}
