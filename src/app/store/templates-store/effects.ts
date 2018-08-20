import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { IndexedDBService } from '../../core/services/indexeddb.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { routerActionCreators } from './../router-store/actions';
import {
  CreateTemplate,
  CreateTemplateSuccess,
  RemoveTemplate,
  templatesActionCreators,
  TemplatesActionsTypes,
  UpdateTemplate
} from './actions';
import { Template } from './models';

@Injectable()
export class TemplatesEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private indexedDBService: IndexedDBService,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  loadTemplates$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionsTypes.LoadTemplates),
    exhaustMap(() =>
      this.indexedDBService.getAll<Template>('templates').pipe(
        map(templates =>
          templatesActionCreators.loadTemplatesSuccess(templates)
        ),
        catchError(() => of(templatesActionCreators.loadTemplatesFail()))
      )
    )
  );

  @Effect()
  createTemplate$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionsTypes.CreateTemplate),
    concatMap((action: CreateTemplate) =>
      this.indexedDBService
        .add('templates', {
          name: '',
          description: '',
          initWith: {
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
            jsonMetadata: ''
          }
        })
        .pipe(
          concatMap(templateId =>
            this.indexedDBService
              .getOne<Template>('templates', templateId)
              .pipe(
                map(template =>
                  templatesActionCreators.createTemplateSuccess(template)
                ),
                catchError(() =>
                  of(templatesActionCreators.createTemplateFail())
                )
              )
          ),
          catchError(() => of(templatesActionCreators.createTemplateFail()))
        )
    )
  );

  @Effect()
  createTemplateSuccess$ = this.actions$.pipe(
    ofType(TemplatesActionsTypes.CreateTemplateSuccess),
    map((action: CreateTemplateSuccess) =>
      routerActionCreators.go({
        path: ['/templates', action.payload.template.id]
      })
    )
  );

  @Effect()
  updateTemplate$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionsTypes.UpdateTemplate),
    concatMap((action: UpdateTemplate) =>
      this.indexedDBService.put('templates', action.payload.template).pipe(
        map(() =>
          templatesActionCreators.updateTemplateSuccess(action.payload.template)
        ),
        catchError(() => of(templatesActionCreators.updateTemplateFail()))
      )
    )
  );

  @Effect({ dispatch: false })
  updateTemplateSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionsTypes.UpdateTemplateSuccess),
    tap(() =>
      this.snackBar.open('Successfully saved the template!', 'Dismiss', {
        duration: 5000
      })
    )
  );

  @Effect({ dispatch: false })
  updateTemplateFail$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionsTypes.UpdateTemplateFail),
    tap(() =>
      this.snackBar.open('Error while saving the template...', 'Dismiss', {
        duration: 5000
      })
    )
  );

  @Effect()
  removeTemplate$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionsTypes.RemoveTemplate),
    map((action: RemoveTemplate) => action.payload),
    concatMap(({ id }) =>
      this.dialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .pipe(
          concatMap(
            shouldRemove =>
              shouldRemove
                ? this.indexedDBService.delete('templates', id).pipe(
                    map(() =>
                      templatesActionCreators.removeTemplateSuccess(id)
                    ),
                    catchError(() =>
                      of(templatesActionCreators.removeTemplateFail())
                    )
                  )
                : of(templatesActionCreators.removeTemplateFail())
          )
        )
    )
  );
}
