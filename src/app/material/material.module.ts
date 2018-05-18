import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * Import and export here each Angular Material module that is going to be used in the app.
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
