import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from './../editor/editor.module';
import { MaterialModule } from './../material/material.module';
import { DraftCardComponent } from './components/draft-card/draft-card.component';
import { DraftsComponent } from './containers/drafts/drafts.component';
import { EditorContainerComponent } from './containers/editor-container/editor-container.component';
import { DraftsRoutingModule } from './drafts-routing.module';
import { guards } from './guards';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DraftsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    EditorModule
  ],
  declarations: [
    DraftsComponent,
    DraftCardComponent,
    ReversePipe,
    EditorContainerComponent
  ],
  providers: [...guards]
})
export class DraftsModule {}
