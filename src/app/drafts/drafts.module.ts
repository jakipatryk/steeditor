import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './../material/material.module';
import { BeneficiaryFormComponent } from './components/beneficiary-form/beneficiary-form.component';
import { DraftCardComponent } from './components/draft-card/draft-card.component';
import { EditorComponent } from './components/editor/editor.component';
import { NewDraftDialogComponent } from './components/new-draft-dialog/new-draft-dialog.component';
import { PostContentsComponent } from './components/post-contents/post-contents.component';
import { PostOptionsComponent } from './components/post-options/post-options.component';
import { PostThumbnailComponent } from './components/post-thumbnail/post-thumbnail.component';
import { DraftsComponent } from './containers/drafts/drafts.component';
import { DraftsRoutingModule } from './drafts-routing.module';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { ReversePipe } from './pipes/reverse.pipe';
import { EditorContainerComponent } from './containers/editor-container/editor-container.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DraftsRoutingModule,
    StoreModule.forFeature('drafts', reducers),
    EffectsModule.forFeature(effects),
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    DraftsComponent,
    EditorComponent,
    PostContentsComponent,
    PostThumbnailComponent,
    PostOptionsComponent,
    BeneficiaryFormComponent,
    DraftCardComponent,
    NewDraftDialogComponent,
    ReversePipe,
    EditorContainerComponent
  ],
  entryComponents: [NewDraftDialogComponent]
})
export class DraftsModule {}
