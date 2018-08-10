import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
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
    MatButtonModule
  ],
  declarations: [CreateDraftDialogComponent],
  providers: [DraftsEffects],
  entryComponents: [CreateDraftDialogComponent]
})
export class DraftsStoreModule {}
