import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EditorModule } from './../editor/editor.module';
import { MaterialModule } from './../material/material.module';
import { DraftCardComponent } from './components/draft-card/draft-card.component';
import { NewDraftDialogComponent } from './components/new-draft-dialog/new-draft-dialog.component';
import { DraftsComponent } from './containers/drafts/drafts.component';
import { EditorContainerComponent } from './containers/editor-container/editor-container.component';
import { DraftsRoutingModule } from './drafts-routing.module';
import { guards } from './guards';
import { ReversePipe } from './pipes/reverse.pipe';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DraftsRoutingModule,
    StoreModule.forFeature('drafts', reducers),
    EffectsModule.forFeature(effects),
    MaterialModule,
    FlexLayoutModule,
    EditorModule
  ],
  declarations: [
    DraftsComponent,
    DraftCardComponent,
    NewDraftDialogComponent,
    ReversePipe,
    EditorContainerComponent
  ],
  providers: [...guards],
  entryComponents: [NewDraftDialogComponent]
})
export class DraftsModule {}
