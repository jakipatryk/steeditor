import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import * as fromUtopianTemplates from '../../drafts/templates';
import { State } from '../root-state';
import {
  selectAllTemplates,
  selectTemplatesEntities,
  selectTemplatesLoaded,
  Template
} from '../templates-store';
import { templatesActionCreators } from './../templates-store/actions';

@Component({
  selector: 'app-create-draft-dialog',
  template: `<h2 mat-dialog-title class="mat-title">New draft</h2>

        <mat-slide-toggle #useTemplate labelPosition="before" checked="true">
          <span class="mat-subheading-2">Use template:</span>
        </mat-slide-toggle>

        <div *ngIf="useTemplate.checked" style="margin-top: 10px;">
          <mat-form-field style="width: 100%;">
            <mat-select placeholder="Select template" [formControl]="templatePicker">

              <div *ngIf="ownTemplatesAll$ | async as ownTemplatesAll">
                <div *ngIf="ownTemplatesAll.length > 0">
                  <mat-toolbar color="primary">
                    Your templates
                  </mat-toolbar>
                  <mat-option *ngFor="let template of ownTemplatesAll" [value]="template.id">
                    {{ template.name }}
                  </mat-option>
                </div>
              </div>

              <mat-toolbar color="primary">
                Utopian templates
              </mat-toolbar>
              <mat-option *ngFor="let template of utopianAll" [value]="template.name">
                {{ template.name }}
              </mat-option>

            </mat-select>
          </mat-form-field>

          <mat-dialog-content *ngIf="templatePicker.value as templateNameOrId" class="mat-body-1">
            {{(ownTemplatesEntities$ | async)[templateNameOrId]?.description || utopianEntities[templateNameOrId]?.description}}
          </mat-dialog-content>
        </div>

        <mat-dialog-actions>
          <button mat-button
            [disabled]="(!templatePicker.value && useTemplate.checked)"
            [mat-dialog-close]="(templatePicker.value && useTemplate.checked) ? templatePicker.value : 'NO_TEMPLATE'">
              Create
          </button>
        </mat-dialog-actions>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateDraftDialogComponent implements OnInit {
  templatePicker: FormControl;
  ownTemplatesAll$: Observable<Template[]>;
  ownTemplatesEntities$: Observable<{ [id: number]: Template }>;
  utopianEntities = fromUtopianTemplates.entities;
  utopianAll = fromUtopianTemplates.all;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.buildPicker();
  }

  ngOnInit() {
    this.ownTemplatesAll$ = this.store.select(selectAllTemplates);
    this.ownTemplatesEntities$ = this.store.select(selectTemplatesEntities);
    this.store
      .select(selectTemplatesLoaded)
      .pipe(
        first(),
        tap(
          loaded =>
            loaded
              ? null
              : this.store.dispatch(templatesActionCreators.loadTemplates())
        )
      )
      .subscribe();
  }

  private buildPicker() {
    this.templatePicker = this.formBuilder.control('');
  }
}
