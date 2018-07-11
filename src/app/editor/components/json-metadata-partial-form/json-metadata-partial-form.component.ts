import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { assoc, clone, pipe, unary } from 'ramda';
import { createJsonMetadata } from '../../../../core/steemize/withJsonMetadata';
import { SteeditorPost } from './../../../../core/SteeditorPost';

@Component({
  selector: 'app-json-metadata-partial-form',
  templateUrl: './json-metadata-partial-form.component.html',
  styleUrls: ['./json-metadata-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonMetadataPartialFormComponent {
  @Input() parentForm: FormGroup;
  @Input() currentSteeditorPost: SteeditorPost;

  onDirtyMatcher = new ShowOnDirtyErrorStateMatcher();

  readonly errorMessages = {
    invalidJson: 'Please enter a valid JSON!'
  };

  get currentMetadata(): { [K: string]: any } {
    return pipe(
      () =>
        this.jsonMetadataControl.valid
          ? clone(this.currentSteeditorPost)
          : assoc('jsonMetadata', '', this.currentSteeditorPost),
      createJsonMetadata,
      unary(JSON.parse)
    )();
  }

  get jsonMetadataControl(): AbstractControl {
    return this.parentForm.get('jsonMetadata');
  }
}
