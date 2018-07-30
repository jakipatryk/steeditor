import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional
} from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-body-card',
  templateUrl: './body-card.component.html',
  styleUrls: ['./body-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyCardComponent {
  @Input() parentForm: FormGroup;

  /** Once the fullscreen mode is triggered, we capture the opened dialog reference here, for integration tests. */
  openedDialogRef: MatDialogRef<BodyCardComponent> = null;

  get isFullscreen(): boolean {
    return !!this.selfDialogRef;
  }

  get fullscreenState(): { isFullscreen: boolean } {
    return { isFullscreen: this.isFullscreen };
  }

  constructor(
    private dialog: MatDialog,
    private media: ObservableMedia,
    /** Self dialog reference is defined only if component was dynamically created via MatDialog. */
    @Optional() private selfDialogRef: MatDialogRef<BodyCardComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    data: any
  ) {
    if (data) {
      this.parentForm = data.parentForm;
    }
  }

  goFullscreen(): void {
    if (!this.isFullscreen) {
      this.openedDialogRef = this.dialog.open(BodyCardComponent, {
        data: {
          parentForm: this.parentForm
        },
        maxWidth: '100vw',
        width: this.media.isActive('lt-md') ? '95vw' : '85vw',
        height: '80vh',
        panelClass: this.media.isActive('lt-md')
          ? 'minimal-x-padding-dialog'
          : ''
      });
    }
  }

  exitFullscreen(): void {
    if (this.isFullscreen) {
      this.selfDialogRef.close();
    }
  }
}
