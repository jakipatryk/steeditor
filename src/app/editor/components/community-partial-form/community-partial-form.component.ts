import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-community-partial-form',
  templateUrl: './community-partial-form.component.html',
  styleUrls: ['./community-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityPartialFormComponent {
  @Input() parentForm: FormGroup;

  onDirtyMatcher = new ShowOnDirtyErrorStateMatcher();

  readonly errorMessages = {
    pattern: 'Community can only contain lower case letters!'
  };

  get communityControl(): AbstractControl {
    return this.parentForm.get('community');
  }
}
