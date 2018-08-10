import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-draft-dialog',
  template: `<h2 mat-dialog-title class="mat-title">New draft</h2>
        <form [formGroup]="templatePicker">
          <mat-form-field>
            <mat-select placeholder="Select template" [formControl]="templatePicker">
              <mat-option *ngFor="let template of templates.all" [value]="template.name">
                {{ template.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </form>

      <mat-dialog-content *ngIf="templatePicker.value as templateName" class="mat-body-1">
        {{templates.entities[templateName]?.description}}
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="templatePicker.value">Create</button>
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
    this.templatePicker = this.formBuilder.control(
      'Utopian contribution: Development'
    );
  }
}
