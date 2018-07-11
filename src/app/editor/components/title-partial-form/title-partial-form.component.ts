import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-title-partial-form',
  templateUrl: './title-partial-form.component.html',
  styleUrls: ['./title-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitlePartialFormComponent {
  @Input() parentForm: FormGroup;

  readonly errorMessages = {
    required: 'Title cannot be empty!'
  };

  get titleControl(): AbstractControl {
    return this.parentForm.get('title');
  }
}
