import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-draft-dialog',
  templateUrl: './new-draft-dialog.component.html',
  styleUrls: ['./new-draft-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewDraftDialogComponent {
  templatePicker: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public templates: any,
    private formBuilder: FormBuilder
  ) {
    this.buildPicker();
  }

  private buildPicker() {
    this.templatePicker = this.formBuilder.control('Standard');
  }
}
