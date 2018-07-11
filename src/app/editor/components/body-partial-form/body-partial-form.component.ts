import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-body-partial-form',
  templateUrl: './body-partial-form.component.html',
  styleUrls: ['./body-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyPartialFormComponent {
  @Input() parentForm: FormGroup;

  readonly errorMessages = {
    required: 'Body cannot be empty!'
  };

  get bodyControl(): AbstractControl {
    return this.parentForm.get('body');
  }
}
