import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { BeneficiaryFormComponent } from './components/beneficiary-form/beneficiary-form.component';
import { EditorComponent } from './components/editor/editor.component';
import { PostContentsComponent } from './components/post-contents/post-contents.component';
import { PostOptionsComponent } from './components/post-options/post-options.component';
import { PostThumbnailComponent } from './components/post-thumbnail/post-thumbnail.component';
import { TemplatePickerComponent } from './components/template-picker/template-picker.component';
import { DraftComponent } from './containers/draft/draft.component';
import { DraftsRoutingModule } from './drafts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DraftsRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    DraftComponent,
    EditorComponent,
    TemplatePickerComponent,
    PostContentsComponent,
    PostThumbnailComponent,
    PostOptionsComponent,
    BeneficiaryFormComponent
  ]
})
export class DraftsModule {}
