import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { BroadcastResultSheetComponent } from './broadcast-result-sheet.component';
import { CreateDraftDialogComponent } from './create-draft-dialog.component';
import { DraftsEffects } from './effects';
import { draftsReducer } from './reducer';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('drafts', draftsReducer),
    EffectsModule.forFeature([DraftsEffects]),
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatListModule
  ],
  declarations: [CreateDraftDialogComponent, BroadcastResultSheetComponent],
  providers: [DraftsEffects],
  entryComponents: [CreateDraftDialogComponent, BroadcastResultSheetComponent]
})
export class DraftsStoreModule {}
