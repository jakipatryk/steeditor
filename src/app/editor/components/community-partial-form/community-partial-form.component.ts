import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { always, cond, equals, has, identity, T } from 'ramda';

@Component({
  selector: 'app-community-partial-form',
  templateUrl: './community-partial-form.component.html',
  styleUrls: ['./community-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityPartialFormComponent {
  @Input()
  parentForm: FormGroup;

  onDirtyMatcher = new ShowOnDirtyErrorStateMatcher();

  readonly errorMessages = {
    minLength: 'Community name has to be longer than 3 characters!',
    maxLength: 'Community name has to be shorter than 16 characters!',
    tooManyDashesInRow: 'There cannot be more than one dash in the row!',
    segmentStartsWithWrongChar:
      'Each segment of the community name should start with a letter!',
    segmentEndsWithWrongChar:
      'Each segment of the community name should end with a letter or digit!',
    segmentWithWrongChars: 'Community name contains forbidden chars!',
    segmentTooShort:
      'Each segment of the community name should contain at least 3 chars!'
  };

  get communityControl(): AbstractControl {
    return this.parentForm.get('community');
  }

  get currentErrorMessage(): string | null {
    return cond([
      [equals(null), identity],
      [has('minlength'), always(this.errorMessages.minLength)],
      [has('maxlength'), always(this.errorMessages.maxLength)],
      [
        has('segmentWithWrongChars'),
        always(this.errorMessages.segmentWithWrongChars)
      ],
      [
        has('tooManyDashesInRow'),
        always(this.errorMessages.tooManyDashesInRow)
      ],
      [
        has('segmentStartsWithWrongChar'),
        always(this.errorMessages.segmentStartsWithWrongChar)
      ],
      [
        has('segmentEndsWithWrongChar'),
        always(this.errorMessages.segmentEndsWithWrongChar)
      ],
      [has('segmentTooShort'), always(this.errorMessages.segmentTooShort)],
      [T, always(null)]
    ])(this.communityControl.errors);
  }
}
