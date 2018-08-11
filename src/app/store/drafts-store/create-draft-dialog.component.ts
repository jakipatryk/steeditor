import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-draft-dialog',
  template: `<h2 mat-dialog-title class="mat-title">New draft</h2>

        <mat-slide-toggle #useTemplate labelPosition="before" checked="true">
          <span class="mat-subheading-2">Use template:</span>
        </mat-slide-toggle>

        <div *ngIf="useTemplate.checked" style="margin-top: 10px;">
          <mat-form-field style="width: 100%;">
            <mat-select placeholder="Select template" [formControl]="templatePicker">
              <mat-option *ngFor="let template of templates.all" [value]="template.name">
                {{ template.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-dialog-content *ngIf="templatePicker.value as templateName" class="mat-body-1">
            {{templates.entities[templateName]?.description}}
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
export class CreateDraftDialogComponent {
  templatePicker: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public templates: any,
    private formBuilder: FormBuilder
  ) {
    this.buildPicker();
  }

  private buildPicker() {
    this.templatePicker = this.formBuilder.control('');
  }
}
