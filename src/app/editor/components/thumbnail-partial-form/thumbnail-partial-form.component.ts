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
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FileUploadResponse } from '../../../core/services/file-upload.service';
import { getImages } from './../../../../core/steemize/withJsonMetadata';
import { FileUploadService } from './../../../core/services/file-upload.service';

@Component({
  selector: 'app-thumbnail-partial-form',
  templateUrl: './thumbnail-partial-form.component.html',
  styleUrls: ['./thumbnail-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailPartialFormComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;

  currentThumbnailURL: string | null;
  isUploading = false;
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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar
  ) {}

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

  uploadThumbnail(event) {
    this.isUploading = true;

    if (event.target) {
      const file: File = event.target.files[0];
      this.fileUploadService
        .uploadFile(file)
        .pipe(
          tap((result: FileUploadResponse) => {
            this.thumbnailUrlControl.setValue(result.url);
            this.isUploading = false;
            this.changeDetector.detectChanges();
          }),
          catchError(err => {
            this.snackBar.open(err, 'Dismiss', {
              duration: 4000
            });
            this.isUploading = false;
            this.changeDetector.detectChanges();
            return of(err);
          })
        )
        .subscribe();
    }
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
