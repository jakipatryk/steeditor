import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { BeneficiariesPartialFormComponent } from './components/beneficiaries-partial-form/beneficiaries-partial-form.component';
import { BodyPartialFormComponent } from './components/body-partial-form/body-partial-form.component';
import { CommunityPartialFormComponent } from './components/community-partial-form/community-partial-form.component';
import { EditorComponent } from './components/editor/editor.component';
import { JsonMetadataPartialFormComponent } from './components/json-metadata-partial-form/json-metadata-partial-form.component';
import { OptionsPartialFormComponent } from './components/options-partial-form/options-partial-form.component';
import { TagsPartialFormComponent } from './components/tags-partial-form/tags-partial-form.component';
import { ThumbnailPartialFormComponent } from './components/thumbnail-partial-form/thumbnail-partial-form.component';
import { TitlePartialFormComponent } from './components/title-partial-form/title-partial-form.component';
import { EditorMaterialModule } from './editor-material/editor-material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditorMaterialModule,
    FlexLayoutModule,
    CovalentTextEditorModule
  ],
  declarations: [
    EditorComponent,
    ThumbnailPartialFormComponent,
    TagsPartialFormComponent,
    CommunityPartialFormComponent,
    TitlePartialFormComponent,
    BodyPartialFormComponent,
    OptionsPartialFormComponent,
    JsonMetadataPartialFormComponent,
    BeneficiariesPartialFormComponent
  ],
  exports: [EditorComponent]
})
export class EditorModule {}
