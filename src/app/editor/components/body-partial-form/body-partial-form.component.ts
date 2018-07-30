import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { insert, join, pipe, split, subtract } from 'ramda';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  FileUploadResponse,
  FileUploadService
} from './../../../core/services/file-upload.service';

@Component({
  selector: 'app-body-partial-form',
  templateUrl: './body-partial-form.component.html',
  styleUrls: ['./body-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyPartialFormComponent {
  @Input() parentForm: FormGroup;
  @Input() fullscreenState: { isFullscreen: boolean } = { isFullscreen: false };

  @Output() fullscreenOpen = new EventEmitter<void>();
  @Output() fullscreenClose = new EventEmitter<void>();

  @ViewChild('bodyTextarea') bodyTextarea: ElementRef<HTMLTextAreaElement>;

  isUploading = false;

  readonly errorMessages = {
    required: 'Body cannot be empty!'
  };

  get bodyControl(): AbstractControl {
    return this.parentForm.get('body');
  }

  get isFullscreen(): boolean {
    return this.fullscreenState.isFullscreen;
  }

  constructor(
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar
  ) {}

  formatH1(): void {
    this.insertValueAndSelect('# ');
  }
  formatH2(): void {
    this.insertValueAndSelect('## ');
  }
  formatH3(): void {
    this.insertValueAndSelect('### ');
  }
  formatH4(): void {
    this.insertValueAndSelect('#### ');
  }

  formatBold(): void {
    if (this.selectionLength() === 0) {
      this.insertValueAndSelect('**', '**', 2);
    } else {
      this.insertValueAndSelect('**', '**');
    }
  }

  formatItalic(): void {
    if (this.selectionLength() === 0) {
      this.insertValueAndSelect('*', '*', 1);
    } else {
      this.insertValueAndSelect('*', '*');
    }
  }

  formatStrikeThrough(): void {
    if (this.selectionLength() === 0) {
      this.insertValueAndSelect('~~', '~~', 2);
    } else {
      this.insertValueAndSelect('~~', '~~');
    }
  }

  formatQuote(): void {
    this.insertValueAndSelect('> ');
  }

  insertLink(): void {
    this.insertValueAndSelect('[', ']()', 1);
  }

  insertImage(link?: string): void {
    if (link) {
      this.insertValueAndSelect('![', `](${link})`);
    } else {
      this.insertValueAndSelect('![', ']()', 3);
    }
  }

  uploadAndInsertImage(event) {
    this.isUploading = true;

    if (event.target) {
      const file: File = event.target.files[0];
      this.fileUploadService
        .uploadFile(file)
        .pipe(
          tap((result: FileUploadResponse) => {
            this.insertImage(result.url);
            this.isUploading = false;
          }),
          catchError(err => {
            this.snackBar.open(err, 'Dismiss', {
              duration: 4000
            });
            this.isUploading = false;
            return of(err);
          })
        )
        .subscribe();
    }
  }

  goFullscreen(): void {
    this.fullscreenOpen.emit();
  }

  exitFullscreen(): void {
    this.fullscreenClose.emit();
  }

  private insertValue(valueLeft: string, valueRight: string): string {
    return pipe(
      split(''),
      insert(this.bodyTextarea.nativeElement.selectionEnd, valueRight),
      insert(this.bodyTextarea.nativeElement.selectionStart, valueLeft),
      join('')
    )(this.bodyTextarea.nativeElement.value);
  }

  private selectionLength(): number {
    return subtract(
      this.bodyTextarea.nativeElement.selectionEnd,
      this.bodyTextarea.nativeElement.selectionStart
    );
  }

  private insertValueAndSelect(
    valueLeft: string,
    valueRight: string = '',
    deltaRightAfter: number = 0
  ): void {
    const selectionAfter =
      this.bodyTextarea.nativeElement.selectionStart +
      valueLeft.length +
      this.selectionLength() +
      valueRight.length -
      deltaRightAfter;
    this.bodyControl.setValue(this.insertValue(valueLeft, valueRight));
    this.bodyTextarea.nativeElement.selectionStart = selectionAfter;
    this.bodyTextarea.nativeElement.selectionEnd = selectionAfter;
  }
}
