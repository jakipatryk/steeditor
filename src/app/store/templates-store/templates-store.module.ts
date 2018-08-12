import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { TemplatesEffects } from './effects';
import { templatesReducer } from './reducer';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('templates', templatesReducer),
    EffectsModule.forFeature([TemplatesEffects]),
    MatSnackBarModule
  ],
  providers: [TemplatesEffects]
})
export class TemplatesStoreModule {}
