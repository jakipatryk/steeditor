import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {
  always,
  compose,
  either,
  head,
  identity,
  ifElse,
  isEmpty,
  isNil
} from 'ramda';
import { Subscription } from 'rxjs';
import { getImages } from './../../../../core/steemize/withJsonMetadata';

@Component({
  selector: 'app-thumbnail-partial-form',
  templateUrl: './thumbnail-partial-form.component.html',
  styleUrls: ['./thumbnail-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailPartialFormComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;

  currentThumbnailURL: string | null;
  onDirtyMatcher = new ShowOnDirtyErrorStateMatcher();

  readonly errorMessages = {
    pattern: 'Please enter a valid URL!'
  };

  private parentFormChangesSubscription: Subscription;

  get bodyControl(): AbstractControl {
    return this.parentForm.get('body');
  }

  get thumbnailUrlControl(): AbstractControl {
    return this.parentForm.get('thumbnailUrl');
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentThumbnailURL = this.getCurrentThumbnailURL();
    this.parentFormChangesSubscription = this.parentForm.valueChanges.subscribe(
      () => {
        const newThumbnailUrl = this.getCurrentThumbnailURL();
        if (this.currentThumbnailURL !== newThumbnailUrl) {
          this.currentThumbnailURL = newThumbnailUrl;
          this.changeDetector.detectChanges();
        }
      }
    );
  }

  ngOnDestroy() {
    this.parentFormChangesSubscription.unsubscribe();
  }

  private getCurrentThumbnailURL(): string | null {
    return ifElse(
      either(isNil, isEmpty),
      () =>
        compose(
          ifElse(either(isNil, isEmpty), always(null), identity),
          ifElse(either(isNil, isEmpty), always(''), head),
          getImages
        )(this.bodyControl.value),
      identity
    )(this.thumbnailUrlControl.value);
  }
}
