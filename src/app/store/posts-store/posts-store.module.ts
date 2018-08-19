import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BroadcastResultSheetComponent } from './broadcast-result-sheet.component';
import { PostsEffects } from './effects';
import { postsReducer } from './reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    MatBottomSheetModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [PostsEffects],
  declarations: [BroadcastResultSheetComponent],
  entryComponents: [BroadcastResultSheetComponent]
})
export class PostsStoreModule {}
